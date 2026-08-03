ALTER TABLE report_orders ADD COLUMN report_version INTEGER NOT NULL DEFAULT 1;
ALTER TABLE report_orders ADD COLUMN fulfillment_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE report_orders ADD COLUMN report_object_key TEXT;
ALTER TABLE report_orders ADD COLUMN report_expires_at TEXT;
ALTER TABLE report_orders ADD COLUMN last_delivery_error TEXT;

CREATE INDEX IF NOT EXISTS idx_report_orders_report_expiry ON report_orders(report_expires_at);
