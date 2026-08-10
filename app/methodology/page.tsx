import type { Metadata } from 'next';
import Link from 'next/link';

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
    <div className="min-h-screen bg-stone-50">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-700">Transparency</p>
          <h1 className="text-4xl font-bold text-gray-950 md:text-5xl">Calculation Methodology and Cultural Scope</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
            Our calculator separates a reproducible calendar conversion from historical context and from
            modern reflective interpretation. These layers have different kinds of evidence and should not
            be treated as interchangeable.
          </p>
        </header>

        <div className="space-y-8">
          <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-950">1. Reproducible date calculation</h2>
            <p className="mt-4 leading-7 text-gray-700">
              We interpret the submitted birth date as a proleptic Gregorian civil date, convert it to an
              integer Julian Day Number, and subtract the GMT correlation constant <strong>584283</strong>.
              The resulting day count advances through one cycle of 13 numbers and one cycle of 20 named
              days. The two cycles repeat together every 260 days.
            </p>
            <div className="mt-5 rounded-xl bg-stone-100 p-4 font-mono text-sm text-gray-800">
              number = ((days + 3) mod 13) + 1<br />
              day name index = (days + 19) mod 20
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Calculation version: <code>gmt584283-proleptic-gregorian-v1</code>. Other scholarly tools may
              offer nearby GMT variants such as 584285 or 584286; those choices shift the result by a small
              number of days. Our consumer calculator keeps 584283 as a stable default.
            </p>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-950">2. Calendar history and living traditions</h2>
            <p className="mt-4 leading-7 text-gray-700">
              The 260-day sacred count is historically documented and remains part of living Maya
              traditions, including the K’iche’ Chol Q’ij. Meanings and practices vary by period, language,
              community, and ritual context. A web calculator cannot reproduce the training or community
              role of an Ajq’ij, and we do not claim lineage authority.
            </p>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-950">3. Modern interpretive layer</h2>
            <p className="mt-4 leading-7 text-gray-700">
              Personalized passages about relationships, work, stress, purpose, and self-development are
              modern reflective writing. The labels Magnetic, Lunar, Electric, Resonant, Galactic, Cosmic,
              and the other named “Galactic Tones” come from the modern Dreamspell system. We retain them
              where useful for continuity and search recognition, while labeling their modern source.
            </p>
            <p className="mt-4 leading-7 text-gray-700">
              Interpretations are prompts for reflection, not scientific personality measurements,
              deterministic predictions, or medical, psychological, legal, or financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-950">Sources and further reading</h2>
            <ul className="mt-5 space-y-4">
              {sources.map((source) => (
                <li key={source.href} className="rounded-xl border border-stone-200 bg-white p-5">
                  <a className="font-bold text-orange-700 underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">
                    {source.name}
                  </a>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{source.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="inline-block rounded-xl bg-gray-950 px-7 py-3.5 font-bold text-white hover:bg-gray-800">
            Return to the calculator
          </Link>
        </div>
      </main>
    </div>
  );
}
