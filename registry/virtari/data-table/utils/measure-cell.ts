/**
 * Off-DOM text measurement for column auto-fit.
 *
 * Creates a hidden <span> that inherits the same font stack + padding from a
 * reference cell, clones the given text nodes into it, and reports
 * `offsetWidth + horizontal padding`. Handles custom React cell renderers
 * because we measure the rendered DOM, not the raw value.
 */

export interface MeasureOptions {
  /** Reference element whose font stack/padding we inherit. */
  reference: HTMLElement;
  /** Extra px to add for comfort (default: 1). */
  fudge?: number;
}

function readComputedPxPair(el: Element, prop: string): number {
  const v = getComputedStyle(el).getPropertyValue(prop);
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export function createMeasureSpan({ reference }: MeasureOptions): {
  span: HTMLSpanElement;
  dispose(): void;
} {
  const cs = getComputedStyle(reference);
  const span = document.createElement("span");
  span.style.cssText = [
    "position:absolute",
    "visibility:hidden",
    "pointer-events:none",
    "top:-9999px",
    "left:-9999px",
    "white-space:pre",
    `font-family:${cs.fontFamily}`,
    `font-size:${cs.fontSize}`,
    `font-weight:${cs.fontWeight}`,
    `font-style:${cs.fontStyle}`,
    `letter-spacing:${cs.letterSpacing}`,
    `text-transform:${cs.textTransform}`,
  ].join(";");
  document.body.appendChild(span);
  return {
    span,
    dispose() {
      span.remove();
    },
  };
}

export function measureCellWidth(
  cell: HTMLElement,
  span: HTMLSpanElement,
  fudge = 1,
): number {
  /* Clone the cell's visible text. For complex renderers (icons, badges),
   * fall back to measuring the cell's own scrollWidth (no clip). */
  const text = cell.textContent ?? "";
  span.textContent = text;
  const spanWidth = span.offsetWidth;
  const cs = getComputedStyle(cell);
  const padLeft = readComputedPxPair(cell, "padding-left");
  const padRight = readComputedPxPair(cell, "padding-right");
  const scrollWidth = cell.scrollWidth - padLeft - padRight;
  const best = Math.max(spanWidth, scrollWidth);
  return Math.ceil(best + padLeft + padRight + fudge);
}
