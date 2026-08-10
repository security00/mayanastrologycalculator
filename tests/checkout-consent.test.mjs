import test from 'node:test';
import assert from 'node:assert/strict';

import { onRequestPost } from '../functions/api/create-checkout-session.js';

test('checkout refuses to start without explicit email delivery consent', async () => {
  const request = new Request('https://mayanastrologycalculator.com/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ birthDate: { day: 1, month: 1, year: 1990 } }),
  });

  const response = await onRequestPost({
    request,
    env: {
      REPORT_DB: {},
      STRIPE_SECRET_KEY: 'test_stripe_key',
      STRIPE_REPORT_PRICE_ID: 'price_test',
    },
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: 'Please agree to email delivery before continuing.',
  });
});

test('checkout versions the transparent offer and falls back safely before migration 005', async () => {
  const databaseCalls = [];
  const database = {
    prepare(sql) {
      return {
        bind(...bindings) {
          return {
            async run() {
              if (sql.includes('calculation_version')) {
                throw new Error('table report_orders has no column named calculation_version');
              }
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
    return Response.json({ id: 'cs_test_versioned', url: 'https://checkout.stripe.test/session' });
  };

  try {
    const request = new Request('https://mayanastrologycalculator.com/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birthDate: { day: 1, month: 1, year: 2000 },
        emailDeliveryConsent: true,
        offerVariant: 'transparent_v3',
      }),
    });

    const response = await onRequestPost({
      request,
      env: {
        REPORT_DB: database,
        STRIPE_SECRET_KEY: 'test_stripe_key',
        STRIPE_REPORT_PRICE_ID: 'price_test',
        SITE_URL: 'https://mayanastrologycalculator.com',
      },
    });

    assert.equal(response.status, 200);
    const stripeParams = new URLSearchParams(stripeBody);
    assert.equal(stripeParams.get('metadata[report_version]'), '3');
    assert.equal(stripeParams.get('metadata[calculation_version]'), 'gmt584283-proleptic-gregorian-v1');
    assert.equal(stripeParams.get('metadata[interpretation_version]'), 'transparent-reflective-v3');
    assert.equal(stripeParams.get('metadata[experiment_variant]'), 'transparent_v3');
    assert.equal(databaseCalls.some((call) => call.sql.includes('report_version')), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
