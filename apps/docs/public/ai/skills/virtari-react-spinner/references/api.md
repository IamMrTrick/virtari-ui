# @virtari-packages/react-spinner API snapshot

Version: 0.3.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Spinner.css",
  "./tokens": "./dist/Spinner.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Spinner` (export) from `@virtari-packages/react-spinner`; source: `packages/react-spinner/src/index.ts`.
- `SpinnerProps` (type) from `@virtari-packages/react-spinner`; source: `packages/react-spinner/src/index.ts`.
- `SpinnerVariant` (type) from `@virtari-packages/react-spinner`; source: `packages/react-spinner/src/index.ts`.
- `SpinnerSize` (type) from `@virtari-packages/react-spinner`; source: `packages/react-spinner/src/index.ts`.
- `SpinnerColor` (type) from `@virtari-packages/react-spinner`; source: `packages/react-spinner/src/index.ts`.
- `SpinnerSpeed` (type) from `@virtari-packages/react-spinner`; source: `packages/react-spinner/src/index.ts`.

## Source type declarations

Source: `packages/react-spinner/src/Spinner.tsx`

```tsx
export type SpinnerVariant = "ring" | "segments" | "dots" | "bars" | "ripple" | "orbit";
```

Source: `packages/react-spinner/src/Spinner.tsx`

```tsx
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-spinner/src/Spinner.tsx`

```tsx
export type SpinnerColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral"
  | "current";
```

Source: `packages/react-spinner/src/Spinner.tsx`

```tsx
export type SpinnerSpeed = "slow" | "normal" | "fast";
```

Source: `packages/react-spinner/src/Spinner.tsx`

```tsx
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: SpinnerColor;
  speed?: SpinnerSpeed;
  label?: string;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-spinner/src/Spinner.tsx`

```tsx
export function Spinner({
  variant = "ring",
  size = "md",
  color = "primary",
  speed,
  label = "Loading",
  className,
  ref,
  ...props
}: SpinnerProps);
```

## Source files

- `packages/react-spinner/src/index.ts`
- `packages/react-spinner/src/Spinner.css`
- `packages/react-spinner/src/Spinner.tokens.css`
- `packages/react-spinner/src/Spinner.tsx`
- `packages/react-spinner/package.json`
