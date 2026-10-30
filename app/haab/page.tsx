import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import { PersonalReportPin } from '../components/content/ReportCtaPin';
import { seoGraph } from '../lib/seo-schema';

const title = "What Is the Haab' Calendar? Maya 365-Day Year Explained";
const description = "The Haab' is the Maya 365-day count: 18 months of 20 days plus five Wayeb' days. How it differs from the Tzolk'in, year bearers, and Dreamspell 13 Moon.";
const path = '/haab';

const faqs = [
  {
    question: "How is Haab' different from the Tzolk'in?",
    answer: "The Haab' is a 365-day civil / solar count (18 × 20 + Wayeb'). The Tzolk'in is a 260-day sacred count (13 × 20). They run together; they measure different cycles. Personal readings on this site use the Tzolk'in.",
  },
  {
    question: "What is Wayeb'?",
    answer: "Wayeb' is the five-day closing period of the Haab' year. It is part of the solar count, not one of the 20 Tzolk'in day signs and not a Western-style zodiac sign.",
  },
  {
    question: "Does this site calculate my Haab' date today?",
    answer: "Not yet. This page explains the Haab'. The live calculators map Gregorian dates to the Tzolk'in (Nawal + tone) with GMT 584283. Use the today page or the birth chart calculator for those results.",
  },
  {
    question: "Are Pax, Sip, or Mol my Mayan zodiac sign?",
    answer: "Those names are Haab' month names in popular English lists—not the 20 Nawales used for birth signatures on this site. For a personal day sign, calculate your Tzolk'in combination.",
  },
  {
    question: "Is the Dreamspell 13 Moon calendar the same as Haab'?",
    answer: "No. Dreamspell / 13 Moon is a modern calendar with a different year structure and count rules. See the Dreamspell comparison page.",
  },
  {
    question: 'What is a year bearer?',
    answer: "The Tzolk'in day name associated with the start of a Haab' year in a given tradition. K'iche' highland practice and later Yucatec lists each name four bearers, and those sets are kept separate on the year bearer page.",
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

export default function HaabPage() {
  const schema = seoGraph({
    pageName: title,
    description,
    path,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: "Haab'", path },
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
          <span>Haab&apos;</span>
        </nav>

        <PageHero
          eyebrow="Educational · 365-day count"
          title="What Is the Haab'? The Maya 365-Day Solar Calendar"
          glyphs={['sun', 'maize', 'star']}
        >
          The Haab&apos; is the Maya 365-day civil / solar count: 18 named periods of 20 days plus a closing period of five days called Wayeb&apos;. It runs alongside the 260-day Tzolk&apos;in. This page explains that structure. It is not a Haab&apos; calculator.
        </PageHero>

        <article className="content-prose">
          <blockquote>
            <p>
              <strong>Quick answer.</strong> The <strong>Haab&apos;</strong> is the Maya <strong>365-day</strong> civil / solar count: <strong>18 named periods of 20 days</strong> plus a closing period of <strong>five days</strong> called <strong>Wayeb&apos;</strong>. It runs alongside the <strong>260-day Tzolk&apos;in</strong> (Chol Q&apos;ij). Together they form longer cycles such as the <strong>Calendar Round</strong>. Unlike the Gregorian year, the classic Haab&apos; description used in educational sources has <strong>no leap-day intercalation</strong> inside the 365-day count itself. [1][2][3]
            </p>
          </blockquote>

          <p>
            <em>Reviewed 30 October 2026 · This page is educational. Personal readings on this site use the traditional Tzolk&apos;in with GMT correlation 584283 (<code>gmt584283-proleptic-gregorian-v1</code>). See <Link href="/methodology">methodology</Link>.</em>
          </p>

          <aside className="rounded-2xl border border-[rgb(234_88_12/35%)] bg-[rgb(234_88_12/8%)] p-6 not-prose mb-8">
            <h2 className="font-display text-2xl text-[var(--parchment)] mb-3">No Haab&apos; calculator on this site yet</h2>
            <p className="text-[var(--parchment-dim)] leading-relaxed">
              <strong className="text-[var(--parchment)]">This site does not yet offer a Haab&apos; date calculator.</strong> Birth charts, today&apos;s reading, and paid reports currently focus on the Tzolk&apos;in day sign (Nawal) and number (tone). Treat this page as a definition and orientation layer. When you want a personal signature, use the Tzolk&apos;in tools linked below.
            </p>
          </aside>

          <h2>Haab&apos; structure: 18 × 20 + Wayeb&apos;</h2>
          <p>The Haab&apos; year has <strong>365 named positions</strong>:</p>
          <table>
            <thead>
              <tr>
                <th>Piece</th>
                <th>Length</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>18 “months” (uinal / winal-style periods)</td>
                <td>20 days each</td>
                <td>Named periods such as Pop, Wo, Sip … through Kumk&apos;u [1][2]</td>
              </tr>
              <tr>
                <td>Wayeb&apos;</td>
                <td>5 days</td>
                <td>Closing period at the end of the Haab&apos; year [1][2]</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>365</strong></td>
                <td>One Haab&apos; year</td>
              </tr>
            </tbody>
          </table>
          <p>
            A full Haab&apos; date pairs a <strong>day coefficient</strong> with a <strong>month name</strong> (for example, 14 Yax). Classic and colonial descriptions often treat the seating of a month as day 0 of that month—scholarship discusses “seating” vs numbered days carefully. [2] For this educational page, the key point is the <strong>18 × 20 + 5</strong> arithmetic, not a claim that every community writes coefficients the same way.
          </p>

          <h2>The eighteen Haab&apos; periods (names at a glance)</h2>
          <p>
            Educational tables commonly list eighteen twenty-day periods with Yucatec names such as <strong>Pop, Wo, Sip, Sotz&apos;, Sek, Xul, Yaxk&apos;in, Mol, Ch&apos;en, Yax, Sak&apos;, Keh, Mak, K&apos;ank&apos;in, Muwan, Pax, K&apos;ayab&apos;, Kumk&apos;u</strong>, then <strong>Wayeb&apos;</strong>. Spellings vary by orthography (colonial vs revised). [1][2] This site does <strong>not</strong> publish nineteen thin month landing pages in this content wave, and it does <strong>not</strong> treat those names as Western-style zodiac personalities. If you need a personal reading today, stay with the Tzolk&apos;in tools—not a guessed Haab&apos; month from a fixed Gregorian date range (those fixed ranges drift because the classic Haab&apos; count described here has no leap-day intercalation). [1][3]
          </p>

          <h2>What is Wayeb&apos;?</h2>
          <p>
            <strong>Wayeb&apos;</strong> is the <strong>five-day</strong> closing period of the Haab&apos; year. Educational and ethnographic sources often describe it as a liminal or carefully observed stretch between solar years—not as a “Mayan zodiac sign” and not as a personality type in the way popular English sites sometimes misuse month names. [1] Practices and meanings vary by community and period. We are not daykeepers; we do not assign luck scores to Wayeb&apos; births.
          </p>
          <p>
            If you arrived here searching for “Pax,” “Sip,” “Mol,” or other month names as if they were your personal Mayan sign: those names belong to the <strong>Haab&apos;</strong>, not to the 20 day signs of the Tzolk&apos;in that this site uses for birth readings. Your personal Nawal still comes from the 260-day count.
          </p>

          <h2>Haab&apos; vs Tzolk&apos;in vs Long Count (short)</h2>
          <table>
            <thead>
              <tr>
                <th>System</th>
                <th>Length</th>
                <th>What it tracks on this site</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tzolk&apos;in / Chol Q&apos;ij</strong></td>
                <td>260 days (13 × 20)</td>
                <td><strong>Primary.</strong> Your birth Nawal + number; <Link href="/today">today</Link>; free and paid readings</td>
              </tr>
              <tr>
                <td><strong>Haab&apos;</strong></td>
                <td>365 days (18 × 20 + 5)</td>
                <td><strong>Educational only for now</strong> — no Haab&apos; tool in the product UI</td>
              </tr>
              <tr>
                <td><strong>Long Count</strong></td>
                <td>Continuous day count</td>
                <td>Not the focus of the consumer calculator</td>
              </tr>
              <tr>
                <td><strong>Calendar Round</strong></td>
                <td>~52 vague years (18,980 days)</td>
                <td>Tzolk&apos;in + Haab&apos; pairing before the same combination repeats [1][2]</td>
              </tr>
            </tbody>
          </table>
          <p>
            The Tzolk&apos;in answers “which day name and number?” The Haab&apos; answers “where are we in the solar / civil year of 365 named days?” They are complementary, not substitutes.
          </p>

          <h2>Year bearer (Mam / year lord) — teaser</h2>
          <p>
            A <strong>year bearer</strong> is the <strong>Tzolk&apos;in day name</strong> associated with the start of a Haab&apos; solar year—the day sign said to “carry” that year. Because 365 days shift against the 260-day count, only a <strong>small set of day names</strong> can serve as year bearers in a given tradition. Highland <strong>K&apos;iche&apos;</strong> practice commonly names four; later <strong>Yucatec</strong> lists often name a different four. Those systems must not be mixed as if they were identical. [4]
          </p>
          <p>
            → Full explainer: <Link href="/year-bearer">Maya Year Bearer Explained</Link>
          </p>

          <h2>Dreamspell “13 Moon” is not the Haab&apos;</h2>
          <p>
            Some modern sites call a 13 × 28 (+1) “13 Moon” year a Mayan solar calendar. <strong>Dreamspell / 13 Moon</strong> is a <strong>modern</strong> system (José and Lloydine Argüelles, from 1987; kit 1990). It is <strong>not</strong> the classic Haab&apos; of 18 × 20 + Wayeb&apos;. [5][6] If another site tied your “New Year” to 26 July, that is a Dreamspell / 13 Moon convention—not proof that Pop always starts on that Gregorian date.
          </p>
          <p>
            → Side-by-side comparison: <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs Traditional Maya Calendar</Link>
          </p>

          <h2>How this site uses (and does not use) Haab&apos;</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free Tzolk&apos;in birth chart</td>
                <td>Live — <Link href="/birth-chart">birth chart calculator</Link></td>
              </tr>
              <tr>
                <td>Today’s Tzolk&apos;in date</td>
                <td>Live — <Link href="/today">Mayan calendar today</Link></td>
              </tr>
              <tr>
                <td>Haab&apos; month / Wayeb&apos; converter</td>
                <td><strong>Not built yet</strong> — this page is educational</td>
              </tr>
              <tr>
                <td>Year bearer display</td>
                <td>Explained on <Link href="/year-bearer">/year-bearer</Link>; not a live year-bearer widget yet</td>
              </tr>
              <tr>
                <td>Paid personal PDF</td>
                <td>Optional — <strong>$7</strong>, one-time</td>
              </tr>
              <tr>
                <td>Paid pair PDF</td>
                <td>Optional — <strong>$12</strong>, one-time</td>
              </tr>
            </tbody>
          </table>
          <p>Honest product scope matters for trust: we will not pretend a Haab&apos; tool exists until engineering ships one.</p>

          <h2>Find your Tzolk&apos;in signature (what this site calculates)</h2>
          <p>
            Your personal “Mayan sign” on this site is still the <strong>260-day</strong> combination: one of <strong>20 day signs</strong> plus a number <strong>1–13</strong>. That is the chart we calculate with GMT <strong>584283</strong>.
          </p>
          <PersonalReportPin
            placement="haab_footer"
            chartCta
            trustNote="The free birth-chart result is complete on its own (day sign, number, and a short reading). The optional $7 PDF adds deeper chapters on relationships, work, stress, decisions, and a seven-day practice—same calendar math, more pages."
          />

          <h2>FAQ</h2>
          <h3>How is Haab&apos; different from the Tzolk&apos;in?</h3>
          <p>
            {faqs[0].answer} [1][2]
          </p>
          <h3>What is Wayeb&apos;?</h3>
          <p>{faqs[1].answer} [1]</p>
          <h3>Does this site calculate my Haab&apos; date today?</h3>
          <p>
            <strong>Not yet.</strong> This page explains the Haab&apos;. The live calculators map Gregorian dates to the <strong>Tzolk&apos;in</strong> (Nawal + tone) with GMT 584283. Use <Link href="/today">/today</Link> or <Link href="/birth-chart">/birth-chart</Link> for those results.
          </p>
          <h3>Are Pax, Sip, or Mol my “Mayan zodiac sign”?</h3>
          <p>{faqs[3].answer}</p>
          <h3>Is the Dreamspell 13 Moon calendar the same as Haab&apos;?</h3>
          <p>
            No. Dreamspell / 13 Moon is a modern calendar with a different year structure and count rules. See the <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell comparison page</Link>. [5][6]
          </p>
          <h3>What is a year bearer?</h3>
          <p>
            The Tzolk&apos;in day name associated with the start of a Haab&apos; year in a given tradition. Details and the two common sets of four names: <Link href="/year-bearer">/year-bearer</Link>.
          </p>

          <h2>Internal links</h2>
          <ul>
            <li><Link href="/today">Mayan calendar today</Link></li>
            <li><Link href="/birth-chart">Birth chart calculator</Link></li>
            <li><Link href="/year-bearer">Year bearer explained</Link></li>
            <li><Link href="/day-signs">20 day signs</Link></li>
            <li><Link href="/galactic-tones">13 Galactic Tones (numbers)</Link></li>
            <li><Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link></li>
            <li><Link href="/methodology">Methodology (GMT 584283)</Link></li>
            <li><Link href="/reports">Reports — $7 / $12</Link></li>
            <li><Link href="/sample-report">Sample personal report</Link></li>
            <li><Link href="/sample-compatibility-report">Sample pair report</Link></li>
            <li><Link href="/mayan-calendar-calculator">Mayan calendar calculator landing</Link></li>
          </ul>

          <h2>Sources</h2>
          <ol>
            <li>
              Smithsonian National Museum of the American Indian. “The Calendar System.” <em>Living Maya Time</em>.{' '}
              <a href="https://maya.nmai.si.edu/calendar/calendar-system" target="_blank" rel="noopener noreferrer">maya.nmai.si.edu/calendar/calendar-system</a>
            </li>
            <li>
              Kettunen, Harri, and Christophe Helmke. <em>Introduction to Maya Hieroglyphs</em>, 17th rev. ed. Wayeb, 2020, pp. 49, 58–59 (Haab&apos; / Calendar Round overview).{' '}
              <a href="https://www.mesoweb.org/resources/handbook/IMH2020.pdf" target="_blank" rel="noopener noreferrer">mesoweb.org/resources/handbook/IMH2020.pdf</a>
            </li>
            <li>
              Mayan Astrology Calculator. “Calculation Methodology and Cultural Scope.” <Link href="/methodology">mayanastrologycalculator.com/methodology</Link>
            </li>
            <li>
              For year-bearer naming systems and highland vs later Yucatec sets, see <Link href="/year-bearer">/year-bearer</Link> and Tedlock, Barbara. <em>Time and the Highland Maya</em>. University of New Mexico Press, 1982 (rev. 1992). This page does not quote page numbers for the Mam / year bearer discussion until those anchors are checked.
            </li>
            <li>
              “Dreamspell.” Wikipedia (dates of the system and 13 Moon structure; cites Argüelles &amp; Argüelles 1990).{' '}
              <a href="https://en.wikipedia.org/wiki/Dreamspell" target="_blank" rel="noopener noreferrer">en.wikipedia.org/wiki/Dreamspell</a>
            </li>
            <li>
              Foundation for the Law of Time. <em>Rinri Project Newsletter</em> and related materials on the modern count.{' '}
              <a href="https://www.lawoftime.org/pdfs/Rinri-II-2.1.pdf" target="_blank" rel="noopener noreferrer">lawoftime.org/pdfs/Rinri-II-2.1.pdf</a>
            </li>
          </ol>
          <p>
            <em>Prepared by the Mayan Astrology Calculator editors · Corrections: <Link href="/contact">contact page</Link> · No 260-kin factory pages</em>
          </p>
        </article>
      </main>
    </div>
  );
}
