import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ElementType, Ref } from 'react';

type SectionPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type SectionGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type SectionWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "prose" | "full";
type SectionBackground = "none" | "subtle" | "muted" | "emphasis";
type SectionAlign = "start" | "center" | "end";
type SectionGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface SectionProps extends HTMLAttributes<HTMLElement> {
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
declare function Section({ as: Tag, padding, gutter, width, maxInlineSize, contained, background, align, gap, fullHeight, className, style, children, ref, ...rest }: SectionProps): react_jsx_runtime.JSX.Element;

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
interface MainProps extends Omit<SectionProps, "as"> {
    ref?: Ref<HTMLElement>;
}
declare function Main({ id, tabIndex, padding, gutter, contained, className, ...rest }: MainProps): react_jsx_runtime.JSX.Element;

type RowMode = "grid" | "flex";
type RowCols = 1 | 2 | 3 | 4 | 6 | 8 | 12;
type RowGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type RowAlign = "start" | "center" | "end" | "stretch" | "baseline";
type RowJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
interface RowProps extends HTMLAttributes<HTMLElement> {
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
declare function Row({ as: Tag, mode, cols, gap, colGap, rowGap, align, justify, wrap, reverse, autoFit, minColWidth, className, style, ref, ...rest }: RowProps): react_jsx_runtime.JSX.Element;

type ColSpan = number | "full" | "auto";
type ColAlign = "start" | "center" | "end" | "stretch";
type ColJustify = "start" | "center" | "end" | "stretch";
interface ColProps extends HTMLAttributes<HTMLElement> {
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
declare function Col({ as: Tag, span, spanSm, spanMd, spanLg, spanXl, start, order, align, justify, grow, shrink, basis, className, style, ref, ...rest }: ColProps): react_jsx_runtime.JSX.Element;

type ContainerWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "prose" | "full";
type ContainerGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
interface ContainerProps extends HTMLAttributes<HTMLElement> {
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
declare function Container({ as: Tag, width, maxInlineSize, gutter, center, className, style, ref, ...rest }: ContainerProps): react_jsx_runtime.JSX.Element;

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
interface StackProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    gap?: StackGap;
    recursive?: boolean;
    ref?: Ref<HTMLElement>;
}
declare function Stack({ as: Tag, gap, recursive, className, ref, ...rest }: StackProps): react_jsx_runtime.JSX.Element;

type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
type ClusterAlign = "start" | "center" | "end" | "baseline" | "stretch";
type ClusterJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
interface ClusterProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    gap?: ClusterGap;
    align?: ClusterAlign;
    justify?: ClusterJustify;
    ref?: Ref<HTMLElement>;
}
declare function Cluster({ as: Tag, gap, align, justify, className, ref, ...rest }: ClusterProps): react_jsx_runtime.JSX.Element;

type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
interface GridProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    gap?: GridGap;
    minItemWidth?: string;
    ref?: Ref<HTMLElement>;
}
declare function Grid({ as: Tag, gap, minItemWidth, className, style, ref, ...rest }: GridProps): react_jsx_runtime.JSX.Element;

type SidebarSide = "start" | "end";
type SidebarGap = "xs" | "sm" | "md" | "lg" | "xl";
interface SidebarProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    side?: SidebarSide;
    sideWidth?: string;
    contentMin?: string;
    gap?: SidebarGap;
    ref?: Ref<HTMLElement>;
}
declare function Sidebar({ as: Tag, side, sideWidth, contentMin, gap, className, style, ref, ...rest }: SidebarProps): react_jsx_runtime.JSX.Element;

type CenterMaxWidth = "sm" | "md" | "lg" | "xl";
type CenterGutter = "none" | "sm" | "md" | "lg";
interface CenterProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    maxWidth?: CenterMaxWidth;
    gutter?: CenterGutter;
    intrinsic?: boolean;
    maxInlineSize?: string;
    ref?: Ref<HTMLElement>;
}
declare function Center({ as: Tag, maxWidth, gutter, intrinsic, maxInlineSize, className, style, ref, ...rest }: CenterProps): react_jsx_runtime.JSX.Element;

export { Center, type CenterGutter, type CenterMaxWidth, type CenterProps, Cluster, type ClusterAlign, type ClusterGap, type ClusterJustify, type ClusterProps, Col, type ColAlign, type ColJustify, type ColProps, type ColSpan, Container, type ContainerGutter, type ContainerProps, type ContainerWidth, Grid, type GridGap, type GridProps, Main, type MainProps, Row, type RowAlign, type RowCols, type RowGap, type RowJustify, type RowMode, type RowProps, Section, type SectionAlign, type SectionBackground, type SectionGap, type SectionGutter, type SectionPadding, type SectionProps, type SectionWidth, Sidebar, type SidebarGap, type SidebarProps, type SidebarSide, Stack, type StackGap, type StackProps };
