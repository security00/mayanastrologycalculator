import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page is not on Mayan Astrology Calculator.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return (
    <div className="page-shell">
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="eyebrow mb-4 justify-center">404</p>
        <h1 className="font-display text-4xl text-[var(--parchment)] mb-4">Page not found</h1>
        <p className="text-[var(--parchment-dim)] mb-8">
          That address is not a page on this site. The calculator and the day-sign guide are still available.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-ember px-6 py-3">Back to the calculator</Link>
          <Link href="/day-signs" className="sample-link">20 day signs</Link>
        </div>
      </main>
    </div>
  );
}
