# @virtari-packages/react-progress API snapshot

Version: 1.0.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Progress.css",
  "./tokens": "./dist/Progress.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Progress` (export) from `@virtari-packages/react-progress`; source: `packages/react-progress/src/index.ts`.
- `ProgressProps` (type) from `@virtari-packages/react-progress`; source: `packages/react-progress/src/index.ts`.
- `ProgressColor` (type) from `@virtari-packages/react-progress`; source: `packages/react-progress/src/index.ts`.
- `ProgressVariant` (type) from `@virtari-packages/react-progress`; source: `packages/react-progress/src/index.ts`.
- `ProgressSize` (type) from `@virtari-packages/react-progress`; source: `packages/react-progress/src/index.ts`.
- `ProgressAnimation` (type) from `@virtari-packages/react-progress`; source: `packages/react-progress/src/index.ts`.

## Source type declarations

Source: `packages/react-progress/src/Progress.tsx`

```tsx
export type ProgressColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "contrast";
```

Source: `packages/react-progress/src/Progress.tsx`

```tsx
export type ProgressVariant = "solid" | "striped" | "gradient";
```

Source: `packages/react-progress/src/Progress.tsx`

```tsx
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-progress/src/Progress.tsx`

```tsx
export type ProgressAnimation = "pulse" | "glow";
```

Source: `packages/react-progress/src/Progress.tsx`

```tsx
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ProgressPrimitive.Root>>;
  color?: ProgressColor | (string & {});
  variant?: ProgressVariant;
  size?: ProgressSize;
  animated?: boolean | ProgressAnimation;
  showLabel?: boolean;
}
```

Source: `packages/react-progress/src/Progress.tsx`

```tsx
export function Progress({
  className,
  value,
  color = "primary",
  variant,
  size = "md",
  animated,
  showLabel,
  style,
  ref,
  ...props
}: ProgressProps);
```

## Source files

- `packages/react-progress/src/index.ts`
- `packages/react-progress/src/Progress.css`
- `packages/react-progress/src/Progress.tokens.css`
- `packages/react-progress/src/Progress.tsx`
- `packages/react-progress/package.json`
