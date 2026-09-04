/**
 * What one square is worth in the rules.
 *
 * D&D counts a square as five feet standing on a one inch base; another game counts it
 * differently. It is the other half of the scale from the millimetres a square measures on
 * the glass, and like them it is read on the screen in front of you rather than shared:
 * nobody else's view changes because of what this table is counting by.
 */
export const CELL_DISTANCE_UNITS = ['ft', 'm', 'cell'] as const;

export type CellDistanceUnit = (typeof CELL_DISTANCE_UNITS)[number];

export const DEFAULT_CELL_DISTANCE_VALUE = 5;
export const DEFAULT_CELL_DISTANCE_UNIT: CellDistanceUnit = 'ft';

const MIN_CELL_DISTANCE_VALUE = 0.01;
const MAX_CELL_DISTANCE_VALUE = 1000;

export function asCellDistanceUnit(value: unknown): CellDistanceUnit {
  return typeof value === 'string' && (CELL_DISTANCE_UNITS as readonly string[]).includes(value)
    ? (value as CellDistanceUnit)
    : DEFAULT_CELL_DISTANCE_UNIT;
}

export function asCellDistanceValue(value: unknown): number {
  const parsed = typeof value === 'string' ? Number(value) : value;
  if (typeof parsed !== 'number' || !Number.isFinite(parsed) || parsed <= 0) return DEFAULT_CELL_DISTANCE_VALUE;
  return Math.min(Math.max(parsed, MIN_CELL_DISTANCE_VALUE), MAX_CELL_DISTANCE_VALUE);
}

/**
 * How far a run of squares is, in whatever the table counts by.
 *
 * Counting in squares is its own answer, so the value is left out of it entirely.
 */
export function cellDistanceAmount(cells: number, value: unknown, unit: unknown): number {
  const squares = Number.isFinite(cells) ? cells : 0;
  if (asCellDistanceUnit(unit) === 'cell') return round(squares);
  return round(squares * asCellDistanceValue(value));
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
