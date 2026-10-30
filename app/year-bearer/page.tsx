import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import { PersonalReportPin } from '../components/content/ReportCtaPin';
import { seoGraph } from '../lib/seo-schema';

const title = 'What Is a Maya Year Bearer? (Mam / Year Lord)';
const description = "A Maya year bearer is the Tzolk'in day name that carries a Haab' year. K'iche' highland four (Kej, E, No'j, Iq') vs later Yucatec (Kan, Muluk, Ix, Kawak)—kept separate.";
const path = '/year-bearer';

const faqs = [
  {
    question: 'Is the year bearer the same as my birth day sign?',
    answer: "Only by coincidence. Your birth day sign is your personal Tzolk'in Nawal. The year bearer is the day name tied to the Haab' year's opening in a given tradition.",
  },
  {
    question: 'Why do sources list different sets of four year bearers?',
    answer: "Because traditions differ. This page keeps the K'iche' highland four (Kej, E, No'j, Iq') separate from the later Yucatec four (Kan, Muluk, Ix, Kawak). Mixing them into one universal list is a common web error.",
  },
  {
    question: "How does the year bearer relate to Wayeb' and the new year?",
    answer: "Wayeb' closes the Haab' year; the next year's opening coincides with a Tzolk'in day name that carries the year in that tradition. The Haab' page explains Wayeb' structure.",
  },
  {
    question: "Does this site tell me this year's bearer automatically?",
    answer: 'Not yet. There is no live year-bearer widget. Use this page for definitions; use the birth chart calculator for your personal Tzolk\'in signature.',
  },
  {
    question: 'Are year bearers used in the $7 or $12 reports?',
    answer: 'Current personal and pair PDFs focus on Tzolk\'in signatures (and modern reflective pair prose for the $12 report). They are not year-bearer oracles.',
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `https://mayanastrologycalculator.com${path}` },
  openGraph: {
    title,
    description,
    url: `https://mayanastrologycalculator.com${path}`,
    siteName: 'Mayan Astrology Calculator',
    type: 'article',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: title,
    }],
  },
};

