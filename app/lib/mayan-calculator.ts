// Mayan Astrology Calculator - Tzolk'in Date Conversion
// This algorithm converts Gregorian dates to Mayan Tzolk'in dates

export interface TzolkinDate {
  number: number;
  daySign: string;
  daySignSpanish: string;
  daySignMayan: string;
  meaning: string;
  element: string;
  direction: string;
  color: string;
}

export interface MayanReading {
  tzolkin: TzolkinDate;
  galacticTone: {
    number: number;
    name: string;
    meaning: string;
    keywords: string[];
  };
  nawal: {
    name: string;
    spanish: string;
    mayan: string;
    meaning: string;
    characteristics: string[];
    element: string;
    direction: string;
    color: string;
  };
}

// The 20 day signs (Nawals) in the Tzolk'in calendar
const DAY_SIGNS = [
  {
    name: "Imix",
    spanish: "Lagarto",
    mayan: "Imix",
    meaning: "Crocodile - The primordial waters of creation",
    element: "Water",
    direction: "East",
    color: "Red",
    characteristics: [
      "Nurturing and protective",
      "Connected to primal energies",
      "Natural healers and caregivers",
      "Strong maternal/paternal instincts"
    ]
  },
  {
    name: "Ik",
    spanish: "Viento",
    mayan: "Ik'",
    meaning: "Wind - The breath of life and communication",
    element: "Air",
    direction: "North",
    color: "White",
    characteristics: [
      "Excellent communicators",
      "Mentally agile and quick-thinking",
      "Natural teachers and messengers",
      "Highly intuitive and psychic"
    ]
  },
  {
    name: "Akbal",
    spanish: "Noche",
    mayan: "Ak'b'al",
    meaning: "Night - The house of hidden knowledge",
    element: "Earth",
    direction: "West",
    color: "Blue",
    characteristics: [
      "Deep thinkers and contemplators",
      "Connected to dreams and the subconscious",
      "Natural mystics and spiritual seekers",
      "Protective of family and home"
    ]
  },
  {
    name: "Kan",
    spanish: "Semilla",
    mayan: "K'an",
    meaning: "Seed - The potential for growth and abundance",
    element: "Fire",
    direction: "South",
    color: "Yellow",
    characteristics: [
      "Natural leaders and initiators",
      "Focused on growth and development",
      "Abundant and generous nature",
      "Strong connection to nature"
    ]
  },
  {
    name: "Chicchan",
    spanish: "Serpiente",
    mayan: "Chikchan",
    meaning: "Serpent - Life force and kundalini energy",
    element: "Fire",
    direction: "East",
    color: "Red",
    characteristics: [
      "Powerful life force energy",
      "Natural healers and shamans",
      "Transformative and regenerative",
      "Strong sexual and creative energy"
    ]
  },
  {
    name: "Cimi",
    spanish: "Muerte",
    mayan: "Kimi",
    meaning: "Death - Transformation and rebirth",
    element: "Earth",
    direction: "North",
    color: "White",
    characteristics: [
      "Masters of transformation",
      "Comfortable with change and endings",
      "Natural counselors for life transitions",
      "Deep understanding of cycles"
    ]
  },
  {
    name: "Manik",
    spanish: "Ciervo",
    mayan: "Manik'",
    meaning: "Deer - Grace, gentleness, and spiritual authority",
    element: "Air",
    direction: "West",
    color: "Blue",
    characteristics: [
      "Natural spiritual leaders",
      "Graceful and diplomatic",
      "Strong sense of justice",
      "Excellent mediators and peacemakers"
    ]
  },
  {
    name: "Lamat",
    spanish: "Conejo",
    mayan: "Lamat",
    meaning: "Rabbit - Fertility, abundance, and multiplication",
    element: "Water",
    direction: "South",
    color: "Yellow",
    characteristics: [
      "Highly fertile and creative",
      "Natural artists and creators",
      "Abundant in all areas of life",
      "Strong family orientation"
    ]
  },
  {
    name: "Muluc",
    spanish: "Agua",
    mayan: "Muluk",
    meaning: "Water - Purification and emotional flow",
    element: "Water",
    direction: "East",
    color: "Red",
    characteristics: [
      "Emotionally intuitive and empathetic",
      "Natural healers through water and emotion",
      "Purifying and cleansing energy",
      "Strong psychic abilities"
    ]
  },
  {
    name: "Oc",
    spanish: "Perro",
    mayan: "Ok",
    meaning: "Dog - Loyalty, companionship, and guidance",
    element: "Earth",
    direction: "North",
    color: "White",
    characteristics: [
      "Extremely loyal and faithful",
      "Natural guides and protectors",
      "Strong sense of duty and service",
      "Excellent judges of character"
    ]
  },
  {
    name: "Chuen",
    spanish: "Mono",
    mayan: "Ch'uen",
    meaning: "Monkey - Artistry, playfulness, and creativity",
    element: "Air",
    direction: "West",
    color: "Blue",
    characteristics: [
      "Highly creative and artistic",
      "Playful and entertaining nature",
      "Natural performers and entertainers",
      "Innovative problem solvers"
    ]
  },
  {
    name: "Eb",
    spanish: "Escalera",
    mayan: "Eb'",
    meaning: "Road - The path of destiny and spiritual journey",
    element: "Fire",
    direction: "South",
    color: "Yellow",
    characteristics: [
      "Natural pathfinders and guides",
      "Strong sense of destiny and purpose",
      "Excellent at opening new opportunities",
      "Bridge builders between worlds"
    ]
  },
  {
    name: "Ben",
    spanish: "Caña",
    mayan: "B'en",
    meaning: "Reed - Authority, home, and family pillar",
    element: "Fire",
    direction: "East",
    color: "Red",
    characteristics: [
      "Natural authority figures",
      "Strong family leaders",
      "Pillars of their community",
      "Excellent organizers and administrators"
    ]
  },
  {
    name: "Ix",
    spanish: "Jaguar",
    mayan: "Ix",
    meaning: "Jaguar - Feminine power and earth magic",
    element: "Earth",
    direction: "North",
    color: "White",
    characteristics: [
      "Strong feminine power and intuition",
      "Natural earth magicians and shamans",
      "Protective and fierce when needed",
      "Deep connection to nature spirits"
    ]
  },
  {
    name: "Men",
    spanish: "Águila",
    mayan: "Men",
    meaning: "Eagle - Vision, wisdom, and higher perspective",
    element: "Air",
    direction: "West",
    color: "Blue",
    characteristics: [
      "Visionary and far-sighted",
      "Natural wisdom keepers",
      "Excellent at seeing the big picture",
      "Strong connection to higher realms"
    ]
  },
  {
    name: "Cib",
    spanish: "Búho",
    mayan: "Kib'",
    meaning: "Owl - Ancient wisdom and forgiveness",
    element: "Water",
    direction: "South",
    color: "Yellow",
    characteristics: [
      "Keepers of ancient wisdom",
      "Natural counselors and advisors",
      "Masters of forgiveness and healing",
      "Strong connection to ancestral knowledge"
    ]
  },
  {
    name: "Caban",
    spanish: "Tierra",
    mayan: "Kab'an",
    meaning: "Earth - Synchronicity and earth connection",
    element: "Earth",
    direction: "East",
    color: "Red",
    characteristics: [
      "Highly synchronistic and intuitive",
      "Strong earth connection and grounding",
      "Natural environmentalists",
      "Excellent at manifesting through earth energy"
    ]
  },
  {
    name: "Etznab",
    spanish: "Espejo",
    mayan: "Etz'nab'",
    meaning: "Mirror - Reflection and truth revelation",
    element: "Air",
    direction: "North",
    color: "White",
    characteristics: [
      "Natural truth tellers and mirrors",
      "Excellent at revealing hidden truths",
      "Strong sense of justice and fairness",
      "Catalysts for others' growth"
    ]
  },
  {
    name: "Cauac",
    spanish: "Tormenta",
    mayan: "Kawak",
    meaning: "Storm - Transformation through cleansing",
    element: "Water",
    direction: "West",
    color: "Blue",
    characteristics: [
      "Powerful transformative energy",
      "Natural cleansers and purifiers",
      "Catalysts for major life changes",
      "Strong connection to weather and storms"
    ]
  },
  {
    name: "Ahau",
    spanish: "Sol",
    mayan: "Ajaw",
    meaning: "Sun - Enlightenment and universal love",
    element: "Fire",
    direction: "South",
    color: "Yellow",
    characteristics: [
      "Natural enlightened leaders",
      "Universal love and compassion",
      "Strong solar energy and vitality",
      "Masters of unconditional love"
    ]
  }
];

