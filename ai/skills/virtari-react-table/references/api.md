# @virtari-packages/react-table API snapshot

Version: 2.0.0. Export entry points (exact package.json map):

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
  "./styles": {
    "style": "./dist/Table.css",
    "default": "./dist/Table.css"
  },
  "./tokens": {
    "style": "./dist/Table.tokens.css",
    "default": "./dist/Table.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Table` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableHeader` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableBody` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableFooter` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableRow` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableHead` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableCell` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableCaption` (export) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableHeaderProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableBodyProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableFooterProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableRowProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableHeadProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableCellProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableCaptionProps` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableVariant` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableRowStyle` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableSize` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableDensity` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableColor` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableLayout` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableHeaderCase` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableAlign` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableSticky` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.
- `TableSortDirection` (type) from `@virtari-packages/react-table`; source: `packages/react-table/src/index.ts`.

## Source type declarations

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableVariant = "surface" | "plain" | "bordered" | "ghost";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableRowStyle = "divided" | "striped" | "none";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableSize = "sm" | "md" | "lg";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableDensity = "compact" | "normal" | "comfortable";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableColor =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableLayout = "auto" | "fixed";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableHeaderCase = "uppercase" | "sentence";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableAlign = "start" | "center" | "end";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableSticky = "start" | "end";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export type TableSortDirection = "ascending" | "descending" | "none";
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Frame strategy. Default: `surface`. */
  variant?: TableVariant;
  /** Body row chrome. Default: `divided`. */
  rows?: TableRowStyle;
  /** Size preset. Default: `md`. */
  size?: TableSize;
  /** Padding density. Default: `normal`. */
  density?: TableDensity;
  /** Accent color for selection + sort indicator. Default: `primary`. */
  color?: TableColor;
  /** Layout algorithm for the inner <table>. Default: `auto`. */
  layout?: TableLayout;
  /** Header casing. Default: `uppercase`. */
  headerCase?: TableHeaderCase;
  /** Keep the thead pinned to the scroll container's top. Default: `false`. */
  stickyHeader?: boolean;
  /** Tint tbody rows on hover. Default: `false`. */
  hoverable?: boolean;
  /** Dim the tbody while data is loading. Default: `false`. */
  loading?: boolean;
  /** Forward props onto the inner <table> (e.g., `id`, `aria-label`). */
  tableProps?: React.TableHTMLAttributes<HTMLTableElement>;
  /** Ref onto the inner <table>. */
  tableRef?: Ref<HTMLTableElement>;
  /** Ref onto the scroll container (root div). */
  ref?: Ref<HTMLDivElement>;
  /** <thead>, <tbody>, <tfoot>, optional <caption>. */
  children?: ReactNode;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function Table({
  variant = "surface",
  rows = "divided",
  size = "md",
  density = "normal",
  color = "primary",
  layout = "auto",
  headerCase = "uppercase",
  stickyHeader = false,
  hoverable = false,
  loading = false,
  tableProps,
  tableRef,
  ref,
  className,
  children,
  ...props
}: TableProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableHeader({ className, ref, ...props }: TableHeaderProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableBody({ className, ref, ...props }: TableBodyProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableFooter({ className, ref, ...props }: TableFooterProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Mark the row as selected (paints accent stripe + tint). */
  selected?: boolean;
  ref?: Ref<HTMLTableRowElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableRow({
  className,
  selected,
  ref,
  ...props
}: TableRowProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** Logical text alignment. RTL-safe. */
  align?: TableAlign;
  /** Tabular numerals + end alignment. */
  numeric?: boolean;
  /** Allow wrapping instead of the default nowrap. */
  wrap?: boolean;
  /** Pin the column to the scroll container's start or end edge. */
  sticky?: TableSticky;
  /** Render as a sortable column (cursor, hover affordance, focusability). */
  sortable?: boolean;
  /** Sort direction — sets `aria-sort`. */
  sortDirection?: TableSortDirection;
  /** Custom sort indicator node (e.g. an icon). Defaults to a chevron. */
  sortIndicator?: ReactNode;
  ref?: Ref<HTMLTableCellElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableHead({
  className,
  align,
  numeric,
  wrap,
  sticky,
  sortable,
  sortDirection,
  sortIndicator,
  children,
  ref,
  onKeyDown,
  ...props
}: TableHeadProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** Logical text alignment. RTL-safe. */
  align?: TableAlign;
  /** Tabular numerals + end alignment. */
  numeric?: boolean;
  /** Allow wrapping instead of the default nowrap. */
  wrap?: boolean;
  /** Pin the column to the scroll container's start or end edge. */
  sticky?: TableSticky;
  ref?: Ref<HTMLTableCellElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableCell({
  className,
  align,
  numeric,
  wrap,
  sticky,
  ref,
  ...props
}: TableCellProps);
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  ref?: Ref<HTMLTableCaptionElement>;
}
```

Source: `packages/react-table/src/Table.tsx`

```tsx
export function TableCaption({ className, ref, ...props }: TableCaptionProps);
```

## Source files

- `packages/react-table/src/index.ts`
- `packages/react-table/src/Table.css`
- `packages/react-table/src/Table.tokens.css`
- `packages/react-table/src/Table.tsx`
- `packages/react-table/package.json`
