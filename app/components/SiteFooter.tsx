import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mayan Astrology Calculator</h3>
            <p className="text-gray-400">
              Discover the ancient wisdom of Mayan astrology through accurate Tzolk'in calculations,
              daily Mayan dates, compatibility tools, and practical interpretation guides.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Calculator</Link></li>
              <li><Link href="/mayan-zodiac-calculator" className="hover:text-white">Mayan Zodiac Calculator</Link></li>
              <li><Link href="/mayan-calendar-calculator" className="hover:text-white">Mayan Calendar Calculator</Link></li>
              <li><Link href="/birth-chart" className="hover:text-white">Birth Chart Calculator</Link></li>
              <li><Link href="/mayan-astrology-birth-chart-free" className="hover:text-white">Free Birth Chart</Link></li>
              <li><Link href="/today" className="hover:text-white">Today's Mayan Date</Link></li>
              <li><Link href="/compatibility" className="hover:text-white">Compatibility Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/guide" className="hover:text-white">Mayan Astrology Guide</Link></li>
              <li><Link href="/mayan-sign-calculator" className="hover:text-white">Mayan Sign Calculator</Link></li>
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
          <p>&copy; 2026 Mayan Astrology Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
