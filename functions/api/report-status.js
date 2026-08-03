export async function onRequestGet({ request, env }) {
  if (!env.REPORT_DB) return json({ error: 'Report status is unavailable.' }, 503);
  const url = new URL(request.url);
  const orderId = url.searchParams.get('order_id');
  const sessionId = url.searchParams.get('session_id');
  if (!orderId || !sessionId) return json({ error: 'Missing order details.' }, 400);

  const order = await env.REPORT_DB.prepare(
    `SELECT id, status, delivery_status, mayan_signature, delivered_at
     FROM report_orders WHERE id = ? AND stripe_checkout_session_id = ? LIMIT 1`,
  ).bind(orderId, sessionId).first();

  if (!order) return json({ error: 'Order not found.' }, 404);
  return json(order, 200);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
  });
}
