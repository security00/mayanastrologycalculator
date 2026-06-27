import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Report Order Received - Mayan Astrology Calculator',
  description: 'Your Mayan birth chart report order has been received. We will prepare your early access PDF report and deliver it by email.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-amber-200 rounded-2xl shadow-xl p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-700 mb-3">
            Payment received
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-950 mb-4">
            Your full Mayan birth chart report is in progress
          </h1>
          <p className="text-gray-700 mb-4">
            Thank you for ordering an early access report. We manually prepare each PDF so the reading can
            include your Nawal, Galactic Tone, relationship themes, work and creativity themes, reflection
            prompts, and a short methodology note.
          </p>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 mb-6">
            <h2 className="font-bold text-gray-950 mb-2">What happens next</h2>
            <ul className="space-y-2 text-gray-700">
              <li>- Your payment and birth chart details have been recorded.</li>
              <li>- We will prepare your PDF report manually.</li>
              <li>- Your report will be sent to your Stripe checkout email within 24-48 hours.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-orange-200 bg-white p-5 mb-6">
            <h2 className="font-bold text-gray-950 mb-2">Need help?</h2>
            <p className="text-gray-700 mb-3">
              If you made a typo, used the wrong email, or have a question about your order, contact us
              and include your Stripe checkout email.
            </p>
            <a
              href="mailto:support@mayanastrologycalculator.com?subject=Full%20Mayan%20birth%20chart%20report%20order"
              className="text-orange-700 hover:text-orange-800 font-semibold"
            >
              Contact support
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="bg-orange-600 text-white text-center font-bold py-3 px-6 rounded-lg hover:bg-orange-700"
            >
              Back to calculator
            </Link>
            <Link
              href="/today"
              className="border border-orange-300 text-orange-700 text-center font-bold py-3 px-6 rounded-lg hover:bg-orange-50"
            >
              View today's Mayan date
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
