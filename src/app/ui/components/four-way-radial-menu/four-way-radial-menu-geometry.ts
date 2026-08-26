export type RadialMenuSeat = 'north' | 'east' | 'south' | 'west';

export interface RadialPoint {
  x: number;
  y: number;
}

export interface RadialViewport {
  width: number;
  height: number;
}

export const RADIAL_MENU_PAGE_SIZE = 8;

const SEAT_ANGLE: Record<RadialMenuSeat, number> = {
  north: -90,
  east: 0,
  south: 90,
  west: 180,
};

const SEAT_TEXT_ROTATION: Record<RadialMenuSeat, number> = {
  north: 180,
  east: 270,
  south: 0,
  west: 90,
};

export function seatAngle(seat: RadialMenuSeat): number {
  return SEAT_ANGLE[seat];
}

export function seatTextRotation(seat: RadialMenuSeat): number {
  return SEAT_TEXT_ROTATION[seat];
}

export function pointAtAngle(angleDegrees: number, radius: number): RadialPoint {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
  };
}

export function angleOnRing(index: number, count: number, startAngleDegrees = -90): number {
  if (count < 1) return startAngleDegrees;
  return startAngleDegrees + (360 / count) * index;
}

export function pointOnRing(index: number, count: number, radius: number, startAngleDegrees = -90): RadialPoint {
  if (count < 1) return { x: 0, y: 0 };
  return pointAtAngle(angleOnRing(index, count, startAngleDegrees), radius);
}

export function outwardRotationOnRing(index: number, count: number, startAngleDegrees = -90): number {
  if (count < 1) return 0;
  const pointAngle = angleOnRing(index, count, startAngleDegrees);
  return (((pointAngle + 270) % 360) + 360) % 360;
}

export function nearestCardinalRotation(degrees: number): 0 | 90 | 180 | 270 {
  const normalized = (((Math.round(degrees / 90) * 90) % 360) + 360) % 360;
  return normalized as 0 | 90 | 180 | 270;
}

export function clampRadialCenter(anchor: RadialPoint, viewport: RadialViewport, extent: number): RadialPoint {
  const clampAxis = (value: number, length: number): number => {
    if (length <= extent * 2) return length / 2;
    return Math.max(extent, Math.min(value, length - extent));
  };

  return {
    x: clampAxis(anchor.x, viewport.width),
    y: clampAxis(anchor.y, viewport.height),
  };
}

export function radialPageCount(itemCount: number, pageSize = RADIAL_MENU_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(itemCount / pageSize));
}

export function radialPage<T>(items: T[], page: number, pageSize = RADIAL_MENU_PAGE_SIZE): T[] {
  const pageCount = radialPageCount(items.length, pageSize);
  const safePage = Math.max(0, Math.min(page, pageCount - 1));
  return items.slice(safePage * pageSize, (safePage + 1) * pageSize);
}
