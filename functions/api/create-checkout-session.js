import { REPORT_PRODUCT, calculateMayanSignature, isValidBirthDate } from '../../shared/report-engine.js';

export async function onRequestPost({ request, env }) {
  try {
    if (!env.REPORT_DB) {
      return json({ error: 'D1 database binding REPORT_DB is not configured.' }, 500);
    }

    if (!env.STRIPE_SECRET_KEY || !env.STRIPE_REPORT_PRICE_ID) {
      return json({ error: 'Stripe checkout is not configured yet.' }, 500);
    }

    const payload = await request.json();
    const birthDate = payload.birthDate || {};
    const day = Number(birthDate.day);
    const month = Number(birthDate.month);
    const year = Number(birthDate.year);

    if (!isValidBirthDate(day, month, year)) {
      return json({ error: 'Missing or invalid report details.' }, 400);
    }

    const calculated = calculateMayanSignature({ day, month, year });
    const tone = calculated.tone.number;
    const nawal = calculated.sign.name;
    const signature = calculated.signature;

    const orderId = crypto.randomUUID();
    const siteUrl = env.SITE_URL || new URL(request.url).origin;
    const successUrl = `${siteUrl}/report-success?order_id=${encodeURIComponent(orderId)}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/result?day=${day}&month=${month}&year=${year}`;

    await env.REPORT_DB.prepare(
      `INSERT INTO report_orders (
        id, status, report_type, birth_day, birth_month, birth_year,
        mayan_signature, nawal, galactic_tone, amount_usd, currency, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
      .bind(orderId, 'pending', REPORT_PRODUCT.code, day, month, year, signature, nawal, tone, REPORT_PRODUCT.priceUsd, 'usd')
      .run();

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('client_reference_id', orderId);
    params.set('line_items[0][price]', env.STRIPE_REPORT_PRICE_ID);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', successUrl);
    params.set('cancel_url', cancelUrl);
    params.set('metadata[order_id]', orderId);
    params.set('metadata[report_type]', REPORT_PRODUCT.code);
    params.set('metadata[report_version]', String(REPORT_PRODUCT.version));
    params.set('metadata[mayan_signature]', signature);
    params.set('metadata[birth_date]', `${day}/${month}/${year}`);
    params.set('payment_intent_data[metadata][order_id]', orderId);
    params.set('payment_intent_data[metadata][report_type]', REPORT_PRODUCT.code);

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
        `UPDATE report_orders SET status = ?, error_message = ?, updated_at = datetime('now') WHERE id = ?`
      )
        .bind('checkout_failed', session.error?.message || 'Stripe checkout failed.', orderId)
        .run();

      return json({ error: session.error?.message || 'Stripe checkout failed.' }, 500);
    }

    await env.REPORT_DB.prepare(
      `UPDATE report_orders SET stripe_checkout_session_id = ?, updated_at = datetime('now') WHERE id = ?`
    )
      .bind(session.id, orderId)
      .run();

    return json({ orderId, url: session.url });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Unexpected checkout error.' }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
