# @virtari-packages/react-layout API snapshot

Version: 0.3.1. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/index.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Section` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionPadding` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionGutter` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionWidth` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionBackground` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionAlign` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SectionGap` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Main` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `MainProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Row` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `RowProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `RowMode` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `RowCols` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `RowGap` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `RowAlign` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `RowJustify` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Col` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ColProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ColSpan` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ColAlign` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ColJustify` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Container` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ContainerProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ContainerWidth` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ContainerGutter` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Stack` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `StackProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `StackGap` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Cluster` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ClusterProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ClusterGap` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ClusterAlign` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `ClusterJustify` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Grid` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `GridProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `GridGap` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Sidebar` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SidebarProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SidebarSide` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `SidebarGap` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `Center` (export) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `CenterProps` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `CenterMaxWidth` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.
- `CenterGutter` (type) from `@virtari-packages/react-layout`; source: `packages/react-layout/src/index.ts`.

## Source type declarations

Source: `packages/react-layout/src/Center.tsx`

```tsx
export type CenterMaxWidth = "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Center.tsx`

```tsx
export type CenterGutter = "none" | "sm" | "md" | "lg";
```

Source: `packages/react-layout/src/Center.tsx`

```tsx
export interface CenterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  maxWidth?: CenterMaxWidth;
  gutter?: CenterGutter;
  intrinsic?: boolean;
  maxInlineSize?: string;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-layout/src/Center.tsx`

```tsx
export function Center({
  as: Tag = "div",
  maxWidth,
  gutter,
  intrinsic,
  maxInlineSize,
  className,
  style,
  ref,
  ...rest
}: CenterProps);
```

Source: `packages/react-layout/src/Cluster.tsx`

```tsx
export type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Cluster.tsx`

```tsx
export type ClusterAlign = "start" | "center" | "end" | "baseline" | "stretch";
```

Source: `packages/react-layout/src/Cluster.tsx`

```tsx
export type ClusterJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
```

Source: `packages/react-layout/src/Cluster.tsx`

```tsx
export interface ClusterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: ClusterGap;
  align?: ClusterAlign;
  justify?: ClusterJustify;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-layout/src/Cluster.tsx`

```tsx
export function Cluster({
  as: Tag = "div",
  gap,
  align,
  justify,
  className,
  ref,
  ...rest
}: ClusterProps);
```

Source: `packages/react-layout/src/Col.tsx`

```tsx
export type ColSpan = number | "full" | "auto";
```

Source: `packages/react-layout/src/Col.tsx`

```tsx
export type ColAlign = "start" | "center" | "end" | "stretch";
```

Source: `packages/react-layout/src/Col.tsx`

```tsx
export type ColJustify = "start" | "center" | "end" | "stretch";
```

Source: `packages/react-layout/src/Col.tsx`

```tsx
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
```

Source: `packages/react-layout/src/Col.tsx`

```tsx
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
}: ColProps);
```

Source: `packages/react-layout/src/Container.tsx`

```tsx
export type ContainerWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "prose"
  | "full";
```

Source: `packages/react-layout/src/Container.tsx`

```tsx
export type ContainerGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Container.tsx`

```tsx
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
```

Source: `packages/react-layout/src/Container.tsx`

```tsx
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
}: ContainerProps);
```

Source: `packages/react-layout/src/Grid.tsx`

```tsx
export type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Grid.tsx`

```tsx
export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: GridGap;
  minItemWidth?: string;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-layout/src/Grid.tsx`

```tsx
export function Grid({
  as: Tag = "div",
  gap,
  minItemWidth,
  className,
  style,
  ref,
  ...rest
}: GridProps);
```

Source: `packages/react-layout/src/Main.tsx`

```tsx
export interface MainProps extends Omit<SectionProps, "as"> {
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-layout/src/Main.tsx`

```tsx
export function Main({
  id = "main",
  tabIndex = -1,
  padding = "none",
  gutter = "none",
  contained = true,
  className,
  ...rest
}: MainProps);
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
export type RowMode = "grid" | "flex";
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
export type RowCols = 1 | 2 | 3 | 4 | 6 | 8 | 12;
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
export type RowGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
export type RowAlign = "start" | "center" | "end" | "stretch" | "baseline";
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
export type RowJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
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
```

Source: `packages/react-layout/src/Row.tsx`

```tsx
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
}: RowProps);
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
export type SectionPadding =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
export type SectionGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
export type SectionWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "prose"
  | "full";
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
export type SectionBackground = "none" | "subtle" | "muted" | "emphasis";
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
export type SectionAlign = "start" | "center" | "end";
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
export type SectionGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
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
```

Source: `packages/react-layout/src/Section.tsx`

```tsx
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
}: SectionProps);
```

Source: `packages/react-layout/src/Sidebar.tsx`

```tsx
export type SidebarSide = "start" | "end";
```

Source: `packages/react-layout/src/Sidebar.tsx`

```tsx
export type SidebarGap = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Sidebar.tsx`

```tsx
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  side?: SidebarSide;
  sideWidth?: string;
  contentMin?: string;
  gap?: SidebarGap;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-layout/src/Sidebar.tsx`

```tsx
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
}: SidebarProps);
```

Source: `packages/react-layout/src/Stack.tsx`

```tsx
export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-layout/src/Stack.tsx`

```tsx
export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: StackGap;
  recursive?: boolean;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-layout/src/Stack.tsx`

```tsx
export function Stack({
  as: Tag = "div",
  gap,
  recursive,
  className,
  ref,
  ...rest
}: StackProps);
```

## Source files

- `packages/react-layout/src/Center.css`
- `packages/react-layout/src/Center.tokens.css`
- `packages/react-layout/src/Center.tsx`
- `packages/react-layout/src/Cluster.css`
- `packages/react-layout/src/Cluster.tokens.css`
- `packages/react-layout/src/Cluster.tsx`
- `packages/react-layout/src/Col.css`
- `packages/react-layout/src/Col.tokens.css`
- `packages/react-layout/src/Col.tsx`
- `packages/react-layout/src/Container.css`
- `packages/react-layout/src/Container.tokens.css`
- `packages/react-layout/src/Container.tsx`
- `packages/react-layout/src/Grid.css`
- `packages/react-layout/src/Grid.tokens.css`
- `packages/react-layout/src/Grid.tsx`
- `packages/react-layout/src/index.css`
- `packages/react-layout/src/index.ts`
- `packages/react-layout/src/Main.tsx`
- `packages/react-layout/src/Row.css`
- `packages/react-layout/src/Row.tokens.css`
- `packages/react-layout/src/Row.tsx`
- `packages/react-layout/src/Section.css`
- `packages/react-layout/src/Section.tokens.css`
- `packages/react-layout/src/Section.tsx`
- `packages/react-layout/src/Sidebar.css`
- `packages/react-layout/src/Sidebar.tokens.css`
- `packages/react-layout/src/Sidebar.tsx`
- `packages/react-layout/src/Stack.css`
- `packages/react-layout/src/Stack.tokens.css`
- `packages/react-layout/src/Stack.tsx`
- `packages/react-layout/package.json`
