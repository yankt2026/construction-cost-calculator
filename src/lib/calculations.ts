import { roundToTwo } from './formatting';

const percent = (value: number) => value / 100;
const finite = (values: number[]) => {
  if (values.some((value) => !Number.isFinite(value))) throw new Error('All inputs must be finite numbers.');
};

export function calculateGeneralConstruction(input: { area: number; materialRate: number; laborRate: number; contractorPct: number; contingencyPct: number }) {
  finite(Object.values(input));
  const materialCost = input.area * input.materialRate;
  const laborCost = input.area * input.laborRate;
  const contractorFee = (materialCost + laborCost) * percent(input.contractorPct);
  const contingency = (materialCost + laborCost + contractorFee) * percent(input.contingencyPct);
  return { materialCost: roundToTwo(materialCost), laborCost: roundToTwo(laborCost), contractorFee: roundToTwo(contractorFee), contingency: roundToTwo(contingency), total: roundToTwo(materialCost + laborCost + contractorFee + contingency) };
}

export function calculateHouseConstruction(input: { area: number; floors: number; floorMultiplier: number; qualityMultiplier: number; materialRate: number; laborRate: number; garageArea: number; garageRate: number }) {
  finite(Object.values(input));
  const baseCost = input.area * input.floorMultiplier * (input.materialRate + input.laborRate);
  const adjustedHouse = baseCost * input.qualityMultiplier;
  const garageCost = input.garageArea * input.garageRate;
  const total = adjustedHouse + garageCost;
  const denominator = input.area + input.garageArea;
  return { baseCost: roundToTwo(baseCost), additionalCost: roundToTwo(total - baseCost), costPerSqFt: roundToTwo(denominator > 0 ? total / denominator : 0), total: roundToTwo(total) };
}

export function calculateCleaning(input: { area: number; hourlyRate: number; hours: number; supplies: number; buildingMultiplier: number; cleaningMultiplier: number }) {
  finite(Object.values(input));
  const laborCost = input.hourlyRate * input.hours * input.buildingMultiplier * input.cleaningMultiplier;
  const quote = laborCost + input.supplies;
  return { laborCost: roundToTwo(laborCost), suppliesCost: roundToTwo(input.supplies), costPerSqFt: roundToTwo(input.area > 0 ? quote / input.area : 0), quote: roundToTwo(quote) };
}

export function calculateFraming(input: { wallLength: number; wallHeight: number; spacing: number; doors: number; windows: number; pricePerLinearFoot: number; wastePct: number }) {
  finite(Object.values(input));
  const baseStuds = Math.ceil((input.wallLength * 12) / input.spacing) + 1;
  const studs = Math.ceil((baseStuds + input.doors * 4 + input.windows * 4) * (1 + percent(input.wastePct)));
  const plateLength = roundToTwo(input.wallLength * 3 * (1 + percent(input.wastePct)));
  const totalLumber = roundToTwo(studs * input.wallHeight + plateLength);
  return { studs, plateLength, totalLumber, estimatedCost: roundToTwo(totalLumber * input.pricePerLinearFoot) };
}

export function calculateGarage(input: { width: number; length: number; spaces: number; detached: boolean; finishMultiplier: number; detachedPct: number; rate: number }) {
  finite([input.width, input.length, input.spaces, input.finishMultiplier, input.detachedPct, input.rate]);
  const area = input.width * input.length;
  const baseCost = area * input.rate;
  const additionalCost = baseCost * input.finishMultiplier + (input.detached ? baseCost * percent(input.detachedPct) : 0);
  return { area: roundToTwo(area), baseCost: roundToTwo(baseCost), additionalCost: roundToTwo(additionalCost), total: roundToTwo(baseCost + additionalCost) };
}

export function calculateCommercial(input: { area: number; rate: number; buildingMultiplier: number; laborPct: number; designPct: number; contingencyPct: number }) {
  finite(Object.values(input));
  const baseCost = input.area * input.rate * input.buildingMultiplier;
  const laborCost = baseCost * percent(input.laborPct);
  const designFee = (baseCost + laborCost) * percent(input.designPct);
  const contingency = (baseCost + laborCost + designFee) * percent(input.contingencyPct);
  return { baseCost: roundToTwo(baseCost), laborCost: roundToTwo(laborCost), designFee: roundToTwo(designFee), contingency: roundToTwo(contingency), total: roundToTwo(baseCost + laborCost + designFee + contingency) };
}
