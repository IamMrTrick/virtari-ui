# @virtari-packages/react-textarea API snapshot

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
  "./styles": "./dist/Textarea.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Textarea` (export) from `@virtari-packages/react-textarea`; source: `packages/react-textarea/src/index.ts`.
- `TextareaField` (export) from `@virtari-packages/react-textarea`; source: `packages/react-textarea/src/index.ts`.
- `TextareaProps` (type) from `@virtari-packages/react-textarea`; source: `packages/react-textarea/src/index.ts`.
- `TextareaSize` (type) from `@virtari-packages/react-textarea`; source: `packages/react-textarea/src/index.ts`.
- `TextareaFieldProps` (type) from `@virtari-packages/react-textarea`; source: `packages/react-textarea/src/index.ts`.

## Source type declarations

Source: `packages/react-textarea/src/Textarea.tsx`

```tsx
export type TextareaSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-textarea/src/Textarea.tsx`

```tsx
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Control size. Canonical name, shared with every other sized control. */
  size?: TextareaSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: TextareaSize;
  /**
   * Each printable keystroke fires a brief ring-burst animation.
   * Intensity scales with typing speed. Default: false.
   */
  typingPulse?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}
```

Source: `packages/react-textarea/src/TextareaField.tsx`

```tsx
export interface TextareaFieldProps
  extends Omit<
      FieldProps,
      | keyof TextareaProps
      | "children"
      | "controlId"
      | "counter"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<TextareaProps, "className" | "ref" | "style"> {
  counter?: ReactNode;
  className?: string;
  style?: CSSProperties;
  textareaClassName?: string;
  textareaStyle?: CSSProperties;
  showCounter?: boolean;
  counterFormatter?: (current: number, maxLength?: number) => ReactNode;
  invalid?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}
```

## Source files

- `packages/react-textarea/src/index.ts`
- `packages/react-textarea/src/Textarea.css`
- `packages/react-textarea/src/Textarea.tsx`
- `packages/react-textarea/src/TextareaField.tsx`
- `packages/react-textarea/package.json`
