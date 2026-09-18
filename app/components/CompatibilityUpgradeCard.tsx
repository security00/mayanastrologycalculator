'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { calculateTzolkinDate } from '../lib/mayan-calculator';
import {
  COMPATIBILITY_ANALYTICS_ITEM,
  COMPATIBILITY_PAID_SECTIONS,
  COMPATIBILITY_PRODUCT,
  compatibilityDeliveryCopy,
} from '../lib/mayan-compatibility';
import GoogleEmailSignIn from './GoogleEmailSignIn';

type BirthDate = {
  day: number;
  month: number;
  year: number;
};

type CompatibilityUpgradeCardProps = {
  signatureA: string;
  signatureB: string;
  context: string;
  personA: BirthDate;
  personB: BirthDate;
};

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
}

const freeSections = [
  'Both Tzolk’in signatures, tones, elements, and directions',
  'A readable score and relationship theme',
  'Rhythm, Nawal chemistry, strengths, and friction',
  'A communication pattern and three reflection prompts',
];

export default function CompatibilityUpgradeCard({
  signatureA,
  signatureB,
  context,
  personA,
  personB,
}: CompatibilityUpgradeCardProps) {
  const offerRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const [emailDeliveryConsent, setEmailDeliveryConsent] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    const section = offerRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTrackedView.current) return;
        hasTrackedView.current = true;
        (window as AnalyticsWindow).gtag?.('event', 'compatibility_upgrade_view', {
          signature_a: signatureA,
          signature_b: signatureB,
          relationship_context: context,
          price_usd: COMPATIBILITY_PRODUCT.priceUsd,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [context, signatureA, signatureB]);

  const track = (eventName: string, extra: Record<string, string | number> = {}) => {
    (window as AnalyticsWindow).gtag?.('event', eventName, {
      signature_a: signatureA,
      signature_b: signatureB,
      relationship_context: context,
      report_type: COMPATIBILITY_PRODUCT.code,
      price_usd: COMPATIBILITY_PRODUCT.priceUsd,
      ...extra,
    });
  };

  const resultHref = (date: BirthDate) => `/result?day=${date.day}&month=${date.month}&year=${date.year}`;

  const openPersonalReading = (date: BirthDate, person: 'a' | 'b') => {
    const reading = calculateTzolkinDate(new Date(date.year, date.month - 1, date.day));
    sessionStorage.setItem('mayanReading', JSON.stringify({
      reading,
      birthDate: date,
    }));
    track('compatibility_personal_report_click', { person });
  };

  const handleCheckout = async () => {
    if (!emailDeliveryConsent) {
      setCheckoutError('Please agree to email delivery before continuing.');
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError('');
    track('paid_report_checkout_click');

    try {
      const response = await fetch('/api/create-compatibility-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personA,
          personB,
          context,
          emailDeliveryConsent,
        }),
      });
      const data = await response.json() as { orderId?: string; url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout.');
      }

      (window as AnalyticsWindow).gtag?.('event', 'begin_checkout', {
        currency: 'USD',
        value: COMPATIBILITY_PRODUCT.priceUsd,
        items: [COMPATIBILITY_ANALYTICS_ITEM],
        report_type: COMPATIBILITY_PRODUCT.code,
        relationship_context: context,
      });

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout.');
      setCheckoutLoading(false);
    }
  };

  return (
    <section
      ref={offerRef}
      aria-labelledby="compatibility-report-title"
      className="panel panel-glow overflow-hidden rounded-3xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative p-7 md:p-10 text-white bg-[linear-gradient(150deg,#7c2d12_0%,#9a3412_38%,#7f1d1d_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_16rem_at_20%_0%,rgb(238_200_136/18%),transparent_60%)]" />
          <div className="relative">
            <p className="eyebrow mb-4 !text-[#f6dc9f]">
              {`Founding pair price · $${COMPATIBILITY_PRODUCT.priceUsd}`}
            </p>
            <h2 id="compatibility-report-title" className="font-display text-3xl md:text-4xl mb-4 text-[#fff7e6]">
              Keep this free reading. Go deeper with {signatureA} and {signatureB}.
            </h2>
            <p className="text-orange-50/90 text-lg leading-relaxed mb-7">
              The free result is usable on its own. The pair PDF is the next layer: a private 11-page
              guide that turns this map into repair moves, context-specific scripts, a two-person
              decision filter, and a seven-day practice.
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
                I agree to receive my personalized pair PDF and essential order and delivery emails at the
                email address confirmed in Stripe. See the{' '}
                <a href="/privacy" className="font-semibold text-white underline underline-offset-2">Privacy Policy</a>
                {' '}and{' '}
                <a href="/terms" className="font-semibold text-white underline underline-offset-2">Terms</a>.
                <span className="mt-1 block text-xs text-orange-100/80">Required to continue. No marketing emails.</span>
              </span>
            </label>
            <button
              type="button"
              onClick={() => void handleCheckout()}
              disabled={checkoutLoading || !emailDeliveryConsent}
              aria-describedby={!emailDeliveryConsent ? 'compatibility-checkout-consent-help' : undefined}
              className="w-full sm:w-auto rounded-xl bg-[linear-gradient(120deg,#f6dc9f,#d4a24e)] px-7 py-3.5 font-bold text-[#2a1a05] shadow-[0_14px_36px_-10px_rgb(212_162_78/60%)] transition-all hover:brightness-110 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading ? 'Opening secure checkout…' : `Get the 11-page pair report — $${COMPATIBILITY_PRODUCT.priceUsd}`}
            </button>
            {!emailDeliveryConsent && (
              <span id="compatibility-checkout-consent-help" className="mt-2 block text-xs text-orange-100/80 sm:inline sm:ml-3">
                Check the delivery consent box to continue.
              </span>
            )}
            <a
              href="/samples/mayan-compatibility-report-sample.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('sample_report_click')}
              className="ml-0 mt-4 inline-block font-semibold text-[#f6dc9f] underline decoration-[#d4a24e]/60 underline-offset-4 hover:text-white sm:ml-5 sm:mt-0"
            >
              View the complete sample PDF ↗
            </a>
            <p className="mt-4 text-sm text-orange-100/80">
              One-time payment · {compatibilityDeliveryCopy} · 7-day delivery guarantee
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href={resultHref(personA)}
                onClick={() => openPersonalReading(personA, 'a')}
                className="rounded-xl border border-white/30 bg-black/20 px-5 py-3 text-center text-sm font-semibold text-[#fff7e6] transition-all hover:bg-black/30"
              >
                Open {signatureA}&apos;s personal reading
              </Link>
              <Link
                href={resultHref(personB)}
                onClick={() => openPersonalReading(personB, 'b')}
                className="rounded-xl border border-white/30 bg-black/20 px-5 py-3 text-center text-sm font-semibold text-[#fff7e6] transition-all hover:bg-black/30"
              >
                Open {signatureB}&apos;s personal reading
              </Link>
            </div>
            <p className="mt-3 text-sm text-orange-100/80">
              Those links open each person&apos;s free individual chart, not the pair report.
            </p>
          </div>
        </div>

        <div className="p-7 md:p-10">
          <p className="eyebrow mb-5">What you receive</p>
          <ul className="space-y-3.5 text-[var(--parchment-dim)]">
            {COMPATIBILITY_PAID_SECTIONS.map((section) => (
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
          <h3 className="font-display text-lg text-[var(--parchment)] mb-3">Included in this free reading</h3>
          <ul className="space-y-2 text-sm text-[var(--parchment-dim)]">
            {freeSections.map((section) => (
              <li key={section}>• {section}</li>
            ))}
          </ul>
        </div>
        <div className="p-6 md:p-8 bg-[rgb(212_162_78/6%)] border-t md:border-t-0 md:border-l border-[var(--gold-line)]">
          <h3 className="font-display text-lg text-gold-bright mb-3">Added in the pair PDF</h3>
          <ul className="space-y-2 text-sm text-[var(--parchment-dim)]">
            <li>• 11 designed pages written for {signatureA} and {signatureB}</li>
            <li>• Context-specific language for the relationship you chose</li>
            <li>• Repair moves, a decision filter, and a seven-day practice</li>
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
          {' '}Preview the full layout on the{' '}
          <a href="/sample-compatibility-report" className="link-gold">
            sample pair report
          </a>.
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
