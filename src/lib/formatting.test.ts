import { describe, expect, it } from 'vitest';
import { formatCurrency, formatNumber, roundToTwo } from './formatting';

describe('formatting', () => {
  it('formats US dollars with separators and at most two decimals', () => {
    expect(formatCurrency(1234567.8)).toBe('$1,234,567.80');
  });

  it('rounds finite numbers and protects output from invalid values', () => {
    expect(roundToTwo(1.005)).toBe(1.01);
    expect(formatNumber(1234.567)).toBe('1,234.57');
    expect(() => formatCurrency(Number.NaN)).toThrow('Cannot format a non-finite number.');
  });
});
