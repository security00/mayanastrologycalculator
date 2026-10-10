'use client';

import { useState } from 'react';
import { calculateTzolkinDate, GALACTIC_TONES, validateDate } from '../../lib/mayan-calculator';
import { DAY_SIGN_DISPLAY } from '../../../shared/dual-calendar.js';

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 120 }, (_, index) => currentYear - index);

export default function InlineCalculator({
  prompt,
  highlightSlug,
}: {
  prompt: string;
  highlightSlug?: string;
}) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    tone: number;
    slug: string;
    name: string;
    dreamspellName: string;
    matched: boolean;
  } | null>(null);

  const highlight = DAY_SIGN_DISPLAY.find((sign) => sign.slug === highlightSlug);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dayNumber = Number.parseInt(day, 10);
    const monthNumber = Number.parseInt(month, 10);
    const yearNumber = Number.parseInt(year, 10);
    if (!validateDate(dayNumber, monthNumber, yearNumber)) {
      setError('Please enter a valid date.');
      setResult(null);
      return;
    }
    setError('');
    const reading = calculateTzolkinDate(new Date(yearNumber, monthNumber - 1, dayNumber));
    const sign = DAY_SIGN_DISPLAY.find((item) => item.colonial === reading.nawal.name);
    if (!sign) return;
    setResult({
      tone: reading.galacticTone.number,
      slug: sign.slug,
      name: sign.name,
      dreamspellName: GALACTIC_TONES[reading.galacticTone.number - 1].name,
      matched: !highlightSlug || sign.slug === highlightSlug,
    });
  };

  return (
    <form onSubmit={onSubmit} className="panel my-6 rounded-2xl p-5 md:p-6">
      <h2 className="!mt-0 text-2xl">{prompt}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
          Day
          <select aria-label="Birth day" value={day} onChange={(event) => setDay(event.target.value)} className="select-gold mt-2">
            <option value="">Day</option>
            {days.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
          Month
          <select aria-label="Birth month" value={month} onChange={(event) => setMonth(event.target.value)} className="select-gold mt-2">
            <option value="">Month</option>
            {months.map((name, index) => <option key={name} value={index + 1}>{name}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-dim)]">
          Year
          <select aria-label="Birth year" value={year} onChange={(event) => setYear(event.target.value)} className="select-gold mt-2">
            <option value="">Year</option>
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
      <button type="submit" className="btn-ember mt-4 px-6 py-3" disabled={!day || !month || !year}>
        Calculate
      </button>
      {result && (
        <div className={`mt-4 rounded-xl border p-4 ${result.matched ? 'border-[rgb(79_209_165/45%)] bg-[rgb(79_209_165/8%)]' : 'border-[var(--gold-line)]'}`}>
          <p className="!mb-1 text-lg text-[var(--parchment)]">
            {result.tone} {result.name}
          </p>
          <p className="!mb-1 text-sm">
            Number {result.tone} · Dreamspell name: {result.dreamspellName}
          </p>
          {highlight && (
            <p className="!mb-1 text-sm">
              {result.matched
                ? `This date is ${highlight.name}.`
                : `This date is ${result.tone} ${result.name}, not ${highlight.name}.`}
            </p>
          )}
          <p className="!mb-2 text-sm">
            Traditional count, GMT 584283 · <a href="/methodology">how we calculate</a>
          </p>
          <a href={`/day-signs/${result.slug}#${result.tone}-${result.slug}`}>
            Open {result.tone} {result.name}
          </a>
        </div>
      )}
    </form>
  );
}
