import type { Metadata } from 'next';
import Link from 'next/link';
import { DAY_SIGNS } from '../lib/mayan-calculator';
import BirthDateCalculator from '../components/BirthDateCalculator';
import GlyphMark from '../components/decor/GlyphMark';
import GrecaBand from '../components/decor/GrecaBand';

export const metadata: Metadata = {
  title: 'Mayan Zodiac Calculator - Find Your Mayan Zodiac Sign',
  description: "Use this Mayan zodiac calculator guide to find your Nawal day sign, understand the 20 Mayan zodiac signs, and read your Tzolk'in birth energy.",
  keywords: 'mayan zodiac calculator, mayan zodiac sign calculator, mayan zodiac sign, mayan signs calculator, mayan astrology signs',
  alternates: { canonical: 'https://mayanastrologycalculator.com/mayan-zodiac-calculator' },
  openGraph: {
    title: 'Mayan Zodiac Calculator - Find Your Mayan Zodiac Sign',
    description: "Find your Mayan zodiac sign and learn how Nawal day signs work in the Tzolk'in calendar.",
    url: 'https://mayanastrologycalculator.com/mayan-zodiac-calculator',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'Mayan Zodiac Calculator',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function MayanZodiacCalculatorPage() {
  const featuredSigns = DAY_SIGNS.slice(0, 6);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find my Mayan zodiac sign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter your birth date in the Mayan Astrology Calculator to convert it into the Tzolk\'in calendar. The result shows your Nawal day sign and Galactic Tone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a Mayan zodiac sign based on my birth month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A Mayan zodiac sign is calculated from the exact date in the 260-day Tzolk\'in cycle, not from a monthly date range.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a Nawal and a Galactic Tone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Nawal is the day sign and symbolic center of the reading. The Galactic Tone is the number from 1 to 13 that describes how the sign energy expresses itself.',
        },
      },
    ],
  };

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center mb-4">
          <div>
            <p className="eyebrow mb-4">Mayan zodiac sign calculator</p>
            <h1 className="text-4xl md:text-5xl font-display text-[var(--parchment)] mb-5">
              Find Your Mayan Zodiac Sign
            </h1>
            <p className="text-lg text-[var(--parchment-dim)] mb-6">
              A Mayan zodiac calculator finds your Nawal day sign from your birth date. In the sacred
              Tzolk'in calendar, every person is connected with one of 20 day signs and one of 13 Galactic
              Tones, creating a birth signature with its own rhythm, gifts, and life themes.
            </p>
            <div className="flex items-center gap-5 text-[var(--gold-dim)]">
              <GlyphMark name="serpent" className="h-6 w-6" />
              <GlyphMark name="star" className="h-6 w-6" />
              <GlyphMark name="maize" className="h-6 w-6" />
            </div>
          </div>

          <div className="panel rounded-2xl p-6">
            <h2 className="text-2xl font-display text-[var(--parchment)] mb-4">What the calculator reveals</h2>
            <ul className="space-y-3 text-[var(--parchment-dim)]">
              <li>- Your Nawal, or Mayan zodiac day sign</li>
              <li>- Your Galactic Tone number from 1 to 13</li>
              <li>- Your Tzolk'in birth energy and symbolic meaning</li>
              <li>- Element, direction, color, and personality themes</li>
            </ul>
          </div>
        </section>

        <GrecaBand className="mb-12" />

        <div className="mb-12">
          <BirthDateCalculator
            title="Mayan Zodiac Sign Calculator"
            description="Enter your birth date to find your Nawal day sign and Galactic Tone."
            buttonLabel="Find My Mayan Zodiac Sign"
          />
        </div>

        <section className="panel rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-3">Is Mayan Zodiac the Same as Western Zodiac?</h2>
          <p className="text-[var(--parchment-dim)] mb-4">
            The phrase "Mayan zodiac" is a modern search term, but it usually points to the 20 Nawal day
            signs of the Tzolk'in calendar. Western astrology uses 12 zodiac signs based on the solar year.
            Mayan astrology uses a 260-day sacred count, combining 20 signs with 13 tones.
          </p>
          <p className="text-[var(--parchment-dim)]">
            That means your Mayan zodiac sign is not based on a month range like Aries or Taurus. It is
            calculated from the exact day in the Tzolk'in cycle when you were born.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-display text-[var(--parchment)] mb-5">Popular Mayan Zodiac Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSigns.map((sign) => (
              <article key={sign.name} className="panel rounded-2xl p-6">
                <p className="text-sm font-semibold text-gold-bright">{sign.spanish} / {sign.mayan}</p>
                <h3 className="text-2xl font-display text-[var(--parchment)] mb-2">{sign.name}</h3>
                <p className="text-[var(--parchment-dim)] mb-4">{sign.meaning}</p>
                <p className="text-sm text-[var(--parchment-dim)]">
                  {sign.element} element, {sign.direction} direction, {sign.color} color
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/day-signs" className="link-gold font-semibold">
              Read all 20 Mayan zodiac signs
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Birth chart reading</h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              Your Mayan zodiac sign becomes clearer when it is read with your Galactic Tone and full
              birth chart context.
            </p>
            <Link href="/birth-chart" className="link-gold font-semibold">
              Explore birth charts
            </Link>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Daily Tzolk'in energy</h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              Compare your personal sign with today's Mayan date to notice timing, mood, and recurring
              patterns.
            </p>
            <Link href="/today" className="link-gold font-semibold">
              View today's Mayan date
            </Link>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Compatibility</h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              Compare two Mayan zodiac signs to understand shared rhythm, contrast, and relationship
              themes.
            </p>
            <Link href="/compatibility" className="link-gold font-semibold">
              Check compatibility
            </Link>
          </article>
        </section>

        <section className="panel rounded-2xl p-6 md:p-8 mt-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-5">Mayan Zodiac Calculator FAQ</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-[var(--parchment)] mb-2">How do I find my Mayan zodiac sign?</h3>
              <p className="text-[var(--parchment-dim)]">
                Enter your birth date in the calculator. It converts the date into the Tzolk'in calendar
                and returns your Nawal day sign and Galactic Tone.
              </p>
            </div>
            <div>
              <h3 className="font-display text-[var(--parchment)] mb-2">Is a Mayan zodiac sign based on my birth month?</h3>
              <p className="text-[var(--parchment-dim)]">
                No. Unlike Western zodiac signs, Mayan zodiac signs are not month ranges. They are based
                on the exact position of your birth date in the 260-day Tzolk'in cycle.
              </p>
            </div>
            <div>
              <h3 className="font-display text-[var(--parchment)] mb-2">What is the difference between a Nawal and a Galactic Tone?</h3>
              <p className="text-[var(--parchment-dim)]">
                The Nawal is the day sign and symbolic center of the reading. The Galactic Tone is the
                number from 1 to 13 that shapes how the sign energy expresses itself.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
