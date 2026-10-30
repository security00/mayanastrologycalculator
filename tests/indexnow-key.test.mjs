import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// Denylist only: ExportAlpha's published key must not be reused here.
const EXPORT_ALPHA_KEY = 'f7a5f85e269869490ec4cbdebd592c89';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function exportedKey() {
  const source = fs.readFileSync(path.join(root, 'app/lib/indexnow-key.ts'), 'utf8');
  const match = source.match(/export const INDEXNOW_KEY = ['"]([a-f0-9]{32,128})['"]/);
  assert.ok(match, 'INDEXNOW_KEY export missing');
  return match[1];
}

test('IndexNow key file matches the exported key', () => {
  const key = exportedKey();
  assert.notEqual(key, EXPORT_ALPHA_KEY);
  assert.match(key, /^[a-f0-9]{32,128}$/);

  const keyPath = path.join(root, 'public', `${key}.txt`);
  assert.equal(path.basename(keyPath), `${key}.txt`);
  assert.equal(fs.existsSync(path.join(root, 'public', `${EXPORT_ALPHA_KEY}.txt`)), false);
  const hosted = fs.readFileSync(keyPath, 'utf8');
  assert.match(hosted, /^[a-f0-9]+\n?$/);
  assert.equal(hosted.trim(), key);
});

test('deploy submits IndexNow without failing the job', () => {
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/deploy.yml'), 'utf8');
  const step = workflow.split('- name: Submit sitemap URLs to IndexNow')[1];
  assert.ok(step, 'missing IndexNow deploy step');
  assert.match(step, /continue-on-error:\s*true/);
  assert.match(step, /npm run indexnow/);
  assert.match(step, /SITE_ORIGIN:\s*https:\/\/mayanastrologycalculator\.com/);

  const script = fs.readFileSync(path.join(root, 'scripts/indexnow.mjs'), 'utf8');
  assert.match(script, /SITE_ORIGIN \|\| 'https:\/\/mayanastrologycalculator\.com'/);
  assert.match(script, /https:\/\/api\.indexnow\.org\/indexnow/);
  assert.match(script, /keyLocation/);
  assert.doesNotMatch(script, new RegExp(`INDEXNOW_KEY \\|\\| '${EXPORT_ALPHA_KEY}'`));
});
