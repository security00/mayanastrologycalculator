import type { Metadata } from 'next';
import Link from 'next/link';
import BirthDateCalculator from '../components/BirthDateCalculator';
import PageHero from '../components/PageHero';
import { GALACTIC_TONES } from '../lib/mayan-calculator';

const title = 'Nawal (Nahual) Calculator: Find Your Mayan Sign by Birth Date';
const description = 'Find your Mayan nawal (nahual) from your birth date: your day sign in the 260-day Tzolk\'in, with its number. Free, no sign-up. Traditional count, GMT 584283.';

const faqs = [
  {
    question: 'What is my Mayan nawal by date of birth?',
    answer: 'It is the day sign that fell on your birth date in the 260-day Tzolk\'in (Chol Q\'ij in K\'iche\'). Enter your date in the calculator above to get it, together with its number from 1 to 13.',
  },
  {
    question: 'Is nawal the same as nahual?',
    answer: 'They are related spellings. Nawal is used in K\'iche\' Maya writing about the calendar; nahual and nagual are Spanish forms that the Real Academia Española traces to the Nahuatl word nahualli. In Spanish they can also mean a protective animal spirit or a sorcerer, depending on the region.',
  },
  {
    question: 'Is my nahual an animal spirit?',
    answer: 'Some nawals point to animals, such as the deer, dog, monkey or jaguar; many do not. The "animal spirit" sense comes from popular use of the word nahual. This calculator gives you a calendar day sign, not an animal assignment.',
  },
  {
    question: 'How many nawals are there?',
    answer: 'Twenty. Each one combines with a number from 1 to 13, so every pairing returns after 260 days.',
  },
  {
    question: 'Why does another nawal calculator give me a different sign?',
    answer: 'It probably uses the Dreamspell count, which starts from a 1987 anchor and skips 29 February, or a correlation constant other than 584283.',
  },
  {
    question: 'Do I need my birth time?',
    answer: 'No. This calculator asks only for your birth date.',
  },
  {
    question: 'Is the result a prediction?',
    answer: 'No. The conversion is a fixed calendar calculation. The reading is reflective writing, not a forecast.',
  },
  {
    question: 'Does everyone with the same Mayan sign have the same reading?',
    answer: 'No. People who share a nawal can have different numbers, and the number changes the full reading.',
  },
];

const NAWALS = [
  { name: 'Imix', href: '/day-signs/imix', kiche: 'Imox', points: 'Waterlily glyph; the Water Serpent' },
  { name: "Ik'", href: '/day-signs/ik', kiche: "Iq'", points: 'Wind, air, breath' },
  { name: "Ak'bal", href: '/day-signs/akbal', kiche: "Aq'ab'al", points: `Night, darkness; in K'iche' also dawn` },
  { name: "K'an", href: '/day-signs/kan', kiche: "K'at", points: `Ripe maize, yellow; K'at "net"` },
  { name: 'Chikchan', href: '/day-signs/chikchan', kiche: 'Kan', points: 'Serpent' },
  { name: 'Kimi', href: '/day-signs/kimi', kiche: 'Kame', points: 'Death' },
  { name: "Manik'", href: '/day-signs/manik', kiche: 'Kej', points: 'Deer (glyph: a hand)' },
  { name: 'Lamat', href: '/day-signs/lamat', kiche: "Q'anil", points: `Venus, "star"; Q'anil "yellowness"` },
  { name: 'Muluk', href: '/day-signs/muluk', kiche: 'Toj', points: `Jar glyph; Toj "payment"` },
  { name: 'Ok', href: '/day-signs/ok', kiche: "Tz'i'", points: 'Dog' },
  { name: 'Chuwen', href: '/day-signs/chuwen', kiche: "B'atz'", points: 'Howler monkey; artisan' },
  { name: 'Eb', href: '/day-signs/eb', kiche: 'E', points: `Jawbone glyph; E "tooth"` },
  { name: 'Ben', href: '/day-signs/ben', kiche: 'Aj', points: `Young maize; Aj also "reed"` },
  { name: 'Ix', href: '/day-signs/ix', kiche: "I'x", points: 'Jaguar' },
  { name: 'Men', href: '/day-signs/men', kiche: "Tz'ikin", points: `Mythic bird; Men "make"` },
  { name: 'Kib', href: '/day-signs/kib', kiche: 'Ajmaq', points: `Wax; Ajmaq "sinner"; ancestors` },
  { name: 'Kaban', href: '/day-signs/kaban', kiche: "No'j", points: `Earth; No'j "thought"` },
  { name: "Etz'nab", href: '/day-signs/etznab', kiche: 'Tijax', points: 'Flint blade' },
  { name: 'Kawak', href: '/day-signs/kawak', kiche: 'Kawoq', points: 'Storm, thunder, rain' },
  { name: 'Ajaw', href: '/day-signs/ajaw', kiche: "Junajpu / Ajpu'", points: 'Lord' },
];