// The 13 Galactic Tones
const GALACTIC_TONES = [
  {
    number: 1,
    name: "Magnetic",
    meaning: "Unity - Attract and unify purpose",
    keywords: ["Unity", "Purpose", "Attraction", "Initiation"]
  },
  {
    number: 2,
    name: "Lunar",
    meaning: "Polarize - Stabilize and recognize challenge",
    keywords: ["Polarity", "Challenge", "Stabilization", "Cooperation"]
  },
  {
    number: 3,
    name: "Electric",
    meaning: "Activate - Bond and activate service",
    keywords: ["Service", "Activation", "Bonding", "Energy"]
  },
  {
    number: 4,
    name: "Self-Existing",
    meaning: "Define - Measure and define form",
    keywords: ["Form", "Definition", "Measurement", "Structure"]
  },
  {
    number: 5,
    name: "Overtone",
    meaning: "Empower - Command and empower radiance",
    keywords: ["Empowerment", "Radiance", "Command", "Center"]
  },
  {
    number: 6,
    name: "Rhythmic",
    meaning: "Organize - Balance and organize equality",
    keywords: ["Balance", "Equality", "Organization", "Flow"]
  },
  {
    number: 7,
    name: "Resonant",
    meaning: "Channel - Inspire and attune mystical power",
    keywords: ["Mysticism", "Inspiration", "Attunement", "Channel"]
  },
  {
    number: 8,
    name: "Galactic",
    meaning: "Harmonize - Model and harmonize integrity",
    keywords: ["Harmony", "Integrity", "Modeling", "Art"]
  },
  {
    number: 9,
    name: "Solar",
    meaning: "Pulse - Realize and pulse intention",
    keywords: ["Intention", "Completion", "Realization", "Pulse"]
  },
  {
    number: 10,
    name: "Planetary",
    meaning: "Perfect - Produce and manifest perfection",
    keywords: ["Manifestation", "Perfection", "Production", "Material"]
  },
  {
    number: 11,
    name: "Spectral",
    meaning: "Dissolve - Release and liberate energy",
    keywords: ["Liberation", "Release", "Dissolution", "Simplification"]
  },
  {
    number: 12,
    name: "Crystal",
    meaning: "Dedicate - Cooperate and universalize stability",
    keywords: ["Cooperation", "Dedication", "Universalization", "Stability"]
  },
  {
    number: 13,
    name: "Cosmic",
    meaning: "Endure - Transcend and presence magic",
    keywords: ["Transcendence", "Magic", "Presence", "Endurance"]
  }
];

