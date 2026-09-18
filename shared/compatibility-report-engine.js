import { calculateMayanSignature } from './report-engine.js';
import {
  COMPATIBILITY_PRODUCT,
  buildCompatibilityReading,
  normalizeCompatibilityContext,
} from './mayan-compatibility.js';

const NAWAL_TRAITS = Object.freeze({
  Imix: Object.freeze({ element: 'Water', direction: 'East', color: 'Red' }),
  Ik: Object.freeze({ element: 'Air', direction: 'North', color: 'White' }),
  Akbal: Object.freeze({ element: 'Earth', direction: 'West', color: 'Blue' }),
  Kan: Object.freeze({ element: 'Fire', direction: 'South', color: 'Yellow' }),
  Chicchan: Object.freeze({ element: 'Fire', direction: 'East', color: 'Red' }),
  Cimi: Object.freeze({ element: 'Earth', direction: 'North', color: 'White' }),
  Manik: Object.freeze({ element: 'Air', direction: 'West', color: 'Blue' }),
  Lamat: Object.freeze({ element: 'Water', direction: 'South', color: 'Yellow' }),
  Muluc: Object.freeze({ element: 'Water', direction: 'East', color: 'Red' }),
  Oc: Object.freeze({ element: 'Earth', direction: 'North', color: 'White' }),
  Chuen: Object.freeze({ element: 'Air', direction: 'West', color: 'Blue' }),
  Eb: Object.freeze({ element: 'Fire', direction: 'South', color: 'Yellow' }),
  Ben: Object.freeze({ element: 'Fire', direction: 'East', color: 'Red' }),
  Ix: Object.freeze({ element: 'Earth', direction: 'North', color: 'White' }),
  Men: Object.freeze({ element: 'Air', direction: 'West', color: 'Blue' }),
  Cib: Object.freeze({ element: 'Water', direction: 'South', color: 'Yellow' }),
  Caban: Object.freeze({ element: 'Earth', direction: 'East', color: 'Red' }),
  Etznab: Object.freeze({ element: 'Air', direction: 'North', color: 'White' }),
  Cauac: Object.freeze({ element: 'Water', direction: 'West', color: 'Blue' }),
  Ahau: Object.freeze({ element: 'Fire', direction: 'South', color: 'Yellow' }),
});

const CONTEXT_LABELS = Object.freeze({
  general: 'General connection',
  romantic: 'Romantic relationship',
  friendship: 'Friendship',
  work: 'Work collaboration',
});

export const COMPATIBILITY_PAYLOAD_PREFIX = 'COMPAT_V1:';

export function isCompatibilityReport(order) {
  return order?.report_type === COMPATIBILITY_PRODUCT.code;
}

export function readingFromBirthDate(date) {
  const calculated = calculateMayanSignature(date);
  const traits = NAWAL_TRAITS[calculated.sign.name];
  if (!traits) throw new TypeError(`Unknown Nawal: ${calculated.sign.name}`);

  return {
    galacticTone: {
      number: calculated.tone.number,
      name: calculated.tone.name,
      meaning: calculated.tone.meaning,
      keywords: [],
    },
    nawal: {
      name: calculated.sign.name,
      meaning: calculated.sign.meaning,
      element: traits.element,
      direction: traits.direction,
      color: traits.color,
      characteristics: calculated.sign.gifts,
    },
  };
}

export function encodeCompatibilityPayload({ personA, personB, context }) {
  return JSON.stringify({
    v: 1,
    a: [Number(personA.day), Number(personA.month), Number(personA.year)],
    b: [Number(personB.day), Number(personB.month), Number(personB.year)],
    context: normalizeCompatibilityContext(context),
  });
}

export function parseCompatibilityPayload(raw) {
  const text = String(raw || '').trim();
  const json = text.startsWith(COMPATIBILITY_PAYLOAD_PREFIX)
    ? text.slice(COMPATIBILITY_PAYLOAD_PREFIX.length)
    : text;
  const payload = JSON.parse(json);
  if (!Array.isArray(payload?.a) || !Array.isArray(payload?.b)) {
    throw new TypeError('Compatibility payload is missing birth dates.');
  }
  return {
    personA: { day: Number(payload.a[0]), month: Number(payload.a[1]), year: Number(payload.a[2]) },
    personB: { day: Number(payload.b[0]), month: Number(payload.b[1]), year: Number(payload.b[2]) },
    context: normalizeCompatibilityContext(payload.context),
  };
}

