import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Mayan Astrology Reading - Tzolk'in Result",
  description: "View your Mayan astrology result with Nawal day sign and Galactic Tone. Save, share, and learn what your Tzolk'in date says about your strengths and life path.",
  alternates: {
    canonical: 'https://mayanastrologycalculator.com/result',
  },
  openGraph: {
    title: "Your Mayan Astrology Reading - Tzolk'in Result",
    description: "View your Mayan astrology result with Nawal day sign and Galactic Tone. Save, share, and learn what your Tzolk'in date says about your strengths and life path.",
    url: 'https://mayanastrologycalculator.com/result',
    siteName: 'Mayan Astrology Calculator',
    images: [
      {
        url: 'https://mayanastrologycalculator.com/ref-page/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayan Astrology Calculator - Your Reading',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Your Mayan Astrology Reading - Tzolk'in Result",
    description: "View your Mayan astrology result with Nawal day sign and Galactic Tone. Save, share, and learn what your Tzolk'in date says about your strengths and life path.",
    images: ['https://mayanastrologycalculator.com/ref-page/logo.png'],
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
