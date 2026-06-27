ALTER TABLE report_orders ADD COLUMN delivery_status TEXT NOT NULL DEFAULT 'not_started';
ALTER TABLE report_orders ADD COLUMN report_pdf_url TEXT;
ALTER TABLE report_orders ADD COLUMN report_generated_at TEXT;
ALTER TABLE report_orders ADD COLUMN delivered_at TEXT;
ALTER TABLE report_orders ADD COLUMN delivery_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_report_orders_delivery_status ON report_orders(delivery_status);
