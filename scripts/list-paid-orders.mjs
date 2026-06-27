import { d1 } from './report-common.mjs';

const includeTest = process.argv.includes('--include-test');

const rows = await d1(`
  SELECT
    id,
    status,
    delivery_status,
    customer_email,
    mayan_signature,
    birth_day,
    birth_month,
    birth_year,
    paid_at
  FROM report_orders
  WHERE status = 'paid'
    AND delivery_status IN ('not_started', 'generating')
    ${includeTest ? '' : "AND stripe_checkout_session_id LIKE 'cs_live_%'"}
  ORDER BY paid_at ASC
`);

if (rows.length === 0) {
  console.log(includeTest ? 'No paid reports waiting for delivery.' : 'No live paid reports waiting for delivery.');
} else {
  console.table(rows);
}
