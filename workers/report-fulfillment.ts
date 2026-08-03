import { REPORT_PRODUCT, renderReportHtml } from '../shared/report-engine.js';

interface Env {
  REPORT_DB: D1Database;
  REPORT_FILES: R2Bucket;
  BROWSER: BrowserRun;
  RESEND_API_KEY: string;
  REPORT_LINK_SECRET: string;
  REPORT_FROM_EMAIL: string;
  REPORT_REPLY_TO_EMAIL: string;
  SITE_URL: string;
}

interface FulfillmentMessage {
  orderId: string;
  stripeEventId?: string;
  checkoutSessionId?: string;
}

interface ReportOrder {
  id: string;
  status: string;
  delivery_status: string;
  birth_day: number;
  birth_month: number;
  birth_year: number;
  mayan_signature: string;
  nawal: string;
  galactic_tone: number;
  customer_email: string | null;
  stripe_checkout_session_id: string | null;
  report_object_key: string | null;
  report_expires_at: string | null;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, service: 'mayan-report-fulfillment', productVersion: REPORT_PRODUCT.version });
    }

    if (url.pathname === '/api/report-status') return reportStatus(request, env);
    if (url.pathname === '/api/report-download') return reportDownload(request, env);
    return new Response('Not found', { status: 404 });
  },

  async queue(batch, env): Promise<void> {
    for (const message of batch.messages) {
      const body = message.body as FulfillmentMessage;
      try {
        await fulfillOrder(body.orderId, env);
        message.ack();
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'Unknown fulfillment error';
        console.error(JSON.stringify({ event: 'report_fulfillment_failed', orderId: body.orderId, detail }));
        await recordFailure(body.orderId, detail, env);
        message.retry({ delaySeconds: 120 });
      }
    }
  },

  async scheduled(_controller, env): Promise<void> {
    const expired = await env.REPORT_DB.prepare(
      `SELECT id, report_object_key FROM report_orders
       WHERE report_object_key IS NOT NULL AND report_expires_at <= datetime('now') LIMIT 100`,
    ).all<{ id: string; report_object_key: string }>();

    for (const order of expired.results) {
      await env.REPORT_FILES.delete(order.report_object_key);
      await env.REPORT_DB.prepare(
        `UPDATE report_orders SET report_object_key = NULL, report_pdf_url = NULL, updated_at = datetime('now') WHERE id = ?1`,
      ).bind(order.id).run();
    }

    console.log(JSON.stringify({ event: 'expired_reports_removed', count: expired.results.length }));
  },
} satisfies ExportedHandler<Env, FulfillmentMessage>;

async function fulfillOrder(orderId: string, env: Env) {
  if (!orderId) throw new Error('Queue message is missing orderId.');

  let order = await getOrder(orderId, env);
  if (!order) throw new Error('Order was not found.');
  if (order.status !== 'paid') throw new Error(`Order is not paid (status: ${order.status}).`);
  if (!order.customer_email) throw new Error('Paid order has no customer email.');
  if (order.delivery_status === 'delivered') return;

  const claim = await env.REPORT_DB.prepare(
    `UPDATE report_orders
     SET delivery_status = 'generating', fulfillment_attempts = fulfillment_attempts + 1,
         last_delivery_error = NULL, updated_at = datetime('now')
     WHERE id = ?1 AND status = 'paid' AND (
       delivery_status IN ('not_started', 'queued', 'failed', 'email_failed')
       OR (delivery_status = 'generating' AND updated_at < datetime('now', '-10 minutes'))
     )`,
  ).bind(orderId).run();

  if ((claim.meta.changes || 0) === 0) return;
  order = await getOrder(orderId, env);
  if (!order) throw new Error('Order disappeared after claim.');

  const objectKey = order.report_object_key || `reports/${order.id}/${REPORT_PRODUCT.code}.pdf`;
  let reportObject = await env.REPORT_FILES.head(objectKey);

  if (!reportObject) {
    const html = renderReportHtml(order);
    const pdfResponse = await env.BROWSER.quickAction('pdf', {
      html,
      pdfOptions: { format: 'a4', printBackground: true, preferCSSPageSize: true },
    });
    if (!pdfResponse.ok) throw new Error(`Browser Run returned ${pdfResponse.status}.`);

    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    await env.REPORT_FILES.put(objectKey, pdfResponse.body, {
      httpMetadata: { contentType: 'application/pdf', contentDisposition: 'attachment' },
      customMetadata: { orderId: order.id, expiresAt: expiresAt.toISOString(), productVersion: String(REPORT_PRODUCT.version) },
    });

    await env.REPORT_DB.prepare(
      `UPDATE report_orders SET delivery_status = 'generated', report_version = ?1,
       report_object_key = ?2, report_pdf_url = ?3, report_generated_at = datetime('now'),
       report_expires_at = ?4, updated_at = datetime('now') WHERE id = ?5`,
    ).bind(REPORT_PRODUCT.version, objectKey, objectKey, expiresAt.toISOString(), order.id).run();
    reportObject = await env.REPORT_FILES.head(objectKey);
  }

  if (!reportObject) throw new Error('Generated report was not found in private storage.');
  const token = await createDownloadToken(order.id, env.REPORT_LINK_SECRET, 7 * 24 * 60 * 60);
  const downloadUrl = `${env.SITE_URL.replace(/\/$/, '')}/api/report-download?token=${encodeURIComponent(token)}`;
  await sendReportEmail(order, downloadUrl, env);

  await env.REPORT_DB.prepare(
    `UPDATE report_orders SET delivery_status = 'delivered', delivered_at = datetime('now'),
     delivery_notes = 'Delivered automatically by Resend', updated_at = datetime('now') WHERE id = ?1`,
  ).bind(order.id).run();

  console.log(JSON.stringify({ event: 'report_delivered', orderId: order.id, objectKey }));
}

