import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Mayan Astrology Calculator',
  description: 'Contact the Mayan Astrology Calculator team. For support or feedback, email support@mayanastrologycalculator.com and we will respond promptly.',
  alternates: { canonical: 'https://mayanastrologycalculator.com/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. For support, questions, or feedback, email us at:</p>
        <p><a href="mailto:support@mayanastrologycalculator.com">support@mayanastrologycalculator.com</a></p>
      </main>
    </div>
  );
}
