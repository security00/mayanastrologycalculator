'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateTzolkinDate, validateDate } from '../lib/mayan-calculator';
import {
  buildCompatibilityReading,
  parseCompatibilityContext,
  type CompatibilityContext,
} from '../lib/mayan-compatibility';
import CompatibilityUpgradeCard from '../components/CompatibilityUpgradeCard';
import GrecaBand from '../components/decor/GrecaBand';

type BirthDate = {
  day: string;
  month: string;
  year: string;
};

type ParsedBirthDate = {
  day: number;
  month: number;
  year: number;
};

const YEAR_OPTIONS = Array.from({ length: 100 }, (_, index) => String(2026 - index));
const DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => String(index + 1));

const months = [
  { value: '1', name: 'January' },
  { value: '2', name: 'February' },
  { value: '3', name: 'March' },
  { value: '4', name: 'April' },
  { value: '5', name: 'May' },
  { value: '6', name: 'June' },
  { value: '7', name: 'July' },
  { value: '8', name: 'August' },
  { value: '9', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' },
];

const CONTEXT_OPTIONS: { value: CompatibilityContext; label: string; hint: string }[] = [
  { value: 'romantic', label: 'Romantic', hint: 'Partners' },
  { value: 'friendship', label: 'Friendship', hint: 'Friends or family' },
  { value: 'work', label: 'Work', hint: 'Collaborators' },
  { value: 'general', label: 'General', hint: 'No specific role' },
];

const NAWAL_COLOR_DOTS: Record<string, string> = {
  red: 'bg-red-400',
  white: 'bg-stone-100',
  blue: 'bg-sky-400',
  yellow: 'bg-yellow-400',
};

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
};

function readSearchDate(prefix: string, search: string): BirthDate {
  const params = new URLSearchParams(search);
  return {
    day: params.get(`${prefix}day`) || '',
    month: params.get(`${prefix}month`) || '',
    year: params.get(`${prefix}year`) || '',
  };
}

function readSearchContext(search: string): CompatibilityContext | null {
  return parseCompatibilityContext(new URLSearchParams(search).get('context'));
}

function sameBirthDate(a: BirthDate, b: BirthDate) {
  return a.day === b.day && a.month === b.month && a.year === b.year;
}

function parseBirthDate(date: BirthDate) {
  return {
    day: Number(date.day),
    month: Number(date.month),
    year: Number(date.year),
  };
}

function calculateReading(date: BirthDate) {
  const parsed = parseBirthDate(date);

  if (!validateDate(parsed.day, parsed.month, parsed.year)) {
    return null;
  }

  return {
    reading: calculateTzolkinDate(new Date(parsed.year, parsed.month - 1, parsed.day)),
    date: parsed,
  };
}

function compatibilityPath(personA: ParsedBirthDate, personB: ParsedBirthDate, context: CompatibilityContext) {
  const params = new URLSearchParams({
    aday: String(personA.day),
    amonth: String(personA.month),
    ayear: String(personA.year),
    bday: String(personB.day),
    bmonth: String(personB.month),
    byear: String(personB.year),
    context,
  });
  return `/compatibility?${params.toString()}`;
}

