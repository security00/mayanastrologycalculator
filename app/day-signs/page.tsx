import type { Metadata } from 'next';
import Link from 'next/link';
import { DAY_SIGNS } from '../lib/mayan-calculator';

export const metadata: Metadata = {
  title: 'Mayan Zodiac Signs - 20 Nawal Day Sign Meanings',
  description: "Explore all 20 Mayan zodiac signs, also called Nawal day signs. Learn each sign's meaning, element, direction, color, and personality themes.",
  keywords: 'mayan zodiac signs, mayan sign, mayan day signs, nawal meanings, tzolkin signs, mayan astrology signs',
  alternates: { canonical: 'https://mayanastrologycalculator.com/day-signs' },
};

export default function DaySignsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/" className="text-orange-700 hover:text-orange-800 font-medium">
            Back to calculator
          </Link>
        </div>

        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Mayan Zodiac Signs: The 20 Nawal Day Signs
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            In Mayan astrology, your zodiac sign is your Nawal, the Tzolk'in day sign connected with your
            birth date. Each Nawal describes a spiritual pattern, a natural force, and a set of personality
            themes. Use this guide to understand the sign from your Mayan astrology calculator result.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-3">How Mayan Zodiac Signs Work</h2>
          <p className="text-gray-700 mb-4">
            The sacred Tzolk'in calendar combines 20 day signs with 13 tones, creating 260 possible birth
            signatures. The day sign is the symbolic center of the reading: it points to your core nature,
            recurring gifts, and the kind of energy you naturally carry into relationships, work, and inner life.
          </p>
          <p className="text-gray-700">
            If you searched for a Mayan zodiac sign calculator, start with the calculator on the homepage, then
            return here to read the detailed meaning of your Nawal.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Calculate Your Mayan Sign
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DAY_SIGNS.map((sign, index) => (
            <article key={sign.name} className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm font-semibold text-orange-700">Sign {index + 1}</p>
                  <h2 className="text-2xl font-bold text-gray-950">{sign.name}</h2>
                  <p className="text-gray-600">{sign.spanish} / {sign.mayan}</p>
                </div>
                <span className="rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-sm font-medium">
                  {sign.color}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{sign.meaning}</p>

              <dl className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <dt className="font-semibold text-gray-950">Element</dt>
                  <dd className="text-gray-700">{sign.element}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-950">Direction</dt>
                  <dd className="text-gray-700">{sign.direction}</dd>
                </div>
              </dl>

              <h3 className="font-semibold text-gray-950 mb-2">Common themes</h3>
              <ul className="space-y-1 text-gray-700">
                {sign.characteristics.map((characteristic) => (
                  <li key={characteristic}>- {characteristic}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
