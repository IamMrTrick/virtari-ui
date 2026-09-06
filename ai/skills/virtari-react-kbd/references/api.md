# @virtari-packages/react-kbd API snapshot

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
  "./styles": "./dist/Kbd.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Kbd` (export) from `@virtari-packages/react-kbd`; source: `packages/react-kbd/src/index.ts`.
- `KbdShortcut` (export) from `@virtari-packages/react-kbd`; source: `packages/react-kbd/src/index.ts`.
- `KbdProps` (type) from `@virtari-packages/react-kbd`; source: `packages/react-kbd/src/index.ts`.
- `KbdShortcutProps` (type) from `@virtari-packages/react-kbd`; source: `packages/react-kbd/src/index.ts`.

## Source type declarations

Source: `packages/react-kbd/src/Kbd.tsx`

```tsx
export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-kbd/src/Kbd.tsx`

```tsx
export function Kbd({ className, ref, ...props }: KbdProps);
```

Source: `packages/react-kbd/src/Kbd.tsx`

```tsx
export interface KbdShortcutProps extends Omit<KbdProps, "children"> {
  /** The same combination used by useHotkey, e.g. `mod+k`. Display only. */
  combo: string;
  /** Override only for documentation or a known remote platform. */
  platform?: KeyboardPlatform;
}
```

Source: `packages/react-kbd/src/Kbd.tsx`

```tsx
export function KbdShortcut({ combo, platform, "aria-label": accessibleLabel, ...props }: KbdShortcutProps);
```

## Source files

- `packages/react-kbd/src/index.ts`
- `packages/react-kbd/src/Kbd.css`
- `packages/react-kbd/src/Kbd.tsx`
- `packages/react-kbd/package.json`
