import DraftArticle from '../components/content/DraftArticle';
import { contentMetadata, loadContentDraft } from '../lib/content/pages';

export const metadata = contentMetadata('sample-compatibility-report');

export default function SampleCompatibilityReportPage() {
  return <DraftArticle draft={loadContentDraft('sample-compatibility-report')} />;
}
