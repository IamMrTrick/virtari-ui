# @virtari-packages/react-toggle API snapshot

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
  "./styles": "./dist/Toggle.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Toggle` (export) from `@virtari-packages/react-toggle`; source: `packages/react-toggle/src/index.ts`.
- `ToggleProps` (type) from `@virtari-packages/react-toggle`; source: `packages/react-toggle/src/index.ts`.
- `ToggleVariant` (type) from `@virtari-packages/react-toggle`; source: `packages/react-toggle/src/index.ts`.
- `ToggleSize` (type) from `@virtari-packages/react-toggle`; source: `packages/react-toggle/src/index.ts`.

## Source type declarations

Source: `packages/react-toggle/src/Toggle.tsx`

```tsx
export type ToggleVariant = "default" | "outline";
```

Source: `packages/react-toggle/src/Toggle.tsx`

```tsx
export type ToggleSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-toggle/src/Toggle.tsx`

```tsx
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: ToggleVariant;
  /** Size preset — shares height ramp with Button, Input, Select */
  size?: ToggleSize;
  ref?: Ref<ComponentRef<typeof TogglePrimitive.Root>>;
}
```

Source: `packages/react-toggle/src/Toggle.tsx`

```tsx
export function Toggle({
  variant = "default",
  size = "md",
  className,
  ref,
  ...props
}: ToggleProps);
```

## Source files

- `packages/react-toggle/src/index.ts`
- `packages/react-toggle/src/Toggle.css`
- `packages/react-toggle/src/Toggle.tsx`
- `packages/react-toggle/package.json`
