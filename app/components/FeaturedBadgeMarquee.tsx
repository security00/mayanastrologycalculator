'use client';

import { useState } from 'react';

type FeaturedBadge = {
  id: string;
  href: string;
  label: string;
  imageSrc?: string;
  title?: string;
  launchpadlyBadge?: string;
  launchpadlyVariant?: string;
};

const featuredBadges: FeaturedBadge[] = [
  {
    id: 'first-look',
    href: 'https://firstlook.tools',
    label: 'Featured on First Look',
    imageSrc: 'https://firstlook.tools/badge/badge_transparent.svg',
  },
  {
    id: 'findly-tools',
    href: 'https://findly.tools/mayan-astrology-calculator?utm_source=mayan-astrology-calculator',
    label: 'Featured on Findly.tools',
    imageSrc: 'https://findly.tools/badges/findly-tools-badge-light.svg',
  },
  {
    id: 'tinyshelf',
    href: 'https://www.tinyshelf.co/?ref=mayanastrologycalculator.com',
    label: 'Featured on tinyshelf',
    imageSrc: 'https://www.tinyshelf.co/badge/tinyshelf-badge-light-5ca4026a.svg',
    title: 'Featured on tinyshelf',
  },
  {
    id: 'submito',
    href: 'https://submito.net',
    label: 'Listed on Submito',
    imageSrc: 'https://submito.net/badge/listed-light.svg',
    title: 'Listed on Submito',
  },
  {
    id: 'smol-list',
    href: 'https://smollist.com/projects/mayan-astrology-calculator?utm_source=badge',
    label: 'Featured on Smol List',
    imageSrc: 'https://smollist.com/smollist/images/badges/featured-on-light.svg',
  },
  {
    id: 'ai-top-10',
    href: 'https://aitop10.tools/',
    label: 'AiTop10 Tools',
  },
  {
    id: 'launchpadly',
    href: 'https://launchpadly.co/startup/mayan-astrology-calculator?ref=badge',
    label: 'Launchpadly Startup Directory',
    imageSrc:
      'https://launchpadly.co/embed/badges/startup/mayan-astrology-calculator.svg?variant=listed-on',
    launchpadlyBadge: 'mayan-astrology-calculator',
    launchpadlyVariant: 'listed-on',
  },
  {
    id: 'post-your-startup',
    href: 'https://postyourstartup.co/startup/mayan-astrology-calculator?ref=badge',
    label: 'Featured on PostYourStartup',
    imageSrc: 'https://postyourstartup.co/api/badge/mayan-astrology-calculator?theme=light',
  },
  {
    id: 'saas-tool',
    href: 'https://saastool.site/item/mayan-astrology-calculator',
    label: 'Featured on SaaSTool.site',
    imageSrc: 'https://saastool.site/badges/saastool-light.svg',
  },
];

export default function FeaturedBadgeMarquee() {
  const [failedBadgeIds, setFailedBadgeIds] = useState<ReadonlySet<string>>(() => new Set());

  const renderBadge = (badge: FeaturedBadge, duplicate: boolean) => {
    const imageFailed = failedBadgeIds.has(badge.id);

    return (
      <a
        key={`${duplicate ? 'duplicate' : 'primary'}-${badge.id}`}
        href={badge.href}
        title={badge.title}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={badge.label}
        tabIndex={duplicate ? -1 : undefined}
        data-launchpadly-badge={badge.launchpadlyBadge}
        data-launchpadly-badge-variant={badge.launchpadlyVariant}
        className="featured-badge-card"
      >
        {badge.imageSrc && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={badge.imageSrc}
            alt={badge.label}
            className="featured-badge-image"
            loading="lazy"
            decoding="async"
            onError={() => {
              setFailedBadgeIds((current) => {
                const next = new Set(current);
                next.add(badge.id);
                return next;
              });
            }}
          />
        ) : (
          <span className="featured-badge-fallback">{badge.label}</span>
        )}
      </a>
    );
  };

  return (
    <div className="featured-badges-marquee" aria-label="Featured listings">
      <div className="featured-badges-track">
        <div className="featured-badges-group">
          {featuredBadges.map((badge) => renderBadge(badge, false))}
        </div>
        <div className="featured-badges-group" aria-hidden="true">
          {featuredBadges.map((badge) => renderBadge(badge, true))}
        </div>
      </div>
    </div>
  );
}
