'use client';

import { useEffect, useRef, useState } from 'react';
import { REPORT_PRODUCT, reportDeliveryCopy } from '../lib/report-product';

type OrderStatus = {
  status?: string;
  delivery_status?: string;
  mayan_signature?: string;
};

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
};

export default function ReportOrderStatus() {
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const purchaseTracked = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');
    const sessionId = params.get('session_id');
    if (!orderId || !sessionId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const load = async () => {
      try {
        const response = await fetch(`/api/report-status?order_id=${encodeURIComponent(orderId)}&session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
        if (!response.ok) return;
        const nextOrder = await response.json() as OrderStatus;
        if (cancelled) return;
        setOrder(nextOrder);
        if (nextOrder.status === 'paid' && !purchaseTracked.current) {
          purchaseTracked.current = true;
          (window as AnalyticsWindow).gtag?.('event', 'paid_report_purchase_confirmed', {
            report_type: REPORT_PRODUCT.code,
            price_usd: REPORT_PRODUCT.priceUsd,
            offer_version: REPORT_PRODUCT.offerVersion,
          });
        }
        if (REPORT_PRODUCT.instantDeliveryEnabled && nextOrder.delivery_status !== 'delivered') {
          timer = setTimeout(load, 5000);
        }
      } catch {
        // The receipt remains useful even if a transient status request fails.
      }
    };
    void load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const delivered = order?.delivery_status === 'delivered';

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 mb-6" aria-live="polite">
      <h2 className="font-bold text-gray-950 mb-2">What happens next</h2>
      <ul className="space-y-2 text-gray-700">
        <li>✓ Your payment and birth date details are recorded securely.</li>
        <li>✓ Your report is calculated from the submitted date, not from editable browser values.</li>
        <li>{delivered ? '✓ Your report has been emailed.' : `• Your private PDF is ${reportDeliveryCopy.toLowerCase()}.`}</li>
      </ul>
      {order?.mayan_signature && (
        <p className="mt-3 text-sm font-semibold text-orange-800">Order signature: {order.mayan_signature}</p>
      )}
      <p className="mt-3 text-sm text-gray-600">Check spam or promotions folders. Your download link is private and time-limited.</p>
    </div>
  );
}
