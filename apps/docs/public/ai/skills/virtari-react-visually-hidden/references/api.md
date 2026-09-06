# @virtari-packages/react-visually-hidden API snapshot

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
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `VisuallyHidden` (export) from `@virtari-packages/react-visually-hidden`; source: `packages/react-visually-hidden/src/index.ts`.
- `VisuallyHiddenProps` (type) from `@virtari-packages/react-visually-hidden`; source: `packages/react-visually-hidden/src/index.ts`.

## Source type declarations

Source: `packages/react-visually-hidden/src/VisuallyHidden.tsx`

```tsx
export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-visually-hidden/src/VisuallyHidden.tsx`

```tsx
export function VisuallyHidden({
  asChild = false,
  className,
  ref,
  ...props
}: VisuallyHiddenProps);
```

## Source files

- `packages/react-visually-hidden/src/index.ts`
- `packages/react-visually-hidden/src/VisuallyHidden.tsx`
- `packages/react-visually-hidden/package.json`
