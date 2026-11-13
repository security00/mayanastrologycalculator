import { COMPATIBILITY_PRODUCT } from './mayan-compatibility';
import { REPORT_PRODUCT } from './report-product';

type AnalyticsValue = string | number | boolean | AnalyticsValue[] | { [key: string]: AnalyticsValue };

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params?: Record<string, AnalyticsValue>) => void;
};

export function trackEvent(name: string, params: Record<string, AnalyticsValue | null | undefined> = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as AnalyticsWindow).gtag;
  if (!gtag) return;

  const payload: Record<string, AnalyticsValue> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) payload[key] = value;
  }
  gtag('event', name, payload);
}

export function reportOfferFromCta(label: string, href: string) {
  const pair = /pair|compatib|\$12/i.test(`${label} ${href}`);
  const product = pair ? COMPATIBILITY_PRODUCT : REPORT_PRODUCT;
  return {
    report_type: product.code,
    value: product.priceUsd,
    currency: 'USD' as const,
    price_usd: product.priceUsd,
  };
}
