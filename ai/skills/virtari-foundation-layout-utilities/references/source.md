## packages/react-layout/src/index.ts

```tsx
/* ── Semantic page primitives ── */
export { Section } from "./Section";
export type {
  SectionProps,
  SectionPadding,
  SectionGutter,
  SectionWidth,
  SectionBackground,
  SectionAlign,
  SectionGap,
} from "./Section";

export { Main } from "./Main";
export type { MainProps } from "./Main";

export { Row } from "./Row";
export type {
  RowProps,
  RowMode,
  RowCols,
  RowGap,
  RowAlign,
  RowJustify,
} from "./Row";

export { Col } from "./Col";
export type { ColProps, ColSpan, ColAlign, ColJustify } from "./Col";

export { Container } from "./Container";
export type { ContainerProps, ContainerWidth, ContainerGutter } from "./Container";

/* ── Utility primitives ── */
export { Stack } from "./Stack";
export type { StackProps, StackGap } from "./Stack";

export { Cluster } from "./Cluster";
export type {
  ClusterProps,
  ClusterGap,
  ClusterAlign,
  ClusterJustify,
} from "./Cluster";

export { Grid } from "./Grid";
export type { GridProps, GridGap } from "./Grid";

export { Sidebar } from "./Sidebar";
export type { SidebarProps, SidebarSide, SidebarGap } from "./Sidebar";

export { Center } from "./Center";
export type { CenterProps, CenterMaxWidth, CenterGutter } from "./Center";

```

## packages/react-layout/src/Main.tsx

```tsx
import { cn } from "@virtari-packages/utils";
import type { Ref } from "react";
import { Section, type SectionProps } from "./Section";

/**
 * Semantic `<main>` landmark — the dominant content of the page. Render
 * **exactly one** `<Main>` per document (HTML spec: any further `<main>`
 * elements must be hidden with `hidden`).
 *
 * Structurally identical to `<Section>` (outer band + inner container, same
 * `padding` / `gutter` / `width` / `contained` / `background` / `align` /
 * `gap` / `fullHeight` props) with Main-specific defaults:
 *
 *   - `as="main"` — locked to the landmark tag
 *   - `id="main"` — so `<a href="#main">Skip to content</a>` anchors land here
 *   - `tabIndex={-1}` — lets JS / skip-links focus the region programmatically
 *     without adding it to the tab order
 *   - `padding="none"` — `<main>` usually contains child `<Section>`s that own
 *     their own vertical rhythm; override when you want block padding
 *   - `gutter="none"` — same reasoning for inline padding
 *
 * All overrides are possible via props — the defaults above just encode the
 * common case where `<Main>` is a thin landmark wrapping self-padded
 * `<Section>`s.
 */
export interface MainProps extends Omit<SectionProps, "as"> {
  ref?: Ref<HTMLElement>;
}

export function Main({
  id = "main",
  tabIndex = -1,
  padding = "none",
  gutter = "none",
  contained = true,
  className,
  ...rest
}: MainProps) {
  return (
    <Section
      as="main"
      id={id}
      tabIndex={tabIndex}
      padding={padding}
      gutter={gutter}
      contained={contained}
      className={cn("vds-main", className)}
      {...rest}
    />
  );
}

```

## packages/react-layout/src/Section.tsx

```tsx
import { cn } from "@virtari-packages/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

/* ── Types ── */

export type SectionPadding =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
export type SectionGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type SectionWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "prose"
  | "full";
export type SectionBackground = "none" | "subtle" | "muted" | "emphasis";
export type SectionAlign = "start" | "center" | "end";
export type SectionGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Block padding (vertical rhythm of the band). */
  padding?: SectionPadding;
  /** Inline padding (horizontal padding of the inner container). */
  gutter?: SectionGutter;
  /** Max content width when `contained` is true. */
  width?: SectionWidth;
  /** Override the container width with an arbitrary CSS size (e.g. "72ch", "900px"). */
  maxInlineSize?: string;
  /** Wrap content in a centered container (default). Set to false for edge-to-edge content. */
  contained?: boolean;
  /** Surface background of the outer band. */
  background?: SectionBackground;
  /** Horizontal alignment of the inner container inside the outer band. */
  align?: SectionAlign;
  /** Gap between direct children of the inner container (rows, headings, etc.). */
  gap?: SectionGap;
  /** Fill the viewport vertically (`min-block-size: 100svh`). */
  fullHeight?: boolean;
  /** Override the default root tag. `"section"` by default; pass `"article"`, `"main"`, `"aside"` or similar as needed. */
  ref?: Ref<HTMLElement>;
}

export function Section({
  as: Tag = "section",
  padding,
  gutter,
  width,
  maxInlineSize,
  contained = true,
  background = "none",
  align,
  gap,
  fullHeight,
  className,
  style,
  children,
  ref,
  ...rest
}: SectionProps) {
  const mergedStyle: CSSProperties | undefined = maxInlineSize
    ? { ...style, ["--section-container-width" as string]: maxInlineSize }
    : style;

  return (
    <Tag
      ref={ref}
      className={cn("vds-section", className)}
      data-padding={padding}
      data-gutter={gutter}
      data-width={width}
      data-contained={contained ? undefined : "false"}
      data-background={background === "none" ? undefined : background}
      data-align={align}
      data-gap={gap}
      data-full-height={fullHeight ? "true" : undefined}
      style={mergedStyle}
      {...rest}
    >
      <div className="vds-section__inner">{children}</div>
    </Tag>
  );
}

```

