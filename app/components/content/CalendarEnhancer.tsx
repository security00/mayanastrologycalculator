'use client';

import { useEffect, useState } from 'react';
import {
  DAY_SIGN_DISPLAY,
  currentTrecena,
  nextCombo,
  todayParts,
  upcomingBySign,
  upcomingByTone,
} from '../../../shared/dual-calendar.js';

type Row = ReturnType<typeof upcomingBySign>[number];

function headerCells(table: HTMLTableElement) {
  const row = table.tHead?.rows[0] ?? table.rows[0];
  if (!row) return [];
  return [...row.cells].map((cell) => cell.textContent?.trim().toLowerCase() ?? '');
}

function bodyOf(table: HTMLTableElement) {
  return table.tBodies[0] ?? table.createTBody();
}

function textCell(value: string) {
  const td = document.createElement('td');
  td.textContent = value;
  return td;
}

function signLink(tone: number, slug: string, label: string) {
  const a = document.createElement('a');
  a.href = `/day-signs/${slug}#${tone}-${slug}`;
  a.textContent = label;
  return a;
}

function fillUpcoming(table: HTMLTableElement, rows: Row[], withDreamspell: boolean) {
  const body = bodyOf(table);
  body.replaceChildren();
  for (const row of rows) {
    const tr = document.createElement('tr');
    tr.appendChild(textCell(row.gregorian));
    const signCell = document.createElement('td');
    const sign = row.traditional.sign;
    if (withDreamspell) {
      signCell.textContent = row.traditional.tzolkinLabel;
    } else {
      signCell.appendChild(signLink(row.traditional.toneNumber, sign.slug, row.traditional.tzolkinLabel));
    }
    tr.appendChild(signCell);
    tr.appendChild(textCell(row.traditional.haab.label));
    if (withDreamspell) tr.appendChild(textCell(row.dreamspell.label));
    body.appendChild(tr);
  }
}

