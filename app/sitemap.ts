export const dynamic = "force-static";
﻿import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mayanastrologycalculator.com'
  const lastModified = new Date('2026-06-14')

  return [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1 },
    // /result page excluded - dynamic content, not for indexing
    { url: `${baseUrl}/birth-chart`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/guide`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/day-signs`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/galactic-tones`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
