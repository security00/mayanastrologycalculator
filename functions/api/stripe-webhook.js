export async function onRequestPost({ request, env }) {
  if (!env.REPORT_DB) {
    return json({ error: 'D1 database binding REPORT_DB is not configured.' }, 500);
  }

  if (!env.STRIPE_WEBHOOK_SECRET) {
    return json({ error: 'Stripe webhook secret is not configured.' }, 500);
  }

  const signature = request.headers.get('stripe-signature') || '';
  const body = await request.text();
  const verified = await verifyStripeSignature(body, signature, env.STRIPE_WEBHOOK_SECRET);

  if (!verified) {
    return json({ error: 'Invalid Stripe signature.' }, 400);
  }

  const event = JSON.parse(body);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.client_reference_id || session.metadata?.order_id;

    if (orderId) {
      await env.REPORT_DB.prepare(
        `UPDATE report_orders
         SET status = ?,
             stripe_checkout_session_id = ?,
             stripe_payment_intent_id = ?,
             customer_email = ?,
             amount_total = ?,
             currency = ?,
             paid_at = datetime('now'),
             updated_at = datetime('now')
         WHERE id = ?`
      )
        .bind(
          'paid',
          session.id || null,
          session.payment_intent || null,
          session.customer_details?.email || session.customer_email || null,
          session.amount_total || null,
          session.currency || 'usd',
          orderId
        )
        .run();
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    const orderId = session.client_reference_id || session.metadata?.order_id;

    if (orderId) {
      await env.REPORT_DB.prepare(
        `UPDATE report_orders SET status = ?, updated_at = datetime('now') WHERE id = ? AND status = ?`
      )
        .bind('expired', orderId, 'pending')
        .run();
    }
  }

  return json({ received: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function verifyStripeSignature(body, signatureHeader, secret) {
  const parts = Object.fromEntries(
    signatureHeader.split(',').map((part) => {
      const [key, value] = part.split('=');
      return [key, value];
    })
  );

  if (!parts.t || !parts.v1) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signedPayload = `${parts.t}.${body}`;
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const expected = [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');

  return timingSafeEqual(expected, parts.v1);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}
