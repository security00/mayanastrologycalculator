export const COMPATIBILITY_PRODUCT = Object.freeze({
  code: 'mayan_compatibility_report_v1',
  name: 'Mayan Compatibility Report',
  priceUsd: 12,
  version: 1,
  pageCount: 11,
});

export const COMPATIBILITY_CONTEXTS = Object.freeze(['general', 'romantic', 'friendship', 'work']);

export const COMPATIBILITY_PAID_SECTIONS = Object.freeze([
  'A private pair map written for both exact birth dates',
  'How your tones time decisions, repair, and follow-through',
  'Communication scripts for the relationship type you chose',
  'Friction points and the smallest repair move for each one',
  'Shared roles, purpose, and a two-person decision filter',
  'A seven-day practice you can do together or in parallel',
]);

const DAY_SIGN_ORDER = Object.freeze([
  'Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc',
  'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau',
]);

const OPPOSITE_DIRECTIONS = Object.freeze({
  East: 'West',
  West: 'East',
  North: 'South',
  South: 'North',
});

const COMPLEMENTARY_ELEMENTS = Object.freeze({
  Water: 'Fire',
  Fire: 'Water',
  Earth: 'Air',
  Air: 'Earth',
});

const SIGN_RELATIONAL = Object.freeze({
  Imix: Object.freeze({
    offer: 'steady care and a protective first response',
    need: 'not to carry every emotion in the bond',
    strain: 'overprotecting or turning care into control',
  }),
  Ik: Object.freeze({
    offer: 'quick clarity, language, and movement',
    need: 'someone who can help ideas land',
    strain: 'talking past the point or leaving too soon',
  }),
  Akbal: Object.freeze({
    offer: 'depth, privacy, and a quiet inner room',
    need: 'time before being asked to explain everything',
    strain: 'withdrawing when the bond needs a simple sentence',
  }),
  Kan: Object.freeze({
    offer: 'patience with potential and a bias toward growth',
    need: 'room for things to ripen instead of being forced',
    strain: 'measuring the bond only by visible progress',
  }),
  Chicchan: Object.freeze({
    offer: 'vitality, instinct, and catalytic honesty',
    need: 'a channel for intensity that does not shame it',
    strain: 'turning heat into a power struggle',
  }),
  Cimi: Object.freeze({
    offer: 'ease with endings, change, and honest closure',
    need: 'stability while something is being released',
    strain: 'staying inside a finished chapter too long',
  }),
  Manik: Object.freeze({
    offer: 'grace under pressure and a gift for mediation',
    need: 'permission to lead without becoming the referee',
    strain: 'keeping peace by avoiding the real tension',
  }),
  Lamat: Object.freeze({
    offer: 'warmth, play, and a talent for multiplying joy',
    need: 'more than entertainment to feel securely chosen',
    strain: 'overextending to keep the mood bright',
  }),
  Muluc: Object.freeze({
    offer: 'emotional attunement and sincere offering',
    need: 'clear limits so empathy does not become depletion',
    strain: 'giving more than was asked, then feeling unseen',
  }),
  Oc: Object.freeze({
    offer: 'loyalty, guidance, and reliable companionship',
    need: 'trust that does not have to be constantly proven',
    strain: 'turning devotion into duty or testing',
  }),
  Chuen: Object.freeze({
    offer: 'invention, humor, and creative problem-solving',
    need: 'moments of seriousness so play can become trust',
    strain: 'using wit to step around a needed conversation',
  }),
  Eb: Object.freeze({
    offer: 'pathfinding and a willingness to open the next door',
    need: 'their own direction to be respected, not borrowed',
    strain: 'walking the other person’s road instead of a shared one',
  }),
  Ben: Object.freeze({
    offer: 'structure, follow-through, and a sense of home',
    need: 'shared authority rather than silent over-responsibility',
    strain: 'holding the whole household, team, or plan alone',
  }),
  Ix: Object.freeze({
    offer: 'quiet protection and precise intuition',
    need: 'privacy that is respected, not interpreted as distance',
    strain: 'using silence as armor when a clearer signal would help',
  }),
  Men: Object.freeze({
    offer: 'long-range vision and a wider frame for the situation',
    need: 'a partner who can handle the near-at-hand details',
    strain: 'living so far ahead that present needs go unanswered',
  }),
  Cib: Object.freeze({
    offer: 'counsel, pattern-recognition, and a path back to meaning',
    need: 'not to become the archive of every old hurt',
    strain: 'overthinking a simple repair into a larger story',
  }),
  Caban: Object.freeze({
    offer: 'grounding, timing, and a feel for what wants to move',
    need: 'signals that are checked against real evidence',
    strain: 'restlessness or reading too much into small coincidences',
  }),
  Etznab: Object.freeze({
    offer: 'clean mirrors, fairness, and unnamed truths',
    need: 'honesty delivered with enough care to be usable',
    strain: 'cutting with accuracy when the moment needed warmth',
  }),
  Cauac: Object.freeze({
    offer: 'cleansing change and the courage to reset a stuck pattern',
    need: 'repair after the weather passes',
    strain: 'disrupting a system without staying to rebuild it',
  }),
  Ahau: Object.freeze({
    offer: 'warmth, encouragement, and a completing presence',
    need: 'rest from always being the light in the room',
    strain: 'performing generosity until vitality runs thin',
  }),
});

