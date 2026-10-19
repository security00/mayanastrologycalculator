'use client';

import type { ReactNode } from 'react';

type AnalyticsWindow = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
};

const PILLAR_CHART_ORIGIN = 'https://pillarchart.com/';

export function pillarChartHref(placement: string) {
  const url = new URL(PILLAR_CHART_ORIGIN);
  url.searchParams.set('utm_source', 'mayanastrologycalculator');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'bazi_crosslink');
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

function trackPillarChartClick(placement: string) {
  (window as AnalyticsWindow).gtag?.('event', 'sister_site_click', {
    placement,
    destination: 'pillarchart',
    link_url: PILLAR_CHART_ORIGIN,
  });
}

export function PillarChartLink({
  placement,
  className,
  children,
}: {
  placement: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={pillarChartHref(placement)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackPillarChartClick(placement)}
    >
      {children}
    </a>
  );
}

export function PillarChartAside({ placement }: { placement: string }) {
  return (
    <aside
      className="panel rounded-2xl border-l-2 border-l-[var(--jade)] p-7 md:p-8"
      aria-label="Chinese Four Pillars chart"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-jade">
        Another birth-date tradition
      </p>
      <h2 className="font-display mb-3 text-2xl text-[var(--parchment)]">
        Read the same birthday as a Chinese Four Pillars chart
      </h2>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[var(--parchment-dim)]">
        Mayan astrology places a birth date on the 260-day Tzolk&apos;in. If you also read East Asian
        charts, Pillar Chart calculates BaZi — the Four Pillars — from the solar terms and true solar
        time, and shows each step. It is a separate site. The hour pillar needs a birth time and place,
        which this Mayan calculator does not use.
      </p>
      <PillarChartLink placement={placement} className="link-gold text-sm">
        Open Pillar Chart →
      </PillarChartLink>
      <p className="mt-2 text-xs text-[var(--parchment-faint)]">Opens pillarchart.com in a new tab.</p>
    </aside>
  );
}
