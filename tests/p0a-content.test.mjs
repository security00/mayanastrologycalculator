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

const DAY_SIGN_TITLES = {
  'day-signs/index': ['The 20 Maya Day Signs: Names, Meanings & Glyphs', "All 20 day signs of the 260-day Maya calendar, with Yucatec and K'iche' names, glyph notes, and upcoming dates. Traditional count (GMT 584283)."],
  'day-signs/imix': ['Imix (Imox) Maya Day Sign: Meaning, Glyph & Dates', "Imix (K'iche' Imox) is the first of the 20 Maya day signs: waterlily glyph, traditional associations, Dreamspell alias notes, and upcoming dates."],
  'day-signs/ik': ["Ik' (Iq') Maya Day Sign: Wind, Breath & Dates", "Ik' (K'iche' Iq') is the 2nd Maya day sign: the glyph for wind and breath, year-bearer role, traditional notes, and upcoming dates (GMT 584283)."],
  'day-signs/akbal': ["Ak'bal (Aq'ab'al) Maya Day Sign: Night & Dawn", "Ak'bal (K'iche' Aq'ab'al) is the 3rd Maya day sign: night and darkness in Classical Yucatec, dawn associations, and upcoming dates under GMT 584283."],
  'day-signs/kan': ["K'an (K'at) Maya Day Sign: Ripe Maize, Meaning & Dates", "K'an (K'iche' K'at) is the 4th Maya day sign: yellow, ripe maize; glyph history, traditional associations, and upcoming dates under GMT 584283."],
  'day-signs/chikchan': ['Chikchan (Kan) Maya Day Sign: The Serpent Day', "Chikchan (K'iche' Kan) is the 5th Maya day sign: serpent associations in highland tradition, glyph notes, and upcoming dates under GMT 584283."],
  'day-signs/kimi': ['Kimi (Kame) Maya Day Sign: Death, Ancestors & Dates', "Kimi (K'iche' Kame) is the 6th Maya day sign: the death-god glyph, ancestor associations in tradition, and upcoming dates under GMT 584283."],
  'day-signs/manik': ["Manik' (Kej) Maya Day Sign: Deer Day & Hand Glyph", "Manik' (K'iche' Kej) is the 7th Maya day sign: why a deer day is written with a hand glyph, traditional associations, and upcoming dates."],
  'day-signs/lamat': ["Lamat (Q'anil) Maya Day Sign: Venus, Maize & Dates", "Lamat (K'iche' Q'anil) is the 8th Maya day sign: Venus-star glyph, ripe-maize readings, traditional notes, and upcoming dates under GMT 584283."],
  'day-signs/muluk': ['Muluk (Toj) Maya Day Sign: The Jar, Payment & Dates', "Muluk (K'iche' Toj) is the 9th Maya day sign: inverted-jar glyph, payment and offering associations, and upcoming dates under GMT 584283."],
  'day-signs/ok': ["Ok (Tz'i') Maya Day Sign: The Dog Day, Meaning & Dates", "Ok (K'iche' Tz'i') is the 10th Maya day sign: the dog that guides the dead, traditional associations, and upcoming dates under GMT 584283."],
  'day-signs/chuwen': ["Chuwen (B'atz') Maya Day Sign: Monkey Artisan Day", "Chuwen (K'iche' B'atz') is the 11th Maya day sign: howler-monkey artisan, trecena and New Year roles, and upcoming dates under GMT 584283."],
  'day-signs/eb': ['Eb (E) Maya Day Sign: Meaning, Glyph, Year Bearer', "Eb (K'iche' E) is the 12th Maya day sign: jawbone glyph with rain marks, year-bearer role, and upcoming dates under GMT 584283."],
  'day-signs/ben': ['Ben (Aj) Maya Day Sign: Young Maize, Dates', 'Ben (K\'iche\' Aj) is the 13th Maya day sign: a glyph that began as maize on a stalk—not simply "reed"—and upcoming dates under GMT 584283.'],
  'day-signs/ix': ["Ix (I'x) Maya Day Sign: Jaguar Glyph & Dates", "Ix (K'iche' I'x) is the 14th Maya day sign: a glyph that began as a spotted animal eye, later read as jaguar; upcoming dates under GMT 584283."],
  'day-signs/men': ["Men (Tz'ikin) Maya Day Sign: Bird Glyph & Dates", "Men (K'iche' Tz'ikin) is the 15th Maya day sign: a glyph that began as the Principal Bird Deity, later bird readings, and upcoming dates."],
  'day-signs/kib': ['Kib (Ajmaq) Maya Day Sign: Wax, Ancestors & Dates', 'Kib (K\'iche\' Ajmaq) is the 16th Maya day sign: Yucatec "wax," highland ancestor readings; "Owl" has no source; upcoming dates under GMT 584283.'],
  'day-signs/kaban': ["Kaban (No'j) Maya Day Sign: Earth, Thought & Dates", "Kaban (K'iche' No'j) is the 17th Maya day sign: the glyph for earth, thought associations in tradition, and upcoming dates under GMT 584283."],
  'day-signs/etznab': ["Etz'nab (Tijax) Maya Day Sign: Flint Blade & Dates", "Etz'nab (K'iche' Tijax) is the 18th Maya day sign: the flint-blade glyph, ritual associations in tradition, and upcoming dates under GMT 584283."],
  'day-signs/kawak': ['Kawak (Kawoq) Maya Day Sign: Storm, Rain & Dates', "Kawak (K'iche' Kawoq) is the 19th Maya day sign: storm and rain names, glyph notes, traditional associations, and upcoming dates under GMT 584283."],
  'day-signs/ajaw': ['Ajaw (Ahau) Maya Day Sign: Lord, Period Endings', "Ajaw (Ahau; K'iche' Ajpu') is the 20th Maya day sign: the word for lord, k'atun endings, traditional associations, and upcoming dates under GMT 584283."],
};

test('day-sign titles and metas use the approved short copy', () => {
  assert.equal(Object.keys(DAY_SIGN_TITLES).length, 21);
  for (const [key, [title, description]] of Object.entries(DAY_SIGN_TITLES)) {
    const draft = loadDraft(key);
    assert.equal(draft.title, title, key);
    assert.equal(draft.description, description, key);
    assert.ok(draft.title.length <= 60, `${key} title ${draft.title.length}`);
    assert.ok(draft.description.length <= 160, `${key} meta ${draft.description.length}`);
  }
  assert.equal(loadDraft('day-signs/etznab').h1, "Etz'nab (Tijax): The Flint Day, Eighteenth Sign of the Maya Calendar");
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
