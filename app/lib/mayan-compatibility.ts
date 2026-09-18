import type { MayanReading } from './mayan-calculator';
import {
  COMPATIBILITY_CONTEXTS,
  COMPATIBILITY_PAID_SECTIONS,
  COMPATIBILITY_PRODUCT,
  buildCompatibilityReading as buildCompatibilityReadingJs,
  normalizeCompatibilityContext as normalizeCompatibilityContextJs,
} from '../../shared/mayan-compatibility.js';

export type CompatibilityContext = 'general' | 'romantic' | 'friendship' | 'work';

export type CompatibilityProfile = {
  signature: string;
  toneNumber: number;
  toneName: string;
  toneMeaning: string;
  nawalName: string;
  nawalMeaning: string;
  element: string;
  direction: string;
  color: string;
  characteristics: string[];
  offer: string;
  need: string;
  strain: string;
  tone: {
    pace: string;
    move: string;
  };
};

export type CompatibilityReading = {
  context: CompatibilityContext;
  contextLabel: string;
  contextLens: string;
  score: number;
  band: 'resonant' | 'balanced' | 'mixed' | 'growth';
  relationshipTheme: string;
  howToUse: string;
  personA: CompatibilityProfile;
  personB: CompatibilityProfile;
  tone: {
    distance: number;
    band: string;
    title: string;
    summary: string;
    detail: string;
  };
  nawal: {
    signDistance: number;
    band: string;
    elementRelation: string;
    directionRelation: string;
    title: string;
    summary: string;
    detail: string;
  };
  strengths: string[];
  friction: string[];
  communication: {
    title: string;
    summary: string;
    steps: string[];
  };
  prompts: string[];
  paidSections: string[];
};

export {
  COMPATIBILITY_CONTEXTS,
  COMPATIBILITY_PAID_SECTIONS,
  COMPATIBILITY_PRODUCT,
};

export const COMPATIBILITY_ANALYTICS_ITEM = {
  item_id: COMPATIBILITY_PRODUCT.code,
  item_name: COMPATIBILITY_PRODUCT.name,
  price: COMPATIBILITY_PRODUCT.priceUsd,
  quantity: 1,
} as const;

export const compatibilityDeliveryCopy = process.env.NEXT_PUBLIC_INSTANT_REPORTS !== 'false'
  ? 'Generated privately and emailed within minutes'
  : 'Prepared privately and emailed within 24–48 hours';

export function normalizeCompatibilityContext(value: string | null | undefined): CompatibilityContext {
  return normalizeCompatibilityContextJs(value) as CompatibilityContext;
}

export function parseCompatibilityContext(value: string | null | undefined): CompatibilityContext | null {
  return COMPATIBILITY_CONTEXTS.includes(value as CompatibilityContext)
    ? value as CompatibilityContext
    : null;
}

export function buildCompatibilityReading(
  personA: MayanReading,
  personB: MayanReading,
  context: string | null | undefined = 'general',
): CompatibilityReading {
  return buildCompatibilityReadingJs(personA, personB, normalizeCompatibilityContext(context)) as CompatibilityReading;
}
