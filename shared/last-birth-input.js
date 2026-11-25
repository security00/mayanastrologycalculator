export const LAST_BIRTH_INPUT_KEY = 'mayanLastBirthInput';

export function isValidBirthInput(day, month, year) {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function parseLastBirthInput(raw) {
  if (typeof raw !== 'string' || raw.length === 0) return null;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  const day = Number(parsed?.day);
  const month = Number(parsed?.month);
  const year = Number(parsed?.year);
  if (!isValidBirthInput(day, month, year)) return null;
  return { day, month, year };
}
