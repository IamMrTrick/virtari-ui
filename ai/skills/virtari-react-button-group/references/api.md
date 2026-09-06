# @virtari-packages/react-button-group API snapshot

Version: 4.0.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/ButtonGroup.css",
  "./tokens": "./dist/ButtonGroup.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `ButtonGroup` (export) from `@virtari-packages/react-button-group`; source: `packages/react-button-group/src/index.ts`.
- `ButtonGroupProps` (type) from `@virtari-packages/react-button-group`; source: `packages/react-button-group/src/index.ts`.

## Source type declarations

Source: `packages/react-button-group/src/ButtonGroup.tsx`

```tsx
export interface ButtonGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Hue/intent propagated to every child Button. Each child can still override. */
  color?: ButtonColor;
  /** Visual style propagated to every child Button. Each child can still override. */
  variant?: ButtonVariant;
  /** Size propagated to every child Button. Each child can still override. */
  size?: ButtonSize;
  /** Disabled propagated to every child Button. Each child can still override. */
  disabled?: boolean;
  /** Layout axis. */
  orientation?: "horizontal" | "vertical";
  /** Segmented mode: zero gap, collapsed inner radii and shared borders. */
  attached?: boolean;
  /** Children stretch to equal flex basis, filling the container. */
  fullWidth?: boolean;
  children: ReactNode;
}
```

## Source files

- `packages/react-button-group/src/ButtonGroup.css`
- `packages/react-button-group/src/ButtonGroup.tokens.css`
- `packages/react-button-group/src/ButtonGroup.tsx`
- `packages/react-button-group/src/index.ts`
- `packages/react-button-group/package.json`
