import { describe, expect, it } from 'vitest';
import { calculators } from './calculators';

describe('calculator content', () => {
  it('defines six unique calculators with complete SEO and internal links', () => {
    expect(calculators).toHaveLength(6);
    expect(new Set(calculators.map((item) => item.slug)).size).toBe(6);
    expect(new Set(calculators.map((item) => item.title)).size).toBe(6);
    expect(calculators.every((item) => item.faqs.length === 5)).toBe(true);
    expect(calculators.every((item) => item.related.length >= 3)).toBe(true);
  });
});
