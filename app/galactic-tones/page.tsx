import DraftArticle from '../components/content/DraftArticle';
import { contentMetadata, loadContentDraft } from '../lib/content/pages';

export const metadata = contentMetadata('galactic-tones/index');

export default function GalacticTonesPage() {
  return <DraftArticle draft={loadContentDraft('galactic-tones/index')} />;
}
