# @virtari-packages/react-badge API snapshot

Version: 1.1.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Badge.css",
  "./tokens": "./dist/Badge.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Badge` (export) from `@virtari-packages/react-badge`; source: `packages/react-badge/src/index.ts`.
- `BadgeProps` (type) from `@virtari-packages/react-badge`; source: `packages/react-badge/src/index.ts`.
- `BadgeColor` (type) from `@virtari-packages/react-badge`; source: `packages/react-badge/src/index.ts`.
- `BadgeVariant` (type) from `@virtari-packages/react-badge`; source: `packages/react-badge/src/index.ts`.
- `BadgeSize` (type) from `@virtari-packages/react-badge`; source: `packages/react-badge/src/index.ts`.
- `BadgeShape` (type) from `@virtari-packages/react-badge`; source: `packages/react-badge/src/index.ts`.

## Source type declarations

Source: `packages/react-badge/src/Badge.tsx`

```tsx
export type BadgeColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral";
```

Source: `packages/react-badge/src/Badge.tsx`

```tsx
export type BadgeVariant =
  | "soft"
  | "solid"
  | "outline"
  | "subtle"
  | "soft-outline"
  /** @deprecated Use `color="neutral"` + `variant="soft"`. */
  | "default"
  /** @deprecated Use `color="neutral"` + `variant="soft"`. */
  | "secondary"
  /** @deprecated Use `color="danger"` + `variant="soft"`. */
  | "destructive";
```

Source: `packages/react-badge/src/Badge.tsx`

```tsx
export type BadgeSize = "xs" | "sm" | "md" | "lg";
```

Source: `packages/react-badge/src/Badge.tsx`

```tsx
export type BadgeShape = "pill" | "square";
```

Source: `packages/react-badge/src/Badge.tsx`

```tsx
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Hue/intent. Orthogonal to variant. */
  color?: BadgeColor;
  /** Visual style. */
  variant?: BadgeVariant;
  /** Size preset. */
  size?: BadgeSize;
  /** Corner shape. `pill` uses the badge radius token; `square` uses navigation-item radius. */
  shape?: BadgeShape;
  /** Show a leading colored dot (overrides `leftSection`). */
  dot?: boolean;
  /** Render as the dot alone — no label, no padding. Useful for presence markers. */
  dotOnly?: boolean;
  /** Element placed before children. Ignored if `dot` is true. */
  leftSection?: ReactNode;
  /** Element placed after children. Ignored if `onRemove` is set. */
  rightSection?: ReactNode;
  /** If set, renders a close button and calls this on click / Enter / Space. */
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label for the close button (default "Remove"). */
  removeLabel?: string;
  /** Render as child element (polymorphic via Slot). */
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-badge/src/Badge.tsx`

```tsx
export function Badge({
  color = "primary",
  variant = "soft",
  size = "md",
  shape = "pill",
  dot = false,
  dotOnly = false,
  leftSection,
  rightSection,
  onRemove,
  removeLabel = "Remove",
  asChild = false,
  className,
  children,
  onClick,
  ref,
  ...props
}: BadgeProps);
```

## Source files

- `packages/react-badge/src/Badge.css`
- `packages/react-badge/src/Badge.tokens.css`
- `packages/react-badge/src/Badge.tsx`
- `packages/react-badge/src/index.ts`
- `packages/react-badge/package.json`
