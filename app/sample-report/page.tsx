import DraftArticle from '../components/content/DraftArticle';
import { contentMetadata, loadContentDraft } from '../lib/content/pages';

export const metadata = contentMetadata('sample-report');

export default function SampleReportPage() {
  return <DraftArticle draft={loadContentDraft('sample-report')} />;
}
