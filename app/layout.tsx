import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MicrosoftClarity from "./components/MicrosoftClarity";
import AhrefsAnalytics from "./components/AhrefsAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mayan Astrology Calculator - Free Tzolk'in Date Calculator",
  description: "Calculate your Mayan astrology with a free Tzolk'in date calculator. Reveal your Nawal day sign and Galactic Tone with accurate Mayan calendar conversion.",
  keywords: "mayan astrology calculator, tzolkin calculator, mayan calendar, nawal, day sign, galactic tone, mayan horoscope, ancient astrology, sacred calendar",
  authors: [{ name: "Mayan Astrology Calculator" }],
  creator: "Mayan Astrology Calculator",
  publisher: "Mayan Astrology Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mayanastrologycalculator.com'),
  alternates: {
    canonical: 'https://mayanastrologycalculator.com',
  },
  openGraph: {
    title: "Mayan Astrology Calculator - Free Tzolk'in Date Calculator",
    description: "Calculate your Mayan astrology with a free Tzolk'in date calculator. Reveal your Nawal day sign and Galactic Tone with accurate Mayan calendar conversion.",
    url: 'https://mayanastrologycalculator.com',
    siteName: 'Mayan Astrology Calculator',
    images: [
      {
        url: 'https://mayanastrologycalculator.com/ref-page/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayan Astrology Calculator - Ancient Wisdom',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mayan Astrology Calculator - Free Tzolk'in Date Calculator",
    description: "Calculate your Mayan astrology with a free Tzolk'in date calculator. Reveal your Nawal day sign and Galactic Tone with accurate Mayan calendar conversion.",
    images: ['https://mayanastrologycalculator.com/ref-page/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://mayanastrologycalculator.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#ea580c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Mayan Astrology Calculator",
              "description": "Free online Mayan astrology calculator that converts Gregorian dates to Tzolk'in calendar dates, revealing your Nawal day sign and Galactic Tone according to ancient Mayan wisdom.",
              "url": "https://mayanastrologycalculator.com",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Mayan Astrology Calculator"
              },
              "keywords": "mayan astrology, tzolkin calculator, mayan calendar, nawal, day sign, galactic tone, ancient wisdom, sacred calendar",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <GoogleAnalytics />
        <MicrosoftClarity />
        <AhrefsAnalytics />
      </body>
    </html>
  );
}

