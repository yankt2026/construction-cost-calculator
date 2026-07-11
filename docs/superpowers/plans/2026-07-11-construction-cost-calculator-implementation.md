# Construction Cost Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a production-ready static Astro website with six browser-based United States construction calculators.

**Architecture:** Astro renders all routes and SEO content at build time. A shared data model describes calculators and inputs, pure TypeScript functions calculate results, and one small browser controller connects forms to validation, formatting, reset, and printing.

**Tech Stack:** Astro, TypeScript, native CSS, Vitest, `@astrojs/sitemap`.

## Global Constraints

- Static output goes to `dist` and deploys with `npm run build` on Cloudflare Pages.
- No API, database, login, server runtime, or large UI framework.
- US customary units and USD are defaults.
- All example costs remain editable and are labeled as examples, not market prices.
- Every calculator validates bad input and prevents NaN or Infinity output.
- Each calculator has unique content, metadata, FAQ, structured data, and at least three related links.

---

### Task 1: Project foundation and calculation test harness

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- Create: `src/lib/calculations.test.ts`, `src/lib/validation.test.ts`, `src/lib/formatting.test.ts`

**Interfaces:**
- Tests consume the six calculation functions and shared validation/formatting functions specified below.
- Produces repeatable `npm test` and `npm run build` commands.

- [ ] Create Astro/Vitest configuration with scripts `dev`, `build`, `preview`, and `test`.
- [ ] Write failing tests for all six formulas, invalid numeric values, currency formatting, and decimal rounding.
- [ ] Run `npm test` and verify failure because the library modules do not exist.
- [ ] Commit foundation and failing tests.

### Task 2: Pure calculations, validation, and formatting

**Files:**
- Create: `src/lib/calculations.ts`
- Create: `src/lib/validation.ts`
- Create: `src/lib/formatting.ts`

**Interfaces:**
- Produces `calculateGeneralConstruction`, `calculateHouseConstruction`, `calculateCleaning`, `calculateFraming`, `calculateGarage`, and `calculateCommercial`.
- Produces `validateFiniteNumber(value, options)` returning a clear error string or `null`.
- Produces `formatCurrency`, `formatNumber`, and `roundToTwo`.

- [ ] Implement the exact formulas from the approved design as deterministic typed functions.
- [ ] Reject non-finite values and guard all division operations.
- [ ] Run `npm test` and verify all library tests pass.
- [ ] Commit the tested calculation core.

### Task 3: Centralized site and calculator content model

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/calculators.ts`

**Interfaces:**
- Produces `site` with name, configurable URL, description, navigation, and deployment defaults.
- Produces `calculators`, `calculatorBySlug`, typed input/result definitions, unique SEO, page sections, examples, five FAQs, and related slugs for all six tools.

- [ ] Define reusable TypeScript types for numeric, select, and checkbox fields.
- [ ] Add all six calculators with editable defaults and distinct copy.
- [ ] Add five visible FAQs and at least three related calculator slugs per calculator.
- [ ] Verify slugs, titles, and canonical paths are unique with a test or build-time assertion.
- [ ] Commit the data model.

### Task 4: Shared layouts, components, and browser controller

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/layouts/CalculatorLayout.astro`
- Create: `src/components/Header.astro`, `Footer.astro`, `CalculatorForm.astro`, `ResultPanel.astro`, `FAQ.astro`, `Breadcrumbs.astro`, `RelatedCalculators.astro`
- Create: `src/scripts/calculator-controller.ts`
- Create: `src/styles/global.css`

**Interfaces:**
- `BaseLayout` accepts title, description, canonicalPath, and JSON-LD arrays.
- `CalculatorLayout` accepts one calculator definition.
- Form markup exposes stable `data-*` attributes consumed by the controller.

- [ ] Build semantic header/footer and accessible mobile navigation without framework JavaScript.
- [ ] Render calculator fields from centralized metadata with clear example labels and inline errors.
- [ ] Connect form submission to the correct calculation function and formatted result output.
- [ ] Add reset and print behavior plus print CSS.
- [ ] Add responsive navy/orange visual system and visible focus states.
- [ ] Run tests and build, then commit shared UI.

### Task 5: Calculator routes and structured data

**Files:**
- Create six route files under `src/pages/<calculator-slug>/index.astro`

**Interfaces:**
- Each page passes one centralized calculator definition to `CalculatorLayout`.
- Each page emits `BreadcrumbList`, visible-FAQ-matched `FAQPage`, and `SoftwareApplication` JSON-LD.

- [ ] Create all six routes with unique metadata and canonical URLs.
- [ ] Render calculator first, followed by all required explanatory sections.
- [ ] Verify every page has one H1, five FAQs, and at least three related links.
- [ ] Build and confirm six generated route directories, then commit.

### Task 6: Homepage and informational routes

**Files:**
- Create: `src/pages/index.astro`, `src/pages/about/index.astro`, `src/pages/contact/index.astro`, `src/pages/privacy-policy/index.astro`, `src/pages/disclaimer/index.astro`, `src/pages/404.astro`

**Interfaces:**
- Homepage consumes the six calculator definitions for cards.

- [ ] Build homepage with required H1, introduction, six cards, usage instructions, and five FAQs.
- [ ] Add useful, original About, Contact, Privacy, Disclaimer, and 404 content.
- [ ] Add unique title, description, canonical URL, and appropriate internal navigation to each route.
- [ ] Build and commit all informational routes.

### Task 7: Crawl assets, verification, and deployment documentation

**Files:**
- Create: `public/robots.txt`, `public/favicon.svg`, `README.md`
- Modify: `astro.config.mjs` if final sitemap configuration needs adjustment.

**Interfaces:**
- `README.md` documents local commands, example-value locations, canonical URL setting, and Cloudflare Pages parameters.

- [ ] Generate sitemap through `@astrojs/sitemap` and add a robots file pointing to it.
- [ ] Run `npm test` and require all tests to pass.
- [ ] Run `npm run build` and require a successful static build.
- [ ] Inspect `dist` for all routes, `404.html`, `robots.txt`, and `sitemap-0.xml`/sitemap index.
- [ ] Launch the local preview and inspect homepage plus representative calculator pages at desktop and mobile widths.
- [ ] Correct accessibility, overflow, console, link, metadata, or calculation issues found.
- [ ] Commit the verified production build source.
