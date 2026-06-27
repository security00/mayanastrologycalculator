import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const rootDir = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

loadDotEnv();

export const config = {
  rootDir,
  accountId: mustGetEnv('CLOUDFLARE_ACCOUNT_ID'),
  databaseId: mustGetEnv('D1_DATABASE_ID'),
  token: mustGetEnv('CLOUDFLARE_API_TOKEN'),
};

export async function d1(sql, params = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ batch: [{ sql, params }] }),
    }
  );
  const data = await response.json();

  if (!response.ok || !data.success || !data.result?.[0]?.success) {
    throw new Error(JSON.stringify(data.errors || data.result?.[0]?.error || data, null, 2));
  }

  return data.result[0].results || [];
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

export function writeText(path, content) {
  ensureDir(resolve(path, '..'));
  writeFileSync(path, content, 'utf8');
}

export function exportPdf(htmlPath, pdfPath) {
  const browser = findBrowser();
  const fileUrl = `file:///${resolve(htmlPath).replace(/\\/g, '/')}`;
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    fileUrl,
  ], { stdio: 'ignore' });
}

export function getOrderOutputDir(order) {
  return join(config.rootDir, 'private-reports', 'orders', `${order.id}-${slugify(order.mayan_signature)}`);
}

export const daySigns = {
  Imix: {
    animal: 'Crocodile',
    meaning: 'primordial waters of creation, nurture, protection, and life force',
    gifts: ['Nurturing presence', 'Protective instincts', 'Emotional sensitivity', 'Capacity to begin new life cycles'],
    growth: ['Overprotecting others', 'Absorbing emotional pressure', 'Confusing care with control'],
  },
  Ik: {
    animal: 'Wind',
    meaning: 'breath, communication, spirit, movement, and inspired speech',
    gifts: ['Clear communication', 'Quick perception', 'Teaching ability', 'Intuitive message carrying'],
    growth: ['Scattered focus', 'Restlessness', 'Speaking before grounding'],
  },
  Akbal: {
    animal: 'Night',
    meaning: 'dreams, hidden knowledge, inner sanctuary, and subconscious wisdom',
    gifts: ['Deep contemplation', 'Dream awareness', 'Inner protection', 'Mystical curiosity'],
    growth: ['Withdrawal', 'Fear of exposure', 'Holding too much inside'],
  },
  Kan: {
    animal: 'Seed',
    meaning: 'growth, potential, abundance, fertility, and organic development',
    gifts: ['Vision for growth', 'Generosity', 'Patience with process', 'Connection to nature'],
    growth: ['Impatience with timing', 'Over-identifying with outcomes', 'Fear of wasted potential'],
  },
  Chicchan: {
    animal: 'Serpent',
    meaning: 'life force, embodiment, instinct, transformation, and creative energy',
    gifts: ['Strong vitality', 'Embodied intuition', 'Transformative presence', 'Creative power'],
    growth: ['Intensity without direction', 'Reactive instincts', 'Power struggles'],
  },
  Cimi: {
    animal: 'Death',
    meaning: 'transformation, endings, release, transition, and rebirth',
    gifts: ['Comfort with change', 'Transition support', 'Emotional courage', 'Cycle awareness'],
    growth: ['Holding endings too long', 'Fear of instability', 'Becoming defined by loss'],
  },
  Manik: {
    animal: 'Deer',
    meaning: 'grace, gentleness, spiritual authority, justice, and mediation',
    gifts: ['Grace under pressure', 'Diplomacy', 'Justice orientation', 'Healing presence'],
    growth: ['Avoiding conflict', 'Over-responsibility', 'Waiting for permission to lead'],
  },
  Lamat: {
    animal: 'Rabbit',
    meaning: 'fertility, abundance, multiplication, beauty, creativity, and bright expression',
    gifts: ['Creative abundance', 'Magnetic charm', 'Joyful expression', 'Ability to multiply opportunities'],
    growth: ['Overextending energy', 'Chasing stimulation', 'Needing external validation'],
  },
  Muluc: {
    animal: 'Water',
    meaning: 'purification, offering, emotional flow, sensitivity, and sacred exchange',
    gifts: ['Emotional intuition', 'Purifying presence', 'Empathy', 'Gift for sincere offering'],
    growth: ['Emotional overwhelm', 'Unclear boundaries', 'Giving beyond capacity'],
  },
  Oc: {
    animal: 'Dog',
    meaning: 'loyalty, companionship, guidance, trust, and heart-centered service',
    gifts: ['Loyalty', 'Protective love', 'Trustworthiness', 'Guidance through devotion'],
    growth: ['Over-attachment', 'Testing loyalty', 'Carrying duty too heavily'],
  },
  Chuen: {
    animal: 'Monkey',
    meaning: 'artistry, play, invention, humor, and creative problem solving',
    gifts: ['Creativity', 'Playfulness', 'Performance', 'Innovative thinking'],
    growth: ['Avoiding seriousness', 'Distraction', 'Hiding truth through humor'],
  },
  Eb: {
    animal: 'Road',
    meaning: 'path, destiny, service, human journey, and opening new ways',
    gifts: ['Pathfinding', 'Service orientation', 'Opportunity building', 'Bridge making'],
    growth: ['Losing direction', 'Serving without boundaries', 'Walking others paths instead of your own'],
  },
  Ben: {
    animal: 'Reed',
    meaning: 'authority, home, family, structure, and the pillar of community',
    gifts: ['Organization', 'Protective leadership', 'Family responsibility', 'Community structure'],
    growth: ['Rigidity', 'Authority pressure', 'Carrying the household alone'],
  },
  Ix: {
    animal: 'Jaguar',
    meaning: 'earth magic, intuition, feminine power, protection, and hidden strength',
    gifts: ['Intuition', 'Protective power', 'Earth connection', 'Quiet courage'],
    growth: ['Secrecy', 'Defensiveness', 'Using silence as armor'],
  },
  Men: {
    animal: 'Eagle',
    meaning: 'vision, wisdom, higher perspective, strategy, and broad awareness',
    gifts: ['Long-range vision', 'Big-picture thinking', 'Strategic insight', 'Perspective'],
    growth: ['Detachment', 'Impatience with detail', 'Living too far in the future'],
  },
  Cib: {
    animal: 'Owl',
    meaning: 'ancient wisdom, forgiveness, counsel, healing, and ancestral perspective',
    gifts: ['Wise counsel', 'Reflective intelligence', 'Forgiveness', 'Pattern recognition'],
    growth: ['Carrying old burdens', 'Overthinking', 'Confusing forgiveness with access'],
  },
  Caban: {
    animal: 'Earth',
    meaning: 'synchronicity, movement, grounding, sensitivity, and earth intelligence',
    gifts: ['Grounded intuition', 'Synchronicity awareness', 'Environmental sensitivity', 'Manifestation'],
    growth: ['Instability', 'Over-reading signs', 'Restlessness'],
  },
  Etznab: {
    animal: 'Mirror',
    meaning: 'truth, reflection, discernment, justice, and revealing what is hidden',
    gifts: ['Truth telling', 'Clarity', 'Fairness', 'Revealing patterns'],
    growth: ['Harshness', 'Over-analysis', 'Using truth without compassion'],
  },
  Cauac: {
    animal: 'Storm',
    meaning: 'cleansing, renewal, transformation, emotional weather, and breakthrough',
    gifts: ['Catalytic energy', 'Purification', 'Courage in change', 'Renewal'],
    growth: ['Emotional turbulence', 'Disrupting without repair', 'Seeking intensity'],
  },
  Ahau: {
    animal: 'Sun',
    meaning: 'illumination, universal love, enlightenment, vitality, and radiant completion',
    gifts: ['Warmth', 'Leadership', 'Compassion', 'Illuminating presence'],
    growth: ['Over-identifying with being the light', 'Pride', 'Exhaustion from constant radiance'],
  },
};

