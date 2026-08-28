import { cn } from "@virtari-packages/utils";
import type { ElementType, Ref } from "react";
import { Slot } from "@virtari-packages/primitives/slot";

/* ── Types ── */

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";
export type HeadingTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "inherit";
export type HeadingAlign = "start" | "center" | "end" | "justify";
export type HeadingLeading = "none" | "tight" | "snug" | "normal" | "relaxed";
export type HeadingTracking = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
export type HeadingWrap = "balance" | "pretty" | "nowrap";

/* Default visual size per semantic level — overridable via `size`. */
const LEVEL_TO_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: "8",
  2: "7",
  3: "6",
  4: "5",
  5: "4",
  6: "3",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level — controls the rendered tag (h1–h6). */
  level?: HeadingLevel;
  /** Visual size step — defaults to a sensible match for `level`. */
  size?: HeadingSize;
  weight?: HeadingWeight;
  tone?: HeadingTone;
  align?: HeadingAlign;
  leading?: HeadingLeading;
  tracking?: HeadingTracking;
  truncate?: boolean;
  wrap?: HeadingWrap;
  asChild?: boolean;
  ref?: Ref<HTMLHeadingElement>;
}

export function Heading({
  level = 2,
  size,
  weight,
  tone,
  align,
  leading,
  tracking,
  truncate = false,
  wrap,
  asChild = false,
  className,
  ref,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const Comp: ElementType = asChild ? Slot : Tag;
  const resolvedSize = size ?? LEVEL_TO_SIZE[level];

  return (
    <Comp
      ref={ref}
      className={cn("vds-heading", className)}
      data-size={resolvedSize}
      data-weight={weight}
      data-tone={tone}
      data-align={align}
      data-leading={leading}
      data-tracking={tracking}
      data-truncate={truncate ? "true" : undefined}
      data-wrap={wrap}
      {...props}
    />
  );
}
