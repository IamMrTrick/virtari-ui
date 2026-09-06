# @virtari-packages/react-segmented-control API snapshot

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
  "./styles": "./dist/SegmentedControl.css",
  "./tokens": "./dist/SegmentedControl.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `SegmentedControl` (export) from `@virtari-packages/react-segmented-control`; source: `packages/react-segmented-control/src/index.ts`.
- `SegmentedControlItem` (export) from `@virtari-packages/react-segmented-control`; source: `packages/react-segmented-control/src/index.ts`.
- `SegmentedControlProps` (type) from `@virtari-packages/react-segmented-control`; source: `packages/react-segmented-control/src/index.ts`.
- `SegmentedControlItemProps` (type) from `@virtari-packages/react-segmented-control`; source: `packages/react-segmented-control/src/index.ts`.
- `SegmentedControlSize` (type) from `@virtari-packages/react-segmented-control`; source: `packages/react-segmented-control/src/index.ts`.

## Source type declarations

Source: `packages/react-segmented-control/src/SegmentedControl.tsx`

```tsx
export type SegmentedControlSize = "sm" | "md" | "lg";
```

Source: `packages/react-segmented-control/src/SegmentedControl.tsx`

```tsx
export interface SegmentedControlProps
  extends Omit<PrimitiveRootProps, "orientation"> {
  size?: SegmentedControlSize;
  /** Expand to fill parent width. */
  fullWidth?: boolean;
  /** Vertical stacking layout. */
  orientation?: "horizontal" | "vertical";
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
```

Source: `packages/react-segmented-control/src/SegmentedControl.tsx`

```tsx
export interface SegmentedControlItemProps extends PrimitiveItemProps {
  /** Leading icon before label text. */
  icon?: ReactNode;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
```

Source: `packages/react-segmented-control/src/SegmentedControl.tsx`

```tsx
export function SegmentedControl({
  size = "md",
  fullWidth = false,
  orientation = "horizontal",
  dir,
  disabled,
  className,
  children,
  ref,
  ...props
}: SegmentedControlProps);
```

Source: `packages/react-segmented-control/src/SegmentedControl.tsx`

```tsx
export function SegmentedControlItem({
  icon,
  className,
  children,
  ref,
  ...props
}: SegmentedControlItemProps);
```

Source: `packages/react-segmented-control/src/use-segmented-indicator.ts`

```tsx
export function useSegmentedIndicator(
  listRef: RefObject<HTMLDivElement | null>,
);
```

## Source files

- `packages/react-segmented-control/src/index.ts`
- `packages/react-segmented-control/src/SegmentedControl.css`
- `packages/react-segmented-control/src/SegmentedControl.tokens.css`
- `packages/react-segmented-control/src/SegmentedControl.tsx`
- `packages/react-segmented-control/src/use-segmented-indicator.ts`
- `packages/react-segmented-control/package.json`
