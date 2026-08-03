import type { Metadata } from 'next';
import Link from 'next/link';
import ReportOrderStatus from './ReportOrderStatus';

export const metadata: Metadata = {
  title: 'Download Your Mayan Report - Mayan Astrology Calculator',
  description: 'Your payment is confirmed. Download your personalized Mayan report here and receive a backup link by email.',
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
            Your Personal Mayan Signature Report is confirmed
          </h1>
          <p className="text-gray-700 mb-4">
            Thank you for ordering. Your 11-page PDF includes your Nawal, Galactic Tone, integrated
            signature, relationship and work themes, a decision filter, and a seven-day practice.
          </p>
          <ReportOrderStatus />
          <div className="rounded-lg border border-orange-200 bg-white p-5 mb-6">
            <h2 className="font-bold text-gray-950 mb-2">Need help?</h2>
            <p className="text-gray-700 mb-3">
              If you made a typo, used the wrong email, or have a question about your order, contact us
              and include your Stripe checkout email. Unusable or undelivered reports are covered by our
              7-day replacement-or-refund promise.
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
