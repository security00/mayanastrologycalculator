import assert from 'node:assert/strict';
import test from 'node:test';
import { REPORT_PRODUCT, calculateMayanSignature, isValidBirthDate, normalizeReportOrder, renderReportHtml } from '../shared/report-engine.js';

test('validates real Gregorian dates', () => {
  assert.equal(isValidBirthDate(29, 2, 2024), true);
  assert.equal(isValidBirthDate(29, 2, 2023), false);
  assert.equal(isValidBirthDate(31, 4, 2024), false);
});

test('calculates a stable sign and tone', () => {
  const result = calculateMayanSignature({ day: 1, month: 1, year: 2000 });
  assert.equal(result.signature, '11 Ik');
  assert.equal(result.sign.symbol, 'Wind');
  assert.equal(result.tone.name, 'Spectral');
});

test('recomputes order values instead of trusting supplied client values', () => {
  const order = normalizeReportOrder({
    birth_day: 1,
    birth_month: 1,
    birth_year: 2000,
    mayan_signature: '1 Fake',
    nawal: 'Fake',
    galactic_tone: 1,
  });
  assert.equal(order.mayan_signature, '11 Ik');
  assert.equal(order.nawal, 'Ik');
  assert.equal(order.galactic_tone, 11);
});

test('renders the complete v2 report without customer identifiers', () => {
  const html = renderReportHtml({ birth_day: 1, birth_month: 1, birth_year: 2000 });
  assert.match(html, new RegExp(REPORT_PRODUCT.name));
  assert.match(html, /Seven-day integration/);
  assert.match(html, /Methodology and cultural scope/);
  assert.equal((html.match(/<section class="page/g) || []).length, 11);
  assert.doesNotMatch(html, /customer_email|stripe/i);
});
