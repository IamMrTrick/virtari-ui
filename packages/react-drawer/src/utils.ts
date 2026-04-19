export type Direction = "top" | "bottom" | "left" | "right";

export type DrawerSizeMode = "adaptive" | "full" | "fixed";

export type DrawerSnapBehavior = "staged" | "closest";

export type SnapPoint = number;

export type DrawerIndicatorPlacement = "inside" | "outside" | "hidden" | "progress";

export type DrawerHeaderVariant = "plain" | "bordered";

export type DrawerDeclaredSize =
  | number
  | string
  | ((info: DrawerViewportInfo) => number | string);

export type DrawerDirectionalValue<T> = T | Partial<Record<Direction, T>>;

export type DrawerOffset = DrawerDirectionalValue<DrawerDeclaredSize>;

export interface DrawerOpenState {
  id: string;
  size: SnapPoint;
  label?: string;
}

export interface DrawerMinimizedState {
  id?: string;
  size: SnapPoint;
  label?: string;
}

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

export interface ResolvedSnapLayout {
  snaps: ResolvedSnap[];
  minimized: ResolvedSnap | null;
}

export type SettleTarget =
  | { kind: "snap"; index: number }
  | { kind: "minimized" }
  | { kind: "close" };

declare global {
  interface Window {
    __VDS_DRAWER_DEBUG__?: boolean;
  }
}

const RUBBERBAND_K = 0.55;
const DEFAULT_SIDE_ADAPTIVE_SIZE = "clamp(18rem, 32vw, 28rem)";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isDrawerDebugEnabled(): boolean {
  return typeof window !== "undefined" && window.__VDS_DRAWER_DEBUG__ === true;
}

export function debugDrawer(event: string, payload: Record<string, unknown>) {
  if (!isDrawerDebugEnabled()) return;
  console.info(`[vds-drawer] ${event}`, payload);
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

export function getStretchScale(openPx: number, totalPx: number): number {
  if (totalPx <= 0 || openPx <= totalPx) return 1;
  const extraOpen = openPx - totalPx;
  const maxStretchPx = clamp(totalPx * 0.035, 8, 16);
  const stretchPx = Math.min(extraOpen, maxStretchPx);
  return (totalPx + stretchPx) / totalPx;
}

export function getVisualTransform(
  direction: Direction,
  openPx: number,
  totalPx: number,
  options?: { disableStretch?: boolean },
): string {
  const translate = getTranslate(direction, openPx, totalPx);
  const stretchScale = options?.disableStretch ? 1 : getStretchScale(openPx, totalPx);
  if (getAxis(direction) === "x") {
    return `${translate} scale3d(${stretchScale}, 1, 1)`;
  }
  return `${translate} scale3d(1, ${stretchScale}, 1)`;
}

function resolveSnapSize(value: SnapPoint, drawerSize: number): number {
  const size = value <= 1 && value >= 0 ? value * drawerSize : value;
  return clamp(size, 1, drawerSize);
}

export function resolveSnaps(
  snapPoints: readonly SnapPoint[] | undefined,
  drawerSize: number,
  minimizedSize?: SnapPoint,
): ResolvedSnapLayout {
  if (drawerSize <= 0) return { snaps: [], minimized: null };

  const points = snapPoints?.length ? [...snapPoints] : [1];

  const resolvedSnaps = points
    .map((value) => {
      const size = resolveSnapSize(value, drawerSize);
      return { value, size, kind: "snap" as const } satisfies ResolvedSnap;
    })
    .sort((a, b) => a.size - b.size);

  const uniqueSnaps: ResolvedSnap[] = [];
  for (const point of resolvedSnaps) {
    const last = uniqueSnaps[uniqueSnaps.length - 1];
    if (!last || Math.abs(point.size - last.size) > 1) {
      uniqueSnaps.push(point);
    }
  }

  const snaps = uniqueSnaps.length
    ? uniqueSnaps
    : [{ value: 1, size: drawerSize, kind: "snap" as const }];

  let minimized: ResolvedSnap | null = null;
  if (minimizedSize !== undefined) {
    const size = resolveSnapSize(minimizedSize, drawerSize);
    const collidesWithSnap = snaps.some((snap) => Math.abs(snap.size - size) <= 1);
    if (!collidesWithSnap) {
      minimized = { value: minimizedSize, size, kind: "minimized" };
    }
  }

  return { snaps, minimized };
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

export function resolveDirectionalValue<T>(
  value: DrawerDirectionalValue<T> | undefined,
  direction: Direction,
): T | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return (value as Partial<Record<Direction, T>>)[direction];
  }
  return value;
}