export function normalizeCompatibilityReportOrder(order) {
  const dates = extractCompatibilityDates(order);
  const personA = readingFromBirthDate(dates.personA);
  const personB = readingFromBirthDate(dates.personB);
  const reading = buildCompatibilityReading(personA, personB, dates.context);
  const pairSignature = `${reading.personA.signature} + ${reading.personB.signature}`;

  return {
    ...order,
    ...dates,
    reading,
    pairSignature,
    contextLabel: reading.contextLabel,
    mayan_signature: pairSignature,
  };
}

function extractCompatibilityDates(order) {
  if (Number.isInteger(Number(order.partner_birth_day))) {
    return {
      personA: {
        day: Number(order.birth_day),
        month: Number(order.birth_month),
        year: Number(order.birth_year),
      },
      personB: {
        day: Number(order.partner_birth_day),
        month: Number(order.partner_birth_month),
        year: Number(order.partner_birth_year),
      },
      context: normalizeCompatibilityContext(order.relationship_context),
    };
  }

  if (order.report_payload) {
    return parseCompatibilityPayload(order.report_payload);
  }

  if (String(order.delivery_notes || '').startsWith(COMPATIBILITY_PAYLOAD_PREFIX)) {
    return parseCompatibilityPayload(order.delivery_notes);
  }

  throw new TypeError('Compatibility order is missing the second birth date.');
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(date.year, date.month - 1, date.day)),
  );
}

function paidExtras(reading) {
  const { personA: a, personB: b, context } = reading;
  const noun = {
    general: 'connection',
    romantic: 'relationship',
    friendship: 'friendship',
    work: 'collaboration',
  }[context];

  const repairMoves = [
    `When ${a.nawalName} leans into ${a.strain}, the smallest repair is to make room for this: ${a.need}.`,
    `When ${b.nawalName} leans into ${b.strain}, the smallest repair is to make room for this: ${b.need}.`,
    `If the ${noun} stalls, do not debate character. Restore sequence: let ${a.signature} ${a.tone.move}, then let ${b.signature} ${b.tone.move}.`,
  ];

  const roles = [
    `${a.signature} can hold this role: ${a.offer}.`,
    `${b.signature} can hold this role: ${b.offer}.`,
    `Review the next decision together before either person silently takes both roles.`,
  ];

  const decisionFilter = {
    general: [
      'Name the actual decision in one sentence.',
      `Ask which option lets ${a.signature} ${a.tone.move} without erasing ${b.signature}.`,
      `Ask which option lets ${b.signature} ${b.tone.move} without turning ${a.signature} into the only engine.`,
      'Choose the smallest test that can be reviewed within a week.',
      'Write the owner, the check-in, and what would count as enough.',
    ],
    romantic: [
      'Name the need or decision without turning it into a verdict about the relationship.',
      'Ask what would feel like care to each person in the next 24 hours.',
      `Protect ${a.nawalName}'s need: ${a.need}.`,
      `Protect ${b.nawalName}'s need: ${b.need}.`,
      'Choose one repairing action, then stop and see what changed.',
    ],
    friendship: [
      'Name the kind of contact you want: conversation, company, advice, or space.',
      `${a.signature} says what they can actually give. ${b.signature} does the same.`,
      'Do not treat silence as a decoded message.',
      'Agree on one standing check-in so the friendship does not have to be inferred.',
      'Keep the next plan small enough that both people can keep it.',
    ],
    work: [
      'Write the outcome, owner, and deadline before debating style.',
      `Let ${a.signature} ${a.tone.move}.`,
      `Let ${b.signature} ${b.tone.move}.`,
      'Review the result, not the personality, at the next checkpoint.',
      'If the work stalls, change the workflow before changing the story about each other.',
    ],
  }[context];

  const week = {
    general: [
      'Share one sentence about what you each want from this connection this week.',
      `Notice where ${a.signature}'s gift — ${a.offer} — is already in use.`,
      `Notice where ${b.signature}'s gift — ${b.offer} — is already in use.`,
      'Name one friction early, while it is still small.',
      'Practice the communication sequence once, even if the topic is ordinary.',
      'Do one shared or parallel action that makes the connection visible.',
      'Write what matched, what did not, and one practice to keep.',
    ],
    romantic: [
      'Name one need without making the other person guess it.',
      'Reflect one feeling back in your own words before offering a solution.',
      'Choose one repairing action for the next 24 hours.',
      'Notice who reaches and who waits, without scoring it.',
      `Protect space for ${a.nawalName}: ${a.need}.`,
      `Protect space for ${b.nawalName}: ${b.need}.`,
      'Write one sentence about how you want to stay close next week.',
    ],
    friendship: [
      'Say what kind of contact you actually have energy for.',
      'Offer only what you can give, and ask the same in return.',
      'Keep one standing check-in on the calendar.',
      'Notice where you stayed light to protect the friendship.',
      'Ask one ordinary, honest question.',
      'Do one small thing together or in parallel.',
      'Write what kind of friendship you want to keep practicing.',
    ],
    work: [
      'Write the next deliverable, owner, and review point.',
      `Let ${a.signature} take the first operational move that fits their tone.`,
      `Let ${b.signature} take the complementary move.`,
      'Review the work product, not the working style.',
      'Name one unclear role and assign it.',
      'Remove one task that neither person should keep carrying alone.',
      'Write the working agreement you want to reuse next week.',
    ],
  }[context];

  return { repairMoves, roles, decisionFilter, week };
}

