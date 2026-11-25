import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const RULES = [
  ['/nawal-calculator', '/mayan-sign-calculator'],
  ['/nawal-calculator/', '/mayan-sign-calculator'],
  ['/tzolkin-calculator', '/mayan-calendar-calculator'],
  ['/tzolkin-calculator/', '/mayan-calendar-calculator'],
];

test('legacy calculator paths 301 to the existing pages', () => {
  const redirects = fs.readFileSync('public/_redirects', 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
  const routes = JSON.parse(fs.readFileSync('public/_routes.json', 'utf8'));
  const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

  for (const [source, destination] of RULES) {
    assert.ok(redirects.includes(`${source} ${destination} 301`), source);
    assert.equal(routes.exclude.includes(source), true, source);
  }

  assert.equal(nextConfig.includes("source: '/nawal-calculator', destination: '/mayan-sign-calculator', statusCode: 301"), true);
  assert.equal(nextConfig.includes("source: '/tzolkin-calculator', destination: '/mayan-calendar-calculator', statusCode: 301"), true);
  assert.equal(vercel.redirects.some((rule) => rule.source === '/nawal-calculator' && rule.destination === '/mayan-sign-calculator' && rule.statusCode === 301), true);
  assert.equal(vercel.redirects.some((rule) => rule.source === '/tzolkin-calculator' && rule.destination === '/mayan-calendar-calculator' && rule.statusCode === 301), true);
  assert.equal(nextConfig.includes('tree-of-life'), false);
  assert.equal(redirects.some((line) => line.includes('tree-of-life')), false);
});
