import {
  asCellDistanceUnit,
  asCellDistanceValue,
  CELL_DISTANCE_UNITS,
  cellDistanceAmount,
  DEFAULT_CELL_DISTANCE_UNIT,
  DEFAULT_CELL_DISTANCE_VALUE,
} from '@axe/domain/tabletop/cell-distance';

describe('cell distance', () => {
  it('starts at the five feet a square is worth in the usual rules', () => {
    expect(DEFAULT_CELL_DISTANCE_VALUE).toBe(5);
    expect(DEFAULT_CELL_DISTANCE_UNIT).toBe('ft');
  });

  describe('the unit', () => {
    it('keeps a known one', () => {
      expect(asCellDistanceUnit('m')).toBe('m');
      expect(asCellDistanceUnit('cell')).toBe('cell');
    });

    it('falls back to the default for anything else', () => {
      expect(asCellDistanceUnit('yards')).toBe(DEFAULT_CELL_DISTANCE_UNIT);
      expect(asCellDistanceUnit(undefined)).toBe(DEFAULT_CELL_DISTANCE_UNIT);
      expect(asCellDistanceUnit(5)).toBe(DEFAULT_CELL_DISTANCE_UNIT);
    });

    it('offers exactly the three units the settings panel lists', () => {
      expect(CELL_DISTANCE_UNITS).toEqual(['ft', 'm', 'cell']);
    });
  });

  describe('the value', () => {
    it('takes a number, and a number written down as text', () => {
      expect(asCellDistanceValue(1.5)).toBe(1.5);
      expect(asCellDistanceValue('1.5')).toBe(1.5);
    });

    it('falls back rather than accepting something unusable', () => {
      expect(asCellDistanceValue(0)).toBe(DEFAULT_CELL_DISTANCE_VALUE);
      expect(asCellDistanceValue(-5)).toBe(DEFAULT_CELL_DISTANCE_VALUE);
      expect(asCellDistanceValue('five')).toBe(DEFAULT_CELL_DISTANCE_VALUE);
      expect(asCellDistanceValue(null)).toBe(DEFAULT_CELL_DISTANCE_VALUE);
    });

    it('holds an extreme value inside the range', () => {
      expect(asCellDistanceValue(1e9)).toBe(1000);
    });
  });

  describe('how far a run of squares is', () => {
    it('counts three squares as fifteen feet', () => {
      expect(cellDistanceAmount(3, 5, 'ft')).toBe(15);
    });

    it('counts in metres just as readily', () => {
      expect(cellDistanceAmount(3, 1.5, 'm')).toBe(4.5);
    });

    it('leaves squares alone when squares are what the table counts by', () => {
      expect(cellDistanceAmount(3, 5, 'cell')).toBe(3);
    });

    it('rounds off the tail a division leaves behind', () => {
      expect(cellDistanceAmount(3, 1.333, 'm')).toBe(4);
    });

    it('reads no distance out of a run that is not a number', () => {
      expect(cellDistanceAmount(Number.NaN, 5, 'ft')).toBe(0);
    });
  });
});
