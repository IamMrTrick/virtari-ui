# @virtari-packages/react-separator API snapshot

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
  "./styles": "./dist/Separator.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Separator` (export) from `@virtari-packages/react-separator`; source: `packages/react-separator/src/index.ts`.
- `SeparatorProps` (type) from `@virtari-packages/react-separator`; source: `packages/react-separator/src/index.ts`.

## Source type declarations

Source: `packages/react-separator/src/Separator.tsx`

```tsx
export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: React.ReactNode;
  ref?: Ref<ComponentRef<typeof SeparatorPrimitive.Root>>;
}
```

Source: `packages/react-separator/src/Separator.tsx`

```tsx
export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  label,
  ref,
  ...props
}: SeparatorProps);
```

## Source files

- `packages/react-separator/src/index.ts`
- `packages/react-separator/src/Separator.css`
- `packages/react-separator/src/Separator.tsx`
- `packages/react-separator/package.json`
