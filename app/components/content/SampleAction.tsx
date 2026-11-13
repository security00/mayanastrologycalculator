'use client';

import type { ReactNode } from 'react';
import { reportOfferFromCta, trackEvent } from '../../lib/analytics';

export function trackSampleClick(placement: string, href: string) {
  const target = href.includes('.pdf') ? 'pdf' : 'html';
  trackEvent('sample_report_click', {
    placement,
    target,
    report_type: href.includes('compatibility') ? 'compatibility' : 'personal',
  });
}

function trackReportCta(placement: string, label: string, href: string) {
  trackEvent('report_cta_click', {
    placement,
    destination: href,
    ...reportOfferFromCta(label, href),
  });
}

export function SampleAction({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  placement,
  className = '',
}: {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  placement: string;
  className?: string;
}) {
  const sampleLink = secondaryHref.includes('/sample');
  return (
    <div className={`sample-cta ${className}`.trim()}>
      <a
        className="btn-ember inline-block px-6 py-3 text-center"
        href={primaryHref}
        onClick={() => trackReportCta(placement, primaryLabel, primaryHref)}
      >
        {primaryLabel}
      </a>
      <a
        className="sample-link"
        href={secondaryHref}
        onClick={sampleLink ? () => trackSampleClick(placement, secondaryHref) : undefined}
      >
        {secondaryLabel}
      </a>
    </div>
  );
}

export function TrackedSampleLink({
  href,
  placement,
  children,
  className = 'sample-link',
}: {
  href: string;
  placement: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} onClick={() => trackSampleClick(placement, href)}>
      {children}
    </a>
  );
}

export function SamplePairLink({
  label,
  href,
  placement,
}: {
  label: string;
  href: string;
  placement: string;
}) {
  return (
    <p className="sample-cta-pair">
      <a className="sample-link" href={href} onClick={() => trackSampleClick(placement, href)}>
        {label}
      </a>
    </p>
  );
}
