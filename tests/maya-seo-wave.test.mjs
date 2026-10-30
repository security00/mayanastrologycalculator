import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function words(source) {
  const text = source
    .replace(/import[\s\S]*?from ['"][^'"]+['"];/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ');
  return text.split(/\s+/).filter((word) => /[A-Za-z]{3,}/.test(word)).length;
}

const pins = read('app/components/content/ReportCtaPin.tsx');

test('haab and year-bearer pages stay educational and priced', () => {
  const haab = read('app/haab/page.tsx');
  const bearer = read('app/year-bearer/page.tsx');

  assert.match(haab, /does not yet offer a Haab/);
  assert.match(haab, /Not built yet/);
  assert.match(haab, /PersonalReportPin/);
  assert.match(pins, /Get the 11-page report — \$7/);
  assert.match(pins, /Get the pair report — \$12/);
  assert.match(haab, /\/birth-chart/);
  assert.match(haab, /\/year-bearer/);
  assert.match(haab, /Wayeb/);
  assert.equal(haab.includes('【待核】'), false);
  assert.equal(haab.includes('剑主'), false);

  assert.match(bearer, /K'iche' highland four/);
  assert.match(bearer, /Later Yucatec four/);
  assert.match(bearer, /Not built yet/);
  assert.match(bearer, /Not yet/);
  assert.match(bearer, /PersonalReportPin/);
  assert.equal(bearer.includes('【待核】'), false);

  const highland = bearer.split("K&apos;iche&apos; highland four")[1].split('Do not')[0];
  assert.equal(highland.includes('Muluk'), false);
  assert.equal(highland.includes('Kej'), true);
  const yucatec = bearer.split('Later Yucatec four')[1].split('What this site will')[0];
  assert.equal(yucatec.includes('Kej'), false);
  assert.equal(yucatec.includes('No\'j'), false);
  assert.equal(yucatec.includes('Muluk'), true);
  assert.equal(yucatec.includes('/day-signs/kawak'), true);
});

test('thickened pillar pages keep chart backlinks and price tags', () => {
  const today = read('app/today/page.tsx');
  const todayWidget = read('app/today/TodayReading.tsx');
  const compatibility = read('app/compatibility/page.tsx');
  const tool = read('app/compatibility/CompatibilityTool.tsx');
  const birth = read('app/birth-chart/page.tsx');

  for (const source of [today, compatibility, birth, pins]) {
    assert.match(source, /\$7/);
    assert.match(source, /\$12/);
  }
  for (const source of [today, compatibility, birth]) {
    assert.match(source, /\/birth-chart/);
    assert.match(source, /FAQPage|faqs/);
  }

  assert.match(today, /\/haab/);
  assert.match(today, /\/year-bearer/);
  assert.match(today, /reflective, not a scientific prediction|reflective and non-predictive/);
  assert.match(todayWidget, /\/day-signs\//);
  assert.match(todayWidget, /\/galactic-tones\//);
  assert.match(todayWidget, /\/birth-chart/);
  assert.ok(words(today) >= 900, `today explainer words ${words(today)}`);

  assert.match(compatibility, /modern interpretive feature/);
  assert.match(compatibility, /not a documented historical Maya matching formula/);
  assert.match(compatibility, /PairReportPin/);
  assert.match(compatibility, /\/sample-compatibility-report/);
  assert.match(compatibility, /Get the 11-page report — \$7/);
  assert.match(compatibility, /\/sample-report/);
  assert.match(tool, /PairReportPin/);
  assert.match(pins, /Get the pair report — \$12/);
  assert.ok(words(compatibility) >= 1000, `compatibility explainer words ${words(compatibility)}`);

  assert.match(birth, /\/haab/);
  assert.match(birth, /\/year-bearer/);
  assert.match(birth, /does not yet offer a Haab'|no Haab’ calculator yet|not yet a calculator/);
  assert.match(birth, /See a full sample report first/);
});

test('sitemap and footer list the new educational urls and no kin factory', () => {
  const sitemap = read('app/sitemap.ts');
  const footer = read('app/components/SiteFooter.tsx');
  assert.match(sitemap, /\/haab/);
  assert.match(sitemap, /\/year-bearer/);
  assert.match(footer, /href="\/haab"/);
  assert.match(footer, /href="\/year-bearer"/);
  assert.equal(fs.existsSync('app/kin'), false);
  assert.equal(fs.existsSync('app/day-signs/[slug]/[kin]'), false);
  const pages = fs.readdirSync('app', { recursive: true })
    .filter((name) => String(name).endsWith('page.tsx'));
  assert.ok(pages.length < 40, pages.length);
});
