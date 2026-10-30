import type { Metadata } from 'next';
import Link from 'next/link';
import BirthDateCalculator from '../components/BirthDateCalculator';
import { PillarChartAside } from '../components/PillarChartLink';
import PageHero from '../components/PageHero';
import { PersonalReportPin } from '../components/content/ReportCtaPin';
import { seoGraph } from '../lib/seo-schema';

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

const faqs = [
  {
    question: 'How is my Mayan birth chart calculated?',
    answer: 'We treat your birth date as a proleptic Gregorian civil date, apply GMT correlation 584283, and read the paired cycles of 13 numbers and 20 day names. Version label: gmt584283-proleptic-gregorian-v1. The methodology page has the formula.',
  },
  {
    question: 'Do I need a birth time or place?',
    answer: 'No. This Tzolk’in calculator does not use birth time or location.',
  },
  {
    question: 'What is the difference between the free chart and the $7 report?',
    answer: 'The free result already includes your day sign, number, and a short interpretation. The $7 11-page PDF expands into longer chapters (relationships, work, stress, decisions, seven-day practice). Preview the sample report, then use the reports page to buy.',
  },
  {
    question: 'Why is my result different from a Dreamspell or “galactic signature” site?',
    answer: 'Those tools often follow a modern Dreamspell count (1987 anchor; skips 29 February). This site uses the traditional count. Compare the two on the Dreamspell page.',
  },
  {
    question: 'Is my Haab’ month part of this birth chart?',
    answer: 'Not in the live product UI. Haab’ is explained on the Haab’ page; personal tools here are Tzolk’in-first. This site does not yet offer a Haab’ calculator.',
  },
  {
    question: 'Can I compare my chart with someone else’s?',
    answer: 'Yes—use the compatibility calculator. The optional pair PDF is $12 via the reports page, and a sample pair report is available first.',
  },
  {
    question: 'Are interpretations predictions?',
    answer: 'No. Calendar conversion is deterministic; personality and relationship text is modern reflective writing—not scientific, medical, legal, or financial advice.',
  },
];

