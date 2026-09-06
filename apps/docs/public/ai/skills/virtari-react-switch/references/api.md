# @virtari-packages/react-switch API snapshot

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
  "./styles": "./dist/Switch.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Switch` (export) from `@virtari-packages/react-switch`; source: `packages/react-switch/src/index.ts`.
- `SwitchProps` (type) from `@virtari-packages/react-switch`; source: `packages/react-switch/src/index.ts`.
- `SwitchSize` (type) from `@virtari-packages/react-switch`; source: `packages/react-switch/src/index.ts`.

## Source type declarations

Source: `packages/react-switch/src/Switch.tsx`

```tsx
export type SwitchSize = "sm" | "md" | "lg";
```

Source: `packages/react-switch/src/Switch.tsx`

```tsx
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
  dragEnabled?: boolean;
  ref?: Ref<ComponentRef<typeof SwitchPrimitive.Root>>;
}
```

Source: `packages/react-switch/src/Switch.tsx`

```tsx
export function Switch({
  size = "md",
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  dragEnabled = true,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  ref,
  ...props
}: SwitchProps);
```

Source: `packages/react-switch/src/useSwitchDrag.ts`

```tsx
export interface SwitchDragConfig {
  enabled: boolean;
  getChecked: () => boolean;
  onCommit: (next: boolean) => void;
}
```

Source: `packages/react-switch/src/useSwitchDrag.ts`

```tsx
export interface SwitchDragBinding {
  rootRef: (node: HTMLButtonElement | null) => void;
  thumbRef: (node: HTMLSpanElement | null) => void;
  handlers: {
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerCancel: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onLostPointerCapture: (event: React.PointerEvent<HTMLButtonElement>) => void;
  };
}
```

Source: `packages/react-switch/src/useSwitchDrag.ts`

```tsx
export function useSwitchDrag(config: SwitchDragConfig): SwitchDragBinding;
```

## Source files

- `packages/react-switch/src/index.ts`
- `packages/react-switch/src/Switch.css`
- `packages/react-switch/src/Switch.tsx`
- `packages/react-switch/src/useSwitchDrag.ts`
- `packages/react-switch/package.json`
