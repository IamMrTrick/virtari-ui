export type Direction = "bottom" | "top" | "left" | "right";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Returns the axis that this direction moves on */
export function getAxis(direction: Direction): "x" | "y" {
  return direction === "left" || direction === "right" ? "x" : "y";
}

/** Returns +1 or -1 based on the direction the drawer opens toward */
export function getDirectionSign(direction: Direction): number {
  return direction === "bottom" || direction === "right" ? -1 : 1;
}

/**
 * Compute the translate value to position the drawer.
 * `progress` 0 = fully closed (off-screen), 1 = fully open.
 */
export function getTranslateValue(
  direction: Direction,
  drawerSize: number,
  progress: number,
): string {
  const offset = drawerSize * (1 - progress);
  const axis = getAxis(direction);

  switch (direction) {
    case "bottom":
      return axis === "y" ? `translate3d(0, ${offset}px, 0)` : "";
    case "top":
      return `translate3d(0, ${-offset}px, 0)`;
    case "right":
      return `translate3d(${offset}px, 0, 0)`;
    case "left":
      return `translate3d(${-offset}px, 0, 0)`;
  }
}

/**
 * Given a pointer delta (in the drawer's axis), return 0-1 progress.
 * Positive delta = closing direction for bottom/right drawers.
 */
export function deltaToProgress(
  direction: Direction,
  delta: number,
  drawerSize: number,
): number {
  if (drawerSize === 0) return 0;
  const sign = getDirectionSign(direction);
  return clamp(1 - (delta * sign) / drawerSize, 0, 1.15); // allow slight overscroll
}

/**
 * Resolve snap points to pixel values.
 * Values 0-1 are fractions of drawer size. Values > 1 are pixels.
 */
export function resolveSnapPoints(
  snapPoints: number[],
  drawerSize: number,
): number[] {
  return snapPoints
    .map((sp) => (sp <= 1 ? sp * drawerSize : sp))
    .sort((a, b) => a - b);
}

/**
 * Find the nearest snap point, factoring in velocity.
 * Returns the pixel value of the target snap point.
 */
export function findSnapTarget(
  currentPosition: number,
  velocity: number,
  snapPointsPx: number[],
  velocityWeight: number = 300,
): number {
  // Project position based on velocity
  const projected = currentPosition + velocity * velocityWeight;

  let closest = snapPointsPx[0];
  let minDist = Math.abs(projected - closest);

  for (let i = 1; i < snapPointsPx.length; i++) {
    const dist = Math.abs(projected - snapPointsPx[i]);
    if (dist < minDist) {
      minDist = dist;
      closest = snapPointsPx[i];
    }
  }

  return closest;
}

/**
 * Calculate background scale and border-radius based on drawer progress.
 */
export function getBackgroundStyles(progress: number): {
  transform: string;
  borderRadius: string;
} {
  const scale = lerp(1, 0.94, progress);
  const radius = lerp(0, 8, progress);
  return {
    transform: `scale(${scale})`,
    borderRadius: `${radius}px`,
  };
}

/**
 * Check if the scrollable content is at the edge where dragging should start.
 */
export function isScrolledToEdge(
  element: HTMLElement | null,
  direction: Direction,
): boolean {
  if (!element) return true;

  switch (direction) {
    case "bottom":
      return element.scrollTop <= 0;
    case "top":
      return element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
    case "left":
      return element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
    case "right":
      return element.scrollLeft <= 0;
  }
}
