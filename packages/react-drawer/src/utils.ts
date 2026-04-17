export type Direction = "top" | "bottom" | "left" | "right";

export type DrawerSizeMode = "adaptive" | "full" | "fixed";

export type DrawerSnapBehavior = "staged" | "closest";

export type SnapPoint = number;

export type DrawerDeclaredSize =
  | number
  | string
  | ((info: DrawerViewportInfo) => number | string);

export interface DrawerViewportInfo {
  direction: Direction;
  viewportWidth: number;
  viewportHeight: number;
  availableSize: number;
  orientation: "portrait" | "landscape";
}

export interface ResolvedSnap {
  size: number;
  value: SnapPoint;
  kind: "snap" | "minimized";
}

const RUBBERBAND_K = 0.55;
const DEFAULT_SIDE_ADAPTIVE_SIZE = "clamp(18rem, 32vw, 28rem)";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getAxis(direction: Direction): "x" | "y" {
  return direction === "left" || direction === "right" ? "x" : "y";
}

export function getMainCoord(direction: Direction, x: number, y: number): number {
  return getAxis(direction) === "x" ? x : y;
}

export function getCrossCoord(direction: Direction, x: number, y: number): number {
  return getAxis(direction) === "x" ? y : x;
}

export function getOpenSign(direction: Direction): 1 | -1 {
  return direction === "top" || direction === "left" ? 1 : -1;
}

export function getViewportRect(): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  };
}

export function getViewportSize(direction: Direction): number {
  const viewport = getViewportRect();
  return getAxis(direction) === "x" ? viewport.width : viewport.height;
}

export function getViewportInfo(
  direction: Direction,
  availableSize: number,
): DrawerViewportInfo {
  const viewport = getViewportRect();
  return {
    direction,
    viewportWidth: viewport.width,
    viewportHeight: viewport.height,
    availableSize,
    orientation: viewport.width >= viewport.height ? "landscape" : "portrait",
  };
}

export function getElementSize(el: HTMLElement | null, direction: Direction): number {
  if (!el) return 0;
  const axis = getAxis(direction);
  const rect = el.getBoundingClientRect();
  const computed = getComputedStyle(el);
  const rectSize = axis === "x" ? rect.width : rect.height;
  const offsetSize = axis === "x" ? el.offsetWidth : el.offsetHeight;
  const clientSize = axis === "x" ? el.clientWidth : el.clientHeight;
  const scrollSize = axis === "x" ? el.scrollWidth : el.scrollHeight;
  const computedSize = parseFloat(axis === "x" ? computed.width : computed.height);

  return Math.max(
    rectSize || 0,
    offsetSize || 0,
    clientSize || 0,
    scrollSize || 0,
    Number.isFinite(computedSize) ? computedSize : 0,
  );
}

export function getTranslate(direction: Direction, openPx: number, totalPx: number): string {
  const offset = Math.max(totalPx - openPx, 0);
  switch (direction) {
    case "bottom": return `translate3d(0, ${offset}px, 0)`;
    case "top":    return `translate3d(0, ${-offset}px, 0)`;
    case "right":  return `translate3d(${offset}px, 0, 0)`;
    case "left":   return `translate3d(${-offset}px, 0, 0)`;
  }
}

function resolveSnapSize(value: SnapPoint, drawerSize: number): number {
  const size = value <= 1 && value >= 0 ? value * drawerSize : value;
  return clamp(size, 1, drawerSize);
}

export function resolveSnaps(
  snapPoints: readonly SnapPoint[] | undefined,
  drawerSize: number,
  minimizedSize?: SnapPoint,
): ResolvedSnap[] {
  if (drawerSize <= 0) return [];

  const points = snapPoints?.length ? [...snapPoints] : [1];
  if (minimizedSize !== undefined) points.push(minimizedSize);

  const resolved = points
    .map((value) => {
      const size = resolveSnapSize(value, drawerSize);
      const kind = minimizedSize !== undefined && value === minimizedSize
        ? "minimized"
        : "snap";
      return { value, size, kind } satisfies ResolvedSnap;
    })
    .sort((a, b) => a.size - b.size);

  const unique: ResolvedSnap[] = [];
  for (const point of resolved) {
    const last = unique[unique.length - 1];
    if (!last || Math.abs(point.size - last.size) > 1) {
      unique.push(point);
      continue;
    }
    if (point.kind === "minimized") unique[unique.length - 1] = point;
  }

  return unique.length ? unique : [{ value: 1, size: drawerSize, kind: "snap" }];
}

export function findSnapIndexByValue(
  snaps: readonly ResolvedSnap[],
  value: SnapPoint,
): number {
  return snaps.findIndex((snap) => snap.value === value);
}

export function findNearestSnapIndex(
  snaps: readonly number[],
  size: number,
): number {
  if (!snaps.length) return 0;
  let bestIndex = 0;
  let bestDistance = Math.abs(snaps[0] - size);
  for (let index = 1; index < snaps.length; index++) {
    const distance = Math.abs(snaps[index] - size);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }
  return bestIndex;
}

export function getOverlayProgress(
  size: number,
  totalSize: number,
  startSize = 0,
): number {
  if (totalSize <= 0) return 0;
  if (totalSize <= startSize + 1) return size > startSize ? 1 : 0;
  return clamp((size - startSize) / (totalSize - startSize), 0, 1);
}

