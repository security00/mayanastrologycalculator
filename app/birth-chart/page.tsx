import type { Metadata } from 'next';
import Link from 'next/link';
import BirthDateCalculator from '../components/BirthDateCalculator';

export const metadata: Metadata = {
  title: 'Free Mayan Astrology Birth Chart Calculator',
  description: "Create a free Mayan astrology birth chart from your date of birth. Learn your Nawal day sign, Galactic Tone, and Tzolk'in birth energy.",
  keywords: 'mayan astrology birth chart, mayan birth chart free, mayan birth chart calculator, tzolkin birth chart, mayan astrology chart',
  alternates: { canonical: 'https://mayanastrologycalculator.com/birth-chart' },
  openGraph: {
    title: 'Free Mayan Astrology Birth Chart Calculator',
    description: "Create a free Mayan astrology birth chart from your date of birth. Learn your Nawal day sign, Galactic Tone, and Tzolk'in birth energy.",
    url: 'https://mayanastrologycalculator.com/birth-chart',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'Free Mayan Astrology Birth Chart Calculator',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function BirthChartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Free Mayan Astrology Birth Chart Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            A Mayan astrology birth chart starts with your Tzolk'in signature: one Galactic Tone and one
            Nawal day sign based on your date of birth. This combination is often searched as a Mayan
            zodiac sign, Mayan sign, or Mayan calendar birth chart.
          </p>
        </section>

        <div className="mb-12">
          <BirthDateCalculator
            title="Generate Your Mayan Birth Chart"
            description="Enter your birth date to reveal your Nawal sign, Galactic Tone, and Tzolk'in profile."
            buttonLabel="Generate My Birth Chart"
          />
        </div>

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

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-5">
            What Is Included in a Free Mayan Birth Chart?
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-lg bg-amber-50 border border-amber-100 p-5">
              <dt className="font-bold text-gray-950 mb-2">Nawal day sign</dt>
              <dd className="text-gray-700">
                One of 20 day signs, shown with its name, symbolic meaning, element, direction, and color.
              </dd>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-5">
              <dt className="font-bold text-gray-950 mb-2">Galactic Tone</dt>
              <dd className="text-gray-700">
                A number from 1 to 13 that adds a rhythm and mode of expression to the day sign.
              </dd>
            </div>
            <div className="rounded-lg bg-orange-50 border border-orange-100 p-5">
              <dt className="font-bold text-gray-950 mb-2">Combined Tzolk'in signature</dt>
              <dd className="text-gray-700">
                The tone and Nawal combine into one of 260 repeating positions in the sacred day count.
              </dd>
            </div>
            <div className="rounded-lg bg-stone-50 border border-stone-200 p-5">
              <dt className="font-bold text-gray-950 mb-2">Reflective interpretation</dt>
              <dd className="text-gray-700">
                A concise reading of strengths, recurring themes, and relationship or timing prompts.
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
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
          <p className="text-sm text-gray-600 mb-5">
            The calendar conversion is deterministic, but the personality and relationship text is a
            modern reflective interpretation rather than a scientific assessment or fixed prediction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/day-signs" className="text-orange-700 hover:text-orange-800 font-semibold">
              Read the 20 Mayan signs
            </Link>
            <Link href="/galactic-tones" className="text-orange-700 hover:text-orange-800 font-semibold">
              Learn the 13 Galactic Tones
            </Link>
            <Link href="/about" className="text-orange-700 hover:text-orange-800 font-semibold">
              Review the calculation method
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <article className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950 mb-4">
              Mayan Cosmology Chart vs. Western Birth Chart
            </h2>
            <p className="text-gray-700 mb-4">
              People sometimes call this result a Mayan cosmology chart because it places a birth date
              inside a sacred calendar cycle. It is not a wheel of planets, houses, and zodiac
              constellations like a Western natal chart.
            </p>
            <p className="text-gray-700">
              This calculator focuses on the Tzolk'in day count: one Nawal, one Galactic Tone, and their
              combined symbolic signature. Birth time and location are not required for this calculation.
            </p>
          </article>
          <article className="bg-orange-50 border border-orange-200 rounded-lg p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950 mb-4">Continue your reading</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/compatibility" className="text-orange-700 hover:text-orange-800 font-semibold">
                  Compare two Mayan birth signs →
                </Link>
              </li>
              <li>
                <Link href="/today" className="text-orange-700 hover:text-orange-800 font-semibold">
                  See today's Tzolk'in date →
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-orange-700 hover:text-orange-800 font-semibold">
                  Read the Mayan astrology guide →
                </Link>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
