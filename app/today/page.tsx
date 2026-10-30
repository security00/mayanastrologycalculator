import type { Metadata } from 'next';
import Link from 'next/link';
import TodayReading from './TodayReading';
import PageHero from '../components/PageHero';
import { PersonalReportPin } from '../components/content/ReportCtaPin';
import { seoGraph } from '../lib/seo-schema';

const title = 'What Is Today’s Mayan Calendar Date? Current Tzolk’in Day Sign';
const description = 'See today’s Mayan calendar date in the Tzolk’in: Galactic Tone + Nawal, how GMT correlation works, timezone notes, and how to compare with your birth sign.';

const faqs = [
  {
    question: 'How is today’s Mayan day sign calculated?',
    answer: 'From your local Gregorian date, using GMT correlation 584283 and the same number/day-name cycles as the birth calculator. The methodology page publishes the formula.',
  },
  {
    question: 'Does “today” use my timezone?',
    answer: 'Yes—the widget follows your local civil date. Crossing local midnight can change the result.',
  },
  {
    question: 'How do I compare today’s sign with my birth sign?',
    answer: 'Calculate your birth tone and Nawal on the birth chart page, then read today’s widget. Use the day-sign and tone pages for vocabulary; treat daily text as reflection, not prediction.',
  },
  {
    question: 'Why does another “Mayan calendar today” site disagree?',
    answer: 'It may use Dreamspell, another correlation constant, or a different local-date rule. Start with the Dreamspell comparison and the methodology page.',
  },
  {
    question: 'Is the daily meaning a prophecy?',
    answer: 'No. The calendar position is calculated; the prose is modern reflective writing for journaling—not medical, legal, or financial advice.',
  },
];