export function resolveDeclaredPixels(
  value: DrawerDeclaredSize | undefined,
  info: DrawerViewportInfo,
  direction: Direction,
): number {
  const resolved = resolveDeclaredSize(value, info);
  if (!resolved) return 0;

  const trimmed = resolved.trim();
  if (!trimmed) return 0;
  if (/^-?\d+(\.\d+)?px$/i.test(trimmed)) return parseFloat(trimmed);
  if (/^-?\d+(\.\d+)?$/i.test(trimmed)) return parseFloat(trimmed);
  if (typeof document === "undefined") {
    const parsed = parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const probe = document.createElement("div");
  probe.style.position = "fixed";
  probe.style.inset = "0 auto auto 0";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.padding = "0";
  probe.style.margin = "0";
  probe.style.border = "0";

  if (getAxis(direction) === "x") {
    probe.style.width = trimmed;
    probe.style.height = "0";
  } else {
    probe.style.height = trimmed;
    probe.style.width = "0";
  }

  document.body.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  probe.remove();
  return getAxis(direction) === "x" ? rect.width : rect.height;
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
  // Peak-and-relax curve: the background scale (and its rounded corners)
  // grow while the drawer transitions, peak near the top, then ease back to
  // unity when the drawer is fully open. At the "full-full" state the
  // background is mostly hidden, so a shrunken-with-rounded-corners backdrop
  // just looks fragmented — we relax it to its natural state instead.
  const PEAK = 0.9;
  const strength = p <= PEAK ? p / PEAK : Math.max(0, 1 - (p - PEAK) / (1 - PEAK));
  return {
    transform: `scale(${1 - strength * 0.06})`,
    borderRadius: `${strength * 24}px`,
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

export function pickSettleTarget(args: {
  currentSize: number;
  startSize: number;
  startSnapIndex: number;
  fromMinimized: boolean;
  velocity: number;
  snaps: readonly number[];
  minimizedSize: number | null;
  velocityThreshold: number;
  closeThreshold: number;
  dismissible: boolean;
  snapBehavior: DrawerSnapBehavior;
  snapStepThreshold: number;
  snapSkipThreshold: number;
}): SettleTarget {
  const {
    currentSize,
    startSize,
    startSnapIndex,
    fromMinimized,
    velocity,
    snaps,
    minimizedSize,
    velocityThreshold,
    closeThreshold,
    dismissible,
    snapBehavior,
    snapStepThreshold,
    snapSkipThreshold,
  } = args;

  const projectionMs = 220;
  const projected = currentSize + velocity * projectionMs;
  const fastSwipe = Math.abs(velocity) >= velocityThreshold;
  const decide = (target: SettleTarget, reason: string): SettleTarget => {
    debugDrawer("pickSettleTarget", {
      reason,
      target,
      startSize,
      currentSize,
      projected,
      velocity,
      fastSwipe,
      startSnapIndex,
      fromMinimized,
      minimizedSize,
      snaps,
      snapBehavior,
    });
    return target;
  };

  // ── Minimized origin ─────────────────────────────────────────
  if (fromMinimized) {
    if (minimizedSize === null) {
      // shouldn't happen, but stay safe
      if (!snaps.length) return decide({ kind: "close" }, "minimized-origin-without-stages");
      return decide({ kind: "snap", index: 0 }, "minimized-origin-fallback-first-snap");
    }

    const UP_DEADZONE = 12;
    const delta = projected - minimizedSize;

    // Dragged up with meaningful intent → always expand, never bounce back
    if (delta > UP_DEADZONE || (fastSwipe && velocity > 0)) {
      if (!snaps.length) return decide({ kind: "minimized" }, "minimized-origin-no-snaps");
      if (snapBehavior === "closest") {
        return decide(
          { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
          "minimized-expand-closest",
        );
      }
      // staged from minimized: step to snaps[0] unless projection/velocity overshoots past it
      const gap = Math.abs(snaps[0] - minimizedSize);
      const skipThreshold = Math.max(56, gap * snapSkipThreshold);
      if (fastSwipe || delta >= skipThreshold) {
        return decide(
          { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
          "minimized-expand-skip",
        );
      }
      return decide({ kind: "snap", index: 0 }, "minimized-expand-step");
    }

    // Dragged down → close (minimized is pre-close)
    if (dismissible) {
      const closeCutoff = minimizedSize * closeThreshold;
      if (projected <= closeCutoff) return decide({ kind: "close" }, "minimized-close-cutoff");
      if (fastSwipe && velocity < 0) return decide({ kind: "close" }, "minimized-close-fast-swipe");
    }

    return decide({ kind: "minimized" }, "minimized-rest");
  }

  // ── Real-snap origin ─────────────────────────────────────────
  if (!snaps.length) {
    return minimizedSize !== null
      ? decide({ kind: "minimized" }, "no-snaps-rest-minimized")
      : decide({ kind: "close" }, "no-snaps-close");
  }

  const smallest = snaps[0];
  const delta = projected - startSize;
  const direction = delta > 0 ? 1 : -1;
  const movingDown = delta < 0;
  const belowSmallest = projected < smallest;

  // Transitions below smallest snap: minimized or close
  if (movingDown && belowSmallest) {
    const closeCutoff = (minimizedSize ?? smallest) * closeThreshold;
    if (dismissible) {
      if (projected <= closeCutoff) return decide({ kind: "close" }, "below-smallest-close-cutoff");
      if (fastSwipe && velocity < 0 && minimizedSize === null) {
        // no minimized lane — fast-swipe down closes directly
        return decide({ kind: "close" }, "below-smallest-fast-close");
      }
    }
    if (minimizedSize !== null) {
      // settle at minimized (pre-close rest)
      return decide({ kind: "minimized" }, "below-smallest-minimized");
    }
    if (!dismissible) return decide({ kind: "snap", index: 0 }, "below-smallest-clamp-first-snap");
    return decide({ kind: "close" }, "below-smallest-close");
  }

  // Same-direction / cross-snap logic (unchanged semantics, minimized excluded)
  if (snapBehavior === "closest") {
    return decide(
      { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
      "closest-snap",
    );
  }

  const deadZone = 14;
  if (Math.abs(delta) <= deadZone) {
    return decide({ kind: "snap", index: startSnapIndex }, "dead-zone");
  }

  const adjacentIndex = clamp(startSnapIndex + direction, 0, snaps.length - 1);
  if (adjacentIndex === startSnapIndex) {
    return decide({ kind: "snap", index: startSnapIndex }, "clamped-adjacent");
  }

  const adjacentGap = Math.abs(snaps[adjacentIndex] - startSize);
  const stepThreshold = Math.max(24, adjacentGap * snapStepThreshold);
  if (!fastSwipe && Math.abs(delta) < stepThreshold) {
    return decide({ kind: "snap", index: startSnapIndex }, "below-step-threshold");
  }

  const skipThreshold = Math.max(56, adjacentGap * snapSkipThreshold);
  if (fastSwipe || Math.abs(delta) >= skipThreshold) {
    return decide(
      { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
      "skip-to-nearest",
    );
  }

  return decide({ kind: "snap", index: adjacentIndex }, "step-to-adjacent");
}
