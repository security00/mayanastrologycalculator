const CX = 400;
const CY = 400;

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

/*
  20 day-sign glyphs, drawn as abstract carved marks inside a 40x40 cell
  (local coords, cell centered at 0,0). One per Tzolk'in Nawal, in order:
  Imix Ik Akbal Kan Chicchan Cimi Manik Lamat Muluc Oc
  Chuen Eb Ben Ix Men Cib Caban Etznab Cauac Ahau
*/
function DaySignGlyph({ index }: { index: number }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (index % 20) {
    case 0: // Imix — crocodile / primordial water
      return (<g {...s}><path d="M-14 2 Q-7 -6 0 2 Q7 10 14 2" /><path d="M-14 10 Q-7 4 0 10 Q7 16 14 10" /><circle cx="-9" cy="-8" r="2" fill="currentColor" stroke="none" /><circle cx="9" cy="-8" r="2" fill="currentColor" stroke="none" /></g>);
    case 1: // Ik — wind / breath
      return (<g {...s}><path d="M4 -12 Q-12 -10 -10 2 Q-8 12 2 10 Q10 8 8 0 Q6 -6 0 -4" /><path d="M6 12 L14 16" /></g>);
    case 2: // Akbal — night house
      return (<g {...s}><path d="M-12 12 L-12 -4 L0 -14 L12 -4 L12 12 Z" /><circle cx="0" cy="2" r="3" /></g>);
    case 3: // Kan — maize seed
      return (<g {...s}><path d="M0 -14 Q10 -6 8 6 Q4 14 0 14 Q-4 14 -8 6 Q-10 -6 0 -14 Z" /><path d="M0 -8 L0 8" /><path d="M-4 -2 L4 -2" /></g>);
    case 4: // Chicchan — serpent
      return (<g {...s}><path d="M-12 10 Q-6 -2 0 4 Q6 10 12 -6" /><circle cx="12" cy="-6" r="3" /><circle cx="12" cy="-6" r="0.8" fill="currentColor" stroke="none" /></g>);
    case 5: // Cimi — death / transformation
      return (<g {...s}><circle cx="0" cy="-2" r="9" /><circle cx="-3.5" cy="-4" r="1.6" fill="currentColor" stroke="none" /><circle cx="3.5" cy="-4" r="1.6" fill="currentColor" stroke="none" /><path d="M-4 8 L-4 13 M0 8 L0 14 M4 8 L4 13" /></g>);
    case 6: // Manik — deer / healing hand
      return (<g {...s}><path d="M-10 12 L-10 -2 M-3 12 L-3 -8 M4 12 L4 -8 M11 12 L11 -2" /><path d="M-10 -2 Q-10 -10 -3 -8 M4 -8 Q11 -10 11 -2" /></g>);
    case 7: // Lamat — Venus star
      return (<g {...s}><path d="M0 -13 L3 -3 L13 0 L3 3 L0 13 L-3 3 L-13 0 L-3 -3 Z" /><circle cx="0" cy="0" r="2" fill="currentColor" stroke="none" /></g>);
    case 8: // Muluc — water offering
      return (<g {...s}><path d="M-14 -6 Q-7 -12 0 -6 Q7 0 14 -6" /><path d="M-14 2 Q-7 -4 0 2 Q7 8 14 2" /><path d="M-14 10 Q-7 4 0 10 Q7 16 14 10" /></g>);
    case 9: // Oc — dog / loyalty paw
      return (<g {...s}><circle cx="0" cy="6" r="6" /><circle cx="-8" cy="-6" r="2.6" /><circle cx="0" cy="-9" r="2.6" /><circle cx="8" cy="-6" r="2.6" /></g>);
    case 10: // Chuen — monkey / artisan spiral
      return (<g {...s}><path d="M0 -12 Q12 -12 12 0 Q12 10 2 10 Q-6 10 -6 2 Q-6 -4 0 -4 Q4 -4 4 0" /><path d="M10 10 Q16 14 12 16" /></g>);
    case 11: // Eb — sacred road
      return (<g {...s}><path d="M-8 -14 L-8 14 M8 -14 L8 14" /><path d="M-8 -7 L8 -7 M-8 0 L8 0 M-8 7 L8 7" strokeDasharray="3 3" /></g>);
    case 12: // Ben — reed / staff
      return (<g {...s}><path d="M0 -14 L0 14" /><path d="M0 -8 Q7 -10 9 -4 M0 -8 Q-7 -10 -9 -4" /><path d="M0 2 Q6 0 8 5 M0 2 Q-6 0 -8 5" /></g>);
    case 13: // Ix — jaguar spots
      return (<g {...s}><circle cx="0" cy="0" r="11" /><circle cx="-4" cy="-4" r="1.6" fill="currentColor" stroke="none" /><circle cx="4" cy="-2" r="1.6" fill="currentColor" stroke="none" /><circle cx="-1" cy="5" r="1.6" fill="currentColor" stroke="none" /></g>);
    case 14: // Men — eagle
      return (<g {...s}><path d="M-13 2 Q-6 -8 0 -2 Q6 -8 13 2" /><path d="M0 -2 L0 10" /><path d="M-4 10 L4 10" /></g>);
    case 15: // Cib — wisdom / concentric
      return (<g {...s}><circle cx="0" cy="0" r="11" /><circle cx="0" cy="0" r="6" /><circle cx="0" cy="0" r="1.8" fill="currentColor" stroke="none" /></g>);
    case 16: // Caban — earthquake
      return (<g {...s}><path d="M-13 8 L-6 -6 L0 6 L6 -8 L13 4" /></g>);
    case 17: // Etznab — flint blade
      return (<g {...s}><path d="M0 -14 L8 0 L0 14 L-8 0 Z" /><path d="M0 -14 L0 14" /><path d="M-8 0 L8 0" strokeDasharray="2 3" /></g>);
    case 18: // Cauac — storm
      return (<g {...s}><path d="M-11 -4 Q-11 -12 -3 -11 Q2 -15 7 -10 Q13 -9 11 -3 Q14 2 8 3 L-8 3 Q-14 1 -11 -4 Z" /><path d="M-5 8 L-7 13 M1 8 L-1 13 M7 8 L5 13" /></g>);
    default: // 19 Ahau — sun lord
      return (<g {...s}><circle cx="0" cy="0" r="7" /><path d="M0 -13 L0 -9 M0 9 L0 13 M-13 0 L-9 0 M9 0 L13 0 M-9 -9 L-6.5 -6.5 M9 -9 L6.5 -6.5 M-9 9 L-6.5 6.5 M9 9 L6.5 6.5" /></g>);
  }
}

