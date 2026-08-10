export const REPORT_PRODUCT = {
  code: 'personal_mayan_signature_v2',
  name: 'Personal Mayan Signature Report',
  priceUsd: 7,
  offerVersion: 'v2_7usd',
  instantDeliveryEnabled: process.env.NEXT_PUBLIC_INSTANT_REPORTS !== 'false',
} as const;

export const REPORT_EXPERIMENT = {
  name: 'report_transparency_v1',
  defaultRolloutPercent: 0,
} as const;

export const REPORT_ANALYTICS_ITEM = {
  item_id: REPORT_PRODUCT.code,
  item_name: REPORT_PRODUCT.name,
  price: REPORT_PRODUCT.priceUsd,
  quantity: 1,
} as const;

export const reportDeliveryCopy = REPORT_PRODUCT.instantDeliveryEnabled
  ? 'Generated privately and emailed within minutes'
  : 'Prepared privately and emailed within 24–48 hours';
