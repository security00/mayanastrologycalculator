export type GlyphName =
  | 'sun'
  | 'moon'
  | 'wind'
  | 'water'
  | 'serpent'
  | 'maize'
  | 'star'
  | 'obsidian';

type GlyphMarkProps = {
  name: GlyphName;
  className?: string;
};

/**
 * Small abstract glyphs inspired by Mayan iconography.
 * Decorative only — not claimed to be historically accurate day-sign cartouches.
 * Thematic anchors: sun→Ahau, wind→Ik, water→Muluc, serpent→Chicchan,
 * maize→Kan, star→Lamat (Venus), obsidian→Etznab (flint blade),
 * moon→Mayan lunar cycle / Ixchel.
 */
export default function GlyphMark({ name, className = '' }: GlyphMarkProps) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" role="presentation">
      {name === 'sun' && (
        <g {...common}>
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          {Array.from({ length: 8 }, (_, i) => {
            const rad = (i * 45 * Math.PI) / 180;
            const x1 = 12 + 6 * Math.cos(rad);
            const y1 = 12 + 6 * Math.sin(rad);
            const x2 = 12 + 8.6 * Math.cos(rad);
            const y2 = 12 + 8.6 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )}
      {name === 'moon' && (
        <g {...common}>
          <path d="M15.5 4.5 A 8 8 0 1 0 15.5 19.5 A 6.4 6.4 0 0 1 15.5 4.5 Z" />
          <circle cx="15.8" cy="9.2" r="1" fill="currentColor" stroke="none" />
        </g>
      )}
      {name === 'wind' && (
        <g {...common}>
          <path d="M12 12 m0 -1.5 a1.5 1.5 0 0 1 1.5 1.5 a3 3 0 0 1 -3 3 a4.5 4.5 0 0 1 -4.5 -4.5 a6 6 0 0 1 6 -6 a7.5 7.5 0 0 1 7.5 7.5" />
          <path d="M18 14 l2.4 1.8 M18.6 11.5 l2.8 0.4" />
        </g>
      )}
      {name === 'water' && (
        <g {...common}>
          <path d="M3 8 q2.2 -2.4 4.5 0 t4.5 0 t4.5 0 t4.5 0" />
          <path d="M3 13 q2.2 -2.4 4.5 0 t4.5 0 t4.5 0 t4.5 0" />
          <path d="M3 18 q2.2 -2.4 4.5 0 t4.5 0 t4.5 0 t4.5 0" />
        </g>
      )}
      {name === 'serpent' && (
        <g {...common}>
          <path d="M4 17 q4 -8 8 -4 q4 4 8 -6" />
          <circle cx="20" cy="7" r="1.6" />
          <path d="M20 8.6 l-0.6 2.2" />
          <circle cx="7.5" cy="13.5" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="12.5" cy="13.5" r="0.7" fill="currentColor" stroke="none" />
        </g>
      )}
      {name === 'maize' && (
        <g {...common}>
          <path d="M12 3 q4 4.5 4 9.5 q0 5 -4 8.5 q-4 -3.5 -4 -8.5 q0 -5 4 -9.5 Z" />
          <path d="M12 6.5 v11 M9.4 9.5 q2.6 1.6 5.2 0 M9.4 13.5 q2.6 1.6 5.2 0" />
        </g>
      )}
      {name === 'star' && (
        <g {...common}>
          <path d="M12 3 L13.8 10.2 L21 12 L13.8 13.8 L12 21 L10.2 13.8 L3 12 L10.2 10.2 Z" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </g>
      )}
      {name === 'obsidian' && (
        <g {...common}>
          <path d="M12 3 L20 12 L12 21 L4 12 Z" />
          <path d="M12 7.5 L16.5 12 L12 16.5 L7.5 12 Z" />
          <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </g>
      )}
    </svg>
  );
}
