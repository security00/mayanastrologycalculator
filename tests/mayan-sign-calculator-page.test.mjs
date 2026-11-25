import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('nawal calculator keeps the day-sign table and drops the example cards', () => {
  const index = fs.readFileSync('content/p0a/day-signs/index.md', 'utf8');
  const page = fs.readFileSync('app/mayan-sign-calculator/page.tsx', 'utf8');
  const rows = [...index.matchAll(/^\| (\d+) \| \[([^\]]+)\]\(([^)]+)\) \| ([^|]+) \| ([^|]+) \|/gm)];
  assert.equal(rows.length, 20);

  for (const [, , name, href, kiche, points] of rows) {
    assert.equal(page.includes(href), true, href);
    assert.equal(page.includes(name), true, name);
    assert.equal(page.includes(kiche.trim()), true, kiche);
    assert.equal(page.includes(points.trim()), true, points);
  }

  assert.match(page, /Nawal \(Nahual\) Calculator: Find Your Mayan Sign by Birth Date/);
  assert.match(page, /What Is My Mayan Nawal\? Free Nawal \(Nahual\) Calculator by Birth Date/);
  assert.equal(page.includes('Examples of Mayan Signs'), false);
  assert.equal(page.includes('Conejo'), false);
  assert.equal(page.includes('Escalera'), false);
  assert.equal(page.includes('Agua'), false);
  assert.equal(page.includes('maya.nmai.si.edu/glossary'), false);
  assert.equal(page.includes('href="/reports"'), false);
  assert.match(page, /The%20Maya%20Calendar%20System\.pdf/);
  assert.match(page, /The%20Meaning%20of%20the%20Days%20in%20the%20Maya%20Sacred%20Calendar\.pdf/);
  assert.match(page, /https:\/\/dle\.rae\.es\/nagual/);
});
