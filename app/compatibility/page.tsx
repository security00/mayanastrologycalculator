import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import CompatibilityTool from './CompatibilityTool';
import PageHero from '../components/PageHero';
import { PairReportPin } from '../components/content/ReportCtaPin';
import { TrackedSampleLink } from '../components/content/SampleAction';
import { seoGraph } from '../lib/seo-schema';

const title = 'Mayan Astrology Compatibility: How Do Two Day Signs Compare?';
const description = 'Compare two Mayan birth signs with a free reflective pair reading. See what tone rhythm and Nawal chemistry mean here—and what the optional $12 pair PDF adds.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'mayan compatibility calculator, mayan astrology compatibility, mayan sign compatibility, mayan zodiac compatibility, tzolkin compatibility',
  alternates: { canonical: 'https://mayanastrologycalculator.com/compatibility' },
  openGraph: {
    title,
    description,
    url: 'https://mayanastrologycalculator.com/compatibility',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'Mayan Compatibility Calculator',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Is Mayan sign compatibility traditional or modern?',
    answer: 'The calendar conversion uses the traditional 260-day count (GMT 584283). The compatibility score and pair prose are modern reflective writing—not a documented historical matching rite.',
  },
  {
    question: 'What do tone rhythm and Nawal chemistry mean here?',
    answer: 'Tone rhythm compares the two numbers (1–13). Nawal chemistry compares the two day signs and related modern affinity fields. Together they frame a conversation, not a destiny score.',
  },
  {
    question: 'Can two people with the same day sign still have friction?',
    answer: 'Yes. Shared Nawales can still differ in tone, life stage, and repair habits. Sameness is not automatic harmony.',
  },
  {
    question: 'Does a low score mean we are a bad match?',
    answer: 'No. Treat the percentage as a starting angle for conversation about pacing and repair—not a verdict.',
  },
  {
    question: 'Why does another site give a different score or sign?',
    answer: 'They may use Dreamspell, another GMT constant (such as 584285), or a different modern scoring rule. Compare counts on the Dreamspell page and methodology.',
  },
  {
    question: 'Can I see what the $12 report looks like before paying?',
    answer: 'Yes. Read the anonymous sample pair report (11 Ik’ + 4 Ajaw), then run two dates here.',
  },
  {
    question: 'Do you use a historical “Rule of 14” or ancient marriage chart?',
    answer: 'No. We do not present Rule of 14 or an ancient marriage matrix as historical fact. Our pair score is a labeled modern synthesis.',
  },
];

