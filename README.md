# Construction Cost Calculator

Static Astro website with six browser-based construction calculators.

## Commands

```bash
npm install
npm run dev
npm test
npm run build
```

Build output: `dist`

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`

## Before production deployment

Replace the placeholder domain in `astro.config.mjs`, `src/data/site.ts`, and `public/robots.txt`. Review all editable example costs and multipliers in `src/data/calculators.ts`; they are intentionally not live market prices. Replace the placeholder contact email in `src/data/site.ts`.
