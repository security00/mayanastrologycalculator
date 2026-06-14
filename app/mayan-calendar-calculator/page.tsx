import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mayan Calendar Calculator - Convert Birth Date to Tzolk\'in',
  description: "Use this Mayan calendar calculator guide to convert a Gregorian birth date into the Tzolk'in calendar and discover your Mayan day sign and Galactic Tone.",
  keywords: 'mayan calendar calculator, mayan date calculator, mayan birth date calculator, tzolkin calculator, mayan calendar sign calculator',
  alternates: { canonical: 'https://mayanastrologycalculator.com/mayan-calendar-calculator' },
  openGraph: {
    title: 'Mayan Calendar Calculator - Convert Birth Date to Tzolk\'in',
    description: "Convert your birth date into the Mayan Tzolk'in calendar and find your day sign and Galactic Tone.",
    url: 'https://mayanastrologycalculator.com/mayan-calendar-calculator',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MayanCalendarCalculatorPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does a Mayan calendar calculator do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Mayan calendar calculator converts a Gregorian date into the Tzolk\'in calendar and shows the day sign, Galactic Tone, and symbolic meaning for that date.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the calculator for today as well as a birth date?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can use the Tzolk\'in conversion for a birth date or check the current Mayan date on the daily Mayan date page.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Tzolk\'in date?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Tzolk\'in date is a combination of one number from 1 to 13 and one of 20 Mayan day signs, creating a 260-day sacred calendar cycle.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-700 mb-3">
            Mayan calendar calculator
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Convert Your Birth Date to the Mayan Calendar
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mb-6">
            This Mayan calendar calculator helps you convert a modern Gregorian date into the sacred
            Tzolk'in calendar. Enter your birth date to find the Nawal day sign and Galactic Tone that
            form your Mayan astrology birth signature.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Use the Mayan Calendar Calculator
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">1. Enter a date</h2>
            <p className="text-gray-700">
              Choose the day, month, and year you want to convert. Most visitors use a birth date, but
              the Tzolk'in cycle can also be used to reflect on current dates.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">2. Calculate Tzolk'in</h2>
            <p className="text-gray-700">
              The calculator maps the date into the 260-day sacred count using a Gregorian-to-Mayan
              conversion method commonly used for modern Tzolk'in readings.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">3. Read the result</h2>
            <p className="text-gray-700">
              Your result shows a tone, a day sign, symbolic meaning, element, direction, color, and
              personality themes connected with that date.
            </p>
          </article>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-3">What Is the Tzolk'in Calendar?</h2>
          <p className="text-gray-700 mb-4">
            The Tzolk'in is a 260-day sacred Mayan calendar made from 20 day signs and 13 numbers. Each
            date in the cycle has a unique combination, such as 7 Ik or 12 K'an. In Mayan astrology, that
            combination is used as a symbolic profile for timing, personality, and spiritual reflection.
          </p>
          <p className="text-gray-700">
            People often search for a Mayan calendar calculator when they want to know their Mayan birth
            date, Mayan zodiac sign, or Tzolk'in energy. The homepage calculator gives the actual result;
            this page explains how to understand what the conversion means.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Mayan calendar vs Mayan zodiac</h2>
            <p className="text-gray-700 mb-4">
              The Mayan calendar is the system. The Mayan zodiac sign is the day sign found inside that
              system. A full reading combines the day sign with a Galactic Tone.
            </p>
            <Link href="/mayan-zodiac-calculator" className="text-orange-700 hover:text-orange-800 font-semibold">
              Learn about Mayan zodiac signs
            </Link>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Today's Mayan calendar date</h2>
            <p className="text-gray-700 mb-4">
              Your birth sign stays the same, while the current Tzolk'in date changes daily. Checking
              today's date helps compare personal energy with the wider calendar rhythm.
            </p>
            <Link href="/today" className="text-orange-700 hover:text-orange-800 font-semibold">
              View today's Mayan date
            </Link>
          </article>
        </section>

        <section className="mt-10 bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-5">Mayan Calendar Calculator FAQ</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">What does a Mayan calendar calculator do?</h3>
              <p className="text-gray-700">
                It converts a Gregorian date into the Tzolk'in calendar and shows the day sign, Galactic
                Tone, and symbolic meaning for that date.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">Can I use it for today as well as a birth date?</h3>
              <p className="text-gray-700">
                Yes. You can calculate a birth date or use the daily Mayan date page to check the current
                Tzolk'in energy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">What is a Tzolk'in date?</h3>
              <p className="text-gray-700">
                It is a combination of one number from 1 to 13 and one of 20 Mayan day signs, creating a
                date inside the 260-day sacred calendar cycle.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
