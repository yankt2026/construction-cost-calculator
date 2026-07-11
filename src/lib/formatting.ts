export function roundToTwo(value: number): number {
  if (!Number.isFinite(value)) throw new Error('Cannot round a non-finite number.');
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) throw new Error('Cannot format a non-finite number.');
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) throw new Error('Cannot format a non-finite number.');
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(roundToTwo(value));
}
