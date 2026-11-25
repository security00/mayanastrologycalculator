import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('homepage day-sign wording matches the day-sign guide', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.equal(page.includes('Imix (Crocodile)'), false);
  assert.equal(page.includes('Ahau (Sun)'), false);
  assert.equal(page.includes('most widely accepted'), false);
  assert.equal(page.includes('specific energies, elements'), false);
  assert.match(page, /Cipactli/);
  assert.match(page, /modern convention/);
  assert.match(page, /GMT correlation 584283, in the proleptic Gregorian calendar/);
});