/**
 * Calculate the number of days since the Mayan correlation date
 * Using the GMT correlation constant: 584283 (most widely accepted)
 */
function calculateDaysSinceCorrelation(date: Date): number {
  // GMT correlation: August 11, 3114 BCE (Gregorian) = 0.0.0.0.0 4 Ahau 8 Cumku
  // Julian Day Number for correlation date: 584283
  const correlationJDN = 584283;

  // Calculate Julian Day Number for input date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const day = date.getDate();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  return jdn - correlationJDN;
}

/**
 * Convert a Gregorian date to Tzolk'in date
 */
export function calculateTzolkinDate(birthDate: Date): MayanReading {
  const daysSinceCorrelation = calculateDaysSinceCorrelation(birthDate);

  // Calculate Tzolk'in position
  // The correlation date corresponds to 4 Ahau (day sign 19, number 4)
  const tzolkinNumber = ((daysSinceCorrelation + 4 - 1) % 13) + 1;
  const daySignIndex = (daysSinceCorrelation + 19) % 20;

  const daySign = DAY_SIGNS[daySignIndex];
  const galacticTone = GALACTIC_TONES[tzolkinNumber - 1];

  return {
    tzolkin: {
      number: tzolkinNumber,
      daySign: daySign.name,
      daySignSpanish: daySign.spanish,
      daySignMayan: daySign.mayan,
      meaning: daySign.meaning,
      element: daySign.element,
      direction: daySign.direction,
      color: daySign.color
    },
    galacticTone: galacticTone,
    nawal: {
      name: daySign.name,
      spanish: daySign.spanish,
      mayan: daySign.mayan,
      meaning: daySign.meaning,
      characteristics: daySign.characteristics,
      element: daySign.element,
      direction: daySign.direction,
      color: daySign.color
    }
  };
}

/**
 * Get detailed interpretation for a Mayan reading
 */
export function getDetailedInterpretation(reading: MayanReading): string {
  const { tzolkin, galacticTone, nawal } = reading;

  return `Your Mayan astrology reveals that you were born on ${galacticTone.number} ${nawal.name}, a powerful combination that shapes your spiritual essence and life path.

The Galactic Tone ${galacticTone.number} (${galacticTone.name}) represents ${galacticTone.meaning.toLowerCase()}. This energy influences how you approach life's challenges and opportunities. People with this tone are naturally drawn to ${galacticTone.keywords.join(', ').toLowerCase()}.

Your Nawal, ${nawal.name} (${nawal.spanish} in Spanish, ${nawal.mayan} in Mayan), carries the energy of ${nawal.meaning.toLowerCase()}. This day sign is associated with the ${nawal.element} element and the ${nawal.direction} direction, giving you a natural affinity for ${nawal.color.toLowerCase()} energy.

Key characteristics of ${nawal.name} people include: ${nawal.characteristics.join(', ').toLowerCase()}. These traits, combined with your ${galacticTone.name} tone, create a unique spiritual blueprint that guides your journey through life.

The ancient Maya believed that understanding your Tzolk'in date helps you align with your true purpose and navigate life's cycles with greater wisdom and awareness.`;
}

/**
 * Validate a date for Mayan calculation
 */
export function validateDate(day: number, month: number, year: number): boolean {
  if (year < 1 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Check for valid day in month
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}