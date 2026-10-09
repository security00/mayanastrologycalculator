import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const CONTENT_ROOT = path.resolve('content/p0a');

marked.setOptions({ gfm: true, breaks: false });

function unescapeQuoted(value) {
  if (
    (value.startsWith('"') && value.endsWith('"'))
    || (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value.replace(/\\"/g, '"');
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Draft is missing frontmatter');
  const data = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!field || line.startsWith(' ') || line.startsWith('-')) continue;
    data[field[1]] = unescapeQuoted(field[2].trim());
  }
  return { data, body: match[2].trim() };
}

function placementFor(fileKey, kind, index, href) {
  if (fileKey === 'reports') {
    return href?.includes('compatibility') ? 'reports_card_12' : 'reports_card_7';
  }
  if (fileKey.startsWith('dreamspell')) return 'dreamspell_converter';
  if (fileKey === 'sample-report') return 'sample_report_cross';
  if (fileKey === 'sample-compatibility-report') return 'sample_compat_cross';
  if (fileKey === 'day-signs/index') {
    return kind === 'pair' ? 'day_sign_hub_footer' : (index === 0 ? 'day_sign_hub_mid' : 'day_sign_hub_footer');
  }
  if (fileKey.startsWith('day-signs/')) {
    return kind === 'pair' ? 'day_sign_footer' : (index === 0 ? 'day_sign_mid' : 'day_sign_footer');
  }
  if (fileKey === 'galactic-tones/index') {
    return kind === 'pair' ? 'tone_hub_footer' : (index === 0 ? 'tone_hub_mid' : 'tone_hub_footer');
  }
  if (fileKey.startsWith('galactic-tones/')) {
    return kind === 'pair' ? 'tone_page_footer' : (index === 0 ? 'tone_page_mid' : 'tone_page_footer');
  }
  return 'content';
}

function quotedPrompt(line, fallback) {
  const match = line.match(/"([^"]+)"/);
  return match ? match[1] : fallback;
}

export function segmentDraft(body, fileKey) {
  const blocks = [];
  const buffer = [];
  let primaryCount = 0;
  let pairCount = 0;
  let enhanceEmitted = false;

  const flush = () => {
    const markdown = buffer.join('\n').trim();
    buffer.length = 0;
    if (markdown) blocks.push({ type: 'md', markdown });
  };

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('[Tool: calculator') || trimmed.startsWith('[Widget: embedded calculator')) {
      flush();
      blocks.push({
        type: 'calculator',
        prompt: quotedPrompt(trimmed, 'Enter a birth date'),
        highlight: fileKey.startsWith('day-signs/') && fileKey !== 'day-signs/index',
      });
      continue;
    }
    if (trimmed.startsWith('[Widget:') && /Dual-system converter/i.test(trimmed)) {
      flush();
      blocks.push({ type: 'converter' });
      continue;
    }
    if (trimmed.startsWith('[Tool:') || trimmed.startsWith('[Widget:')) {
      flush();
      if (!enhanceEmitted) {
        blocks.push({ type: 'enhance' });
        enhanceEmitted = true;
      }
      continue;
    }
    if (trimmed.startsWith('[Primary button:')) {
      flush();
      blocks.push({
        type: 'action',
        primaryLabel: 'Calculate my Maya signature',
        primaryHref: '/#calculator',
        secondaryLabel: 'See a full sample report first →',
        secondaryHref: '/sample-report',
        placement: placementFor(fileKey, 'primary', primaryCount),
      });
      primaryCount += 1;
      continue;
    }
    if (trimmed.startsWith('[Footer line')) {
      flush();
      blocks.push({
        type: 'pair',
        label: 'Comparing two people? See the sample pair report →',
        href: '/sample-compatibility-report',
        placement: placementFor(fileKey, 'pair', pairCount),
      });
      pairCount += 1;
      continue;
    }
    if (/^Comparing two people\?/.test(trimmed)) {
      flush();
      blocks.push({
        type: 'pair',
        label: 'Comparing two people? See the sample pair report →',
        href: '/sample-compatibility-report',
        placement: placementFor(fileKey, 'pair', pairCount),
      });
      pairCount += 1;
      continue;
    }
    if (/^Want a reading for one person\?/.test(trimmed)) {
      flush();
      blocks.push({
        type: 'pair',
        label: 'Want a reading for one person? See the $7 sample report →',
        href: '/sample-report',
        placement: placementFor(fileKey, 'pair', pairCount, '/sample-report'),
      });
      pairCount += 1;
      continue;
    }
    const action = trimmed.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s+\[([^\]]+)\]\(([^)]+)\)\s*$/);
    if (action) {
      flush();
      blocks.push({
        type: 'action',
        primaryLabel: action[1],
        primaryHref: action[2],
        secondaryLabel: action[3],
        secondaryHref: action[4],
        placement: placementFor(fileKey, 'primary', primaryCount, action[4]),
      });
      primaryCount += 1;
      continue;
    }
    buffer.push(line);
  }
  flush();
  const actions = blocks.filter((block) => block.type === 'action');
  if (actions.length === 1 && fileKey.startsWith('galactic-tones/')) {
    actions[0].placement = fileKey === 'galactic-tones/index' ? 'tone_hub_footer' : 'tone_page_footer';
  }
  return blocks;
}