export const tones = {
  1: { name: 'Magnetic', meaning: 'unity, purpose, attraction, and initiation', gifts: ['Gathering energy', 'Starting cycles', 'Naming purpose'] },
  2: { name: 'Lunar', meaning: 'polarity, challenge, stabilization, and cooperation', gifts: ['Seeing both sides', 'Balancing tension', 'Learning through contrast'] },
  3: { name: 'Electric', meaning: 'activation, service, movement, and bonding', gifts: ['Energizing others', 'Serving through action', 'Creating momentum'] },
  4: { name: 'Self-Existing', meaning: 'definition, form, measurement, and structure', gifts: ['Clarifying shape', 'Building containers', 'Turning energy into usable form'] },
  5: { name: 'Overtone', meaning: 'empowerment, radiance, command, and center', gifts: ['Empowering others', 'Standing at the center', 'Directing energy'] },
  6: { name: 'Rhythmic', meaning: 'balance, equality, organization, and flow', gifts: ['Creating rhythm', 'Restoring balance', 'Organizing calmly'] },
  7: { name: 'Resonant', meaning: 'attunement, inspiration, channeling, and mystical power', gifts: ['Deep listening', 'Inspiration', 'Spiritual attunement'] },
  8: { name: 'Galactic', meaning: 'harmony, integrity, modeling, and art', gifts: ['Modeling integrity', 'Harmonizing values', 'Living the pattern'] },
  9: { name: 'Solar', meaning: 'intention, realization, pulsing, and completion', gifts: ['Sustained intention', 'Realization', 'Forward pulse'] },
  10: { name: 'Planetary', meaning: 'manifestation, production, perfection, and material form', gifts: ['Producing results', 'Materializing ideas', 'Making things visible'] },
  11: { name: 'Spectral', meaning: 'release, liberation, dissolution, and simplification', gifts: ['Letting go', 'Freeing energy', 'Simplifying complexity'] },
  12: { name: 'Crystal', meaning: 'dedication, cooperation, universalizing, and stability', gifts: ['Shared wisdom', 'Cooperation', 'Community structure'] },
  13: { name: 'Cosmic', meaning: 'presence, transcendence, endurance, and magic', gifts: ['Holding presence', 'Completing cycles', 'Transcending limits'] },
};

