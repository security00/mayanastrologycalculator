import { calculateTzolkinPosition } from './maya-calendar-core.js';
import { DAY_SIGN_DISPLAY } from './dual-calendar.js';

export function utcCivilParts(now = new Date()) {
  return {
    day: now.getUTCDate(),
    month: now.getUTCMonth() + 1,
    year: now.getUTCFullYear(),
  };
}

export function formatIso(parts) {
  const month = String(parts.month).padStart(2, '0');
  const day = String(parts.day).padStart(2, '0');
  return `${parts.year}-${month}-${day}`;
}

/** Weekday and long date for a civil Y-M-D, independent of the host timezone. */
export function formatCivilLong(parts) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)));
}

export function secondsUntilUtcMidnight(now = new Date()) {
  const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(60, Math.ceil((next - now.getTime()) / 1000));
}

export function signatureForCivilDate(parts) {
  const position = calculateTzolkinPosition(parts);
  const sign = DAY_SIGN_DISPLAY[position.daySignIndex];
  if (!sign) throw new RangeError(`Day sign index ${position.daySignIndex} is out of range.`);
  return {
    day: parts.day,
    month: parts.month,
    year: parts.year,
    iso: formatIso(parts),
    longDate: formatCivilLong(parts),
    tone: position.toneNumber,
    nawal: sign.colonial,
    slug: sign.slug,
    daySignIndex: position.daySignIndex,
  };
}

export function buildUtcTodaySignature(now = new Date()) {
  return signatureForCivilDate(utcCivilParts(now));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function renderTodayUtcSection(signature) {
  const label = `${signature.tone} ${signature.nawal}`;
  return `<section id="today-utc" data-utc-date="${escapeHtml(signature.iso)}" data-tone="${signature.tone}" data-nawal="${escapeHtml(signature.nawal)}">
  <p class="text-sm font-semibold text-gold-bright mb-2">UTC civil date</p>
  <h2 class="text-3xl md:text-4xl font-display text-[var(--parchment)] mb-2">${escapeHtml(label)}</h2>
  <p class="text-[var(--parchment-dim)] mb-3">${escapeHtml(signature.longDate)}</p>
  <p class="text-[var(--parchment-dim)]">Tzolk'in tone ${signature.tone}, day sign (Nawal) ${escapeHtml(signature.nawal)}. This is the UTC calendar date, calculated with the same GMT 584283 count as the birth-date calculator. It is a calendar position, not a forecast.</p>
  <p class="mt-4"><a class="link-gold font-semibold" href="/day-signs/${escapeHtml(signature.slug)}">Read ${escapeHtml(signature.nawal)}</a> · <a class="link-gold font-semibold" href="/galactic-tones/${signature.tone}">Read tone ${signature.tone}</a></p>
</section>`;
}

const TODAY_SECTION = /<section\b[^>]*\bid=["']today-utc["'][^>]*>[\s\S]*?<\/section>/;

export function rewriteTodayHtml(html, now = new Date()) {
  if (!TODAY_SECTION.test(html)) return html;
  return html.replace(TODAY_SECTION, renderTodayUtcSection(buildUtcTodaySignature(now)));
}