export default function BirthChartPage() {
  const schema = seoGraph({
    pageName: 'Free Mayan Astrology Birth Chart Calculator',
    description: "Create a free Mayan astrology birth chart from your date of birth. Learn your Nawal day sign, Galactic Tone, and Tzolk'in birth energy.",
    path: '/birth-chart',
    faqs,
  });

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="Birth chart"
          title="Free Mayan Astrology Birth Chart Calculator"
          glyphs={['sun', 'obsidian', 'maize']}
        >
          A Mayan astrology birth chart starts with your Tzolk'in signature: one Galactic Tone and one
          Nawal day sign based on your date of birth. This combination is often searched as a Mayan
          zodiac sign, Mayan sign, or Mayan calendar birth chart.
        </PageHero>

        <div className="mb-8">
          <BirthDateCalculator
            title="Generate Your Mayan Birth Chart"
            description="Enter your birth date to reveal your Nawal sign, Galactic Tone, and Tzolk'in profile."
            buttonLabel="Generate My Birth Chart"
            sampleCta={{
              href: '/sample-report',
              label: 'See a full sample report first →',
              helper: 'The free result comes first. The 11-page report is optional ($7).',
              placement: 'birth_chart_calculator',
            }}
          />
        </div>

        <section className="panel rounded-2xl p-6 md:p-8 mb-12">
          <PersonalReportPin
            placement="birth_chart_pin"
            trustNote="The free result is complete on its own (Nawal, Galactic Tone, short reading). The optional $7 11-page PDF adds deeper chapters on relationships, work, stress, decisions, and a seven-day practice—same GMT 584283 math, more pages."
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">1. Your Galactic Tone</h2>
            <p className="text-[var(--parchment-dim)]">
              The tone is the number from 1 to 13. It describes the rhythm of your chart, including
              themes such as purpose, balance, service, empowerment, release, and transcendence.
            </p>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">2. Your Nawal Sign</h2>
            <p className="text-[var(--parchment-dim)]">
              The Nawal is one of 20 Mayan day signs. It is the symbolic center of your reading and
              points to your natural strengths, challenges, and spiritual orientation.
            </p>
          </article>
          <article className="panel rounded-2xl p-6">
            <h2 className="text-xl font-display text-[var(--parchment)] mb-3">3. Your Combined Reading</h2>
            <p className="text-[var(--parchment-dim)]">
              Together, the tone and Nawal form one of 260 Tzolk'in combinations. The result gives a
              concise birth chart profile that you can save, revisit, and share.
            </p>
          </article>
        </section>

        <section className="panel rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-5">
            What Is Included in a Free Mayan Birth Chart?
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-5">
              <dt className="font-bold text-[var(--parchment)] mb-2">Nawal day sign</dt>
              <dd className="text-[var(--parchment-dim)]">
                One of 20 day signs, shown with its name, symbolic meaning, element, direction, and color.
              </dd>
            </div>
            <div className="rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] p-5">
              <dt className="font-bold text-[var(--parchment)] mb-2">Galactic Tone</dt>
              <dd className="text-[var(--parchment-dim)]">
                A number from 1 to 13 that adds a rhythm and mode of expression to the day sign.
              </dd>
            </div>
            <div className="rounded-xl border border-[rgb(234_88_12/25%)] bg-[rgb(234_88_12/7%)] p-5">
              <dt className="font-bold text-[var(--parchment)] mb-2">Combined Tzolk'in signature</dt>
              <dd className="text-[var(--parchment-dim)]">
                The tone and Nawal combine into one of 260 repeating positions in the sacred day count.
              </dd>
            </div>
            <div className="rounded-xl border border-[var(--gold-line)] bg-[var(--surface)] p-5">
              <dt className="font-bold text-[var(--parchment)] mb-2">Reflective interpretation</dt>
              <dd className="text-[var(--parchment-dim)]">
                A concise reading of strengths, recurring themes, and relationship or timing prompts.
              </dd>
            </div>
          </dl>
        </section>

        <section className="panel rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-display text-[var(--parchment)] mb-4">What a Mayan Birth Chart Can Tell You</h2>
          <p className="text-[var(--parchment-dim)] mb-4">
            Mayan astrology is different from Western astrology. It does not begin with twelve zodiac
            constellations. Instead, it reads your place in the 260-day sacred Tzolk'in cycle. Your
            birth chart can help you explore personality patterns, relationship dynamics, spiritual
            timing, and the way your natural energy tends to show up in daily life.
          </p>
          <p className="text-[var(--parchment-dim)] mb-4">
            The calculator uses the widely accepted GMT correlation for Gregorian-to-Mayan date conversion.
            Enter your day, month, and year of birth to generate your Mayan astrology chart instantly.
          </p>
          <p className="text-sm text-[var(--parchment-dim)] mb-5">
            The calendar conversion is deterministic, but the personality and relationship text is a
            modern reflective interpretation rather than a scientific assessment or fixed prediction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/day-signs" className="link-gold font-semibold">
              Read the 20 Mayan signs
            </Link>
            <Link href="/galactic-tones" className="link-gold font-semibold">
              Learn the 13 Galactic Tones
            </Link>
            <Link href="/methodology" className="link-gold font-semibold">
              Review the calculation method
            </Link>
          </div>
        </section>

        <section className="panel rounded-2xl p-6 md:p-8 mb-10 content-prose">
          <h2 className="!mt-0">From birth chart to day sign (and Haab’)</h2>
          <ol>
            <li>Your free chart gives a <strong>tone + Nawal</strong>.</li>
            <li>Read the Nawal in depth: <Link href="/day-signs">/day-signs</Link> (open your specific sign from the result when linked).</li>
            <li>Read the number: <Link href="/galactic-tones">/galactic-tones</Link>.</li>
            <li>The <strong>Haab’</strong> is a separate 365-day solar count—educational on this site, not yet a calculator: <Link href="/haab">/haab</Link>.</li>
            <li><strong>Year bearer</strong> (which day sign carries a Haab’ year): <Link href="/year-bearer">/year-bearer</Link>.</li>
          </ol>
          <p>
            See also today’s moving signature: <Link href="/today">/today</Link>.
            If another app’s kin differs: <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link>.
            Method: <Link href="/methodology">/methodology</Link>.
            Prices: Personal <strong>$7</strong> · Pair <strong>$12</strong> on <Link href="/reports">/reports</Link>.
            Samples: <Link href="/sample-report">full personal sample</Link> · <Link href="/sample-compatibility-report">sample pair report</Link>.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <article className="panel rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-display text-[var(--parchment)] mb-4">
              Mayan Cosmology Chart vs. Western Birth Chart
            </h2>
            <p className="text-[var(--parchment-dim)] mb-4">
              People sometimes call this result a Mayan cosmology chart because it places a birth date
              inside a sacred calendar cycle. It is not a wheel of planets, houses, and zodiac
              constellations like a Western natal chart.
            </p>
            <p className="text-[var(--parchment-dim)]">
              This calculator focuses on the Tzolk'in day count: one Nawal, one Galactic Tone, and their
              combined symbolic signature. Birth time and location are not required for this calculation.
            </p>
          </article>
          <article className="panel rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-display text-[var(--parchment)] mb-4">Continue your reading</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/compatibility" className="link-gold font-semibold">
                  Compare two Mayan birth signs →
                </Link>
              </li>
              <li>
                <Link href="/today" className="link-gold font-semibold">
                  See today's Tzolk'in date →
                </Link>
              </li>
              <li>
                <Link href="/guide" className="link-gold font-semibold">
                  Read the Mayan astrology guide →
                </Link>
              </li>
              <li>
                <Link href="/haab" className="link-gold font-semibold">
                  What is the Haab’? →
                </Link>
              </li>
              <li>
                <Link href="/year-bearer" className="link-gold font-semibold">
                  Year bearer explained →
                </Link>
              </li>
              <li>
                <Link href="/reports" className="link-gold font-semibold">
                  Get the 11-page report — $7 / Get the pair report — $12 →
                </Link>
              </li>
            </ul>
          </article>
        </section>

        <section className="content-prose mt-10">
          <h2>FAQ</h2>
          <h3>How is my Mayan birth chart calculated?</h3>
          <p>
            We treat your birth date as a proleptic Gregorian civil date, apply GMT correlation <strong>584283</strong>, and read the paired cycles of 13 numbers and 20 day names. Version label: <code>gmt584283-proleptic-gregorian-v1</code>. Details: <Link href="/methodology">/methodology</Link>.
          </p>
          <h3>Do I need a birth time or place?</h3>
          <p>No. This Tzolk’in calculator does not use birth time or location.</p>
          <h3>What is the difference between the free chart and the $7 report?</h3>
          <p>
            The free result already includes your day sign, number, and a short interpretation. The <strong>$7</strong> 11-page PDF expands into longer chapters (relationships, work, stress, decisions, seven-day practice). Preview: <Link href="/sample-report">/sample-report</Link> · buy path: <Link href="/reports">/reports</Link>.
          </p>
          <h3>Why is my result different from a Dreamspell or “galactic signature” site?</h3>
          <p>
            Those tools often follow a modern Dreamspell count (1987 anchor; skips 29 February). This site uses the traditional count. Compare: <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link>.
          </p>
          <h3>Is my Haab’ month part of this birth chart?</h3>
          <p>
            Not in the live product UI. Haab’ is explained on <Link href="/haab">/haab</Link>; personal tools here are Tzolk’in-first. There is no Haab’ calculator yet.
          </p>
          <h3>Can I compare my chart with someone else’s?</h3>
          <p>
            Yes—<Link href="/compatibility">/compatibility</Link>. Optional pair PDF: <strong>$12</strong> via <Link href="/reports">/reports</Link>; sample: <Link href="/sample-compatibility-report">/sample-compatibility-report</Link>.
          </p>
          <h3>Are interpretations predictions?</h3>
          <p>No. Calendar conversion is deterministic; personality and relationship text is modern reflective writing—not scientific, medical, legal, or financial advice.</p>
        </section>

        <div className="mt-6">
          <PillarChartAside placement="birth_chart" />
        </div>
      </main>
    </div>
  );
}
