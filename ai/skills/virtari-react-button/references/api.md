# @virtari-packages/react-button API snapshot

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
  "./styles": "./dist/Button.css",
  "./styles/effects": "./dist/effects.css",
  "./styles/animations": "./dist/animations.css",
  "./tokens": "./dist/Button.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Button` (export) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonProps` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonColor` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonVariant` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonSize` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonEffect` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonAnimation` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonGroupContext` (export) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.
- `ButtonGroupContextValue` (type) from `@virtari-packages/react-button`; source: `packages/react-button/src/index.ts`.

## Source type declarations

Source: `packages/react-button/src/Button.tsx`

```tsx
export type ButtonColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "contrast";
```

Source: `packages/react-button/src/Button.tsx`

```tsx
export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "link"
  /** @deprecated Use `color="danger"` instead. Maps to solid + danger at runtime. */
  | "destructive";
```

Source: `packages/react-button/src/Button.tsx`

```tsx
export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
```

Source: `packages/react-button/src/Button.tsx`

```tsx
export type ButtonEffect = "shine" | "raised" | "glow" | "glass" | "outline-glow" | "candy";
```

Source: `packages/react-button/src/Button.tsx`

```tsx
export type ButtonAnimation = "pulse" | "bounce" | "shake" | "jiggle";
```

Source: `packages/react-button/src/Button.tsx`

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Hue/intent. Orthogonal to variant. */
  color?: ButtonColor;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Render as child element (polymorphic via Slot) */
  asChild?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Accessible label for loading state (announced by screen readers) */
  loadingText?: string;
  /** Element placed before children (icon, badge, etc.) */
  leftSection?: ReactNode;
  /** Element placed after children */
  rightSection?: ReactNode;
  /** Explicit square icon geometry; useful for opaque custom icon components. */
  iconOnly?: boolean;
  /** Take full width of parent */
  fullWidth?: boolean;
  /** Visual effect (requires effects CSS import) */
  effect?: ButtonEffect;
  /** Attention animation (requires animations CSS import) */
  animation?: ButtonAnimation;
}
```

Source: `packages/react-button/src/context.ts`

```tsx
export interface ButtonGroupContextValue {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}
```

## Source files

- `packages/react-button/src/animations.css`
- `packages/react-button/src/Button.css`
- `packages/react-button/src/Button.tokens.css`
- `packages/react-button/src/Button.tsx`
- `packages/react-button/src/context.ts`
- `packages/react-button/src/effects.css`
- `packages/react-button/src/index.ts`
- `packages/react-button/package.json`