export const metadata: Metadata = {
  title,
  description,
  keywords: 'nawal calculator, nahual calculator, mayan sign calculator, mayan nawal, tzolkin day sign',
  alternates: { canonical: 'https://mayanastrologycalculator.com/mayan-sign-calculator' },
  openGraph: {
    title,
    description,
    url: 'https://mayanastrologycalculator.com/mayan-sign-calculator',
    siteName: 'Mayan Astrology Calculator',
    images: [{
      url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
      width: 1200,
      height: 630,
      alt: 'Nawal (Nahual) Calculator',
    }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function MayanSignCalculatorPage() {
  const tones = GALACTIC_TONES.slice(0, 4);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHero
          eyebrow="Nawal calculator"
          title="What Is My Mayan Nawal? Free Nawal (Nahual) Calculator by Birth Date"
          glyphs={['serpent', 'star', 'maize']}
        >
          Your Mayan nawal is the day sign of your birth date in the 260-day Maya count, called Tzolk&apos;in in Yucatec and Chol Q&apos;ij in K&apos;iche&apos;. Enter your birth date below to get your nawal and its number from 1 to 13, free and with no sign-up.
        </PageHero>

        <p className="mb-8 text-[var(--parchment-dim)] leading-relaxed">
          This calculator uses the traditional count (GMT correlation 584283). The reading that comes with it is reflective writing, not a prediction.
        </p>

        <p className="mb-8 text-sm text-[var(--parchment-dim)]">
          Prepared by the Mayan Astrology Calculator editors · Sources below · Reviewed 26 November 2026 · Calculation: gmt584283-proleptic-gregorian-v1
        </p>

        <div className="mb-12">
          <BirthDateCalculator
            title="Find Your Nawal by Birth Date"
            description="Enter your birth date. You'll see your nawal (day sign), its number from 1 to 13, and the Dreamspell tone name as a labeled alias."
            buttonLabel="Calculate my nawal"
            sampleCta={{
              href: '/sample-report',
              label: 'See a full sample report first →',
              helper: 'The free result comes first. The 11-page report is optional ($7).',
              placement: 'sign_calculator',
            }}
          />
        </div>

        <article className="content-prose">
          <h2>What is a nawal?</h2>
          <p>
            In the 260-day Maya calendar, each of the 20 named days is a nawal, often described as a day&apos;s guardian or patron energy.
          </p>
          <p>
            Your nawal is simply the one that fell on your birth date. Because the 20 days run alongside the numbers 1 to 13, a full birth signature is a number plus a nawal, such as 8 B&apos;atz&apos;. The same pairing comes back every 260 days.
          </p>
          <p>
            The calendar is not only historical. K&apos;iche&apos; daykeepers (Ajq&apos;ijab&apos;) in highland Guatemala still keep the Chol Q&apos;ij, and a group of them, Komon Tohil of Zunil, wrote the day meanings the Smithsonian publishes. This site is not a daykeeper and does not speak for that tradition; it converts dates and offers modern reflective writing.
          </p>

          <h2>Nawal, nahual, or nagual?</h2>
          <p>They are related spellings, and people search for all three.</p>
          <ul>
            <li><strong>Nawal</strong> is the spelling used in K&apos;iche&apos; Maya writing about the calendar, including the K&apos;iche&apos; daykeepers&apos; text published by the Smithsonian. This site uses <em>nawal</em> for your day sign.</li>
            <li><strong>Nahual</strong> and <strong>nagual</strong> are Spanish words. The Real Academia Española lists <em>nagual</em> as a variant of <em>nahual</em> and traces both to the Nahuatl word <em>nahualli</em>.</li>
          </ul>
          <p>
            The Spanish words do not always mean a calendar day. The RAE gives two senses for <em>nagual</em>: in popular mythology in El Salvador, Guatemala, Honduras and Mexico, a symbolic animal that represents a person&apos;s protective spirit; and, in some cultures, a sorcerer believed to have magical powers. Meanings vary by region and community, so when a calculator says &quot;your nahual,&quot; it is usually using the word for the calendar day sign.
          </p>

          <h2>Is my nawal an animal?</h2>
          <p>
            Not necessarily. Some day signs point to animals: Chikchan to a serpent, Manik&apos; to a deer, Ok to a dog, Chuwen to the howler monkey, Ix to the jaguar. Others point to wind, night, maize, death, a flint blade, a storm or a lord. A &quot;spirit animal&quot; reading is a popular interpretation of the word <em>nahual</em>, not something the calendar assigns to every day.
          </p>
          <p>
            If another site gave your sign an animal name such as &quot;Crocodile,&quot; &quot;Rabbit&quot; or &quot;Eagle,&quot; that label may come from Aztec day names or from Dreamspell rather than from the Maya name. The table below shows which is which.
          </p>

          <h2>Why another calculator shows a different nawal</h2>
          <p>Two settings change the answer:</p>
          <ol>
            <li>
              <strong>Dreamspell.</strong> Dreamspell is a modern system created by José and Lloydine Argüelles, begun in 1987. It fixes 26 July 1987 as Kin 34 and skips 29 February, so a Dreamspell &quot;kin&quot; usually lands on a different day from the traditional count. See <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs the traditional Maya count</Link>.
            </li>
            <li>
              <strong>Correlation constant.</strong> This site converts dates with the GMT correlation 584283 in the proleptic Gregorian calendar. Tools that use nearby variants such as 584285 or 584286 shift results by a day or two. See <Link href="/methodology">how we calculate</Link>.
            </li>
          </ol>
          <p>Neither calculator is &quot;broken&quot; when they disagree; they are counting differently.</p>

          <h2>The 20 nawals</h2>
          <p>
            Yucatec names are the ones most used in English; K&apos;iche&apos; names come from highland daykeeping. &quot;Points to&quot; summarizes what the name or glyph is linked to in the sources on each day-sign page. It is not a fixed translation, and scholars disagree on several.
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nawal (Yucatec)</th>
                <th>K&apos;iche&apos;</th>
                <th>Points to</th>
              </tr>
            </thead>
            <tbody>
              {NAWALS.map((sign, index) => (
                <tr key={sign.href}>
                  <td>{index + 1}</td>
                  <td><Link href={sign.href}>{sign.name}</Link></td>
                  <td>{sign.kiche}</td>
                  <td>{sign.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Full list with common online labels and Dreamspell aliases: <Link href="/day-signs">The 20 Maya Day Signs</Link>.
          </p>

          <h2>What your result includes</h2>
          <p>After you calculate, the result page shows:</p>
          <ul>
            <li>The birth date you entered, as day/month/year.</li>
            <li>One heading with your number from 1 to 13 and the nawal name used on that page.</li>
            <li>A line under the heading with that sign&apos;s Spanish word and a second spelling. The result does not label those two words as Yucatec or K&apos;iche&apos;.</li>
            <li>A link to the matching <Link href="/day-signs">day-sign page</Link>.</li>
            <li>Color, labeled &quot;Dreamspell color&quot;.</li>
            <li>Element, labeled &quot;modern convention&quot;.</li>
            <li>Direction.</li>
            <li>The number again, with its Dreamspell name labeled &quot;Dreamspell name&quot;, a short meaning, and keywords.</li>
            <li>The nawal&apos;s meaning and a list of key characteristics.</li>
            <li>A longer &quot;Your Complete Profile&quot; passage built from those same fields.</li>
          </ul>
          <p>
            Names such as &quot;Magnetic&quot; or &quot;Cosmic&quot; come from Dreamspell, a modern system, and the result marks them as a Dreamspell name. See <Link href="/galactic-tones">the 13 numbers</Link>.
          </p>
          <p>
            If the result shows an element such as fire or water, it is already marked &quot;modern convention&quot;: the day-sign guide found no traditional source for it. Direction is shown as a label on the sign. Neither label is a forecast.
          </p>
          <p>
            The number names below come from Dreamspell (modern, 1987), not from Maya sources. The numbers themselves are traditional.
          </p>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {tones.map((tone) => (
              <article key={tone.number} className="panel rounded-2xl p-5">
                <h3 className="text-xl font-display text-[var(--parchment)] mb-2">
                  Number {tone.number} · Dreamspell name: {tone.name}
                </h3>
                <p className="text-[var(--parchment-dim)]">{tone.meaning}</p>
              </article>
            ))}
          </div>
          <p>
            <Link href="/galactic-tones">Read all 13 numbers</Link>
          </p>

          <h2>How to read your result</h2>
          <p>
            Start with your nawal: open its day-sign page to see what the name and glyph point to, and how communities have used the day. Then read your number. If you want everything in one place, the 11-page personal report ($7, one-time) puts your nawal and number together; you can <Link href="/sample-report">see the full sample report first</Link>.
          </p>
          <p>
            Comparing two people? Try the <Link href="/compatibility">compatibility calculator</Link>. For the wider chart, see the <Link href="/birth-chart">Mayan birth chart</Link>.
          </p>

          <h2>What this page does and doesn&apos;t claim</h2>
          <p>
            The date conversion is reproducible: the same birth date always gives the same nawal and number under GMT 584283. The meanings people attach to a nawal vary by period, language and community, and a website cannot stand in for a trained daykeeper. Our readings are modern reflective writing. They are not predictions, and not medical, psychological, legal or financial advice.
          </p>

          <h2>FAQ</h2>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

          <h2>Sources</h2>
          <ol>
            <li>
              Smithsonian National Museum of the American Indian. <em>The Maya Calendar System</em> (PDF).{' '}
              <a href="https://maya.nmai.si.edu/sites/default/files/resources/The%20Maya%20Calendar%20System.pdf" target="_blank" rel="noopener noreferrer">maya.nmai.si.edu</a>
            </li>
            <li>
              Group of K&apos;iche&apos; Day Keepers Komon Tohil, Zunil. <em>The Meaning of the Days in the Maya Sacred Calendar</em>, published by Smithsonian NMAI (PDF).{' '}
              <a href="https://maya.nmai.si.edu/sites/default/files/resources/The%20Meaning%20of%20the%20Days%20in%20the%20Maya%20Sacred%20Calendar.pdf" target="_blank" rel="noopener noreferrer">maya.nmai.si.edu</a>
            </li>
            <li>
              Real Academia Española. <em>Diccionario de la lengua española</em>, &quot;nagual.&quot;{' '}
              <a href="https://dle.rae.es/nagual" target="_blank" rel="noopener noreferrer">dle.rae.es/nagual</a>
            </li>
            <li>
              Mayan Astrology Calculator. <Link href="/day-signs">The 20 Maya Day Signs</Link> (with scholarly sources per sign) · <Link href="/methodology">Calculation methodology</Link> · <Link href="/dreamspell-vs-traditional-maya-calendar">Dreamspell vs traditional</Link>
            </li>
          </ol>

          <h2>Calculate</h2>
          <p>
            <Link href="#calculator" className="btn-ember inline-block px-6 py-3 text-center no-underline">Calculate my nawal</Link>
          </p>
          <p>
            <Link href="/sample-report">See a full sample report first</Link>
          </p>
        </article>
      </main>
    </div>
  );
}
