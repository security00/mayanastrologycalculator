import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://mayanastrologycalculator.com';
const sitemapUrl = `${origin}/sitemap.xml`;
const nonIndexablePages = ['result', 'report-success'];
const readExport = (file) => readFileSync(join('out', file), 'utf8');
const htmlHead = (file) => readExport(file).split('</head>', 1)[0];

const robotsRules = readExport('robots.txt')
  .split(/\r?\n/)
  .map((line) => line.replace(/#.*/, '').trim())
  .filter(Boolean);

assert.deepEqual(robotsRules.filter((rule) => /^user-agent:/i.test(rule)), ['User-agent: *']);
assert.deepEqual(robotsRules.filter((rule) => /^disallow:/i.test(rule)), [
  'Disallow: /admin/',
  'Disallow: /private/',
  'Disallow: /api/',
]);
assert.ok(robotsRules.includes(`Sitemap: ${sitemapUrl}`));

const urls = Array.from(readExport('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url);
assert.ok(urls.length > 0, 'expected canonical pages in sitemap');
assert.equal(new Set(urls).size, urls.length, 'duplicate sitemap URLs');

for (const url of urls) {
  const { origin: pageOrigin, pathname, search, hash } = new URL(url);
  assert.equal(pageOrigin, origin, url);
  assert.equal(search + hash, '', url);
  const route = pathname.slice(1) || 'index';
  assert.ok(!nonIndexablePages.includes(route), url);

  const head = htmlHead(`${route}.html`);
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `missing canonical for ${url}`);
  assert.equal(new URL(canonical).href, new URL(url).href, url);
  assert.match(head, /<title>[^<]+<\/title>/, url);
  assert.doesNotMatch(head, /<meta name="robots" content="[^"]*\bnoindex\b/i, url);
}

for (const route of nonIndexablePages) {
  assert.match(htmlHead(`${route}.html`), /<meta name="robots" content="noindex, nofollow"/, route);
}

const noindexRules = readExport('_headers')
  .replaceAll('\r\n', '\n')
  .trim()
  .split(/\n(?=\S)/)
  .filter((section) => /^\s+X-Robots-Tag:\s*.*\bnoindex\b/im.test(section))
  .map((section) => section.split('\n', 1)[0]);
assert.deepEqual(noindexRules, ['/samples/*']);

const todayHtml = readExport('today.html');
assert.match(todayHtml, /id="today-utc"/);
assert.match(todayHtml, /data-utc-date="\d{4}-\d{2}-\d{2}"/);
assert.match(todayHtml, /data-tone="(?:[1-9]|1[0-3])"/);
assert.match(todayHtml, /data-nawal="[^"]+"/);
assert.doesNotMatch(todayHtml, /Calculating today's Tzolk'in day sign/);

const sitemapXml = readExport('sitemap.xml');
const todayEntries = [...sitemapXml.matchAll(/<loc>(https:\/\/mayanastrologycalculator\.com\/today[^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)];
assert.equal(todayEntries.length, 1, 'sitemap should list one /today URL');
assert.equal(todayEntries[0][1], 'https://mayanastrologycalculator.com/today');
assert.match(todayEntries[0][2], /^2026-11-25/);

console.log(`export SEO ok: ${urls.length} canonical pages and ${nonIndexablePages.length} utility pages`);
