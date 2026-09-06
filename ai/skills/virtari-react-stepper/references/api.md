# @virtari-packages/react-stepper API snapshot

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
  "./styles": "./dist/Stepper.css",
  "./tokens": "./dist/Stepper.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Stepper` (export) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperStep` (export) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperIndicator` (export) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperProps` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperStepProps` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperIndicatorProps` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperSize` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperOrientation` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperStepStatus` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperVariant` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperTone` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperAnimation` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.
- `StepperLine` (type) from `@virtari-packages/react-stepper`; source: `packages/react-stepper/src/index.ts`.

## Source type declarations

Source: `packages/react-stepper/src/context.ts`

```tsx
export interface StepperContextValue {
  activeStep: number;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  totalSteps: number;
}
```

Source: `packages/react-stepper/src/context.ts`

```tsx
export function useStepperContext();
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperSize = "sm" | "md" | "lg";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperOrientation = "horizontal" | "vertical";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperStepStatus = "complete" | "active" | "pending" | "error";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperVariant = "default" | "soft" | "outlined" | "minimal" | "cards";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperAnimation = "none" | "fade" | "slide" | "scale" | "pulse";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export type StepperLine = "solid" | "dashed" | "gradient";
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export interface StepperProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  /** Index (0-based) of the current active step. */
  activeStep: number;
  orientation?: StepperOrientation;
  size?: StepperSize;
  variant?: StepperVariant;
  tone?: StepperTone;
  animation?: StepperAnimation;
  line?: StepperLine;
  children: ReactNode;
  ref?: Ref<HTMLOListElement>;
}
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export interface StepperStepProps extends HTMLAttributes<HTMLLIElement> {
  /** 0-based index, injected automatically by Stepper. */
  index?: number;
  label: string;
  description?: string;
  /** Replaces the automatic number/check/error indicator for this step. */
  indicator?: ReactNode;
  /** Override auto-derived status. */
  status?: StepperStepStatus;
  ref?: Ref<HTMLLIElement>;
}
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export interface StepperIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  index?: number;
  status?: StepperStepStatus;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export function StepperIndicator({ index, status, className, children, ref, ...props }: StepperIndicatorProps);
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export function StepperStep({
  index = 0,
  label,
  description,
  indicator,
  status,
  className,
  style,
  children,
  ref,
  ...props
}: StepperStepProps);
```

Source: `packages/react-stepper/src/Stepper.tsx`

```tsx
export function Stepper({
  activeStep,
  orientation = "horizontal",
  size = "md",
  variant = "default",
  tone = "primary",
  animation = "slide",
  line = "solid",
  className,
  children,
  ref,
  ...props
}: StepperProps);
```

## Source files

- `packages/react-stepper/src/context.ts`
- `packages/react-stepper/src/index.ts`
- `packages/react-stepper/src/Stepper.css`
- `packages/react-stepper/src/Stepper.tokens.css`
- `packages/react-stepper/src/Stepper.tsx`
- `packages/react-stepper/package.json`
