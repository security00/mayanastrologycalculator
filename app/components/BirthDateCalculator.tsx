'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTzolkinDate, validateDate } from '../lib/mayan-calculator';

type BirthDateCalculatorProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
};

export default function BirthDateCalculator({
  title = 'Mayan Astrology Calculator',
  description = "Enter your birth date to calculate your Tzolk'in signature",
  buttonLabel = 'Calculate My Mayan Astrology',
}: BirthDateCalculatorProps) {
  const router = useRouter();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, index) => currentYear - index);

  const handleCalculate = () => {
    setError('');

    const dayNumber = Number.parseInt(day, 10);
    const monthNumber = Number.parseInt(month, 10);
    const yearNumber = Number.parseInt(year, 10);

    if (!validateDate(dayNumber, monthNumber, yearNumber)) {
      setError('Please enter a valid date.');
      return;
    }

    setIsCalculating(true);
    const reading = calculateTzolkinDate(new Date(yearNumber, monthNumber - 1, dayNumber));

    sessionStorage.setItem('mayanReading', JSON.stringify({
      reading,
      birthDate: { day: dayNumber, month: monthNumber, year: yearNumber },
    }));

    (window as AnalyticsWindow).gtag?.('event', 'mayan_calculator_submit', {
      nawal: reading.nawal.name,
      galactic_tone: reading.galacticTone.number,
    });
    router.push(`/result?day=${dayNumber}&month=${monthNumber}&year=${yearNumber}`);
  };

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-title"
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-4 border-amber-200"
    >
      <div className="text-center mb-8">
        <h2 id="calculator-title" className="text-2xl font-bold text-gray-950 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Day
          <select
            aria-label="Birth day"
            value={day}
            onChange={(event) => setDay(event.target.value)}
            className="mt-2 w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg bg-white"
          >
            <option value="">Day</option>
            {days.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Month
          <select
            aria-label="Birth month"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="mt-2 w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg bg-white"
          >
            <option value="">Month</option>
            {months.map((name, index) => <option key={name} value={index + 1}>{name}</option>)}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Year
          <select
            aria-label="Birth year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="mt-2 w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg bg-white"
          >
            <option value="">Year</option>
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      {error && (
        <p role="alert" className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCalculate}
        disabled={!day || !month || !year || isCalculating}
        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-orange-700 hover:to-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isCalculating ? 'Calculating your Mayan sign…' : buttonLabel}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Free instant calculation • No registration required
      </p>
    </section>
  );
}
