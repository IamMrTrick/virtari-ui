# @virtari-packages/react-label API snapshot

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
  "./styles": "./dist/Label.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Label` (export) from `@virtari-packages/react-label`; source: `packages/react-label/src/index.ts`.
- `LabelProps` (type) from `@virtari-packages/react-label`; source: `packages/react-label/src/index.ts`.

## Source type declarations

Source: `packages/react-label/src/Label.tsx`

```tsx
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof LabelPrimitive.Root>>;
}
```

Source: `packages/react-label/src/Label.tsx`

```tsx
export function Label({ className, ref, ...props }: LabelProps);
```

## Source files

- `packages/react-label/src/index.ts`
- `packages/react-label/src/Label.css`
- `packages/react-label/src/Label.tsx`
- `packages/react-label/package.json`
