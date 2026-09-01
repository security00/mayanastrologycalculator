'use client';

import { useEffect, useRef, useState } from 'react';
import { REPORT_PRODUCT, reportDeliveryCopy } from '../lib/report-product';
import { getReportOfferMetadata, type ReportOfferVariant } from '../lib/report-experiment';
import GoogleEmailSignIn from './GoogleEmailSignIn';

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
};

type ReportUpgradeCardProps = {
  signature: string;
  nawal: string;
  galacticTone: number;
  checkoutLoading: boolean;
  checkoutError: string;
  offerVariant: ReportOfferVariant;
  onCheckout: (emailDeliveryConsent: boolean) => void;
};

const legacyReportSections = [
  '11-page personalized PDF for your exact birth date',
  'Nawal, Galactic Tone, and their integrated pattern',
  'Relationships, communication, work, and purpose',
  'Stress signals and a signature-based decision filter',
  'Reflection prompts and a seven-day practice',
  'Methodology and cultural-scope note',
];

const transparentReportSections = [
  '11-page personalized PDF for your exact birth date',
  'Nawal and Tzolk’in number, with the modern Dreamspell name clearly labeled',
  'Relationships, communication, work, and purpose',
  'Stress signals and a signature-based decision filter',
  'Reflection prompts and a seven-day practice',
  'Transparent calculation method, sources, and cultural-scope note',
];

