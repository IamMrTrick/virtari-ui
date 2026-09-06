# @virtari-packages/react-pagination API snapshot

Version: 0.3.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Pagination.css",
  "./tokens": "./dist/Pagination.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `PaginationDefault` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationInfo` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationNext` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationPageSize` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationPages` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationPrev` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationRoot` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationButtonProps` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationDefaultProps` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationInfoProps` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationPageSizeProps` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationPagesProps` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationRootProps` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `computePageRange` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PageRangeItem` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationContext` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `usePaginationContext` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationContextValue` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `PaginationSize` (type) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.
- `Pagination` (export) from `@virtari-packages/react-pagination`; source: `packages/react-pagination/src/index.ts`.

## Source type declarations

Source: `packages/react-pagination/src/context.ts`

```tsx
export type PaginationSize = "sm" | "md" | "lg";
```

Source: `packages/react-pagination/src/context.ts`

```tsx
export interface PaginationContextValue {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  pageSizeOptions: number[];
  siblingCount: number;
  size: PaginationSize;
  canPrev: boolean;
  canNext: boolean;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}
```

Source: `packages/react-pagination/src/context.ts`

```tsx
export function usePaginationContext(): PaginationContextValue;
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export interface PaginationRootProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  siblingCount?: number;
  size?: PaginationSize;
}
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export interface PaginationInfoProps extends HTMLAttributes<HTMLDivElement> {
  renderLabel?: (range: {
    start: number;
    end: number;
    total: number;
  }) => ReactNode;
}
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export interface PaginationPageSizeProps {
  options?: number[];
  className?: string;
  label?: ReactNode;
  size?: SelectSize;
}
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export function PaginationPageSize({
  options,
  className,
  label = "Rows per page",
  size,
}: PaginationPageSizeProps);
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export interface PaginationPagesProps {
  className?: string;
  siblingCount?: number;
}
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export function PaginationPages({
  className,
  siblingCount,
}: PaginationPagesProps);
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export interface PaginationDefaultProps extends PaginationRootProps {
  hidePageSize?: boolean;
  hidePageNumbers?: boolean;
  hideInfo?: boolean;
}
```

Source: `packages/react-pagination/src/Pagination.tsx`

```tsx
export function PaginationDefault({
  hidePageSize = false,
  hidePageNumbers = false,
  hideInfo = false,
  children,
  ...rootProps
}: PaginationDefaultProps);
```

Source: `packages/react-pagination/src/use-pagination.ts`

```tsx
export type PageRangeItem = number | "ellipsis-l" | "ellipsis-r";
```

Source: `packages/react-pagination/src/use-pagination.ts`

```tsx
export function computePageRange(
  current: number,
  total: number,
  siblingCount: number,
): PageRangeItem[];
```

## Source files

- `packages/react-pagination/src/context.ts`
- `packages/react-pagination/src/index.ts`
- `packages/react-pagination/src/Pagination.css`
- `packages/react-pagination/src/Pagination.tokens.css`
- `packages/react-pagination/src/Pagination.tsx`
- `packages/react-pagination/src/use-pagination.ts`
- `packages/react-pagination/package.json`
