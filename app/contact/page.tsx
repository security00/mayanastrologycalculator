import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '../components/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us - Mayan Astrology Calculator',
  description: 'Contact the Mayan Astrology Calculator team. For support or feedback, email support@mayanastrologycalculator.com and we will respond promptly.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/contact' },
  openGraph: {
    title: 'Contact Us - Mayan Astrology Calculator',
    description: 'Contact the Mayan Astrology Calculator team. For support or feedback, email support@mayanastrologycalculator.com and we will respond promptly.',
    url: 'https://mayanastrologycalculator.com/contact',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'Contact Mayan Astrology Calculator',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 content-prose">
        <div className="mb-6">
          <Link href="/" className="link-gold">
            ← Back to Calculator
          </Link>
        </div>

        <PageHero eyebrow="Contact" title="Contact Us" glyphs={['wind', 'star', 'water']}>
          We'd love to hear from you. For support, questions, or feedback, email us at{' '}
          <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a>
        </PageHero>

        <div className="mt-8 pt-6 border-t border-[var(--gold-line)]">
          <h3 className="text-lg font-display mb-3">Explore More</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="link-gold">Calculate Your Mayan Astrology</Link></li>
            <li><Link href="/guide" className="link-gold">Complete Mayan Astrology Guide</Link></li>
            <li><Link href="/about" className="link-gold">About Mayan Calendar</Link></li>
            <li><Link href="/privacy" className="link-gold">Privacy Policy</Link></li>
            <li><Link href="/terms" className="link-gold">Terms of Service</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
