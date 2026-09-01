import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/birth-chart', label: 'Birth Chart' },
  { href: '/today', label: 'Today' },
  { href: '/compatibility', label: 'Compatibility' },
  { href: '/guide', label: 'Guide' },
  { href: '/about', label: 'About' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--gold-line)] bg-[#0b0908]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group flex items-center space-x-3">
            <span className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-25 blur-md transition-opacity group-hover:opacity-45" />
              <Image
                src="/logo.webp"
                alt="Mayan Astrology Calculator Logo"
                width={50}
                height={50}
                className="relative rounded-full ring-1 ring-[var(--gold-line-strong)]"
                priority
              />
            </span>
            <span>
              <span className="font-display block text-xl text-[var(--parchment)]">
                Mayan Astrology Calculator
              </span>
              <span className="block text-xs tracking-[0.22em] uppercase text-[var(--gold-dim)]">
                Discover Your Ancient Wisdom
              </span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--parchment-dim)] transition-colors hover:text-[var(--gold-bright)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
