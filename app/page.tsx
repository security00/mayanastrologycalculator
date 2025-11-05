'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { calculateTzolkinDate, validateDate } from './lib/mayan-calculator';

export default function Home() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setError('');

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (!validateDate(dayNum, monthNum, yearNum)) {
      setError('Please enter a valid date');
      return;
    }

    setIsCalculating(true);

    // Add a small delay for better UX
    setTimeout(() => {
      const birthDate = new Date(yearNum, monthNum - 1, dayNum);
      const reading = calculateTzolkinDate(birthDate);

      // Store the result in sessionStorage and navigate to results
      sessionStorage.setItem('mayanReading', JSON.stringify({
        reading,
        birthDate: { day: dayNum, month: monthNum, year: yearNum }
      }));

      window.location.href = '/result';
    }, 1000);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

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
                <p className="text-sm text-amber-200">Discover Your Ancient Wisdom</p>
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

      {/* Hero Section with Calculator */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your <span className="text-orange-600">Mayan Tzolk'in Date</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Unlock the ancient wisdom of the 260-day sacred Mayan calendar. Enter your birth date to reveal your Nawal (day sign) and Galactic Tone, discovering the spiritual energies that guide your life path according to Mayan astrology traditions.
          </p>
        </div>

        {/* Calculator Form - Above the Fold */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-16 border-4 border-amber-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mayan Astrology Calculator</h2>
            <p className="text-gray-600">Enter your birth date to calculate your Tzolk'in signature</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              >
                <option value="">Day</option>
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              >
                <option value="">Month</option>
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              >
                <option value="">Year</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleCalculate}
            disabled={!day || !month || !year || isCalculating}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating Your Mayan Sign...
              </span>
            ) : (
              'Calculate My Mayan Astrology'
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Free instant calculation • No registration required
          </p>
        </div>

        {/* Introduction Content */}
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Mayan Astrology Calculator</h2>

          <p className="text-gray-700 mb-6">
            The Mayan astrology calculator is a powerful tool that connects you with the ancient wisdom of the Maya civilization. Unlike Western astrology, which follows a 12-month solar calendar, Mayan astrology is based on the sacred Tzolk'in calendar—a 260-day cycle that combines 20 day signs (called Nawals) with 13 Galactic Tones.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is the Tzolk'in Calendar?</h3>

          <p className="text-gray-700 mb-6">
            The Tzolk'in calendar is the heart of Mayan astrology, representing the sacred count of days used by the ancient Maya for divination and ceremonial purposes. This 260-day calendar was considered the most important calendar system, as it aligned with the human gestation period and agricultural cycles. Each day in the Tzolk'in has a unique energy signature created by the combination of one of 20 day signs and one of 13 Galactic Tones.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">The 20 Day Signs (Nawals)</h3>

          <p className="text-gray-700 mb-6">
            Your Nawal, or day sign, represents your spiritual essence and core personality traits. Each of the 20 Nawals carries specific energies, elements, and characteristics that influence your life path. From Imix (Crocodile) representing nurturing and creation, to Ahau (Sun) symbolizing enlightenment and leadership, each Nawal offers unique insights into your spiritual nature and life purpose.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">The 13 Galactic Tones</h3>

          <p className="text-gray-700 mb-6">
            The Galactic Tone represents how you express your Nawal's energy in the world. These 13 tones range from Magnetic (unity and purpose) to Cosmic (transcendence and magic), each offering a different approach to manifesting your spiritual gifts. The combination of your Nawal and Galactic Tone creates your complete Mayan astrology profile.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use This Mayan Astrology Calculator</h3>

          <p className="text-gray-700 mb-6">
            Using our Mayan astrology calculator is simple and accurate. Enter your birth date using the dropdown menus above, and our algorithm will instantly calculate your Tzolk'in date using the GMT correlation constant—the most widely accepted method for converting Gregorian dates to the Mayan calendar system. You'll receive a detailed reading that includes your Nawal, Galactic Tone, and comprehensive interpretation of your Mayan astrology profile.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Knowing Your Mayan Astrology</h3>

          <p className="text-gray-700 mb-6">
            Understanding your Mayan astrology can provide profound insights into your personality, relationships, and life purpose. Many people find that their Mayan astrology reading resonates deeply with their inner nature and helps them understand their strengths, challenges, and spiritual path. The ancient Maya believed that knowing your Tzolk'in signature helps you align with natural cycles and make decisions that honor your authentic self.
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-500 p-6 my-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Did You Know?</h4>
            <p className="text-gray-700">
              The Mayan calendar system is so precise that it's more accurate than our current Gregorian calendar. The Maya calculated the solar year as 365.2420 days, while modern astronomy calculates it as 365.2422 days—a difference of only 0.0002 days!
            </p>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore More Astrology Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Daily Mayan Horoscope</h3>
              <p className="text-gray-600 mb-4">Get your daily guidance based on the current Tzolk'in energy and your personal Mayan astrology.</p>
              <span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Read Today's Energy →
              </span>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mayan Compatibility</h3>
              <p className="text-gray-600 mb-4">Discover how your Mayan astrology aligns with friends, family, and romantic partners.</p>
              <span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Check Compatibility →
              </span>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mayan Calendar Today</h3>
              <p className="text-gray-600 mb-4">See what day it is in the Mayan calendar and learn about today's spiritual energy.</p>
              <span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">View Today's Date →
              </span>
            </div>
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
                <li><span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Daily Horoscope</span></li>
                <li><span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Compatibility</span></li>
                <li><span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Today's Mayan Date</span></li>
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
            <p>&copy; 2025 Mayan Astrology Calculator. All rights reserved. | Discover your ancient wisdom through authentic Mayan astrology calculations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}