function updateMatrix(table: HTMLTableElement, today: { day: number; month: number; year: number }) {
  for (const row of [...table.tBodies].flatMap((body) => [...body.rows])) {
    for (const link of row.querySelectorAll('a[href*="#"]')) {
      const href = link.getAttribute('href') ?? '';
      const match = href.match(/\/day-signs\/([a-z]+)#(\d+)-\1$/);
      if (!match) continue;
      const signIndex = DAY_SIGN_DISPLAY.findIndex((sign) => sign.slug === match[1]);
      const next = nextCombo(today, signIndex, Number(match[2]));
      const cell = link.closest('td');
      const dateCell = cell?.nextElementSibling;
      if (dateCell && next) dateCell.textContent = next.gregorian;
    }
  }
}

function updateComboList(article: HTMLElement, today: { day: number; month: number; year: number }) {
  article.querySelectorAll('a[id]').forEach((anchor) => {
    const match = anchor.id.match(/^(\d+)-([a-z]+)$/);
    if (!match) return;
    const item = anchor.closest('li');
    if (!item) return;
    const signIndex = DAY_SIGN_DISPLAY.findIndex((sign) => sign.slug === match[2]);
    const next = nextCombo(today, signIndex, Number(match[1]));
    if (!next) return;
    const text = [...item.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.includes('next:'));
    if (text) text.textContent = ` · next: ${next.gregorian}`;
  });
}

function updateBatz(table: HTMLTableElement, today: { day: number; month: number; year: number }) {
  const chuwen = DAY_SIGN_DISPLAY.findIndex((sign) => sign.slug === 'chuwen');
  const upcoming = upcomingByTone(today, 8, 40).filter((row) => row.traditional.daySignIndex === chuwen).slice(0, 3);
  const rows = [...(table.tBodies[0]?.rows ?? [])].filter((row) => /calculated/i.test(row.cells[1]?.textContent ?? ''));
  upcoming.forEach((row, index) => {
    const target = rows[index];
    if (!target) return;
    target.cells[0].textContent = row.gregorian;
    if (index === 0) target.cells[1].textContent = 'Calculated: next occurrence on or after today';
  });
}

function fillTrecena(table: HTMLTableElement, today: { day: number; month: number; year: number }) {
  const body = bodyOf(table);
  body.replaceChildren();
  for (const row of currentTrecena(today)) {
    const tr = document.createElement('tr');
    tr.appendChild(textCell(row.gregorian));
    const dayCell = document.createElement('td');
    dayCell.appendChild(signLink(row.traditional.toneNumber, row.traditional.sign.slug, row.traditional.tzolkinLabel));
    tr.appendChild(dayCell);
    const numberCell = document.createElement('td');
    const numberLink = document.createElement('a');
    numberLink.href = `/galactic-tones/${row.traditional.toneNumber}`;
    numberLink.textContent = `Number ${row.traditional.toneNumber}`;
    numberCell.appendChild(numberLink);
    tr.appendChild(numberCell);
    tr.appendChild(textCell(row.dreamspell.label));
    body.appendChild(tr);
  }
}

function enhanceArticle(article: HTMLElement, mode: 'sign' | 'tone' | 'trecena', slug: string | undefined, tone: number | undefined) {
  if (article.dataset.calendarEnhanced === 'true') return;
  article.dataset.calendarEnhanced = 'true';
  const today = todayParts();
  const signIndex = DAY_SIGN_DISPLAY.findIndex((sign) => sign.slug === slug);

  for (const table of article.querySelectorAll('table')) {
    const headers = headerCells(table);
    const joined = headers.join(' ');
    if (headers.includes('next date')) {
      updateMatrix(table, today);
      continue;
    }
    if (joined.includes("b'atz") || joined.includes('batz')) {
      updateBatz(table, today);
      continue;
    }
    if (joined.includes('dreamspell (modern)')) {
      fillTrecena(table, today);
      continue;
    }
    if (joined.includes("haab") && headers.some((header) => header.startsWith('date') || header.startsWith('gregorian'))) {
      if (mode === 'sign' && signIndex >= 0) {
        fillUpcoming(table, upcomingBySign(today, signIndex, 8), joined.includes('dreamspell'));
      } else if (mode === 'tone' && tone) {
        fillUpcoming(table, upcomingByTone(today, tone, 8), false);
      }
    }
  }

  if (mode === 'sign') updateComboList(article, today);
}

function liveNote(mode: 'sign' | 'tone' | 'trecena', tone: number | undefined) {
  const today = todayParts();
  if (mode === 'tone' && tone) {
    const row = upcomingByTone(today, tone, 1)[0];
    const todayRow = currentTrecena(today).find((item) => item.parts.day === today.day && item.parts.month === today.month && item.parts.year === today.year);
    return todayRow
      ? `Today, ${todayRow.gregorian}, is ${todayRow.traditional.tzolkinLabel} — trecena day ${todayRow.traditional.toneNumber}. The next day numbered ${tone} is ${row?.gregorian}, ${row?.traditional.tzolkinLabel}.`
      : `Next day numbered ${tone}: ${row?.gregorian ?? ''} ${row?.traditional.tzolkinLabel ?? ''}.`;
  }
  if (mode === 'trecena') {
    const todayRow = currentTrecena(today).find((item) => item.parts.day === today.day && item.parts.month === today.month && item.parts.year === today.year);
    return todayRow
      ? `Today, ${todayRow.gregorian}, is ${todayRow.traditional.tzolkinLabel}, trecena day ${todayRow.traditional.toneNumber}. The table below follows your local date.`
      : '';
  }
  return 'The date tables use your local date when JavaScript is available. Without it, they stay at the 10 October 2026 snapshot.';
}

export default function CalendarEnhancer({
  mode,
  slug,
  tone,
}: {
  mode: 'sign' | 'tone' | 'trecena';
  slug?: string;
  tone?: number;
}) {
  const note = liveNote(mode, tone);
  const [number, setNumber] = useState('1');
  const [picked, setPicked] = useState('');

  useEffect(() => {
    const article = document.querySelector('[data-draft-article]');
    if (article instanceof HTMLElement) enhanceArticle(article, mode, slug, tone);
  }, [mode, slug, tone]);

  const onPick = (event: React.FormEvent) => {
    event.preventDefault();
    if (!slug) return;
    const signIndex = DAY_SIGN_DISPLAY.findIndex((sign) => sign.slug === slug);
    const next = nextCombo(todayParts(), signIndex, Number(number));
    const sign = DAY_SIGN_DISPLAY[signIndex];
    setPicked(next ? `Next ${number} ${sign.name}: ${next.gregorian}` : '');
    document.getElementById(`${number}-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="my-4 rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/5%)] p-4">
      {note && <p className="!mb-2 text-sm">{note}</p>}
      {mode === 'sign' && (
        <form onSubmit={onPick} className="flex flex-wrap items-end gap-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
            Number
            <select aria-label="Tzolk'in number" value={number} onChange={(event) => setNumber(event.target.value)} className="select-gold mt-2">
              {Array.from({ length: 13 }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-ember px-4 py-2">Show the next date</button>
          {picked && <p className="!mb-0 text-sm text-[var(--parchment)]">{picked}</p>}
        </form>
      )}
    </div>
  );
}
