import DraftArticle from '../components/content/DraftArticle';
import { contentMetadata, loadContentDraft } from '../lib/content/pages';

const key = 'dreamspell-vs-traditional-maya-calendar';

export const metadata = contentMetadata(key);

export default function DreamspellComparisonPage() {
  return <DraftArticle draft={loadContentDraft(key)} />;
}