const TONE_RELATIONAL = Object.freeze({
  1: Object.freeze({ pace: 'initiating', move: 'gather a purpose before acting' }),
  2: Object.freeze({ pace: 'contrasting', move: 'name the tension instead of smoothing it away' }),
  3: Object.freeze({ pace: 'activating', move: 'turn goodwill into one visible next step' }),
  4: Object.freeze({ pace: 'defining', move: 'give the bond a usable shape and boundary' }),
  5: Object.freeze({ pace: 'centering', move: 'decide from the middle rather than from pressure' }),
  6: Object.freeze({ pace: 'balancing', move: 'restore a rhythm both people can keep' }),
  7: Object.freeze({ pace: 'attuning', move: 'listen until the real request is audible' }),
  8: Object.freeze({ pace: 'modeling', move: 'live the value you want the bond to hold' }),
  9: Object.freeze({ pace: 'realizing', move: 'complete the intention already in motion' }),
  10: Object.freeze({ pace: 'producing', move: 'make the next result visible and reviewable' }),
  11: Object.freeze({ pace: 'releasing', move: 'drop what is finished before adding more' }),
  12: Object.freeze({ pace: 'cooperating', move: 'share the work instead of carrying it alone' }),
  13: Object.freeze({ pace: 'completing', move: 'hold presence until the cycle actually ends' }),
});

const CONTEXT_COPY = Object.freeze({
  general: Object.freeze({
    noun: 'connection',
    label: 'General pair reading',
    lens: 'Read this as a two-person pattern: what each sign offers, where the rhythm clashes, and what to say next.',
    themeResonant: 'A naturally readable connection with a shared working rhythm.',
    themeBalanced: 'A usable connection with both ease and productive contrast.',
    themeMixed: 'A mixed connection: enough common ground to work with, and enough difference to require care.',
    themeGrowth: 'A growth-oriented connection that becomes clearer when pacing and expectations are named.',
    communicationTitle: 'A clearer way to talk',
    communicationLead: 'Use the difference in rhythm as information, not as proof that one person is “too much” or “not enough.”',
    promptLead: 'Ask one direct question, then leave room for an honest answer.',
  }),
  romantic: Object.freeze({
    noun: 'relationship',
    label: 'Romantic pair reading',
    lens: 'In a love relationship, the useful question is how closeness, desire, and repair move between you — not whether the signs “match.”',
    themeResonant: 'A naturally resonant relationship with familiar emotional timing.',
    themeBalanced: 'A romantic bond with both ease and useful difference.',
    themeMixed: 'A relationship that can feel close and uneven in the same week.',
    themeGrowth: 'A relationship that deepens when desire, pace, and repair are spoken plainly.',
    communicationTitle: 'Closer conversation',
    communicationLead: 'Romance strains here less from lack of feeling than from unspoken timing: who reaches, who waits, and what counts as care.',
    promptLead: 'Name one need without making the other person guess it.',
  }),
  friendship: Object.freeze({
    noun: 'friendship',
    label: 'Friendship pair reading',
    lens: 'In friendship, this pairing is about contact, loyalty, and how easily each person can name what they actually have energy for.',
    themeResonant: 'A friendship with easy rhythm and a natural shared language.',
    themeBalanced: 'A friendship that balances familiarity with complementary strengths.',
    themeMixed: 'A friendship that works best when contact, space, and expectations stay explicit.',
    themeGrowth: 'A friendship that lasts longer when neither person has to infer the rules.',
    communicationTitle: 'How this friendship stays honest',
    communicationLead: 'Friends often protect the bond by staying light. This pairing gets stronger when the real request is allowed to be ordinary.',
    promptLead: 'Say what kind of contact you actually have energy for.',
  }),
  work: Object.freeze({
    noun: 'collaboration',
    label: 'Work pair reading',
    lens: 'At work, read this as a collaboration: who decides, who follows through, and how the pair reviews results without turning style into character.',
    themeResonant: 'A collaboration with aligned pace and low translation cost.',
    themeBalanced: 'A working pair whose differences can become a useful division of labor.',
    themeMixed: 'A collaboration that needs clearer roles so contrast does not become friction.',
    themeGrowth: 'A working relationship that improves when scope, timing, and ownership are written down.',
    communicationTitle: 'How this pair works cleanly',
    communicationLead: 'The strain is usually operational: different tempos for deciding, revising, and closing. Name the workflow before naming the character.',
    promptLead: 'Agree on the next deliverable, owner, and review point.',
  }),
});

