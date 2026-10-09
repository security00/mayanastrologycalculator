import InlineCalculator from './InlineCalculator';
import DualConverter from './DualConverter';
import CalendarEnhancer from './CalendarEnhancer';
import { SampleAction, SamplePairLink } from './SampleAction';
import { renderMarkdown } from '../../../shared/draft-render.js';

type Block =
  | { type: 'md'; markdown: string }
  | { type: 'calculator'; prompt: string; highlight: boolean }
  | { type: 'converter' }
  | { type: 'enhance' }
  | { type: 'action'; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string; placement: string }
  | { type: 'pair'; label: string; href: string; placement: string };

export type DraftView = {
  fileKey: string;
  title: string;
  description: string;
  canonical: string;
  canonicalPath: string;
  blocks: Block[];
  faq: { question: string; answer: string }[];
  breadcrumbs: { name: string; path: string }[];
};

const SITE = 'https://mayanastrologycalculator.com';

function jsonLd(draft: DraftView) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: draft.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE}${crumb.path === '/' ? '' : crumb.path}`,
      })),
    },
  ];
  if (draft.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: draft.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }
  if (draft.canonicalPath === '/reports') {
    graph.push(
      product('Personal Mayan Signature Report', 7, '/sample-report'),
      product('Mayan Compatibility Report', 12, '/sample-compatibility-report'),
    );
  }
  if (draft.canonicalPath === '/sample-report') {
    graph.push(product('Personal Mayan Signature Report', 7, '/sample-report'));
  }
  if (draft.canonicalPath === '/sample-compatibility-report') {
    graph.push(product('Mayan Compatibility Report', 12, '/sample-compatibility-report'));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function product(name: string, price: number, path: string) {
  return {
    '@type': 'Product',
    name,
    url: `${SITE}${path}`,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

function enhancerMode(fileKey: string): 'sign' | 'tone' | 'trecena' | null {
  if (fileKey === 'galactic-tones/index') return 'trecena';
  if (fileKey.startsWith('galactic-tones/')) return 'tone';
  if (fileKey.startsWith('day-signs/') && fileKey !== 'day-signs/index') return 'sign';
  return null;
}

export default function DraftArticle({ draft }: { draft: DraftView }) {
  const mode = enhancerMode(draft.fileKey);
  const slug = draft.fileKey.startsWith('day-signs/') ? draft.fileKey.split('/')[1] : undefined;
  const tonePart = draft.fileKey.startsWith('galactic-tones/') ? draft.fileKey.split('/')[1] : undefined;
  const tone = tonePart && tonePart !== 'index' ? Number(tonePart) : undefined;

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(draft)) }} />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 content-prose">
        <article data-draft-article="">
          {draft.blocks.map((block, index) => {
            if (block.type === 'md') {
              return <div key={index} dangerouslySetInnerHTML={{ __html: renderMarkdown(block.markdown) }} />;
            }
            if (block.type === 'calculator') {
              return (
                <InlineCalculator
                  key={index}
                  prompt={block.prompt}
                  highlightSlug={block.highlight ? slug : undefined}
                />
              );
            }
            if (block.type === 'converter') return <DualConverter key={index} />;
            if (block.type === 'enhance' && mode) {
              return <CalendarEnhancer key={index} mode={mode} slug={slug} tone={tone} />;
            }
            if (block.type === 'action') {
              return (
                <SampleAction
                  key={index}
                  primaryLabel={block.primaryLabel}
                  primaryHref={block.primaryHref}
                  secondaryLabel={block.secondaryLabel}
                  secondaryHref={block.secondaryHref}
                  placement={block.placement}
                />
              );
            }
            if (block.type === 'pair') {
              return <SamplePairLink key={index} label={block.label} href={block.href} placement={block.placement} />;
            }
            return null;
          })}
        </article>
      </main>
    </div>
  );
}

export function draftMetadata(draft: { title: string; description: string; canonical: string; robots: string }) {
  const [index, follow] = draft.robots.split(',').map((part) => part.trim());
  return {
    title: draft.title,
    description: draft.description,
    alternates: { canonical: draft.canonical },
    robots: { index: index !== 'noindex', follow: follow !== 'nofollow' },
    openGraph: {
      title: draft.title,
      description: draft.description,
      url: draft.canonical,
      siteName: 'Mayan Astrology Calculator',
      type: 'article' as const,
      images: [{
        url: 'https://mayanastrologycalculator.com/ref-page/og-image.webp',
        width: 1200,
        height: 630,
        alt: draft.title,
      }],
    },
  };
}