export default function CompatibilityPage() {
  const schema = seoGraph({
    pageName: title,
    description,
    path: '/compatibility',
    faqs,
    extra: [{
      '@type': 'WebApplication',
      name: 'Mayan Compatibility Calculator',
      url: 'https://mayanastrologycalculator.com/compatibility',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web Browser',
      description: "A free reflective tool that compares two Tzolk'in birth signs, Galactic Tones, Nawals, elements, and directions.",
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    }],
  });

  return (
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="Two signatures, one rhythm"
          title="Mayan Compatibility Calculator — Compare Two Birth Signs"
          glyphs={['water', 'star', 'obsidian']}
        >
          Quick answer. A Mayan compatibility reading on this site compares two people by Nawal day sign and Galactic Tone (and related modern fields such as element / direction distance). It produces a reflective pair summary for romance, friendship, work, or general context. It is not a documented historical Maya matching formula and does not replace guidance from a Maya daykeeper (Ajq’ij) or cultural practitioner.
        </PageHero>

        <aside className="mb-6 rounded-2xl border border-[rgb(234_88_12/35%)] bg-[rgb(234_88_12/8%)] p-5 md:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--gold-bright)] mb-2">Disclaimer</p>
          <p className="text-[var(--parchment)] leading-relaxed">
            This compatibility score is a <strong>modern interpretive feature</strong>, not a documented historical Maya matching formula. Living Maya traditions are diverse. Use the reading as a conversation prompt—not a verdict about fate, marriage, or “avoid this sign.”
          </p>
        </aside>
        <p className="mb-8 text-sm text-[var(--parchment-dim)]">
          Reviewed 30 October 2026 · Calculation gmt584283-proleptic-gregorian-v1
        </p>

        <section className="mb-8 content-prose max-w-3xl">
          <h2>How to use the calculator</h2>
          <ol>
            <li>Enter <strong>two birth dates</strong> (Gregorian).</li>
            <li>Choose a relationship lens if offered (romantic / friendship / work / general)—this changes <strong>wording</strong>, not the underlying modern score number.</li>
            <li>Read the free pair summary: tone rhythm, Nawal chemistry, and reflective prompts.</li>
            <li>Optionally open each person’s full day-sign and tone pages.</li>
            <li>If you want the long PDF, read the sample first, then purchase the <strong>$12</strong> pair report.</li>
          </ol>
        </section>

        <Suspense fallback={<p className="mb-8 text-sm text-[var(--parchment-dim)]">Loading the pair calculator…</p>}>
          <CompatibilityTool />
        </Suspense>

        <article className="content-prose mt-12">
          <h2>What we compare</h2>
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>What it means here</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Galactic Tone (1–13)</strong></td>
                <td>Each person’s number / rhythm—how they tend to begin, challenge, serve, release, or complete. Similar tones can feel familiar; different tones can create useful contrast.</td>
              </tr>
              <tr>
                <td><strong>Nawal day sign</strong></td>
                <td>Each person’s symbolic center among the 20 day signs.</td>
              </tr>
              <tr>
                <td><strong>Distance on the 20-day ring</strong></td>
                <td>How far apart the two Nawales sit in this site’s modern map.</td>
              </tr>
              <tr>
                <td><strong>Modern element / direction / color affinities</strong></td>
                <td><strong>Site conventions</strong> used in scoring—labeled modern, not Classic inscriptions.</td>
              </tr>
            </tbody>
          </table>
          <p>
            Date conversion uses the traditional count with GMT <strong>584283</strong>. The <strong>score and longer pair prose</strong> are modern reflective writing. Method overview: <Link href="/methodology">/methodology</Link>.
          </p>

          <h3>How is this score calculated?</h3>
          <p>
            The free pair reading and the optional <strong>$12</strong> report use the same modern scoring layer. It is <strong>not</strong> a documented historical Maya matching formula.
          </p>
          <p>
            We convert each birth date with the traditional count (GMT correlation <strong>584283</strong>, calculation version <code>gmt584283-proleptic-gregorian-v1</code>), then combine:
          </p>
          <ol>
            <li>Distance between the two <strong>numbers</strong> (1–13)</li>
            <li>Distance between the two <strong>day signs</strong> on the 20-day ring (shortest arc)</li>
            <li>Modern <strong>element</strong> affinity (same / complementary / opposite) — site convention</li>
            <li>Modern <strong>direction</strong> affinity — site convention</li>
            <li>Modern <strong>color</strong> affinity — site convention</li>
          </ol>
          <p>
            The percentage is clamped to a readable band for conversation prompts. Changing the relationship lens changes the <strong>wording</strong>, not the number. Raw internal coefficients stay off this page.
          </p>
          <p>
            Living Maya daykeeping traditions are diverse. This tool does not replace guidance from a Maya daykeeper (Ajq’ij) or cultural practitioner. Full method: <Link href="/methodology">/methodology</Link>.
          </p>

          <h2>Tone rhythm and Nawal chemistry (plain language)</h2>
          <p>
            <strong>Tone rhythm</strong> asks whether two people move through stress and growth at a similar pace. <strong>Nawal chemistry</strong> asks what symbolic themes sit at each person’s center—and where those themes complement or rub. Neither layer is a historical marriage table. Prefer prompts such as “Where do we repair?” over “You are incompatible forever.”
          </p>
          <p>
            Same day sign does <strong>not</strong> guarantee ease: two people can share a Nawal and still clash on tone, timing, or life context. Different Nawales are not a ban—they are a map of difference. Galactic Tones show how each person moves through challenge, growth, service, release, and completion. Similar tones can feel familiar; different tones can create useful contrast. Nawals describe the symbolic center of each birth sign, including shared instincts and complementary strengths.
          </p>

          <h2>Context modes (romantic / friendship / work)</h2>
          <p>
            The lens you pick should change examples and scripts, not invent a second calendar. A work reading may emphasize decision pacing; a friendship reading may emphasize repair language; a romantic reading may emphasize emotional expectations. The general lens keeps the same score with broader wording. All remain reflective. Compatibility is a reflection tool, not a fixed judgment. Use the reading to start a better conversation about pacing, communication, and emotional expectations.
          </p>

          <h2>What the free reading includes vs the $12 PDF</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Free pair reading</th>
                <th>Optional pair PDF (<strong>$12</strong>, one-time)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Two Tzolk’in signatures</td>
                <td>Yes</td>
                <td>Yes, expanded</td>
              </tr>
              <tr>
                <td>Modern score + short prose</td>
                <td>Yes</td>
                <td>Yes, with longer chapters</td>
              </tr>
              <tr>
                <td>Friction &amp; repair / decision filter / seven-day practice</td>
                <td>Short or absent</td>
                <td>Included in the 11-page report</td>
              </tr>
              <tr>
                <td>Sample before pay</td>
                <td>—</td>
                <td><Link href="/sample-compatibility-report">Sample pair report</Link></td>
              </tr>
            </tbody>
          </table>
          <PairReportPin
            placement="compatibility_explainer"
            helper=""
            trustNote="The free pair reading stays useful on its own. The $12 PDF adds length and structure (pair map, friction & repair, decision filter, seven-day practice)—same modern score layer, more pages. Delivery is emailed after Stripe checkout; see the reports page."
          />
          <p>
            Each person may also want a personal deep-dive:{' '}
            <Link href="/reports">Get the 11-page report — $7</Link>
            {' · '}
            <TrackedSampleLink href="/sample-report" placement="compatibility_personal_sample">
              See a full sample report first →
            </TrackedSampleLink>
          </p>

          <h2>Read each chart before you compare</h2>
          <p>
            <Link href="/birth-chart">Create a free birth chart →</Link>
          </p>
          <p>
            Explore <Link href="/day-signs">/day-signs</Link> and <Link href="/galactic-tones">/galactic-tones</Link>.
            If another site’s kin disagrees, read <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link>.
            The Mayan astrology guide is at <Link href="/guide">/guide</Link>. There is no separate <code>/compatibility/chart</code> page on this site, so this explainer does not link one.
          </p>

          <h2>What the free pair result shows</h2>
          <p>
            After you generate a reading, the calculator stays on the page and writes a summary you can use even if you never buy a longer report. The free result is meant to be complete enough for a conversation:
          </p>
          <ul>
            <li>Both Tzolk’in signatures, with each person’s tone, Nawal, and the modern element, direction, and color labels this site already shows.</li>
            <li>A percentage and a short relationship theme. Treat the percentage as a starting angle for pacing and repair, not a verdict about marriage, friendship, or work.</li>
            <li>Tone rhythm and Nawal chemistry in plain language, including where the two numbers feel familiar and where the two day signs rub.</li>
            <li>A short list of what this pair is good at, and where friction usually shows up.</li>
            <li>A communication pattern and three reflection questions you can actually ask.</li>
          </ul>
          <p>
            Romantic, friendship, work, and general lenses change the examples and scripts. They do not change the modern score and they do not invent a second calendar. The longer chapters—a pair map, friction and repair, a decision filter, and a seven-day practice—are what the optional <strong>$12</strong> PDF adds. Read the <Link href="/sample-compatibility-report">sample pair report</Link> before you pay. Each person can still <Link href="/birth-chart">create a free birth chart</Link>, which is complete on its own; the personal 11-page PDF is a separate <strong>$7</strong> purchase with its own <Link href="/sample-report">sample report</Link>.
          </p>
          <p>
            If two dates share a Nawal, do not read that as automatic harmony. Shared day signs can still differ in tone, life stage, and repair habits. If the Nawales differ, do not read that as a ban. Difference is the map. The same caution applies when another website prints a different kin: check whether it is using Dreamspell or another correlation before you treat either result as a mistake. This page does not publish a second Dreamspell score.
          </p>

          <h2>FAQ</h2>
          {faqs.map((item) => (
            <section key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </section>
          ))}
          <p>
            Sample before you pay: <Link href="/sample-compatibility-report">sample pair report</Link> (11 Ik’ + 4 Ajaw).
            Birth charts: <Link href="/birth-chart">/birth-chart</Link>.
            Prices stay on the label: pair <strong>$12</strong>, personal <strong>$7</strong>, both from <Link href="/reports">/reports</Link>.
          </p>
        </article>
      </main>
    </div>
  );
}
