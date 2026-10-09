import assert from 'node:assert/strict';
import test from 'node:test';
import { gregorianToJdn } from '../shared/maya-calendar-core.js';
import {
  addDays,
  describeDate,
  describeDreamspell,
  describeTraditional,
} from '../shared/dual-calendar.js';

/**
 * The 19 rows from p0a-drafts/00-README.md. External checks are recorded there;
 * these assertions lock the converter to that table.
 */
const ROWS = [
  ['2000-01-01', 2451545, 1867262, "11 Ik'", "10 K'ank'in", '12.19.6.15.2', 'Kin 153 Red Planetary Skywalker'],
  ['2012-12-21', 2456283, 1872000, '4 Ajaw', "3 K'ank'in", '13.0.0.0.0', 'Kin 207 Blue Crystal Hand'],
  ['2025-01-18', 2460694, 1876411, '8 Chuwen', '14 Muwan', '13.0.12.4.11', 'Kin 195 Blue Cosmic Eagle'],
  ['2025-10-05', 2460954, 1876671, '8 Chuwen', '9 Yax', '13.0.12.17.11', 'Kin 195 Blue Cosmic Eagle'],
  ['1987-06-23', 2446970, 1862687, "12 Manik'", "15 Sotz'", '12.18.14.2.7', 'Kin 1 Red Magnetic Dragon'],
  ['1987-07-26', 2447003, 1862720, '6 Ajaw', '8 Xul', '12.18.14.4.0', 'Kin 34 White Galactic Wizard'],
  ['1987-08-16', 2447024, 1862741, '1 Imix', "9 Yaxk'in", '12.18.14.5.1', 'Kin 55 Blue Electric Eagle'],
  ['1987-08-17', 2447025, 1862742, "2 Ik'", "10 Yaxk'in", '12.18.14.5.2', 'Kin 56 Yellow Self-Existing Warrior'],
  ['1993-07-26', 2449195, 1864912, '1 Eb', '10 Xul', '12.19.0.5.12', 'Kin 144 Yellow Magnetic Seed'],
  ['2013-07-26', 2456500, 1872217, '13 Kaban', '15 Xul', '13.0.0.10.17', 'Kin 164 Yellow Galactic Seed'],
  ['2026-10-09', 2461323, 1877040, '13 Ajaw', '13 Yax', '13.0.14.0.0', 'Kin 44 Yellow Overtone Seed'],
  ['2026-10-10', 2461324, 1877041, '1 Imix', '14 Yax', '13.0.14.0.1', 'Kin 45 Red Rhythmic Serpent'],
  ['2000-02-29', 2451604, 1867321, '5 Imix', "9 K'ayab", '12.19.7.0.1', '0.0 Hunab Ku'],
  ['2032-09-07', 2463483, 1879200, '2 Ajaw', "3 Ch'en", '13.1.0.0.0', 'Kin 122 White Overtone Wind'],
  ['2052-05-25', 2470683, 1886400, '13 Ajaw', "3 Sotz'", '13.2.0.0.0', 'Kin 37 Red Spectral Earth'],
  ['2190-05-22', 2521083, 1936800, '12 Ajaw', '13 Sek', '13.9.0.0.0', 'Kin 224 Yellow Electric Seed'],
  ['1934-02-14', 2427483, 1843200, '12 Ajaw', '18 Muwan', '12.16.0.0.0', 'Kin 27 Blue Magnetic Hand'],
  ['1993-04-05', 2449083, 1864800, '6 Ajaw', "3 Wayeb'", '12.19.0.0.0', 'Kin 32 Yellow Rhythmic Human'],
  ['2027-03-09', 2461474, 1877191, '8 Chuwen', "4 Kumk'u", '13.0.14.7.11', 'Kin 195 Blue Cosmic Eagle'],
];

function partsFromIso(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return { day, month, year };
}

test('verification table: JDN, traditional count, Haab, Long Count, Dreamspell', () => {
  for (const [iso, jdn, days, tzolkin, haab, longCount, dreamspell] of ROWS) {
    const parts = partsFromIso(iso);
    assert.equal(gregorianToJdn(parts), jdn, `${iso} JDN`);
    const described = describeDate(parts);
    assert.equal(described.traditional.daysSinceCorrelation, days, `${iso} days`);
    assert.equal(described.traditional.tzolkinLabel, tzolkin, `${iso} tzolkin`);
    assert.equal(described.traditional.haab.label, haab, `${iso} haab`);
    assert.equal(described.traditional.longCount, longCount, `${iso} long count`);
    assert.equal(described.dreamspell.label, dreamspell, `${iso} dreamspell`);
  }
});

test('29 February is skipped: 2000-03-01 continues the kin after 2000-02-28', () => {
  const feb28 = describeDreamspell({ day: 28, month: 2, year: 2000 });
  const feb29 = describeDreamspell({ day: 29, month: 2, year: 2000 });
  const mar1 = describeDreamspell({ day: 1, month: 3, year: 2000 });
  assert.equal(feb29.hunabKu, true);
  assert.equal(feb29.label, '0.0 Hunab Ku');
  assert.equal(mar1.kin, feb28.kin + 1);

  const traditional28 = describeTraditional({ day: 28, month: 2, year: 2000 });
  const traditionalMar = describeTraditional({ day: 1, month: 3, year: 2000 });
  assert.equal(traditional28.tzolkinLabel, '4 Ajaw');
  assert.equal(describeTraditional({ day: 29, month: 2, year: 2000 }).tzolkinLabel, '5 Imix');
  assert.equal(traditionalMar.tzolkinLabel, "6 Ik'");
});

test('a tone-page row uses day 0 of a Haab month', () => {
  const described = describeTraditional({ day: 5, month: 11, year: 2026 });
  assert.equal(described.tzolkinLabel, "1 Manik'");
  assert.equal(described.haab.label, '0 Keh');
});

test('addDays crosses a leap day without dropping 29 February from the traditional count', () => {
  const next = addDays({ day: 28, month: 2, year: 2000 }, 1);
  assert.deepEqual(next, { day: 29, month: 2, year: 2000 });
});
