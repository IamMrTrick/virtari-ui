# @virtari-packages/react-avatar API snapshot

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
  "./styles": "./dist/Avatar.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Avatar` (export) from `@virtari-packages/react-avatar`; source: `packages/react-avatar/src/index.ts`.
- `AvatarProps` (type) from `@virtari-packages/react-avatar`; source: `packages/react-avatar/src/index.ts`.
- `AvatarSize` (type) from `@virtari-packages/react-avatar`; source: `packages/react-avatar/src/index.ts`.
- `AvatarColor` (type) from `@virtari-packages/react-avatar`; source: `packages/react-avatar/src/index.ts`.

## Source type declarations

Source: `packages/react-avatar/src/Avatar.tsx`

```tsx
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-avatar/src/Avatar.tsx`

```tsx
export type AvatarColor =
  | "neutral"
  | "auto"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8";
```

Source: `packages/react-avatar/src/Avatar.tsx`

```tsx
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
  /**
   * Fallback background color. `"neutral"` (default) uses the primary
   * tokens. `"auto"` picks one of the 8 chart slots deterministically from
   * `colorKey` (or `fallback` if `colorKey` is absent) so the same name
   * always yields the same color. `"1"\u2013"8"` force a specific slot.
   */
  color?: AvatarColor;
  /**
   * Input to the auto-hash when `color="auto"`. Pass a stable value like
   * user id, email, or full name so a short `fallback` (e.g. initials)
   * doesn\u2019t collide with everyone else\u2019s initials.
   */
  colorKey?: string;
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Root>>;
}
```

Source: `packages/react-avatar/src/Avatar.tsx`

```tsx
export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  color = "neutral",
  colorKey,
  className,
  ref,
  ...props
}: AvatarProps);
```

## Source files

- `packages/react-avatar/src/Avatar.css`
- `packages/react-avatar/src/Avatar.tsx`
- `packages/react-avatar/src/index.ts`
- `packages/react-avatar/package.json`
