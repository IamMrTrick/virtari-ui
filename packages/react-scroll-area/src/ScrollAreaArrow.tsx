import type { ButtonHTMLAttributes } from "react";
import { cn } from "@virtari/utils";

export interface ScrollAreaArrowProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Logical side the arrow scrolls toward. "start" = inline-start / block-start,
   * "end" = inline-end / block-end. RTL is handled via CSS (chevron flips).
   */
  side: "start" | "end";
  orientation: "vertical" | "horizontal";
}

export function ScrollAreaArrow({
  side,
  orientation,
  className,
  ...rest
}: ScrollAreaArrowProps) {
  return (
    <button
      type="button"
      aria-label={arrowLabel(side, orientation)}
      data-side={side}
      className={cn("vds-scroll-area-arrow", className)}
      {...rest}
    >
      <ChevronIcon side={side} orientation={orientation} />
    </button>
  );
}

function arrowLabel(
  side: "start" | "end",
  orientation: "vertical" | "horizontal",
): string {
  if (orientation === "vertical") {
    return side === "start" ? "Scroll up" : "Scroll down";
  }
  return side === "start" ? "Scroll to start" : "Scroll to end";
}

function ChevronIcon({
  side,
  orientation,
}: {
  side: "start" | "end";
  orientation: "vertical" | "horizontal";
}) {
  // For horizontal: start → left chevron, end → right chevron (CSS flips for RTL).
  // For vertical:   start → up chevron,   end → down chevron.
  const path =
    orientation === "vertical"
      ? side === "start"
        ? "M18 15 12 9 6 15"
        : "M6 9 12 15 18 9"
      : side === "start"
      ? "M15 18 9 12 15 6"
      : "M9 6 15 12 9 18";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
