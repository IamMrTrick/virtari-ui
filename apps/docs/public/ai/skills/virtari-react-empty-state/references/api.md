# @virtari-packages/react-empty-state API snapshot

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
  "./styles": "./dist/EmptyState.css",
  "./tokens": "./dist/EmptyState.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `EmptyState` (export) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateIcon` (export) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateTitle` (export) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateDescription` (export) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateActions` (export) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateProps` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateSize` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateOrientation` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateIconProps` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateTitleProps` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateDescriptionProps` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.
- `EmptyStateActionsProps` (type) from `@virtari-packages/react-empty-state`; source: `packages/react-empty-state/src/index.ts`.

## Source type declarations

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export type EmptyStateSize = "sm" | "md" | "lg";
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export type EmptyStateOrientation = "vertical" | "horizontal";
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  size?: EmptyStateSize;
  orientation?: EmptyStateOrientation;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export interface EmptyStateIconProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export interface EmptyStateTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export interface EmptyStateDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export interface EmptyStateActionsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export function EmptyState({
  size = "md",
  orientation = "vertical",
  className,
  children,
  ref,
  ...props
}: EmptyStateProps);
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export function EmptyStateIcon({ className, children, ref, ...props }: EmptyStateIconProps);
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export function EmptyStateTitle({ className, children, ref, ...props }: EmptyStateTitleProps);
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export function EmptyStateDescription({ className, children, ref, ...props }: EmptyStateDescriptionProps);
```

Source: `packages/react-empty-state/src/EmptyState.tsx`

```tsx
export function EmptyStateActions({ className, children, ref, ...props }: EmptyStateActionsProps);
```

## Source files

- `packages/react-empty-state/src/EmptyState.css`
- `packages/react-empty-state/src/EmptyState.tokens.css`
- `packages/react-empty-state/src/EmptyState.tsx`
- `packages/react-empty-state/src/index.ts`
- `packages/react-empty-state/package.json`
