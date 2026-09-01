type PyramidSilhouetteProps = {
  className?: string;
};

/**
 * Stepped pyramid (temple) silhouette with a stairway, used as a
 * wide low-opacity backdrop near page footers.
 */
export default function PyramidSilhouette({ className = '' }: PyramidSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 720 220"
      className={className}
      aria-hidden="true"
      role="presentation"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="pyramid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a24e" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#d4a24e" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="pyramid-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4a24e" stopOpacity="0" />
          <stop offset="50%" stopColor="#eec888" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d4a24e" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* temple */}
      <g fill="url(#pyramid-fade)" stroke="#d4a24e" strokeOpacity="0.35" strokeWidth="1">
        <rect x="322" y="18" width="76" height="34" />
        <rect x="336" y="6" width="48" height="12" />
        {/* nine tiers */}
        <rect x="300" y="52" width="120" height="18" />
        <rect x="276" y="70" width="168" height="18" />
        <rect x="252" y="88" width="216" height="18" />
        <rect x="228" y="106" width="264" height="18" />
        <rect x="204" y="124" width="312" height="18" />
        <rect x="180" y="142" width="360" height="18" />
        <rect x="156" y="160" width="408" height="18" />
        <rect x="132" y="178" width="456" height="18" />
        <rect x="108" y="196" width="504" height="18" />
      </g>

      {/* central stairway */}
      <g stroke="#eec888" strokeOpacity="0.4" strokeWidth="1">
        <line x1="354" y1="52" x2="330" y2="214" />
        <line x1="366" y1="52" x2="390" y2="214" />
        {Array.from({ length: 9 }, (_, i) => {
          const y = 61 + i * 18;
          const inset = 6 + i * 2.6;
          return <line key={i} x1={360 - inset} y1={y} x2={360 + inset} y2={y} />;
        })}
      </g>

      {/* temple door */}
      <rect x="352" y="30" width="16" height="22" fill="#0b0908" stroke="#eec888" strokeOpacity="0.5" strokeWidth="1" />

      {/* ground line */}
      <line x1="0" y1="214" x2="720" y2="214" stroke="url(#pyramid-line)" strokeWidth="1.5" />

      {/* flanking stars */}
      <g fill="#eec888">
        <circle cx="120" cy="60" r="1.6" opacity="0.5" />
        <circle cx="200" cy="30" r="1.2" opacity="0.4" />
        <circle cx="540" cy="44" r="1.6" opacity="0.5" />
        <circle cx="610" cy="90" r="1.2" opacity="0.35" />
        <circle cx="80" cy="130" r="1.2" opacity="0.35" />
        <circle cx="660" cy="150" r="1.4" opacity="0.4" />
      </g>
    </svg>
  );
}
