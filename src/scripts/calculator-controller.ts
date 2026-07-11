import { calculateCleaning, calculateCommercial, calculateFraming, calculateGarage, calculateGeneralConstruction, calculateHouseConstruction } from '../lib/calculations';
import { formatCurrency, formatNumber } from '../lib/formatting';
import { validateFiniteNumber } from '../lib/validation';

const calculate = (id: string, values: Record<string, number | boolean>, multipliers: Record<string, number>) => {
  switch (id) {
    case 'general': return calculateGeneralConstruction(values as never);
    case 'house': return calculateHouseConstruction({ ...values, floorMultiplier: multipliers.floors, qualityMultiplier: multipliers.quality } as never);
    case 'cleaning': return calculateCleaning({ ...values, buildingMultiplier: multipliers.buildingType, cleaningMultiplier: multipliers.cleaningLevel } as never);
    case 'framing': return calculateFraming({ ...values, spacing: multipliers.spacing } as never);
    case 'garage': return calculateGarage({ ...values, finishMultiplier: multipliers.finish } as never);
    case 'commercial': return calculateCommercial({ ...values, buildingMultiplier: multipliers.buildingType } as never);
    default: throw new Error('Unknown calculator.');
  }
};

document.querySelectorAll<HTMLFormElement>('[data-calculator]').forEach((form) => {
  const shell = form.closest('.calculator-shell')!;
  const empty = shell.querySelector<HTMLElement>('[data-result-empty]')!;
  const list = shell.querySelector<HTMLElement>('[data-result-list]')!;
  const printButton = shell.querySelector<HTMLButtonElement>('[data-print]')!;
  const formError = form.querySelector<HTMLElement>('[data-form-error]')!;
  const clear = () => { form.querySelectorAll<HTMLElement>('[data-error]').forEach((node) => node.textContent = ''); formError.textContent = ''; };

  form.addEventListener('submit', (event) => {
    event.preventDefault(); clear();
    const values: Record<string, number | boolean> = {}; const multipliers: Record<string, number> = {}; let invalid = false;
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select').forEach((field) => {
      if (field instanceof HTMLInputElement && field.type === 'checkbox') { values[field.name] = field.checked; return; }
      if (field instanceof HTMLSelectElement) {
        values[field.name] = Number(field.value) || 0;
        multipliers[field.name] = Number(field.selectedOptions[0]?.dataset.multiplier ?? field.value);
        return;
      }
      const max = field.max === '' ? undefined : Number(field.max);
      const message = validateFiniteNumber(field.value, { positive: Number(field.min) > 0, max });
      if (message) { invalid = true; form.querySelector<HTMLElement>(`[data-error="${field.name}"]`)!.textContent = message; field.setAttribute('aria-invalid', 'true'); }
      else { field.removeAttribute('aria-invalid'); values[field.name] = Number(field.value); }
    });
    if (invalid) { formError.textContent = 'Please correct the highlighted fields.'; return; }
    try {
      const result = calculate(form.dataset.calculator!, values, multipliers) as Record<string, number>;
      shell.querySelectorAll<HTMLElement>('[data-result]').forEach((node) => {
        const value = result[node.dataset.result!];
        node.textContent = node.dataset.format === 'currency' ? formatCurrency(value) : node.dataset.format === 'integer' ? Math.ceil(value).toLocaleString('en-US') : formatNumber(value);
      });
      empty.hidden = true; list.hidden = false; printButton.hidden = false;
    } catch { formError.textContent = 'The estimate could not be calculated. Check all values and try again.'; list.hidden = true; printButton.hidden = true; }
  });
  form.addEventListener('reset', () => { window.setTimeout(() => { clear(); empty.hidden = false; list.hidden = true; printButton.hidden = true; }, 0); });
  printButton.addEventListener('click', () => window.print());
});
