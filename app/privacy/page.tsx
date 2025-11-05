import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mayan Astrology Calculator',
  description: 'Read how Mayan Astrology Calculator collects, uses, and protects your data. We value your privacy and keep this policy simple and transparent.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>We do not require account creation. Calculations run in your browser and no birth dates are stored on our servers.</p>
        <h2>Data We Collect</h2>
        <p>Basic analytics (page views, referrers) may be collected to improve the site. We do not sell personal data.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a>.</p>
      </main>
    </div>
  );
}
