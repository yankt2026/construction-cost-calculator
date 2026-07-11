import { describe, expect, it } from 'vitest';
import { validateFiniteNumber } from './validation';

describe('validateFiniteNumber', () => {
  it('rejects blank, invalid, negative, NaN, and Infinity values', () => {
    expect(validateFiniteNumber('')).toBe('Enter a value.');
    expect(validateFiniteNumber('abc')).toBe('Enter a valid number.');
    expect(validateFiniteNumber(-1)).toBe('Value cannot be negative.');
    expect(validateFiniteNumber(Number.NaN)).toBe('Enter a valid number.');
    expect(validateFiniteNumber(Number.POSITIVE_INFINITY)).toBe('Enter a valid number.');
  });

  it('applies positive and maximum constraints', () => {
    expect(validateFiniteNumber(0, { positive: true })).toBe('Value must be greater than zero.');
    expect(validateFiniteNumber(101, { max: 100 })).toBe('Value must be 100 or less.');
    expect(validateFiniteNumber(50, { positive: true, max: 100 })).toBeNull();
  });
});
