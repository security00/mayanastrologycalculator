type MayanNumeralProps = {
  value: number;
  className?: string;
};

/**
 * Renders a Mayan vigesimal numeral (dots = 1, bars = 5) for values 1-13.
 * Purely decorative companion to the arabic tone number.
 */
export default function MayanNumeral({ value, className = '' }: MayanNumeralProps) {
  const bars = Math.floor(value / 5);
  const dots = value % 5;

  return (
    <span className={`mayan-numeral ${className}`} aria-hidden="true" title={`Mayan numeral for ${value}`}>
      {dots > 0 && (
        <span className="dots">
          {Array.from({ length: dots }, (_, index) => (
            <span key={index} className="dot" />
          ))}
        </span>
      )}
      {Array.from({ length: bars }, (_, index) => (
        <span key={index} className="bar" />
      ))}
    </span>
  );
}
