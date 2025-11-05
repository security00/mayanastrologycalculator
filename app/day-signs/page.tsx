import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mayan Day Signs - 20 Nawal Meanings & Symbols',
  description: "Explore the 20 Mayan day signs (Nawals) and their meanings. Learn traits, elements, directions, and symbolism for each sign in the Tzolk'in calendar.",
  alternates: { canonical: 'https://mayanastrologycalculator.com/day-signs' },
};

export default function DaySignsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mayan Day Signs (Nawals)</h1>
        <p className="text-lg text-gray-700 mb-6">
          This page provides an overview of the 20 Mayan day signs (Nawals). A detailed breakdown is coming soon. For now, read the complete introduction in our guide.
        </p>
        <Link href="/guide" className="bg-orange-600 text-white inline-block px-6 py-3 rounded-lg hover:bg-orange-700">Read the Guide</Link>
      </main>
    </div>
  );
}

