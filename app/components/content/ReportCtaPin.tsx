import Link from 'next/link';
import { SampleAction, TrackedSampleLink } from './SampleAction';

const noteClass = 'text-sm leading-relaxed text-[var(--parchment-dim)]';

export function PersonalReportPin({
  placement,
  trustNote,
  chartCta = false,
}: {
  placement: string;
  trustNote: string;
  chartCta?: boolean;
}) {
  return (
    <div>
      {chartCta ? (
        <p>
          <Link href="/birth-chart" className="btn-ember inline-block px-6 py-3 text-center">
            Calculate my Maya signature
          </Link>
        </p>
      ) : null}
      <SampleAction
        primaryLabel="Get the 11-page report — $7"
        primaryHref="/reports"
        secondaryLabel="See a full sample report first →"
        secondaryHref="/sample-report"
        placement={placement}
      />
      <p className={noteClass}>
        <strong className="text-[var(--parchment)]">Trust note:</strong> {trustNote}
      </p>
      <p className={noteClass}>
        Comparing two people?{' '}
        <Link href="/reports" className="link-gold font-semibold">Get the pair report — $12</Link>
        {' · '}
        <TrackedSampleLink href="/sample-compatibility-report" placement={`${placement}_pair`}>
          See a sample pair report first →
        </TrackedSampleLink>
      </p>
    </div>
  );
}

export function PairReportPin({
  placement,
  trustNote,
  helper = 'Optional 11-page pair PDF · $12 · one-time',
  className = '',
  noteClassName = noteClass,
}: {
  placement: string;
  trustNote: string;
  helper?: string;
  className?: string;
  noteClassName?: string;
}) {
  return (
    <div>
      <SampleAction
        className={className}
        primaryLabel="Get the pair report — $12"
        primaryHref="/reports"
        secondaryLabel="See a sample pair report first →"
        secondaryHref="/sample-compatibility-report"
        placement={placement}
      />
      {helper ? <p className="text-center text-xs text-[var(--parchment-faint)]">{helper}</p> : null}
      <p className={noteClassName}>
        <strong className="text-[var(--parchment)]">Trust note:</strong> {trustNote}
      </p>
    </div>
  );
}
