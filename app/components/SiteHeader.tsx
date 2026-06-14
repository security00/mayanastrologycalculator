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
    <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/ref-page/logo.png"
              alt="Mayan Astrology Calculator Logo"
              width={50}
              height={50}
              className="rounded-full"
              priority
            />
            <div>
              <p className="text-xl font-bold text-amber-100">Mayan Astrology Calculator</p>
              <p className="text-sm text-amber-200">Discover Your Ancient Wisdom</p>
            </div>
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-amber-100 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
