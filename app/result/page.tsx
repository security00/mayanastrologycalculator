'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MayanReading, getDetailedInterpretation } from '../lib/mayan-calculator';

interface StoredReading {
  reading: MayanReading;
  birthDate: { day: number; month: number; year: number };
}

export default function ResultPage() {
  const [storedData, setStoredData] = useState<StoredReading | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem('mayanReading');
    if (data) {
      setStoredData(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading your reading...</p>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/ref-page/logo.png"
                alt="Mayan Astrology Calculator Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-xl font-bold text-amber-100">Mayan Astrology Calculator</p>
                <p className="text-sm text-amber-200">Your Personal Reading</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-amber-100 hover:text-white transition-colors">Home</Link>
              <Link href="/guide" className="text-amber-100 hover:text-white transition-colors">Guide</Link>
              <Link href="/about" className="text-amber-100 hover:text-white transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

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

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-xl mb-6 opacity-90">
            This is just 10% of your complete profile. Discover deeper insights about your relationships, career path, and spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guide"
              className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Complete Mayan Guide
            </Link>
            <span
              className="bg-orange-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-800 transition-colors border-2 border-white"
            >
              Check Compatibility
            </span>
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
              <span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Today's Energy → </span>

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mayan Astrology Calculator</h3>
              <p className="text-gray-400">
                Discover the ancient wisdom of Mayan astrology through our accurate Tzolk'in calculator and comprehensive interpretations.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guide" className="hover:text-white">Mayan Astrology Guide</Link></li>
                <li><Link href="/day-signs" className="hover:text-white">20 Day Signs</Link></li>
                <li><Link href="/galactic-tones" className="hover:text-white">13 Galactic Tones</Link></li>
                <li><Link href="/about" className="hover:text-white">About Mayan Calendar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mayan Astrology Calculator. All rights reserved. | Discover your ancient wisdom through authentic readings.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}