export function renderReportHtml(order) {
  const sign = daySigns[order.nawal] || daySigns.Imix;
  const tone = tones[order.galactic_tone] || tones[1];
  const title = `${order.mayan_signature}: The ${tone.name} ${sign.animal}`;
  const birthDate = `${order.birth_day}/${order.birth_month}/${order.birth_year}`;
  const imagePath = resolve(config.rootDir, 'public', 'tzolkin-astrology-chart.png').replace(/\\/g, '/');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Full Mayan Birth Chart Report - ${escapeHtml(order.mayan_signature)}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #1f2933; font-family: Georgia, "Times New Roman", serif; background: #f8f0df; line-height: 1.55; }
    .report { max-width: 820px; margin: 0 auto; background: #fffaf0; }
    .page { min-height: 260mm; padding: 24mm 18mm; page-break-after: always; position: relative; }
    .page:last-child { page-break-after: auto; }
    .cover { background: linear-gradient(rgba(45,25,10,.38), rgba(45,25,10,.72)), url("file:///${imagePath}") center / cover no-repeat; color: #fff8e8; display: flex; flex-direction: column; justify-content: flex-end; }
    .cover-card { background: rgba(17,24,39,.72); border: 1px solid rgba(254,215,170,.42); border-radius: 18px; padding: 28px; }
    .eyebrow { color: #b45309; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .16em; margin: 0 0 12px; text-transform: uppercase; }
    .cover .eyebrow { color: #fed7aa; }
    h1,h2,h3 { color: #111827; line-height: 1.12; margin: 0; }
    .cover h1 { color: #fff8e8; font-size: 54px; max-width: 620px; }
    h2 { font-size: 34px; margin-bottom: 18px; }
    h3 { font-size: 21px; margin: 22px 0 8px; }
    p { margin: 0 0 14px; font-size: 16px; }
    ul,ol { margin: 0 0 18px 20px; padding: 0; }
    li { margin-bottom: 8px; }
    .subtitle { color: #fef3c7; font-size: 20px; margin: 18px 0 0; max-width: 620px; }
    .meta-grid,.two-col { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-top: 24px; }
    .meta,.callout,.card { background: #fff; border: 1px solid #f3d6a3; border-radius: 14px; padding: 18px; }
    .cover .meta { background: rgba(255,250,240,.94); }
    .meta-label { color: #92400e; display: block; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .meta-value { color: #111827; display: block; font-size: 22px; font-weight: 700; margin-top: 4px; }
    .quote { border-left: 5px solid #ea580c; color: #3f2a12; font-size: 20px; font-style: italic; margin: 22px 0; padding: 10px 0 10px 18px; }
    .section-label { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 999px; color: #9a3412; display: inline-block; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; margin-bottom: 18px; padding: 7px 12px; }
    .footer-note,.muted { color: #8a6b45; font-family: Arial, sans-serif; font-size: 10px; }
  </style>
</head>
<body>
  <main class="report">
    <section class="page cover">
      <div class="cover-card">
        <p class="eyebrow">Full Mayan birth chart report</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="subtitle">A personal Tzolk'in reading prepared for the birth signature of ${escapeHtml(order.mayan_signature)}.</p>
        <div class="meta-grid">
          <div class="meta"><span class="meta-label">Birth date</span><span class="meta-value">${birthDate}</span></div>
          <div class="meta"><span class="meta-label">Tzolk'in signature</span><span class="meta-value">${escapeHtml(order.mayan_signature)}</span></div>
          <div class="meta"><span class="meta-label">Nawal</span><span class="meta-value">${escapeHtml(order.nawal)}, ${sign.animal}</span></div>
          <div class="meta"><span class="meta-label">Galactic Tone</span><span class="meta-value">${order.galactic_tone} ${tone.name}</span></div>
        </div>
      </div>
    </section>

    <section class="page">
      <p class="eyebrow">Mayan Astrology Calculator</p>
      <h2>Your Report at a Glance</h2>
      <p>Your result, <strong>${escapeHtml(order.mayan_signature)}</strong>, combines ${order.nawal}, associated with ${sign.meaning}, with Tone ${order.galactic_tone}, ${tone.name}, associated with ${tone.meaning}.</p>
      <p>This report is designed as a reflective interpretation of your Tzolk'in signature. It gives you a deeper reading than the free result page, including personal themes, relationship patterns, work and creativity guidance, and reflection prompts.</p>
      <div class="two-col">
        <div class="card"><span class="meta-label">Nawal day sign</span><span class="meta-value">${escapeHtml(order.nawal)}</span><p>${capitalize(sign.meaning)}.</p></div>
        <div class="card"><span class="meta-label">Galactic Tone</span><span class="meta-value">${order.galactic_tone} ${tone.name}</span><p>${capitalize(tone.meaning)}.</p></div>
      </div>
      <h3>Methodology and cultural note</h3>
      <p>Your birth date was converted from the Gregorian calendar into the Tzolk'in calendar. The calculated pieces are your Nawal day sign and Galactic Tone. The longer reading is interpretive synthesis written for reflection and self-discovery.</p>
      <p>The Tzolk'in is a sacred Mayan calendar tradition with deep cultural origins. This report uses modern English-language terms such as "Mayan astrology," "Nawal," "day sign," and "Galactic Tone" for educational and reflective purposes. We do not claim official spiritual authority or represent a traditional lineage.</p>
      <p class="footer-note">This report is not medical, financial, legal, or psychological advice.</p>
    </section>

    <section class="page">
      <span class="section-label">01 - Your Nawal</span>
      <h2>${escapeHtml(order.nawal)}: ${sign.animal} Energy</h2>
      <p>${escapeHtml(order.nawal)} carries the themes of ${sign.meaning}. In your life, this may appear as a natural instinct for the qualities that this sign protects and expresses. You may feel most aligned when you allow this symbolic pattern to become a conscious strength rather than an unconscious habit.</p>
      <div class="two-col">
        <div class="callout"><h3>Core gifts</h3><ul>${sign.gifts.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
        <div class="callout"><h3>Growth edges</h3><ul>${sign.growth.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
      </div>
      <p class="quote">Your Nawal points to the kind of energy you naturally carry. The work is to express it with awareness, not let it run on instinct alone.</p>
      <p>When ${escapeHtml(order.nawal)} is balanced, it can become a source of guidance, vitality, and meaningful contribution. When it is strained, the same gifts may become pressure. The path is not to reject the sign, but to mature its expression.</p>
    </section>

    <section class="page">
      <span class="section-label">02 - Your Galactic Tone</span>
      <h2>Tone ${order.galactic_tone}: ${tone.name}</h2>
      <p>Tone ${order.galactic_tone}, ${tone.name}, describes how your Nawal energy moves. It adds rhythm, direction, and expression to the symbolic force of ${escapeHtml(order.nawal)}.</p>
      <p>For you, ${tone.name} energy highlights ${tone.meaning}. This means your ${escapeHtml(order.nawal)} qualities are likely to become most useful when they are expressed through the tone's rhythm rather than forced into someone else's pace.</p>
      <h3>Supportive expressions</h3>
      <ul>${tone.gifts.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      <div class="callout">
        <h3>Integrated tone guidance</h3>
        <p>When ${tone.name} works through ${escapeHtml(order.nawal)}, your task is to let the tone shape the sign into action. Ask yourself: how can this energy become useful, grounded, and kind in real life?</p>
      </div>
    </section>

    <section class="page">
      <span class="section-label">03 - Integrated Reading</span>
      <h2>The Life Pattern of ${escapeHtml(order.mayan_signature)}</h2>
      <p>The integrated pattern of ${escapeHtml(order.mayan_signature)} suggests a life path where ${sign.meaning} is expressed through ${tone.meaning}. This combination is less about a fixed personality label and more about a repeating energetic pattern you can learn to recognize.</p>
      <p>You may notice that the same themes return in relationships, work, creative decisions, and moments of personal transition. The value of the reading is not to predict your future. It is to give language to patterns that may already be moving through your life.</p>
      <div class="two-col">
        <div class="card"><h3>Aligned expression</h3><p>You use your natural gifts consciously, with timing, humility, and practical care for others and yourself.</p></div>
        <div class="card"><h3>Unbalanced expression</h3><p>You may overuse the same gift until it becomes pressure, avoidance, restlessness, or over-responsibility.</p></div>
      </div>
      <p class="quote">Your signature becomes most powerful when its gifts are chosen deliberately rather than performed automatically.</p>
    </section>

    <section class="page">
      <span class="section-label">04 - Relationships and Communication</span>
      <h2>How ${escapeHtml(order.mayan_signature)} Connects</h2>
      <p>In relationships, ${escapeHtml(order.nawal)} may seek connection through the themes of ${sign.meaning}. Tone ${order.galactic_tone} adds the rhythm of ${tone.meaning}, which can shape how you give, receive, speak, and repair.</p>
      <h3>Relationship strengths</h3>
      <ul>
        <li>You may bring a distinct kind of presence that others can feel before they can explain it.</li>
        <li>You may help people understand a situation through your sign's natural lens.</li>
        <li>You may be at your best when your giving is paired with clear boundaries.</li>
      </ul>
      <h3>Communication practice</h3>
      <p>Practice naming what you need without over-explaining it. The healthier form of your signature does not require hiding, performing, or carrying the entire emotional field alone.</p>
    </section>

    <section class="page">
      <span class="section-label">05 - Work, Creativity, and Purpose</span>
      <h2>How Your Signature Contributes</h2>
      <p>In work and creativity, ${escapeHtml(order.mayan_signature)} may thrive when ${sign.meaning} can be made useful through ${tone.meaning}. You may need projects that allow your symbolic pattern to become visible, practical, and connected to purpose.</p>
      <div class="two-col">
        <div class="card"><h3>Supportive environments</h3><ul><li>Work with meaning and room for personal rhythm</li><li>People who respect your natural style</li><li>Projects that turn insight into tangible value</li></ul></div>
        <div class="card"><h3>Draining environments</h3><ul><li>Constant urgency with no reflection</li><li>Roles that use your gifts but ignore your limits</li><li>Work that disconnects you from purpose</li></ul></div>
      </div>
      <p>Your purpose may not be one fixed job title. It may be the way you bring your sign and tone into the situations you touch.</p>
    </section>

    <section class="page">
      <span class="section-label">06 - Reflection and Integration</span>
      <h2>Prompts for ${escapeHtml(order.mayan_signature)}</h2>
      <ol>
        <li>Where do I already express ${escapeHtml(order.nawal)} energy naturally?</li>
        <li>Which part of ${tone.name} energy feels easy, and which part requires maturity?</li>
        <li>Where have my gifts become pressure because I did not set a boundary?</li>
        <li>What relationship would improve if I communicated more directly?</li>
        <li>What kind of work lets my signature become useful rather than hidden?</li>
        <li>What old pattern am I ready to express in a more conscious way?</li>
        <li>How can I honor this reading without treating it as a fixed destiny?</li>
      </ol>
      <h3>7-day integration guide</h3>
      <ul>
        <li><strong>Day 1:</strong> Name one gift of your Nawal that you want to express this week.</li>
        <li><strong>Day 2:</strong> Notice where your tone's rhythm shows up in a decision.</li>
        <li><strong>Day 3:</strong> Practice one small boundary that protects your energy.</li>
        <li><strong>Day 4:</strong> Share one insight or action from your signature with someone you trust.</li>
        <li><strong>Day 5:</strong> Create one simple ritual, note, or reminder connected to your reading.</li>
        <li><strong>Day 6:</strong> Observe where you overuse a strength.</li>
        <li><strong>Day 7:</strong> Write one sentence about how your signature can serve your next chapter.</li>
      </ul>
      <p class="muted">Prepared by Mayan Astrology Calculator. For support, contact support@mayanastrologycalculator.com.</p>
    </section>
  </main>
</body>
</html>`;
}

function loadDotEnv() {
  const envPath = join(rootDir, '.env');
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.trim().replace(/^["']|["']$/g, '');
  }
}

function mustGetEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key}. Add it to .env or set it in your shell.`);
  }
  return value;
}

function findBrowser() {
  const candidates = [
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const browser = candidates.find((candidate) => existsSync(candidate));
  if (!browser) throw new Error('No Edge or Chrome executable found for PDF export.');
  return browser;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
