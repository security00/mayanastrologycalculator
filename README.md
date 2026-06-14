# Mayan Astrology Calculator

A static Next.js site for calculating a Mayan Tzolk'in birth signature from a Gregorian birth date. The site targets search demand around:

- mayan astrology calculator
- mayan zodiac sign calculator
- mayan zodiac calculator
- mayan astrology birth chart
- mayan sign calculator
- mayan calendar calculator

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Static export for Cloudflare Pages

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

The deploy workflow runs both checks before publishing `out/` to Cloudflare Pages.

## Content Structure

- `/` - primary calculator and SEO landing page
- `/birth-chart` - free Mayan astrology birth chart search intent
- `/today` - daily Mayan date and current Tzolk'in energy
- `/day-signs` - 20 Mayan zodiac/Nawal signs
- `/galactic-tones` - 13 Galactic Tone meanings
- `/guide` - broader interpretation guide
- `/about` - background and methodology
- `/result` - calculator result page, supports `?day=DD&month=MM&year=YYYY`

## Deployment

The GitHub Actions workflow builds a static export and deploys to Cloudflare Pages:

```bash
npm ci
npm run lint
npm run build
```

Required repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Analytics

Analytics components live in `app/components/`:

- Google Analytics
- Microsoft Clarity
- Ahrefs Analytics

Confirm tracking IDs before production changes.
