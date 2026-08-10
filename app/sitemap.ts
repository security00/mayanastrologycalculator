export const dynamic = "force-static";

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mayanastrologycalculator.com";
  const previousUpdate = new Date("2026-07-13");
  const latestUpdate = new Date("2026-08-10");

  return [
    { url: baseUrl, lastModified: previousUpdate, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/today`, lastModified: latestUpdate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/birth-chart`, lastModified: latestUpdate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mayan-zodiac-calculator`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mayan-calendar-calculator`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mayan-sign-calculator`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/compatibility`, lastModified: latestUpdate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/guide`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/day-signs`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/about`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/methodology`, lastModified: latestUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/galactic-tones`, lastModified: previousUpdate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: previousUpdate, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: previousUpdate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: previousUpdate, changeFrequency: "yearly", priority: 0.3 },
  ];
}