export default function ReportUpgradeCard({
  signature,
  nawal,
  galacticTone,
  checkoutLoading,
  checkoutError,
  offerVariant,
  onCheckout,
}: ReportUpgradeCardProps) {
  const offerRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const [emailDeliveryConsent, setEmailDeliveryConsent] = useState(false);
  const offerMetadata = getReportOfferMetadata(offerVariant);
  const isTransparentOffer = offerVariant === 'transparent_v3';
  const reportSections = isTransparentOffer ? transparentReportSections : legacyReportSections;

  useEffect(() => {
    const section = offerRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTrackedView.current) return;

        hasTrackedView.current = true;
        const analyticsWindow = window as AnalyticsWindow;
        analyticsWindow.gtag?.('event', 'paid_report_offer_view', {
          report_type: REPORT_PRODUCT.code,
          nawal,
          galactic_tone: galacticTone,
          price_usd: REPORT_PRODUCT.priceUsd,
          offer_version: offerMetadata.offerVersion,
          experiment_name: 'report_transparency_v1',
          experiment_variant: offerVariant,
          report_version: offerMetadata.reportVersion,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [galacticTone, nawal, offerMetadata.offerVersion, offerMetadata.reportVersion, offerVariant]);

  const trackSampleClick = () => {
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', 'sample_report_click', {
      report_type: REPORT_PRODUCT.code,
      nawal,
      galactic_tone: galacticTone,
      price_usd: REPORT_PRODUCT.priceUsd,
      offer_version: offerMetadata.offerVersion,
      experiment_name: 'report_transparency_v1',
      experiment_variant: offerVariant,
      report_version: offerMetadata.reportVersion,
    });
  };

  return (
    <section
      ref={offerRef}
      aria-labelledby="full-report-title"
      className="panel panel-glow overflow-hidden rounded-3xl mb-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative p-7 md:p-10 text-white bg-[linear-gradient(150deg,#7c2d12_0%,#9a3412_38%,#7f1d1d_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_16rem_at_20%_0%,rgb(238_200_136/18%),transparent_60%)]" />
          <div className="relative">
            <p className="eyebrow mb-4 !text-[#f6dc9f]">
              {`Founding reader price · $${REPORT_PRODUCT.priceUsd}`}
            </p>
            <h2 id="full-report-title" className="font-display text-3xl md:text-4xl mb-4 text-[#fff7e6]">
              Go deeper than your free {signature} result
            </h2>
            <p className="text-orange-50/90 text-lg leading-relaxed mb-7">
              {isTransparentOffer
                ? 'Keep the free result. Add a private 11-page guide that turns your Nawal and Tzolk’in number into relationship, work, decision, and seven-day reflection practices—with the modern interpretive layer clearly labeled.'
                : 'Keep the free result. Add a private 11-page guide that turns your Nawal and Tone into relationship, work, decision, and seven-day reflection practices.'}
            </p>
            <GoogleEmailSignIn />
            <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-white/25 bg-black/20 p-3.5 text-sm text-orange-50">
              <input
                type="checkbox"
                checked={emailDeliveryConsent}
                onChange={(event) => setEmailDeliveryConsent(event.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-amber-500"
                required
              />
              <span>
                I agree to receive my personalized PDF and essential order and delivery emails at the
                email address confirmed in Stripe. See the{' '}
                <a href="/privacy" className="font-semibold text-white underline underline-offset-2">Privacy Policy</a>
                {' '}and{' '}
                <a href="/terms" className="font-semibold text-white underline underline-offset-2">Terms</a>.
                <span className="mt-1 block text-xs text-orange-100/80">Required to continue. No marketing emails.</span>
              </span>
            </label>
            <button
              type="button"
              onClick={() => onCheckout(emailDeliveryConsent)}
              disabled={checkoutLoading || !emailDeliveryConsent}
              aria-describedby={!emailDeliveryConsent ? 'checkout-consent-help' : undefined}
              className="w-full sm:w-auto rounded-xl bg-[linear-gradient(120deg,#f6dc9f,#d4a24e)] px-7 py-3.5 font-bold text-[#2a1a05] shadow-[0_14px_36px_-10px_rgb(212_162_78/60%)] transition-all hover:brightness-110 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading ? 'Opening secure checkout…' : `Get my 11-page report — $${REPORT_PRODUCT.priceUsd}`}
            </button>
            {!emailDeliveryConsent && (
              <span id="checkout-consent-help" className="mt-2 block text-xs text-orange-100/80 sm:inline sm:ml-3">
                Check the delivery consent box to continue.
              </span>
            )}
            <a
              href={isTransparentOffer
                ? '/samples/personal-mayan-signature-report-sample-transparent-v3.pdf'
                : '/samples/personal-mayan-signature-report-sample.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackSampleClick}
              className="ml-0 mt-4 inline-block font-semibold text-[#f6dc9f] underline decoration-[#d4a24e]/60 underline-offset-4 hover:text-white sm:ml-5 sm:mt-0"
            >
              View the complete sample PDF ↗
            </a>
            <p className="mt-4 text-sm text-orange-100/80">
              One-time payment · {reportDeliveryCopy} · 7-day delivery guarantee
            </p>
          </div>
        </div>

        <div className="p-7 md:p-10">
          <p className="eyebrow mb-5">What you receive</p>
          <ul className="space-y-3.5 text-[var(--parchment-dim)]">
            {reportSections.map((section) => (
              <li key={section} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-gold-bright">✦</span>
                <span>{section}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[var(--gold-line)]">
        <div className="p-6 md:p-8">
          <h3 className="font-display text-lg text-[var(--parchment)] mb-3">Included in your free result</h3>
          <ul className="space-y-2 text-sm text-[var(--parchment-dim)]">
            <li>
              {isTransparentOffer
                ? '• Nawal day sign and Tzolk’in number, plus its modern Dreamspell name'
                : '• Nawal day sign and Galactic Tone'}
            </li>
            <li>• Core meaning, characteristics, element, and direction</li>
            <li>• A concise combined interpretation</li>
          </ul>
        </div>
        <div className="p-6 md:p-8 bg-[rgb(212_162_78/6%)] border-t md:border-t-0 md:border-l border-[var(--gold-line)]">
          <h3 className="font-display text-lg text-gold-bright mb-3">Added in your personalized PDF</h3>
          <ul className="space-y-2 text-sm text-[var(--parchment-dim)]">
            <li>• 11 designed pages written for {signature}</li>
            <li>• Relationship, work, stress, and decision sections</li>
            <li>• Questions and a seven-day integration practice</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--gold-line)] p-6 md:px-8">
        <div className="grid grid-cols-1 gap-3 text-sm text-[var(--parchment-dim)] sm:grid-cols-3">
          <p><strong className="text-[var(--parchment)]">Secure:</strong> Stripe processes the payment.</p>
          <p><strong className="text-[var(--parchment)]">Private:</strong> Your PDF is delivered to your checkout email.</p>
          <p><strong className="text-[var(--parchment)]">Protected:</strong> Unusable or undelivered reports are covered for 7 days.</p>
        </div>
        <p className="mt-4 text-xs text-[var(--parchment-faint)]">
          The report is a reflective interpretation, not scientific, medical, legal, financial, or psychological advice.{' '}
          <a href="/methodology" className="link-gold">
            See calculation methodology and cultural scope.
          </a>
        </p>

        {checkoutError && (
          <div role="alert" className="mt-5 rounded-lg border border-red-500/40 bg-red-950/50 p-4">
            <p className="text-sm font-semibold text-red-300 mb-1">Checkout is not available right now.</p>
            <p className="text-sm text-red-300/80">{checkoutError}</p>
          </div>
        )}
      </div>
    </section>
  );
}
