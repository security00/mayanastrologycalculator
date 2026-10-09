import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileKeyFromPath, listDraftFiles, loadDraft, parseFrontmatter, renderMarkdown } from '../shared/draft-render.js';

const ROOT = path.resolve('content/p0a');
const SLUGS = [
  'imix', 'ik', 'akbal', 'kan', 'chikchan', 'kimi', 'manik', 'lamat', 'muluk', 'ok',
  'chuwen', 'eb', 'ben', 'ix', 'men', 'kib', 'kaban', 'etznab', 'kawak', 'ajaw',
];

function readPublished(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

test('published drafts contain no builder notes, Haab stubs, or unfilled placeholders', () => {
  for (const file of listDraftFiles()) {
    const raw = fs.readFileSync(file, 'utf8');
    assert.equal(raw.includes('BODY END'), false, file);
    assert.equal(raw.includes('BODY START'), false, file);
    assert.equal(raw.includes('剑主'), false, file);
    assert.equal(raw.includes('/haab'), false, file);
    assert.equal(raw.includes('[date]'), false, file);
    assert.equal(raw.includes('[YYYY-MM-DD]'), false, file);
    assert.equal(raw.includes('[contact link]'), false, file);
  }
});

test('each day-sign page keeps all 13 number anchors', () => {
  let count = 0;
  for (const slug of SLUGS) {
    const raw = readPublished(`day-signs/${slug}.md`);
    for (let number = 1; number <= 13; number += 1) {
      const id = `${number}-${slug}`;
      assert.equal(raw.includes(`<a id="${id}"></a>`), true, id);
      count += 1;
    }
  }
  assert.equal(count, 260);
});

test('each tone page links all 20 day-sign anchors for that number', () => {
  let count = 0;
  for (let tone = 1; tone <= 13; tone += 1) {
    const { body } = parseFrontmatter(readPublished(`galactic-tones/${tone}.md`));
    for (const slug of SLUGS) {
      const href = `/day-signs/${slug}#${tone}-${slug}`;
      assert.equal(body.includes(href), true, href);
      count += 1;
    }
  }
  assert.equal(count, 260);
});

test('markdown rendering keeps the Imix number anchors', () => {
  const draft = loadDraft('day-signs/imix');
  const html = draft.blocks
    .filter((block) => block.type === 'md')
    .map((block) => renderMarkdown(block.markdown))
    .join('\n');
  assert.equal(typeof html, 'string');
  assert.match(html, /<a id="7-imix"><\/a>/);
  assert.match(html, /<a id="1-imix"><\/a>/);
  assert.match(html, /<a id="13-imix"><\/a>/);
});

test('sample pages are indexable and self-canonical, and reports replaces pricing', () => {
  for (const key of ['sample-report', 'sample-compatibility-report', 'reports']) {
    const draft = loadDraft(key);
    assert.equal(draft.robots, 'index, follow');
    assert.equal(draft.canonical, `https://mayanastrologycalculator.com${draft.canonicalPath}`);
  }
  assert.equal(loadDraft('sample-report').canonicalPath, '/sample-report');
  assert.match(readPublished('sample-report.md'), /personal-mayan-signature-report-sample-transparent-v3\.pdf/);
  const redirects = fs.readFileSync('public/_redirects', 'utf8');
  assert.match(redirects, /\/pricing \/reports 301/);
  assert.match(redirects, /\/day-signs\/ahau \/day-signs\/ajaw 301/);
  assert.match(redirects, /\/day-signs\/cib \/day-signs\/kib 301/);
  assert.match(redirects, /\/day-signs\/caban \/day-signs\/kaban 301/);
  assert.match(redirects, /\/day-signs\/chicchan \/day-signs\/chikchan 301/);
  const headers = fs.readFileSync('public/_headers', 'utf8');
  assert.match(headers, /\/samples\/\*[\s\S]*X-Robots-Tag: noindex, nofollow/);
});

test('sitemap includes the new content routes and not the PDF samples', () => {
  const existing = new Set(['/day-signs', '/galactic-tones']);
  const routes = listDraftFiles()
    .map((file) => fileKeyFromPath(file))
    .map((key) => (key.endsWith('/index') ? `/${key.slice(0, -'/index'.length)}` : `/${key}`))
    .filter((route) => !existing.has(route));
  assert.equal(routes.length, 37);
  for (const required of [
    '/day-signs/imix',
    '/day-signs/ajaw',
    '/day-signs/kib',
    '/galactic-tones/1',
    '/galactic-tones/13',
    '/dreamspell-vs-traditional-maya-calendar',
    '/reports',
    '/sample-report',
    '/sample-compatibility-report',
  ]) {
    assert.equal(routes.includes(required), true, required);
  }
  assert.equal(routes.some((route) => route.endsWith('.pdf')), false);
});

test('approved Dreamspell title stays within 60 characters', () => {
  const draft = loadDraft('dreamspell-vs-traditional-maya-calendar');
  assert.equal(draft.title, 'Dreamspell vs Traditional Maya Calendar: Why Kin Differs');
  assert.ok(draft.title.length <= 60, draft.title.length);
});

test('tone pages with a single purchase row label it as the footer placement', () => {
  const tone = loadDraft('galactic-tones/1');
  const actions = tone.blocks.filter((block) => block.type === 'action');
  assert.equal(actions.length, 1);
  assert.equal(actions[0].placement, 'tone_page_footer');
  assert.equal(actions[0].secondaryLabel, 'See a full sample report first →');
  const hub = loadDraft('galactic-tones/index');
  assert.equal(hub.blocks.find((block) => block.type === 'action').placement, 'tone_hub_footer');
  const sign = loadDraft('day-signs/imix');
  const signActions = sign.blocks.filter((block) => block.type === 'action');
  assert.deepEqual(signActions.map((block) => block.placement), ['day_sign_mid', 'day_sign_footer']);
});
