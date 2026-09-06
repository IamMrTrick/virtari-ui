import { cn } from "../../lib/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

/* ── Types ── */

export type RowMode = "grid" | "flex";
export type RowCols = 1 | 2 | 3 | 4 | 6 | 8 | 12;
export type RowGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type RowAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type RowJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export interface RowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Layout mode. `"grid"` (default) lays out fixed-fraction columns; `"flex"` flows items inline. */
  mode?: RowMode;
  /** Number of grid columns in grid mode. Ignored in flex mode. Default `12`. */
  cols?: RowCols;
  /** Gap on both axes. Individual axes can be overridden with `colGap` / `rowGap`. */
  gap?: RowGap;
  /** Column-axis gap override. */
  colGap?: RowGap;
  /** Row-axis (wrap) gap override. */
  rowGap?: RowGap;
  /** Vertical alignment of items within the row. */
  align?: RowAlign;
  /** Horizontal distribution of items / track box. */
  justify?: RowJustify;
  /** Allow wrapping in flex mode. Ignored in grid mode. */
  wrap?: boolean;
  /** Reverse source order in flex mode. */
  reverse?: boolean;
  /** Switch grid to `repeat(auto-fit, minmax(minColWidth, 1fr))` — turns the row into a responsive card gallery. */
  autoFit?: boolean;
  /** Minimum column width used by `autoFit`. Accepts any CSS size (e.g. `"14rem"`, `"240px"`). */
  minColWidth?: string;
  ref?: Ref<HTMLElement>;
}

export function Row({
  as: Tag = "div",
  mode = "grid",
  cols,
  gap,
  colGap,
  rowGap,
  align,
  justify,
  wrap,
  reverse,
  autoFit,
  minColWidth,
  className,
  style,
  ref,
  ...rest
}: RowProps) {
  const mergedStyle: CSSProperties | undefined = minColWidth
    ? { ...style, ["--row-min-col" as string]: minColWidth }
    : style;

  return (
    <Tag
      ref={ref}
      className={cn("vds-row", className)}
      data-mode={mode === "grid" ? undefined : mode}
      data-cols={mode === "grid" && !autoFit ? cols : undefined}
      data-gap={gap}
      data-col-gap={colGap}
      data-row-gap={rowGap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap ? "true" : undefined}
      data-reverse={reverse ? "true" : undefined}
      data-auto-fit={autoFit ? "true" : undefined}
      style={mergedStyle}
      {...rest}
    />
  );
}
