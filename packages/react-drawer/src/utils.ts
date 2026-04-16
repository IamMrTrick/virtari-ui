export type Direction = "bottom" | "top" | "left" | "right";

export type DrawerSizeMode = "adaptive" | "full";

export type DrawerSnapPoint = number;

export interface ResolvedSnapPoint {
  size: number;
  value: DrawerSnapPoint;
}

const RUBBERBAND_CONSTANT = 0.2;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getAxis(direction: Direction): "x" | "y" {
  return direction === "left" || direction === "right" ? "x" : "y";
}

export function getDirectionSign(direction: Direction): 1 | -1 {
  return direction === "bottom" || direction === "right" ? -1 : 1;
}

export function getCoordinate(
  direction: Direction,
  clientX: number,
  clientY: number,
): number {
  return getAxis(direction) === "x" ? clientX : clientY;
}

export function getCrossCoordinate(
  direction: Direction,
  clientX: number,
  clientY: number,
): number {
  return getAxis(direction) === "x" ? clientY : clientX;
}

export function getViewportSize(direction: Direction): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const viewport = window.visualViewport;
  const size = getAxis(direction) === "x"
    ? viewport?.width ?? window.innerWidth
    : viewport?.height ?? window.innerHeight;

  return Math.max(size, 0);
}

export function getElementSize(
  element: HTMLElement | null,
  direction: Direction,
): number {
  if (!element) {
    return 0;
  }

  return getAxis(direction) === "x" ? element.offsetWidth : element.offsetHeight;
}

export function getTranslateValue(
  direction: Direction,
  drawerSize: number,
  progress: number,
): string {
  const clampedProgress = clamp(progress, -0.15, 1.15);
  const offset = drawerSize * (1 - clampedProgress);

  switch (direction) {
    case "bottom":
      return `translate3d(0, ${offset}px, 0)`;
    case "top":
      return `translate3d(0, ${-offset}px, 0)`;
    case "right":
      return `translate3d(${offset}px, 0, 0)`;
    case "left":
      return `translate3d(${-offset}px, 0, 0)`;
  }
}

export function resolveSnapPoints(
  snapPoints: readonly DrawerSnapPoint[] | undefined,
  drawerSize: number,
): ResolvedSnapPoint[] {
  if (drawerSize <= 0) {
    return [];
  }

  const resolved = (snapPoints?.length ? snapPoints : [1])
    .map((point) => {
      const size = point <= 1 ? point * drawerSize : point;

      return {
        value: point,
        size: clamp(size, 1, drawerSize),
      };
    })
    .sort((a, b) => a.size - b.size);

  const unique: ResolvedSnapPoint[] = [];

  for (const point of resolved) {
    if (unique.length === 0 || Math.abs(point.size - unique[unique.length - 1].size) > 0.5) {
      unique.push(point);
    }
  }

  return unique.length ? unique : [{ value: 1, size: drawerSize }];
}

export function getBackgroundStyles(progress: number): {
  transform: string;
  borderRadius: string;
} {
  const clampedProgress = clamp(progress, 0, 1);
  const scale = 1 - clampedProgress * 0.06;
  const radius = clampedProgress * 18;

  return {
    transform: `scale(${scale})`,
    borderRadius: `${radius}px`,
  };
}

export function rubberband(distance: number, dimension: number): number {
  if (dimension <= 0 || distance <= 0) {
    return 0;
  }

  return (distance * dimension * RUBBERBAND_CONSTANT) /
    (dimension + RUBBERBAND_CONSTANT * distance);
}

export function applyRubberband(progress: number, drawerSize: number): number {
  if (progress < 0) {
    return -rubberband(Math.abs(progress) * drawerSize, drawerSize) / drawerSize;
  }

  if (progress > 1) {
    return 1 + rubberband((progress - 1) * drawerSize, drawerSize) / drawerSize;
  }

  return progress;
}

export function findNearestSnapIndex(
  targetSize: number,
  snapSizes: readonly number[],
  candidates?: readonly number[],
): number {
  const pool = candidates?.length ? candidates : snapSizes.map((_, index) => index);
  let closestIndex = pool[0] ?? 0;
  let closestDistance = Math.abs(targetSize - (snapSizes[closestIndex] ?? 0));

  for (const index of pool.slice(1)) {
    const distance = Math.abs(targetSize - (snapSizes[index] ?? 0));
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }

  return closestIndex;
}

export function isScrolledToDragEdge(
  element: HTMLElement | null,
  direction: Direction,
): boolean {
  if (!element) {
    return true;
  }

  switch (direction) {
    case "bottom":
      return element.scrollTop <= 1;
    case "top":
      return element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
    case "left":
      return element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
    case "right":
      return element.scrollLeft <= 1;
  }
}
