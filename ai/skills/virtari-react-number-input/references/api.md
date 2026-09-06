# @virtari-packages/react-number-input API snapshot

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
  "./styles": "./dist/NumberInput.css",
  "./tokens": "./dist/NumberInput.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `NumberInput` (export) from `@virtari-packages/react-number-input`; source: `packages/react-number-input/src/index.ts`.
- `NumberInputField` (export) from `@virtari-packages/react-number-input`; source: `packages/react-number-input/src/index.ts`.
- `NumberInputProps` (type) from `@virtari-packages/react-number-input`; source: `packages/react-number-input/src/index.ts`.
- `NumberInputSize` (type) from `@virtari-packages/react-number-input`; source: `packages/react-number-input/src/index.ts`.
- `NumberInputFieldProps` (type) from `@virtari-packages/react-number-input`; source: `packages/react-number-input/src/index.ts`.

## Source type declarations

Source: `packages/react-number-input/src/NumberInput.tsx`

```tsx
export type NumberInputSize    = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-number-input/src/NumberInput.tsx`

```tsx
export type NumberInputStepper = "stacked" | "inline";
```

Source: `packages/react-number-input/src/NumberInput.tsx`

```tsx
export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "type" | "size"
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Decimal places to round to on blur. */
  precision?: number;
  /** Clamp to min/max on blur. Default: true. */
  clampOnBlur?: boolean;
  /** Control size. Canonical name, shared with every other sized control. */
  size?: NumberInputSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: NumberInputSize;
  /**
   * Stepper layout.
   * - `"stacked"` — up/down chevrons stacked on the trailing edge (default)
   * - `"inline"` — minus on leading edge, plus on trailing edge
   */
  stepper?: NumberInputStepper;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
  /**
   * Enable mouse-wheel scrolling to increment/decrement.
   * Only fires when the input is focused. Uses the same `step` value.
   * Default: false.
   */
  wheelEnabled?: boolean;
  /**
   * When true, wheel scrolling snaps the value to the nearest multiple of `step`.
   * Default: false.
   */
  wheelSnap?: boolean;
  /**
   * Each printable keystroke fires a brief ring-burst animation.
   * Intensity scales with typing speed. Default: false.
   */
  typingPulse?: boolean;
}
```

Source: `packages/react-number-input/src/NumberInputField.tsx`

```tsx
export interface NumberInputFieldProps
  extends Omit<
      FieldProps,
      | keyof NumberInputProps
      | "children"
      | "controlId"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<NumberInputProps, "className" | "ref" | "style"> {
  className?: string;
  style?: CSSProperties;
  numberInputClassName?: string;
  numberInputStyle?: CSSProperties;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}
```

Source: `packages/react-number-input/src/NumberInputField.tsx`

```tsx
export function NumberInputField({
  label,
  description,
  error,
  counter,
  metaLayout,
  descriptionAlign,
  errorAlign,
  counterAlign,
  labelProps,
  className,
  style,
  numberInputClassName,
  numberInputStyle,
  invalid,
  ref,
  id,
  required,
  disabled,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: NumberInputFieldProps);
```

## Source files

- `packages/react-number-input/src/index.ts`
- `packages/react-number-input/src/NumberInput.css`
- `packages/react-number-input/src/NumberInput.tokens.css`
- `packages/react-number-input/src/NumberInput.tsx`
- `packages/react-number-input/src/NumberInputField.tsx`
- `packages/react-number-input/package.json`
