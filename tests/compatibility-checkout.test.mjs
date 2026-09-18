import test from 'node:test';
import assert from 'node:assert/strict';

import { onRequestPost } from '../functions/api/create-compatibility-checkout-session.js';

test('compatibility checkout refuses to start without email consent', async () => {
  const request = new Request('https://mayanastrologycalculator.com/api/create-compatibility-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personA: { day: 1, month: 1, year: 2000 },
      personB: { day: 21, month: 12, year: 2012 },
      context: 'romantic',
    }),
  });

  const response = await onRequestPost({
    request,
    env: {
      REPORT_DB: {},
      STRIPE_SECRET_KEY: 'test_stripe_key',
      STRIPE_COMPATIBILITY_REPORT_PRICE_ID: 'price_pair_test',
    },
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: 'Please agree to email delivery before continuing.',
  });
});

test('compatibility checkout uses the pair price and stores both dates', async () => {
  const databaseCalls = [];
  const database = {
    prepare(sql) {
      return {
        bind(...bindings) {
          return {
            async run() {
              databaseCalls.push({ sql, bindings });
              return { meta: { changes: 1 } };
            },
          };
        },
      };
    },
  };

  let stripeBody = '';
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    stripeBody = String(options.body);
    return Response.json({ id: 'cs_test_pair', url: 'https://checkout.stripe.test/pair' });
  };

  try {
    const request = new Request('https://mayanastrologycalculator.com/api/create-compatibility-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personA: { day: 1, month: 1, year: 2000 },
        personB: { day: 21, month: 12, year: 2012 },
        context: 'work',
        emailDeliveryConsent: true,
      }),
    });

    const response = await onRequestPost({
      request,
      env: {
        REPORT_DB: database,
        STRIPE_SECRET_KEY: 'test_stripe_key',
        STRIPE_COMPATIBILITY_REPORT_PRICE_ID: 'price_pair_test',
        SITE_URL: 'https://mayanastrologycalculator.com',
      },
    });

    assert.equal(response.status, 200);
    const stripeParams = new URLSearchParams(stripeBody);
    assert.equal(stripeParams.get('line_items[0][price]'), 'price_pair_test');
    assert.equal(stripeParams.get('metadata[report_type]'), 'mayan_compatibility_report_v1');
    assert.equal(stripeParams.get('metadata[relationship_context]'), 'work');
    assert.match(stripeParams.get('metadata[mayan_signature]') || '', /Ik|Ahau/);
    assert.equal(databaseCalls.some((call) => call.sql.includes('partner_birth_day')), true);
    assert.equal(databaseCalls.some((call) => call.bindings.includes(12)), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
