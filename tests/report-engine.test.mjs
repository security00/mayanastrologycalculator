import assert from 'node:assert/strict';
import test from 'node:test';
import { REPORT_PRODUCT, calculateMayanSignature, isValidBirthDate, normalizeReportOrder, renderReportHtml } from '../shared/report-engine.js';
import { resolveOrderReportVariant, resolveReportOfferVariant } from '../shared/report-versions.js';

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
  assert.doesNotMatch(html, /modern Dreamspell name/i);
  assert.match(html, /Personal report v2/);
});

test('keeps report variants deterministic and backward compatible', () => {
  assert.equal(resolveReportOfferVariant('unexpected').key, 'legacy_v2');
  assert.equal(resolveOrderReportVariant({ report_version: 2 }).key, 'legacy_v2');
  assert.equal(resolveOrderReportVariant({ report_version: 3 }).key, 'transparent_v3');
});

test('renders transparent v3 labels without changing the calculated signature', () => {
  const html = renderReportHtml(
    { birth_day: 1, birth_month: 1, birth_year: 2000 },
    { offerVariant: 'transparent_v3' },
  );
  assert.match(html, /11 Ik/);
  assert.match(html, /Tzolk’in Number/);
  assert.match(html, /Modern Dreamspell name: Spectral/);
  assert.match(html, /gmt584283-proleptic-gregorian-v1/);
  assert.match(html, /Personal report v3/);
  assert.equal((html.match(/<section class="page/g) || []).length, 11);
});
