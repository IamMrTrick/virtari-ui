# @virtari-packages/react-popover API snapshot

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
  "./styles": "./dist/Popover.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Popover` (export) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverTrigger` (export) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverContent` (export) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverClose` (export) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverAnchor` (export) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverContentProps` (type) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverProps` (type) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.
- `PopoverSize` (type) from `@virtari-packages/react-popover`; source: `packages/react-popover/src/index.ts`.

## Source type declarations

Source: `packages/react-popover/src/Popover.tsx`

```tsx
export interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}
```

Source: `packages/react-popover/src/Popover.tsx`

```tsx
export function Popover({ dir, ...props }: PopoverProps);
```

Source: `packages/react-popover/src/Popover.tsx`

```tsx
export type PopoverSize = "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-popover/src/Popover.tsx`

```tsx
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Max-width preset. Defaults to `"md"`. */
  size?: PopoverSize;
  ref?: Ref<ComponentRef<typeof PopoverPrimitive.Content>>;
}
```

Source: `packages/react-popover/src/Popover.tsx`

```tsx
export function PopoverContent({
  className,
  size = "md",
  sideOffset = 4,
  align = "center",
  ref,
  ...props
}: PopoverContentProps);
```

## Source files

- `packages/react-popover/src/index.ts`
- `packages/react-popover/src/Popover.css`
- `packages/react-popover/src/Popover.tokens.css`
- `packages/react-popover/src/Popover.tsx`
- `packages/react-popover/package.json`
