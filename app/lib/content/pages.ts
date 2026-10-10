import type { Metadata } from 'next';
import { draftMetadata, type DraftView } from '../../components/content/DraftArticle';
import { fileKeyFromPath, listDraftFiles, loadDraft } from '../../../shared/draft-render.js';

export function loadContentDraft(fileKey: string): DraftView & { robots: string } {
  return loadDraft(fileKey) as DraftView & { robots: string };
}

export function contentMetadata(fileKey: string): Metadata {
  const draft = loadDraft(fileKey);
  return draftMetadata(draft);
}

export function daySignSlugs() {
  return listDraftFiles()
    .map((file) => fileKeyFromPath(file))
    .filter((key) => key.startsWith('day-signs/') && key !== 'day-signs/index')
    .map((key) => key.split('/')[1]);
}

export function toneSlugs() {
  return listDraftFiles()
    .map((file) => fileKeyFromPath(file))
    .filter((key) => /^galactic-tones\/\d+$/.test(key))
    .map((key) => key.split('/')[1]);
}

export function contentPaths() {
  return listDraftFiles().map((file) => {
    const key = fileKeyFromPath(file);
    if (key === 'day-signs/index') return '/day-signs';
    if (key === 'galactic-tones/index') return '/galactic-tones';
    return `/${key}`;
  });
}
