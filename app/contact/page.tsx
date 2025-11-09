import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - Mayan Astrology Calculator',
  description: 'Contact the Mayan Astrology Calculator team. For support or feedback, email support@mayanastrologycalculator.com and we will respond promptly.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/contact' },
  openGraph: {
    title: 'Contact Us - Mayan Astrology Calculator',
    description: 'Contact the Mayan Astrology Calculator team. For support or feedback, email support@mayanastrologycalculator.com and we will respond promptly.',
    url: 'https://mayanastrologycalculator.com/contact',
    siteName: 'Mayan Astrology Calculator',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose">
        <div className="mb-6">
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Calculator
          </Link>
        </div>

        <h1>Contact Us</h1>
        <p>We'd love to hear from you. For support, questions, or feedback, email us at:</p>
        <p><a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a></p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Explore More</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-orange-600 hover:text-orange-700">Calculate Your Mayan Astrology</Link></li>
            <li><Link href="/guide" className="text-orange-600 hover:text-orange-700">Complete Mayan Astrology Guide</Link></li>
            <li><Link href="/about" className="text-orange-600 hover:text-orange-700">About Mayan Calendar</Link></li>
            <li><Link href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-orange-600 hover:text-orange-700">Terms of Service</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
