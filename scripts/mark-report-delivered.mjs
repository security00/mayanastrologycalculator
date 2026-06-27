import { d1 } from './report-common.mjs';

const orderId = process.argv[2];
const notes = process.argv.slice(3).join(' ') || 'PDF sent by email';

if (!orderId) {
  throw new Error('Usage: node scripts/mark-report-delivered.mjs ORDER_ID [notes]');
}

await d1(
  `UPDATE report_orders
   SET delivery_status = 'delivered',
       delivered_at = datetime('now'),
       delivery_notes = ?,
       updated_at = datetime('now')
   WHERE id = ?`,
  [notes, orderId]
);

const rows = await d1(
  `SELECT id, status, delivery_status, customer_email, mayan_signature, delivered_at
   FROM report_orders
   WHERE id = ?
   LIMIT 1`,
  [orderId]
);

console.table(rows);
