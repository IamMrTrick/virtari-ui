# @virtari-packages/react-otp-input API snapshot

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
  "./styles": "./dist/OtpInput.css",
  "./tokens": "./dist/OtpInput.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `OtpInput` (export) from `@virtari-packages/react-otp-input`; source: `packages/react-otp-input/src/index.ts`.
- `OtpInputProps` (type) from `@virtari-packages/react-otp-input`; source: `packages/react-otp-input/src/index.ts`.
- `OtpInputType` (type) from `@virtari-packages/react-otp-input`; source: `packages/react-otp-input/src/index.ts`.
- `OtpInputSize` (type) from `@virtari-packages/react-otp-input`; source: `packages/react-otp-input/src/index.ts`.

## Source type declarations

Source: `packages/react-otp-input/src/OtpInput.tsx`

```tsx
export type OtpInputType = "numeric" | "alphanumeric" | "alphabetic";
```

Source: `packages/react-otp-input/src/OtpInput.tsx`

```tsx
export type OtpInputSize = "sm" | "md" | "lg";
```

Source: `packages/react-otp-input/src/OtpInput.tsx`

```tsx
export interface OtpInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  /** Number of input slots. */
  length?: number;
  value?: string;
  defaultValue?: string;
  form?: string;
  onChange?: (value: string) => void;
  /** Called when all slots are filled. */
  onComplete?: (value: string) => void;
  type?: OtpInputType;
  /** Visually obscure slots where the browser supports text-security. */
  mask?: boolean;
  /** Control size. Canonical name, shared with every other sized control. */
  size?: OtpInputSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: OtpInputSize;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  /** Emits a hidden input with the completed code for native form submits. */
  name?: string;
  /** Marks each visible slot as required. */
  required?: boolean;
  /** Accessible group label. */
  label?: string;
  /** Browser autofill token. Defaults to one-time-code on the first slot. */
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /** Normalize Persian and Arabic digits to ASCII before validation. */
  normalizeDigits?: boolean;
  /** Select a slot's value when it receives focus. */
  selectOnFocus?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

## Source files

- `packages/react-otp-input/src/index.ts`
- `packages/react-otp-input/src/OtpInput.css`
- `packages/react-otp-input/src/OtpInput.tokens.css`
- `packages/react-otp-input/src/OtpInput.tsx`
- `packages/react-otp-input/package.json`