function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaq(body) {
  const match = body.match(/\n## (?:FAQ|Questions[^\n]*)\n([\s\S]*?)(?:\n## |\s*$)/);
  if (!match) return [];
  const section = match[1];
  const faqs = [];
  const pattern = /\*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n\*\*[^*]+\*\*|\s*$)/g;
  let found = pattern.exec(section);
  while (found) {
    const question = stripMarkdown(found[1]);
    const answer = stripMarkdown(found[2]);
    if (question && answer) faqs.push({ question, answer });
    found = pattern.exec(section);
  }
  return faqs;
}

export function breadcrumbItems(fileKey, data, canonicalPath) {
  const label = data.breadcrumb;
  if (label) {
    const parts = label.split('›').map((part) => part.trim()).filter(Boolean);
    return parts.map((name, index) => {
      if (index === 0) return { name, path: '/' };
      if (index === parts.length - 1) return { name, path: canonicalPath };
      if (/day sign/i.test(name)) return { name, path: '/day-signs' };
      if (/tone|number/i.test(name)) return { name, path: '/galactic-tones' };
      if (/report/i.test(name)) return { name, path: '/reports' };
      return { name, path: canonicalPath };
    });
  }
  if (fileKey.startsWith('galactic-tones/') && fileKey !== 'galactic-tones/index') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Numbers (Tones)', path: '/galactic-tones' },
      { name: data.h1 || `Number ${fileKey.split('/')[1]}`, path: canonicalPath },
    ];
  }
  if (fileKey === 'galactic-tones/index') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Numbers (Tones)', path: '/galactic-tones' },
    ];
  }
  return [
    { name: 'Home', path: '/' },
    { name: data.h1 || 'Page', path: canonicalPath },
  ];
}

export function renderMarkdown(markdown) {
  const html = marked.parse(markdown);
  return html.replace(/<a href="([^"]+\.pdf)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

export function listDraftFiles() {
  const found = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) found.push(full);
    }
  };
  walk(CONTENT_ROOT);
  return found.sort();
}

export function fileKeyFromPath(filePath) {
  return path.relative(CONTENT_ROOT, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
}

export function loadDraft(fileKey) {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, `${fileKey}.md`), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  const canonical = data.canonical;
  const canonicalPath = canonical ? new URL(canonical).pathname : `/${fileKey}`;
  return {
    fileKey,
    title: data.title,
    h1: data.h1,
    description: data.meta_description,
    canonical,
    canonicalPath,
    robots: data.robots || 'index, follow',
    blocks: segmentDraft(body, fileKey),
    faq: extractFaq(body),
    breadcrumbs: breadcrumbItems(fileKey, data, canonicalPath),
    body,
  };
}

export function contentRoot() {
  return CONTENT_ROOT;
}
