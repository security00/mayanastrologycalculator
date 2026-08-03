export const REPORT_PRODUCT = Object.freeze({
  code: 'personal_mayan_signature_v2',
  name: 'Personal Mayan Signature Report',
  priceUsd: 7,
  version: 2,
});

export const DAY_SIGNS = Object.freeze([
  ['Imix', 'Crocodile', 'primordial waters, nurture, protection, and beginnings', ['Nurturing presence', 'Protective instinct', 'Emotional sensitivity'], ['Overprotecting', 'Absorbing others’ pressure', 'Confusing care with control']],
  ['Ik', 'Wind', 'breath, communication, spirit, movement, and inspired speech', ['Clear communication', 'Quick perception', 'Teaching ability'], ['Scattered focus', 'Restlessness', 'Speaking before grounding']],
  ['Akbal', 'Night', 'dreams, hidden knowledge, inner sanctuary, and subconscious wisdom', ['Deep contemplation', 'Dream awareness', 'Mystical curiosity'], ['Withdrawal', 'Fear of exposure', 'Holding too much inside']],
  ['Kan', 'Seed', 'growth, potential, abundance, and organic development', ['Vision for growth', 'Generosity', 'Patience with process'], ['Impatience with timing', 'Outcome fixation', 'Fear of wasted potential']],
  ['Chicchan', 'Serpent', 'life force, embodiment, instinct, transformation, and creative energy', ['Strong vitality', 'Embodied intuition', 'Creative power'], ['Intensity without direction', 'Reactive instinct', 'Power struggles']],
  ['Cimi', 'Transformation', 'endings, release, transition, renewal, and rebirth', ['Comfort with change', 'Transition support', 'Cycle awareness'], ['Holding endings too long', 'Fear of instability', 'Becoming defined by loss']],
  ['Manik', 'Deer', 'grace, spiritual authority, justice, steadiness, and mediation', ['Grace under pressure', 'Diplomacy', 'Healing presence'], ['Avoiding conflict', 'Over-responsibility', 'Waiting for permission to lead']],
  ['Lamat', 'Rabbit', 'abundance, multiplication, beauty, creativity, and bright expression', ['Creative abundance', 'Magnetic charm', 'Joyful expression'], ['Overextending energy', 'Chasing stimulation', 'Needing external validation']],
  ['Muluc', 'Water', 'purification, offering, emotional flow, sensitivity, and sacred exchange', ['Emotional intuition', 'Empathy', 'Sincere offering'], ['Emotional overwhelm', 'Unclear boundaries', 'Giving beyond capacity']],
  ['Oc', 'Dog', 'loyalty, companionship, guidance, trust, and heart-centered service', ['Loyalty', 'Protective love', 'Trustworthiness'], ['Over-attachment', 'Testing loyalty', 'Carrying duty too heavily']],
  ['Chuen', 'Monkey', 'artistry, play, invention, humor, and creative problem solving', ['Creativity', 'Playfulness', 'Innovative thinking'], ['Avoiding seriousness', 'Distraction', 'Hiding truth through humor']],
  ['Eb', 'Road', 'path, destiny, service, the human journey, and opening new ways', ['Pathfinding', 'Service orientation', 'Bridge making'], ['Losing direction', 'Serving without boundaries', 'Walking another person’s path']],
  ['Ben', 'Reed', 'authority, home, family, structure, and the pillar of community', ['Organization', 'Protective leadership', 'Community structure'], ['Rigidity', 'Authority pressure', 'Carrying the household alone']],
  ['Ix', 'Jaguar', 'earth wisdom, intuition, protection, and quiet hidden strength', ['Intuition', 'Protective power', 'Quiet courage'], ['Secrecy', 'Defensiveness', 'Using silence as armor']],
  ['Men', 'Eagle', 'vision, wisdom, higher perspective, strategy, and broad awareness', ['Long-range vision', 'Strategic insight', 'Perspective'], ['Detachment', 'Impatience with detail', 'Living too far in the future']],
  ['Cib', 'Owl', 'ancient wisdom, forgiveness, counsel, healing, and ancestral perspective', ['Wise counsel', 'Reflective intelligence', 'Pattern recognition'], ['Carrying old burdens', 'Overthinking', 'Confusing forgiveness with access']],
  ['Caban', 'Earth', 'synchronicity, movement, grounding, sensitivity, and earth intelligence', ['Grounded intuition', 'Environmental sensitivity', 'Manifestation'], ['Instability', 'Over-reading signs', 'Restlessness']],
  ['Etznab', 'Mirror', 'truth, reflection, discernment, justice, and revealing what is hidden', ['Truth telling', 'Clarity', 'Fairness'], ['Harshness', 'Over-analysis', 'Using truth without compassion']],
  ['Cauac', 'Storm', 'cleansing, renewal, transformation, emotional weather, and breakthrough', ['Catalytic energy', 'Courage in change', 'Renewal'], ['Emotional turbulence', 'Disrupting without repair', 'Seeking intensity']],
  ['Ahau', 'Sun', 'illumination, universal love, vitality, warmth, and radiant completion', ['Warmth', 'Leadership', 'Compassion'], ['Pride', 'Constant performance', 'Exhaustion from always radiating']],
].map(([name, symbol, meaning, gifts, growth]) => Object.freeze({ name, symbol, meaning, gifts, growth })));

