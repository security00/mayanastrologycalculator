'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MayanReading, calculateTzolkinDate, getDetailedInterpretation, validateDate } from '../lib/mayan-calculator';
import ReportUpgradeCard from '../components/ReportUpgradeCard';
import MayanNumeral from '../components/decor/MayanNumeral';
import GrecaBand from '../components/decor/GrecaBand';
import { REPORT_ANALYTICS_ITEM, REPORT_PRODUCT } from '../lib/report-product';
import {
  getOrAssignReportOfferVariant,
  getReportOfferMetadata,
  type ReportOfferVariant,
} from '../lib/report-experiment';

interface StoredReading {
  reading: MayanReading;
  birthDate: { day: number; month: number; year: number };
}

const NAWAL_COLOR_DOTS: Record<string, string> = {
  red: 'bg-red-400',
  white: 'bg-stone-100',
  blue: 'bg-sky-400',
  yellow: 'bg-yellow-400',
};

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
};

export default function ResultPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [offerVariant, setOfferVariant] = useState<ReportOfferVariant | null>(null);
  const [storedData] = useState<StoredReading | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const day = Number(searchParams.get('day'));
    const month = Number(searchParams.get('month'));
    const year = Number(searchParams.get('year'));

    if (validateDate(day, month, year)) {
      const reading = calculateTzolkinDate(new Date(year, month - 1, day));
      const nextData = { reading, birthDate: { day, month, year } };
      sessionStorage.setItem('mayanReading', JSON.stringify(nextData));
      return nextData;
    }

    const data = sessionStorage.getItem('mayanReading');
    return data ? JSON.parse(data) : null;
  });

  // Add noindex meta tag dynamically
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  useEffect(() => {
    setOfferVariant(getOrAssignReportOfferVariant());
  }, []);

  useEffect(() => {
    if (!storedData) return;

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', 'mayan_result_view', {
      nawal: storedData.reading.nawal.name,
      galactic_tone: storedData.reading.galacticTone.number,
    });
  }, [storedData]);

  const handleShare = (platform: string) => {
    if (!storedData) return;

    const { reading } = storedData;
    const shareText = `I just discovered my Mayan astrology! I'm ${reading.galacticTone.number} ${reading.nawal.name} - ${reading.nawal.meaning}. Calculate yours at`;
    const shareUrl = 'https://mayanastrologycalculator.com';

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const handlePaidReportClick = async (emailDeliveryConsent: boolean) => {
    if (!storedData || !offerVariant) return;

    const offerMetadata = getReportOfferMetadata(offerVariant);

    setCheckoutLoading(true);
    setCheckoutError('');

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', 'paid_report_checkout_click', {
      report_type: REPORT_PRODUCT.code,
      nawal: storedData.reading.nawal.name,
      galactic_tone: storedData.reading.galacticTone.number,
      price_usd: REPORT_PRODUCT.priceUsd,
      offer_version: offerMetadata.offerVersion,
      experiment_name: 'report_transparency_v1',
      experiment_variant: offerVariant,
      report_version: offerMetadata.reportVersion,
    });

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: storedData.birthDate,
            emailDeliveryConsent,
            offerVariant,
          }),
      });

      const data = await response.json() as { orderId?: string; url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout.');
      }

      analyticsWindow.gtag?.('event', 'begin_checkout', {
        currency: 'USD',
        value: REPORT_PRODUCT.priceUsd,
        items: [REPORT_ANALYTICS_ITEM],
        report_type: REPORT_PRODUCT.code,
        offer_version: offerMetadata.offerVersion,
        experiment_name: 'report_transparency_v1',
        experiment_variant: offerVariant,
        report_version: offerMetadata.reportVersion,
      });

      analyticsWindow.gtag?.('event', 'checkout_session_created', {
        order_id: data.orderId || 'unknown',
        report_type: REPORT_PRODUCT.code,
        offer_version: offerMetadata.offerVersion,
        experiment_name: 'report_transparency_v1',
        experiment_variant: offerVariant,
        report_version: offerMetadata.reportVersion,
      });

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout.');
      setCheckoutLoading(false);
    }
  };

  if (!storedData) {
    return (
      <div className="page-shell flex items-center justify-center">
        <div className="panel text-center max-w-md mx-auto p-10 rounded-2xl">
          <h2 className="font-display text-3xl text-[var(--parchment)] mb-4">No Reading Found</h2>
          <p className="text-[var(--parchment-dim)] mb-8">
            It looks like you haven't calculated your reading yet. Please go back to the calculator to get your reading.
          </p>
          <Link href="/" className="btn-ember py-3 px-7">
            Calculate My Mayan Astrology
          </Link>
        </div>
      </div>
    );
  }

  const { reading, birthDate } = storedData;
  const interpretation = getDetailedInterpretation(reading);

  return (
    <div className="page-shell">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Birth Date Display */}
        <div className="text-center mb-10">
          <p className="eyebrow mb-5 justify-center">✦&nbsp;&nbsp;Your Tzolk&apos;in signature&nbsp;&nbsp;✦</p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--parchment)] mb-4">
            Your Mayan Astrology Reading
          </h1>
          <p className="text-[var(--parchment-dim)] tracking-wide">
            Born on {birthDate.day}/{birthDate.month}/{birthDate.year}
          </p>
        </div>

        {/* Main Result Card */}
        <div className="panel panel-glow panel-ornate rounded-3xl p-8 md:p-12 mb-14">
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 border border-[var(--gold-line-strong)] bg-[radial-gradient(circle_at_35%_30%,rgb(238_200_136/22%),rgb(212_162_78/8%)_60%,transparent)] shadow-[0_0_50px_-8px_rgb(212_162_78/45%)]">
              <span className="font-display text-5xl text-gold-bright">{reading.galacticTone.number}</span>
              <MayanNumeral value={reading.galacticTone.number} className="absolute -bottom-5" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl gold-gradient-text mb-3 mt-4">
              {reading.galacticTone.number} {reading.nawal.name}
            </h2>
            <p className="text-lg text-[var(--parchment-dim)] mb-5">
              {reading.nawal.spanish} • {reading.nawal.mayan}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
              <span className="chip">
                <span className={`w-2.5 h-2.5 rounded-full mr-2 ${NAWAL_COLOR_DOTS[reading.nawal.color.toLowerCase()] ?? 'bg-stone-100'}`}></span>
                {reading.nawal.color}
              </span>
              <span className="chip">{reading.nawal.element}</span>
              <span className="chip chip-jade">{reading.nawal.direction}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Galactic Tone */}
            <div className="rounded-2xl border border-[rgb(79_209_165/22%)] bg-[linear-gradient(160deg,rgb(79_209_165/8%),rgb(79_209_165/2%))] p-7">
              <h3 className="font-display text-2xl text-jade mb-4">
                {offerVariant === 'transparent_v3'
                  ? `Tzolk’in Number ${reading.galacticTone.number}`
                  : `Galactic Tone ${reading.galacticTone.number}: ${reading.galacticTone.name}`}
              </h3>
              {offerVariant === 'transparent_v3' && (
                <p className="mb-3 text-sm font-semibold text-jade">
                  Modern Dreamspell name: {reading.galacticTone.name}
                </p>
              )}
              <p className="text-[var(--parchment-dim)] leading-relaxed mb-5">{reading.galacticTone.meaning}</p>
              <div className="flex flex-wrap gap-2">
                {reading.galacticTone.keywords.map((keyword, index) => (
                  <span key={index} className="chip chip-jade">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Nawal (Day Sign) */}
            <div className="rounded-2xl border border-[var(--gold-line)] bg-[linear-gradient(160deg,rgb(212_162_78/10%),rgb(212_162_78/2%))] p-7">
              <h3 className="font-display text-2xl text-gold-bright mb-4">
                Nawal: {reading.nawal.name}
              </h3>
              <p className="text-[var(--parchment-dim)] leading-relaxed mb-5">{reading.nawal.meaning}</p>
              <h4 className="font-semibold text-[var(--parchment)] mb-3 text-sm uppercase tracking-[0.16em]">Key Characteristics</h4>
              <ul className="space-y-2">
                {reading.nawal.characteristics.map((characteristic, index) => (
                  <li key={index} className="text-[var(--parchment-dim)] text-sm flex items-start">
                    <span className="text-gold mr-2">✦</span>
                    {characteristic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {offerVariant ? (
          <ReportUpgradeCard
            signature={`${reading.galacticTone.number} ${reading.nawal.name}`}
            nawal={reading.nawal.name}
            galacticTone={reading.galacticTone.number}
            checkoutLoading={checkoutLoading}
            checkoutError={checkoutError}
            offerVariant={offerVariant}
            onCheckout={handlePaidReportClick}
          />
        ) : (
          <div className="mb-12 min-h-80 animate-pulse rounded-3xl border border-[var(--gold-line)] bg-[var(--surface)]" aria-hidden="true" />
        )}

        {/* Detailed Interpretation */}
        <div className="panel glyph-watermark rounded-3xl p-8 md:p-10 mb-14">
          <GrecaBand className="mb-10" />
          <h2 className="font-display text-3xl md:text-4xl text-center text-[var(--parchment)] mb-8">Your Complete Profile</h2>
          <div className="max-w-3xl mx-auto text-[var(--parchment-dim)]">
            {interpretation.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-5 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="panel rounded-3xl p-8 md:p-10 mb-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-[var(--parchment)] mb-3">Share Your Reading</h2>
          <p className="text-[var(--parchment-dim)] mb-8">
            Share your unique reading with friends and family
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleShare('facebook')}
              className="bg-[#1877f2]/90 hover:bg-[#1877f2] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="bg-[#0ea5e9]/90 hover:bg-[#0ea5e9] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="bg-[#16a34a]/90 hover:bg-[#16a34a] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>

        {/* Related Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
            <h3 className="font-display text-lg text-[var(--parchment)] mb-3">Calculate Another Date</h3>
            <p className="text-sm text-[var(--parchment-dim)] mb-4">Calculate readings for family members, friends, or partners.</p>
            <Link href="/" className="link-gold text-sm">
              New Calculation →
            </Link>
          </div>
          <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
            <h3 className="font-display text-lg text-[var(--parchment)] mb-3">Understand Your Birth Chart</h3>
            <p className="text-sm text-[var(--parchment-dim)] mb-4">Learn how your Nawal and Galactic Tone form a Tzolk'in birth chart.</p>
            <Link href="/birth-chart" className="link-gold text-sm">
              Read the Birth Chart Guide →
            </Link>
          </div>
          <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
            <h3 className="font-display text-lg text-[var(--parchment)] mb-3">Compare Two Signs</h3>
            <p className="text-sm text-[var(--parchment-dim)] mb-4">Compare your Mayan sign with a partner, friend, or family member.</p>
            <Link href="/compatibility" className="link-gold text-sm">
              Check Compatibility →
            </Link>
          </div>
          <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
            <h3 className="font-display text-lg text-[var(--parchment)] mb-3">Daily Mayan Energy</h3>
            <p className="text-sm text-[var(--parchment-dim)] mb-4">See what the current Mayan calendar day means for your personal energy.</p>
            <Link href="/today" className="link-gold text-sm">
              Today's Energy →
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}









