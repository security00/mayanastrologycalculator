import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sample Personalized Mayan Birth Chart Report',
  description: 'Preview the structure and level of detail in a personalized Mayan birth chart PDF report.',
  robots: {
    index: false,
    follow: false,
  },
};

const contents = [
  'Your Mayan Signature',
  'Your Nawal in Depth',
  'Your Galactic Tone in Depth',
  'Integrated Sign-and-Tone Reading',
  'Relationships and Communication',
  'Work, Creativity, and Purpose',
  'Reflection Prompts and 7-Day Integration',
];

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-stone-100 py-10 md:py-16">
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-gray-700">
          <p className="font-semibold text-gray-950">Anonymous sample preview</p>
          <p className="mt-1">
            This example uses the fictional sample signature 1 Manik. A purchased report follows the same
            structure but is prepared for the birth date and signature submitted at checkout.
          </p>
        </section>

        <article className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <header className="bg-gradient-to-br from-amber-950 via-orange-900 to-red-900 px-7 py-14 text-center text-white md:px-14 md:py-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
              Personalized Mayan Birth Chart
            </p>
            <h1 className="text-5xl font-bold md:text-7xl">1 Manik</h1>
            <p className="mt-4 text-xl text-amber-100">The Magnetic Deer</p>
            <div className="mx-auto mt-9 grid max-w-xl grid-cols-2 gap-3 text-left text-sm md:grid-cols-4">
              {[
                ['Nawal', 'Manik'],
                ['Tone', '1 · Magnetic'],
                ['Element', 'Earth'],
                ['Direction', 'West'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="text-amber-200">{label}</p>
                  <p className="mt-1 font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </header>

          <div className="space-y-12 px-6 py-10 md:px-14 md:py-14">
            <section className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">At a glance</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-950">What the full PDF contains</h2>
              </div>
              <ol className="grid grid-cols-1 gap-3 text-gray-700 sm:grid-cols-2">
                {contents.map((item, index) => (
                  <li key={item} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <span className="mr-2 font-bold text-orange-700">{String(index + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>

            <hr className="border-stone-200" />

            <section>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">Sample section 01</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-950">Your Mayan Signature</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
                In this example, Manik contributes themes of grace, mediation, protection, and centered
                responsibility. Tone 1 adds the rhythm of initiation and gathering energy around a clear
                purpose. The longer report explores where those two patterns reinforce each other and where
                they can create tension.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <h3 className="text-xl font-bold text-gray-950">Core gifts</h3>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li>• Mediation and peacemaking</li>
                    <li>• Gentle, persistent leadership</li>
                    <li>• A strong instinct for fairness</li>
                    <li>• Calm presence in complex situations</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                  <h3 className="text-xl font-bold text-gray-950">Growth edges</h3>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li>• Avoiding conflict until pressure builds</li>
                    <li>• Quietly carrying too much responsibility</li>
                    <li>• Waiting for permission to lead</li>
                    <li>• Confusing peacekeeping with self-erasure</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-gray-950 p-7 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">Sample section 05</p>
              <h2 className="mt-2 text-3xl font-bold">Relationships and Communication</h2>
              <p className="mt-5 max-w-3xl leading-7 text-gray-200">
                The relationship section examines how the sample signature may give support, communicate
                needs, respond to tension, and maintain boundaries. It includes both supportive tendencies
                and patterns that may become overused.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-6">
                  <h3 className="font-bold text-amber-200">Reflective strength</h3>
                  <p className="mt-2 text-gray-200">Creating enough calm for an honest conversation to begin.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-6">
                  <h3 className="font-bold text-amber-200">Reflective question</h3>
                  <p className="mt-2 text-gray-200">Where would a direct request be healthier than silent support?</p>
                </div>
              </div>
            </section>

            <section>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">Sample section 07</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-950">Reflection and 7-Day Integration</h2>
              <p className="mt-4 max-w-3xl text-gray-700">
                Every report ends with questions and a short practice so the reading can be tested against
                lived experience rather than treated as a prediction.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  'Name one purpose you want to serve this week.',
                  'Notice where your body senses tension first.',
                  'Practice one honest sentence that preserves dignity.',
                  'Decline one responsibility that is not truly yours.',
                  'Offer support without taking control.',
                  'Reflect on where your presence created more harmony.',
                ].map((prompt, index) => (
                  <div key={prompt} className="rounded-xl border border-stone-200 p-5 text-gray-700">
                    <p className="text-sm font-bold text-orange-700">Day {index + 1}</p>
                    <p className="mt-2">{prompt}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm text-gray-700">
              <h2 className="font-bold text-gray-950">Methodology and scope</h2>
              <p className="mt-2">
                The Nawal and Galactic Tone are calculated deterministically from the submitted date. The
                longer passages are interpretive synthesis for reflection and self-discovery. They are not
                scientific findings or medical, legal, financial, or psychological advice.
              </p>
            </section>
          </div>
        </article>

        <section className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-gray-950">See the report written for your signature</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-700">
            Calculate your free Mayan result first. The report option will appear directly beneath your signature.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-gray-950 px-7 py-3.5 font-bold text-white hover:bg-gray-800"
          >
            Calculate my Mayan signature
          </Link>
        </section>
      </main>
    </div>
  );
}