export function renderCompatibilityReportHtml(input, options = {}) {
  const order = normalizeCompatibilityReportOrder(input);
  const { reading, personA, personB } = order;
  const extras = paidExtras(reading);
  const coverImageUrl = options.coverImageUrl || 'https://mayanastrologycalculator.com/tzolkin-astrology-chart.webp';
  const dateA = formatDate(personA);
  const dateB = formatDate(personB);
  const a = reading.personA;
  const b = reading.personB;
  const contextName = CONTEXT_LABELS[reading.context];

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(COMPATIBILITY_PRODUCT.name)} — ${escapeHtml(order.pairSignature)}</title><style>
  @page{size:A4;margin:0}*{box-sizing:border-box}html{print-color-adjust:exact;-webkit-print-color-adjust:exact}body{margin:0;background:#eee7db;color:#24211d;font:15.5px/1.55 Georgia,"Times New Roman",serif}.report{width:210mm;margin:0 auto;background:#fffaf0}.page{position:relative;width:210mm;min-height:297mm;padding:21mm 19mm 18mm;page-break-after:always;overflow:hidden}.page:last-child{page-break-after:auto}.page:after{content:"Mayan Astrology Calculator  •  Compatibility report v${COMPATIBILITY_PRODUCT.version}";position:absolute;bottom:8mm;left:19mm;color:#987d5a;font:9px Arial,sans-serif;letter-spacing:.04em}.cover{display:flex;align-items:flex-end;padding:22mm;background:linear-gradient(180deg,rgba(21,15,10,.12),rgba(21,15,10,.86)),url("${escapeAttribute(coverImageUrl)}") center/cover no-repeat;color:#fff}.cover:after{color:#eadcc9}.cover-card{width:100%;padding:10mm;border:1px solid rgba(255,255,255,.38);border-radius:20px;background:rgba(25,19,14,.78);backdrop-filter:blur(6px)}.eyebrow,.label{font:700 11px/1.2 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase}.eyebrow{margin:0 0 12px;color:#b9531f}.cover .eyebrow{color:#ffd7ad}h1,h2,h3{margin:0;color:#211a14;line-height:1.12}h1{font-size:40px}.cover h1{color:#fff9ee}h2{font-size:30px;margin:0 0 16px}h3{font-size:19px;margin:20px 0 8px}p{margin:0 0 13px}.lede{font-size:18px;line-height:1.5}.subtitle{margin-top:14px;color:#fce9d1;font-size:18px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.meta-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:24px}.card,.callout{padding:17px;border:1px solid #ead4b3;border-radius:14px;background:#fff}.cover .card{border-color:rgba(255,255,255,.25);background:rgba(255,250,240,.94);color:#211a14}.label{display:block;color:#9b421d}.value{display:block;margin-top:4px;font-size:18px;font-weight:700}.section-label{display:inline-block;margin-bottom:20px;padding:7px 11px;border:1px solid #f0c496;border-radius:999px;background:#fff0dc;color:#93411e;font:700 10px Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}.quote{margin:21px 0;padding:12px 0 12px 17px;border-left:5px solid #c95423;color:#513522;font-size:18px;font-style:italic}.good{border-top:5px solid #3e7c63}.watch{border-top:5px solid #bf6038}.steps{margin:0;padding:0;list-style:none;counter-reset:step}.steps li{position:relative;margin:0 0 12px;padding:13px 14px 13px 48px;border:1px solid #ead4b3;border-radius:12px;background:#fff}.steps li:before{counter-increment:step;content:counter(step);position:absolute;left:14px;top:12px;width:24px;height:24px;border-radius:50%;background:#9b421d;color:#fff;text-align:center;font:700 12px/24px Arial,sans-serif}ul,ol{margin:0 0 17px 20px;padding:0}li{margin-bottom:7px}.small{color:#806b52;font:11px/1.45 Arial,sans-serif}.divider{height:1px;margin:20px 0;background:#ead4b3}.promise{padding:18px;border-radius:14px;background:#2e241d;color:#fff}.promise h3{margin-top:0;color:#fff}@media screen{.report{box-shadow:0 20px 60px rgba(45,32,19,.18)}}
  </style></head><body><main class="report">
  ${page('cover', `<div class="cover-card"><p class="eyebrow">${COMPATIBILITY_PRODUCT.name}</p><h1>${escapeHtml(a.signature)} + ${escapeHtml(b.signature)}</h1><p class="subtitle">A private pair reading for a ${escapeHtml(contextName.toLowerCase())}, written from two exact birth dates.</p><div class="meta-grid"><div class="card"><span class="label">Person A</span><span class="value">${escapeHtml(a.signature)}</span><p>${escapeHtml(dateA)}</p></div><div class="card"><span class="label">Person B</span><span class="value">${escapeHtml(b.signature)}</span><p>${escapeHtml(dateB)}</p></div><div class="card"><span class="label">Relationship lens</span><span class="value">${escapeHtml(contextName)}</span></div><div class="card"><span class="label">Compatibility score</span><span class="value">${reading.score}%</span></div></div></div>`)}
  ${page('', `<span class="section-label">Your pair map</span><h2>${escapeHtml(reading.contextLabel)}</h2><p class="lede">${escapeHtml(reading.contextLens)}</p><p>${escapeHtml(reading.relationshipTheme)}</p><p>${escapeHtml(reading.howToUse)}</p><div class="grid"><div class="card"><span class="label">Score</span><span class="value">${reading.score}% · ${escapeHtml(reading.band)}</span><p>The number is a modern synthesis of tone distance, day-sign distance, element, direction, and color. It does not change when you change the relationship lens.</p></div><div class="card"><span class="label">How to read it</span><span class="value">Angle, not fate</span><p>Keep what helps you see the ${escapeHtml(reading.context)} more clearly. Leave anything that narrows your choices.</p></div></div><div class="promise"><h3>Inside this 11-page report</h3><p>Both signatures · tone rhythm · Nawal chemistry · strengths · friction and repair · ${escapeHtml(contextName.toLowerCase())} scripts · a two-person decision filter · a seven-day practice.</p></div>`)}
  ${page('', `<span class="section-label">01 · Person A</span><h2>${escapeHtml(a.signature)}</h2><p class="lede">${escapeHtml(a.nawalMeaning)}.</p><p>Tone ${a.toneNumber} ${escapeHtml(a.toneName)} is a ${escapeHtml(a.tone.pace)} rhythm. This person is helped when they ${escapeHtml(a.tone.move)}.</p><div class="grid"><div class="card good"><h3>Often offers</h3><p>${escapeHtml(a.offer)}.</p><p>${escapeHtml(a.element)} · ${escapeHtml(a.direction)} · ${escapeHtml(a.color)}</p></div><div class="card watch"><h3>Needs and strain</h3><p>Steadier when the bond makes room for this: ${escapeHtml(a.need)}.</p><p>Under pressure, ${escapeHtml(a.nawalName)} can lean into ${escapeHtml(a.strain)}.</p></div></div><p class="quote">In this ${escapeHtml(contextName.toLowerCase())}, ${escapeHtml(a.signature)} is not the whole story. They are one working half of a two-person pattern.</p>`)}
  ${page('', `<span class="section-label">02 · Person B</span><h2>${escapeHtml(b.signature)}</h2><p class="lede">${escapeHtml(b.nawalMeaning)}.</p><p>Tone ${b.toneNumber} ${escapeHtml(b.toneName)} is a ${escapeHtml(b.tone.pace)} rhythm. This person is helped when they ${escapeHtml(b.tone.move)}.</p><div class="grid"><div class="card good"><h3>Often offers</h3><p>${escapeHtml(b.offer)}.</p><p>${escapeHtml(b.element)} · ${escapeHtml(b.direction)} · ${escapeHtml(b.color)}</p></div><div class="card watch"><h3>Needs and strain</h3><p>Steadier when the bond makes room for this: ${escapeHtml(b.need)}.</p><p>Under pressure, ${escapeHtml(b.nawalName)} can lean into ${escapeHtml(b.strain)}.</p></div></div><p class="quote">Read ${escapeHtml(b.signature)} as a complementary working rhythm, not as a correction to ${escapeHtml(a.signature)}.</p>`)}
  ${page('', `<span class="section-label">03 · Tone rhythm</span><h2>${escapeHtml(reading.tone.title)}</h2><p class="lede">${escapeHtml(reading.tone.summary)}</p><p>${escapeHtml(reading.tone.detail)}</p><div class="grid"><div class="card"><span class="label">${escapeHtml(a.signature)}</span><span class="value">${escapeHtml(a.tone.pace)}</span><p>${escapeHtml(a.tone.move)}.</p></div><div class="card"><span class="label">${escapeHtml(b.signature)}</span><span class="value">${escapeHtml(b.tone.pace)}</span><p>${escapeHtml(b.tone.move)}.</p></div></div><h3>The paid layer</h3><p>Do not ask which pace is the correct personality. Ask which move belongs first. If you reverse the order, the same gifts start to feel like resistance.</p>`)}
  ${page('', `<span class="section-label">04 · Nawal chemistry</span><h2>${escapeHtml(reading.nawal.title)}</h2><p class="lede">${escapeHtml(reading.nawal.summary)}</p><p>${escapeHtml(reading.nawal.detail)}</p><div class="grid"><div class="card good"><h3>What this pair is good at</h3><ul>${list(reading.strengths)}</ul></div><div class="card"><h3>Shared roles</h3><ul>${list(extras.roles)}</ul></div></div>`)}
  ${page('', `<span class="section-label">05 · Friction and repair</span><h2>Where strain shows up — and the smallest next move</h2><div class="grid"><div class="card watch"><h3>Usual friction</h3><ul>${list(reading.friction)}</ul></div><div class="card good"><h3>Smallest repair</h3><ul>${list(extras.repairMoves)}</ul></div></div><p class="quote">Repair is usually smaller than the story you are telling about the other person.</p>`)}
  ${page('', `<span class="section-label">06 · ${escapeHtml(contextName)}</span><h2>${escapeHtml(reading.communication.title)}</h2><p class="lede">${escapeHtml(reading.communication.summary)}</p><ol class="steps">${reading.communication.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol><h3>Questions worth asking</h3><ul>${list(reading.prompts)}</ul>`)}
  ${page('', `<span class="section-label">07 · Decision filter</span><h2>A two-person filter for this ${escapeHtml(contextName.toLowerCase())}</h2><p>Use this page when a choice is stalling, or when urgency makes every option feel equally important.</p><ol class="steps">${extras.decisionFilter.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol><div class="callout"><h3>Write the next decision here</h3><p><strong>The decision:</strong> __________________________________________</p><p><strong>Person A’s move:</strong> ________________________________________</p><p><strong>Person B’s move:</strong> ________________________________________</p><p><strong>Review point:</strong> __________________________________________</p></div>`)}
  ${page('', `<span class="section-label">08 · Seven-day practice</span><h2>Practice this ${escapeHtml(contextName.toLowerCase())} for one week</h2><p>These steps are intentionally small. Their purpose is to test the reading against real life, not to make the reading true by force.</p><ol class="steps">${extras.week.map((step, index) => `<li><strong>Day ${index + 1}:</strong> ${escapeHtml(step)}</li>`).join('')}</ol>`)}
  ${page('', `<span class="section-label">Closing reflection</span><h2>This pair report belongs to both of you</h2><p class="lede">Keep the language that helps you see the ${escapeHtml(contextName.toLowerCase())} more clearly. Release any interpretation that narrows your freedom or contradicts lived experience.</p><h3>Methodology and cultural scope</h3><p>Each birth date is converted with the GMT correlation constant 584283 into a Tzolk’in day sign and number. The compatibility score is a modern synthesis of tone distance, day-sign distance, element, direction, and color. It is not a historical Maya matching rite.</p><p>The relationship lens — ${escapeHtml(contextName.toLowerCase())} — changes the interpretive language, not the calculation. Tone names such as ${escapeHtml(a.toneName)} and ${escapeHtml(b.toneName)} belong to a modern Dreamspell layer. This report does not claim lineage authority.</p><p>This report is educational and reflective. It is not scientific, medical, legal, financial, or psychological advice. Read the full methodology at https://mayanastrologycalculator.com/methodology.</p><div class="promise"><h3>Our delivery promise</h3><p>If your paid report cannot be delivered or the file is unusable, contact support@mayanastrologycalculator.com within 7 days so we can replace it or refund the purchase.</p></div><p class="small">Prepared by Mayan Astrology Calculator · ${escapeHtml(COMPATIBILITY_PRODUCT.name)} v${COMPATIBILITY_PRODUCT.version}</p>`)}
  </main></body></html>`;
}

function page(className, content) {
  return `<section class="page ${className}">${content}</section>`;
}

function list(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#096;');
}
