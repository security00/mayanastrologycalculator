import type { Metadata } from "next";
import Link from 'next/link';
import PageHero from '../components/PageHero';

export const metadata: Metadata = {
  title: "About Mayan Astrology Calculator - Ancient Wisdom",
  description: "Learn about Mayan Astrology Calculator and the sacred Tzolk'in calendar. See how the tool reveals your Nawal day sign and Galactic Tone with wisdom.",
  keywords: "mayan astrology, tzolkin calendar, ancient wisdom, mayan calendar history, nawal day signs, galactic tones, sacred calendar, mayan civilization",
  alternates: {
    canonical: 'https://mayanastrologycalculator.com/about',
  },
  openGraph: {
    title: "About Mayan Astrology Calculator - Ancient Wisdom",
    description: "Learn about Mayan Astrology Calculator and the sacred Tzolk'in calendar. See how the tool reveals your Nawal day sign and Galactic Tone with wisdom.",
    url: 'https://mayanastrologycalculator.com/about',
    siteName: 'Mayan Astrology Calculator',
    images: [
      {
        url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Mayan Astrology Calculator - About Ancient Wisdom',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Mayan Astrology Calculator - Ancient Wisdom",
    description: "Learn about Mayan Astrology Calculator and the sacred Tzolk'in calendar. See how the tool reveals your Nawal day sign and Galactic Tone with wisdom.",
    images: ['https://mayanastrologycalculator.com/ref-page/og-image.webp'],
  },
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <PageHero
          align="center"
          eyebrow="Ancient wisdom"
          title={<>About <span className="gold-gradient-text">Mayan Astrology</span></>}
          glyphs={['maize', 'sun', 'water']}
        >
          Discover the profound wisdom of the ancient Maya civilization through their sacred Tzolk'in calendar system. Our Mayan astrology calculator connects you with thousands of years of astronomical knowledge and spiritual insight.
        </PageHero>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="panel rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-display text-[var(--parchment)] mb-6">The Ancient Maya Civilization</h2>

            <p className="text-[var(--parchment-dim)] mb-6">
              The Maya civilization flourished in Mesoamerica for over 3,000 years, creating one of the most sophisticated astronomical and mathematical systems in human history. The ancient Maya were master astronomers who tracked celestial movements with incredible precision, developing multiple calendar systems that remain accurate to this day. Their understanding of time, cycles, and cosmic energy forms the foundation of Mayan astrology.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              Unlike Western astrology, which focuses primarily on the position of celestial bodies at birth, Mayan astrology is based on the sacred count of days known as the Tzolk'in calendar. This 260-day cycle represents the sacred rhythm of life, combining 20 day signs (called Nawals or day lords) with 13 Galactic Tones to create a unique energetic signature for each day.
            </p>

            <h3 className="text-2xl font-display text-[var(--parchment)] mb-4">The Sacred Tzolk'in Calendar</h3>

            <p className="text-[var(--parchment-dim)] mb-6">
              The Tzolk'in calendar is the heart of Mayan astrology and represents one of humanity's most sophisticated timekeeping systems. This sacred 260-day calendar was used by the Maya for divination, ceremony, and understanding the spiritual energies that influence daily life. The number 260 is significant as it closely matches the human gestation period and represents the sacred count that governs agricultural cycles, ritual ceremonies, and personal spiritual development.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              Each day in the Tzolk'in calendar has a unique combination of one of 20 day signs and one of 13 Galactic Tones. This creates 260 distinct energy signatures (20 × 13 = 260) that repeat in an endless cycle. The Maya believed that the day you were born determines your spiritual essence, personality traits, life purpose, and the challenges and gifts you bring to the world.
            </p>

            <h3 className="text-2xl font-display text-[var(--parchment)] mb-4">The 20 Day Signs (Nawals)</h3>

            <p className="text-[var(--parchment-dim)] mb-6">
              The 20 day signs, known as Nawals in the K'iche' Maya tradition, represent different aspects of creation and spiritual energy. Each Nawal carries specific characteristics, elements, directions, and colors that influence those born under its energy. From Imix (Crocodile), representing the primordial waters of creation, to Ahau (Sun), symbolizing enlightenment and universal love, each day sign offers unique insights into personality, relationships, and life path.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              The day signs are deeply connected to the natural world, with many representing animals, natural phenomena, or cosmic forces. This connection reflects the Maya understanding that humans are part of a larger web of life and that our spiritual development is intimately linked with natural cycles and cosmic rhythms. Understanding your Nawal helps you align with your authentic nature and fulfill your spiritual purpose.
            </p>

            <h3 className="text-2xl font-display text-[var(--parchment)] mb-4">The 13 Galactic Tones</h3>

            <p className="text-[var(--parchment-dim)] mb-6">
              The 13 Galactic Tones represent different ways of expressing and manifesting energy in the world. These tones range from Magnetic (unity and purpose) to Cosmic (transcendence and magic), each offering a different approach to spiritual development and life expression. Your Galactic Tone influences how you approach challenges, relationships, and your life's work.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              The number 13 holds special significance in Mayan cosmology, representing completion, transformation, and the bridge between earthly and cosmic consciousness. Each tone builds upon the previous one, creating a spiral of development that mirrors the natural cycles of growth, manifestation, and transcendence found throughout the universe.
            </p>

            <h3 className="text-2xl font-display text-[var(--parchment)] mb-4">Mayan Astrology vs. Western Astrology</h3>

            <p className="text-[var(--parchment-dim)] mb-6">
              While Western astrology focuses on the positions of planets and constellations at the time of birth, Mayan astrology is based on the sacred count of days and the energetic qualities of time itself. Mayan astrology views time as cyclical rather than linear, with each day carrying specific spiritual energies that influence all life on Earth.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              Mayan astrology emphasizes personal spiritual development, connection with natural cycles, and understanding one's role in the larger cosmic order. It provides practical guidance for daily life while offering profound insights into personality, relationships, and life purpose. Many people find that Mayan astrology complements rather than conflicts with other spiritual and astrological systems.
            </p>

            <h3 className="text-2xl font-display text-[var(--parchment)] mb-4">The GMT Correlation and Accuracy</h3>

            <p className="text-[var(--parchment-dim)] mb-6">
              Our Mayan astrology calculator uses the GMT (Goodman-Martinez-Thompson) correlation constant, which is the most widely accepted method for converting Gregorian calendar dates to Mayan calendar dates. This correlation, established through extensive archaeological and astronomical research, ensures that our calculations are accurate and authentic to traditional Mayan timekeeping.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              The GMT correlation places the Mayan Long Count date 0.0.0.0.0 (4 Ahau 8 Cumku) on August 11, 3114 BCE in the Gregorian calendar. This correlation has been validated through carbon dating, astronomical observations recorded in Mayan texts, and cross-referencing with other Mesoamerican calendar systems, making it the most reliable method for Mayan date conversion.
            </p>

            <h3 className="text-2xl font-display text-[var(--parchment)] mb-4">Modern Applications of Ancient Wisdom</h3>

            <p className="text-[var(--parchment-dim)] mb-6">
              Today, Mayan astrology continues to offer valuable insights for personal growth, relationship understanding, and spiritual development. Many people use their Mayan astrology reading to better understand their strengths, challenges, and life purpose. The system provides a framework for understanding personality traits, compatibility with others, and optimal timing for important decisions.
            </p>

            <p className="text-[var(--parchment-dim)] mb-6">
              Contemporary Maya daykeepers and spiritual teachers continue to use the Tzolk'in calendar for ceremony, healing, and guidance. This living tradition ensures that Mayan astrology remains connected to its authentic roots while adapting to modern needs and understanding. Our calculator honors this tradition by providing accurate calculations and respectful interpretations of this sacred knowledge.
            </p>

            <div className="panel rounded-2xl border-l-2 border-l-[var(--gold)] p-7 my-10">
              <h4 className="text-lg font-display text-[var(--parchment)] mb-2">Our Mission</h4>
              <p className="text-[var(--parchment-dim)]">
                We are dedicated to sharing the authentic wisdom of Mayan astrology with respect for its sacred origins and cultural significance. Our goal is to help people connect with this ancient knowledge in a way that honors Maya traditions while providing practical insights for modern life. We believe that understanding your Mayan astrology can deepen your connection to natural cycles, enhance self-awareness, and support your spiritual journey.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="rounded-3xl p-8 text-center text-white mb-12 bg-[linear-gradient(150deg,#7c2d12_0%,#9a3412_45%,#7f1d1d_100%)] border border-[var(--gold-line-strong)] shadow-[0_24px_60px_-24px_rgb(154_52_18/55%)]">
            <h2 className="text-3xl font-display mb-4">Discover Your Mayan Astrology</h2>
            <p className="text-xl mb-6 opacity-90">
              Ready to explore your unique Tzolk'in signature? Calculate your Mayan astrology reading and connect with the ancient wisdom of the Maya.
            </p>
            <Link
              href="/"
              className="btn-ember py-4 px-8 text-lg"
            >
              Calculate My Mayan Astrology
            </Link>
          </div>

          {/* Related Pages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
              <h3 className="text-xl font-display text-[var(--parchment)] mb-3">Complete Guide</h3>
              <p className="text-[var(--parchment-dim)] mb-4">Learn how to interpret your Mayan astrology reading and understand the deeper meanings.</p>
              <Link href="/guide" className="link-gold">
                Read the Guide →
              </Link>
            </div>
            <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
              <h3 className="text-xl font-display text-[var(--parchment)] mb-3">20 Day Signs</h3>
              <p className="text-[var(--parchment-dim)] mb-4">Explore detailed information about all 20 Mayan day signs and their meanings.</p>
              <Link href="/day-signs" className="link-gold">
                Explore Day Signs →
              </Link>
            </div>
            <div className="panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]">
              <h3 className="text-xl font-display text-[var(--parchment)] mb-3">13 Galactic Tones</h3>
              <p className="text-[var(--parchment-dim)] mb-4">Understand the 13 Galactic Tones and how they influence your energy expression.</p>
              <Link href="/galactic-tones" className="link-gold">
                Learn About Tones →
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

