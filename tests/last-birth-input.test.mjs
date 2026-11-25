import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { parseLastBirthInput } from '../shared/last-birth-input.js';

test('parseLastBirthInput accepts a stored civil date and rejects junk', () => {
  assert.deepEqual(parseLastBirthInput('{"day":15,"month":3,"year":1990}'), { day: 15, month: 3, year: 1990 });
  assert.equal(parseLastBirthInput(''), null);
  assert.equal(parseLastBirthInput('not-json'), null);
  assert.equal(parseLastBirthInput('{"day":31,"month":2,"year":2024}'), null);
  assert.deepEqual(parseLastBirthInput('{"day":"1","month":1,"year":2000}'), { day: 1, month: 1, year: 2000 });
});

test('calculator stores the last birth date and the empty result offers the form', () => {
  const calculator = fs.readFileSync('app/components/BirthDateCalculator.tsx', 'utf8');
  const result = fs.readFileSync('app/result/page.tsx', 'utf8');
  assert.match(calculator, /LAST_BIRTH_INPUT_KEY/);
  assert.match(result, /parseLastBirthInput/);
  assert.match(result, /BirthDateCalculator/);
  assert.equal(result.includes('No Reading Found'), false);
});
