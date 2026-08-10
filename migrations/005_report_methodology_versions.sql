ALTER TABLE report_orders ADD COLUMN calculation_version TEXT NOT NULL DEFAULT 'gmt584283-proleptic-gregorian-v1';
ALTER TABLE report_orders ADD COLUMN interpretation_version TEXT NOT NULL DEFAULT 'reflective-v2';
ALTER TABLE report_orders ADD COLUMN correlation_constant INTEGER NOT NULL DEFAULT 584283;
ALTER TABLE report_orders ADD COLUMN offer_version TEXT NOT NULL DEFAULT 'v2_7usd';
ALTER TABLE report_orders ADD COLUMN experiment_variant TEXT NOT NULL DEFAULT 'legacy_v2';

CREATE INDEX IF NOT EXISTS idx_report_orders_experiment_variant ON report_orders(experiment_variant);