export const metadata: Metadata = {
  title,
  description,
  keywords: "today's mayan date, mayan date today, today mayan calendar, daily mayan horoscope, tzolkin today, mayan energy today",
  alternates: { canonical: 'https://mayanastrologycalculator.com/today' },
  openGraph: {
    title,
    description,
    url: 'https://mayanastrologycalculator.com/today',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: "Today's Mayan Calendar Date and Tzolk'in Day Sign",
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function TodayPage() {
  const schema = seoGraph({
    pageName: title,
    description,
    path: '/today',
    faqs,
  });

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="Daily energy"
          title="Mayan Calendar Today: Current Tzolk’in Date & Day Sign"
          glyphs={['sun', 'moon', 'star']}
        >
          Quick answer. “Today” on the Tzolk’in is one of 260 day signatures: a Galactic Tone (number 1–13) paired with one of 20 Nawal day signs. This site maps your local Gregorian date to that signature with the same GMT correlation (584283) used by the birth-date calculator (gmt584283-proleptic-gregorian-v1). The date conversion is deterministic; the daily meaning text is reflective, not a scientific prediction.
        </PageHero>

        <p className="mb-8 text-sm text-[var(--parchment-dim)]">
          Reviewed 30 October 2026 · Calculation gmt584283-proleptic-gregorian-v1 · The calculation is deterministic, while the daily meaning is reflective and non-predictive.
        </p>

        <TodayReading />

        <article className="content-prose mt-10">
          <h2>What the widget shows</h2>
          <p>
            The block above is the local-time reading: “Today in your local time,” plus tone, Nawal, and a short reflection. When the page loads, you should see:
          </p>
          <ol>
            <li><strong>Today’s number (tone)</strong> — 1 through 13</li>
            <li><strong>Today’s day sign (Nawal)</strong> — one of the 20 names used on this site</li>
            <li>A short <strong>daily reflection</strong> — journaling language, not fortune-telling</li>
          </ol>
          <p>
            The widget links today’s resolved Nawal to its <Link href="/day-signs">day-sign page</Link> and today’s tone to its <Link href="/galactic-tones">Galactic Tone page</Link>. Before the date resolves, those controls point at the hubs.
          </p>

          <h2>Tone + Nawal in one sentence</h2>
          <p>
            A complete Tzolk’in “today” label is never only a day sign. <strong>8 Imix</strong> and <strong>1 Imix</strong> share a Nawal but not a tone; the number changes how the day feels in this site’s modern reflective framing. Learn the numbers on <Link href="/galactic-tones">/galactic-tones</Link> and the twenty Nawales on <Link href="/day-signs">/day-signs</Link>.
          </p>

          <h2>How today’s Mayan day sign is calculated</h2>
          <p>
            We interpret “today” as your browser’s <strong>local civil date</strong>, convert that Gregorian date to a day count with the <strong>GMT correlation constant 584283</strong>, then advance the paired cycles of <strong>13 numbers</strong> and <strong>20 day names</strong>. The same engine powers the <Link href="/birth-chart">birth chart</Link>. Full formulas and cultural scope: <Link href="/methodology">/methodology</Link>. [1]
          </p>
          <p>
            Other scholarly tools may use nearby constants such as <strong>584285</strong> or <strong>584286</strong>, which shift results by a small number of days. This consumer site keeps <strong>584283</strong> as a stable default. [1]
          </p>

          <h2>Timezone / local date note</h2>
          <p>
            The widget uses <strong>your local date</strong>, not a single global “Maya midnight.” If you check the page just before or after local midnight—or while traveling across a date line—the displayed signature can change with the civil date. That is expected for a local-date tool. We do not claim a single universal ritual day boundary for every Maya community.
          </p>

          <h2>How to use today’s sign with your birth chart</h2>
          <ul>
            <li>Your <strong>birth signature</strong> (tone + Nawal) stays fixed for a given birth date under this correlation.</li>
            <li><strong>Today’s signature</strong> moves every local day through the 260-day cycle.</li>
            <li>Reading both side by side is a simple reflective practice: “What stays mine, and what is the day’s wider pattern?”</li>
          </ul>
          <p>
            <Link href="/birth-chart" className="btn-ember inline-block px-6 py-3 text-center no-underline">Calculate my Maya signature</Link>
          </p>
          <p>
            Compare two people after you each know your birth signs: <Link href="/compatibility">/compatibility</Link>. Personal report <strong>$7</strong> · pair report <strong>$12</strong> on <Link href="/reports">/reports</Link>.
          </p>

          <h2>Dreamspell “today” may differ</h2>
          <p>
            If a Dreamspell or 13 Moon app shows a different kin for the same Gregorian date, <strong>neither tool is necessarily broken</strong>—they follow different calendars (Dreamspell anchors 26 July 1987 and skips 29 February). This page shows the <strong>traditional count</strong> used on this site. It does not invent a second Dreamspell “today” number. [2]
          </p>
          <p>
            → <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs Traditional Maya Calendar</Link>
          </p>

          <h2>Haab’ is a different “today”</h2>
          <p>
            The <strong>Haab’</strong> is the 365-day solar / civil count (18 × 20 + Wayeb’). It is not what this widget calculates. Educational overview: <Link href="/haab">/haab</Link>. Year bearer (which day sign “carries” a Haab’ year): <Link href="/year-bearer">/year-bearer</Link>. <strong>Product note:</strong> Haab’ / year-bearer tools are not live yet; personal tools remain Tzolk’in-first. This site does not yet offer a Haab’ date calculator.
          </p>

          <h2>A simple daily practice (optional)</h2>
          <p>If you like a light routine:</p>
          <ol>
            <li>Note today’s <strong>tone + Nawal</strong> from the widget.</li>
            <li>Open the matching <Link href="/day-signs">/day-signs</Link> and <Link href="/galactic-tones">/galactic-tones</Link> pages once, then skim only what helps you name a theme.</li>
            <li>Write one sentence: what you want to <strong>start</strong>, <strong>adjust</strong>, or <strong>complete</strong> today (tones often map cleanly onto those verbs in this site’s modern labels).</li>
            <li>If you know your birth signature, add one contrast line: “Today emphasizes X; my birth chart still centers Y.”</li>
          </ol>
          <p>
            Skip any step that feels forced. The calendar math does not require a ritual, and this site does not sell daykeeper authority. Use the reading for journaling or personal reflection rather than as factual or professional advice.
          </p>

          <h2>Birth chart, today, and the reports</h2>
          <p>
            Checking today is free. Your birth signature does not move when the civil date does. Open <Link href="/birth-chart">/birth-chart</Link> for the fixed tone and Nawal, then come back to this widget and read the two labels side by side. The free birth-chart result already includes the day sign, the number, and a short reading. The optional personal PDF is <strong>$7</strong>. If you are comparing two birth dates rather than a birth date and today, use <Link href="/compatibility">/compatibility</Link>; the optional pair PDF is <strong>$12</strong>. Both prices are one-time purchases on <Link href="/reports">/reports</Link>, and both have samples: <Link href="/sample-report">personal sample</Link> and <Link href="/sample-compatibility-report">pair sample</Link>.
          </p>
          <p>
            None of those tools calculate a Haab’ month or a year bearer. Those topics stay on the educational pages <Link href="/haab">/haab</Link> and <Link href="/year-bearer">/year-bearer</Link> until a real tool exists. Guessing a Haab’ month from a fixed Gregorian range would drift, because the classic 365-day count described on the Haab’ page has no leap-day intercalation.
          </p>

          <h2>What we do not show on this page</h2>
          <ul>
            <li>No 260 individual “Kin” landing pages and no auto-generated kin factory.</li>
            <li>No claim that this is the only correct correlation used by every scholar.</li>
            <li>No Haab’ month-as-zodiac “today” reading in the widget (see <Link href="/haab">/haab</Link> for structure).</li>
          </ul>

          <h2>Go deeper on today’s signature</h2>
          <PersonalReportPin
            placement="today_footer"
            chartCta
            trustNote="Checking today is free. Your free birth-chart result is also complete on its own (day sign, number, short reading). The optional $7 PDF adds deeper chapters on relationships, work, stress, decisions, and a seven-day practice—same GMT math, more pages."
          />

          <h2>FAQ</h2>
          <h3>How is today’s Mayan day sign calculated?</h3>
          <p>
            From your local Gregorian date, using GMT correlation <strong>584283</strong> and the same number/day-name cycles as the birth calculator. Details: <Link href="/methodology">/methodology</Link>.
          </p>
          <h3>Does “today” use my timezone?</h3>
          <p>Yes—the widget follows your <strong>local civil date</strong>. Crossing local midnight can change the result.</p>
          <h3>How do I compare today’s sign with my birth sign?</h3>
          <p>
            Calculate your birth tone + Nawal on <Link href="/birth-chart">/birth-chart</Link>, then read today’s widget. Use the <Link href="/day-signs">day-sign</Link> and <Link href="/galactic-tones">tone</Link> pages for vocabulary; treat daily text as reflection, not prediction. The free chart is the $0 result; the optional personal PDF is <strong>$7</strong>.
          </p>
          <h3>Why does another “Mayan calendar today” site disagree?</h3>
          <p>
            It may use Dreamspell, another GMT constant (such as 584285), or a different local-date rule. Start with our <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell comparison</Link> and <Link href="/methodology">methodology</Link>.
          </p>
          <h3>Is the daily meaning a prophecy?</h3>
          <p>No. The calendar position is calculated; the prose is modern reflective writing for journaling—not medical, legal, or financial advice.</p>

          <h2>Sources</h2>
          <ol>
            <li>
              Mayan Astrology Calculator. “Calculation Methodology and Cultural Scope.” <Link href="/methodology">/methodology</Link> (GMT 584283, version <code>gmt584283-proleptic-gregorian-v1</code>).
            </li>
            <li>
              Dreamspell vs the traditional count used on this site: <Link href="/dreamspell-vs-traditional-maya-calendar">/dreamspell-vs-traditional-maya-calendar</Link>.
            </li>
          </ol>
        </article>
      </main>
    </div>
  );
}
