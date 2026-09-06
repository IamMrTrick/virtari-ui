# @virtari-packages/react-collapsible API snapshot

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
  "./styles": "./dist/Collapsible.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Collapsible` (export) from `@virtari-packages/react-collapsible`; source: `packages/react-collapsible/src/index.ts`.
- `CollapsibleTrigger` (export) from `@virtari-packages/react-collapsible`; source: `packages/react-collapsible/src/index.ts`.
- `CollapsibleContent` (export) from `@virtari-packages/react-collapsible`; source: `packages/react-collapsible/src/index.ts`.
- `CollapsibleContentProps` (type) from `@virtari-packages/react-collapsible`; source: `packages/react-collapsible/src/index.ts`.

## Source type declarations

Source: `packages/react-collapsible/src/Collapsible.tsx`

```tsx
export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  ref?: Ref<ComponentRef<typeof CollapsiblePrimitive.Content>>;
}
```

Source: `packages/react-collapsible/src/Collapsible.tsx`

```tsx
export function CollapsibleContent({ className, ref, ...props }: CollapsibleContentProps);
```

## Source files

- `packages/react-collapsible/src/Collapsible.css`
- `packages/react-collapsible/src/Collapsible.tsx`
- `packages/react-collapsible/src/index.ts`
- `packages/react-collapsible/package.json`
