import type { Metadata } from 'next';
import Link from 'next/link';
import CompatibilityTool from './CompatibilityTool';
import PageHero from '../components/PageHero';

export const metadata: Metadata = {
  title: 'Mayan Compatibility Calculator - Compare Two Birth Signs',
  description: "Use this free Mayan compatibility calculator to compare two Tzolk'in birth signs, Galactic Tones, Nawals, elements, and relationship themes.",
  keywords: 'mayan compatibility calculator, mayan astrology compatibility, mayan sign compatibility, mayan zodiac compatibility, tzolkin compatibility',
  alternates: { canonical: 'https://mayanastrologycalculator.com/compatibility' },
  openGraph: {
    title: 'Mayan Compatibility Calculator - Compare Two Birth Signs',
    description: "Compare two Mayan astrology birth signs and discover their shared rhythm, contrast, and relationship themes.",
    url: 'https://mayanastrologycalculator.com/compatibility',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'Mayan Compatibility Calculator',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function CompatibilityPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Mayan Compatibility Calculator',
    url: 'https://mayanastrologycalculator.com/compatibility',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web Browser',
    description: "A free reflective tool that compares two Tzolk'in birth signs, Galactic Tones, Nawals, elements, and directions.",
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="Two signatures, one rhythm"
          title="Mayan Compatibility Calculator"
          glyphs={['water', 'star', 'obsidian']}
        >
          Compare two Mayan astrology birth signs and see how their Galactic Tones, Nawals,
          elements, and directions interact. This tool is designed for partners, friends, family
          members, or anyone curious about relationship patterns in the Tzolk'in calendar.
        </PageHero>

        <CompatibilityTool />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Tone rhythm</h2>
            <p className="text-[var(--parchment-dim)]">
              Galactic Tones show how each person moves through challenge, growth, service, release,
              and completion. Similar tones can feel familiar; different tones can create useful contrast.
            </p>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Nawal energy</h2>
            <p className="text-[var(--parchment-dim)]">
              Nawals describe the symbolic center of each birth sign. Comparing two Nawals can reveal
              shared instincts, natural friction, and complementary strengths.
            </p>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Relationship context</h2>
            <p className="text-[var(--parchment-dim)]">
              Compatibility is a reflection tool, not a fixed judgment. Use the reading to start a better
              conversation about pacing, communication, and emotional expectations.
            </p>
          </article>
        </section>

        <section className="panel rounded-2xl p-6 md:p-8 mt-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-4">
            How the Mayan Compatibility Calculator Works
          </h2>
          <p className="text-[var(--parchment-dim)] mb-5">
            Enter two birth dates to calculate each person's Nawal day sign and Galactic Tone. The
            comparison then looks at tone rhythm, day-sign distance, element, and direction to create
            a modern reflective compatibility score and a short relationship reading.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-5">
              <h3 className="font-display text-[var(--parchment)] mb-2">Mayan sign compatibility</h3>
              <p className="text-[var(--parchment-dim)]">
                Compare the symbolic themes, strengths, and contrasts associated with two Nawals.
              </p>
            </article>
            <article className="rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] p-5">
              <h3 className="font-display text-[var(--parchment)] mb-2">Galactic Tone rhythm</h3>
              <p className="text-[var(--parchment-dim)]">
                See whether the two tones suggest a similar pace or a relationship shaped by contrast.
              </p>
            </article>
            <article className="rounded-xl border border-[rgb(234_88_12/25%)] bg-[rgb(234_88_12/7%)] p-5">
              <h3 className="font-display text-[var(--parchment)] mb-2">Relationship reflection</h3>
              <p className="text-[var(--parchment-dim)]">
                Use the result as a conversation prompt rather than a fixed prediction or judgment.
              </p>
            </article>
          </div>
          <p className="text-sm text-[var(--parchment-dim)] mt-5">
            This compatibility score is a modern interpretive feature, not a documented historical
            Maya matching formula. Living Maya traditions are diverse, and this tool does not replace
            guidance from a Maya daykeeper or cultural practitioner.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Calculate each birth chart</h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              Read the two Nawal signs and Galactic Tones separately before comparing the relationship.
            </p>
            <Link href="/birth-chart" className="link-gold font-semibold">
              Create a free birth chart →
            </Link>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Explore the 20 day signs</h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              Learn the meanings, elements, directions, and characteristics associated with each Nawal.
            </p>
            <Link href="/day-signs" className="link-gold font-semibold">
              Read the Mayan day signs →
            </Link>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">Understand the 13 tones</h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              See how Galactic Tones shape rhythm, expression, challenge, and completion.
            </p>
            <Link href="/galactic-tones" className="link-gold font-semibold">
              Learn the Galactic Tones →
            </Link>
          </article>
        </section>
      </main>
    </div>
  );
}
