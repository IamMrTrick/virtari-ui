# @virtari-packages/react-chip API snapshot

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
  "./styles": "./dist/Chip.css",
  "./tokens": "./dist/Chip.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Chip` (export) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipIcon` (export) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipLabel` (export) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipRemove` (export) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipProps` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipIconProps` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipLabelProps` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipRemoveProps` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipVariant` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipSize` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.
- `ChipAppearance` (type) from `@virtari-packages/react-chip`; source: `packages/react-chip/src/index.ts`.

## Source type declarations

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export type ChipSize = "sm" | "md" | "lg";
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export type ChipAppearance = "soft" | "solid" | "outline";
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  appearance?: ChipAppearance;
  interactive?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export function Chip({
  variant = "default",
  size = "md",
  appearance = "soft",
  interactive = false,
  disabled = false,
  asChild = false,
  className,
  ref,
  children,
  ...props
}: ChipProps);
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export interface ChipIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export function ChipIcon({
  asChild = false,
  className,
  ref,
  ...props
}: ChipIconProps);
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export interface ChipLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export function ChipLabel({ className, ref, children, ...props }: ChipLabelProps);
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export interface ChipRemoveProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}
```

Source: `packages/react-chip/src/Chip.tsx`

```tsx
export function ChipRemove({
  asChild = false,
  className,
  type,
  "aria-label": ariaLabel,
  children,
  ref,
  ...props
}: ChipRemoveProps);
```

## Source files

- `packages/react-chip/src/Chip.css`
- `packages/react-chip/src/Chip.tokens.css`
- `packages/react-chip/src/Chip.tsx`
- `packages/react-chip/src/index.ts`
- `packages/react-chip/package.json`