/* Central sun face — stylized Tonatiuh-like solar medallion */
function SunFace() {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  // points sampled along the headband arc M-44 -34 Q0 -52 44 -34
  const bandDots: Array<[number, number]> = [[-35, -37], [-25, -40], [-12, -42], [0, -43], [12, -42], [25, -40], [35, -37]];
  return (
    <g stroke="currentColor" fill="none">
      {/* headdress rays */}
      {rays.map((a) => (
        <path
          key={a}
          d="M0 -92 L7 -70 L-7 -70 Z"
          transform={`rotate(${a})`}
          fill="currentColor"
          fillOpacity={0.35}
          strokeWidth={1.4}
        />
      ))}
      <circle r={70} strokeWidth={2.5} />
      <circle r={61} strokeWidth={1} opacity={0.6} />
      {/* headband with bead dots */}
      <path d="M-44 -34 Q0 -52 44 -34" strokeWidth={2} />
      {bandDots.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={1.7} fill="currentColor" stroke="none" opacity={0.8} />
      ))}
      {/* ear ornaments — large jade plugs flanking the face */}
      <circle cx={-56} cy={10} r={8} strokeWidth={2} />
      <circle cx={-56} cy={10} r={2.6} fill="currentColor" stroke="none" />
      <circle cx={56} cy={10} r={8} strokeWidth={2} />
      <circle cx={56} cy={10} r={2.6} fill="currentColor" stroke="none" />
      {/* eyes */}
      <ellipse cx={-21} cy={-14} rx={9.5} ry={6} strokeWidth={2.2} />
      <ellipse cx={21} cy={-14} rx={9.5} ry={6} strokeWidth={2.2} />
      <circle cx={-21} cy={-14} r={2.2} fill="currentColor" stroke="none" />
      <circle cx={21} cy={-14} r={2.2} fill="currentColor" stroke="none" />
      {/* brows */}
      <path d="M-30 -25 Q-21 -30 -12 -25" strokeWidth={2} />
      <path d="M12 -25 Q21 -30 30 -25" strokeWidth={2} />
      {/* nose */}
      <path d="M0 -6 L-5 8 Q0 12 5 8 Z" strokeWidth={2} />
      {/* cheek scrolls */}
      <path d="M-38 2 Q-46 8 -40 15" strokeWidth={1.8} />
      <path d="M38 2 Q46 8 40 15" strokeWidth={1.8} />
      {/* mouth with sacrificial tongue */}
      <rect x={-15} y={20} width={30} height={9} rx={4} strokeWidth={2.2} />
      <path d="M-4 29 L-5 44 Q0 50 5 44 L4 29" strokeWidth={2.2} fill="currentColor" fillOpacity={0.25} />
    </g>
  );
}

