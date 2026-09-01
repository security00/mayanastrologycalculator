'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTzolkinDate, validateDate, type MayanReading } from '../lib/mayan-calculator';

type BirthDate = {
  day: string;
  month: string;
  year: string;
};

type CompatibilityResult = {
  personA: MayanReading;
  personB: MayanReading;
  score: number;
  toneSummary: string;
  signSummary: string;
  relationshipTheme: string;
};

const emptyDate: BirthDate = { day: '', month: '', year: '' };

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

function readInitialDate(prefix: string): BirthDate {
  if (typeof window === 'undefined') {
    return emptyDate;
  }

  const params = new URLSearchParams(window.location.search);
  return {
    day: params.get(`${prefix}day`) || '',
    month: params.get(`${prefix}month`) || '',
    year: params.get(`${prefix}year`) || '',
  };
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

function circularDistance(a: number, b: number, cycle: number) {
  const diff = Math.abs(a - b);
  return Math.min(diff, cycle - diff);
}

function buildCompatibility(personA: MayanReading, personB: MayanReading): CompatibilityResult {
  const toneDistance = circularDistance(personA.galacticTone.number, personB.galacticTone.number, 13);
  const toneScore = Math.max(0, 38 - toneDistance * 5);

  const signDistance = circularDistance(
    personA.tzolkin.number + personA.nawal.name.length,
    personB.tzolkin.number + personB.nawal.name.length,
    20
  );
  const signScore = Math.max(0, 32 - signDistance * 2);

  const elementScore = personA.nawal.element === personB.nawal.element ? 18 : 10;
  const directionScore = personA.nawal.direction === personB.nawal.direction ? 12 : 7;
  const score = Math.min(100, Math.round(toneScore + signScore + elementScore + directionScore));

  const toneSummary =
    toneDistance <= 2
      ? 'Your Galactic Tones move at a similar rhythm, which can make timing, decisions, and emotional pacing feel natural.'
      : toneDistance <= 5
        ? 'Your Galactic Tones bring different rhythms. This can create useful balance when both people respect each other’s pace.'
        : 'Your Galactic Tones are quite different, so the relationship may need more patience around timing, priorities, and expectations.';

  const signSummary =
    personA.nawal.element === personB.nawal.element
      ? `Both signs carry ${personA.nawal.element} energy, giving the connection a shared instinct and familiar emotional language.`
      : `${personA.nawal.name} carries ${personA.nawal.element} energy while ${personB.nawal.name} carries ${personB.nawal.element} energy, creating a relationship based on contrast and learning.`;

  const relationshipTheme =
    score >= 80
      ? 'A naturally resonant connection with strong shared rhythm.'
      : score >= 60
        ? 'A balanced connection with both harmony and productive differences.'
        : 'A growth-oriented connection that benefits from clear communication and patience.';

  return {
    personA,
    personB,
    score,
    toneSummary,
    signSummary,
    relationshipTheme,
  };
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => String(currentYear - index));
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1));

  return (
    <fieldset className="panel rounded-2xl p-5">
      <legend className="text-lg font-bold text-[var(--parchment)] mb-4">{label}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-[var(--parchment-dim)] mb-2">Day</span>
          <select
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

export default function CompatibilityTool() {
  const router = useRouter();
  const [personA, setPersonA] = useState<BirthDate>(() => readInitialDate('a'));
  const [personB, setPersonB] = useState<BirthDate>(() => readInitialDate('b'));
  const [error, setError] = useState('');

  const result = useMemo(() => {
    const a = calculateReading(personA);
    const b = calculateReading(personB);

    if (!a || !b) {
      return null;
    }

    return buildCompatibility(a.reading, b.reading);
  }, [personA, personB]);

  const handleSubmit = () => {
    const a = calculateReading(personA);
    const b = calculateReading(personB);

    if (!a || !b) {
      setError('Please enter two valid birth dates.');
      return;
    }

    setError('');
    router.push(
      `/compatibility?aday=${a.date.day}&amonth=${a.date.month}&ayear=${a.date.year}&bday=${b.date.day}&bmonth=${b.date.month}&byear=${b.date.year}`
    );
  };

  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <DateFields label="Person A" value={personA} onChange={setPersonA} />
        <DateFields label="Person B" value={personB} onChange={setPersonB} />
      </section>

      {error && (
        <div className="mb-5 p-4 rounded-xl border border-red-500/40 bg-red-950/50 text-red-300">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="btn-ember w-full px-7 py-4 text-lg"
      >
        Check Mayan Compatibility
      </button>

      {result && (
        <section className="panel rounded-2xl p-6 md:p-8 mt-10">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-gold-bright mb-2">Compatibility score</p>
            <h2 className="text-5xl font-display text-[var(--parchment)] mb-3">{result.score}%</h2>
            <p className="text-xl text-[var(--parchment-dim)]">{result.relationshipTheme}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <article className="rounded-xl border border-[var(--gold-line)] bg-[rgb(212_162_78/6%)] p-5">
              <h3 className="text-2xl font-display text-[var(--parchment)] mb-2">
                {result.personA.galacticTone.number} {result.personA.nawal.name}
              </h3>
              <p className="text-[var(--parchment-dim)] mb-2">{result.personA.nawal.meaning}</p>
              <p className="text-sm text-[var(--parchment-dim)]">
                {result.personA.galacticTone.name} tone • {result.personA.nawal.element} • {result.personA.nawal.direction}
              </p>
            </article>
            <article className="rounded-xl border border-[rgb(79_209_165/22%)] bg-[rgb(79_209_165/6%)] p-5">
              <h3 className="text-2xl font-display text-[var(--parchment)] mb-2">
                {result.personB.galacticTone.number} {result.personB.nawal.name}
              </h3>
              <p className="text-[var(--parchment-dim)] mb-2">{result.personB.nawal.meaning}</p>
              <p className="text-sm text-[var(--parchment-dim)]">
                {result.personB.galacticTone.name} tone • {result.personB.nawal.element} • {result.personB.nawal.direction}
              </p>
            </article>
          </div>

          <div className="space-y-5">
            <article>
              <h3 className="text-xl font-display text-[var(--parchment)] mb-2">Tone compatibility</h3>
              <p className="text-[var(--parchment-dim)]">{result.toneSummary}</p>
            </article>
            <article>
              <h3 className="text-xl font-display text-[var(--parchment)] mb-2">Nawal compatibility</h3>
              <p className="text-[var(--parchment-dim)]">{result.signSummary}</p>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}
