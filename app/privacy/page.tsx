import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mayan Astrology Calculator',
  description: 'Read how Mayan Astrology Calculator collects, uses, and protects your data for free calculations, paid reports, analytics, and support.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/privacy' },
  openGraph: {
    title: 'Privacy Policy - Mayan Astrology Calculator',
    description: 'Read how Mayan Astrology Calculator collects, uses, and protects your data for free calculations, paid reports, analytics, and support.',
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
            Back to Calculator
          </Link>
        </div>

        <h1>Privacy Policy</h1>
        <p>Last updated: June 28, 2026</p>

        <p>
          Mayan Astrology Calculator provides free Mayan Tzolk'in calculations and optional paid PDF
          reports. This policy explains what information we collect, how we use it, and how to contact us.
        </p>

        <h2>Information We Collect</h2>
        <p>For free calculations, your birth date is processed in your browser to generate a result.</p>
        <p>
          If you order a paid report, we store the information needed to prepare and deliver that report,
          including your birth date, Mayan signature, Nawal day sign, Galactic Tone, Stripe checkout
          session ID, payment status, delivery status, and the email address provided during Stripe
          checkout.
        </p>
        <p>
          If you contact us by email, we collect the information you choose to send, such as your email
          address, birth chart result, support request, or feedback.
        </p>

        <h2>Payments</h2>
        <p>
          Payments are processed by Stripe. We do not store your full credit card number or card security
          code. Stripe may collect and process payment information according to its own privacy policy and
          security practices.
        </p>

        <h2>Analytics and Advertising</h2>
        <p>
          We may use analytics tools such as Google Analytics, Microsoft Clarity, Ahrefs Analytics, and
          Google Search Console to understand site usage, improve the calculator, and monitor performance.
          These tools may collect device, browser, referrer, page view, and interaction data.
        </p>
        <p>
          We may use Google AdSense or similar advertising services. Advertising providers may use cookies
          or similar technologies to deliver and measure ads.
        </p>

        <h2>How We Use Information</h2>
        <ul>
          <li>To calculate and display your Mayan astrology result.</li>
          <li>To create and deliver paid PDF reports.</li>
          <li>To confirm payment status and prevent fraud or duplicate fulfillment.</li>
          <li>To respond to support requests and feedback.</li>
          <li>To improve site content, usability, and performance.</li>
        </ul>

        <h2>Data Sharing</h2>
        <p>
          We do not sell your personal information. We share limited information with service providers
          only as needed to operate the site, process payments, deliver reports, measure analytics, provide
          advertising, or respond to support requests.
        </p>

        <h2>Data Retention</h2>
        <p>
          Paid report order records may be retained for payment, delivery, accounting, support, and fraud
          prevention purposes. You may contact us to request deletion of your personal report data, subject
          to reasonable legal, tax, payment, security, or operational retention needs.
        </p>

        <h2>Your Choices</h2>
        <p>
          You can choose not to purchase a paid report. You can block cookies or analytics scripts through
          your browser settings or privacy tools. You can contact us to request access, correction, or
          deletion of personal information associated with your report order.
        </p>

        <h2>Children</h2>
        <p>
          This site is not intended for children under 13. We do not knowingly collect personal information
          from children under 13.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a>
          {' '}or visit our <Link href="/contact">contact page</Link>.
        </p>

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
