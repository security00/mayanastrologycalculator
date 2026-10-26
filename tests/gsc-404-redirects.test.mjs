import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const GSC_PATH_REDIRECTS = [
  ['/utm_source=dev.to', '/?utm_source=dev.to'],
  ['/utm_source=dev.to/', '/?utm_source=dev.to'],
  ['/utm_source=reddit.com', '/?utm_source=reddit.com'],
  ['/utm_source=reddit.com/', '/?utm_source=reddit.com'],
  ['/utm_source%3Ddev.to', '/?utm_source=dev.to'],
  ['/utm_source%3Ddev.to/', '/?utm_source=dev.to'],
  ['/utm_source%3Dreddit.com', '/?utm_source=reddit.com'],
  ['/utm_source%3Dreddit.com/', '/?utm_source=reddit.com'],
  ['/utm_source=*', '/?utm_source=:splat'],
  ['/utm_source%3D*', '/?utm_source=:splat'],
];

const FORBIDDEN_LINK_SNIPPETS = [
  'https://www.mayanastrologycalculator.com',
  'http://www.mayanastrologycalculator.com',
  'mayanastrologycalculator.com/utm_source',
  '/utm_source=',
  '/utm_source%3D',
];

function parseRedirects(filePath) {
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [source, destination, code] = line.split(/\s+/);
      return { source, destination, code, line };
    });
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'out') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

test('mistyped utm paths 301 to the homepage with a real query string', () => {
  const redirects = parseRedirects('public/_redirects');
  const routes = JSON.parse(fs.readFileSync('public/_routes.json', 'utf8'));
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const nextConfig = fs.readFileSync('next.config.ts', 'utf8');

  for (const [source, destination] of GSC_PATH_REDIRECTS) {
    const rule = redirects.find((item) => item.source === source);
    assert.ok(rule, `missing _redirects rule for ${source}`);
    assert.equal(rule.destination, destination, source);
    assert.equal(rule.code, '301', source);
    assert.equal(rule.destination.startsWith('/?utm_source='), true, source);
    assert.equal(routes.exclude.includes(source), true, `missing _routes.json exclude for ${source}`);
  }

  const dynamicAt = redirects.findIndex((item) => item.source.includes('*'));
  assert.ok(dynamicAt > 0, 'splat rules must follow the static rules');
  assert.equal(redirects.slice(0, dynamicAt).some((item) => item.source.includes('*')), false);

  for (const [source, destination] of GSC_PATH_REDIRECTS.filter(([source]) => !source.includes('*'))) {
    const rule = vercel.redirects.find((item) => item.source === source);
    assert.ok(rule, `missing vercel.json redirect for ${source}`);
    assert.equal(rule.destination, destination, source);
    assert.equal(rule.statusCode, 301, source);
    assert.match(nextConfig, new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(nextConfig, new RegExp(destination.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('sitemap and site copy do not point at the GSC 404 urls', () => {
  const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');
  const robots = fs.readFileSync('public/robots.txt', 'utf8');
  assert.equal(sitemap.includes('utm_source'), false);
  assert.equal(sitemap.includes('www.mayanastrologycalculator.com'), false);
  assert.equal(robots.includes('utm_source'), false);
  assert.equal(robots.includes('www.mayanastrologycalculator.com'), false);

  const roots = ['app', 'content', 'public', 'shared'].map((dir) => path.resolve(dir));
  const skip = new Set([
    path.resolve('public/_redirects'),
    path.resolve('public/_routes.json'),
  ]);
  const offenders = [];
  for (const root of roots) {
    for (const file of walk(root)) {
      if (skip.has(file)) continue;
      if (!/\.(tsx|ts|jsx|js|mjs|md|html|txt)$/.test(file)) continue;
      const text = fs.readFileSync(file, 'utf8');
      for (const snippet of FORBIDDEN_LINK_SNIPPETS) {
        if (text.includes(snippet)) offenders.push(`${path.relative(process.cwd(), file)} contains ${snippet}`);
      }
    }
  }
  assert.deepEqual(offenders, []);
});

test('apex responses send HSTS without preload or includeSubDomains', () => {
  const headers = fs.readFileSync('public/_headers', 'utf8');
  assert.match(headers, /^\/\*\n {2}Strict-Transport-Security: max-age=2592000\n/m);
  assert.equal(headers.includes('preload'), false);
  assert.equal(headers.includes('includeSubDomains'), false);
  assert.match(headers, /\/samples\/\*[\s\S]*X-Robots-Tag: noindex, nofollow/);
});
