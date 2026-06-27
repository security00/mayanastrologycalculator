const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Set STRIPE_SECRET_KEY before running this script.');
}

async function stripeRequest(path, params) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `Stripe request failed: ${path}`);
  }

  return data;
}

const product = await stripeRequest('products', {
  name: 'Full Mayan Birth Chart Report',
  description: 'Early access personalized Mayan Tzolk\'in birth chart PDF report.',
});

const price = await stripeRequest('prices', {
  product: product.id,
  currency: 'usd',
  unit_amount: '700',
});

console.log('Stripe product created:');
console.log(`Product ID: ${product.id}`);
console.log(`Price ID: ${price.id}`);
console.log('');
console.log('Set this in Cloudflare Pages:');
console.log(`STRIPE_REPORT_PRICE_ID=${price.id}`);
