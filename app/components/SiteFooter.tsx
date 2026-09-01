import Link from 'next/link';
import FeaturedBadgeMarquee from './FeaturedBadgeMarquee';
import PyramidSilhouette from './decor/PyramidSilhouette';

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--gold-line)] bg-[#080606] text-[var(--parchment-dim)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-70">
        <PyramidSilhouette className="h-44 w-full max-w-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-lg text-[var(--parchment)] mb-4">Mayan Astrology Calculator</h3>
            <p className="text-sm leading-relaxed">
              Discover the ancient wisdom of Mayan astrology through accurate Tzolk'in calculations,
              daily Mayan dates, compatibility tools, and practical interpretation guides.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold-dim)] mb-4">Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="transition-colors hover:text-[var(--gold-bright)]">Calculator</Link></li>
              <li><Link href="/mayan-zodiac-calculator" className="transition-colors hover:text-[var(--gold-bright)]">Mayan Zodiac Calculator</Link></li>
              <li><Link href="/mayan-calendar-calculator" className="transition-colors hover:text-[var(--gold-bright)]">Mayan Calendar Calculator</Link></li>
              <li><Link href="/birth-chart" className="transition-colors hover:text-[var(--gold-bright)]">Birth Chart Calculator</Link></li>
              <li><Link href="/today" className="transition-colors hover:text-[var(--gold-bright)]">Today's Mayan Date</Link></li>
              <li><Link href="/compatibility" className="transition-colors hover:text-[var(--gold-bright)]">Compatibility Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold-dim)] mb-4">Learn</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/guide" className="transition-colors hover:text-[var(--gold-bright)]">Mayan Astrology Guide</Link></li>
              <li><Link href="/mayan-sign-calculator" className="transition-colors hover:text-[var(--gold-bright)]">Mayan Sign Calculator</Link></li>
              <li><Link href="/day-signs" className="transition-colors hover:text-[var(--gold-bright)]">20 Day Signs</Link></li>
              <li><Link href="/galactic-tones" className="transition-colors hover:text-[var(--gold-bright)]">13 Galactic Tones</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-[var(--gold-bright)]">About Mayan Calendar</Link></li>
              <li><Link href="/methodology" className="transition-colors hover:text-[var(--gold-bright)]">Methodology &amp; Sources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold-dim)] mb-4">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/contact" className="transition-colors hover:text-[var(--gold-bright)]">Contact Us</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-[var(--gold-bright)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-[var(--gold-bright)]">Terms of Service</Link></li>
            </ul>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold-dim)]">
                Friends
              </p>
              <a
                href="https://animatephoto.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-[var(--gold-bright)]"
              >
                Animate Photo AI
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--gold-line)] pt-8">
          <p className="divider-glyph mb-6 text-xs font-semibold uppercase tracking-[0.28em]">
            <span>✦&nbsp;&nbsp;Featured on&nbsp;&nbsp;✦</span>
          </p>
          <FeaturedBadgeMarquee />
        </div>
        <div className="border-t border-[var(--gold-line)] mt-10 pt-8 text-center text-sm text-[var(--parchment-faint)]">
          <p>&copy; 2026 Mayan Astrology Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
