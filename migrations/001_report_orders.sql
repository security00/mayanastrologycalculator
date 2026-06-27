CREATE TABLE IF NOT EXISTS report_orders (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending',
  report_type TEXT NOT NULL DEFAULT 'birth_chart',
  birth_day INTEGER NOT NULL,
  birth_month INTEGER NOT NULL,
  birth_year INTEGER NOT NULL,
  mayan_signature TEXT NOT NULL,
  nawal TEXT NOT NULL,
  galactic_tone INTEGER NOT NULL,
  amount_usd INTEGER NOT NULL DEFAULT 7,
  amount_total INTEGER,
  currency TEXT NOT NULL DEFAULT 'usd',
  customer_email TEXT,
  stripe_checkout_session_id TEXT,
  stripe_payment_intent_id TEXT,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_report_orders_status ON report_orders(status);
CREATE INDEX IF NOT EXISTS idx_report_orders_customer_email ON report_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_report_orders_created_at ON report_orders(created_at);
