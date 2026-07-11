# Construction Cost Calculator — Design Specification

## Objective

Create a static, English-language construction calculator website for United States users. The first release contains six complete browser-based calculators plus essential informational pages. It uses no API, database, account system, or server-side calculation.

## Technical Architecture

- Astro with TypeScript and static output to `dist`.
- Native CSS with a responsive, mobile-first layout.
- Browser-side calculations only.
- Shared Astro components for navigation, forms, results, FAQs, breadcrumbs, and related calculators.
- Calculator metadata, content, fields, SEO information, FAQs, and related links centralized in `src/data/calculators.ts`.
- Calculation functions centralized in `src/lib/calculations.ts`.
- Validation and formatting centralized in `src/lib/validation.ts` and `src/lib/formatting.ts`.
- A small shared browser controller binds each calculator form to its calculation function, validation, reset, and print behavior.

## Visual Direction

The site will use a professional American construction-industry visual language: deep navy, white, neutral grays, and restrained engineering orange. It will avoid hero photography, oversized decorative imagery, gradients, and heavy UI frameworks. Calculator forms and results are the primary visual focus.

## Routes

- `/`
- `/construction-cost-calculator/`
- `/house-construction-cost-calculator/`
- `/post-construction-cleaning-calculator/`
- `/construction-framing-calculator/`
- `/garage-construction-cost-calculator/`
- `/commercial-building-construction-cost-calculator/`
- `/about/`
- `/contact/`
- `/privacy-policy/`
- `/disclaimer/`
- Custom 404 page

## Shared Calculator Page Structure

Every calculator page contains, in order:

1. Breadcrumbs
2. Unique H1
3. A unique 50–100 word introduction
4. Above-the-fold calculator form
5. Prominent result panel with “Estimate only” notice
6. How to Use
7. Calculation Formula
8. Worked Example
9. Factors That Affect Cost
10. At least three related calculator links
11. Five visible FAQs
12. Page-specific disclaimer

## Calculation Definitions

### General Construction Cost

- Material cost = area × material cost per square foot
- Labor cost = area × labor cost per square foot
- Direct cost = material cost + labor cost
- Contractor fee = direct cost × contractor fee percentage
- Contingency = (direct cost + contractor fee) × contingency percentage
- Total = direct cost + contractor fee + contingency

### House Construction Cost

- Effective house area = house area × editable floor complexity multiplier
- Direct house cost = effective house area × (editable material cost + editable labor cost)
- Quality adjustment = direct house cost × editable quality multiplier
- Garage cost = garage area × editable garage cost per square foot
- Additional cost = quality adjustment − direct house cost + garage cost
- Total budget = quality adjustment + garage cost
- Cost per square foot = total budget ÷ (house area + garage area)

Quality and floor multipliers are explicitly displayed as editable example values. Floor count does not multiply total house area because the entered area represents total floor area.

### Post-Construction Cleaning

- Labor cost = hourly labor rate × estimated hours
- Adjusted labor cost = labor cost × editable building-type multiplier × editable cleaning-level multiplier
- Total quote = adjusted labor cost + supplies
- Cost per square foot = total quote ÷ cleaning area

All multipliers are shown as editable example values and do not represent current local market rates.

### Construction Framing

- Base studs = ceil(wall length in inches ÷ stud spacing) + 1
- Opening studs = number of doors × 4 + number of windows × 4
- Total studs before waste = base studs + opening studs
- Total studs = ceil(total studs before waste × (1 + waste percentage))
- Plate length before waste = wall length × 3 (one bottom and two top plates)
- Plate length = plate length before waste × (1 + waste percentage)
- Total lumber length = total studs × wall height + plate length
- Estimated cost = total lumber length × editable material price per linear foot

This calculator estimates wall studs and plates only; headers, blocking, sheathing, connectors, and code-specific assemblies are excluded.

### Garage Construction Cost

- Area = width × length
- Base cost = area × editable cost per square foot
- Detached garage adjustment = base cost × editable detached-garage percentage when selected
- Finish adjustment = base cost × editable finish-level percentage
- Additional cost = detached adjustment + finish adjustment
- Total = base cost + additional cost

### Commercial Building Construction Cost

- Base construction cost = area × editable cost per square foot × editable building-type multiplier
- Labor cost = base construction cost × labor percentage
- Design fee = (base construction cost + labor cost) × design fee percentage
- Contingency = (base construction cost + labor cost + design fee) × contingency percentage
- Total = base construction cost + labor cost + design fee + contingency

The per-square-foot amount is treated as the non-labor base cost so labor can be shown separately without double counting.

## Validation and Formatting

- Required inputs reject empty values, non-numeric values, negative values, NaN, and Infinity.
- Dimensions and areas must be greater than zero.
- Counts may be zero where appropriate.
- Percentages use documented reasonable limits.
- Invalid input produces a clear field-level or form-level message.
- No result renders until all inputs are valid.
- Currency uses US dollars, comma separators, and at most two decimal places.
- Counts are rounded according to physical purchasing requirements.
- Reset restores documented editable example values.
- Print produces a clean result-oriented layout.

## Content and Disclaimer Rules

- Every default cost and multiplier is labeled as an editable example value.
- The website never claims that defaults reflect current prices.
- Content does not imply engineer, architect, contractor, or expert review.
- Estimates explicitly exclude local code, permits, taxes, site conditions, regional pricing, and professional quotations where relevant.
- Each calculator has unique explanatory content, example, factors, FAQ, and metadata.

## SEO

- Unique title and meta description per route.
- Canonical URLs based on a single configurable production site URL.
- Generated `sitemap.xml` and static `robots.txt`.
- `BreadcrumbList` JSON-LD on calculator pages.
- `FAQPage` JSON-LD only where the same FAQs are visible.
- `SoftwareApplication` JSON-LD on calculators, without ratings or reviews.
- Lowercase, hyphenated URLs and at least three contextual related-calculator links per calculator.

## Testing and Verification

- Unit tests cover every calculation function, validation edge cases, and number formatting.
- Test cases include empty, negative, zero-denominator, NaN, and Infinity protection.
- Production build must complete successfully.
- Generated `dist` must include every requested route, sitemap, robots file, and 404 page.
- Key pages will be inspected at desktop and mobile widths before completion.

## Deployment

Cloudflare Pages configuration:

- Build command: `npm run build`
- Build output directory: `dist`

No runtime environment variables are required for the MVP. The canonical production domain remains configurable in one site data file and will use a clearly documented placeholder until the final domain is supplied.
