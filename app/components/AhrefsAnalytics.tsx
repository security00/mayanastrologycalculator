import Script from 'next/script';

export default function AhrefsAnalytics() {
  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="pJD49We0ByzZqI7hv2RFJg"
      strategy="afterInteractive"
    />
  );
}
