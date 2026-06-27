import { join } from 'node:path';
import { d1, ensureDir, exportPdf, getOrderOutputDir, renderReportHtml, slugify, writeText } from './report-common.mjs';

const orderId = process.argv[2];
const allowTest = process.argv.includes('--allow-test');

if (!orderId) {
  throw new Error('Usage: node scripts/generate-report.mjs ORDER_ID');
}

const rows = await d1(
  `SELECT * FROM report_orders WHERE id = ? LIMIT 1`,
  [orderId]
);

if (rows.length === 0) {
  throw new Error(`Order not found: ${orderId}`);
}

const order = rows[0];

if (order.status !== 'paid') {
  throw new Error(`Order is not paid. Current status: ${order.status}`);
}

if (!allowTest && !String(order.stripe_checkout_session_id || '').startsWith('cs_live_')) {
  throw new Error('Refusing to generate a customer report for a non-live Stripe session. Pass --allow-test only for internal testing.');
}

await d1(
  `UPDATE report_orders
   SET delivery_status = 'generating',
       updated_at = datetime('now')
   WHERE id = ?`,
  [orderId]
);

const outputDir = getOrderOutputDir(order);
ensureDir(outputDir);

const baseName = `${slugify(order.mayan_signature)}-birth-chart-report`;
const htmlPath = join(outputDir, `${baseName}.html`);
const pdfPath = join(outputDir, `${baseName}.pdf`);

writeText(htmlPath, renderReportHtml(order));
exportPdf(htmlPath, pdfPath);

await d1(
  `UPDATE report_orders
   SET report_generated_at = datetime('now'),
       report_pdf_url = ?,
       updated_at = datetime('now')
   WHERE id = ?`,
  [pdfPath, orderId]
);

console.log('Report generated.');
console.log(`Order: ${orderId}`);
console.log(`Customer: ${order.customer_email}`);
console.log(`Signature: ${order.mayan_signature}`);
console.log(`HTML: ${htmlPath}`);
console.log(`PDF: ${pdfPath}`);
console.log('');
console.log('After emailing the PDF, run:');
console.log(`node scripts/mark-report-delivered.mjs ${orderId}`);
