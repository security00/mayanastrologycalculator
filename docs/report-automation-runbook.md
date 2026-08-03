# Paid report automation runbook

The public $7 checkout remains usable while automation is disabled. Enable instant delivery only after every production check below passes.

## Architecture

1. Stripe Checkout writes a pending order to `REPORT_DB`.
2. The verified Stripe webhook marks the order paid and publishes its ID to `REPORT_QUEUE` when that Pages binding exists.
3. `mayan-report-fulfillment` claims the order idempotently, recalculates the signature from the stored birth date, and renders the deterministic v2 HTML.
4. Browser Run creates the PDF, which is stored in the private `mayan-report-files` R2 bucket.
5. Resend emails a seven-day signed download link. The file is retained privately for 90 days and then removed by the scheduled Worker.
6. The existing local fulfillment scripts remain the recovery path.

## One-time Cloudflare setup

Use Wrangler 4.118 or newer and authenticate interactively. Never put secret values in command arguments or commit them.

```powershell
npx wrangler r2 bucket create mayan-report-files
npx wrangler queues create mayan-report-fulfillment
npx wrangler queues create mayan-report-fulfillment-dlq
```

Apply `migrations/003_automated_report_fulfillment.sql` once to D1 database `6a392165-8261-4f5c-a304-a2888a140515`. Confirm the five new columns exist before deploying the consumer.

In the Cloudflare Pages project settings for `mayanastrologycalculator`, add a Queue producer binding:

- Variable name: `REPORT_QUEUE`
- Queue: `mayan-report-fulfillment`

Do not remove the existing `REPORT_DB` binding or Stripe secrets.

## Resend and Worker secrets

Verify `mayanastrologycalculator.com` in Resend and authorize `reports@mayanastrologycalculator.com`. Then add both Worker secrets interactively:

```powershell
npx wrangler secret put RESEND_API_KEY --config wrangler.report-worker.jsonc
npx wrangler secret put REPORT_LINK_SECRET --config wrangler.report-worker.jsonc
```

`REPORT_LINK_SECRET` should be a new random value used only for report links. Keep the R2 bucket private.

## Deploy and verify

```powershell
npm run test:report
npm run lint
npm run build
npx wrangler deploy --config wrangler.report-worker.jsonc
```

Run a Stripe test-mode purchase and verify all of the following before enabling the public promise:

- the webhook returns 2xx;
- exactly one Queue job claims the order;
- D1 moves from `paid/not_started` to `paid/delivered`;
- the PDF opens and contains the correct date, Nawal, and Tone;
- Resend delivers one message;
- the signed link downloads the PDF and rejects an altered or expired token;
- the R2 bucket is not publicly browsable;
- a duplicate Stripe event does not create a second delivery.

After the production smoke test passes, set the Pages build variable `NEXT_PUBLIC_INSTANT_REPORTS=true` and redeploy. Until then, leave it false so the website continues to promise the existing 24–48 hour fulfillment window.

## Rollback

Set `NEXT_PUBLIC_INSTANT_REPORTS=false`, remove or pause the `REPORT_QUEUE` producer binding, and keep processing paid orders with the existing manual scripts. Do not delete D1 orders or private PDFs during rollback.
