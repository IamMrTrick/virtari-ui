# @virtari-packages/react-tooltip API snapshot

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
  "./styles": "./dist/Tooltip.css",
  "./tokens": "./dist/Tooltip.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `TooltipProvider` (export) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `Tooltip` (export) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipTrigger` (export) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipContent` (export) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipArrow` (export) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipProviderProps` (type) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipContentProps` (type) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipArrowProps` (type) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipSize` (type) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.
- `TooltipVariant` (type) from `@virtari-packages/react-tooltip`; source: `packages/react-tooltip/src/index.ts`.

## Source type declarations

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export type TooltipSize = "sm" | "md" | "lg";
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export type TooltipVariant =
  | "default"
  | "inverted"
  | "info"
  | "success"
  | "warning"
  | "danger";
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export interface TooltipProviderProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export function TooltipProvider({
  delayDuration = 300,
  skipDelayDuration = 200,
  dir,
  children,
  ...props
}: TooltipProviderProps);
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof TooltipPrimitive.Content>>;
  size?: TooltipSize;
  variant?: TooltipVariant;
  /** Render an arrow pointing to the trigger. */
  arrow?: boolean;
}
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export function TooltipContent({
  className,
  sideOffset = 6,
  collisionPadding = 8,
  size = "md",
  variant = "default",
  arrow = false,
  children,
  ref,
  ...props
}: TooltipContentProps);
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export interface TooltipArrowProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {
  ref?: Ref<ComponentRef<typeof TooltipPrimitive.Arrow>>;
}
```

Source: `packages/react-tooltip/src/Tooltip.tsx`

```tsx
export function TooltipArrow({ className, ref, ...props }: TooltipArrowProps);
```

## Source files

- `packages/react-tooltip/src/index.ts`
- `packages/react-tooltip/src/Tooltip.css`
- `packages/react-tooltip/src/Tooltip.tokens.css`
- `packages/react-tooltip/src/Tooltip.tsx`
- `packages/react-tooltip/package.json`
