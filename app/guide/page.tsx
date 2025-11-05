import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Mayan Astrology Guide - How to Read Your Tzolk'in Calendar",
  description: "A complete guide to Mayan astrology. Learn to interpret the Nawal day sign, Galactic Tone, and Tzolk'in date to understand readings and apply them for growth.",
  keywords: "mayan astrology guide, tzolkin interpretation, how to read mayan astrology, nawal meaning, galactic tone guide, mayan calendar reading, spiritual guidance",
  alternates: {
    canonical: 'https://mayanastrologycalculator.com/guide',
  },
  openGraph: {
    title: "Mayan Astrology Guide - How to Read Your Tzolk'in Calendar",
    description: "A complete guide to Mayan astrology. Learn to interpret the Nawal day sign, Galactic Tone, and Tzolk'in date to understand readings and apply them for growth.",
    url: 'https://mayanastrologycalculator.com/guide',
    siteName: 'Mayan Astrology Calculator',
    images: [
      {
        url: 'https://mayanastrologycalculator.com/ref-page/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayan Astrology Guide - Complete Tzolk\'in Interpretation',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mayan Astrology Guide - How to Read Your Tzolk'in Calendar",
    description: "A complete guide to Mayan astrology. Learn to interpret the Nawal day sign, Galactic Tone, and Tzolk'in date to understand readings and apply them for growth.",
    images: ['https://mayanastrologycalculator.com/ref-page/logo.png'],
  },
};

export default function GuidePage() {
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
                <p className="text-sm text-amber-200">Complete Guide</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-amber-100 hover:text-white transition-colors">Home</Link>
              <Link href="/guide" className="text-amber-100 hover:text-white transition-colors font-semibold">Guide</Link>
              <Link href="/about" className="text-amber-100 hover:text-white transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Complete <span className="text-orange-600">Mayan Astrology Guide</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Master the art of interpreting Mayan astrology readings. This comprehensive guide will teach you how to understand your Tzolk'in date, decode your Nawal day sign, and harness the power of your Galactic Tone for personal transformation and spiritual growth.
          </p>
        </div>

        {/* Quick Calculator CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">Haven't Calculated Your Mayan Astrology Yet?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get your free Mayan astrology reading first, then return to this guide to understand your results.
          </p>
          <Link
            href="/"
            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Calculate My Mayan Astrology
          </Link>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your Mayan Astrology Reading</h2>

            <p className="text-gray-700 mb-6">
              Your Mayan astrology reading consists of three main components that work together to create your unique spiritual signature. Understanding how to interpret these elements will help you unlock the profound wisdom contained in your Tzolk'in date and apply it to your daily life for greater self-awareness and spiritual growth.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 1: Understanding Your Tzolk'in Date Format</h3>

            <p className="text-gray-700 mb-6">
              Your Mayan astrology reading will be presented in the format "Number + Day Sign" (for example, "7 Ik" or "13 Ahau"). This combination represents your complete Tzolk'in signature, where the number (1-13) is your Galactic Tone and the day sign is your Nawal. Together, they create one of 260 possible combinations that repeat in an endless cycle throughout the Mayan calendar system.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Example Reading Breakdown</h4>
              <p className="text-gray-700 mb-2"><strong>Reading:</strong> 7 Ik (7 Wind)</p>
              <p className="text-gray-700 mb-2"><strong>Galactic Tone:</strong> 7 (Resonant) - Channel mystical power</p>
              <p className="text-gray-700 mb-2"><strong>Nawal:</strong> Ik (Wind) - Communication and breath of life</p>
              <p className="text-gray-700"><strong>Combined Meaning:</strong> A mystical communicator who channels spiritual wisdom through words and ideas</p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 2: Interpreting Your Galactic Tone (1-13)</h3>

            <p className="text-gray-700 mb-6">
              Your Galactic Tone represents how you express your day sign's energy in the world. It describes your approach to life, your natural way of manifesting goals, and the spiritual lessons you're here to learn. The 13 Galactic Tones follow a specific progression from unity (1) to transcendence (13), each building upon the previous tone's energy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Tones 1-4: Foundation Phase</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>1 (Magnetic):</strong> Unity, purpose, attraction</li>
                  <li><strong>2 (Lunar):</strong> Polarity, challenge, cooperation</li>
                  <li><strong>3 (Electric):</strong> Service, activation, bonding</li>
                  <li><strong>4 (Self-Existing):</strong> Form, definition, structure</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Tones 5-8: Empowerment Phase</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>5 (Overtone):</strong> Empowerment, radiance, command</li>
                  <li><strong>6 (Rhythmic):</strong> Balance, equality, organization</li>
                  <li><strong>7 (Resonant):</strong> Mysticism, inspiration, attunement</li>
                  <li><strong>8 (Galactic):</strong> Harmony, integrity, modeling</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Tones 9-12: Completion Phase</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>9 (Solar):</strong> Intention, completion, realization</li>
                  <li><strong>10 (Planetary):</strong> Manifestation, perfection, production</li>
                  <li><strong>11 (Spectral):</strong> Liberation, release, dissolution</li>
                  <li><strong>12 (Crystal):</strong> Cooperation, dedication, stability</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Tone 13: Transcendence</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>13 (Cosmic):</strong> Transcendence, magic, presence</li>
                </ul>
                <p className="text-gray-600 text-sm mt-2">The highest tone, representing mastery and cosmic consciousness.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 3: Understanding Your Nawal (Day Sign)</h3>

            <p className="text-gray-700 mb-6">
              Your Nawal represents your core spiritual essence, personality traits, and life purpose. Each of the 20 day signs carries specific energies, elements, directions, and colors that influence your character and spiritual path. Understanding your Nawal helps you recognize your natural gifts, challenges, and the unique contribution you're meant to make in the world.
            </p>

            <p className="text-gray-700 mb-6">
              The 20 day signs are organized into four groups of five, each associated with a cardinal direction and specific themes. This organization reflects the Mayan understanding of cosmic balance and the interconnectedness of all life. Your day sign's element, direction, and color provide additional layers of meaning for personal meditation and spiritual practice.
            </p>

            <div className="bg-amber-50 border-l-4 border-orange-500 p-6 my-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Day Sign Elements and Directions</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>East (Red) - Fire/Water:</strong> Imix, Chicchan, Muluc, Ben, Caban
                </div>
                <div>
                  <strong>North (White) - Air/Earth:</strong> Ik, Cimi, Oc, Ix, Etznab
                </div>
                <div>
                  <strong>West (Blue) - Air/Water:</strong> Akbal, Manik, Chuen, Men, Cauac
                </div>
                <div>
                  <strong>South (Yellow) - Fire/Water:</strong> Kan, Lamat, Eb, Cib, Ahau
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 4: Combining Tone and Day Sign</h3>

            <p className="text-gray-700 mb-6">
              The true power of Mayan astrology lies in understanding how your Galactic Tone and Nawal work together. Your tone modifies how you express your day sign's energy, creating a unique personality profile that's specific to your birth date. This combination reveals not just who you are, but how you're meant to share your gifts with the world.
            </p>

            <p className="text-gray-700 mb-6">
              For example, someone with 1 Ahau (Magnetic Sun) will express solar leadership energy through unity and magnetic attraction, while someone with 13 Ahau (Cosmic Sun) expresses the same solar energy through transcendence and cosmic consciousness. The day sign provides the core energy, while the tone determines the method of expression and spiritual lesson.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 5: Practical Application in Daily Life</h3>

            <p className="text-gray-700 mb-6">
              Understanding your Mayan astrology reading is just the beginning. The real value comes from applying this knowledge to enhance your daily life, relationships, and spiritual practice. Your Tzolk'in signature can guide decision-making, help you understand relationship dynamics, and provide insight into your optimal career path and life purpose.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Personal Development</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Recognize your natural strengths and talents</li>
                  <li>• Understand your spiritual challenges and growth areas</li>
                  <li>• Align with your authentic life purpose</li>
                  <li>• Develop your unique gifts and abilities</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Relationships</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Understand compatibility with others</li>
                  <li>• Improve communication patterns</li>
                  <li>• Recognize different energy expressions</li>
                  <li>• Build more harmonious connections</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 6: Working with Mayan Calendar Cycles</h3>

            <p className="text-gray-700 mb-6">
              The Tzolk'in calendar is cyclical, meaning that every 260 days, the same energy combinations repeat. You can use this knowledge to track personal cycles, plan important events, and understand the energetic influences affecting your life. Many people find that paying attention to Tzolk'in cycles helps them make better decisions and align with natural rhythms.
            </p>

            <p className="text-gray-700 mb-6">
              Your personal Tzolk'in birthday occurs every 260 days when your exact day sign and tone combination returns. This is considered an especially powerful time for reflection, goal-setting, and spiritual practice. Many Mayan astrology practitioners use these personal new years for ceremony, meditation, and planning the next cycle of growth and development.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Advanced Interpretation Techniques</h3>

            <p className="text-gray-700 mb-6">
              As you become more familiar with Mayan astrology, you can explore advanced techniques such as calculating your Destiny Kin (your Tzolk'in date plus your age), understanding wavespell patterns (13-day cycles), and working with the larger calendar rounds that combine the Tzolk'in with other Mayan calendar systems. These advanced practices deepen your connection to Mayan wisdom and provide more nuanced guidance for spiritual development.
            </p>

            <p className="text-gray-700 mb-6">
              Remember that Mayan astrology is a living tradition that continues to evolve. While our calculator provides accurate traditional interpretations, the most important aspect is how this knowledge resonates with your personal experience and supports your spiritual journey. Trust your intuition and allow the wisdom of the Tzolk'in to guide you toward greater self-understanding and authentic expression.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h4>
              <p className="text-gray-700">
                Begin by calculating your Mayan astrology reading, then spend time reflecting on how the interpretation resonates with your life experience. Keep a journal of insights and observations as you learn to work with your Tzolk'in energy. Remember that understanding Mayan astrology is a gradual process that deepens with time and practice.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Further?</h2>
            <p className="text-xl mb-6 opacity-90">
              Dive deeper into Mayan astrology with detailed information about all 20 day signs and 13 Galactic Tones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/day-signs"
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore 20 Day Signs
              </Link>
              <Link
                href="/galactic-tones"
                className="bg-purple-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-800 transition-colors border-2 border-white"
              >
                Learn 13 Galactic Tones
              </Link>
            </div>
          </div>

          {/* Related Tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Calculate Your Reading</h3>
              <p className="text-gray-600 mb-4">Get your personal Mayan astrology reading and start applying this guide to your results.</p>
              <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                Calculate Now →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compatibility Check</h3>
              <p className="text-gray-600 mb-4">Compare Mayan astrology readings to understand relationship dynamics and compatibility.</p>
              <span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">Check Compatibility → </span>

            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-100 hover:border-orange-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Today's Mayan Date</h3>
              <p className="text-gray-600 mb-4">See what day it is in the Mayan calendar and how today's energy affects you.</p>
              <span aria-disabled="true" className="text-gray-400 cursor-not-allowed select-none pointer-events-none">View Today's Energy → </span>

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









