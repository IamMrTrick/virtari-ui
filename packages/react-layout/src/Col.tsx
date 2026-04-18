import { cn } from "@virtari/utils";
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
  /** 1-based grid-column-start for manual positioning. */
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

function spanToGridColumn(span: ColSpan | undefined): string | undefined {
  if (span == null) return undefined;
  if (span === "full") return "1 / -1";
  if (span === "auto") return "auto";
  return `span ${span}`;
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

  const base = spanToGridColumn(span);
  const sm = spanToGridColumn(spanSm);
  const md = spanToGridColumn(spanMd);
  const lg = spanToGridColumn(spanLg);
  const xl = spanToGridColumn(spanXl);

  if (base != null) (mergedStyle as Record<string, string>)["--col-span-base"] = base;
  if (sm != null) (mergedStyle as Record<string, string>)["--col-span-sm"] = sm;
  if (md != null) (mergedStyle as Record<string, string>)["--col-span-md"] = md;
  if (lg != null) (mergedStyle as Record<string, string>)["--col-span-lg"] = lg;
  if (xl != null) (mergedStyle as Record<string, string>)["--col-span-xl"] = xl;

  if (start != null) (mergedStyle as Record<string, string>)["--col-start"] = String(start);
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
