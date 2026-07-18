export type NumberPickerFormatter = (value: number) => string;

export const DEFAULT_VISIBLE_ITEMS = 7;
export const MAX_VISIBLE_ITEMS = 11;
export const MAX_PICKER_ITEMS = 1000;

export function createNumberRange(min: number, max: number, step: number): number[] {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : safeMin;
  const start = Math.min(safeMin, safeMax);
  const end = Math.max(safeMin, safeMax);
  const increment = Number.isFinite(step) && step > 0 ? step : 1;
  const count = Math.min(Math.floor((end - start) / increment) + 1, MAX_PICKER_ITEMS);

  return Array.from({ length: count }, (_, index) =>
    Number((start + index * increment).toFixed(6)),
  );
}

export function findClosestIndex(values: readonly number[], value: number): number {
  if (values.length === 0) return 0;

  return values.reduce(
    (closest, current, index) =>
      Math.abs(current - value) < Math.abs(values[closest] - value) ? index : closest,
    0,
  );
}

export function normalizeVisibleItems(value: number): number {
  const size = Number.isFinite(value) ? Math.floor(value) : DEFAULT_VISIBLE_ITEMS;
  const clamped = Math.min(Math.max(size, 3), MAX_VISIBLE_ITEMS);

  return clamped % 2 === 0 ? Math.min(clamped + 1, MAX_VISIBLE_ITEMS) : clamped;
}
