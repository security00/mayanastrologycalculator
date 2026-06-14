import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Mayan Astrology Birth Chart Calculator',
  description: "Create a free Mayan astrology birth chart from your date of birth. Learn your Nawal day sign, Galactic Tone, and Tzolk'in birth energy.",
  keywords: 'mayan astrology birth chart, mayan birth chart free, mayan birth chart calculator, tzolkin birth chart, mayan astrology chart',
  alternates: { canonical: 'https://mayanastrologycalculator.com/birth-chart' },
};

export default function BirthChartPage() {
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
            Free Mayan Astrology Birth Chart Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            A Mayan astrology birth chart starts with your Tzolk'in signature: one Galactic Tone and one
            Nawal day sign based on your date of birth. This combination is often searched as a Mayan
            zodiac sign, Mayan sign, or Mayan calendar birth chart.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Calculate Your Birth Chart
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">1. Your Galactic Tone</h2>
            <p className="text-gray-700">
              The tone is the number from 1 to 13. It describes the rhythm of your chart, including
              themes such as purpose, balance, service, empowerment, release, and transcendence.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">2. Your Nawal Sign</h2>
            <p className="text-gray-700">
              The Nawal is one of 20 Mayan day signs. It is the symbolic center of your reading and
              points to your natural strengths, challenges, and spiritual orientation.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">3. Your Combined Reading</h2>
            <p className="text-gray-700">
              Together, the tone and Nawal form one of 260 Tzolk'in combinations. The result gives a
              concise birth chart profile that you can save, revisit, and share.
            </p>
          </article>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-4">What a Mayan Birth Chart Can Tell You</h2>
          <p className="text-gray-700 mb-4">
            Mayan astrology is different from Western astrology. It does not begin with twelve zodiac
            constellations. Instead, it reads your place in the 260-day sacred Tzolk'in cycle. Your
            birth chart can help you explore personality patterns, relationship dynamics, spiritual
            timing, and the way your natural energy tends to show up in daily life.
          </p>
          <p className="text-gray-700 mb-4">
            The calculator uses the widely accepted GMT correlation for Gregorian-to-Mayan date conversion.
            Enter your day, month, and year of birth to generate your Mayan astrology chart instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/day-signs" className="text-orange-700 hover:text-orange-800 font-semibold">
              Read the 20 Mayan signs
            </Link>
            <Link href="/galactic-tones" className="text-orange-700 hover:text-orange-800 font-semibold">
              Learn the 13 Galactic Tones
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
