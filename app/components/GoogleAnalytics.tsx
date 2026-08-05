import Script from 'next/script';

const GOOGLE_ANALYTICS_ID = 'G-4R36DG2336';
const GOOGLE_ADS_ID = 'AW-17631642548';

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-tag"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            var gtag = window.gtag;
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');

            window.gtag_report_purchase_conversion = function(transactionId, value, currency) {
              gtag('event', 'conversion', {
                'send_to': '${GOOGLE_ADS_ID}/N7RCCOarotwcELSHttdB',
                'transaction_id': transactionId,
                'value': value,
                'currency': currency
              });
            };
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
