import type { Metadata } from 'next';
import Link from 'next/link';
import TodayReading from './TodayReading';

export const metadata: Metadata = {
  title: "Mayan Calendar Today - Current Tzolk'in Date & Day Sign",
  description: "See today's Mayan calendar date and current Tzolk'in day sign. Discover the Galactic Tone, Nawal, and reflective meaning for today.",
  keywords: "today's mayan date, mayan date today, today mayan calendar, daily mayan horoscope, tzolkin today, mayan energy today",
  alternates: { canonical: 'https://mayanastrologycalculator.com/today' },
  openGraph: {
    title: "Mayan Calendar Today - Current Tzolk'in Date & Day Sign",
    description: "See today's Mayan calendar date and learn the current Nawal day sign and Galactic Tone.",
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
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Mayan Calendar Today: Current Tzolk'in Date
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            Check today's Mayan calendar date and current Tzolk'in day sign in your local time. Every
            day combines one Galactic Tone with one Nawal day sign, creating a symbolic daily theme
            that you can compare with your own birth chart.
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

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mt-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-4">
            What Does Today's Mayan Calendar Date Mean?
          </h2>
          <p className="text-gray-700 mb-4">
            The Tzolk'in is a repeating 260-day count formed by 20 day signs and 13 numbered tones.
            Today's combination is calculated from the current date using the same GMT correlation
            used by the birth-date calculator. The displayed result updates in your browser according
            to your local date.
          </p>
          <p className="text-gray-700 mb-5">
            The calculation is deterministic, while the daily meaning is reflective and non-predictive.
            Use it for journaling or personal reflection rather than as factual or professional advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#today-reading" className="text-orange-700 hover:text-orange-800 font-semibold">
              View today's Tzolk'in sign ↑
            </a>
            <Link href="/birth-chart" className="text-orange-700 hover:text-orange-800 font-semibold">
              Calculate your Mayan birth chart →
            </Link>
            <Link href="/compatibility" className="text-orange-700 hover:text-orange-800 font-semibold">
              Compare two Mayan signs →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
