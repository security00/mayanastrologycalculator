'use client';

import Link from 'next/link';
import { calculateTzolkinDate } from '../lib/mayan-calculator';

function formatToday(date: Date) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function TodayReading() {
  const today = new Date();
  const reading = calculateTzolkinDate(today);

  return (
    <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm" suppressHydrationWarning>
      <p className="text-sm font-semibold text-orange-700 mb-2">Today in your local time</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-2">
        {reading.galacticTone.number} {reading.nawal.name}
      </h2>
      <p className="text-gray-600 mb-6">{formatToday(today)}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <article className="bg-blue-50 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-950 mb-2">
            Galactic Tone {reading.galacticTone.number}: {reading.galacticTone.name}
          </h3>
          <p className="text-gray-700 mb-3">{reading.galacticTone.meaning}</p>
          <div className="flex flex-wrap gap-2">
            {reading.galacticTone.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </article>

        <article className="bg-amber-50 rounded-lg p-5">
          <h3 className="text-xl font-bold text-gray-950 mb-2">
            Nawal: {reading.nawal.name}
          </h3>
          <p className="text-gray-700 mb-3">{reading.nawal.meaning}</p>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="font-semibold text-gray-950">Element</dt>
              <dd className="text-gray-700">{reading.nawal.element}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-950">Direction</dt>
              <dd className="text-gray-700">{reading.nawal.direction}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-950">Color</dt>
              <dd className="text-gray-700">{reading.nawal.color}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-5 mb-6">
        <h3 className="text-lg font-bold text-gray-950 mb-2">How to use today's energy</h3>
        <p className="text-gray-700">
          Treat today's Mayan date as a short reflection prompt. The tone shows the rhythm of the day,
          while the Nawal points to the symbolic theme. You can use both to choose a focus for planning,
          journaling, meditation, or checking how today's pattern interacts with your birth sign.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-700"
        >
          Calculate Your Birth Sign
        </Link>
        <Link
          href="/day-signs"
          className="border border-orange-600 text-orange-700 px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-50"
        >
          Read the 20 Day Signs
        </Link>
      </div>
    </section>
  );
}
