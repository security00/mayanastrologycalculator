import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const legacySlugs = ['chicchan', 'cimi', 'muluc', 'oc', 'chuen', 'cib', 'caban', 'cauac', 'ahau', 'ahaw'];
const newSlugs = ['imix', 'ik', 'akbal', 'kan', 'chikchan', 'kimi', 'manik', 'lamat', 'muluk', 'ok', 'chuwen', 'eb', 'ben', 'ix', 'men', 'kib', 'kaban', 'etznab', 'kawak', 'ajaw'];

function redirectSources(filePath) {
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [source, destination, code] = line.split(/\s+/);
      assert.equal(code, '301', line);
      assert.ok(destination?.startsWith('/'), line);
      return source;
    });
}

const publicRedirects = redirectSources('public/_redirects');
const routes = JSON.parse(fs.readFileSync('public/_routes.json', 'utf8'));
assert.deepEqual(routes.include, ['/api/*']);
for (const source of publicRedirects) {
  assert.ok(routes.exclude.includes(source), `missing _routes.json exclude for ${source}`);
}

const outDir = 'out';
assert.ok(fs.existsSync(path.join(outDir, '_redirects')), 'out/_redirects missing');
assert.equal(fs.readFileSync(path.join(outDir, '_redirects'), 'utf8'), fs.readFileSync('public/_redirects', 'utf8'));
assert.equal(fs.readFileSync(path.join(outDir, '_routes.json'), 'utf8'), fs.readFileSync('public/_routes.json', 'utf8'));

const forbidden = [
  'pricing.html',
  path.join('pricing', 'index.html'),
  ...legacySlugs.flatMap((slug) => [
    path.join('day-signs', `${slug}.html`),
    path.join('day-signs', slug, 'index.html'),
  ]),
];
for (const relative of forbidden) {
  assert.equal(fs.existsSync(path.join(outDir, relative)), false, `unexpected export ${relative}`);
}
for (const slug of newSlugs) {
  assert.equal(fs.existsSync(path.join(outDir, 'day-signs', `${slug}.html`)), true, `missing ${slug}`);
}
assert.equal(fs.existsSync(path.join(outDir, 'reports.html')), true);

console.log(`export redirects ok: ${publicRedirects.length} rules, no legacy HTML in out/`);
