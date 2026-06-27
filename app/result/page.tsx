'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MayanReading, calculateTzolkinDate, getDetailedInterpretation, validateDate } from '../lib/mayan-calculator';

interface StoredReading {
  reading: MayanReading;
  birthDate: { day: number; month: number; year: number };
}

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
};

export default function ResultPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
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

  const handlePaidReportClick = async () => {
    if (!storedData) return;

    setCheckoutLoading(true);
    setCheckoutError('');

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', 'paid_report_checkout_click', {
      report_type: 'birth_chart',
      nawal: storedData.reading.nawal.name,
      galactic_tone: storedData.reading.galacticTone.number,
      price_usd: 7,
    });

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate: storedData.birthDate,
          reading: {
            signature: `${storedData.reading.galacticTone.number} ${storedData.reading.nawal.name}`,
            nawal: storedData.reading.nawal.name,
            galacticTone: storedData.reading.galacticTone.number,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout.');
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout.');
      setCheckoutLoading(false);
    }
  };

  if (!storedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Reading Found</h2>
          <p className="text-gray-700 mb-6">
            It looks like you haven't calculated your reading yet. Please go back to the calculator to get your reading.
          </p>
          <Link
            href="/"
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
          >
            Calculate My Mayan Astrology
          </Link>
        </div>
      </div>
    );
  }

  const { reading, birthDate } = storedData;
  const interpretation = getDetailedInterpretation(reading);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Birth Date Display */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Mayan Astrology Reading
          </h1>
          <p className="text-lg text-gray-600">
            Born on {birthDate.day}/{birthDate.month}/{birthDate.year}
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border-4 border-amber-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-6">
              <span className="text-3xl font-bold text-white">{reading.galacticTone.number}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {reading.galacticTone.number} {reading.nawal.name}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              {reading.nawal.spanish} • {reading.nawal.mayan}
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 bg-${reading.nawal.color.toLowerCase()}-500`}></div>
                {reading.nawal.color}
              </span>
              <span>{reading.nawal.element}</span>
              <span>{reading.nawal.direction}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Galactic Tone */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Galactic Tone {reading.galacticTone.number}: {reading.galacticTone.name}
              </h3>
              <p className="text-gray-700 mb-4">{reading.galacticTone.meaning}</p>
              <div className="flex flex-wrap gap-2">
                {reading.galacticTone.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Nawal (Day Sign) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nawal: {reading.nawal.name}
              </h3>
              <p className="text-gray-700 mb-4">{reading.nawal.meaning}</p>
              <h4 className="font-semibold text-gray-900 mb-2">Key Characteristics:</h4>
              <ul className="space-y-1">
                {reading.nawal.characteristics.map((characteristic, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    {characteristic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Interpretation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Complete Profile</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {interpretation.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Share Your Reading</h2>
          <p className="text-center text-gray-600 mb-6">
            Share your unique reading with friends and family
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>

        {/* Paid Report Early Access */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-100 mb-3">
                Early access report
              </p>
              <h2 className="text-3xl font-bold mb-4">Get your full personalized Mayan birth chart</h2>
              <p className="text-lg mb-5 opacity-90">
                Order an early access PDF report with relationship style, strengths, challenges, career
                themes, reflection prompts, and a methodology note based on your {reading.galacticTone.number} {reading.nawal.name} profile.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-orange-50">
                <li>- $7 early access price</li>
                <li>- Full Nawal and tone synthesis</li>
                <li>- Relationship and life-path themes</li>
                <li>- PDF delivered by email</li>
              </ul>
            </div>
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-3">Full report early access</h3>
              <p className="text-gray-700 mb-5">
                This is a manual early access product. After payment, we prepare your PDF and deliver it by email.
              </p>
              <button
                onClick={handlePaidReportClick}
                disabled={checkoutLoading}
                className="w-full bg-gray-950 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? 'Opening secure checkout...' : 'Order my full report - $7'}
              </button>
              {checkoutError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Checkout is not available right now.</p>
                  <p className="text-sm text-red-700">{checkoutError}</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3">
                One-time payment. No subscription. Delivered by email within 24-48 hours.
              </p>
              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-gray-700">
                  Your payment is processed securely by Stripe. Your birth date and Mayan signature are
                  used only to prepare this report.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Calculate Another Date</h3>
            <p className="text-gray-600 mb-4">Calculate readings for family members, friends, or partners.</p>
            <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
              New Calculation →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Daily Mayan Energy</h3>
            <p className="text-gray-600 mb-4">See what the current Mayan calendar day means for your personal energy.</p>
              <Link href="/today" className="text-orange-600 hover:text-orange-700 font-medium">
                Today's Energy →
              </Link>

          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Learn About Day Signs</h3>
            <p className="text-gray-600 mb-4">Explore all 20 Mayan day signs and their meanings in detail.</p>
            <Link href="/day-signs" className="text-orange-600 hover:text-orange-700 font-medium">
              Explore Day Signs →
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}









