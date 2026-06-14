import type { Metadata } from 'next';
import Link from 'next/link';
import { GALACTIC_TONES } from '../lib/mayan-calculator';

export const metadata: Metadata = {
  title: 'Mayan Galactic Tones - Meanings of Numbers 1 to 13',
  description: "Learn the 13 Mayan Galactic Tones used in Tzolk'in astrology. Understand what each number means in your Mayan birth chart.",
  keywords: 'mayan galactic tones, tzolkin tones, mayan astrology numbers, mayan birth chart number, galactic tone meaning',
  alternates: { canonical: 'https://mayanastrologycalculator.com/galactic-tones' },
};

export default function GalacticTonesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Mayan Galactic Tones: Numbers 1 to 13
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            A Mayan birth chart combines a Nawal day sign with a Galactic Tone. The tone is the number
            from 1 to 13 in your result, and it describes how your day sign energy moves, grows, and
            expresses itself in daily life.
          </p>
        </section>

        <section className="bg-white border border-amber-200 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950 mb-3">How to Read Your Tone</h2>
          <p className="text-gray-700 mb-4">
            Think of the Nawal as the symbolic force and the Galactic Tone as the rhythm. For example,
            7 Ik means the Wind sign is expressed through the Resonant tone, emphasizing inspiration,
            attunement, and communication. The tone does not replace the day sign; it shapes the way the
            sign is experienced.
          </p>
          <p className="text-gray-700">
            If you do not know your tone yet, calculate your Mayan astrology birth chart first and then
            match the number in your result to the guide below.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Find Your Galactic Tone
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALACTIC_TONES.map((tone) => (
            <article key={tone.number} className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white text-2xl font-bold">
                  {tone.number}
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700">Galactic Tone</p>
                  <h2 className="text-2xl font-bold text-gray-950">{tone.name}</h2>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{tone.meaning}</p>

              <h3 className="font-semibold text-gray-950 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {tone.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
