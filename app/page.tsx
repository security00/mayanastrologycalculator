'use client';

import BirthDateCalculator from './components/BirthDateCalculator';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section with Calculator */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Free <span className="text-orange-600">Mayan Astrology Calculator</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Enter your birth date to find your Mayan sign, Nawal day sign, Galactic Tone, and Tzolk'in birth chart. Use the result as a reflective guide to the symbolic themes connected with your date.
          </p>
        </div>

        <div className="mb-16">
          <BirthDateCalculator />
        </div>

        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
            <div className="relative overflow-hidden rounded-2xl border-4 border-amber-200 shadow-2xl bg-amber-950">
              <Image
                src="/tzolkin-astrology-chart.webp"
                alt="Tzolk'in inspired Mayan astrology chart with day sign and tone markers"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="bg-white/90 border border-amber-200 rounded-2xl p-6 md:p-8 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-700 mb-3">
                Tzolk'in birth energy
              </p>
              <h2 className="text-3xl font-bold text-gray-950 mb-4">
                A 260-day astrology wheel of signs and tones
              </h2>
              <p className="text-gray-700 mb-4">
                Mayan astrology reads your birth date through the sacred Tzolk'in cycle: 20 Nawal day
                signs moving with 13 Galactic Tones. Together they create a symbolic birth signature that
                can be explored through personality themes, timing, and relationship patterns.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <p className="text-2xl font-bold text-orange-700">20</p>
                  <p className="text-gray-700">Nawal day signs</p>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <p className="text-2xl font-bold text-orange-700">13</p>
                  <p className="text-gray-700">Galactic Tones</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Content */}
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Mayan Astrology Calculator</h2>

          <p className="text-gray-700 mb-6">
            This Mayan astrology calculator converts a Gregorian birth date into a modern Tzolk'in reading. Unlike Western astrology, which uses planetary positions and twelve zodiac signs, this tool uses a 260-day cycle that combines 20 day signs with 13 tones.
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
            A Tzolk'in reading can offer prompts for reflecting on personality, relationships, and recurring patterns. It is a symbolic tradition rather than a scientific personality test or prediction. Treat the result as a starting point for reflection, not as a substitute for professional or factual guidance.
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-500 p-6 my-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Methodology and scope</h4>
            <p className="text-gray-700 mb-3">
              The calculation is deterministic: the same birth date always produces the same result. It uses the GMT correlation commonly used to map Gregorian dates to the Maya calendar count, while the English interpretation is reflective and non-predictive.
            </p>
            <Link href="/about" className="text-orange-700 hover:text-orange-800 font-semibold">
              Read how the calculator works →
            </Link>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore More Astrology Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Birth Chart</h3>
              <p className="text-gray-600 mb-4">Learn what appears in a Mayan astrology birth chart and how to read your Tzolk'in signature.</p>
              <Link href="/birth-chart" className="text-orange-600 hover:text-orange-700 font-medium">
                Explore Birth Charts →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mayan Zodiac Sign</h3>
              <p className="text-gray-600 mb-4">Find your Mayan zodiac sign and understand how the 20 Nawal day signs work.</p>
              <Link href="/mayan-zodiac-calculator" className="text-orange-600 hover:text-orange-700 font-medium">
                Find Your Mayan Sign →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mayan Calendar</h3>
              <p className="text-gray-600 mb-4">Convert a birth date into the Tzolk'in calendar and understand the result.</p>
              <Link href="/mayan-calendar-calculator" className="text-orange-600 hover:text-orange-700 font-medium">
                Convert a Mayan Date →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mayan Sign Guide</h3>
              <p className="text-gray-600 mb-4">Discover your Nawal day sign and learn how tones shape your Mayan profile.</p>
              <Link href="/mayan-sign-calculator" className="text-orange-600 hover:text-orange-700 font-medium">
                Read Mayan Signs →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Daily Mayan Horoscope</h3>
              <p className="text-gray-600 mb-4">Get your daily guidance based on the current Tzolk'in energy and your personal Mayan astrology.</p>
              <Link href="/today" className="text-orange-600 hover:text-orange-700 font-medium">
                Read Today's Energy →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mayan Compatibility</h3>
              <p className="text-gray-600 mb-4">Discover how your Mayan astrology aligns with friends, family, and romantic partners.</p>
              <Link href="/compatibility" className="text-orange-600 hover:text-orange-700 font-medium">
                Check Compatibility →
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}





