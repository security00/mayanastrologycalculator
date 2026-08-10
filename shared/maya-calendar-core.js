export const GMT_CORRELATION_CONSTANT = 584283;
export const MAYA_CALCULATION_VERSION = 'gmt584283-proleptic-gregorian-v1';

const positiveModulo = (value, divisor) => ((value % divisor) + divisor) % divisor;

/**
 * Convert a proleptic Gregorian civil date to an integer Julian Day Number.
 * Years use astronomical numbering when values at or below zero are supplied.
 */
export function gregorianToJdn({ day, month, year }) {
  const a = Math.floor((14 - month) / 12);
  const adjustedYear = year + 4800 - a;
  const adjustedMonth = month + 12 * a - 3;

  return day
    + Math.floor((153 * adjustedMonth + 2) / 5)
    + 365 * adjustedYear
    + Math.floor(adjustedYear / 4)
    - Math.floor(adjustedYear / 100)
    + Math.floor(adjustedYear / 400)
    - 32045;
}

/**
 * Return the deterministic Tzolk'in position for a Gregorian civil date.
 * Interpretation data deliberately lives outside this calculation module.
 */
export function calculateTzolkinPosition({ day, month, year }) {
  const jdn = gregorianToJdn({ day, month, year });
  const daysSinceCorrelation = jdn - GMT_CORRELATION_CONSTANT;

  return Object.freeze({
    jdn,
    daysSinceCorrelation,
    toneNumber: positiveModulo(daysSinceCorrelation + 3, 13) + 1,
    daySignIndex: positiveModulo(daysSinceCorrelation + 19, 20),
    correlationConstant: GMT_CORRELATION_CONSTANT,
    calculationVersion: MAYA_CALCULATION_VERSION,
  });
}
