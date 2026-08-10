import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderReportHtml } from '../shared/report-engine.js';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporaryDir = join(rootDir, 'tmp', 'pdfs');
const outputDir = join(rootDir, 'output', 'pdf');
const publicDir = join(rootDir, 'public', 'samples');
const coverPath = join(rootDir, 'public', 'tzolkin-astrology-chart.png').replace(/\\/g, '/');

for (const directory of [temporaryDir, outputDir, publicDir]) mkdirSync(directory, { recursive: true });

const order = {
  id: 'anonymous-sample',
  birth_day: 1,
  birth_month: 1,
  birth_year: 2000,
};

const browser = findBrowser();

for (const sample of [
  { suffix: '', offerVariant: 'legacy_v2' },
  { suffix: '-transparent-v3', offerVariant: 'transparent_v3' },
]) {
  const basename = `personal-mayan-signature-report-sample${sample.suffix}`;
  const htmlPath = join(temporaryDir, `${basename}.html`);
  const outputPath = join(outputDir, `${basename}.pdf`);
  const publicPath = join(publicDir, `${basename}.pdf`);

  writeFileSync(
    htmlPath,
    renderReportHtml(order, { coverImageUrl: `file:///${coverPath}`, offerVariant: sample.offerVariant }),
    'utf8',
  );
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outputPath}`,
    `file:///${htmlPath.replace(/\\/g, '/')}`,
  ], { stdio: 'ignore' });
  copyFileSync(outputPath, publicPath);
  console.log(`Sample PDF: ${outputPath}`);
  console.log(`Public copy: ${publicPath}`);
}

function findBrowser() {
  const candidates = [
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const browser = candidates.find((candidate) => existsSync(candidate));
  if (!browser) throw new Error('No Edge or Chrome executable found for PDF export.');
  return browser;
}
