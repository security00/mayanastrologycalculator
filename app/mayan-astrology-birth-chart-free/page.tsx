import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Mayan Astrology Birth Chart - Tzolk\'in Reading',
  description: "Create a free Mayan astrology birth chart and learn how to read your Tzolk'in day sign, Galactic Tone, Nawal meaning, and birth energy.",
  keywords: 'mayan astrology birth chart free, free mayan birth chart, mayan astrology chart free, tzolkin birth chart, mayan birth chart calculator free',
  alternates: { canonical: 'https://mayanastrologycalculator.com/mayan-astrology-birth-chart-free' },
  openGraph: {
    title: 'Free Mayan Astrology Birth Chart - Tzolk\'in Reading',
    description: "Create a free Mayan astrology birth chart from your birth date and read your Tzolk'in signature.",
    url: 'https://mayanastrologycalculator.com/mayan-astrology-birth-chart-free',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function FreeMayanBirthChartPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the Mayan astrology birth chart free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The calculator creates a free Mayan astrology birth chart from your birth date without registration.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is in a Mayan astrology birth chart?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Mayan astrology birth chart includes your Nawal day sign, Galactic Tone, sign meaning, keywords, element, direction, and color.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a Mayan birth chart the same as a Western astrology chart?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A Mayan birth chart is based on the Tzolk\'in calendar, while a Western astrology chart is based on planets, zodiac signs, houses, and birth time.',
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
            Free Mayan astrology birth chart
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Create a Free Mayan Astrology Birth Chart
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mb-6">
            A free Mayan astrology birth chart starts with your Tzolk'in signature: your Nawal day sign
            and Galactic Tone. Together, they describe the spiritual pattern, timing, and symbolic energy
            associated with your date of birth.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Generate My Free Birth Chart
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950 mb-3">What is included?</h2>
            <p className="text-gray-700 mb-4">
              The chart gives you a focused Tzolk'in reading, not a Western astrology wheel. It centers
              on the sacred 260-day calendar and the day-sign pattern connected with your birth date.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>- Nawal day sign</li>
              <li>- Galactic Tone</li>
              <li>- Sign meaning and keywords</li>
              <li>- Element, direction, and color</li>
            </ul>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950 mb-3">How to use the chart</h2>
            <p className="text-gray-700 mb-4">
              Read your Nawal first, then your tone. The Nawal describes the kind of energy you carry;
              the tone describes how that energy tends to move through purpose, challenge, growth, and
              completion.
            </p>
            <Link href="/birth-chart" className="text-orange-700 hover:text-orange-800 font-semibold">
              Learn more about Mayan birth charts
            </Link>
          </article>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-3">Why a Mayan Birth Chart Feels Different</h2>
          <p className="text-gray-700 mb-4">
            A Mayan astrology birth chart is less about planets and houses, and more about sacred calendar
            rhythm. It can be used as a reflective tool for personality, relationships, timing, and life
            direction. The result is simple enough to read quickly, but symbolic enough to revisit over time.
          </p>
          <p className="text-gray-700">
            Many visitors begin with a free chart, then explore the 20 day signs, 13 Galactic Tones,
            today's Mayan date, and compatibility with another person.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Day signs</h2>
            <p className="text-gray-700 mb-4">
              Explore the 20 Nawals and the symbolic meaning behind each Mayan astrology sign.
            </p>
            <Link href="/day-signs" className="text-orange-700 hover:text-orange-800 font-semibold">
              Read day signs
            </Link>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Galactic Tones</h2>
            <p className="text-gray-700 mb-4">
              Learn the 13 tones and how each number changes the expression of a Nawal.
            </p>
            <Link href="/galactic-tones" className="text-orange-700 hover:text-orange-800 font-semibold">
              Learn tones
            </Link>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Compatibility</h2>
            <p className="text-gray-700 mb-4">
              Compare two birth charts to reflect on relationship rhythm, contrast, and shared themes.
            </p>
            <Link href="/compatibility" className="text-orange-700 hover:text-orange-800 font-semibold">
              Compare charts
            </Link>
          </article>
        </section>

        <section className="mt-10 bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-5">Free Mayan Birth Chart FAQ</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">Is the Mayan astrology birth chart free?</h3>
              <p className="text-gray-700">
                Yes. The calculator creates a free Mayan astrology birth chart from your birth date, with
                no registration required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">What is in a Mayan astrology birth chart?</h3>
              <p className="text-gray-700">
                It includes your Nawal day sign, Galactic Tone, sign meaning, keywords, element,
                direction, and color.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-950 mb-2">Is it the same as a Western astrology chart?</h3>
              <p className="text-gray-700">
                No. A Mayan birth chart is based on the Tzolk'in calendar, while a Western astrology chart
                is based on planets, houses, zodiac signs, and birth time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
