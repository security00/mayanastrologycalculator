export const REPORT_OFFER_VARIANTS = Object.freeze({
  legacy_v2: Object.freeze({
    key: 'legacy_v2',
    reportVersion: 2,
    interpretationVersion: 'reflective-v2',
    offerVersion: 'v2_7usd',
  }),
  transparent_v3: Object.freeze({
    key: 'transparent_v3',
    reportVersion: 3,
    interpretationVersion: 'transparent-reflective-v3',
    offerVersion: 'v3_transparent_7usd',
  }),
});

export function resolveReportOfferVariant(value) {
  return value === REPORT_OFFER_VARIANTS.transparent_v3.key
    ? REPORT_OFFER_VARIANTS.transparent_v3
    : REPORT_OFFER_VARIANTS.legacy_v2;
}

export function resolveOrderReportVariant(order = {}, options = {}) {
  if (options.offerVariant) return resolveReportOfferVariant(options.offerVariant);
  if (order.experiment_variant) return resolveReportOfferVariant(order.experiment_variant);
  if (order.interpretation_version === REPORT_OFFER_VARIANTS.transparent_v3.interpretationVersion) {
    return REPORT_OFFER_VARIANTS.transparent_v3;
  }
  if (Number(order.report_version) >= REPORT_OFFER_VARIANTS.transparent_v3.reportVersion) {
    return REPORT_OFFER_VARIANTS.transparent_v3;
  }
  return REPORT_OFFER_VARIANTS.legacy_v2;
}
