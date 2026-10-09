import DraftArticle from '../../components/content/DraftArticle';
import { contentMetadata, daySignSlugs, loadContentDraft } from '../../lib/content/pages';

export function generateStaticParams() {
  return daySignSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return contentMetadata(`day-signs/${slug}`);
}

export default async function DaySignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DraftArticle draft={loadContentDraft(`day-signs/${slug}`)} />;
}