async function sendReportEmail(order: ReportOrder, downloadUrl: string, env: Env) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `report-delivery/${order.id}/v${REPORT_PRODUCT.version}`,
    },
    body: JSON.stringify({
      from: env.REPORT_FROM_EMAIL,
      reply_to: env.REPORT_REPLY_TO_EMAIL,
      to: [order.customer_email],
      subject: `Your ${order.mayan_signature} Mayan Signature Report is ready`,
      html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#292524"><h1>Your report is ready</h1><p>Your private <strong>${escapeHtml(order.mayan_signature)}</strong> report has been generated.</p><p><a href="${escapeHtml(downloadUrl)}" style="display:inline-block;background:#c2410c;color:white;text-decoration:none;padding:14px 22px;border-radius:9px;font-weight:bold">Download your PDF report</a></p><p>This secure link expires in 7 days. The private report file is retained for 90 days so support can issue a fresh link if needed.</p><p>If the report is missing or unusable, reply within 7 days for a replacement or refund.</p><p>— Mayan Astrology Calculator</p></div>`,
      text: `Your ${order.mayan_signature} report is ready. Download it within 7 days: ${downloadUrl}`,
      tags: [{ name: 'product', value: REPORT_PRODUCT.code }],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend returned ${response.status}: ${detail.slice(0, 300)}`);
  }
}

async function reportStatus(request: Request, env: Env) {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  const url = new URL(request.url);
  const orderId = url.searchParams.get('order_id');
  const sessionId = url.searchParams.get('session_id');
  if (!orderId || !sessionId) return Response.json({ error: 'Missing order details.' }, { status: 400 });

  const order = await env.REPORT_DB.prepare(
    `SELECT id, status, delivery_status, mayan_signature, delivered_at
     FROM report_orders WHERE id = ?1 AND stripe_checkout_session_id = ?2 LIMIT 1`,
  ).bind(orderId, sessionId).first<Record<string, unknown>>();
  if (!order) return Response.json({ error: 'Order not found.' }, { status: 404 });
  return Response.json(order, { headers: { 'Cache-Control': 'private, no-store' } });
}

async function reportDownload(request: Request, env: Env) {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  const token = new URL(request.url).searchParams.get('token');
  const payload = token ? await verifyDownloadToken(token, env.REPORT_LINK_SECRET) : null;
  if (!payload) return new Response('This report link is invalid or has expired.', { status: 403 });

  const order = await getOrder(payload.orderId, env);
  if (!order?.report_object_key || order.delivery_status !== 'delivered') return new Response('Report not found.', { status: 404 });
  const object = await env.REPORT_FILES.get(order.report_object_key);
  if (!object) return new Response('Report file has expired.', { status: 410 });

  const safeSignature = order.mayan_signature.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeSignature}-mayan-signature-report.pdf"`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      ETag: object.httpEtag,
    },
  });
}

async function getOrder(orderId: string, env: Env) {
  return env.REPORT_DB.prepare(`SELECT * FROM report_orders WHERE id = ?1 LIMIT 1`).bind(orderId).first<ReportOrder>();
}

async function recordFailure(orderId: string, detail: string, env: Env) {
  await env.REPORT_DB.prepare(
    `UPDATE report_orders SET delivery_status = 'failed', last_delivery_error = ?1,
     error_message = ?1, updated_at = datetime('now') WHERE id = ?2 AND delivery_status != 'delivered'`,
  ).bind(detail.slice(0, 1000), orderId).run();
}

async function createDownloadToken(orderId: string, secret: string, lifetimeSeconds: number) {
  const expires = Math.floor(Date.now() / 1000) + lifetimeSeconds;
  const payload = `${orderId}.${expires}`;
  return `${payload}.${await sign(payload, secret)}`;
}

async function verifyDownloadToken(token: string, secret: string) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [orderId, expiresRaw, supplied] = parts;
  const expires = Number(expiresRaw);
  if (!orderId || !Number.isInteger(expires) || expires < Math.floor(Date.now() / 1000)) return null;
  const expected = await sign(`${orderId}.${expires}`, secret);
  return timingSafeEqual(expected, supplied) ? { orderId, expires } : null;
}

async function sign(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return base64Url(new Uint8Array(signature));
}

function base64Url(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return result === 0;
}

function escapeHtml(value: string) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
