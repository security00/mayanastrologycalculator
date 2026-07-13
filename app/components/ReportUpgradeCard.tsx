'use client';

import { useEffect, useRef } from 'react';

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
};

type ReportUpgradeCardProps = {
  signature: string;
  nawal: string;
  galacticTone: number;
  checkoutLoading: boolean;
  checkoutError: string;
  onCheckout: () => void;
};

const reportSections = [
  'Your Nawal in depth',
  'Your Galactic Tone in depth',
  'Integrated sign-and-tone reading',
  'Relationships and communication',
  'Work, creativity, and purpose',
  'Reflection prompts and a 7-day practice',
];

export default function ReportUpgradeCard({
  signature,
  nawal,
  galacticTone,
  checkoutLoading,
  checkoutError,
  onCheckout,
}: ReportUpgradeCardProps) {
  const offerRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const section = offerRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTrackedView.current) return;

        hasTrackedView.current = true;
        const analyticsWindow = window as AnalyticsWindow;
        analyticsWindow.gtag?.('event', 'paid_report_offer_view', {
          report_type: 'birth_chart',
          nawal,
          galactic_tone: galacticTone,
          price_usd: 7,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [galacticTone, nawal]);

  const trackSampleClick = () => {
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', 'sample_report_click', {
      report_type: 'birth_chart',
      nawal,
      galactic_tone: galacticTone,
      price_usd: 7,
    });
  };

  return (
    <section
      ref={offerRef}
      aria-labelledby="full-report-title"
      className="overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-xl mb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-gradient-to-br from-orange-700 to-red-700 p-7 md:p-9 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-100 mb-3">
            Founding reader report · $7
          </p>
          <h2 id="full-report-title" className="text-3xl font-bold mb-4">
            Go deeper than your free {signature} result
          </h2>
          <p className="text-orange-50 text-lg mb-6">
            Your free result identifies the pattern. The personalized PDF explores how your Nawal and
            tone may appear together in relationships, work, creativity, recurring challenges, and
            practical reflection.
          </p>
          <button
            type="button"
            onClick={onCheckout}
            disabled={checkoutLoading}
            className="w-full sm:w-auto rounded-xl bg-white px-7 py-3.5 font-bold text-gray-950 shadow-lg transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checkoutLoading ? 'Opening secure checkout…' : 'Order my personalized report — $7'}
          </button>
          <a
            href="/sample-report"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackSampleClick}
            className="ml-0 mt-4 inline-block font-semibold text-white underline decoration-orange-200 underline-offset-4 hover:text-orange-100 sm:ml-5 sm:mt-0"
          >
            Preview an anonymous sample ↗
          </a>
          <p className="mt-3 text-sm text-orange-100">
            One-time payment · Prepared for your birth date · Delivered by email in 24–48 hours
          </p>
        </div>

        <div className="p-7 md:p-9">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-700 mb-3">
            What you receive
          </p>
          <ul className="space-y-3 text-gray-700">
            {reportSections.map((section) => (
              <li key={section} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-orange-600">✓</span>
                <span>{section}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-orange-100">
        <div className="p-6 md:p-8 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-950 mb-3">Included in your free result</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Nawal day sign and Galactic Tone</li>
            <li>• Core meaning, characteristics, element, and direction</li>
            <li>• A concise combined interpretation</li>
          </ul>
        </div>
        <div className="p-6 md:p-8 bg-orange-50">
          <h3 className="text-lg font-bold text-gray-950 mb-3">Added in your personalized PDF</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Longer sign-and-tone synthesis written for {signature}</li>
            <li>• Relationship and work-pattern sections</li>
            <li>• Questions and a seven-day integration practice</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-orange-100 p-6 md:px-8">
        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-3">
          <p><strong className="text-gray-900">Secure:</strong> Stripe processes the payment.</p>
          <p><strong className="text-gray-900">Human-reviewed:</strong> Each early report is prepared manually.</p>
          <p><strong className="text-gray-900">Protected:</strong> If we cannot deliver it, you receive a refund.</p>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          The report is a reflective interpretation, not scientific, medical, legal, financial, or psychological advice.
        </p>

        {checkoutError && (
          <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-800 mb-1">Checkout is not available right now.</p>
            <p className="text-sm text-red-700">{checkoutError}</p>
          </div>
        )}
      </div>
    </section>
  );
}
