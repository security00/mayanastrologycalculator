type GrecaBandProps = {
  className?: string;
  tone?: 'gold' | 'jade';
};

/**
 * Stepped-fret (greca) band — the classic Mesoamerican temple meander,
 * rendered as a tiling SVG strip between two hairlines.
 */
export default function GrecaBand({ className = '', tone = 'gold' }: GrecaBandProps) {
  const stroke = tone === 'gold' ? '#d4a24e' : '#4fd1a5';
  const bright = tone === 'gold' ? '#eec888' : '#8fe8c8';

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--gold-line-strong)]" />
      <svg width="240" height="22" viewBox="0 0 240 22" className="shrink-0 opacity-70">
        <defs>
          <pattern id={`greca-${tone}`} width="24" height="14" patternUnits="userSpaceOnUse">
            <path
              d="M1 13 L1 3 L17 3 L17 9 L7 9 L7 6 L12 6"
              fill="none"
              stroke={stroke}
              strokeWidth="1.4"
              strokeLinecap="square"
            />
            <circle cx="21" cy="11" r="1.1" fill={bright} />
          </pattern>
        </defs>
        <rect x="0" y="4" width="240" height="14" fill={`url(#greca-${tone})`} />
        <line x1="0" y1="2" x2="240" y2="2" stroke={stroke} strokeOpacity="0.5" strokeWidth="1" />
        <line x1="0" y1="20" x2="240" y2="20" stroke={stroke} strokeOpacity="0.5" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--gold-line-strong)]" />
    </div>
  );
}
