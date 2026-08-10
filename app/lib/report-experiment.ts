import { REPORT_OFFER_VARIANTS } from '../../shared/report-versions.js';

export type ReportOfferVariant = 'legacy_v2' | 'transparent_v3';

const STORAGE_KEY = 'report_offer_transparency_experiment_v1';

function rolloutPercent() {
  const configured = Number(process.env.NEXT_PUBLIC_REPORT_V3_ROLLOUT_PERCENT ?? '0');
  if (!Number.isFinite(configured)) return 0;
  return Math.min(100, Math.max(0, Math.round(configured)));
}

export function getOrAssignReportOfferVariant(): ReportOfferVariant {
  if (typeof window === 'undefined') return 'legacy_v2';

  const override = new URLSearchParams(window.location.search).get('report_offer');
  if (override === 'legacy_v2' || override === 'transparent_v3') {
    window.localStorage.setItem(STORAGE_KEY, override);
    return override;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'legacy_v2' || stored === 'transparent_v3') return stored;

  const assigned: ReportOfferVariant = Math.random() * 100 < rolloutPercent()
    ? 'transparent_v3'
    : 'legacy_v2';
  window.localStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}

export function getReportOfferMetadata(variant: ReportOfferVariant) {
  return REPORT_OFFER_VARIANTS[variant];
}