export default function YearBearerPage() {
  const schema = seoGraph({
    pageName: title,
    description,
    path,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Year Bearer', path },
    ],
    faqs,
  });

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--parchment-dim)]">
          <Link href="/" className="link-gold">Home</Link>
          <span aria-hidden="true"> › </span>
          <span>Year Bearer</span>
        </nav>

        <PageHero
          eyebrow="Educational · year lord"
          title="Maya Year Bearer Explained: Which Day Sign Carries the Solar Year"
          glyphs={['sun', 'wind', 'obsidian']}
        >
          A year bearer is the Tzolk&apos;in day name tied to the opening of a Haab&apos; year. This page keeps the K&apos;iche&apos; four and the later Yucatec four in separate sections. It is not a live year-bearer calculator.
        </PageHero>

        <article className="content-prose">
          <blockquote>
            <p>
              <strong>Quick answer.</strong> A <strong>year bearer</strong> (often discussed with terms such as <strong>Mam</strong> / year lord in highland contexts) is the <strong>Tzolk&apos;in day name</strong> associated with the start of a <strong>Haab&apos;</strong> solar year—the day sign said to “carry” that year. Because <strong>365</strong> Haab&apos; days advance against the <strong>260-day</strong> count, only a <strong>small set of day names</strong> can serve as year bearers in a given tradition. <strong>K&apos;iche&apos; highland</strong> practice commonly names four: <strong>Kej, E, No&apos;j, Iq&apos;</strong>. Later <strong>Yucatec</strong> lists often name <strong>Kan, Muluk, Ix, Kawak</strong>. These systems must <strong>not</strong> be mixed in one sentence as if they were the same four names. [1][2][3]
            </p>
          </blockquote>
          <p>
            <em>Reviewed 30 October 2026 · Educational page. This site’s personal calculators use the Tzolk&apos;in with GMT <strong>584283</strong>. We do <strong>not</strong> yet display a live “current year bearer” widget.</em>
          </p>

          <aside className="rounded-2xl border border-[rgb(234_88_12/35%)] bg-[rgb(234_88_12/8%)] p-6 mb-8">
            <h2 className="!mt-0">No live year-bearer widget yet</h2>
            <p className="!mb-0">
              This page defines the year bearer and keeps two naming systems apart. It does <strong>not</strong> calculate “the year bearer for Gregorian year YYYY,” and it does not score romance or career from a bearer. Your personal birth signature stays on the <Link href="/birth-chart">Tzolk&apos;in birth chart</Link>.
            </p>
          </aside>

          <h2>Definition in plain language</h2>
          <p>Think of two clocks:</p>
          <ol>
            <li>The <strong>Haab&apos;</strong> marks a <strong>365-day</strong> civil / solar year (18 × 20 + Wayeb&apos;). See <Link href="/haab">/haab</Link>.</li>
            <li>The <strong>Tzolk&apos;in</strong> marks a <strong>260-day</strong> cycle of named days.</li>
          </ol>
          <p>
            When a new Haab&apos; year begins, it coincides with some Tzolk&apos;in day name. That coinciding name is the <strong>year bearer</strong> for that solar year in the tradition you are reading. Over successive years the bearer advances through a <strong>closed set</strong> of names—not through all twenty Nawales.
          </p>
          <p>
            <strong>Your personal birth day sign is not automatically the year bearer.</strong> Your Nawal is the Tzolk&apos;in day of your birth date. The year bearer names the day sign tied to the <strong>solar year’s</strong> opening in that tradition. They coincide only when your birth signature happens to match that year’s bearer—an occasional overlap, not a rule.
          </p>

          <h2>Why only a few day names? (shift math, no mystique)</h2>
          <p>
            A Haab&apos; year has <strong>365</strong> days. The Tzolk&apos;in has <strong>20</strong> day names.
            <br />
            365 ÷ 20 = <strong>18</strong> full cycles of day names, with <strong>5</strong> days left over (365 = 18×20 + 5).
          </p>
          <p>
            So each new Haab&apos; year begins <strong>five day-name steps</strong> later in the 20-day sequence than the previous year’s opening (modulo 20). Starting from an allowed opener and stepping by five repeatedly yields a <strong>cycle of four</strong> day names—hence “four year bearers” in the systems described below. [2][3]
          </p>
          <p>This is calendar arithmetic, not a personality ranking of “better” signs.</p>

          <h2>K&apos;iche&apos; highland four (keep this list together)</h2>
          <p>
            In highland Guatemala, living calendar practice is often discussed with a set of four year-related day names commonly given in K&apos;iche&apos; as:
          </p>
          <table>
            <thead>
              <tr>
                <th>K&apos;iche&apos; name (common spelling)</th>
                <th>Yucatec day-sign page on this site (same 20-day slot)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Kej</strong></td>
                <td><Link href="/day-signs/manik">Manik&apos;</Link></td>
              </tr>
              <tr>
                <td><strong>E</strong></td>
                <td><Link href="/day-signs/eb">Eb</Link></td>
              </tr>
              <tr>
                <td><strong>No&apos;j</strong></td>
                <td><Link href="/day-signs/kaban">Kaban</Link></td>
              </tr>
              <tr>
                <td><strong>Iq&apos;</strong></td>
                <td><Link href="/day-signs/ik">Ik&apos;</Link></td>
              </tr>
            </tbody>
          </table>
          <p>
            These four correspond to the classic-style bearer set often summarized in English as <strong>Manik&apos;, Eb, Kab&apos;an, Ik&apos;</strong> (order and orthography vary by source). Highland practice continues to use a classic-style year-bearer system in ways that differ from later Yucatec documentary lists. [2][3]
          </p>
          <p>
            <strong>Do not</strong> replace these names with Kan / Muluk / Ix / Kawak in the same table. That is a different historical listing.
          </p>
          <p>
            Spellings with apostrophes (Iq&apos;, No&apos;j, and others) follow common modern orthographies; exact community spellings can differ. This page does not claim one official spelling set.
          </p>

          <h2>Later Yucatec four (separate section)</h2>
          <p>Later Yucatec documentary traditions often list a different four year bearers:</p>
          <table>
            <thead>
              <tr>
                <th>Yucatec name</th>
                <th>Day-sign page on this site</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Kan</strong> (K&apos;an)</td>
                <td><Link href="/day-signs/kan">Kan</Link></td>
              </tr>
              <tr>
                <td><strong>Muluk</strong></td>
                <td><Link href="/day-signs/muluk">Muluk</Link></td>
              </tr>
              <tr>
                <td><strong>Ix</strong></td>
                <td><Link href="/day-signs/ix">Ix</Link></td>
              </tr>
              <tr>
                <td><strong>Kawak</strong></td>
                <td><Link href="/day-signs/kawak">Kawak</Link></td>
              </tr>
            </tbody>
          </table>
          <p>
            Scholarship commonly associates shifts in which Tzolk&apos;in names coincide with the seating / early days of <strong>Pop</strong> with changes across Classic centers, Campeche traditions, and late Postclassic Yucatán. [3] For readers: <strong>two naming systems exist</strong>; pick the tradition a source is actually using before comparing websites.
          </p>

          <h2>What this site will and will not show</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Explain year bearer + both fours</td>
                <td><strong>This page</strong></td>
              </tr>
              <tr>
                <td>Explain Haab&apos; structure</td>
                <td><Link href="/haab">/haab</Link></td>
              </tr>
              <tr>
                <td>Live “year bearer for Gregorian year YYYY” tool</td>
                <td><strong>Not built yet</strong></td>
              </tr>
              <tr>
                <td>Personal Tzolk&apos;in birth signature</td>
                <td>Live — <Link href="/birth-chart">/birth-chart</Link></td>
              </tr>
              <tr>
                <td>Today’s Tzolk&apos;in date</td>
                <td>Live — <Link href="/today">/today</Link></td>
              </tr>
            </tbody>
          </table>
          <p>
            We will not invent a year-bearer score for romance or career. Compatibility on this site is a <strong>modern reflective</strong> pair reading of two birth signatures—not a Mam-matching rite. See <Link href="/compatibility">/compatibility</Link>.
          </p>

          <h2>How year bearer relates to Wayeb&apos; and the new year</h2>
          <p>
            Wayeb&apos; is the <strong>five-day</strong> closing stretch of the Haab&apos; year. The transition into the next Haab&apos; year (often discussed around the seating of <strong>Pop</strong> in Yucatec naming) is where year-bearer talk becomes concrete: which Tzolk&apos;in day name stands at the solar year’s opening. Details of ritual observance belong to living communities and daykeepers—not to a web calculator. [1][2]
          </p>
          <p>
            Dreamspell / <strong>13 Moon</strong> “Day Out of Time” and a 26 July year cue are <strong>modern</strong> conventions. They are not a substitute for Haab&apos; year-bearer teaching. See <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link>.
          </p>

          <h2>Find your personal day sign (Tzolk&apos;in)</h2>
          <p>If you came here asking “what is my year bearer?” and what you actually need is <strong>your birth Nawal</strong>, start here:</p>
          <PersonalReportPin
            placement="year_bearer_footer"
            chartCta
            trustNote="Your free result already includes day sign, number, and a short reading. The optional $7 11-page PDF adds deeper chapters (relationships, work, stress, decisions, seven-day practice)—it does not change the GMT calendar math."
          />

          <h2>FAQ</h2>
          <h3>Is the year bearer the same as my birth day sign?</h3>
          <p>{faqs[0].answer}</p>
          <h3>Why do sources list different sets of four year bearers?</h3>
          <p>
            Because traditions differ. This page keeps <strong>K&apos;iche&apos; highland</strong> four (<strong>Kej, E, No&apos;j, Iq&apos;</strong>) separate from later <strong>Yucatec</strong> four (<strong>Kan, Muluk, Ix, Kawak</strong>). Mixing them into one “universal” list is a common web error. [2][3]
          </p>
          <h3>How does the year bearer relate to Wayeb&apos; and the new year?</h3>
          <p>
            Wayeb&apos; closes the Haab&apos; year; the next year’s opening coincides with a Tzolk&apos;in day name that “carries” the year in that tradition. See <Link href="/haab">/haab</Link> for Wayeb&apos; structure.
          </p>
          <h3>Does this site tell me this year’s bearer automatically?</h3>
          <p>
            <strong>Not yet.</strong> There is no live year-bearer widget. Use this page for definitions; use <Link href="/birth-chart">/birth-chart</Link> for your personal Tzolk&apos;in signature.
          </p>
          <h3>Are year bearers used in the $7 or $12 reports?</h3>
          <p>
            Current personal and pair PDFs focus on <strong>Tzolk&apos;in</strong> signatures (and modern reflective pair prose for the $12 report). They are not year-bearer oracles. Prices: personal <strong>$7</strong> and pair <strong>$12</strong> on <Link href="/reports">/reports</Link>.
          </p>

          <h2>Internal links</h2>
          <ul>
            <li><Link href="/haab">What is the Haab&apos;?</Link></li>
            <li><Link href="/day-signs">20 day signs hub</Link></li>
            <li>
              Bearer-related sign pages:{' '}
              <Link href="/day-signs/manik">Manik&apos;</Link>
              {' · '}
              <Link href="/day-signs/eb">Eb</Link>
              {' · '}
              <Link href="/day-signs/kaban">Kaban</Link>
              {' · '}
              <Link href="/day-signs/ik">Ik&apos;</Link>
              {' · '}
              <Link href="/day-signs/kan">Kan</Link>
              {' · '}
              <Link href="/day-signs/muluk">Muluk</Link>
              {' · '}
              <Link href="/day-signs/ix">Ix</Link>
              {' · '}
              <Link href="/day-signs/kawak">Kawak</Link>
            </li>
            <li><Link href="/today">Today’s Tzolk&apos;in date</Link></li>
            <li><Link href="/birth-chart">Birth chart calculator</Link></li>
            <li><Link href="/methodology">Methodology</Link></li>
            <li><Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link></li>
            <li><Link href="/reports">Reports — $7 / $12</Link></li>
            <li><Link href="/sample-report">Sample personal report</Link></li>
            <li><Link href="/sample-compatibility-report">Sample pair report</Link></li>
          </ul>

          <h2>Sources</h2>
          <ol>
            <li>
              Smithsonian National Museum of the American Indian. “The Calendar System.” <em>Living Maya Time</em>.{' '}
              <a href="https://maya.nmai.si.edu/calendar/calendar-system" target="_blank" rel="noopener noreferrer">maya.nmai.si.edu/calendar/calendar-system</a>
            </li>
            <li>
              Tedlock, Barbara. <em>Time and the Highland Maya</em>. University of New Mexico Press, 1982 (rev. 1992). Year bearer / Mam discussion. Page numbers are not quoted on this page until those anchors are checked against the book.
            </li>
            <li>
              Overview of Classic vs later Yucatec year-bearer sets as summarized in standard Maya calendar handbooks (shifts tied to Pop seating / early Pop days). Cross-check with Kettunen &amp; Helmke 2020 Haab&apos; / Calendar Round pages before adding any site-specific “current year” table.{' '}
              <a href="https://www.mesoweb.org/resources/handbook/IMH2020.pdf" target="_blank" rel="noopener noreferrer">mesoweb.org/resources/handbook/IMH2020.pdf</a>
            </li>
            <li>
              Mayan Astrology Calculator. “Calculation Methodology and Cultural Scope.” <Link href="/methodology">mayanastrologycalculator.com/methodology</Link>
            </li>
            <li>
              “Dreamspell.” Wikipedia / Law of Time materials — for the modern 13 Moon contrast only.{' '}
              <a href="https://en.wikipedia.org/wiki/Dreamspell" target="_blank" rel="noopener noreferrer">en.wikipedia.org/wiki/Dreamspell</a>
            </li>
          </ol>
          <p>
            <em>Prepared by the Mayan Astrology Calculator editors · No 260-kin factory · Corrections: <Link href="/contact">contact page</Link></em>
          </p>
        </article>
      </main>
    </div>
  );
}