export function resolveDeclaredSize(
  value: DrawerDeclaredSize | undefined,
  info: DrawerViewportInfo,
): string | undefined {
  if (value === undefined) return undefined;
  const resolved = typeof value === "function" ? value(info) : value;
  return typeof resolved === "number" ? `${resolved}px` : resolved;
}

export function getDefaultAdaptiveSize(direction: Direction): string {
  return getAxis(direction) === "x" ? DEFAULT_SIDE_ADAPTIVE_SIZE : "auto";
}

export function rubberband(distance: number, dimension: number): number {
  if (dimension <= 0 || distance <= 0) return 0;
  return (distance * dimension * RUBBERBAND_K) / (dimension + RUBBERBAND_K * distance);
}

export function applyRubberband(openPx: number, drawerSize: number): number {
  if (openPx > drawerSize) {
    return drawerSize + rubberband(openPx - drawerSize, drawerSize);
  }
  if (openPx < 0) {
    return -rubberband(-openPx, drawerSize);
  }
  return openPx;
}

export function getBackgroundStyles(progress: number): { transform: string; borderRadius: string } {
  const p = clamp(progress, 0, 1);
  return {
    transform: `scale(${1 - p * 0.06})`,
    borderRadius: `${p * 24}px`,
  };
}

export function isAtScrollEdge(
  el: HTMLElement | null,
  direction: Direction,
  closingDelta: number,
): boolean {
  if (!el) return true;
  const tolerance = 1;
  if (getAxis(direction) === "y") {
    if (el.scrollHeight <= el.clientHeight + tolerance) return true;
    if (direction === "bottom") {
      return closingDelta >= 0
        ? el.scrollTop <= tolerance
        : el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance;
    }
    return closingDelta >= 0
      ? el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance
      : el.scrollTop <= tolerance;
  }
  if (el.scrollWidth <= el.clientWidth + tolerance) return true;
  if (direction === "right") {
    return closingDelta >= 0
      ? el.scrollLeft <= tolerance
      : el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance;
  }
  return closingDelta >= 0
    ? el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance
    : el.scrollLeft <= tolerance;
}

export function pickTargetSnap(args: {
  currentSize: number;
  startSize: number;
  startSnapIndex: number;
  velocity: number;
  snaps: readonly number[];
  velocityThreshold: number;
  closeThreshold: number;
  dismissible: boolean;
  snapBehavior: DrawerSnapBehavior;
  snapStepThreshold: number;
  snapSkipThreshold: number;
}): number {
  const {
    currentSize,
    startSize,
    startSnapIndex,
    velocity,
    snaps,
    velocityThreshold,
    closeThreshold,
    dismissible,
    snapBehavior,
    snapStepThreshold,
    snapSkipThreshold,
  } = args;

  if (!snaps.length) return 0;

  const projectionMs = 220;
  const projected = currentSize + velocity * projectionMs;
  const smallest = snaps[0];
  const fastSwipe = Math.abs(velocity) >= velocityThreshold;
  const closestIndex = findNearestSnapIndex(snaps, projected);
  const closeCutoff = smallest * closeThreshold;

  if (snapBehavior === "closest") {
    if (dismissible) {
      if (projected <= closeCutoff) return -1;
      if (fastSwipe && velocity < 0 && currentSize <= smallest + Math.max(24, smallest * 0.25)) {
        return -1;
      }
    }
    return closestIndex;
  }

  const delta = projected - startSize;
  const deadZone = 14;
  if (Math.abs(delta) <= deadZone) return startSnapIndex;

  const direction = delta > 0 ? 1 : -1;
  const adjacentIndex = clamp(startSnapIndex + direction, 0, snaps.length - 1);
  if (adjacentIndex === startSnapIndex) {
    if (
      dismissible &&
      direction < 0 &&
      (projected <= closeCutoff ||
        (fastSwipe && velocity < 0 && currentSize <= smallest + Math.max(24, smallest * 0.25)))
    ) {
      return -1;
    }
    return startSnapIndex;
  }

  const adjacentGap = Math.abs(snaps[adjacentIndex] - startSize);
  const stepThreshold = Math.max(24, adjacentGap * snapStepThreshold);
  if (!fastSwipe && Math.abs(delta) < stepThreshold) return startSnapIndex;

  if (dismissible && direction < 0) {
    const distancePastSmallest = Math.max(smallest - projected, 0);
    if (startSnapIndex === 0) {
      if (projected <= closeCutoff) return -1;
      if (fastSwipe && velocity < 0 && currentSize <= smallest + Math.max(24, smallest * 0.25)) {
        return -1;
      }
    } else {
      const dismissSkipThreshold = Math.max(
        72,
        Math.max(startSize - smallest, adjacentGap) * snapSkipThreshold,
      );
      if (distancePastSmallest >= dismissSkipThreshold) {
        return -1;
      }
    }
  }

  const skipThreshold = Math.max(56, adjacentGap * snapSkipThreshold);
  if (fastSwipe || Math.abs(delta) >= skipThreshold) {
    return closestIndex;
  }

  return adjacentIndex;
}
