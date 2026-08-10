# Report transparency rollout

This migration keeps the GMT 584283 calculation and the existing `number + day sign` result stable. It versions the interpretive layer separately so old orders remain reproducible.

## Versions

- Calculation: `gmt584283-proleptic-gregorian-v1`
- Control report: `reflective-v2`, report version `2`, experiment key `legacy_v2`
- Transparent report: `transparent-reflective-v3`, report version `3`, experiment key `transparent_v3`

## Release order

The treatment must remain at 0% until steps 1-4 are complete.

1. Run the local verification suite.

   ```powershell
   npm run lint
   npm run test:report
   npm run test:checkout
   npm run build
   ```

2. Apply the D1 migration.

   ```powershell
   npx wrangler d1 migrations apply mayanastrologycalculator-reports --remote --config wrangler.report-worker.jsonc
   ```

3. Deploy the report Worker before enabling any v3 traffic.

   ```powershell
   npx wrangler deploy --config wrangler.report-worker.jsonc
   ```

4. QA both variants on the result page.

   - Control: `/result?day=1&month=1&year=2000&report_offer=legacy_v2`
   - Treatment: `/result?day=1&month=1&year=2000&report_offer=transparent_v3`

5. Set the build-time variable `NEXT_PUBLIC_REPORT_V3_ROLLOUT_PERCENT=10` and deploy Pages.

6. Compare the following GA events by `experiment_variant` and `offer_version`:

   - `paid_report_offer_view`
   - `sample_report_click`
   - `paid_report_checkout_click`
   - `begin_checkout`
   - `checkout_session_created`

7. Increase gradually from 10% to 25%, 50%, and 100% only after reviewing purchase conversion, refunds, delivery failures, and support messages.

## Rollback

Set `NEXT_PUBLIC_REPORT_V3_ROLLOUT_PERCENT=0` and redeploy Pages. Existing v3 orders continue to render as v3 because the selected report and interpretation versions are stored on the order. Do not rewrite old order versions during rollback.

## Database compatibility

The checkout endpoint falls back to the existing schema if migration 005 has not been applied. This prevents checkout downtime during the deployment window. The experiment must nevertheless stay at 0% until the migration and Worker deployment are complete, because the fallback cannot persist every methodology field.