function DateFields({
  label,
  value,
  onChange,
}: {
  label: string;
  value: BirthDate;
  onChange: (next: BirthDate) => void;
}) {
  const years = YEAR_OPTIONS;
  const days = DAY_OPTIONS;

  return (
    <fieldset className="panel rounded-2xl p-5">
      <legend className="text-lg font-bold text-[var(--parchment)] mb-4">{label}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-[var(--parchment-dim)] mb-2">Day</span>
          <select
            aria-label={`${label} day`}
            value={value.day}
            onChange={(event) => onChange({ ...value, day: event.target.value })}
            className="select-gold"
          >
            <option value="">Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-[var(--parchment-dim)] mb-2">Month</span>
          <select
            aria-label={`${label} month`}
            value={value.month}
            onChange={(event) => onChange({ ...value, month: event.target.value })}
            className="select-gold"
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>{month.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-[var(--parchment-dim)] mb-2">Year</span>
          <select
            aria-label={`${label} year`}
            value={value.year}
            onChange={(event) => onChange({ ...value, year: event.target.value })}
            className="select-gold"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>
    </fieldset>
  );
}

function SignatureCard({
  person,
  accent,
}: {
  person: ReturnType<typeof buildCompatibilityReading>['personA'];
  accent: 'gold' | 'jade';
}) {
  const frame = accent === 'jade'
    ? 'border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)]'
    : 'border-[var(--gold-line)] bg-[rgb(212_162_78/6%)]';
  const heading = accent === 'jade' ? 'text-jade' : 'text-gold-bright';

  return (
    <article className={`rounded-xl border p-5 ${frame}`}>
      <h3 className={`font-display text-2xl mb-2 ${heading}`}>{person.signature}</h3>
      <p className="text-[var(--parchment-dim)] mb-4">{person.nawalMeaning}</p>
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <span className="chip">
          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${NAWAL_COLOR_DOTS[person.color.toLowerCase()] ?? 'bg-stone-100'}`} />
          {person.color}
        </span>
        <span className="chip">{person.element}</span>
        <span className="chip chip-jade">{person.direction}</span>
      </div>
      <p className="text-sm text-[var(--parchment-dim)]">
        <span className="font-semibold text-[var(--parchment)]">Tone {person.toneNumber} {person.toneName}.</span>{' '}
        A {person.tone.pace} rhythm that is helped when they {person.tone.move}.
      </p>
      <p className="text-sm text-[var(--parchment-dim)] mt-3">
        <span className="font-semibold text-[var(--parchment)]">Often offers</span> {person.offer}.
      </p>
    </article>
  );
}

type SubmittedQuery = {
  personA: BirthDate;
  personB: BirthDate;
  context: CompatibilityContext;
};

function readQueryState(search: string) {
  const personA = readSearchDate('a', search);
  const personB = readSearchDate('b', search);
  const context = readSearchContext(search);
  const ready = Boolean(calculateReading(personA) && calculateReading(personB) && context);
  return {
    personA,
    personB,
    context,
    submitted: ready && context ? { personA, personB, context } : null,
  };
}

export default function CompatibilityTool() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryState = useMemo(() => readQueryState(searchParams.toString()), [searchParams]);
  const trackedResult = useRef('');
  const [personA, setPersonA] = useState<BirthDate>(queryState.personA);
  const [personB, setPersonB] = useState<BirthDate>(queryState.personB);
  const [context, setContext] = useState<CompatibilityContext | null>(queryState.context);
  const [draftSubmitted, setDraftSubmitted] = useState<SubmittedQuery | null>(queryState.submitted);
  const [error, setError] = useState('');
  const submitted = draftSubmitted ?? queryState.submitted;

  const calculatedA = useMemo(() => calculateReading(personA), [personA]);
  const calculatedB = useMemo(() => calculateReading(personB), [personB]);
  const submittedA = useMemo(() => submitted ? calculateReading(submitted.personA) : null, [submitted]);
  const submittedB = useMemo(() => submitted ? calculateReading(submitted.personB) : null, [submitted]);
  const formMatchesSubmitted = Boolean(
    submitted
    && context === submitted.context
    && sameBirthDate(personA, submitted.personA)
    && sameBirthDate(personB, submitted.personB),
  );
  const canSubmit = Boolean(calculatedA && calculatedB && context);

  const result = useMemo(() => {
    if (!submitted || !submittedA || !submittedB || !formMatchesSubmitted) {
      return null;
    }

    return {
      reading: buildCompatibilityReading(submittedA.reading, submittedB.reading, submitted.context),
      dateA: submittedA.date,
      dateB: submittedB.date,
    };
  }, [formMatchesSubmitted, submitted, submittedA, submittedB]);

  useEffect(() => {
    if (!result) return;

    const key = `${result.reading.personA.signature}|${result.reading.personB.signature}|${result.reading.context}`;
    if (trackedResult.current === key) return;
    trackedResult.current = key;

    (window as AnalyticsWindow).gtag?.('event', 'compatibility_result_view', {
      nawal_a: result.reading.personA.nawalName,
      nawal_b: result.reading.personB.nawalName,
      tone_a: result.reading.personA.toneNumber,
      tone_b: result.reading.personB.toneNumber,
      score: result.reading.score,
      relationship_context: result.reading.context,
    });
  }, [result]);

  const handleSubmit = () => {
    if (!calculatedA || !calculatedB) {
      setError('Please enter two valid birth dates.');
      return;
    }

    if (!context) {
      setError('Choose how these two people are connected.');
      return;
    }

    setError('');
    setDraftSubmitted({ personA, personB, context });
    router.push(compatibilityPath(calculatedA.date, calculatedB.date, context));
    window.requestAnimationFrame(() => {
      document.getElementById('compatibility-reading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <DateFields label="Person A" value={personA} onChange={setPersonA} />
        <DateFields label="Person B" value={personB} onChange={setPersonB} />
      </section>

      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--gold-dim)]">
          Relationship context
        </legend>
        <p className="mb-3 text-sm text-[var(--parchment-dim)]">
          Choose how these two people are connected. This is required — it changes the language of the reading.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CONTEXT_OPTIONS.map((option) => {
            const selected = context === option.value;
            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selected
                    ? 'border-[var(--gold-line-strong)] bg-[rgb(212_162_78/10%)]'
                    : 'border-[var(--gold-line)] bg-[var(--surface)] hover:border-[var(--gold-line-strong)]'
                }`}
              >
                <input
                  type="radio"
                  name="relationship-context"
                  value={option.value}
                  checked={selected}
                  onChange={() => setContext(option.value)}
                  className="sr-only"
                />
                <span className="block font-semibold text-[var(--parchment)]">{option.label}</span>
                <span className="block text-sm text-[var(--parchment-dim)] mt-1">{option.hint}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <div role="alert" className="mb-5 p-4 rounded-xl border border-red-500/40 bg-red-950/50 text-red-300">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || formMatchesSubmitted}
        className="btn-ember w-full px-7 py-4 text-lg"
      >
        {submitted && !formMatchesSubmitted ? 'Update the pair reading' : 'Check Mayan Compatibility'}
      </button>
      <p className="text-center text-xs text-[var(--parchment-faint)] mt-4 tracking-wide">
        {!canSubmit
          ? 'Enter both birth dates and choose a relationship, then generate the reading.'
          : formMatchesSubmitted
            ? 'This reading matches the dates and relationship you selected.'
            : 'The reading appears below after you generate it.'}
      </p>

      {result && (
        <div id="compatibility-reading" className="mt-12 space-y-8">
          <section className="panel panel-glow panel-ornate rounded-3xl p-6 md:p-10">
            <div className="text-center mb-8">
              <p className="eyebrow mb-4 justify-center">✦&nbsp;&nbsp;{result.reading.contextLabel}&nbsp;&nbsp;✦</p>
              <p className="text-sm font-semibold text-gold-bright mb-2">Compatibility score</p>
              <h2 className="text-5xl md:text-6xl font-display text-[var(--parchment)] mb-3">{result.reading.score}%</h2>
              <p className="text-xl text-[var(--parchment-dim)] max-w-2xl mx-auto">{result.reading.relationshipTheme}</p>
              <p className="mt-4 text-sm text-[var(--parchment-faint)]">
                {result.reading.personA.signature} · {result.reading.personB.signature}
              </p>
            </div>

            <p className="max-w-3xl mx-auto text-center text-[var(--parchment)] leading-relaxed mb-4">
              {result.reading.contextLens}
            </p>
            <p className="max-w-3xl mx-auto text-center text-[var(--parchment-dim)] leading-relaxed mb-8">
              {result.reading.howToUse}
            </p>

            <GrecaBand className="max-w-xl mx-auto mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SignatureCard person={result.reading.personA} accent="gold" />
              <SignatureCard person={result.reading.personB} accent="jade" />
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <article className="panel rounded-2xl p-6 md:p-8">
              <p className="eyebrow mb-3">Tone rhythm</p>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">{result.reading.tone.title}</h3>
              <p className="text-[var(--parchment-dim)] leading-relaxed mb-4">{result.reading.tone.summary}</p>
              <p className="text-[var(--parchment-dim)] leading-relaxed">{result.reading.tone.detail}</p>
            </article>
            <article className="panel rounded-2xl p-6 md:p-8">
              <p className="eyebrow mb-3">Nawal chemistry</p>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">{result.reading.nawal.title}</h3>
              <p className="text-[var(--parchment-dim)] leading-relaxed mb-4">{result.reading.nawal.summary}</p>
              <p className="text-[var(--parchment-dim)] leading-relaxed">{result.reading.nawal.detail}</p>
            </article>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <article className="rounded-2xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] p-6 md:p-8">
              <h3 className="font-display text-2xl text-jade mb-4">What this pair is good at</h3>
              <ul className="space-y-3 text-[var(--parchment-dim)]">
                {result.reading.strengths.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-jade">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-[rgb(234_88_12/25%)] bg-[rgb(234_88_12/7%)] p-6 md:p-8">
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-4">Where friction usually shows up</h3>
              <ul className="space-y-3 text-[var(--parchment-dim)]">
                {result.reading.friction.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-[var(--ember)]">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="panel rounded-2xl p-6 md:p-8">
            <p className="eyebrow mb-3">Use this reading</p>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--parchment)] mb-4">
              {result.reading.communication.title}
            </h3>
            <p className="text-[var(--parchment-dim)] leading-relaxed mb-6">{result.reading.communication.summary}</p>
            <ol className="space-y-3 mb-8">
              {result.reading.communication.steps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-xl border border-[var(--gold-line)] bg-[var(--surface)] p-4">
                  <span className="font-display text-xl text-gold-bright">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[var(--parchment-dim)]">{step}</span>
                </li>
              ))}
            </ol>
            <h4 className="font-display text-xl text-[var(--parchment)] mb-3">Three questions worth asking</h4>
            <ul className="space-y-3 text-[var(--parchment-dim)]">
              {result.reading.prompts.map((prompt) => (
                <li key={prompt} className="flex gap-3">
                  <span aria-hidden="true" className="text-gold-bright">✦</span>
                  <span>{prompt}</span>
                </li>
              ))}
            </ul>
          </section>

          <CompatibilityUpgradeCard
            signatureA={result.reading.personA.signature}
            signatureB={result.reading.personB.signature}
            context={result.reading.context}
            personA={result.dateA}
            personB={result.dateB}
          />
        </div>
      )}
    </div>
  );
}
