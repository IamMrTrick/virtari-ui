# @virtari-packages/react-alert API snapshot

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
  "./styles": "./dist/Alert.css",
  "./tokens": "./dist/Alert.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Alert` (export) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertIcon` (export) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertContent` (export) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertTitle` (export) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertDescription` (export) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertClose` (export) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertProps` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertIconProps` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertContentProps` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertTitleProps` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertDescriptionProps` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertCloseProps` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertVariant` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertSize` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.
- `AlertAppearance` (type) from `@virtari-packages/react-alert`; source: `packages/react-alert/src/index.ts`.

## Source type declarations

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export type AlertVariant = "info" | "success" | "warning" | "danger";
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export type AlertSize = "sm" | "md" | "lg";
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export type AlertAppearance = "soft" | "solid" | "outline";
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  size?: AlertSize;
  appearance?: AlertAppearance;
  asChild?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export function Alert({
  variant = "info",
  size = "md",
  appearance = "soft",
  asChild = false,
  className,
  ref,
  role,
  ...props
}: AlertProps);
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export interface AlertIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export function AlertIcon({
  asChild = false,
  className,
  ref,
  ...props
}: AlertIconProps);
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export interface AlertContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export function AlertContent({
  className,
  ref,
  ...props
}: AlertContentProps);
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export function AlertTitle({ className, ref, ...props }: AlertTitleProps);
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export function AlertDescription({
  className,
  ref,
  ...props
}: AlertDescriptionProps);
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export interface AlertCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}
```

Source: `packages/react-alert/src/Alert.tsx`

```tsx
export function AlertClose({
  asChild = false,
  className,
  type,
  "aria-label": ariaLabel,
  children,
  ref,
  ...props
}: AlertCloseProps);
```

## Source files

- `packages/react-alert/src/Alert.css`
- `packages/react-alert/src/Alert.tokens.css`
- `packages/react-alert/src/Alert.tsx`
- `packages/react-alert/src/index.ts`
- `packages/react-alert/package.json`
