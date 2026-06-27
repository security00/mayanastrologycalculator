import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Mayan Astrology Calculator',
  description: 'The terms for using Mayan Astrology Calculator, including paid report delivery, refund policy, disclaimers, and contact information.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/terms' },
  openGraph: {
    title: 'Terms of Service - Mayan Astrology Calculator',
    description: 'The terms for using Mayan Astrology Calculator, including paid report delivery, refund policy, disclaimers, and contact information.',
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
            Back to Calculator
          </Link>
        </div>

        <h1>Terms of Service</h1>
        <p>Last updated: June 28, 2026</p>

        <p>
          By using Mayan Astrology Calculator, you agree to these terms. If you do not agree, please do
          not use the site or purchase paid reports.
        </p>

        <h2>Free Calculator</h2>
        <p>
          The free calculator converts a Gregorian birth date into a Mayan Tzolk'in reading using the
          site's calculation logic. Results are provided for personal reflection, education, and
          entertainment.
        </p>

        <h2>Paid PDF Reports</h2>
        <p>
          We may offer optional paid early access PDF reports. A paid report is a one-time purchase, not a
          subscription. After payment, we prepare the report manually and send it to the email address used
          during Stripe checkout.
        </p>
        <p>
          Standard delivery time is 24-48 hours after successful payment. Delivery time may be longer if
          payment details are incomplete, if we need to verify an order, or if support follow-up is needed.
        </p>

        <h2>Refund Policy</h2>
        <p>
          If we cannot deliver your paid report, we will refund your payment. If you paid by mistake or
          entered incorrect information, contact us within 7 days of purchase and we will review the
          request.
        </p>
        <p>
          Because reports are personalized digital goods, completed and delivered reports are generally
          non-refundable unless there is a clear fulfillment error, duplicate charge, technical issue, or
          other problem we determine in good faith should be corrected.
        </p>
        <p>
          To request support or a refund review, email
          {' '}<a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a>
          {' '}with your Stripe checkout email and order details.
        </p>

        <h2>Disclaimers</h2>
        <p>
          The calculator and reports are provided for reflection, self-discovery, education, and
          entertainment. They are not medical, psychological, legal, financial, or professional advice. Do
          not use the site as a substitute for qualified professional guidance.
        </p>
        <p>
          We do not guarantee that any reading will be accurate, predictive, complete, or suitable for any
          particular decision. Interpretations are symbolic and reflective, not deterministic claims.
        </p>

        <h2>Cultural and Methodology Note</h2>
        <p>
          The Tzolk'in is a sacred Mayan calendar tradition with deep cultural origins. Our site uses
          modern English-language terms such as "Mayan astrology," "Nawal," "day sign," and "Galactic
          Tone" for educational and reflective purposes. We do not claim official spiritual authority or
          represent a traditional lineage.
        </p>

        <h2>Payments and Third Parties</h2>
        <p>
          Payments are processed by Stripe. Your use of Stripe checkout may be subject to Stripe's own
          terms and privacy policy. We are not responsible for outages, delays, or errors caused by third
          party providers.
        </p>

        <h2>Acceptable Use</h2>
        <p>
          You agree not to misuse the site, interfere with its operation, attempt unauthorized access,
          submit fraudulent payments, scrape at excessive volume, or use the content in a way that violates
          applicable laws or the rights of others.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes are posted
          means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Email <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a>
          {' '}or visit our <Link href="/contact">contact page</Link> for questions.
        </p>

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
