export type FieldOption = { label: string; value: string; multiplier?: number };
export type CalculatorField = {
  key: string; label: string; type: 'number' | 'select' | 'checkbox'; defaultValue: number | string | boolean;
  unit?: string; hint?: string; min?: number; max?: number; step?: number; options?: FieldOption[];
};
export type ResultDefinition = { key: string; label: string; format: 'currency' | 'number' | 'integer'; unit?: string };
export type FAQItem = { question: string; answer: string };
export type CalculatorDefinition = {
  slug: string; id: string; title: string; navTitle: string; description: string; intro: string;
  fields: CalculatorField[]; results: ResultDefinition[]; howTo: string[]; formula: string; example: string;
  factors: string[]; faqs: FAQItem[]; related: string[]; disclaimer: string;
};

const commonDisclaimer = 'This calculator provides a planning estimate only. It is not a bid, appraisal, or professional construction advice. Confirm quantities, code requirements, labor, permits, taxes, site conditions, and current local prices with qualified professionals before making financial decisions.';

export const calculators: CalculatorDefinition[] = [
  {
    id: 'general', slug: 'construction-cost-calculator', navTitle: 'Construction Cost',
    title: 'Construction Cost Calculator',
    description: 'Estimate material, labor, contractor, contingency, and total construction costs using editable cost assumptions.',
    intro: 'Use this construction cost calculator to build a straightforward early-stage budget from project area and editable material and labor rates. Add contractor and contingency percentages to see each cost layer separately. Every default below is an editable example value—not a statement of current pricing in your city or for your project.',
    fields: [
      { key: 'area', label: 'Project area', type: 'number', defaultValue: 2000, unit: 'sq ft', min: 1, step: 1 },
      { key: 'materialRate', label: 'Material cost per square foot', type: 'number', defaultValue: 85, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value' },
      { key: 'laborRate', label: 'Labor cost per square foot', type: 'number', defaultValue: 55, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value' },
      { key: 'contractorPct', label: 'Contractor fee', type: 'number', defaultValue: 12, unit: '%', min: 0, max: 100, step: .1 },
      { key: 'contingencyPct', label: 'Contingency allowance', type: 'number', defaultValue: 10, unit: '%', min: 0, max: 100, step: .1 },
    ],
    results: [
      { key: 'materialCost', label: 'Material cost', format: 'currency' }, { key: 'laborCost', label: 'Labor cost', format: 'currency' },
      { key: 'contractorFee', label: 'Contractor fee', format: 'currency' }, { key: 'contingency', label: 'Contingency', format: 'currency' },
      { key: 'total', label: 'Estimated total', format: 'currency' },
    ],
    howTo: ['Enter the total project area in square feet.', 'Replace the example material and labor rates with your own assumptions.', 'Set contractor and contingency percentages, then select Calculate Cost.'],
    formula: 'Materials = area × material rate. Labor = area × labor rate. Contractor fee = direct costs × fee percentage. Contingency = direct costs plus contractor fee × contingency percentage. Total equals all four amounts.',
    example: 'For 2,000 sq ft at $85 for materials and $55 for labor, direct cost is $280,000. A 12% contractor fee is $33,600. A 10% contingency on the subtotal is $31,360, producing an estimated total of $344,960.',
    factors: ['Project location and accessibility', 'Building type and design complexity', 'Site preparation and utility work', 'Finish selections and material availability', 'Permit, tax, insurance, and financing costs'],
    faqs: [
      { question: 'Is this calculator based on current local prices?', answer: 'No. Default amounts are editable examples. Enter rates from your own research or project quotes.' },
      { question: 'Does the total include permits and taxes?', answer: 'Not automatically. Add those items to your assumptions or contingency if they apply.' },
      { question: 'What area should I enter?', answer: 'Use the total floor area covered by the rates you enter, measured in square feet.' },
      { question: 'Why is contingency calculated after the contractor fee?', answer: 'This model applies contingency to the working subtotal so the reserve covers both direct cost and contractor fee uncertainty.' },
      { question: 'Can I print the estimate?', answer: 'Yes. Calculate the result and use the Print Results button.' },
    ], related: ['house-construction-cost-calculator', 'garage-construction-cost-calculator', 'commercial-building-construction-cost-calculator'], disclaimer: commonDisclaimer,
  },
  {
    id: 'house', slug: 'house-construction-cost-calculator', navTitle: 'House Cost', title: 'House Construction Cost Calculator',
    description: 'Estimate a house construction budget using editable area, quality, floor complexity, material, labor, and garage assumptions.',
    intro: 'Plan a preliminary home-building budget with editable assumptions for total living area, floor complexity, quality level, materials, labor, and garage space. This tool does not use ZIP Code pricing or outside market data. Adjust every example cost and multiplier to reflect your plans, research, and contractor conversations.',
    fields: [
      { key: 'area', label: 'Total house area', type: 'number', defaultValue: 2200, unit: 'sq ft', min: 1, step: 1 },
      { key: 'floors', label: 'Number of floors', type: 'select', defaultValue: '2', options: [{ label: '1 floor', value: '1', multiplier: 1 }, { label: '2 floors', value: '2', multiplier: 1.05 }, { label: '3 floors', value: '3', multiplier: 1.1 }] },
      { key: 'quality', label: 'Build quality', type: 'select', defaultValue: 'standard', options: [{ label: 'Basic (0.90×)', value: 'basic', multiplier: .9 }, { label: 'Standard (1.00×)', value: 'standard', multiplier: 1 }, { label: 'Premium (1.25×)', value: 'premium', multiplier: 1.25 }] },
      { key: 'materialRate', label: 'Material cost per square foot', type: 'number', defaultValue: 90, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value' },
      { key: 'laborRate', label: 'Labor cost per square foot', type: 'number', defaultValue: 60, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value' },
      { key: 'garageArea', label: 'Garage area', type: 'number', defaultValue: 440, unit: 'sq ft', min: 0, step: 1 },
      { key: 'garageRate', label: 'Garage cost per square foot', type: 'number', defaultValue: 70, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value' },
    ],
    results: [{ key: 'baseCost', label: 'Base house cost', format: 'currency' }, { key: 'additionalCost', label: 'Quality & garage additions', format: 'currency' }, { key: 'costPerSqFt', label: 'Blended cost per square foot', format: 'currency' }, { key: 'total', label: 'Estimated total budget', format: 'currency' }],
    howTo: ['Enter total living area across all floors.', 'Choose floor count and quality, then edit all cost assumptions.', 'Add garage area and rate, then calculate the budget.'],
    formula: 'Base house cost = total area × floor multiplier × (material rate + labor rate). Quality adjusts the house subtotal. Garage cost = garage area × garage rate. Total budget equals adjusted house cost plus garage cost.',
    example: 'A 2,200 sq ft, two-story standard home at $90 material and $60 labor per sq ft has a $346,500 base house cost using the 1.05 floor multiplier. A 440 sq ft garage at $70 adds $30,800, for a $377,300 estimate.',
    factors: ['Foundation and soil conditions', 'Roofline and structural complexity', 'Kitchen and bathroom specifications', 'Energy performance and mechanical systems', 'Garage, porch, deck, and exterior work'],
    faqs: [
      { question: 'Does floor count multiply the entered area?', answer: 'No. Enter total area across all floors. Floor count only applies the visible complexity multiplier.' },
      { question: 'Are the quality multipliers editable?', answer: 'The displayed preset multipliers are examples. You can change them in the centralized project data before deployment.' },
      { question: 'Does this include land?', answer: 'No. Land purchase, financing, demolition, and unusual site work are outside this estimate.' },
      { question: 'Why is garage space priced separately?', answer: 'Garage construction often has a different finish and systems profile than living space.' },
      { question: 'Can this replace a contractor quote?', answer: 'No. It is an early planning model, not a construction bid.' },
    ], related: ['construction-cost-calculator', 'garage-construction-cost-calculator', 'construction-framing-calculator'], disclaimer: commonDisclaimer,
  },
  {
    id: 'cleaning', slug: 'post-construction-cleaning-calculator', navTitle: 'Cleaning Quote', title: 'Post Construction Cleaning Calculator',
    description: 'Estimate post-construction cleaning labor, supplies, cost per square foot, and a suggested quote with editable assumptions.',
    intro: 'Estimate a post-construction cleaning quote from cleanable area, labor time, hourly cost, supplies, building type, and cleanup intensity. The displayed rates and multipliers are editable examples only. Use your scope walkthrough, staffing plan, disposal requirements, and local business costs to replace them before quoting work.',
    fields: [
      { key: 'area', label: 'Cleaning area', type: 'number', defaultValue: 5000, unit: 'sq ft', min: 1, step: 1 },
      { key: 'buildingType', label: 'Building type', type: 'select', defaultValue: 'residential', options: [{ label: 'Residential (1.00×)', value: 'residential', multiplier: 1 }, { label: 'Commercial (1.15×)', value: 'commercial', multiplier: 1.15 }, { label: 'Industrial (1.30×)', value: 'industrial', multiplier: 1.3 }] },
      { key: 'cleaningLevel', label: 'Cleaning level', type: 'select', defaultValue: 'standard', options: [{ label: 'Light touch-up (0.80×)', value: 'light', multiplier: .8 }, { label: 'Standard final clean (1.00×)', value: 'standard', multiplier: 1 }, { label: 'Heavy debris/detail (1.35×)', value: 'heavy', multiplier: 1.35 }] },
      { key: 'hourlyRate', label: 'Labor rate', type: 'number', defaultValue: 35, unit: '$/hour', min: 0, step: .01, hint: 'Editable example value' },
      { key: 'hours', label: 'Estimated labor hours', type: 'number', defaultValue: 40, unit: 'hours', min: 0, step: .25 },
      { key: 'supplies', label: 'Supplies and consumables', type: 'number', defaultValue: 250, unit: '$', min: 0, step: .01, hint: 'Editable example value' },
    ],
    results: [{ key: 'laborCost', label: 'Adjusted labor cost', format: 'currency' }, { key: 'suppliesCost', label: 'Supplies cost', format: 'currency' }, { key: 'costPerSqFt', label: 'Cost per square foot', format: 'currency' }, { key: 'quote', label: 'Suggested quote', format: 'currency' }],
    howTo: ['Enter the area included in the cleaning scope.', 'Choose building and cleanup levels, then edit labor hours, rate, and supplies.', 'Calculate and compare the result with your overhead and profit requirements.'],
    formula: 'Adjusted labor = hourly rate × labor hours × building multiplier × cleaning-level multiplier. Suggested quote = adjusted labor + supplies. Cost per sq ft = quote ÷ cleaning area.',
    example: 'A 5,000 sq ft commercial final clean with 40 hours at $35 uses a 1.15 building multiplier. Adjusted labor is $1,610; adding $250 supplies produces a $1,860 suggested quote, or about $0.37 per sq ft.',
    factors: ['Dust, adhesive, paint, and debris levels', 'Window, fixture, cabinet, and appliance counts', 'High work and specialty equipment', 'Waste hauling and disposal fees', 'Travel, supervision, insurance, overhead, and profit'],
    faqs: [
      { question: 'Is labor hours the number of workers or elapsed time?', answer: 'Enter total labor hours. Four workers for five hours equals 20 labor hours.' },
      { question: 'Does the quote include profit?', answer: 'Not separately. Adjust your rates or add your required overhead and profit before sending a proposal.' },
      { question: 'What is a standard final clean?', answer: 'It generally follows rough cleaning and focuses on detailed dust removal and turnover readiness, but scopes vary.' },
      { question: 'Should exterior windows be included?', answer: 'Only if your entered hours and supplies cover them. Define exclusions clearly in your proposal.' },
      { question: 'Are the multipliers current market standards?', answer: 'No. They are editable examples for comparing scope complexity.' },
    ], related: ['construction-cost-calculator', 'house-construction-cost-calculator', 'commercial-building-construction-cost-calculator'], disclaimer: commonDisclaimer,
  },
  {
    id: 'framing', slug: 'construction-framing-calculator', navTitle: 'Framing', title: 'Construction Framing Calculator',
    description: 'Estimate wall studs, top and bottom plates, lumber length, waste, and framing material cost.',
    intro: 'Estimate common wall-framing quantities from wall dimensions, stud spacing, openings, waste, and a price per linear foot. The calculator focuses on studs and three plate runs. It is useful for preliminary material planning, but it does not design a structural assembly or replace plans, code requirements, or a takeoff.',
    fields: [
      { key: 'wallLength', label: 'Wall length', type: 'number', defaultValue: 20, unit: 'ft', min: .1, step: .1 },
      { key: 'wallHeight', label: 'Wall height', type: 'number', defaultValue: 8, unit: 'ft', min: .1, step: .1 },
      { key: 'spacing', label: 'Stud spacing', type: 'select', defaultValue: '16', options: [{ label: '16 inches on center', value: '16', multiplier: 16 }, { label: '24 inches on center', value: '24', multiplier: 24 }] },
      { key: 'doors', label: 'Door openings', type: 'number', defaultValue: 1, min: 0, step: 1 },
      { key: 'windows', label: 'Window openings', type: 'number', defaultValue: 2, min: 0, step: 1 },
      { key: 'pricePerLinearFoot', label: 'Lumber price per linear foot', type: 'number', defaultValue: 1.2, unit: '$/linear ft', min: 0, step: .01, hint: 'Editable example value' },
      { key: 'wastePct', label: 'Waste allowance', type: 'number', defaultValue: 10, unit: '%', min: 0, max: 100, step: .1 },
    ],
    results: [{ key: 'studs', label: 'Estimated studs', format: 'integer' }, { key: 'plateLength', label: 'Top & bottom plates', format: 'number', unit: 'linear ft' }, { key: 'totalLumber', label: 'Total lumber', format: 'number', unit: 'linear ft' }, { key: 'estimatedCost', label: 'Estimated lumber cost', format: 'currency' }],
    howTo: ['Measure one wall section and enter its length and height.', 'Choose spacing, count door and window openings, and set waste.', 'Enter an editable linear-foot price and calculate the takeoff.'],
    formula: 'Base studs = ceiling(wall inches ÷ spacing) + 1. Four extra studs are allowed per opening. Waste is applied and studs round up. Plate length is three wall runs plus waste. Total lumber = stud length + plate length.',
    example: 'A 20 ft by 8 ft wall at 16 in spacing with one door, two windows, and 10% waste estimates 31 studs and 66 linear ft of plates. Total modeled lumber is 314 linear ft; at $1.20 per ft, estimated cost is $376.80.',
    factors: ['Corners, intersections, and advanced framing method', 'Header, jack, cripple, and king-stud design', 'Blocking, fire stops, and backing', 'Stock lengths and cutting optimization', 'Local wind, seismic, snow, and energy code'],
    faqs: [
      { question: 'Does this calculator size headers?', answer: 'No. Header size and support require plans, loads, spans, and local code information.' },
      { question: 'Why are four studs added per opening?', answer: 'It is a simplified allowance for common king and jack framing. Actual assemblies vary.' },
      { question: 'Are plates based on two or three runs?', answer: 'The estimate uses one bottom plate and two top plates.' },
      { question: 'Does total lumber include sheathing?', answer: 'No. It includes modeled studs and plates only.' },
      { question: 'Should I round stud quantities?', answer: 'The calculator rounds up because partial studs cannot be purchased as whole pieces.' },
    ], related: ['house-construction-cost-calculator', 'garage-construction-cost-calculator', 'construction-cost-calculator'], disclaimer: commonDisclaimer,
  },
  {
    id: 'garage', slug: 'garage-construction-cost-calculator', navTitle: 'Garage Cost', title: 'Garage Construction Cost Calculator',
    description: 'Estimate garage area, base construction cost, detached-garage adjustment, finish adjustment, and total budget.',
    intro: 'Estimate a preliminary garage budget from width, length, parking capacity, attachment type, finish level, and an editable cost per square foot. The default cost and adjustment percentages are example values only. Replace them with assumptions appropriate to your foundation, structure, utilities, finishes, location, and project scope.',
    fields: [
      { key: 'width', label: 'Garage width', type: 'number', defaultValue: 24, unit: 'ft', min: 1, step: .1 },
      { key: 'length', label: 'Garage length', type: 'number', defaultValue: 24, unit: 'ft', min: 1, step: .1 },
      { key: 'spaces', label: 'Parking spaces', type: 'select', defaultValue: '2', options: [{ label: '1 car', value: '1', multiplier: 1 }, { label: '2 cars', value: '2', multiplier: 2 }, { label: '3 cars', value: '3', multiplier: 3 }, { label: '4 cars', value: '4', multiplier: 4 }] },
      { key: 'detached', label: 'Detached garage', type: 'checkbox', defaultValue: false, hint: 'Adds the editable detached adjustment below' },
      { key: 'detachedPct', label: 'Detached adjustment', type: 'number', defaultValue: 8, unit: '%', min: 0, max: 100, step: .1, hint: 'Editable example value' },
      { key: 'finish', label: 'Finish level', type: 'select', defaultValue: 'standard', options: [{ label: 'Shell (0%)', value: 'shell', multiplier: 0 }, { label: 'Standard (12%)', value: 'standard', multiplier: .12 }, { label: 'Finished / conditioned (25%)', value: 'finished', multiplier: .25 }] },
      { key: 'rate', label: 'Base cost per square foot', type: 'number', defaultValue: 75, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value' },
    ],
    results: [{ key: 'area', label: 'Garage area', format: 'number', unit: 'sq ft' }, { key: 'baseCost', label: 'Base construction cost', format: 'currency' }, { key: 'additionalCost', label: 'Additional cost', format: 'currency' }, { key: 'total', label: 'Estimated total', format: 'currency' }],
    howTo: ['Enter outside garage width and length.', 'Choose parking capacity, attachment type, and finish level.', 'Replace the example rate and adjustment with your own assumptions, then calculate.'],
    formula: 'Area = width × length. Base cost = area × cost per square foot. Additional cost equals the selected finish adjustment plus the detached adjustment when checked. Total equals base plus additions.',
    example: 'A 24 ft × 24 ft garage contains 576 sq ft. At $75 per sq ft, base cost is $43,200. A standard 12% finish adjustment adds $5,184. If detached adds another 8%, total reaches $51,840.',
    factors: ['Slab, frost wall, basement, or other foundation', 'Roof shape, span, storage, and structural loads', 'Doors, windows, siding, and roofing selections', 'Electrical, plumbing, heating, and insulation', 'Driveway, grading, drainage, permits, and utilities'],
    faqs: [
      { question: 'Does parking-space count change the cost?', answer: 'The calculation uses actual width and length. Space count is shown for planning context and does not override area.' },
      { question: 'What does detached adjustment cover?', answer: 'It is a customizable planning allowance for duplicated exterior work and utility connections, not a guaranteed premium.' },
      { question: 'Does this include a driveway?', answer: 'No. Add driveway and site work separately.' },
      { question: 'Can I estimate a workshop?', answer: 'Yes, if you adjust dimensions, base rate, and finish assumptions to cover the workshop scope.' },
      { question: 'Are garage costs the same nationwide?', answer: 'No. Labor, materials, codes, foundations, and site conditions vary substantially.' },
    ], related: ['house-construction-cost-calculator', 'construction-framing-calculator', 'construction-cost-calculator'], disclaimer: commonDisclaimer,
  },
  {
    id: 'commercial', slug: 'commercial-building-construction-cost-calculator', navTitle: 'Commercial Cost', title: 'Commercial Building Construction Cost Calculator',
    description: 'Estimate base commercial building cost, labor, design fees, contingency, and total budget with editable assumptions.',
    intro: 'Build an early commercial construction budget using floor area, building type, editable base cost, labor share, design fee, and contingency. This calculator intentionally avoids live regional price feeds. Its example values help explain the model only; replace them with project-specific assumptions and professional estimates before using the result for planning.',
    fields: [
      { key: 'area', label: 'Building area', type: 'number', defaultValue: 10000, unit: 'sq ft', min: 1, step: 1 },
      { key: 'buildingType', label: 'Building type', type: 'select', defaultValue: 'office', options: [{ label: 'Warehouse (0.85×)', value: 'warehouse', multiplier: .85 }, { label: 'Office (1.00×)', value: 'office', multiplier: 1 }, { label: 'Retail (1.10×)', value: 'retail', multiplier: 1.1 }, { label: 'Restaurant (1.30×)', value: 'restaurant', multiplier: 1.3 }] },
      { key: 'rate', label: 'Base cost per square foot', type: 'number', defaultValue: 120, unit: '$/sq ft', min: 0, step: .01, hint: 'Editable example value excluding modeled labor' },
      { key: 'laborPct', label: 'Labor cost share', type: 'number', defaultValue: 30, unit: '%', min: 0, max: 100, step: .1 },
      { key: 'designPct', label: 'Design fee', type: 'number', defaultValue: 8, unit: '%', min: 0, max: 100, step: .1 },
      { key: 'contingencyPct', label: 'Contingency allowance', type: 'number', defaultValue: 10, unit: '%', min: 0, max: 100, step: .1 },
    ],
    results: [{ key: 'baseCost', label: 'Base construction cost', format: 'currency' }, { key: 'laborCost', label: 'Labor cost', format: 'currency' }, { key: 'designFee', label: 'Design fee', format: 'currency' }, { key: 'contingency', label: 'Contingency budget', format: 'currency' }, { key: 'total', label: 'Estimated total', format: 'currency' }],
    howTo: ['Enter total commercial floor area.', 'Choose a building type and replace the example base cost.', 'Set labor, design, and contingency percentages, then calculate.'],
    formula: 'Base cost = area × editable rate × building-type multiplier. Labor = base × labor share. Design fee = base plus labor × design percentage. Contingency = subtotal × contingency percentage. Total equals all components.',
    example: 'A 10,000 sq ft retail building at a $120 example base rate uses a 1.10 multiplier for $1.32 million base cost. With 30% labor, 8% design, and 10% contingency, the modeled total is $2,038,608.',
    factors: ['Occupancy, code, fire protection, and accessibility', 'Structural system and building envelope', 'Mechanical, electrical, plumbing, and process loads', 'Tenant improvements and specialty equipment', 'Site development, parking, utilities, and jurisdiction fees'],
    faqs: [
      { question: 'Does the base rate include labor?', answer: 'In this model it does not, because labor is displayed separately. Enter a compatible non-labor base assumption.' },
      { question: 'Why do building types use multipliers?', answer: 'They provide editable comparisons for typical complexity differences; they are not current market indexes.' },
      { question: 'Does the estimate include land or financing?', answer: 'No. Acquisition, financing, operations, and most owner costs are outside the model.' },
      { question: 'Are tenant improvements included?', answer: 'Only if your base rate and building multiplier are adjusted to include them.' },
      { question: 'Can this be used for a construction loan?', answer: 'Use it for early exploration only. Lenders generally require detailed professional budgets and documentation.' },
    ], related: ['construction-cost-calculator', 'post-construction-cleaning-calculator', 'garage-construction-cost-calculator'], disclaimer: commonDisclaimer,
  },
];

export const calculatorBySlug = Object.fromEntries(calculators.map((calculator) => [calculator.slug, calculator])) as Record<string, CalculatorDefinition>;
