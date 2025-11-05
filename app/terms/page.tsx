import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Mayan Astrology Calculator',
  description: 'The terms for using Mayan Astrology Calculator. Simple usage rules, disclaimers, and contact information for questions about these terms.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose">
        <h1>Terms of Service</h1>
        <p>By using this site, you agree to use it for personal, non-commercial purposes. Content is provided for educational and spiritual exploration only.</p>
        <h2>Disclaimer</h2>
        <p>No guarantees are made about results. This site provides information and entertainment, not professional advice.</p>
        <h2>Contact</h2>
        <p>Email <a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a> for questions.</p>
      </main>
    </div>
  );
}
