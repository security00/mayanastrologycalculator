import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Mayan Astrology Calculator',
  description: 'The terms for using Mayan Astrology Calculator. Simple usage rules, disclaimers, and contact information for questions about these terms.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/terms' },
  openGraph: {
    title: 'Terms of Service - Mayan Astrology Calculator',
    description: 'The terms for using Mayan Astrology Calculator. Simple usage rules, disclaimers, and contact information for questions about these terms.',
    url: 'https://mayanastrologycalculator.com/terms',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose">
        <div className="mb-6">
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Calculator
          </Link>
        </div>

        <h1>Terms of Service</h1>
        <p>By using this site, you agree to use it for personal, non-commercial purposes. Content is provided for educational and spiritual exploration only.</p>
        <h2>Disclaimer</h2>
        <p>No guarantees are made about results. This site provides information and entertainment, not professional advice.</p>
        <h2>Contact</h2>
        <p>Email <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a> or visit our <Link href="/contact">contact page</Link> for questions.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Related Pages</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link></li>
            <li><Link href="/about" className="text-orange-600 hover:text-orange-700">About Mayan Astrology</Link></li>
            <li><Link href="/guide" className="text-orange-600 hover:text-orange-700">Mayan Astrology Guide</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
