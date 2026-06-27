# Report order operations

Use these queries to manage manual early-access report delivery.

## Paid orders waiting for delivery

```sql
SELECT
  id,
  customer_email,
  mayan_signature,
  birth_day,
  birth_month,
  birth_year,
  nawal,
  galactic_tone,
  paid_at,
  delivery_status
FROM report_orders
WHERE status = 'paid'
  AND delivery_status IN ('not_started', 'generating')
ORDER BY paid_at ASC;
```

## Mark a report as generating

```sql
UPDATE report_orders
SET delivery_status = 'generating',
    updated_at = datetime('now')
WHERE id = 'ORDER_ID';
```

## Mark a report as delivered

```sql
UPDATE report_orders
SET delivery_status = 'delivered',
    delivered_at = datetime('now'),
    updated_at = datetime('now'),
    delivery_notes = 'PDF sent by email'
WHERE id = 'ORDER_ID';
```

## Orders paid in the last 7 days

```sql
SELECT
  id,
  status,
  delivery_status,
  customer_email,
  mayan_signature,
  paid_at,
  delivered_at
FROM report_orders
WHERE paid_at >= datetime('now', '-7 days')
ORDER BY paid_at DESC;
```

## Manual fulfillment checklist

1. Find paid orders where `delivery_status` is `not_started`.
2. Mark the order as `generating`.
3. Generate the PDF report from the private template.
4. Email the PDF to `customer_email`.
5. Mark the order as `delivered`.
