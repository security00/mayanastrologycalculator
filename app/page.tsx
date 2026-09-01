import BirthDateCalculator from './components/BirthDateCalculator';
import TzolkinWheel from './components/decor/TzolkinWheel';
import GrecaBand from './components/decor/GrecaBand';
import GlyphMark from './components/decor/GlyphMark';
import Image from 'next/image';
import Link from 'next/link';

const toolCards = [
  {
    href: '/birth-chart',
    title: 'Free Birth Chart',
    description: 'Learn what appears in a Mayan astrology birth chart and how to read your Tzolk\'in signature.',
    cta: 'Explore Birth Charts',
  },
  {
    href: '/mayan-zodiac-calculator',
    title: 'Mayan Zodiac Sign',
    description: 'Find your Mayan zodiac sign and understand how the 20 Nawal day signs work.',
    cta: 'Find Your Mayan Sign',
  },
  {
    href: '/mayan-calendar-calculator',
    title: 'Mayan Calendar',
    description: 'Convert a birth date into the Tzolk\'in calendar and understand the result.',
    cta: 'Convert a Mayan Date',
  },
  {
    href: '/mayan-sign-calculator',
    title: 'Mayan Sign Guide',
    description: 'Discover your Nawal day sign and learn how tones shape your Mayan profile.',
    cta: 'Read Mayan Signs',
  },
  {
    href: '/today',
    title: 'Daily Mayan Horoscope',
    description: 'Get your daily guidance based on the current Tzolk\'in energy and your personal Mayan astrology.',
    cta: 'Read Today\'s Energy',
  },
  {
    href: '/compatibility',
    title: 'Mayan Compatibility',
    description: 'Discover how your Mayan astrology aligns with friends, family, and romantic partners.',
    cta: 'Check Compatibility',
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero + Calculator (above the fold) */}
        <section className="relative pt-10 pb-14 md:pt-14 md:pb-16">
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-14">
            <div className="relative text-center lg:text-left">
              <div className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center opacity-25">
                <div className="w-[32rem] max-w-none">
                  <TzolkinWheel className="h-auto w-full" />
                </div>
              </div>
              <div className="relative">
              <p className="eyebrow mb-5">Sacred Tzolk&apos;in Calendar</p>
              <h1 className="font-display text-4xl leading-[1.1] md:text-5xl xl:text-6xl text-[var(--parchment)] mb-5">
                Free <span className="gold-gradient-text">Mayan Astrology</span> Calculator
              </h1>
              <p className="text-base md:text-lg text-[var(--parchment-dim)] max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed">
                Enter your birth date to reveal your Nawal day sign, Galactic Tone, and Tzolk&apos;in
                birth chart — a reflective guide to the symbolic themes woven into your date.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 text-sm text-[var(--parchment-faint)]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> 20 Nawal day signs
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--jade)]" /> 13 Galactic Tones
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--ember)]" /> 260-day sacred cycle
                </span>
              </div>
              <div className="mt-7 hidden sm:flex items-center justify-center lg:justify-start gap-6 text-[var(--gold-dim)]">
                <GlyphMark name="serpent" className="h-7 w-7" />
                <GlyphMark name="sun" className="h-8 w-8 text-[var(--gold)]" />
                <GlyphMark name="moon" className="h-7 w-7" />
                <GlyphMark name="maize" className="h-7 w-7" />
                <GlyphMark name="water" className="h-7 w-7" />
              </div>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ember)] opacity-[0.08] blur-3xl" />
              <BirthDateCalculator />
            </div>
          </div>
        </section>

        <GrecaBand className="max-w-4xl mx-auto mb-20" />

        {/* Tzolk'in wheel feature */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div className="relative overflow-hidden rounded-2xl panel panel-glow">
              <Image
                src="/tzolkin-astrology-chart.webp"
                alt="Tzolk'in inspired Mayan astrology chart with day sign and tone markers"
                width={1600}
                height={900}
                className="w-full h-auto object-cover opacity-95"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0908]/55 via-transparent to-transparent" />
            </div>
            <div className="panel rounded-2xl p-7 md:p-9">
              <p className="eyebrow mb-4">Tzolk&apos;in birth energy</p>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--parchment)] mb-5">
                A 260-day wheel of signs and tones
              </h2>
              <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
                Mayan astrology reads your birth date through the sacred Tzolk&apos;in cycle: 20 Nawal day
                signs moving with 13 Galactic Tones. Together they create a symbolic birth signature that
                can be explored through personality themes, timing, and relationship patterns.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[var(--gold-line)] bg-[var(--surface)] p-5 text-center">
                  <p className="font-display text-4xl text-gold-bright">20</p>
                  <p className="mt-1 text-sm text-[var(--parchment-dim)]">Nawal day signs</p>
                </div>
                <div className="rounded-xl border border-[var(--gold-line)] bg-[var(--surface)] p-5 text-center">
                  <p className="font-display text-4xl text-jade">13</p>
                  <p className="mt-1 text-sm text-[var(--parchment-dim)]">Galactic Tones</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction content */}
        <div className="content-prose max-w-4xl mx-auto">
          <p className="divider-glyph mb-10 text-xs uppercase tracking-[0.3em]"><span>✦&nbsp;&nbsp;The Sacred Count&nbsp;&nbsp;✦</span></p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">Understanding the Mayan Astrology Calculator</h2>

          <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
            This Mayan astrology calculator converts a Gregorian birth date into a modern Tzolk&apos;in reading. Unlike Western astrology, which uses planetary positions and twelve zodiac signs, this tool uses a 260-day cycle that combines 20 day signs with 13 tones.
          </p>

          <h3 className="font-display text-2xl mt-10 mb-4">What is the Tzolk&apos;in Calendar?</h3>

          <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
            The Tzolk&apos;in calendar is the heart of Mayan astrology, representing the sacred count of days used by the ancient Maya for divination and ceremonial purposes. This 260-day calendar was considered the most important calendar system, as it aligned with the human gestation period and agricultural cycles. Each day in the Tzolk&apos;in has a unique energy signature created by the combination of one of 20 day signs and one of 13 Galactic Tones.
          </p>

          <h3 className="font-display text-2xl mt-10 mb-4">The 20 Day Signs (Nawals)</h3>

          <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
            Your Nawal, or day sign, represents your spiritual essence and core personality traits. Each of the 20 Nawals carries specific energies, elements, and characteristics that influence your life path. From Imix (Crocodile) representing nurturing and creation, to Ahau (Sun) symbolizing enlightenment and leadership, each Nawal offers unique insights into your spiritual nature and life purpose.
          </p>

          <h3 className="font-display text-2xl mt-10 mb-4">The 13 Galactic Tones</h3>

          <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
            The Galactic Tone represents how you express your Nawal&apos;s energy in the world. These 13 tones range from Magnetic (unity and purpose) to Cosmic (transcendence and magic), each offering a different approach to manifesting your spiritual gifts. The combination of your Nawal and Galactic Tone creates your complete Mayan astrology profile.
          </p>

          <h3 className="font-display text-2xl mt-10 mb-4">How to Use This Mayan Astrology Calculator</h3>

          <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
            Using our Mayan astrology calculator is simple and accurate. Enter your birth date using the dropdown menus above, and our algorithm will instantly calculate your Tzolk&apos;in date using the GMT correlation constant—the most widely accepted method for converting Gregorian dates to the Mayan calendar system. You&apos;ll receive a detailed reading that includes your Nawal, Galactic Tone, and comprehensive interpretation of your Mayan astrology profile.
          </p>

          <h3 className="font-display text-2xl mt-10 mb-4">Benefits of Knowing Your Mayan Astrology</h3>

          <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">
            A Tzolk&apos;in reading can offer prompts for reflecting on personality, relationships, and recurring patterns. It is a symbolic tradition rather than a scientific personality test or prediction. Treat the result as a starting point for reflection, not as a substitute for professional or factual guidance.
          </p>

          <div className="panel rounded-2xl border-l-2 border-l-[var(--gold)] p-7 my-10">
            <h4 className="font-display text-xl text-gold-bright mb-3">Methodology and scope</h4>
            <p className="text-[var(--parchment-dim)] leading-relaxed mb-4">
              The calculation is deterministic: the same birth date always produces the same result. It uses the GMT correlation commonly used to map Gregorian dates to the Maya calendar count, while the English interpretation is reflective and non-predictive.
            </p>
            <Link href="/about" className="link-gold">
              Read how the calculator works →
            </Link>
          </div>
        </div>

        {/* Related tools */}
        <div className="mt-24">
          <GrecaBand tone="jade" className="max-w-4xl mx-auto mb-14" />
          <p className="eyebrow mb-5 justify-center text-center w-full">Continue the journey</p>
          <h2 className="font-display text-3xl md:text-4xl text-center text-[var(--parchment)] mb-12">Explore More Astrology Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCards.map((card) => (
              <div
                key={card.href}
                className="panel group rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--gold-line-strong)]"
              >
                <h3 className="font-display text-xl text-[var(--parchment)] mb-3">{card.title}</h3>
                <p className="text-sm text-[var(--parchment-dim)] leading-relaxed mb-5">{card.description}</p>
                <Link href={card.href} className="link-gold text-sm">
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
