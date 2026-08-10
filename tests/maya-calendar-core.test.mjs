import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateTzolkinPosition,
  GMT_CORRELATION_CONSTANT,
  MAYA_CALCULATION_VERSION,
} from '../shared/maya-calendar-core.js';

test('uses an explicit, versioned GMT correlation', () => {
  assert.equal(GMT_CORRELATION_CONSTANT, 584283);
  assert.equal(MAYA_CALCULATION_VERSION, 'gmt584283-proleptic-gregorian-v1');
});

test('matches published Tzolk\'in benchmark dates', () => {
  assert.deepEqual(
    pick(calculateTzolkinPosition({ day: 1, month: 1, year: 2000 })),
    { toneNumber: 11, daySignIndex: 1 },
  );
  assert.deepEqual(
    pick(calculateTzolkinPosition({ day: 21, month: 12, year: 2012 })),
    { toneNumber: 4, daySignIndex: 19 },
  );
  assert.deepEqual(
    pick(calculateTzolkinPosition({ day: 5, month: 8, year: 2026 })),
    { toneNumber: 13, daySignIndex: 14 },
  );
});

function pick(position) {
  return { toneNumber: position.toneNumber, daySignIndex: position.daySignIndex };
}
