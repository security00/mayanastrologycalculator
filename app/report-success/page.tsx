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
    <div className="page-shell">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="panel panel-glow rounded-3xl p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-bright mb-3">
            Payment received
          </p>
          <h1 className="text-3xl md:text-4xl font-display text-[var(--parchment)] mb-4">
            Your Personal Mayan Signature Report is confirmed
          </h1>
          <p className="text-[var(--parchment-dim)] mb-4">
            Thank you for ordering. Your 11-page PDF includes your Nawal, Galactic Tone, integrated
            signature, relationship and work themes, a decision filter, and a seven-day practice.
          </p>
          <ReportOrderStatus />
          <div className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-5 mb-6">
            <h2 className="font-display text-[var(--parchment)] mb-2">Need help?</h2>
            <p className="text-[var(--parchment-dim)] mb-3">
              If you made a typo, used the wrong email, or have a question about your order, contact us
              and include your Stripe checkout email. Unusable or undelivered reports are covered by our
              7-day replacement-or-refund promise.
            </p>
            <a
              href="mailto:support@mayanastrologycalculator.com?subject=Full%20Mayan%20birth%20chart%20report%20order"
              className="link-gold font-semibold"
            >
              Contact support
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="btn-ember text-center py-3 px-6"
            >
              Back to calculator
            </Link>
            <Link
              href="/today"
              className="btn-ghost-gold text-center py-3 px-6"
            >
              View today's Mayan date
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
