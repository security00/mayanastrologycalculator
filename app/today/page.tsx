import type { Metadata } from 'next';
import Link from 'next/link';
import TodayReading from './TodayReading';

export const metadata: Metadata = {
  title: "Today's Mayan Date - Daily Tzolk'in Energy",
  description: "See today's Mayan date in the Tzolk'in calendar. Discover the current Galactic Tone, Nawal day sign, and daily Mayan astrology energy.",
  keywords: "today's mayan date, mayan date today, today mayan calendar, daily mayan horoscope, tzolkin today, mayan energy today",
  alternates: { canonical: 'https://mayanastrologycalculator.com/today' },
  openGraph: {
    title: "Today's Mayan Date - Daily Tzolk'in Energy",
    description: "See today's Mayan date in the Tzolk'in calendar and learn the current Nawal and Galactic Tone.",
    url: 'https://mayanastrologycalculator.com/today',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TodayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/" className="text-orange-700 hover:text-orange-800 font-medium">
            Back to calculator
          </Link>
        </div>

        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Today's Mayan Date
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            The Tzolk'in calendar gives every day a unique combination of one Galactic Tone and one
            Nawal day sign. Use this daily Mayan astrology page to check the current energy and compare
            it with your own birth chart.
          </p>
        </section>

        <TodayReading />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Daily reflection</h2>
            <p className="text-gray-700">
              The current tone can suggest how to move through the day, from initiating a new focus to
              refining plans, releasing tension, or completing a cycle.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Calendar rhythm</h2>
            <p className="text-gray-700">
              The Tzolk'in repeats every 260 days. Checking today's sign helps you notice patterns,
              recurring themes, and personal timing over time.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Birth chart context</h2>
            <p className="text-gray-700">
              Your personal Mayan sign stays the same, while today's sign changes. Reading both gives
              a simple way to compare personal energy with the day's wider pattern.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
