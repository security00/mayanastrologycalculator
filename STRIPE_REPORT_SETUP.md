# Stripe paid report setup

The first paid-report version uses Cloudflare Pages Functions, Stripe Checkout, and Cloudflare D1.

## 1. Create the D1 database

Create a D1 database in Cloudflare, then apply:

```bash
migrations/001_report_orders.sql
```

Bind the database to Pages Functions as:

```bash
REPORT_DB
```

## 2. Create the Stripe product and price

Run locally with your Stripe secret key:

```bash
$env:STRIPE_SECRET_KEY="sk_live_or_test_..."
node scripts/create-stripe-report-product.mjs
```

Copy the printed price ID.

## 3. Configure Cloudflare Pages environment variables

Set:

```bash
SITE_URL=https://mayanastrologycalculator.com
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_REPORT_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Keep Stripe keys as encrypted Cloudflare secrets. Do not commit them.

## 4. Configure Stripe webhook

Create a Stripe webhook endpoint:

```bash
https://mayanastrologycalculator.com/api/stripe-webhook
```

Subscribe to:

- `checkout.session.completed`
- `checkout.session.expired`

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 5. Manual fulfillment workflow

When a payment arrives:

1. Check D1 `report_orders` for `status = paid`.
2. Read birth date, Mayan signature, Nawal, Galactic Tone, and customer email.
3. Generate or adapt the PDF report from the private report template.
4. Email the PDF to the customer.

## Notes

- Keep this as a manual early access product until enough paid orders justify automation.
- Do not put Stripe secret keys in client-side code.
- Automate report generation only after paid demand is proven.
