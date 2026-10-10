import DraftArticle from '../components/content/DraftArticle';
import { contentMetadata, loadContentDraft } from '../lib/content/pages';

export const metadata = contentMetadata('reports');

export default function ReportsPage() {
  return <DraftArticle draft={loadContentDraft('reports')} />;
}