export const GALACTIC_TONES = Object.freeze([
  ['Magnetic', 'unity, purpose, attraction, and initiation', ['Gather energy', 'Name the purpose', 'Begin with one clear intention']],
  ['Lunar', 'polarity, challenge, stabilization, and cooperation', ['See both sides', 'Balance tension', 'Learn through contrast']],
  ['Electric', 'activation, service, movement, and bonding', ['Create momentum', 'Serve through action', 'Connect people and purpose']],
  ['Self-Existing', 'definition, form, measurement, and structure', ['Clarify the shape', 'Build a container', 'Make the idea usable']],
  ['Overtone', 'empowerment, radiance, command, and center', ['Stand at the center', 'Empower others', 'Direct energy clearly']],
  ['Rhythmic', 'balance, equality, organization, and flow', ['Create rhythm', 'Restore balance', 'Organize calmly']],
  ['Resonant', 'attunement, inspiration, channeling, and mystical power', ['Listen deeply', 'Follow inspiration', 'Tune before acting']],
  ['Galactic', 'harmony, integrity, modeling, and art', ['Model integrity', 'Harmonize values', 'Live the pattern']],
  ['Solar', 'intention, realization, pulsing, and completion', ['Sustain intention', 'Move toward realization', 'Complete the next step']],
  ['Planetary', 'manifestation, production, refinement, and material form', ['Produce results', 'Make ideas visible', 'Refine what works']],
  ['Spectral', 'release, liberation, dissolution, and simplification', ['Let go', 'Free blocked energy', 'Simplify complexity']],
  ['Crystal', 'dedication, cooperation, shared wisdom, and stability', ['Cooperate', 'Share wisdom', 'Build community structure']],
  ['Cosmic', 'presence, transcendence, endurance, and completion', ['Hold presence', 'Complete the cycle', 'See beyond the immediate']],
].map(([name, meaning, practices], index) => Object.freeze({ number: index + 1, name, meaning, practices })));

const positiveModulo = (value, divisor) => ((value % divisor) + divisor) % divisor;

export function isValidBirthDate(day, month, year) {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const candidate = new Date(Date.UTC(year, month - 1, day));
  return candidate.getUTCFullYear() === year && candidate.getUTCMonth() === month - 1 && candidate.getUTCDate() === day;
}

export function calculateMayanSignature({ day, month, year }) {
  if (!isValidBirthDate(day, month, year)) throw new TypeError('Invalid birth date.');
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const daysSinceCorrelation = jdn - 584283;
  const tone = GALACTIC_TONES[positiveModulo(daysSinceCorrelation + 3, 13)];
  const sign = DAY_SIGNS[positiveModulo(daysSinceCorrelation + 19, 20)];
  return { sign, tone, signature: `${tone.number} ${sign.name}` };
}

export function normalizeReportOrder(order) {
  const birthDate = {
    day: Number(order.birth_day),
    month: Number(order.birth_month),
    year: Number(order.birth_year),
  };
  const calculated = calculateMayanSignature(birthDate);
  return {
    ...order,
    birth_day: birthDate.day,
    birth_month: birthDate.month,
    birth_year: birthDate.year,
    mayan_signature: calculated.signature,
    nawal: calculated.sign.name,
    galactic_tone: calculated.tone.number,
    sign: calculated.sign,
    tone: calculated.tone,
  };
}