export function circularDistance(a, b, cycle) {
  const diff = Math.abs(Number(a) - Number(b));
  return Math.min(diff, cycle - diff);
}

export function normalizeCompatibilityContext(value) {
  return COMPATIBILITY_CONTEXTS.includes(value) ? value : 'general';
}

export function daySignIndex(name) {
  const index = DAY_SIGN_ORDER.indexOf(name);
  if (index === -1) throw new TypeError(`Unknown day sign: ${name}`);
  return index;
}

function elementRelation(a, b) {
  if (a === b) return 'shared';
  if (COMPLEMENTARY_ELEMENTS[a] === b) return 'complementary';
  return 'contrasting';
}

function directionRelation(a, b) {
  if (a === b) return 'shared';
  if (OPPOSITE_DIRECTIONS[a] === b) return 'opposite';
  return 'adjacent';
}

function clampScore(value) {
  return Math.min(99, Math.max(22, Math.round(value)));
}

function scoreBand(score) {
  if (score >= 80) return 'resonant';
  if (score >= 65) return 'balanced';
  if (score >= 50) return 'mixed';
  return 'growth';
}

function toneBand(distance) {
  if (distance <= 1) return 'close';
  if (distance <= 3) return 'offset';
  if (distance <= 5) return 'wide';
  return 'polar';
}

function signBand(distance) {
  if (distance <= 2) return 'near';
  if (distance <= 5) return 'mid';
  return 'far';
}

function profile(reading) {
  const relational = SIGN_RELATIONAL[reading.nawal.name];
  if (!relational) throw new TypeError(`Unknown Nawal: ${reading.nawal.name}`);

  return {
    signature: `${reading.galacticTone.number} ${reading.nawal.name}`,
    toneNumber: reading.galacticTone.number,
    toneName: reading.galacticTone.name,
    toneMeaning: reading.galacticTone.meaning,
    nawalName: reading.nawal.name,
    nawalMeaning: reading.nawal.meaning,
    element: reading.nawal.element,
    direction: reading.nawal.direction,
    color: reading.nawal.color,
    characteristics: reading.nawal.characteristics,
    ...relational,
    tone: TONE_RELATIONAL[reading.galacticTone.number],
  };
}

function themeFor(context, band) {
  const copy = CONTEXT_COPY[context];
  if (band === 'resonant') return copy.themeResonant;
  if (band === 'balanced') return copy.themeBalanced;
  if (band === 'mixed') return copy.themeMixed;
  return copy.themeGrowth;
}

