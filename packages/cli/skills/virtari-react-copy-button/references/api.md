# @virtari-packages/react-copy-button API snapshot

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
  "./styles": "./dist/CopyButton.css",
  "./tokens": "./dist/CopyButton.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `CopyButton` (export) from `@virtari-packages/react-copy-button`; source: `packages/react-copy-button/src/index.ts`.
- `CopyButtonProps` (type) from `@virtari-packages/react-copy-button`; source: `packages/react-copy-button/src/index.ts`.
- `CopyButtonVariant` (type) from `@virtari-packages/react-copy-button`; source: `packages/react-copy-button/src/index.ts`.
- `CopyButtonSize` (type) from `@virtari-packages/react-copy-button`; source: `packages/react-copy-button/src/index.ts`.

## Source type declarations

Source: `packages/react-copy-button/src/CopyButton.tsx`

```tsx
export type CopyButtonVariant = "ghost" | "outline" | "soft";
```

Source: `packages/react-copy-button/src/CopyButton.tsx`

```tsx
export type CopyButtonSize = "2xs" | "xs" | "sm" | "md" | "lg";
```

Source: `packages/react-copy-button/src/CopyButton.tsx`

```tsx
export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Text to copy to the clipboard. */
  text: string;
  /** How long the "copied" state lasts in ms. */
  feedbackMs?: number;
  variant?: CopyButtonVariant;
  copyButtonSize?: CopyButtonSize;
  /** Optional visible label next to the icon. */
  label?: string;
  /** Label shown while in the "copied" state. */
  copiedLabel?: string;
  /** Accessible idle label when no visible label is supplied. */
  copyLabel?: string;
  /** Visible/announced feedback when clipboard access fails. */
  errorLabel?: string;
  onCopied?: () => void;
  onCopyError?: (error: unknown) => void;
  ref?: Ref<HTMLButtonElement>;
}
```

## Source files

- `packages/react-copy-button/src/CopyButton.css`
- `packages/react-copy-button/src/CopyButton.tokens.css`
- `packages/react-copy-button/src/CopyButton.tsx`
- `packages/react-copy-button/src/index.ts`
- `packages/react-copy-button/package.json`