## packages/react-layout/src/Container.tsx

```tsx
import { cn } from "@virtari-packages/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

/* ── Types ── */

export type ContainerWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "prose"
  | "full";
export type ContainerGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Max inline size preset. */
  width?: ContainerWidth;
  /** Arbitrary max inline size (wins over `width` preset). */
  maxInlineSize?: string;
  /** Horizontal padding preset. */
  gutter?: ContainerGutter;
  /** Whether to center within parent (default `true`). */
  center?: boolean;
  ref?: Ref<HTMLElement>;
}

export function Container({
  as: Tag = "div",
  width,
  maxInlineSize,
  gutter,
  center = true,
  className,
  style,
  ref,
  ...rest
}: ContainerProps) {
  const mergedStyle: CSSProperties | undefined = maxInlineSize
    ? { ...style, ["--container-width" as string]: maxInlineSize }
    : style;

  return (
    <Tag
      ref={ref}
      className={cn("vds-container", className)}
      data-width={width}
      data-gutter={gutter}
      data-center={center ? undefined : "false"}
      style={mergedStyle}
      {...rest}
    />
  );
}

```

## packages/react-layout/src/Row.tsx

```tsx
import { cn } from "@virtari-packages/utils";
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

```

## packages/react-layout/src/Col.tsx

```tsx
import { cn } from "@virtari-packages/utils";
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

```

## packages/react-layout/src/Grid.tsx

```tsx
import { cn } from "@virtari-packages/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

export type GridGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: GridGap;
  minItemWidth?: string;
  ref?: Ref<HTMLElement>;
}

export function Grid({
  as: Tag = "div",
  gap,
  minItemWidth,
  className,
  style,
  ref,
  ...rest
}: GridProps) {
  const mergedStyle: CSSProperties | undefined = minItemWidth
    ? { ...style, ["--grid-min-item-width" as string]: minItemWidth }
    : style;
  return (
    <Tag
      ref={ref}
      className={cn("vds-grid", className)}
      data-gap={gap}
      style={mergedStyle}
      {...rest}
    />
  );
}

```

## packages/react-layout/src/Stack.tsx

```tsx
import { cn } from "@virtari-packages/utils";
import type { ElementType, HTMLAttributes, Ref } from "react";

export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: StackGap;
  recursive?: boolean;
  ref?: Ref<HTMLElement>;
}

export function Stack({
  as: Tag = "div",
  gap,
  recursive,
  className,
  ref,
  ...rest
}: StackProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-stack", className)}
      data-gap={gap}
      data-recursive={recursive || undefined}
      {...rest}
    />
  );
}

```

## packages/react-layout/src/Sidebar.tsx

```tsx
import { cn } from "@virtari-packages/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

export type SidebarSide = "start" | "end";
export type SidebarGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  side?: SidebarSide;
  sideWidth?: string;
  contentMin?: string;
  gap?: SidebarGap;
  ref?: Ref<HTMLElement>;
}

export function Sidebar({
  as: Tag = "div",
  side,
  sideWidth,
  contentMin,
  gap,
  className,
  style,
  ref,
  ...rest
}: SidebarProps) {
  const mergedStyle: CSSProperties = { ...style };
  if (sideWidth) {
    (mergedStyle as Record<string, string>)["--split-side-width"] = sideWidth;
  }
  if (contentMin) {
    (mergedStyle as Record<string, string>)["--split-content-min"] = contentMin;
  }

  return (
    <Tag
      ref={ref}
      // The CSS class is `vds-split`, not `vds-sidebar` — see Sidebar.css.
      // The component export name stays `Sidebar` for API compatibility.
      className={cn("vds-split", className)}
      data-side={side}
      data-gap={gap}
      style={mergedStyle}
      {...rest}
    />
  );
}

```

## packages/tokens/src/layout/semantic.css

```css
@layer tokens {
  :root {
    /*
     * ── Semantic Layout Tokens ──
     * Purpose-named aliases that map onto primitives.
     * Components consume these (or the per-component tokens
     * in components.css). Override at :root or a scoped
     * wrapper to reshape a whole surface at once.
     */

    /* Container */
    --vds-container-width:  var(--vds-container-width-xl);
    --vds-container-gutter: var(--vds-section-gutter-md);

    /* Section vertical + horizontal rhythm */
    --vds-section-padding-block:  var(--vds-section-padding-lg);
    --vds-section-padding-inline: var(--vds-section-gutter-md);
    --vds-section-gap:            var(--vds-space-8);

    /* Row */
    --vds-row-gap:      var(--vds-row-gap-md);
    --vds-row-col-gap:  var(--vds-row-gap-md);
    --vds-row-row-gap:  var(--vds-row-gap-md);
    --vds-row-cols:     var(--vds-row-cols-12);
    --vds-row-min-col:  16rem;

    /* Sidebar */
    --vds-sidebar-width: var(--vds-sidebar-width-md);
    --vds-sidebar-rail:  var(--vds-sidebar-rail-width);
    --vds-sidebar-gap:   var(--vds-space-1);

    /*
     * App chrome row — shared height between a page's Header row and the
     * Sidebar's header / footer. When both consume this token they stay
     * visually aligned (sidebar brand sits level with the header bar).
     * Override on a chrome-scoped wrapper (e.g. `.docs-app`) to coordinate.
     */
    --vds-app-chrome-row: var(--vds-size-lg);
  }
}

```