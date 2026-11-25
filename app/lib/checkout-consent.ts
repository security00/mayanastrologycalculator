export const CHECKOUT_CONSENT_MESSAGE = 'Please tick the delivery consent box to continue.';
export const CHECKOUT_BLOCKED_EVENT = 'checkout_blocked_no_consent';

export const CHECKOUT_PRODUCT = {
  personal: 'personal_report',
  compatibility: 'compatibility_report',
} as const;

export type CheckoutProduct = (typeof CHECKOUT_PRODUCT)[keyof typeof CHECKOUT_PRODUCT];

export function blockedCheckoutParams(product: CheckoutProduct, price: number) {
  return { product, price };
}

type ConsentField = {
  scrollIntoView: (options: ScrollIntoViewOptions) => void;
  focus: (options?: FocusOptions) => void;
};

export function revealConsentField(input: ConsentField | null) {
  if (!input) return;
  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  input.focus({ preventScroll: true });
}
