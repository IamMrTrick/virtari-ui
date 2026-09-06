# @virtari-packages/react-checkbox API snapshot

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
  "./styles": "./dist/Checkbox.css",
  "./tokens": "./dist/Checkbox.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Checkbox` (export) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxProps` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxSize` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxField` (export) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxFieldProps` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxGroup` (export) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxGroupProps` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxCard` (export) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxCardProps` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `CheckboxCardLayout` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `PillCheckbox` (export) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `PillCheckboxItem` (export) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `PillCheckboxProps` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `PillCheckboxItemProps` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.
- `PillCheckboxSize` (type) from `@virtari-packages/react-checkbox`; source: `packages/react-checkbox/src/index.ts`.

## Source type declarations

Source: `packages/react-checkbox/src/Checkbox.tsx`

```tsx
export type CheckboxSize = "sm" | "md" | "lg";
```

Source: `packages/react-checkbox/src/Checkbox.tsx`

```tsx
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Proportional size — sm (14px), md (18px), lg (22px) */
  size?: CheckboxSize;
  /** Paints the danger ramp + sets aria-invalid. Inherited from CheckboxGroup if unset. */
  error?: boolean;
  ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}
```

Source: `packages/react-checkbox/src/Checkbox.tsx`

```tsx
export function Checkbox({
  size = "md",
  error,
  disabled,
  name,
  "aria-describedby": describedBy,
  className,
  ref,
  ...props
}: CheckboxProps);
```

Source: `packages/react-checkbox/src/CheckboxCard.tsx`

```tsx
export type CheckboxCardLayout = "row" | "icon-grid";
```

Source: `packages/react-checkbox/src/CheckboxCard.tsx`

```tsx
export interface CheckboxCardProps extends Omit<CheckboxProps, "ref"> {
  label: ReactNode;
  description?: ReactNode;
  /** Right-aligned content in row layout: price, meta, etc. */
  trailing?: ReactNode;
  /** Small chip rendered under the label (e.g. "Recommended"). */
  badge?: ReactNode;
  /** Icon node rendered in the icon container (icon-grid layout by default). */
  icon?: ReactNode;
  /**
   * Defaults to "row". Auto-switches to "icon-grid" when `icon` is provided
   * unless explicitly overridden.
   */
  layout?: CheckboxCardLayout;
  /** Extra props on the wrapping <label> (className, style, data-*). */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Optional ref on the underlying Checkbox. */
  checkboxRef?: CheckboxProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}
```

Source: `packages/react-checkbox/src/CheckboxCard.tsx`

```tsx
export function CheckboxCard({
  label,
  description,
  trailing,
  badge,
  icon,
  layout,
  labelProps,
  checkboxRef,
  ref,
  error,
  disabled,
  className,
  ...checkboxProps
}: CheckboxCardProps);
```

Source: `packages/react-checkbox/src/CheckboxField.tsx`

```tsx
export interface CheckboxFieldProps extends Omit<CheckboxProps, "ref"> {
  label: ReactNode;
  description?: ReactNode;
  /** Extra props forwarded to the wrapping <label> (class, style, onClick). */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Override the ref target for the underlying checkbox. */
  checkboxRef?: CheckboxProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}
```

Source: `packages/react-checkbox/src/CheckboxField.tsx`

```tsx
export function CheckboxField({
  label,
  description,
  labelProps,
  checkboxRef,
  ref,
  error,
  disabled,
  className,
  ...checkboxProps
}: CheckboxFieldProps);
```

Source: `packages/react-checkbox/src/CheckboxGroup.tsx`

```tsx
export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Truthy renders a role="alert" message and propagates error=true to descendant checkboxes. */
  error?: ReactNode;
  /** Shows a red asterisk next to the label + sets aria-required on the group. */
  required?: boolean;
  /** Propagates disabled to every descendant Checkbox / CheckboxField / CheckboxCard. */
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  /** Default form field name inherited by descendant checkboxes; an item name overrides it. */
  name?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-checkbox/src/CheckboxGroup.tsx`

```tsx
export function CheckboxGroup({
  label,
  description,
  error,
  required = false,
  disabled = false,
  orientation = "vertical",
  name,
  className,
  children,
  ref,
  id: idProp,
  ...rest
}: CheckboxGroupProps);
```

Source: `packages/react-checkbox/src/context.ts`

```tsx
export interface CheckboxGroupContextValue {
  disabled?: boolean;
  error?: boolean;
  name?: string;
  describedBy?: string;
}
```

Source: `packages/react-checkbox/src/context.ts`

```tsx
export function useCheckboxGroupContext(): CheckboxGroupContextValue | null;
```

Source: `packages/react-checkbox/src/PillCheckbox.tsx`

```tsx
export type PillCheckboxSize = "sm" | "md" | "lg";
```

Source: `packages/react-checkbox/src/PillCheckbox.tsx`

```tsx
export interface PillCheckboxProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
  size?: PillCheckboxSize;
  error?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  /** Optional form field name; propagated through context for item inheritance. */
  name?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-checkbox/src/PillCheckbox.tsx`

```tsx
export function PillCheckbox({
  size = "md",
  error,
  disabled,
  orientation = "horizontal",
  name,
  className,
  children,
  ref,
  ...props
}: PillCheckboxProps);
```

Source: `packages/react-checkbox/src/PillCheckbox.tsx`

```tsx
export interface PillCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}
```

Source: `packages/react-checkbox/src/PillCheckbox.tsx`

```tsx
export function PillCheckboxItem({
  className,
  disabled,
  name,
  "aria-describedby": describedBy,
  ref,
  children,
  ...props
}: PillCheckboxItemProps);
```

## Source files

- `packages/react-checkbox/src/Checkbox.css`
- `packages/react-checkbox/src/Checkbox.tokens.css`
- `packages/react-checkbox/src/Checkbox.tsx`
- `packages/react-checkbox/src/CheckboxCard.css`
- `packages/react-checkbox/src/CheckboxCard.tsx`
- `packages/react-checkbox/src/CheckboxField.css`
- `packages/react-checkbox/src/CheckboxField.tsx`
- `packages/react-checkbox/src/CheckboxGroup.css`
- `packages/react-checkbox/src/CheckboxGroup.tsx`
- `packages/react-checkbox/src/context.ts`
- `packages/react-checkbox/src/index.ts`
- `packages/react-checkbox/src/PillCheckbox.css`
- `packages/react-checkbox/src/PillCheckbox.tsx`
- `packages/react-checkbox/package.json`
