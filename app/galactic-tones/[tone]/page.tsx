import DraftArticle from '../../components/content/DraftArticle';
import { contentMetadata, loadContentDraft, toneSlugs } from '../../lib/content/pages';

export function generateStaticParams() {
  return toneSlugs().map((tone) => ({ tone }));
}

export async function generateMetadata({ params }: { params: Promise<{ tone: string }> }) {
  const { tone } = await params;
  return contentMetadata(`galactic-tones/${tone}`);
}

export default async function TonePage({ params }: { params: Promise<{ tone: string }> }) {
  const { tone } = await params;
  return <DraftArticle draft={loadContentDraft(`galactic-tones/${tone}`)} />;
}
