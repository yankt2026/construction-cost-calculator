export interface ValidationOptions { positive?: boolean; max?: number; }

export function validateFiniteNumber(value: unknown, options: ValidationOptions = {}): string | null {
  if (value === '' || value === null || value === undefined) return 'Enter a value.';
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) return 'Enter a valid number.';
  if (numeric < 0) return 'Value cannot be negative.';
  if (options.positive && numeric <= 0) return 'Value must be greater than zero.';
  if (options.max !== undefined && numeric > options.max) return `Value must be ${options.max} or less.`;
  return null;
}
