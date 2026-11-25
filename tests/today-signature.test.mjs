import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { DAY_SIGN_DISPLAY } from '../shared/dual-calendar.js';
import { calculateTzolkinPosition } from '../shared/maya-calendar-core.js';
import {
  buildUtcTodaySignature,
  formatIso,
  renderTodayUtcSection,
  rewriteTodayHtml,
  signatureForCivilDate,
  utcCivilParts,
} from '../shared/today-signature.js';

test('UTC civil date ignores the host timezone', () => {
  const instant = new Date(Date.UTC(2026, 10, 25, 0, 30, 0));
  assert.deepEqual(utcCivilParts(instant), { day: 25, month: 11, year: 2026 });
  assert.equal(formatIso(utcCivilParts(instant)), '2026-11-25');
});

test('today signature uses the shared Tzolk\'in position and colonial nawal name', () => {
  const parts = { day: 25, month: 11, year: 2026 };
  const position = calculateTzolkinPosition(parts);
  const signature = signatureForCivilDate(parts);
  const sign = DAY_SIGN_DISPLAY[position.daySignIndex];
  assert.equal(signature.tone, position.toneNumber);
  assert.equal(signature.nawal, sign.colonial);
  assert.equal(signature.slug, sign.slug);
  assert.equal(signature.iso, '2026-11-25');
  assert.match(signature.longDate, /November 25, 2026/);
});

test('rendered UTC section contains tone, nawal, and the Gregorian date', () => {
  const signature = signatureForCivilDate({ day: 25, month: 11, year: 2026 });
  const html = renderTodayUtcSection(signature);
  assert.match(html, new RegExp(`data-utc-date="${signature.iso}"`));
  assert.match(html, new RegExp(`data-tone="${signature.tone}"`));
  assert.match(html, new RegExp(`data-nawal="${signature.nawal}"`));
  assert.match(html, new RegExp(`>${signature.tone} ${signature.nawal}<`));
  assert.match(html, /November 25, 2026/);
  assert.match(html, /not a forecast/);
});

test('edge rewrite replaces a stale UTC section and leaves other HTML', () => {
  const stale = renderTodayUtcSection(signatureForCivilDate({ day: 1, month: 1, year: 2020 }));
  const page = `<html><head><title>Keep</title></head><body>${stale}<p>After</p></body></html>`;
  const now = new Date(Date.UTC(2026, 10, 25, 15, 0, 0));
  const rewritten = rewriteTodayHtml(page, now);
  const current = buildUtcTodaySignature(now);
  assert.match(rewritten, new RegExp(`data-utc-date="${current.iso}"`));
  assert.match(rewritten, new RegExp(`data-nawal="${current.nawal}"`));
  assert.equal(rewritten.includes('data-utc-date="2020-01-01"'), false);
  assert.match(rewritten, /<title>Keep<\/title>/);
  assert.match(rewritten, /<p>After<\/p>/);
});

test('calculator day-sign names stay aligned with the colonial display list', () => {
  const source = fs.readFileSync('app/lib/mayan-calculator.ts', 'utf8');
  const block = source.split('export const DAY_SIGNS = [')[1].split('export const GALACTIC_TONES')[0];
  const names = [...block.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(names, DAY_SIGN_DISPLAY.map((sign) => sign.colonial));
});

test('/today sitemap lastmod is a fixed page change, not a daily URL', () => {
  const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');
  assert.match(sitemap, /const todayPageUpdate = new Date\("2026-11-25"\)/);
  assert.match(sitemap, /\/today`, lastModified: todayPageUpdate/);
  assert.equal(sitemap.includes('/today/${'), false);
  assert.equal(sitemap.includes('lastModified: new Date()'), false);
});
