/**
 * Display helpers for the traditional Haab' / Long Count and the modern Dreamspell count.
 * Tzolk'in day-sign index and number always come from the existing GMT 584283 engine.
 * This module does not replace or modify that engine.
 */
import { calculateTzolkinPosition, gregorianToJdn } from './maya-calendar-core.js';

export const DAY_SIGN_DISPLAY = Object.freeze([
  { slug: 'imix', name: 'Imix', colonial: 'Imix' },
  { slug: 'ik', name: "Ik'", colonial: 'Ik' },
  { slug: 'akbal', name: "Ak'bal", colonial: 'Akbal' },
  { slug: 'kan', name: "K'an", colonial: 'Kan' },
  { slug: 'chikchan', name: 'Chikchan', colonial: 'Chicchan' },
  { slug: 'kimi', name: 'Kimi', colonial: 'Cimi' },
  { slug: 'manik', name: "Manik'", colonial: 'Manik' },
  { slug: 'lamat', name: 'Lamat', colonial: 'Lamat' },
  { slug: 'muluk', name: 'Muluk', colonial: 'Muluc' },
  { slug: 'ok', name: 'Ok', colonial: 'Oc' },
  { slug: 'chuwen', name: 'Chuwen', colonial: 'Chuen' },
  { slug: 'eb', name: 'Eb', colonial: 'Eb' },
  { slug: 'ben', name: 'Ben', colonial: 'Ben' },
  { slug: 'ix', name: 'Ix', colonial: 'Ix' },
  { slug: 'men', name: 'Men', colonial: 'Men' },
  { slug: 'kib', name: 'Kib', colonial: 'Cib' },
  { slug: 'kaban', name: 'Kaban', colonial: 'Caban' },
  { slug: 'etznab', name: "Etz'nab", colonial: 'Etznab' },
  { slug: 'kawak', name: 'Kawak', colonial: 'Cauac' },
  { slug: 'ajaw', name: 'Ajaw', colonial: 'Ahau' },
]);

export const HAAB_MONTHS = Object.freeze([
  'Pop', 'Wo', 'Sip', "Sotz'", 'Sek', 'Xul', "Yaxk'in", 'Mol', "Ch'en",
  'Yax', "Sak'", 'Keh', 'Mak', "K'ank'in", 'Muwan', 'Pax', "K'ayab", "Kumk'u",
]);

export const DREAMSPELL_TONE_NAMES = Object.freeze([
  'Magnetic', 'Lunar', 'Electric', 'Self-Existing', 'Overtone', 'Rhythmic',
  'Resonant', 'Galactic', 'Solar', 'Planetary', 'Spectral', 'Crystal', 'Cosmic',
]);

export const DREAMSPELL_SEAL_CREATURES = Object.freeze([
  'Dragon', 'Wind', 'Night', 'Seed', 'Serpent', 'World-Bridger', 'Hand', 'Star',
  'Moon', 'Dog', 'Monkey', 'Human', 'Skywalker', 'Wizard', 'Eagle', 'Warrior',
  'Earth', 'Mirror', 'Storm', 'Sun',
]);

export const DREAMSPELL_COLORS = Object.freeze(['Red', 'White', 'Blue', 'Yellow']);

export const DREAMSPELL_EPOCH = Object.freeze({ day: 26, month: 7, year: 1987 });

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const positiveModulo = (value, divisor) => ((value % divisor) + divisor) % divisor;

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function addDays(parts, delta) {
  const shifted = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + delta));
  return {
    day: shifted.getUTCDate(),
    month: shifted.getUTCMonth() + 1,
    year: shifted.getUTCFullYear(),
  };
}

export function formatGregorian(parts) {
  return `${parts.day} ${MONTH_ABBR[parts.month - 1]} ${parts.year}`;
}

export function displayForColonial(name) {
  return DAY_SIGN_DISPLAY.find((sign) => sign.colonial === name) ?? null;
}

export function traditionalPosition(toneNumber, daySignIndex) {
  for (let k = 1; k <= 260; k += 1) {
    if (((k - 1) % 13) + 1 === toneNumber && (k - 1) % 20 === daySignIndex) return k;
  }
  throw new Error('No Tzolk\'in position for the supplied number and sign.');
}

export function haabFromDays(daysSinceCorrelation) {
  const pos = positiveModulo(daysSinceCorrelation + 348, 365);
  if (pos >= 360) {
    return { day: pos - 360, month: "Wayeb'", label: `${pos - 360} Wayeb'` };
  }
  const month = HAAB_MONTHS[Math.floor(pos / 20)];
  const day = pos % 20;
  return { day, month, label: `${day} ${month}` };
}

export function longCountFromDays(daysSinceCorrelation) {
  const units = [144000, 7200, 360, 20, 1];
  const parts = [];
  let rest = daysSinceCorrelation;
  for (const unit of units) {
    parts.push(Math.floor(rest / unit));
    rest -= parts[parts.length - 1] * unit;
  }
  return parts.join('.');
}

