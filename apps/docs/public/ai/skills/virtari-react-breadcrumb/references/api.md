# @virtari-packages/react-breadcrumb API snapshot

Version: 1.0.1. Export entry points (exact package.json map):

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
  "./styles": "./dist/Breadcrumb.css",
  "./tokens": "./dist/Breadcrumb.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Breadcrumb` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbList` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbItem` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbLink` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbPage` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbSeparator` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbEllipsis` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbHome` (export) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbListProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbItemProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbLinkProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbPageProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbSeparatorProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbEllipsisProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbHomeProps` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbVariant` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbSize` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbSeparatorPreset` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.
- `BreadcrumbItemData` (type) from `@virtari-packages/react-breadcrumb`; source: `packages/react-breadcrumb/src/index.ts`.

## Source type declarations

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export type BreadcrumbVariant =
  | "default"
  | "underline"
  | "ghost"
  | "soft"
  | "solid";
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export type BreadcrumbSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export type BreadcrumbSeparatorPreset = "chevron" | "slash" | "dot" | "arrow";
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbItemData {
  /** Visible label. Strings are also used by the JSON-LD `name` field. */
  label: ReactNode;
  /** Omit `href` to render the item as the current page (`<span aria-current="page">`). */
  href?: string;
  /** Optional leading icon (Tabler icon component). */
  icon?: TablerIcon;
  /** Optional explicit override for the JSON-LD `name`. Useful when `label` is a non-string node. */
  name?: string;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  /** Default separator preset used by every `<BreadcrumbSeparator>` without explicit children. */
  separator?: BreadcrumbSeparatorPreset;
  /** Convenience array API. When provided, Root renders the list itself; `children` is ignored. */
  items?: BreadcrumbItemData[];
  /** When `items.length > maxItems`, collapse the middle into an ellipsis menu. Disabled when undefined. */
  maxItems?: number;
  /** Items to keep visible at the start before the ellipsis. Default: 1. */
  itemsBeforeCollapse?: number;
  /** Items to keep visible at the end after the ellipsis. Default: 1. */
  itemsAfterCollapse?: number;
  /** Inject a `<script type="application/ld+json">` with schema.org BreadcrumbList. Requires `items`. */
  seo?: boolean;
  /** Base URL used to resolve relative `href`s into absolute URLs in the JSON-LD payload. */
  seoBaseUrl?: string;
  /** Accessible label for the `<nav>` landmark. Default: "Breadcrumb". */
  "aria-label"?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function Breadcrumb({
  variant = "default",
  size = "md",
  separator = "chevron",
  items,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  seo = false,
  seoBaseUrl,
  className,
  children,
  ref,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbListProps
  extends React.OlHTMLAttributes<HTMLOListElement> {
  ref?: Ref<HTMLOListElement>;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbList({
  className,
  ref,
  ...props
}: BreadcrumbListProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: Ref<HTMLLIElement>;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbItem({
  className,
  ref,
  ...props
}: BreadcrumbItemProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbLink({
  asChild = false,
  className,
  ref,
  children,
  ...props
}: BreadcrumbLinkProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbPageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbPage({
  className,
  ref,
  children,
  ...props
}: BreadcrumbPageProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbSeparatorProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Override the preset for this single separator (otherwise inherits from Root). */
  preset?: BreadcrumbSeparatorPreset;
  /** Override the rendered content. When provided, takes precedence over the preset icon. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbSeparator({
  preset,
  className,
  children,
  ref,
  ...props
}: BreadcrumbSeparatorProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbEllipsisProps {
  /** Items to render inside the popover menu. */
  items?: BreadcrumbItemData[];
  /** Accessible label for the trigger button. */
  label?: string;
  className?: string;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbEllipsis({
  items,
  label = "Show hidden navigation",
  className,
}: BreadcrumbEllipsisProps);
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export interface BreadcrumbHomeProps
  extends Omit<BreadcrumbLinkProps, "children"> {
  /** Default: "/". */
  href?: string;
  /** Default: "Home". Used as `aria-label`. */
  label?: string;
  /** Optional visible label rendered next to the icon. */
  children?: ReactNode;
}
```

Source: `packages/react-breadcrumb/src/Breadcrumb.tsx`

```tsx
export function BreadcrumbHome({
  href = "/",
  label = "Home",
  children,
  ...props
}: BreadcrumbHomeProps);
```

## Source files

- `packages/react-breadcrumb/src/Breadcrumb.css`
- `packages/react-breadcrumb/src/Breadcrumb.tokens.css`
- `packages/react-breadcrumb/src/Breadcrumb.tsx`
- `packages/react-breadcrumb/src/index.ts`
- `packages/react-breadcrumb/package.json`
