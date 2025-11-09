import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mayan Galactic Tones - Meanings 1 to 13',
  description: "Understand the 13 Mayan Galactic Tones and how they shape the expression of your day sign. Simple explanations for tones 1–13 in the Tzolk'in calendar.",
  alternates: { canonical: 'https://mayanastrologycalculator.com/galactic-tones' },
};

export default function GalacticTonesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mayan Galactic Tones (1–13)</h1>
        <p className="text-lg text-gray-700 mb-6">
          Overview of the 13 Galactic Tones and their role in Mayan astrology. A detailed reference is coming soon. See our guide for practical explanations today.
        </p>
        <Link href="/guide" className="bg-orange-600 text-white inline-block px-6 py-3 rounded-lg hover:bg-orange-700">Read the Guide</Link>
      </main>
    </div>
  );
}

