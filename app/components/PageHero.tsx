import type { ReactNode } from 'react';
import TzolkinWheel from './decor/TzolkinWheel';
import GrecaBand from './decor/GrecaBand';
import GlyphMark, { type GlyphName } from './decor/GlyphMark';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  glyphs?: GlyphName[];
  align?: 'left' | 'center';
};

/**
 * Shared immersive header for inner pages: eyebrow, display title,
 * lead paragraph, a faded Tzolk'in wheel on the side and a greca
 * fret band closing the section.
 */
export default function PageHero({
  eyebrow,
  title,
  children,
  glyphs = ['sun', 'serpent', 'star'],
  align = 'left',
}: PageHeroProps) {
  const centered = align === 'center';

  return (
    <header className="relative mb-12 md:mb-16 pt-6 md:pt-10">
      <div className={`pointer-events-none absolute w-[26rem] opacity-25 hidden md:block ${
        centered ? 'left-1/2 -top-40 -translate-x-1/2' : '-top-32 -right-40'
      }`}>
        <TzolkinWheel className="h-auto w-full" />
      </div>

      <div className={`relative max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
        <p className={`eyebrow mb-5 ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.1] text-[var(--parchment)] mb-5">
          {title}
        </h1>
        {children ? (
          <p className={`text-lg text-[var(--parchment-dim)] leading-relaxed ${centered ? 'mx-auto max-w-2xl' : ''}`}>
            {children}
          </p>
        ) : null}

        <div className={`mt-6 flex items-center gap-5 text-[var(--gold-dim)] ${centered ? 'justify-center' : ''}`}>
          {glyphs.map((glyph) => (
            <GlyphMark key={glyph} name={glyph} className="h-6 w-6" />
          ))}
        </div>
      </div>

      <GrecaBand className="mt-10" />
    </header>
  );
}
