import assert from 'node:assert/strict';
import test from 'node:test';

import { COMPATIBILITY_PRODUCT } from '../shared/mayan-compatibility.js';
import {
  encodeCompatibilityPayload,
  parseCompatibilityPayload,
  readingFromBirthDate,
  renderCompatibilityReportHtml,
} from '../shared/compatibility-report-engine.js';

test('builds a pair reading from two birth dates', () => {
  const personA = readingFromBirthDate({ day: 1, month: 1, year: 2000 });
  const personB = readingFromBirthDate({ day: 21, month: 12, year: 2012 });

  assert.equal(personA.nawal.name, 'Ik');
  assert.equal(personA.galacticTone.number, 11);
  assert.equal(personB.nawal.name, 'Ahau');
  assert.equal(personB.galacticTone.number, 4);
});

test('renders an 11-page romantic compatibility report', () => {
  const html = renderCompatibilityReportHtml({
    report_type: COMPATIBILITY_PRODUCT.code,
    birth_day: 1,
    birth_month: 1,
    birth_year: 2000,
    partner_birth_day: 21,
    partner_birth_month: 12,
    partner_birth_year: 2012,
    relationship_context: 'romantic',
  });

  assert.match(html, /11 Ik \+ 4 Ahau/);
  assert.match(html, /Romantic pair reading|Romantic relationship|love relationship/i);
  assert.match(html, /Closer conversation/);
  assert.match(html, /Seven-day practice/);
  assert.match(html, /decision filter/i);
  assert.equal((html.match(/class="page/g) || []).length, 11);
});

test('changes paid copy by relationship context', () => {
  const romantic = renderCompatibilityReportHtml({
    report_type: COMPATIBILITY_PRODUCT.code,
    birth_day: 1,
    birth_month: 1,
    birth_year: 2000,
    partner_birth_day: 21,
    partner_birth_month: 12,
    partner_birth_year: 2012,
    relationship_context: 'romantic',
  });
  const work = renderCompatibilityReportHtml({
    report_type: COMPATIBILITY_PRODUCT.code,
    birth_day: 1,
    birth_month: 1,
    birth_year: 2000,
    partner_birth_day: 21,
    partner_birth_month: 12,
    partner_birth_year: 2012,
    relationship_context: 'work',
  });

  assert.match(romantic, /Closer conversation/);
  assert.match(work, /How this pair works cleanly/);
  assert.notEqual(romantic, work);
});

test('can recover pair dates from a stored payload', () => {
  const encoded = encodeCompatibilityPayload({
    personA: { day: 11, month: 9, year: 1994 },
    personB: { day: 23, month: 8, year: 2000 },
    context: 'friendship',
  });
  const parsed = parseCompatibilityPayload(encoded);

  assert.deepEqual(parsed.personA, { day: 11, month: 9, year: 1994 });
  assert.deepEqual(parsed.personB, { day: 23, month: 8, year: 2000 });
  assert.equal(parsed.context, 'friendship');
});
