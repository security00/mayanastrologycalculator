import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mayan Astrology Calculator',
  description: 'Read how Mayan Astrology Calculator collects, uses, and protects your data. We value your privacy and keep this policy simple and transparent.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/privacy' },
  openGraph: {
    title: 'Privacy Policy - Mayan Astrology Calculator',
    description: 'Read how Mayan Astrology Calculator collects, uses, and protects your data. We value your privacy and keep this policy simple and transparent.',
    url: 'https://mayanastrologycalculator.com/privacy',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose">
        <div className="mb-6">
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Calculator
          </Link>
        </div>

        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>We do not require account creation. Calculations run in your browser and no birth dates are stored on our servers.</p>
        <h2>Data We Collect</h2>
        <p>Basic analytics (page views, referrers) may be collected to improve the site. We do not sell personal data.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a> or visit our <Link href="/contact">contact page</Link>.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Related Pages</h3>
          <ul className="space-y-2">
            <li><Link href="/terms" className="text-orange-600 hover:text-orange-700">Terms of Service</Link></li>
            <li><Link href="/about" className="text-orange-600 hover:text-orange-700">About Mayan Astrology</Link></li>
            <li><Link href="/guide" className="text-orange-600 hover:text-orange-700">Mayan Astrology Guide</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
