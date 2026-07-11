import { describe, expect, it } from 'vitest';
import {
  calculateCleaning,
  calculateCommercial,
  calculateFraming,
  calculateGarage,
  calculateGeneralConstruction,
  calculateHouseConstruction,
} from './calculations';

describe('construction calculations', () => {
  it('calculates general construction costs in layers', () => {
    expect(calculateGeneralConstruction({ area: 1000, materialRate: 80, laborRate: 50, contractorPct: 10, contingencyPct: 5 })).toEqual({
      materialCost: 80000, laborCost: 50000, contractorFee: 13000, contingency: 7150, total: 150150,
    });
  });

  it('calculates house cost without multiplying total area by floor count', () => {
    expect(calculateHouseConstruction({ area: 2000, floors: 2, floorMultiplier: 1.05, qualityMultiplier: 1.15, materialRate: 90, laborRate: 60, garageArea: 400, garageRate: 70 })).toEqual({
      baseCost: 315000, additionalCost: 75250, costPerSqFt: 162.6, total: 390250,
    });
  });

  it('calculates post-construction cleaning', () => {
    expect(calculateCleaning({ area: 5000, hourlyRate: 35, hours: 40, supplies: 250, buildingMultiplier: 1.1, cleaningMultiplier: 1.25 })).toEqual({
      laborCost: 1925, suppliesCost: 250, costPerSqFt: 0.44, quote: 2175,
    });
  });

  it('calculates framing quantities with waste', () => {
    expect(calculateFraming({ wallLength: 20, wallHeight: 8, spacing: 16, doors: 1, windows: 2, pricePerLinearFoot: 1.2, wastePct: 10 })).toEqual({
      studs: 31, plateLength: 66, totalLumber: 314, estimatedCost: 376.8,
    });
  });

  it('calculates garage costs', () => {
    expect(calculateGarage({ width: 24, length: 24, spaces: 2, detached: true, finishMultiplier: 0.12, detachedPct: 8, rate: 75 })).toEqual({
      area: 576, baseCost: 43200, additionalCost: 8640, total: 51840,
    });
  });

  it('calculates commercial building costs', () => {
    expect(calculateCommercial({ area: 10000, rate: 120, buildingMultiplier: 1.1, laborPct: 30, designPct: 8, contingencyPct: 10 })).toEqual({
      baseCost: 1320000, laborCost: 396000, designFee: 137280, contingency: 185328, total: 2038608,
    });
  });
});
