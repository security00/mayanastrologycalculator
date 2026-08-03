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