function toneSection(a, b, distance) {
  const band = toneBand(distance);

  if (band === 'close') {
    return {
      distance,
      band,
      title: 'Your tones move on a similar clock',
      summary: `${a.toneName} and ${b.toneName} sit close together on the 13-day count, so timing, follow-through, and emotional pace can feel familiar.`,
      detail: `The useful question is not “do we match?” It is whether the shared ${a.tone.pace} rhythm is being used on purpose. When both people ${a.tone.move}, the bond feels simple. When both rush the same way, the same ease can become a blind spot.`,
    };
  }

  if (band === 'offset') {
    return {
      distance,
      band,
      title: 'Your tones create a workable offset',
      summary: `${a.signature} works through a ${a.tone.pace} rhythm, while ${b.signature} works through a ${b.tone.pace} rhythm. The gap is wide enough to notice and still small enough to use.`,
      detail: `One person may want to ${a.tone.move}, while the other needs to ${b.tone.move}. That is not a verdict. It is a sequence problem: if you reverse the order, the same gifts start to feel like resistance.`,
    };
  }

  if (band === 'wide') {
    return {
      distance,
      band,
      title: 'Your tones ask for more translation',
      summary: `Tone ${a.toneNumber} ${a.toneName} and Tone ${b.toneNumber} ${b.toneName} are far enough apart that decisions, rest, and urgency may not land at the same time.`,
      detail: `${a.signature} is helped by a ${a.tone.pace} move: ${a.tone.move}. ${b.signature} is helped by a ${b.tone.pace} move: ${b.tone.move}. The pair works when those moves are scheduled, not when one pace is treated as the correct personality.`,
    };
  }

  return {
    distance,
    band,
    title: 'Your tones sit at opposite ends of the cycle',
    summary: `Tone ${a.toneNumber} ${a.toneName} and Tone ${b.toneNumber} ${b.toneName} sit at opposite ends of the 13-count, so one person may be opening a cycle while the other is closing one.`,
    detail: `Use the contrast as a relay. Let ${a.signature} ${a.tone.move}, then let ${b.signature} ${b.tone.move}. Polar tones become expensive only when both people insist on occupying the same moment in the cycle.`,
  };
}

function nawalSection(a, b, signDistance, elements, directions) {
  const band = signBand(signDistance);
  const proximity =
    band === 'near'
      ? 'Your day signs sit near each other on the 20-day wheel, so the symbolic language can feel recognizable even when the personalities are not identical.'
      : band === 'mid'
        ? 'Your day signs are a moderate distance apart, which often feels like a mix of recognition and translation.'
        : 'Your day signs sit far apart on the wheel, so the bond may rely more on learned understanding than on instant familiarity.';

  const elementCopy = {
    shared: `Both Nawals carry ${a.element} energy, which can make instinct and emotional weather easy to recognize.`,
    complementary: `${a.nawalName} carries ${a.element} while ${b.nawalName} carries ${b.element}. That pairing often works like a circuit: one person supplies what the other does not generate as easily.`,
    contrasting: `${a.nawalName} moves through ${a.element} and ${b.nawalName} through ${b.element}. The chemistry is less “same language” and more “two useful dialects.”`,
  }[elements];

  const directionCopy = {
    shared: `You also share the ${a.direction} direction, which can make priorities and orientation feel oddly familiar.`,
    opposite: `Your directions face ${a.direction} and ${b.direction}, a polarity that can widen perspective if neither person treats their facing as the only map.`,
    adjacent: `Your directions — ${a.direction} and ${b.direction} — sit beside each other, so the difference is usually practical rather than dramatic.`,
  }[directions];

  return {
    signDistance,
    band,
    elementRelation: elements,
    directionRelation: directions,
    title: 'How the two Nawals meet',
    summary: `${a.nawalName} centers on ${a.nawalMeaning.toLowerCase()}. ${b.nawalName} centers on ${b.nawalMeaning.toLowerCase()}.`,
    detail: `${proximity} ${elementCopy} ${directionCopy}`,
  };
}

function strengths(a, b, elements, context) {
  const noun = CONTEXT_COPY[context].noun;
  const sharedOrContrast =
    elements === 'shared'
      ? `a shared ${a.element.toLowerCase()} instinct that can make the ${noun} feel quickly intelligible`
      : elements === 'complementary'
        ? `complementary ${a.element.toLowerCase()} and ${b.element.toLowerCase()} strengths that cover more ground together than either sign does alone`
        : `two distinct instincts that, used on purpose, keep the ${noun} from becoming one-note`;

  return [
    `${a.signature} often brings ${a.offer}.`,
    `${b.signature} often brings ${b.offer}.`,
    `Together, the pair has ${sharedOrContrast}.`,
  ];
}

