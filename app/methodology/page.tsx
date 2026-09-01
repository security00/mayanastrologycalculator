import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '../components/PageHero';

export const metadata: Metadata = {
  title: 'Calculation Methodology and Cultural Scope',
  description: "See how Mayan Astrology Calculator converts Gregorian dates to the Tzolk'in count, which correlation it uses, and how modern interpretations are labeled.",
  alternates: { canonical: 'https://mayanastrologycalculator.com/methodology' },
};

const sources = [
  {
    name: 'Smithsonian National Museum of the American Indian - Living Maya Time',
    href: 'https://maya.nmai.si.edu/calendar/calendar-system',
    detail: "Calendar structure, Maya terminology, and the 4 Ajaw benchmark used for the Tzolk'in count.",
  },
  {
    name: 'ClassicMayan - Maya Calendar Calculations',
    href: 'https://classicmayan.org/portal/doc/171',
    detail: 'Academic discussion of calendar conversion, correlation choices, and astronomical reconstruction.',
  },
  {
    name: 'UNAM - Contemporary use of the Cholq’ij',
    href: 'https://www.revistas-filologicas.unam.mx/estudios-cultura-maya/index.php/ecm/article/view/1006',
    detail: 'Peer-reviewed discussion of continuity, change, and living highland Maya calendar traditions.',
  },
  {
    name: 'Foundation for the Law of Time - Galactic Tones',
    href: 'https://lawoftime.org/infobooth/sealsandtones.html',
    detail: 'Primary source for the modern Dreamspell names such as Magnetic, Lunar, Resonant, and Cosmic.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="page-shell">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="Transparency"
          title="Calculation Methodology and Cultural Scope"
          glyphs={['obsidian', 'wind', 'star']}
        >
          Our calculator separates a reproducible calendar conversion from historical context and from
          modern reflective interpretation. These layers have different kinds of evidence and should not
          be treated as interchangeable.
        </PageHero>

        <div className="space-y-8">
          <section className="panel rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-display text-[var(--parchment)]">1. Reproducible date calculation</h2>
            <p className="mt-4 leading-7 text-[var(--parchment-dim)]">
              We interpret the submitted birth date as a proleptic Gregorian civil date, convert it to an
              integer Julian Day Number, and subtract the GMT correlation constant <strong>584283</strong>.
              The resulting day count advances through one cycle of 13 numbers and one cycle of 20 named
              days. The two cycles repeat together every 260 days.
            </p>
            <div className="mt-5 rounded-xl border border-[var(--gold-line)] bg-black/40 p-4 font-mono text-sm text-gold-bright">
              number = ((days + 3) mod 13) + 1<br />
              day name index = (days + 19) mod 20
            </div>
            <p className="mt-4 text-sm text-[var(--parchment-dim)]">
              Calculation version: <code>gmt584283-proleptic-gregorian-v1</code>. Other scholarly tools may
              offer nearby GMT variants such as 584285 or 584286; those choices shift the result by a small
              number of days. Our consumer calculator keeps 584283 as a stable default.
            </p>
          </section>

          <section className="panel rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-display text-[var(--parchment)]">2. Calendar history and living traditions</h2>
            <p className="mt-4 leading-7 text-[var(--parchment-dim)]">
              The 260-day sacred count is historically documented and remains part of living Maya
              traditions, including the K’iche’ Chol Q’ij. Meanings and practices vary by period, language,
              community, and ritual context. A web calculator cannot reproduce the training or community
              role of an Ajq’ij, and we do not claim lineage authority.
            </p>
          </section>

          <section className="rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-display text-[var(--parchment)]">3. Modern interpretive layer</h2>
            <p className="mt-4 leading-7 text-[var(--parchment-dim)]">
              Personalized passages about relationships, work, stress, purpose, and self-development are
              modern reflective writing. The labels Magnetic, Lunar, Electric, Resonant, Galactic, Cosmic,
              and the other named “Galactic Tones” come from the modern Dreamspell system. We retain them
              where useful for continuity and search recognition, while labeling their modern source.
            </p>
            <p className="mt-4 leading-7 text-[var(--parchment-dim)]">
              Interpretations are prompts for reflection, not scientific personality measurements,
              deterministic predictions, or medical, psychological, legal, or financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-[var(--parchment)]">Sources and further reading</h2>
            <ul className="mt-5 space-y-4">
              {sources.map((source) => (
                <li key={source.href} className="panel rounded-xl p-5">
                  <a className="font-bold text-gold-bright underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">
                    {source.name}
                  </a>
                  <p className="mt-2 text-sm leading-6 text-[var(--parchment-dim)]">{source.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="btn-ember inline-block px-7 py-3.5">
            Return to the calculator
          </Link>
        </div>
      </main>
    </div>
  );
}