export function renderReportHtml(input, options = {}) {
  const order = normalizeReportOrder(input);
  const { sign, tone } = order;
  const coverImageUrl = options.coverImageUrl || 'https://mayanastrologycalculator.com/tzolkin-astrology-chart.webp';
  const birthDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(order.birth_year, order.birth_month - 1, order.birth_day)),
  );
  const title = `${order.mayan_signature}: The ${tone.name} ${sign.symbol}`;
  const relationshipStrength = `${sign.gifts[0]} becomes especially supportive when ${tone.name.toLowerCase()} energy gives it timing and direction.`;
  const relationshipWatch = `${sign.growth[0]} may surface when you try to protect connection without first naming what you need.`;
  const workTheme = `${capitalize(sign.meaning)} can become practical contribution through ${tone.meaning}.`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(REPORT_PRODUCT.name)} — ${escapeHtml(order.mayan_signature)}</title><style>
  @page{size:A4;margin:0}*{box-sizing:border-box}html{print-color-adjust:exact;-webkit-print-color-adjust:exact}body{margin:0;background:#eee7db;color:#24211d;font:15.5px/1.55 Georgia,"Times New Roman",serif}.report{width:210mm;margin:0 auto;background:#fffaf0}.page{position:relative;width:210mm;min-height:297mm;padding:21mm 19mm 18mm;page-break-after:always;overflow:hidden}.page:last-child{page-break-after:auto}.page:after{content:"Mayan Astrology Calculator  •  Personal report v${REPORT_PRODUCT.version}";position:absolute;bottom:8mm;left:19mm;color:#987d5a;font:9px Arial,sans-serif;letter-spacing:.04em}.cover{display:flex;align-items:flex-end;padding:22mm;background:linear-gradient(180deg,rgba(21,15,10,.12),rgba(21,15,10,.86)),url("${escapeAttribute(coverImageUrl)}") center/cover no-repeat;color:#fff}.cover:after{color:#eadcc9}.cover-card{width:100%;padding:10mm;border:1px solid rgba(255,255,255,.38);border-radius:20px;background:rgba(25,19,14,.78);backdrop-filter:blur(6px)}.eyebrow,.label{font:700 11px/1.2 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase}.eyebrow{margin:0 0 12px;color:#b9531f}.cover .eyebrow{color:#ffd7ad}h1,h2,h3{margin:0;color:#211a14;line-height:1.12}h1{font-size:47px}.cover h1{color:#fff9ee}h2{font-size:32px;margin:0 0 16px}h3{font-size:19px;margin:20px 0 8px}p{margin:0 0 13px}.lede{font-size:19px;line-height:1.5}.subtitle{margin-top:14px;color:#fce9d1;font-size:20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.meta-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:24px}.card,.callout{padding:17px;border:1px solid #ead4b3;border-radius:14px;background:#fff}.cover .card{border-color:rgba(255,255,255,.25);background:rgba(255,250,240,.94);color:#211a14}.label{display:block;color:#9b421d}.value{display:block;margin-top:4px;font-size:20px;font-weight:700}.section-label{display:inline-block;margin-bottom:20px;padding:7px 11px;border:1px solid #f0c496;border-radius:999px;background:#fff0dc;color:#93411e;font:700 10px Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}.quote{margin:21px 0;padding:12px 0 12px 17px;border-left:5px solid #c95423;color:#513522;font-size:19px;font-style:italic}.good{border-top:5px solid #3e7c63}.watch{border-top:5px solid #bf6038}.steps{margin:0;padding:0;list-style:none;counter-reset:step}.steps li{position:relative;margin:0 0 12px;padding:13px 14px 13px 48px;border:1px solid #ead4b3;border-radius:12px;background:#fff}.steps li:before{counter-increment:step;content:counter(step);position:absolute;left:14px;top:12px;width:24px;height:24px;border-radius:50%;background:#9b421d;color:#fff;text-align:center;font:700 12px/24px Arial,sans-serif}ul,ol{margin:0 0 17px 20px;padding:0}li{margin-bottom:7px}.small{color:#806b52;font:11px/1.45 Arial,sans-serif}.divider{height:1px;margin:20px 0;background:#ead4b3}.signature-mark{display:inline-grid;place-items:center;width:78px;height:78px;margin-bottom:18px;border:2px solid #bd6a32;border-radius:50%;color:#8c3b1b;font:bold 30px Arial,sans-serif}.promise{padding:18px;border-radius:14px;background:#2e241d;color:#fff}.promise h3{margin-top:0;color:#fff}@media screen{.report{box-shadow:0 20px 60px rgba(45,32,19,.18)}}
  </style></head><body><main class="report">
  ${page('cover', `<div class="cover-card"><p class="eyebrow">${REPORT_PRODUCT.name}</p><h1>${escapeHtml(title)}</h1><p class="subtitle">A private, date-based Tzolk’in reflection prepared for ${escapeHtml(birthDate)}.</p><div class="meta-grid"><div class="card"><span class="label">Birth date</span><span class="value">${escapeHtml(birthDate)}</span></div><div class="card"><span class="label">Mayan signature</span><span class="value">${escapeHtml(order.mayan_signature)}</span></div><div class="card"><span class="label">Nawal</span><span class="value">${escapeHtml(sign.name)} · ${escapeHtml(sign.symbol)}</span></div><div class="card"><span class="label">Galactic Tone</span><span class="value">${tone.number} · ${escapeHtml(tone.name)}</span></div></div></div>`)}
  ${page('', `<span class="section-label">Your map</span><h2>Your Signature at a Glance</h2><p class="lede"><strong>${escapeHtml(order.mayan_signature)}</strong> combines the symbolic themes of ${escapeHtml(sign.meaning)} with Tone ${tone.number}, a rhythm of ${escapeHtml(tone.meaning)}.</p><div class="grid"><div class="card"><span class="label">Your Nawal</span><span class="value">${escapeHtml(sign.name)}</span><p>${capitalize(sign.meaning)}.</p></div><div class="card"><span class="label">Your Tone</span><span class="value">${tone.number} ${escapeHtml(tone.name)}</span><p>${capitalize(tone.meaning)}.</p></div></div><h3>How to use this report</h3><p>Read for recognition, not prediction. Mark what matches lived experience, question what does not, and use the practices as small experiments. Your signature is a symbolic lens—not a fixed personality verdict.</p><div class="promise"><h3>Inside your report</h3><p>Nawal depth · Galactic Tone · integrated pattern · relationships · work and purpose · stress and balance · decisions · a seven-day practice.</p></div><p class="small">Calculation: Gregorian date converted with the GMT correlation constant (584283). Interpretive language is provided for reflection and self-discovery.</p>`)}
  ${page('', `<span class="section-label">01 · Your Nawal</span><div class="signature-mark">${escapeHtml(sign.name.slice(0,2).toUpperCase())}</div><h2>${escapeHtml(sign.name)} · ${escapeHtml(sign.symbol)}</h2><p class="lede">Your Nawal centers on ${escapeHtml(sign.meaning)}.</p><p>This pattern may show up as an instinctive way of meeting people, uncertainty, opportunity, and change. Its healthiest expression is chosen consciously; its strained expression often appears when a useful gift is asked to carry too much.</p><div class="grid"><div class="card good"><h3>Natural resources</h3><ul>${list(sign.gifts)}</ul></div><div class="card watch"><h3>Growth edges</h3><ul>${list(sign.growth)}</ul></div></div><p class="quote">The aim is not to perform your Nawal perfectly. It is to notice when its gifts are available—and when they need rest, boundaries, or a different form.</p><h3>A grounding question</h3><p>Where in your life does <strong>${escapeHtml(sign.gifts[0].toLowerCase())}</strong> feel generous and alive, rather than obligatory?</p>`)}
  ${page('', `<span class="section-label">02 · Your Galactic Tone</span><h2>Tone ${tone.number} · ${escapeHtml(tone.name)}</h2><p class="lede">The tone describes how your sign’s energy tends to move: through ${escapeHtml(tone.meaning)}.</p><p>Think of the Nawal as the quality of energy and the tone as its working rhythm. When you respect that rhythm, effort becomes more coherent. When you force another person’s pace, the same strengths may feel scattered or heavy.</p><div class="card"><h3>Three ways to work with this tone</h3><ol class="steps">${tone.practices.map((item) => `<li>${escapeHtml(item)}.</li>`).join('')}</ol></div><h3>When the rhythm is strained</h3><p>Pause before adding more effort. Ask whether the moment needs action, definition, cooperation, release, or simply presence. The answer may be smaller and more practical than the pressure suggests.</p><p class="quote">Tone ${tone.number} asks: “What rhythm lets ${escapeHtml(sign.name)} become useful today?”</p>`)}
  ${page('', `<span class="section-label">03 · Integrated signature</span><h2>The Pattern of ${escapeHtml(order.mayan_signature)}</h2><p class="lede">Your central theme is ${escapeHtml(sign.meaning)}, expressed through ${escapeHtml(tone.meaning)}.</p><p>This combination may repeat across relationships, work, creative decisions, and periods of change. It is not a forecast. It is language for noticing how a strength turns into a habit—and how a habit can become a choice again.</p><div class="grid"><div class="card good"><h3>When aligned</h3><p>${escapeHtml(sign.gifts[0])} and ${escapeHtml(sign.gifts[1].toLowerCase())} gain direction. You can act without needing to prove the value of your gift.</p></div><div class="card watch"><h3>When overused</h3><p>${escapeHtml(sign.growth[0])} may combine with pressure around ${escapeHtml(tone.meaning)}. More effort then produces less clarity.</p></div></div><h3>Your integration sentence</h3><p class="quote">I express ${escapeHtml(sign.name)} with ${escapeHtml(tone.name)} rhythm: deliberately, practically, and without abandoning my limits.</p><p>Return to this sentence when a familiar pattern feels automatic. It creates a pause between symbolic tendency and real-world choice.</p>`)}
  ${page('', `<span class="section-label">04 · Relationships</span><h2>Connection, Communication, and Repair</h2><p class="lede">${escapeHtml(relationshipStrength)}</p><div class="grid"><div class="card good"><h3>What you may bring</h3><ul><li>${escapeHtml(sign.gifts[0])}</li><li>${escapeHtml(sign.gifts[1])}</li><li>A tone of ${escapeHtml(tone.meaning)}</li></ul></div><div class="card watch"><h3>What to watch</h3><p>${escapeHtml(relationshipWatch)}</p><p>Notice whether support is freely chosen or silently expected.</p></div></div><h3>A clearer communication pattern</h3><ol class="steps"><li>Name the observable situation without interpretation.</li><li>Say what you feel or need in one direct sentence.</li><li>Make a request the other person can answer honestly.</li><li>Leave room for repair without erasing your boundary.</li></ol><p class="quote">A healthy bond does not require you to hide the very information that would make closeness more honest.</p>`)}
  ${page('', `<span class="section-label">05 · Work and purpose</span><h2>How Your Signature Contributes</h2><p class="lede">${escapeHtml(workTheme)}</p><p>Your purpose does not have to be one permanent title. It may be the quality you repeatedly bring to teams, customers, communities, and creative work.</p><div class="grid"><div class="card good"><h3>Supportive conditions</h3><ul><li>Room to use ${escapeHtml(sign.gifts[0].toLowerCase())}</li><li>A clear purpose and humane pace</li><li>Feedback tied to real outcomes</li><li>Boundaries that protect attention</li></ul></div><div class="card watch"><h3>Draining conditions</h3><ul><li>Constant urgency without reflection</li><li>Responsibility without authority</li><li>Work that rewards ${escapeHtml(sign.growth[0].toLowerCase())}</li><li>Visibility without recovery time</li></ul></div></div><h3>A practical purpose prompt</h3><p>What problem could you help solve this month using <strong>${escapeHtml(sign.gifts[0].toLowerCase())}</strong> in a way that is measurable, bounded, and genuinely useful?</p>`)}
  ${page('', `<span class="section-label">06 · Stress and balance</span><h2>Your Early Warning System</h2><p class="lede">The shadow of a gift is often the same gift used beyond its healthy limit.</p><div class="grid"><div class="card"><span class="label">Early signal</span><span class="value">${escapeHtml(sign.growth[0])}</span><p>Look for the first small sign, not only the final breaking point.</p></div><div class="card"><span class="label">Restoring move</span><span class="value">Choose the tone</span><p>Return to ${escapeHtml(tone.practices[0].toLowerCase())} before taking on more.</p></div></div><h3>A three-part reset</h3><ol class="steps"><li><strong>Locate:</strong> Where is pressure showing up—in the body, calendar, or conversation?</li><li><strong>Separate:</strong> What belongs to you, and what are you carrying for someone else?</li><li><strong>Select:</strong> Choose one action aligned with ${escapeHtml(tone.name)}, then stop and reassess.</li></ol><p class="quote">Balance is not the absence of intensity. It is the ability to notice intensity before it chooses for you.</p>`)}
  ${page('', `<span class="section-label">07 · Decisions and timing</span><h2>A Signature-Based Decision Filter</h2><p>Use this page when two options both look plausible or when urgency makes every choice feel equally important.</p><ol class="steps"><li><strong>Purpose:</strong> Which option serves a purpose you can name in one sentence?</li><li><strong>Gift:</strong> Which option lets ${escapeHtml(sign.gifts[0].toLowerCase())} operate without rewarding ${escapeHtml(sign.growth[0].toLowerCase())}?</li><li><strong>Rhythm:</strong> Which option respects the ${escapeHtml(tone.name.toLowerCase())} need for ${escapeHtml(tone.meaning)}?</li><li><strong>Boundary:</strong> What must be protected for the choice to remain sustainable?</li><li><strong>Evidence:</strong> What small test could give you better information before a large commitment?</li></ol><div class="callout"><h3>Your next-decision note</h3><p><strong>The decision:</strong> __________________________________________</p><p><strong>The smallest honest next step:</strong> ____________________________</p><p><strong>What I will review afterward:</strong> ______________________________</p></div>`)}
  ${page('', `<span class="section-label">08 · Seven-day integration</span><h2>Turn Insight into Observation</h2><p>These practices are intentionally small. Their purpose is to test the reading against your real life—not to make the reading true by force.</p><ol class="steps"><li><strong>Day 1:</strong> Record one moment when ${escapeHtml(sign.gifts[0].toLowerCase())} appeared naturally.</li><li><strong>Day 2:</strong> Notice where ${escapeHtml(tone.name.toLowerCase())} rhythm helped or hindered a decision.</li><li><strong>Day 3:</strong> Set one boundary before pressure becomes resentment.</li><li><strong>Day 4:</strong> Make one direct request instead of hoping it will be inferred.</li><li><strong>Day 5:</strong> Use your signature gift on one bounded, useful task.</li><li><strong>Day 6:</strong> Catch ${escapeHtml(sign.growth[0].toLowerCase())} early and choose a restoring move.</li><li><strong>Day 7:</strong> Write what matched, what did not, and what you want to keep practicing.</li></ol>`)}
  ${page('', `<span class="section-label">Closing reflection</span><h2>Your Report Belongs to You</h2><p class="lede">Keep the language that helps you see more clearly. Release any interpretation that narrows your freedom or contradicts lived experience.</p><h3>Reflection prompts</h3><ul><li>Which description felt immediately recognizable?</li><li>Which growth edge deserves curiosity rather than judgment?</li><li>Where could your signature become service without becoming self-sacrifice?</li><li>What is one practice you will repeat for the next month?</li></ul><div class="divider"></div><h3>Methodology and cultural scope</h3><p>The date calculation uses the widely used GMT correlation constant to derive a Tzolk’in day sign and tone. The interpretive synthesis is modern, English-language reflective content. It does not claim lineage authority and should not be treated as a complete account of living Maya traditions.</p><p>This report is educational and reflective. It is not scientific, medical, legal, financial, or psychological advice.</p><div class="promise"><h3>Our delivery promise</h3><p>If your paid report cannot be delivered or the file is unusable, contact support@mayanastrologycalculator.com within 7 days so we can replace it or refund the purchase.</p></div><p class="small">Prepared by Mayan Astrology Calculator · ${escapeHtml(REPORT_PRODUCT.name)} v${REPORT_PRODUCT.version}</p>`)}
  </main></body></html>`;
}

function page(className, content) {
  return `<section class="page ${className}">${content}</section>`;
}

function list(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#096;');
}