function friction(a, b, toneDistance, context) {
  const noun = CONTEXT_COPY[context].noun;
  const paceNote =
    toneDistance <= 1
      ? `Because the tones are close, the ${noun} may miss early warning signs — both people can accelerate or stall in the same direction.`
      : `The usual strain is sequence: ${a.signature} wants to ${a.tone.move}, while ${b.signature} needs to ${b.tone.move}.`;

  return [
    `${a.nawalName} can lean into ${a.strain}.`,
    `${b.nawalName} can lean into ${b.strain}.`,
    paceNote,
  ];
}

function communicationSection(a, b, context) {
  const copy = CONTEXT_COPY[context];

  const steps = {
    general: [
      `Let ${a.signature} start by naming the situation in one sentence.`,
      `Let ${b.signature} answer with what they need next, not with a full defense of character.`,
      'Agree on one small test before deciding what the pattern “means.”',
    ],
    romantic: [
      `${a.signature} says the feeling or need without turning it into a verdict about the relationship.`,
      `${b.signature} reflects it back in their own words before offering a solution.`,
      'Choose one repairing action for the next 24 hours, then stop and see what changed.',
    ],
    friendship: [
      'Name the kind of contact you want this week: conversation, company, advice, or space.',
      `${a.signature} offers what they can actually give. ${b.signature} does the same.`,
      'Keep one standing check-in so silence does not have to be decoded.',
    ],
    work: [
      `Write the outcome, owner, and deadline before debating style.`,
      `Let ${a.signature} ${a.tone.move}. Let ${b.signature} ${b.tone.move}.`,
      'Review the result, not the personality, at the next checkpoint.',
    ],
  }[context];

  return {
    title: copy.communicationTitle,
    summary: `${copy.communicationLead} ${a.nawalName} is steadier when the bond makes room for this: ${a.need}. ${b.nawalName} is steadier when the bond makes room for this: ${b.need}.`,
    steps,
  };
}

function prompts(a, b, context) {
  const copy = CONTEXT_COPY[context];
  return [
    copy.promptLead,
    `Where does ${a.signature}'s gift — ${a.offer} — become costly if it is the only move available?`,
    `Where does ${b.signature}'s gift — ${b.offer} — need a clearer request from the other person?`,
  ];
}

export function buildCompatibilityReading(personA, personB, context = 'general') {
  const resolvedContext = normalizeCompatibilityContext(context);
  const a = profile(personA);
  const b = profile(personB);

  const toneDistance = circularDistance(a.toneNumber, b.toneNumber, 13);
  const signDistance = circularDistance(daySignIndex(a.nawalName), daySignIndex(b.nawalName), 20);
  const elements = elementRelation(a.element, b.element);
  const directions = directionRelation(a.direction, b.direction);
  const colorMatch = a.color === b.color;

  const rawScore = (34 - toneDistance * 5)
    + (28 - signDistance * 2.4)
    + (elements === 'shared' ? 16 : elements === 'complementary' ? 13 : 7)
    + (directions === 'shared' ? 12 : directions === 'opposite' ? 8 : 5)
    + (colorMatch ? 6 : 2);

  const score = clampScore(rawScore);
  const band = scoreBand(score);
  const copy = CONTEXT_COPY[resolvedContext];

  return {
    context: resolvedContext,
    contextLabel: copy.label,
    contextLens: copy.lens,
    score,
    band,
    relationshipTheme: themeFor(resolvedContext, band),
    howToUse: `This is a modern reflective reading of two Tzolk’in signatures, not a prediction and not a historical Maya matching rite. Keep what helps you see the ${copy.noun} more clearly. Leave anything that narrows your choices.`,
    personA: a,
    personB: b,
    tone: toneSection(a, b, toneDistance),
    nawal: nawalSection(a, b, signDistance, elements, directions),
    strengths: strengths(a, b, elements, resolvedContext),
    friction: friction(a, b, toneDistance, resolvedContext),
    communication: communicationSection(a, b, resolvedContext),
    prompts: prompts(a, b, resolvedContext),
    paidSections: COMPATIBILITY_PAID_SECTIONS,
  };
}
