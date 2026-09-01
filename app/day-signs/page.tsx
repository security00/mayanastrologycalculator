import type { Metadata } from 'next';
import Link from 'next/link';
import { DAY_SIGNS } from '../lib/mayan-calculator';
import PageHero from '../components/PageHero';
import MayanNumeral from '../components/decor/MayanNumeral';

export const metadata: Metadata = {
  title: 'Mayan Zodiac Signs - 20 Nawal Day Sign Meanings',
  description: "Explore all 20 Mayan zodiac signs, also called Nawal day signs. Learn each sign's meaning, element, direction, color, and personality themes.",
  keywords: 'mayan zodiac signs, mayan sign, mayan day signs, nawal meanings, tzolkin signs, mayan astrology signs',
  alternates: { canonical: 'https://mayanastrologycalculator.com/day-signs' },
  openGraph: {
    title: 'Mayan Zodiac Signs - 20 Nawal Day Sign Meanings',
    description: "Explore all 20 Mayan zodiac signs, also called Nawal day signs. Learn each sign's meaning, element, direction, color, and personality themes.",
    url: 'https://mayanastrologycalculator.com/day-signs',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'The 20 Mayan Nawal Day Signs',
    }],
    locale: 'en_US',
    type: 'article',
  },
};

export default function DaySignsPage() {
  return (
    <div className="page-shell">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="The 20 Nawals"
          title="Mayan Zodiac Signs: The 20 Nawal Day Signs"
          glyphs={['serpent', 'maize', 'star']}
        >
          In Mayan astrology, your zodiac sign is your Nawal, the Tzolk'in day sign connected with your
          birth date. Each Nawal describes a spiritual pattern, a natural force, and a set of personality
          themes. Use this guide to understand the sign from your Mayan astrology calculator result.
        </PageHero>

        <section className="panel rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-3">How Mayan Zodiac Signs Work</h2>
          <p className="text-[var(--parchment-dim)] mb-4">
            The sacred Tzolk'in calendar combines 20 day signs with 13 tones, creating 260 possible birth
            signatures. The day sign is the symbolic center of the reading: it points to your core nature,
            recurring gifts, and the kind of energy you naturally carry into relationships, work, and inner life.
          </p>
          <p className="text-[var(--parchment-dim)]">
            If you searched for a Mayan zodiac sign calculator, start with the calculator on the homepage, then
            return here to read the detailed meaning of your Nawal.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block btn-ember px-6 py-3"
          >
            Calculate Your Mayan Sign
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DAY_SIGNS.map((sign, index) => (
            <article key={sign.name} className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm font-semibold text-gold-bright">Sign {index + 1}</p>
                  <h2 className="text-2xl font-display text-[var(--parchment)]">{sign.name}</h2>
                  <p className="text-[var(--parchment-dim)]">{sign.spanish} / {sign.mayan}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="chip">
                    {sign.color}
                  </span>
                  <MayanNumeral value={index + 1} className="opacity-80" />
                </div>
              </div>

              <p className="text-[var(--parchment-dim)] mb-4">{sign.meaning}</p>

              <dl className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <dt className="font-semibold text-[var(--parchment)]">Element</dt>
                  <dd className="text-[var(--parchment-dim)]">{sign.element}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--parchment)]">Direction</dt>
                  <dd className="text-[var(--parchment-dim)]">{sign.direction}</dd>
                </div>
              </dl>

              <h3 className="font-display text-[var(--parchment)] mb-2">Common themes</h3>
              <ul className="space-y-1 text-[var(--parchment-dim)]">
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