/* Serpent-head totems at the four cardinal points (fire-serpent motif) */
function SerpentHeads() {
  const directions = [0, 90, 180, 270];
  return (
    <g stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {directions.map((a) => (
        <g key={a} transform={`rotate(${a} ${CX} ${CY})`}>
          {/* flame crest behind the head */}
          <path d={`M${CX} 30 L${CX + 11} 56 L${CX - 11} 56 Z`} fill="currentColor" fillOpacity={0.28} strokeWidth={1.4} />
          {/* serpent head, jaws open, pointing outward */}
          <path d={`M${CX - 13} 62 L${CX - 16} 84 L${CX - 7} 78 L${CX} 84 L${CX + 7} 78 L${CX + 16} 84 L${CX + 13} 62 Q${CX} 54 ${CX - 13} 62 Z`} fill="currentColor" fillOpacity={0.18} />
          {/* eye */}
          <circle cx={CX} cy={68} r={3.4} />
          <circle cx={CX} cy={68} r={1.2} fill="currentColor" stroke="none" />
          {/* fangs */}
          <path d={`M${CX - 10} 84 L${CX - 8} 91 L${CX - 5} 84`} />
          <path d={`M${CX + 5} 84 L${CX + 8} 91 L${CX + 10} 84`} />
          {/* forked tongue */}
          <path d={`M${CX} 84 L${CX} 96 M${CX} 96 L${CX - 4} 102 M${CX} 96 L${CX + 4} 102`} />
          {/* snout scrolls */}
          <path d={`M${CX - 20} 74 Q${CX - 27} 66 ${CX - 21} 58`} />
          <path d={`M${CX + 20} 74 Q${CX + 27} 66 ${CX + 21} 58`} />
        </g>
      ))}
    </g>
  );
}

export default function TzolkinWheel({ className = "" }: { className?: string }) {
  const glyphs = Array.from({ length: 20 }, (_, i) => i);
  const beads = Array.from({ length: 40 }, (_, i) => i * 9);
  const petals = Array.from({ length: 20 }, (_, i) => i * 18 + 9);
  const squares = Array.from({ length: 56 }, (_, i) => i * (360 / 56));

  return (
    <svg viewBox="0 0 800 800" className={className} aria-hidden="true">
      {/* static engraved body: face + glyph ring */}
      <g className="text-[#d4a24e]">
        <SunFace />
        {/* ring framing the 20 day-sign cartouches */}
        <circle cx={CX} cy={CY} r={104} fill="none" stroke="currentColor" strokeWidth={1.4} opacity={0.8} />
        <circle cx={CX} cy={CY} r={182} fill="none" stroke="currentColor" strokeWidth={1.4} opacity={0.8} />
        {glyphs.map((i) => {
          const angle = i * 18;
          const p = polar(angle, 143);
          return (
            <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${angle})`}>
              <rect x={-21} y={-21} width={42} height={42} rx={9} fill="none" stroke="currentColor" strokeWidth={1.8} opacity={0.9} />
              <DaySignGlyph index={i} />
            </g>
          );
        })}
      </g>

      {/* slowly counter-rotating petal + bead rings: Venus stars and moon crescents among them */}
      <g className="wheel-spin-reverse text-[#eec888]" style={{ transformOrigin: "400px 400px" }}>
        {beads.map((a, i) => {
          const p = polar(a, 198);
          // every 5th bead becomes a small moon crescent (lunar cycle)
          if (i % 5 === 0) {
            return (
              <path
                key={a}
                d="M2.4 -4.2 A4.8 4.8 0 1 0 2.4 4.2 A3.7 3.7 0 0 1 2.4 -4.2 Z"
                transform={`translate(${p.x} ${p.y}) rotate(${a})`}
                fill="currentColor"
                fillOpacity={0.6}
              />
            );
          }
          return <circle key={a} cx={p.x} cy={p.y} r={4} fill="currentColor" fillOpacity={0.55} />;
        })}
        {petals.map((a, i) => (
          <g key={a} transform={`rotate(${a} ${CX} ${CY})`}>
            <path
              d={`M${CX} ${CY - 248} Q${CX + 16} ${CY - 224} ${CX} ${CY - 206} Q${CX - 16} ${CY - 224} ${CX} ${CY - 248} Z`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              opacity={0.85}
            />
            {i % 2 === 0 ? (
              // Lamat — Venus four-point star
              <path
                d={`M${CX} ${CY - 231} L${CX + 1.8} ${CY - 227.8} L${CX + 5} ${CY - 226} L${CX + 1.8} ${CY - 224.2} L${CX} ${CY - 221} L${CX - 1.8} ${CY - 224.2} L${CX - 5} ${CY - 226} L${CX - 1.8} ${CY - 227.8} Z`}
                fill="currentColor"
                fillOpacity={0.65}
              />
            ) : (
              <circle cx={CX} cy={CY - 226} r={3.4} fill="currentColor" fillOpacity={0.5} />
            )}
          </g>
        ))}
      </g>

      {/* outer square-bead border, slowest rotation */}
      <g className="wheel-spin text-[#d4a24e]" style={{ transformOrigin: "400px 400px" }}>
        <circle cx={CX} cy={CY} r={262} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.7} />
        <circle cx={CX} cy={CY} r={296} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.7} />
        {squares.map((a) => {
          const p = polar(a, 279);
          return (
            <rect
              key={a}
              x={-5.5}
              y={-5.5}
              width={11}
              height={11}
              transform={`translate(${p.x} ${p.y}) rotate(${a})`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              opacity={0.85}
            />
          );
        })}
      </g>

      <g className="text-[#eec888]">
        <SerpentHeads />
      </g>
    </svg>
  );
}
