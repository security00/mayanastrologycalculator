'use client';

import { useState } from 'react';
import { validateDate } from '../../lib/mayan-calculator';
import { describeDate } from '../../../shared/dual-calendar.js';

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 201 }, (_, index) => 1900 + index);

export default function DualConverter() {
  const [day, setDay] = useState('10');
  const [month, setMonth] = useState('10');
  const [year, setYear] = useState('2026');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReturnType<typeof describeDate> | null>(null);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parts = {
      day: Number.parseInt(day, 10),
      month: Number.parseInt(month, 10),
      year: Number.parseInt(year, 10),
    };
    if (!validateDate(parts.day, parts.month, parts.year)) {
      setError('Please enter a valid date.');
      setResult(null);
      return;
    }
    setError('');
    setResult(describeDate(parts));
  };

  return (
    <form onSubmit={onSubmit} className="panel my-6 rounded-2xl p-5 md:p-6">
      <h2 className="!mt-0 text-2xl">Compare both counts for one date</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
          Day
          <select aria-label="Day" value={day} onChange={(event) => setDay(event.target.value)} className="select-gold mt-2">
            {days.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
          Month
          <select aria-label="Month" value={month} onChange={(event) => setMonth(event.target.value)} className="select-gold mt-2">
            {months.map((name, index) => <option key={name} value={index + 1}>{name}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
          Year
          <select aria-label="Year" value={year} onChange={(event) => setYear(event.target.value)} className="select-gold mt-2">
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
      <button type="submit" className="btn-ember mt-4 px-6 py-3">Compare the two counts</button>
      {result && (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-4">
            <h3 className="!mt-0 text-lg">Traditional count (this site)</h3>
            <p className="!mb-1 text-[var(--parchment)]">{result.traditional.tzolkinLabel}</p>
            <p className="!mb-1">Haab&apos;: {result.traditional.haab.label}</p>
            <p className="!mb-1">Long Count: {result.traditional.longCount}</p>
            <p className="!mb-0 text-sm">
              Traditional count, GMT 584283 · <a href="/methodology">how we calculate</a>
            </p>
          </article>
          <article className="rounded-xl border border-[rgb(79_209_165/30%)] bg-[rgb(79_209_165/6%)] p-4">
            <h3 className="!mt-0 text-lg">Dreamspell (modern, from 1987)</h3>
            {result.dreamspell.hunabKu ? (
              <p className="!mb-0">In Dreamspell, 29 February is &apos;0.0 Hunab Ku&apos; and has no kin.</p>
            ) : (
              <p className="!mb-0 text-[var(--parchment)]">{result.dreamspell.label}</p>
            )}
          </article>
        </div>
      )}
    </form>
  );
}
