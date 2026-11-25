'use client';

import { useEffect } from 'react';
import { buildUtcTodaySignature, formatIso, renderTodayUtcSection, utcCivilParts } from '../../shared/today-signature.js';

/** If hydration restores a build-time date, put the current UTC civil date back. */
export default function TodayUtcRefresh() {
  useEffect(() => {
    const section = document.getElementById('today-utc');
    if (!section) return;
    const iso = formatIso(utcCivilParts(new Date()));
    if (section.getAttribute('data-utc-date') === iso) return;
    section.outerHTML = renderTodayUtcSection(buildUtcTodaySignature(new Date()));
  }, []);

  return null;
}