export function describeTraditional(parts) {
  const position = calculateTzolkinPosition(parts);
  const sign = DAY_SIGN_DISPLAY[position.daySignIndex];
  const haab = haabFromDays(position.daysSinceCorrelation);
  return {
    ...position,
    sign,
    tzolkinLabel: `${position.toneNumber} ${sign.name}`,
    haab,
    longCount: longCountFromDays(position.daysSinceCorrelation),
    traditionalPosition: traditionalPosition(position.toneNumber, position.daySignIndex),
  };
}

function leapDaysStrictlyBetween(earlier, later) {
  const startJdn = gregorianToJdn(earlier);
  const endJdn = gregorianToJdn(later);
  let count = 0;
  for (let year = earlier.year; year <= later.year; year += 1) {
    if (!isLeapYear(year)) continue;
    const leapJdn = gregorianToJdn({ day: 29, month: 2, year });
    if (leapJdn > startJdn && leapJdn < endJdn) count += 1;
  }
  return count;
}

/**
 * Dreamspell day distance from 26 July 1987, excluding every 29 February.
 * Positive after the anchor, negative before it, zero on the anchor.
 */
export function dreamspellDayOffset(parts) {
  const targetJdn = gregorianToJdn(parts);
  const epochJdn = gregorianToJdn(DREAMSPELL_EPOCH);
  if (targetJdn === epochJdn) return 0;
  const forward = targetJdn > epochJdn;
  const earlier = forward ? DREAMSPELL_EPOCH : parts;
  const later = forward ? parts : DREAMSPELL_EPOCH;
  const span = gregorianToJdn(later) - gregorianToJdn(earlier) - leapDaysStrictlyBetween(earlier, later);
  return forward ? span : -span;
}

export function describeDreamspell(parts) {
  if (parts.month === 2 && parts.day === 29) {
    return {
      hunabKu: true,
      label: '0.0 Hunab Ku',
      kin: null,
      tone: null,
      seal: null,
    };
  }

  const offset = dreamspellDayOffset(parts);
  const kin = positiveModulo(33 + offset, 260) + 1;
  const toneNumber = ((kin - 1) % 13) + 1;
  const sealNumber = ((kin - 1) % 20) + 1;
  const toneName = DREAMSPELL_TONE_NAMES[toneNumber - 1];
  const color = DREAMSPELL_COLORS[(sealNumber - 1) % 4];
  const creature = DREAMSPELL_SEAL_CREATURES[sealNumber - 1];
  return {
    hunabKu: false,
    kin,
    toneNumber,
    toneName,
    sealNumber,
    color,
    creature,
    label: `Kin ${kin} ${color} ${toneName} ${creature}`,
  };
}

export function describeDate(parts) {
  return {
    gregorian: formatGregorian(parts),
    traditional: describeTraditional(parts),
    dreamspell: describeDreamspell(parts),
  };
}

export function upcomingBySign(from, signIndex, count = 8) {
  const rows = [];
  let cursor = from;
  for (let step = 0; step < 400 && rows.length < count; step += 1) {
    const traditional = describeTraditional(cursor);
    if (traditional.daySignIndex === signIndex) {
      rows.push({
        parts: cursor,
        gregorian: formatGregorian(cursor),
        traditional,
        dreamspell: describeDreamspell(cursor),
      });
    }
    cursor = addDays(cursor, 1);
  }
  return rows;
}

export function upcomingByTone(from, toneNumber, count = 8) {
  const rows = [];
  let cursor = from;
  for (let step = 0; step < 400 && rows.length < count; step += 1) {
    const traditional = describeTraditional(cursor);
    if (traditional.toneNumber === toneNumber) {
      rows.push({
        parts: cursor,
        gregorian: formatGregorian(cursor),
        traditional,
        dreamspell: describeDreamspell(cursor),
      });
    }
    cursor = addDays(cursor, 1);
  }
  return rows;
}

export function nextCombo(from, signIndex, toneNumber) {
  let cursor = from;
  for (let step = 0; step < 261; step += 1) {
    const traditional = describeTraditional(cursor);
    if (traditional.daySignIndex === signIndex && traditional.toneNumber === toneNumber) {
      return {
        parts: cursor,
        gregorian: formatGregorian(cursor),
        traditional,
        dreamspell: describeDreamspell(cursor),
      };
    }
    cursor = addDays(cursor, 1);
  }
  return null;
}

export function currentTrecena(from) {
  const today = describeTraditional(from);
  const start = addDays(from, 1 - today.toneNumber);
  const rows = [];
  for (let i = 0; i < 13; i += 1) {
    const parts = addDays(start, i);
    rows.push({
      parts,
      gregorian: formatGregorian(parts),
      traditional: describeTraditional(parts),
      dreamspell: describeDreamspell(parts),
    });
  }
  return rows;
}

export function todayParts(date = new Date()) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}
