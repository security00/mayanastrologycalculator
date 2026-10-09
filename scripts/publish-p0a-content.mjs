import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = '/tmp/maya-p0a/maya-content-gaps-2026-10-10/p0a-drafts';
const destRoot = path.resolve('content/p0a');

const files = [
  'day-signs/index.md',
  ...fs.readdirSync(path.join(sourceRoot, 'day-signs'))
    .filter((name) => name.endsWith('.md') && name !== '00-README.md' && name !== 'index.md')
    .sort()
    .map((name) => `day-signs/${name}`),
  'galactic-tones/index.md',
  ...fs.readdirSync(path.join(sourceRoot, 'galactic-tones'))
    .filter((name) => name.endsWith('.md') && name !== 'index.md')
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((name) => `galactic-tones/${name}`),
  'dreamspell-vs-traditional-maya-calendar.md',
  'reports.md',
  'sample-report.md',
  'sample-compatibility-report.md',
];

function publish(raw) {
  const end = raw.indexOf('<!-- BODY END -->');
  if (end === -1) throw new Error('Missing BODY END marker');
  let text = raw.slice(0, end);
  text = text.replace('<!-- BODY START -->', '').replace(/\n---\s*$/g, '\n');
  text = text.replaceAll('/haab', '/methodology');
  text = text.replaceAll("[What is the Haab'?](/methodology)", '[How we calculate](/methodology)');
  text = text.replaceAll('[YYYY-MM-DD]', '2026-10-10');
  text = text.replaceAll('Reviewed [date]', 'Reviewed 10 October 2026');
  text = text.replaceAll('Reviewed: [date]', 'Reviewed: 10 October 2026');
  text = text.replaceAll('Corrections: [contact link]', 'Corrections: [contact us](/contact)');
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  text = text.replace(/\n{3,}/g, '\n\n');

  text = text.replace(
    /title:\s*'Dreamspell vs Traditional Maya Calendar: Why Your Kin Differs'/,
    "title: 'Dreamspell vs Traditional Maya Calendar: Why Kin Differs'",
  );

  if (text.includes('剑主') || text.includes('BODY END') || text.includes('/haab')) {
    throw new Error('Publisher left builder notes or a /haab link in the body');
  }
  return `${text.trim()}\n`;
}

fs.rmSync(destRoot, { recursive: true, force: true });
for (const file of files) {
  const raw = fs.readFileSync(path.join(sourceRoot, file), 'utf8');
  const published = publish(raw);
  const dest = path.join(destRoot, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, published);
}

console.log(`Published ${files.length} drafts to ${destRoot}`);
