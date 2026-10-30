export type FaqEntry = {
  question: string;
  answer: string;
};

const SITE = 'https://mayanastrologycalculator.com';

export function seoGraph({
  pageName,
  description,
  path,
  breadcrumbs,
  faqs,
  extra = [],
}: {
  pageName: string;
  description: string;
  path: string;
  breadcrumbs?: { name: string; path: string }[];
  faqs?: FaqEntry[];
  extra?: Record<string, unknown>[];
}) {
  const url = `${SITE}${path}`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      name: pageName,
      description,
      url,
    },
    ...extra,
  ];

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.path === '/' ? SITE : `${SITE}${crumb.path}`,
      })),
    });
  }

  if (faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
