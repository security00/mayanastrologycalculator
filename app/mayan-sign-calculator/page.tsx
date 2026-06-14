import type { Metadata } from 'next';
import Link from 'next/link';
import { DAY_SIGNS, GALACTIC_TONES } from '../lib/mayan-calculator';

export const metadata: Metadata = {
  title: 'Mayan Sign Calculator - Discover Your Nawal Day Sign',
  description: "Use this Mayan sign calculator guide to discover your Nawal day sign, Galactic Tone, and the meaning of your Mayan astrology profile.",
  keywords: 'mayan sign calculator, mayan signs calculator, mayan astrology sign calculator, mayan birth sign, nawal calculator',
  alternates: { canonical: 'https://mayanastrologycalculator.com/mayan-sign-calculator' },
  openGraph: {
    title: 'Mayan Sign Calculator - Discover Your Nawal Day Sign',
    description: "Find your Mayan sign, Nawal day sign, and Galactic Tone from your birth date.",
    url: 'https://mayanastrologycalculator.com/mayan-sign-calculator',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MayanSignCalculatorPage() {
  const signs = DAY_SIGNS.slice(6, 12);
  const tones = GALACTIC_TONES.slice(0, 4);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is my Mayan sign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your Mayan sign is your Nawal day sign, calculated from your birth date in the 260-day Tzolk\'in calendar.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many Mayan signs are there?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There are 20 Mayan day signs, also called Nawals. Each sign combines with one of 13 Galactic Tones.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does everyone with the same Mayan sign have the same reading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'People can share the same Nawal day sign, but the Galactic Tone changes the expression of that sign and gives the full reading more detail.',
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
            Mayan sign calculator
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Discover Your Mayan Sign
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mb-6">
            Your Mayan sign is your Nawal day sign, calculated from your birth date in the Tzolk'in
            calendar. It describes the symbolic energy, natural gifts, and recurring patterns associated
            with the day you were born.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Calculate My Mayan Sign
          </Link>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-10">
          <div className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950 mb-3">What your Mayan sign includes</h2>
            <p className="text-gray-700 mb-4">
              A complete Mayan astrology result is more than one sign name. The Nawal is the symbolic
              center, while the Galactic Tone shows how that energy moves and expresses itself.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>- Nawal day sign</li>
              <li>- Galactic Tone</li>
              <li>- Element and direction</li>
              <li>- Core personality themes</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tones.map((tone) => (
              <article key={tone.number} className="bg-white border border-amber-100 rounded-lg p-5 shadow-sm">
                <p className="text-sm font-semibold text-orange-700">Tone {tone.number}</p>
                <h3 className="text-xl font-bold text-gray-950 mb-2">{tone.name}</h3>
                <p className="text-gray-700">{tone.meaning}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-950 mb-5">Examples of Mayan Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {signs.map((sign) => (
              <article key={sign.name} className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
                <p className="text-sm font-semibold text-orange-700">{sign.spanish} / {sign.mayan}</p>
                <h3 className="text-2xl font-bold text-gray-950 mb-2">{sign.name}</h3>
                <p className="text-gray-700">{sign.meaning}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-3">How to Read Your Mayan Sign Result</h2>
          <p className="text-gray-700 mb-4">
            Start with the Nawal meaning, then read the Galactic Tone. If your sign suggests communication,
            healing, leadership, or grounding, the tone explains whether that pattern tends to appear
            through initiative, balance, service, empowerment, release, or completion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/day-signs" className="text-orange-700 hover:text-orange-800 font-semibold">
              Read all day signs
            </Link>
            <Link href="/galactic-tones" className="text-orange-700 hover:text-orange-800 font-semibold">
              Learn Galactic Tones
            </Link>
          </div>
        </section>

        <section className="mt-10 bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-5">Mayan Sign Calculator FAQ</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">What is my Mayan sign?</h3>
              <p className="text-gray-700">
                Your Mayan sign is your Nawal day sign, calculated from your birth date in the 260-day
                Tzolk'in calendar.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">How many Mayan signs are there?</h3>
              <p className="text-gray-700">
                There are 20 Mayan day signs, also called Nawals. Each sign combines with one of 13
                Galactic Tones.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">Does everyone with the same Mayan sign have the same reading?</h3>
              <p className="text-gray-700">
                Not exactly. People can share the same Nawal, but the Galactic Tone changes how that sign
                expresses itself in the full reading.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
