import DraftArticle from '../components/content/DraftArticle';
import { contentMetadata, loadContentDraft } from '../lib/content/pages';

export const metadata = contentMetadata('day-signs/index');

export default function DaySignsPage() {
  return <DraftArticle draft={loadContentDraft('day-signs/index')} />;
}
