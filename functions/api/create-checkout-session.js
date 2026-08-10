import { REPORT_PRODUCT, calculateMayanSignature, isValidBirthDate } from '../../shared/report-engine.js';
import { resolveReportOfferVariant } from '../../shared/report-versions.js';
import { readAuthSession } from '../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  try {
    if (!env.REPORT_DB) {
      return json({ error: 'D1 database binding REPORT_DB is not configured.' }, 500);
    }

    if (!env.STRIPE_SECRET_KEY || !env.STRIPE_REPORT_PRICE_ID) {
      return json({ error: 'Stripe checkout is not configured yet.' }, 500);
    }

    const authSession = await readAuthSession(request, env);
    const payload = await request.json();
    if (payload.emailDeliveryConsent !== true) {
      return json({ error: 'Please agree to email delivery before continuing.' }, 400);
    }
    const birthDate = payload.birthDate || {};
    const day = Number(birthDate.day);
    const month = Number(birthDate.month);
    const year = Number(birthDate.year);

    if (!isValidBirthDate(day, month, year)) {
      return json({ error: 'Missing or invalid report details.' }, 400);
    }

    const calculated = calculateMayanSignature({ day, month, year });
    const reportOffer = resolveReportOfferVariant(payload.offerVariant);
    const tone = calculated.tone.number;
    const nawal = calculated.sign.name;
    const signature = calculated.signature;

    const orderId = crypto.randomUUID();
    const siteUrl = env.SITE_URL || new URL(request.url).origin;
    const successUrl = `${siteUrl}/report-success?order_id=${encodeURIComponent(orderId)}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/result?day=${day}&month=${month}&year=${year}`;

    await insertReportOrder(env.REPORT_DB, {
      orderId,
      day,
      month,
      year,
      signature,
      nawal,
      tone,
      customerEmail: authSession?.email || null,
      reportOffer,
      calculationVersion: calculated.calculationVersion,
      correlationConstant: calculated.correlationConstant,
    });

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('client_reference_id', orderId);
    params.set('line_items[0][price]', env.STRIPE_REPORT_PRICE_ID);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', successUrl);
    params.set('cancel_url', cancelUrl);
    params.set('metadata[order_id]', orderId);
    params.set('metadata[report_type]', REPORT_PRODUCT.code);
    params.set('metadata[report_version]', String(reportOffer.reportVersion));
    params.set('metadata[calculation_version]', calculated.calculationVersion);
    params.set('metadata[interpretation_version]', reportOffer.interpretationVersion);
    params.set('metadata[offer_version]', reportOffer.offerVersion);
    params.set('metadata[experiment_variant]', reportOffer.key);
    params.set('metadata[mayan_signature]', signature);
    params.set('metadata[birth_date]', `${day}/${month}/${year}`);
    params.set('payment_intent_data[metadata][order_id]', orderId);
    params.set('payment_intent_data[metadata][report_type]', REPORT_PRODUCT.code);
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

async function insertReportOrder(database, order) {
  const commonBindings = [
    order.orderId,
    'pending',
    REPORT_PRODUCT.code,
    order.day,
    order.month,
    order.year,
    order.signature,
    order.nawal,
    order.tone,
    REPORT_PRODUCT.priceUsd,
    'usd',
    order.customerEmail,
    'v1_transactional_email_delivery',
  ];

  try {
    await database.prepare(
      `INSERT INTO report_orders (
        id, status, report_type, birth_day, birth_month, birth_year,
        mayan_signature, nawal, galactic_tone, amount_usd, currency, customer_email,
        email_delivery_consent_at, email_delivery_consent_version,
        report_version, calculation_version, interpretation_version, correlation_constant,
        offer_version, experiment_variant, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
      .bind(
        ...commonBindings,
        order.reportOffer.reportVersion,
        order.calculationVersion,
        order.reportOffer.interpretationVersion,
        order.correlationConstant,
        order.reportOffer.offerVersion,
        order.reportOffer.key,
      )
      .run();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    if (!/no column named|has no column named/i.test(detail)) throw error;

    // Safe rollout fallback: checkout remains available before migration 005 is applied.
    await database.prepare(
      `INSERT INTO report_orders (
        id, status, report_type, birth_day, birth_month, birth_year,
        mayan_signature, nawal, galactic_tone, amount_usd, currency, customer_email,
        email_delivery_consent_at, email_delivery_consent_version, report_version,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, datetime('now'), datetime('now'))`
    )
      .bind(...commonBindings, order.reportOffer.reportVersion)
      .run();
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
