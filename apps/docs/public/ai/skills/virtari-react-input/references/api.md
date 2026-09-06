# @virtari-packages/react-input API snapshot

Version: 1.0.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Input.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Input` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputWrapper` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputIcon` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputGroup` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputAddon` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputField` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordInput` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthMeter` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordInputField` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `analyzePasswordStrength` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `getPasswordStrength` (export) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputSize` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputWrapperProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputIconProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputGroupProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputAddonProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputAddonSide` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `InputFieldProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordInputProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthMeterProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordInputFieldProps` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordRequirementConfig` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordRequirementId` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthAnalysis` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthColor` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthLevel` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthOptions` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthRequirement` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthScore` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.
- `PasswordStrengthStandard` (type) from `@virtari-packages/react-input`; source: `packages/react-input/src/index.ts`.

## Source type declarations

Source: `packages/react-input/src/Input.tsx`

```tsx
export type InputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-input/src/Input.tsx`

```tsx
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Control size. Canonical name, shared with every other sized control
   * (Button, Select, Toggle, ...) so a form row can be sized by spreading one
   * prop. Shadows the native `size` attribute, which is inert here because
   * `.vds-input` is always `inline-size: 100%`.
   */
  size?: InputSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: InputSize;
  /**
   * Each printable keystroke fires a brief ring-burst animation.
   * Intensity scales with typing speed. Default: false.
   */
  typingPulse?: boolean;
  ref?: Ref<HTMLInputElement>;
}
```

Source: `packages/react-input/src/Input.tsx`

```tsx
export interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-input/src/Input.tsx`

```tsx
export interface InputIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Logical slot; omitted retains first/last-child placement. */
  side?: "start" | "end";
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-input/src/Input.tsx`

```tsx
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-input/src/Input.tsx`

```tsx
export type InputAddonSide = "start" | "end";
```

Source: `packages/react-input/src/Input.tsx`

```tsx
export interface InputAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  side?: InputAddonSide;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-input/src/InputField.tsx`

```tsx
export interface InputFieldProps
  extends Omit<
      FieldProps,
      | keyof InputProps
      | "afterControl"
      | "children"
      | "controlId"
      | "counter"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<InputProps, "className" | "ref" | "style"> {
  counter?: ReactNode;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  showCounter?: boolean;
  counterFormatter?: (current: number, maxLength?: number) => ReactNode;
  revealable?: boolean;
  showStrengthMeter?: boolean;
  strengthFormatter?: (score: number, value: string) => ReactNode;
  afterControl?: ReactNode;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}
```

Source: `packages/react-input/src/PasswordInput.tsx`

```tsx
export interface PasswordStrengthMeterProps
  extends HTMLAttributes<HTMLDivElement> {
  analysis: PasswordStrengthAnalysis;
  label?: ReactNode;
  strengthFormatter?: (analysis: PasswordStrengthAnalysis) => ReactNode;
  showStrengthBar?: boolean;
  showRequirements?: boolean;
  showFeedback?: boolean;
  requirementsLabel?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-input/src/PasswordInput.tsx`

```tsx
export interface PasswordInputProps
  extends Omit<InputProps, "type"> {
  rootClassName?: string;
  rootStyle?: CSSProperties;
  revealable?: boolean;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  showStrengthMeter?: boolean;
  showStrengthBar?: boolean;
  showRequirements?: boolean;
  showFeedback?: boolean;
  requirements?: PasswordRequirementConfig[];
  requirementsLabel?: ReactNode;
  strengthStandard?: PasswordStrengthStandard;
  strongLength?: number;
  strengthOptions?: PasswordStrengthOptions;
  strengthFormatter?: (analysis: PasswordStrengthAnalysis) => ReactNode;
  onStrengthChange?: (analysis: PasswordStrengthAnalysis) => void;
  strengthId?: string;
  strengthClassName?: string;
  strengthStyle?: CSSProperties;
  strengthLabel?: ReactNode;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  ref?: Ref<HTMLInputElement>;
}
```

Source: `packages/react-input/src/PasswordInput.tsx`

```tsx
export function PasswordStrengthMeter({
  analysis,
  label = "Password strength",
  strengthFormatter,
  showStrengthBar = true,
  showRequirements = false,
  showFeedback = false,
  requirementsLabel,
  className,
  style,
  ref,
  ...props
}: PasswordStrengthMeterProps);
```

Source: `packages/react-input/src/PasswordInputField.tsx`

```tsx
export interface PasswordInputFieldProps
  extends Omit<
      FieldProps,
      | keyof PasswordInputProps
      | "afterControl"
      | "children"
      | "controlId"
      | "counter"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<
      PasswordInputProps,
      "className" | "ref" | "rootClassName" | "rootStyle" | "style"
    > {
  counter?: ReactNode;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  passwordRootClassName?: string;
  passwordRootStyle?: CSSProperties;
  showCounter?: boolean;
  counterFormatter?: (current: number, maxLength?: number) => ReactNode;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export type PasswordStrengthScore = 0 | 1 | 2 | 3 | 4;
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export type PasswordStrengthLevel =
  | "empty"
  | "weak"
  | "fair"
  | "good"
  | "strong";
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export type PasswordStrengthColor =
  | "neutral"
  | "danger"
  | "warning"
  | "primary"
  | "success";
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export type PasswordStrengthStandard = "basic" | "standard" | "strict";
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export type PasswordRequirementId =
  | "min-length"
  | "recommended-length"
  | "mixed-case"
  | "number"
  | "symbol"
  | "no-common-pattern";
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export type PasswordRequirementConfig =
  | PasswordRequirementId
  | {
      id: PasswordRequirementId;
      label?: string;
      enabled?: boolean;
    };
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export interface PasswordStrengthRequirement {
  id: PasswordRequirementId;
  label: string;
  met: boolean;
}
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export interface PasswordStrengthAnalysis {
  value: string;
  length: number;
  score: PasswordStrengthScore;
  percent: number;
  level: PasswordStrengthLevel;
  color: PasswordStrengthColor;
  label: string;
  feedback: string;
  isAcceptable: boolean;
  requirements: PasswordStrengthRequirement[];
}
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export interface PasswordStrengthOptions {
  standard?: PasswordStrengthStandard;
  minLength?: number;
  strongLength?: number;
  forbiddenValues?: string[];
  userInputs?: string[];
  labels?: Partial<Record<PasswordStrengthLevel, string>>;
  feedback?: Partial<Record<PasswordStrengthLevel, string>>;
  requirementLabels?: Partial<Record<PasswordRequirementId, string>>;
  requirements?: PasswordRequirementConfig[];
}
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export function analyzePasswordStrength(
  password: string,
  options: PasswordStrengthOptions = {},
): PasswordStrengthAnalysis;
```

Source: `packages/react-input/src/passwordStrength.ts`

```tsx
export function getPasswordStrength(
  password: string,
  options?: PasswordStrengthOptions,
): PasswordStrengthScore;
```

## Source files

- `packages/react-input/src/index.ts`
- `packages/react-input/src/Input.css`
- `packages/react-input/src/Input.tsx`
- `packages/react-input/src/InputField.tsx`
- `packages/react-input/src/PasswordInput.tsx`
- `packages/react-input/src/PasswordInputField.tsx`
- `packages/react-input/src/passwordStrength.ts`
- `packages/react-input/package.json`
