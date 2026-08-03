import Script from 'next/script';

const GOOGLE_ANALYTICS_ID = 'G-4R36DG2336';
const GOOGLE_ADS_ID = 'AW-17631642548';

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `,
        }}
      />
    </>
  );
}
