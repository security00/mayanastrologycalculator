'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { calculateTzolkinDate } from '../lib/mayan-calculator';

const subscribeToClient = () => () => {};

function formatToday(date: Date) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function TodayReading() {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false
  );
  const today = isClient ? new Date() : null;

  if (!today) {
    return (
      <section
        id="today-reading"
        className="panel rounded-2xl p-6 md:p-8"
      >
        <p className="text-sm font-semibold text-gold-bright mb-2">Today in your local time</p>
        <h2 className="text-3xl font-display text-[var(--parchment)] mb-3">Calculating today's Tzolk'in day sign…</h2>
        <p className="text-[var(--parchment-dim)]">
          Your current Galactic Tone and Nawal will appear when the page loads.
        </p>
      </section>
    );
  }

  const reading = calculateTzolkinDate(today);

  return (
    <section id="today-reading" className="panel rounded-2xl p-6 md:p-8">
      <p className="text-sm font-semibold text-gold-bright mb-2">Today in your local time</p>
      <h2 className="text-3xl md:text-4xl font-display text-[var(--parchment)] mb-2">
        {reading.galacticTone.number} {reading.nawal.name}
      </h2>
      <p className="text-[var(--parchment-dim)] mb-6">{formatToday(today)}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <article className="rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] p-5">
          <h3 className="text-xl font-display text-[var(--parchment)] mb-2">
            Galactic Tone {reading.galacticTone.number}: {reading.galacticTone.name}
          </h3>
          <p className="text-[var(--parchment-dim)] mb-3">{reading.galacticTone.meaning}</p>
          <div className="flex flex-wrap gap-2">
            {reading.galacticTone.keywords.map((keyword) => (
              <span key={keyword} className="chip chip-jade">
                {keyword}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-5">
          <h3 className="text-xl font-display text-[var(--parchment)] mb-2">
            Nawal: {reading.nawal.name}
          </h3>
          <p className="text-[var(--parchment-dim)] mb-3">{reading.nawal.meaning}</p>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="font-semibold text-[var(--parchment)]">Element</dt>
              <dd className="text-[var(--parchment-dim)]">{reading.nawal.element}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--parchment)]">Direction</dt>
              <dd className="text-[var(--parchment-dim)]">{reading.nawal.direction}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--parchment)]">Color</dt>
              <dd className="text-[var(--parchment-dim)]">{reading.nawal.color}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="panel rounded-2xl border-l-2 border-l-[var(--gold)] p-5 mb-6">
        <h3 className="text-lg font-display text-[var(--parchment)] mb-2">How to use today's energy</h3>
        <p className="text-[var(--parchment-dim)]">
          Treat today's Mayan date as a short reflection prompt. The tone shows the rhythm of the day,
          while the Nawal points to the symbolic theme. You can use both to choose a focus for planning,
          journaling, meditation, or checking how today's pattern interacts with your birth sign.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="btn-ember px-6 py-3 text-center"
        >
          Calculate Your Birth Sign
        </Link>
        <Link
          href="/day-signs"
          className="btn-ghost-gold px-6 py-3 text-center"
        >
          Read the 20 Day Signs
        </Link>
      </div>
    </section>
  );
}
