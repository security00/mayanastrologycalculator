import type { Metadata } from 'next';
import Link from 'next/link';
import CompatibilityTool from './CompatibilityTool';

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
    locale: 'en_US',
    type: 'website',
  },
};

export default function CompatibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex flex-wrap gap-4">
          <Link href="/" className="text-orange-700 hover:text-orange-800 font-medium">
            Back to calculator
          </Link>
          <Link href="/day-signs" className="text-orange-700 hover:text-orange-800 font-medium">
            Day signs guide
          </Link>
        </div>

        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-5">
            Mayan Compatibility Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            Compare two Mayan astrology birth signs and see how their Galactic Tones, Nawals,
            elements, and directions interact. This tool is designed for partners, friends, family
            members, or anyone curious about relationship patterns in the Tzolk'in calendar.
          </p>
        </section>

        <CompatibilityTool />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Tone rhythm</h2>
            <p className="text-gray-700">
              Galactic Tones show how each person moves through challenge, growth, service, release,
              and completion. Similar tones can feel familiar; different tones can create useful contrast.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Nawal energy</h2>
            <p className="text-gray-700">
              Nawals describe the symbolic center of each birth sign. Comparing two Nawals can reveal
              shared instincts, natural friction, and complementary strengths.
            </p>
          </article>
          <article className="bg-white border border-amber-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950 mb-3">Relationship context</h2>
            <p className="text-gray-700">
              Compatibility is a reflection tool, not a fixed judgment. Use the reading to start a better
              conversation about pacing, communication, and emotional expectations.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
