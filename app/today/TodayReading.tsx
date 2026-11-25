'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MayanReading, calculateTzolkinDateFromParts } from '../lib/mayan-calculator';
import { displayForColonial } from '../../shared/dual-calendar.js';
import { formatCivilLong, utcCivilParts } from '../../shared/today-signature.js';

type CivilDate = { day: number; month: number; year: number };

type TodayReadingProps = {
  initialReading: MayanReading;
  initialParts: CivilDate;
};

export default function TodayReading({ initialReading, initialParts }: TodayReadingProps) {
  const [reading, setReading] = useState(initialReading);
  const [parts, setParts] = useState(initialParts);
  const [basis, setBasis] = useState<'utc' | 'local'>('utc');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const now = new Date();
      const utc = utcCivilParts(now);
      const local = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
      const useLocal = local.day !== utc.day || local.month !== utc.month || local.year !== utc.year;
      const next = useLocal ? local : utc;
      if (
        next.day === initialParts.day
        && next.month === initialParts.month
        && next.year === initialParts.year
      ) {
        return;
      }
      setParts(next);
      setReading(calculateTzolkinDateFromParts(next));
      setBasis(useLocal ? 'local' : 'utc');
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialParts.day, initialParts.month, initialParts.year]);

  const sign = displayForColonial(reading.nawal.name);
  const signHref = sign ? `/day-signs/${sign.slug}` : '/day-signs';
  const toneHref = `/galactic-tones/${reading.galacticTone.number}`;

  return (
    <section id="today-reading" className="panel rounded-2xl p-6 md:p-8">
      <p className="text-sm font-semibold text-gold-bright mb-2">
        {basis === 'local' ? 'Today in your local time' : 'UTC civil date'}
      </p>
      <h2 className="text-3xl md:text-4xl font-display text-[var(--parchment)] mb-2">
        {reading.galacticTone.number} {reading.nawal.name}
      </h2>
      <p className="text-[var(--parchment-dim)] mb-6">{formatCivilLong(parts)}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <article className="rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] p-5">
          <h3 className="text-xl font-display text-[var(--parchment)] mb-2">
            Number {reading.galacticTone.number} · Dreamspell name: {reading.galacticTone.name}
          </h3>
          <p className="text-[var(--parchment-dim)] mb-3">{reading.galacticTone.meaning}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {reading.galacticTone.keywords.map((keyword) => (
              <span key={keyword} className="chip chip-jade">
                {keyword}
              </span>
            ))}
          </div>
          <Link href={toneHref} className="link-gold font-semibold">
            Read tone {reading.galacticTone.number} →
          </Link>
        </article>

        <article className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-5">
          <h3 className="text-xl font-display text-[var(--parchment)] mb-2">
            Nawal: {reading.nawal.name}
          </h3>
          <p className="text-[var(--parchment-dim)] mb-3">{reading.nawal.meaning}</p>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="font-semibold text-[var(--parchment)]">Element</dt>
              <dd className="text-[var(--parchment-dim)]">{reading.nawal.element} · modern convention</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--parchment)]">Direction</dt>
              <dd className="text-[var(--parchment-dim)]">{reading.nawal.direction}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--parchment)]">Color</dt>
              <dd className="text-[var(--parchment-dim)]">{reading.nawal.color} · Dreamspell color</dd>
            </div>
          </dl>
          <Link href={signHref} className="link-gold mt-4 inline-block font-semibold">
            Read today’s Nawal →
          </Link>
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
          href="/birth-chart"
          className="btn-ember px-6 py-3 text-center"
        >
          Calculate my Maya signature
        </Link>
        <Link
          href={signHref}
          className="btn-ghost-gold px-6 py-3 text-center"
        >
          Today’s day sign
        </Link>
        <Link
          href={toneHref}
          className="btn-ghost-gold px-6 py-3 text-center"
        >
          Today’s tone
        </Link>
      </div>
    </section>
  );
}
