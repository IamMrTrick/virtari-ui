# @virtari-packages/react-skeleton API snapshot

Version: 0.4.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Skeleton.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Skeleton` (export) from `@virtari-packages/react-skeleton`; source: `packages/react-skeleton/src/index.ts`.
- `SkeletonProps` (type) from `@virtari-packages/react-skeleton`; source: `packages/react-skeleton/src/index.ts`.

## Source type declarations

Source: `packages/react-skeleton/src/Skeleton.tsx`

```tsx
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed width (CSS value) */
  width?: string | number;
  /** Fixed height (CSS value) */
  height?: string | number;
  /** Render as a circle (sets border-radius to 50%) */
  circle?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-skeleton/src/Skeleton.tsx`

```tsx
export function Skeleton({
  width,
  height,
  circle = false,
  className,
  style,
  ref,
  ...props
}: SkeletonProps);
```

## Source files

- `packages/react-skeleton/src/index.ts`
- `packages/react-skeleton/src/Skeleton.css`
- `packages/react-skeleton/src/Skeleton.tsx`
- `packages/react-skeleton/package.json`
