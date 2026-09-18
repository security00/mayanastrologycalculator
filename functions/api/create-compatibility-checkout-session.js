import { isValidBirthDate } from '../../shared/report-engine.js';
import { COMPATIBILITY_PRODUCT, normalizeCompatibilityContext } from '../../shared/mayan-compatibility.js';
import {
  COMPATIBILITY_PAYLOAD_PREFIX,
  encodeCompatibilityPayload,
  readingFromBirthDate,
} from '../../shared/compatibility-report-engine.js';
import { readAuthSession } from '../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  try {
    if (!env.REPORT_DB) {
      return json({ error: 'D1 database binding REPORT_DB is not configured.' }, 500);
    }

    if (!env.STRIPE_SECRET_KEY || !env.STRIPE_COMPATIBILITY_REPORT_PRICE_ID) {
      return json({ error: 'Compatibility report checkout is not configured yet.' }, 500);
    }

    const authSession = await readAuthSession(request, env);
    const payload = await request.json();
    if (payload.emailDeliveryConsent !== true) {
      return json({ error: 'Please agree to email delivery before continuing.' }, 400);
    }

    const personA = readBirthDate(payload.personA || payload.birthDate);
    const personB = readBirthDate(payload.personB);
    const context = normalizeCompatibilityContext(payload.context);

    if (!personA || !personB) {
      return json({ error: 'Missing or invalid pair details.' }, 400);
    }

    const readingA = readingFromBirthDate(personA);
    const readingB = readingFromBirthDate(personB);
    const pairSignature = `${readingA.galacticTone.number} ${readingA.nawal.name} + ${readingB.galacticTone.number} ${readingB.nawal.name}`;
    const reportPayload = encodeCompatibilityPayload({ personA, personB, context });

    const orderId = crypto.randomUUID();
    const siteUrl = env.SITE_URL || new URL(request.url).origin;
    const successUrl = `${siteUrl}/report-success?order_id=${encodeURIComponent(orderId)}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelParams = new URLSearchParams({
      aday: String(personA.day),
      amonth: String(personA.month),
      ayear: String(personA.year),
      bday: String(personB.day),
      bmonth: String(personB.month),
      byear: String(personB.year),
      context,
    });
    const cancelUrl = `${siteUrl}/compatibility?${cancelParams.toString()}`;

    await insertCompatibilityOrder(env.REPORT_DB, {
      orderId,
      personA,
      personB,
      context,
      pairSignature,
      readingA,
      readingB,
      reportPayload,
      customerEmail: authSession?.email || null,
    });

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('client_reference_id', orderId);
    params.set('line_items[0][price]', env.STRIPE_COMPATIBILITY_REPORT_PRICE_ID);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', successUrl);
    params.set('cancel_url', cancelUrl);
    params.set('metadata[order_id]', orderId);
    params.set('metadata[report_type]', COMPATIBILITY_PRODUCT.code);
    params.set('metadata[report_version]', String(COMPATIBILITY_PRODUCT.version));
    params.set('metadata[relationship_context]', context);
    params.set('metadata[mayan_signature]', pairSignature);
    params.set('metadata[birth_date]', `${personA.day}/${personA.month}/${personA.year}`);
    params.set('metadata[partner_birth_date]', `${personB.day}/${personB.month}/${personB.year}`);
    params.set('payment_intent_data[metadata][order_id]', orderId);
    params.set('payment_intent_data[metadata][report_type]', COMPATIBILITY_PRODUCT.code);
    if (authSession?.email) {
      params.set('customer_email', authSession.email);
    }

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      await env.REPORT_DB.prepare(
        `UPDATE report_orders SET status = ?, error_message = ?, updated_at = datetime('now') WHERE id = ?`,
      )
        .bind('checkout_failed', session.error?.message || 'Stripe checkout failed.', orderId)
        .run();

      return json({ error: session.error?.message || 'Stripe checkout failed.' }, 500);
    }

    await env.REPORT_DB.prepare(
      `UPDATE report_orders SET stripe_checkout_session_id = ?, updated_at = datetime('now') WHERE id = ?`,
    )
      .bind(session.id, orderId)
      .run();

    return json({ orderId, url: session.url });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Unexpected checkout error.' }, 500);
  }
}

function readBirthDate(value) {
  if (!value) return null;
  const day = Number(value.day);
  const month = Number(value.month);
  const year = Number(value.year);
  return isValidBirthDate(day, month, year) ? { day, month, year } : null;
}

async function insertCompatibilityOrder(database, order) {
  const common = [
    order.orderId,
    'pending',
    COMPATIBILITY_PRODUCT.code,
    order.personA.day,
    order.personA.month,
    order.personA.year,
    order.pairSignature,
    order.readingA.nawal.name,
    order.readingA.galacticTone.number,
    COMPATIBILITY_PRODUCT.priceUsd,
    'usd',
    order.customerEmail,
    'v1_transactional_email_delivery',
    COMPATIBILITY_PRODUCT.version,
  ];

  try {
    await database.prepare(
      `INSERT INTO report_orders (
        id, status, report_type, birth_day, birth_month, birth_year,
        mayan_signature, nawal, galactic_tone, amount_usd, currency, customer_email,
        email_delivery_consent_at, email_delivery_consent_version, report_version,
        partner_birth_day, partner_birth_month, partner_birth_year,
        partner_signature, partner_nawal, partner_tone, relationship_context, report_payload,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
    )
      .bind(
        ...common,
        order.personB.day,
        order.personB.month,
        order.personB.year,
        `${order.readingB.galacticTone.number} ${order.readingB.nawal.name}`,
        order.readingB.nawal.name,
        order.readingB.galacticTone.number,
        order.context,
        order.reportPayload,
      )
      .run();
    return;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    if (!/no column named|has no column named/i.test(detail)) throw error;
  }

  await database.prepare(
    `INSERT INTO report_orders (
      id, status, report_type, birth_day, birth_month, birth_year,
      mayan_signature, nawal, galactic_tone, amount_usd, currency, customer_email,
      email_delivery_consent_at, email_delivery_consent_version, report_version,
      delivery_notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, datetime('now'), datetime('now'))`,
  )
    .bind(...common, `${COMPATIBILITY_PAYLOAD_PREFIX}${order.reportPayload}`)
    .run();
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
