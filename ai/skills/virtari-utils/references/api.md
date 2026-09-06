# @virtari-packages/utils API snapshot

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
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `cn` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `getKeyboardPlatform` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `useKeyboardPlatform` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `formatCombo` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `ariaKeyShortcuts` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `shortcutLabel` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `KeyboardPlatform` (type) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `useComposedRefs` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `useFormReset` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `useDirection` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `Direction` (type) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `useHotkey` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `parseCombo` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `matchesCombo` (export) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `ParsedCombo` (type) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.
- `UseHotkeyOptions` (type) from `@virtari-packages/utils`; source: `packages/utils/src/index.ts`.

## Source type declarations

Source: `packages/utils/src/cn.ts`

```tsx
export function cn(...classes: (string | undefined | null | false)[]): string;
```

Source: `packages/utils/src/keyboard.ts`

```tsx
export function formatCombo(combo: string, platform: KeyboardPlatform = getKeyboardPlatform()): string[];
```

Source: `packages/utils/src/keyboard.ts`

```tsx
export function ariaKeyShortcuts(combo: string, platform: KeyboardPlatform = getKeyboardPlatform()): string;
```

Source: `packages/utils/src/keyboard.ts`

```tsx
export function shortcutLabel(combo: string, platform: KeyboardPlatform = getKeyboardPlatform()): string;
```

Source: `packages/utils/src/keyboardPlatform.ts`

```tsx
export type KeyboardPlatform = "mac" | "other";
```

Source: `packages/utils/src/keyboardPlatform.ts`

```tsx
export function getKeyboardPlatform(): KeyboardPlatform;
```

Source: `packages/utils/src/keyboardPlatform.ts`

```tsx
export function useKeyboardPlatform(): KeyboardPlatform;
```

Source: `packages/utils/src/useComposedRefs.ts`

```tsx
export function useComposedRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T>;
```

Source: `packages/utils/src/useDirection.ts`

```tsx
export type Direction = "ltr" | "rtl";
```

Source: `packages/utils/src/useDirection.ts`

```tsx
export function useDirection(ref?: RefObject<Element | null>): Direction;
```

Source: `packages/utils/src/useFormReset.ts`

```tsx
export function useFormReset(
  ref: RefObject<HTMLElement | null>,
  onReset: () => void,
  formId?: string,
);
```

Source: `packages/utils/src/useHotkey.ts`

```tsx
export interface ParsedCombo {
  key: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  alt: boolean;
  /** `mod` = meta on macOS, ctrl elsewhere. Resolved at match time. */
  mod: boolean;
}
```

Source: `packages/utils/src/useHotkey.ts`

```tsx
export function parseCombo(combo: string): ParsedCombo;
```

Source: `packages/utils/src/useHotkey.ts`

```tsx
export function matchesCombo(e: KeyboardEvent, combo: ParsedCombo, platform: KeyboardPlatform = getKeyboardPlatform()): boolean;
```

Source: `packages/utils/src/useHotkey.ts`

```tsx
export interface UseHotkeyOptions {
  enabled?: boolean;
  target?: HTMLElement | Document | null;
  preventDefault?: boolean;
  /** If false (default), hotkey is ignored when focus is in an editable field. */
  allowInInputs?: boolean;
  /** Permit repeated keydown events when a key is held. Defaults to false. */
  allowRepeat?: boolean;
  deps?: unknown[];
}
```

Source: `packages/utils/src/useHotkey.ts`

```tsx
export function useHotkey(
  combo: string | string[],
  handler: (e: KeyboardEvent) => void,
  opts: UseHotkeyOptions = {},
): void;
```

## Source files

- `packages/utils/src/cn.ts`
- `packages/utils/src/index.ts`
- `packages/utils/src/keyboard.ts`
- `packages/utils/src/keyboardPlatform.ts`
- `packages/utils/src/useComposedRefs.ts`
- `packages/utils/src/useDirection.ts`
- `packages/utils/src/useFormReset.ts`
- `packages/utils/src/useHotkey.ts`
- `packages/utils/package.json`
