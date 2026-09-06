import { cn } from "../../lib/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

/* ── Types ── */

export type ColSpan = number | "full" | "auto";
export type ColAlign = "start" | "center" | "end" | "stretch";
export type ColJustify = "start" | "center" | "end" | "stretch";

export interface ColProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Base span. Number = column-span, `"full"` = whole row (`1 / -1`), `"auto"` = content-sized. */
  span?: ColSpan;
  /** Span at ≥640px. */
  spanSm?: ColSpan;
  /** Span at ≥768px. */
  spanMd?: ColSpan;
  /** Span at ≥1024px. */
  spanLg?: ColSpan;
  /** Span at ≥1280px. */
  spanXl?: ColSpan;
  /** 1-based grid-column-start for manual positioning. Applies at every
   *  breakpoint and combines with the span props (`start={3} span={6}` →
   *  `grid-column: 3 / span 6`). */
  start?: number;
  /** CSS `order` value. */
  order?: number;
  /** `align-self` — cross-axis alignment inside the row. */
  align?: ColAlign;
  /** `justify-self` — main-axis alignment inside the row's grid cell. */
  justify?: ColJustify;
  /** flex-grow (flex-mode rows only). */
  grow?: number;
  /** flex-shrink (flex-mode rows only). */
  shrink?: number;
  /** flex-basis (flex-mode rows only). Any CSS size. */
  basis?: string;
  ref?: Ref<HTMLElement>;
}

/* `start` is composed into each emitted grid-column value instead of being
   declared as a separate `grid-column-start` longhand in Col.css: the span
   lives in the shorthand's start component, so a later longhand would wipe
   it — and when `--col-start` was unset the var() was invalid at
   computed-value time, collapsing every Col to a single track. */
function spanToGridColumn(
  span: ColSpan | undefined,
  start: number | undefined,
): string | undefined {
  if (span == null) return undefined;
  if (span === "full") return start != null ? `${start} / -1` : "1 / -1";
  if (span === "auto") return start != null ? `${start}` : "auto";
  return start != null ? `${start} / span ${span}` : `span ${span}`;
}

export function Col({
  as: Tag = "div",
  span,
  spanSm,
  spanMd,
  spanLg,
  spanXl,
  start,
  order,
  align,
  justify,
  grow,
  shrink,
  basis,
  className,
  style,
  ref,
  ...rest
}: ColProps) {
  const usesFlexProps = grow != null || shrink != null || basis != null;

  const mergedStyle: CSSProperties = { ...style };

  /* With `start` but no base span, still emit a base value (`--col-span-base:
     3`) so the position applies below the first breakpoint a span is set for. */
  const base = spanToGridColumn(span ?? (start != null ? "auto" : undefined), start);
  const sm = spanToGridColumn(spanSm, start);
  const md = spanToGridColumn(spanMd, start);
  const lg = spanToGridColumn(spanLg, start);
  const xl = spanToGridColumn(spanXl, start);

  if (base != null) (mergedStyle as Record<string, string>)["--col-span-base"] = base;
  if (sm != null) (mergedStyle as Record<string, string>)["--col-span-sm"] = sm;
  if (md != null) (mergedStyle as Record<string, string>)["--col-span-md"] = md;
  if (lg != null) (mergedStyle as Record<string, string>)["--col-span-lg"] = lg;
  if (xl != null) (mergedStyle as Record<string, string>)["--col-span-xl"] = xl;

  if (order != null) (mergedStyle as Record<string, string>)["--col-order"] = String(order);

  if (grow != null) (mergedStyle as Record<string, string>)["--col-grow"] = String(grow);
  if (shrink != null) (mergedStyle as Record<string, string>)["--col-shrink"] = String(shrink);
  if (basis != null) (mergedStyle as Record<string, string>)["--col-basis"] = basis;

  return (
    <Tag
      ref={ref}
      className={cn("vds-col", className)}
      data-align={align}
      data-justify={justify}
      data-flex={usesFlexProps ? "true" : undefined}
      style={mergedStyle}
      {...rest}
    />
  );
}
