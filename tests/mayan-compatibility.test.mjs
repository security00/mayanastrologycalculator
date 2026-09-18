import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateTzolkinPosition } from '../shared/maya-calendar-core.js';
import {
  buildCompatibilityReading,
  circularDistance,
  daySignIndex,
  normalizeCompatibilityContext,
} from '../shared/mayan-compatibility.js';

const SIGNS = {
  Imix: { meaning: 'Crocodile - The primordial waters of creation', element: 'Water', direction: 'East', color: 'Red' },
  Ik: { meaning: 'Wind - The breath of life and communication', element: 'Air', direction: 'North', color: 'White' },
  Ahau: { meaning: 'Sun - Enlightenment and universal love', element: 'Fire', direction: 'South', color: 'Yellow' },
  Men: { meaning: 'Eagle - Vision, wisdom, and higher perspective', element: 'Air', direction: 'West', color: 'Blue' },
};

const TONES = {
  4: { name: 'Self-Existing', meaning: 'Define - Measure and define form' },
  11: { name: 'Spectral', meaning: 'Dissolve - Release and liberate energy' },
  13: { name: 'Cosmic', meaning: 'Endure - Transcend and presence magic' },
};

const SIGN_BY_INDEX = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau'];

function readingFor(day, month, year) {
  const position = calculateTzolkinPosition({ day, month, year });
  const nawalName = SIGN_BY_INDEX[position.daySignIndex];
  const tone = TONES[position.toneNumber] || { name: `Tone ${position.toneNumber}`, meaning: 'rhythm' };
  const sign = SIGNS[nawalName] || SIGNS.Imix;

  return {
    galacticTone: {
      number: position.toneNumber,
      name: tone.name,
      meaning: tone.meaning,
      keywords: [],
    },
    nawal: {
      name: nawalName,
      meaning: sign.meaning,
      element: sign.element,
      direction: sign.direction,
      color: sign.color,
      characteristics: [],
    },
  };
}

test('normalizes unknown relationship context to general', () => {
  assert.equal(normalizeCompatibilityContext('romantic'), 'romantic');
  assert.equal(normalizeCompatibilityContext('business'), 'general');
});

test('treats tones 1 and 13 as adjacent on the 13-count', () => {
  assert.equal(circularDistance(1, 13, 13), 1);
  assert.equal(circularDistance(2, 12, 13), 3);
});

test('scores day-sign distance from wheel index, not name length', () => {
  assert.equal(daySignIndex('Ik'), 1);
  assert.equal(daySignIndex('Imix'), 0);
  assert.equal(circularDistance(daySignIndex('Ik'), daySignIndex('Imix'), 20), 1);
  assert.notEqual('Ik'.length, 'Imix'.length);
});

test('builds a deterministic, usable free reading', () => {
  const personA = readingFor(1, 1, 2000);
  const personB = readingFor(21, 12, 2012);
  const first = buildCompatibilityReading(personA, personB, 'romantic');
  const second = buildCompatibilityReading(personA, personB, 'romantic');

  assert.equal(personA.nawal.name, 'Ik');
  assert.equal(personA.galacticTone.number, 11);
  assert.equal(personB.nawal.name, 'Ahau');
  assert.equal(first.score, second.score);
  assert.equal(first.context, 'romantic');
  assert.ok(first.score >= 22 && first.score <= 99);
  assert.equal(first.strengths.length, 3);
  assert.equal(first.friction.length, 3);
  assert.equal(first.communication.steps.length, 3);
  assert.equal(first.prompts.length, 3);
  assert.match(first.tone.summary, /Spectral|Self-Existing|11|4/);
  assert.match(first.nawal.summary, /Ik|Ahau/);
});

test('changes communication copy by relationship context', () => {
  const personA = readingFor(1, 1, 2000);
  const personB = readingFor(21, 12, 2012);
  const romantic = buildCompatibilityReading(personA, personB, 'romantic');
  const work = buildCompatibilityReading(personA, personB, 'work');

  assert.notEqual(romantic.communication.title, work.communication.title);
  assert.notEqual(romantic.contextLabel, work.contextLabel);
  assert.notEqual(romantic.contextLens, work.contextLens);
  assert.match(work.communication.summary, /collaboration|workflow|roles|operational/i);
  assert.match(work.contextLens, /work|collaboration|workflow/i);
  assert.match(romantic.relationshipTheme, /relationship|romantic/i);
  assert.match(romantic.contextLens, /love|desire|repair/i);
});

test('identical signatures produce a high resonant reading', () => {
  const person = readingFor(5, 8, 2026);
  const reading = buildCompatibilityReading(person, person, 'friendship');

  assert.equal(person.nawal.name, 'Men');
  assert.equal(reading.tone.distance, 0);
  assert.equal(reading.nawal.signDistance, 0);
  assert.ok(reading.score >= 80);
  assert.equal(reading.band, 'resonant');
});
