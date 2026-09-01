import type { Metadata } from 'next';
import Link from 'next/link';
import { GALACTIC_TONES } from '../lib/mayan-calculator';
import PageHero from '../components/PageHero';
import MayanNumeral from '../components/decor/MayanNumeral';

export const metadata: Metadata = {
  title: 'Mayan Galactic Tones - Meanings of Numbers 1 to 13',
  description: "Learn the 13 Mayan Galactic Tones used in Tzolk'in astrology. Understand what each number means in your Mayan birth chart.",
  keywords: 'mayan galactic tones, tzolkin tones, mayan astrology numbers, mayan birth chart number, galactic tone meaning',
  alternates: { canonical: 'https://mayanastrologycalculator.com/galactic-tones' },
  openGraph: {
    title: 'Mayan Galactic Tones - Meanings of Numbers 1 to 13',
    description: "Learn the 13 Mayan Galactic Tones used in Tzolk'in astrology. Understand what each number means in your Mayan birth chart.",
    url: 'https://mayanastrologycalculator.com/galactic-tones',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'The 13 Mayan Galactic Tones',
    }],
    locale: 'en_US',
    type: 'article',
  },
};

export default function GalacticTonesPage() {
  return (
    <div className="page-shell">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="The 13 tones"
          title="Mayan Galactic Tones: Numbers 1 to 13"
          glyphs={['moon', 'water', 'wind']}
        >
          A Mayan birth chart combines a Nawal day sign with a Galactic Tone. The tone is the number
          from 1 to 13 in your result, and it describes how your day sign energy moves, grows, and
          expresses itself in daily life.
        </PageHero>

        <section className="mb-10 rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] rounded-2xl p-6 text-[var(--parchment-dim)] md:p-8">
          <h2 className="text-xl font-display text-[var(--parchment)]">A note on terminology</h2>
          <p className="mt-3 leading-7">
            The repeating numbers 1 to 13 are part of the Tzolk’in calendar count. The names Magnetic,
            Lunar, Electric, Resonant, Galactic, Cosmic, and the related process keywords are modern
            Dreamspell terminology. We keep the familiar “Galactic Tone” wording on this page while
            clearly labeling its modern interpretive source.
          </p>
          <Link href="/methodology" className="mt-4 inline-block font-bold text-[#8fe8c8] underline underline-offset-4">
            Read our calculation methodology and sources
          </Link>
        </section>

        <section className="panel rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-3">How to Read Your Tone</h2>
          <p className="text-[var(--parchment-dim)] mb-4">
            Think of the Nawal as the symbolic force and the Galactic Tone as the rhythm. For example,
            7 Ik means the Wind sign is expressed through the Resonant tone, emphasizing inspiration,
            attunement, and communication. The tone does not replace the day sign; it shapes the way the
            sign is experienced.
          </p>
          <p className="text-[var(--parchment-dim)]">
            If you do not know your tone yet, calculate your Mayan astrology birth chart first and then
            match the number in your result to the guide below.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block btn-ember px-6 py-3"
          >
            Find Your Galactic Tone
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALACTIC_TONES.map((tone) => (
            <article key={tone.number} className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--gold-line-strong)] bg-[rgb(212_162_78/12%)] text-gold-bright text-2xl font-display shadow-[0_0_24px_-6px_rgb(212_162_78/50%)]">
                  {tone.number}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gold-bright">Modern Dreamspell name</p>
                  <h2 className="text-2xl font-display text-[var(--parchment)]">{tone.name}</h2>
                </div>
                <MayanNumeral value={tone.number} className="opacity-80" />
              </div>

              <p className="text-[var(--parchment-dim)] mb-4">{tone.meaning}</p>

              <h3 className="font-display text-[var(--parchment)] mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {tone.keywords.map((keyword) => (
                  <span key={keyword} className="chip">
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
