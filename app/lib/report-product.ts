export const REPORT_PRODUCT = {
  code: 'personal_mayan_signature_v2',
  name: 'Personal Mayan Signature Report',
  priceUsd: 7,
  offerVersion: 'v2_7usd',
  instantDeliveryEnabled: process.env.NEXT_PUBLIC_INSTANT_REPORTS === 'true',
} as const;

export const reportDeliveryCopy = REPORT_PRODUCT.instantDeliveryEnabled
  ? 'Generated privately and emailed within minutes'
  : 'Prepared privately and emailed within 24–48 hours';
