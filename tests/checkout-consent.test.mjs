import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { onRequestPost } from '../functions/api/create-checkout-session.js';
import {
  CHECKOUT_BLOCKED_EVENT,
  CHECKOUT_CONSENT_MESSAGE,
  CHECKOUT_PRODUCT,
  blockedCheckoutParams,
  revealConsentField,
} from '../app/lib/checkout-consent.ts';

const readSource = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

function sliceFunction(source, signature, endMarker) {
  const start = source.indexOf(signature);
  assert.notEqual(start, -1, signature);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(end, -1, endMarker);
  return source.slice(start, end);
}

function assertPurchaseButtonStaysClickable(source) {
  assert.match(source, /Opening secure checkout…/);
  assert.match(source, /animate-spin/);
  assert.match(source, /disabled=\{checkoutLoading\}/);
  assert.equal(source.includes('disabled={checkoutLoading || !emailDeliveryConsent}'), false);
  assert.match(source, /useState\(false\)/);
  assert.match(source, /aria-live="assertive"/);
}

function assertLoadingClearsOnlyAfterError(source) {
  const success = source.indexOf('window.location.href = data.url');
  const failure = source.indexOf('} catch', success);
  assert.notEqual(success, -1);
  assert.notEqual(failure, -1);
  assert.equal(source.slice(success, failure).includes('setCheckoutLoading(false)'), false);
  assert.equal(source.includes('finally'), false);
  assert.equal(source.split('setCheckoutLoading(false)').length - 1, 1);
  assert.ok(source.indexOf('} catch') < source.indexOf('setCheckoutLoading(false)'));
}

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

test('blocked checkout analytics name the product and price without starting checkout', () => {
  assert.equal(CHECKOUT_BLOCKED_EVENT, 'checkout_blocked_no_consent');
  assert.equal(CHECKOUT_CONSENT_MESSAGE, 'Please tick the delivery consent box to continue.');
  assert.deepEqual(blockedCheckoutParams(CHECKOUT_PRODUCT.personal, 7), {
    product: 'personal_report',
    price: 7,
  });
  assert.deepEqual(blockedCheckoutParams(CHECKOUT_PRODUCT.compatibility, 12), {
    product: 'compatibility_report',
    price: 12,
  });
});

test('revealConsentField scrolls the checkbox into view and focuses it', () => {
  const calls = [];
  revealConsentField({
    scrollIntoView(options) {
      calls.push(['scroll', options]);
    },
    focus(options) {
      calls.push(['focus', options]);
    },
  });
  revealConsentField(null);

  assert.deepEqual(calls, [
    ['scroll', { behavior: 'smooth', block: 'center' }],
    ['focus', { preventScroll: true }],
  ]);
});

test('personal checkout stays clickable and only starts after consent', () => {
  const card = readSource('app/components/ReportUpgradeCard.tsx');
  const page = readSource('app/result/page.tsx');
  const handler = sliceFunction(page, 'const handlePaidReportClick', 'if (!ready)');

  assert.match(card, /revealConsentField\(consentInputRef\.current\)/);
  assert.match(card, /CHECKOUT_CONSENT_MESSAGE/);
  assert.match(card, /if \(checked\) setConsentHighlight\(false\)/);
  assert.match(card, /onCheckout\(emailDeliveryConsent\)/);
  assert.equal(card.includes("fetch('/api/create-checkout-session'"), false);
  assertPurchaseButtonStaysClickable(card);
  assertLoadingClearsOnlyAfterError(page);

  const blocked = handler.indexOf('CHECKOUT_BLOCKED_EVENT');
  const loading = handler.indexOf('setCheckoutLoading(true)');
  const paidClick = handler.indexOf("'paid_report_checkout_click'");
  const beginCheckout = handler.indexOf("'begin_checkout'");
  const checkoutFetch = handler.indexOf("fetch('/api/create-checkout-session'");
  assert.ok(handler.indexOf('emailDeliveryConsent !== true') < blocked);
  assert.ok(blocked < loading);
  assert.ok(loading < paidClick);
  assert.ok(paidClick < checkoutFetch);
  assert.ok(checkoutFetch < beginCheckout);
  assert.match(handler, /CHECKOUT_PRODUCT\.personal/);
  assert.match(handler, /blockedCheckoutParams\(/);
  assert.equal(handler.includes('CHECKOUT_PRODUCT.compatibility'), false);
});

test('compatibility checkout uses the same consent click pattern', () => {
  const card = readSource('app/components/CompatibilityUpgradeCard.tsx');
  const handler = sliceFunction(card, 'const handleCheckout', 'return (');

  assert.match(card, /revealConsentField\(consentInputRef\.current\)/);
  assert.match(card, /CHECKOUT_CONSENT_MESSAGE/);
  assert.match(card, /if \(checked\) setConsentHighlight\(false\)/);
  assert.equal(card.includes('Please agree to email delivery before continuing.'), false);
  assertPurchaseButtonStaysClickable(card);
  assertLoadingClearsOnlyAfterError(card);

  const blocked = handler.indexOf('CHECKOUT_BLOCKED_EVENT');
  const loading = handler.indexOf('setCheckoutLoading(true)');
  const paidClick = handler.indexOf("'paid_report_checkout_click'");
  const beginCheckout = handler.indexOf("'begin_checkout'");
  const checkoutFetch = handler.indexOf("fetch('/api/create-compatibility-checkout-session'");
  assert.ok(handler.indexOf('if (!emailDeliveryConsent)') < blocked);
  assert.ok(blocked < loading);
  assert.ok(loading < paidClick);
  assert.ok(paidClick < checkoutFetch);
  assert.ok(checkoutFetch < beginCheckout);
  assert.match(handler, /CHECKOUT_PRODUCT\.compatibility/);
  assert.match(handler, /blockedCheckoutParams\(/);
});
