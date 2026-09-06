# @virtari-packages/react-radio-group API snapshot

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
  "./styles": "./dist/RadioGroup.css",
  "./tokens": "./dist/RadioGroup.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `RadioGroup` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioGroupItem` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioGroupProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioGroupItemProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioField` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioFieldProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioCard` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioCardProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioCardLayout` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `SegmentedRadio` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `SegmentedRadioItem` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `SegmentedRadioProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `SegmentedRadioItemProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `SegmentedRadioSize` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `PillRadio` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `PillRadioItem` (export) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `PillRadioProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `PillRadioItemProps` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `PillRadioSize` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.
- `RadioSize` (type) from `@virtari-packages/react-radio-group`; source: `packages/react-radio-group/src/index.ts`.

## Source type declarations

Source: `packages/react-radio-group/src/context.ts`

```tsx
export type RadioSize = "sm" | "md" | "lg";
```

Source: `packages/react-radio-group/src/context.ts`

```tsx
export interface RadioGroupContextValue {
  disabled?: boolean;
  error?: boolean;
  size?: RadioSize;
  name?: string;
}
```

Source: `packages/react-radio-group/src/context.ts`

```tsx
export function useRadioGroupContext(): RadioGroupContextValue | null;
```

Source: `packages/react-radio-group/src/PillRadio.tsx`

```tsx
export type PillRadioSize = "sm" | "md" | "lg";
```

Source: `packages/react-radio-group/src/PillRadio.tsx`

```tsx
export interface PillRadioProps extends PrimitiveRootProps {
  size?: PillRadioSize;
  error?: boolean;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
```

Source: `packages/react-radio-group/src/PillRadio.tsx`

```tsx
export function PillRadio({
  size = "md",
  error = false,
  className,
  orientation = "horizontal",
  disabled,
  ref,
  ...props
}: PillRadioProps);
```

Source: `packages/react-radio-group/src/PillRadio.tsx`

```tsx
export interface PillRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
```

Source: `packages/react-radio-group/src/PillRadio.tsx`

```tsx
export function PillRadioItem({
  className,
  ref,
  children,
  ...props
}: PillRadioItemProps);
```

Source: `packages/react-radio-group/src/RadioCard.tsx`

```tsx
export type RadioCardLayout = "row" | "icon-grid";
```

Source: `packages/react-radio-group/src/RadioCard.tsx`

```tsx
export interface RadioCardProps extends Omit<RadioGroupItemProps, "ref"> {
  /** Title-level text. Omit when using `children` for fully custom content. */
  label?: ReactNode;
  description?: ReactNode;
  /** Right-aligned content in row layout: price, meta, etc. */
  trailing?: ReactNode;
  /** Small chip rendered under the label (e.g. "Most popular"). */
  badge?: ReactNode;
  /** Icon node rendered in the icon container. Auto-switches layout to icon-grid. */
  icon?: ReactNode;
  /** Defaults to "row"; auto "icon-grid" when `icon` is set unless overridden. */
  layout?: RadioCardLayout;
  /** Free-form replacement for the built-in body (rich content cards). */
  children?: ReactNode;
  /** Extra props on the wrapping <label>. */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Optional ref on the underlying radio. */
  radioRef?: RadioGroupItemProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}
```

Source: `packages/react-radio-group/src/RadioCard.tsx`

```tsx
export function RadioCard({
  label,
  description,
  trailing,
  badge,
  icon,
  layout,
  children,
  labelProps,
  radioRef,
  ref,
  error,
  disabled,
  id: idProp,
  className,
  ...radioProps
}: RadioCardProps);
```

Source: `packages/react-radio-group/src/RadioField.tsx`

```tsx
export interface RadioFieldProps extends Omit<RadioGroupItemProps, "ref"> {
  label: ReactNode;
  description?: ReactNode;
  /** Extra props forwarded to the wrapping <label>. */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Override the ref target for the underlying radio. */
  radioRef?: RadioGroupItemProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}
```

Source: `packages/react-radio-group/src/RadioField.tsx`

```tsx
export function RadioField({
  label,
  description,
  labelProps,
  radioRef,
  ref,
  error,
  disabled,
  id: idProp,
  className,
  ...radioProps
}: RadioFieldProps);
```

Source: `packages/react-radio-group/src/RadioGroup.tsx`

```tsx
export interface RadioGroupProps extends Omit<PrimitiveRootProps, "children"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Truthy renders a role="alert" message and propagates error=true to descendants. */
  error?: ReactNode;
  required?: boolean;
  /** Proportional size for every descendant radio. */
  size?: RadioSize;
  children: ReactNode;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
```

Source: `packages/react-radio-group/src/RadioGroup.tsx`

```tsx
export function RadioGroup({
  label,
  description,
  error,
  required = false,
  size = "md",
  disabled = false,
  orientation = "vertical",
  name,
  className,
  children,
  ref,
  id: idProp,
  ...rest
}: RadioGroupProps);
```

Source: `packages/react-radio-group/src/RadioGroup.tsx`

```tsx
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: RadioSize;
  error?: boolean;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
```

Source: `packages/react-radio-group/src/RadioGroup.tsx`

```tsx
export function RadioGroupItem({
  size,
  error,
  disabled,
  className,
  ref,
  ...props
}: RadioGroupItemProps);
```

Source: `packages/react-radio-group/src/SegmentedRadio.tsx`

```tsx
export type SegmentedRadioSize = "sm" | "md" | "lg";
```

Source: `packages/react-radio-group/src/SegmentedRadio.tsx`

```tsx
export interface SegmentedRadioProps extends PrimitiveRootProps {
  size?: SegmentedRadioSize;
  error?: boolean;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
```

Source: `packages/react-radio-group/src/SegmentedRadio.tsx`

```tsx
export function SegmentedRadio({
  size = "md",
  error = false,
  className,
  orientation = "horizontal",
  disabled,
  ref,
  ...props
}: SegmentedRadioProps);
```

Source: `packages/react-radio-group/src/SegmentedRadio.tsx`

```tsx
export interface SegmentedRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
```

Source: `packages/react-radio-group/src/SegmentedRadio.tsx`

```tsx
export function SegmentedRadioItem({
  className,
  ref,
  children,
  ...props
}: SegmentedRadioItemProps);
```

## Source files

- `packages/react-radio-group/src/context.ts`
- `packages/react-radio-group/src/index.ts`
- `packages/react-radio-group/src/PillRadio.css`
- `packages/react-radio-group/src/PillRadio.tsx`
- `packages/react-radio-group/src/RadioCard.css`
- `packages/react-radio-group/src/RadioCard.tsx`
- `packages/react-radio-group/src/RadioField.css`
- `packages/react-radio-group/src/RadioField.tsx`
- `packages/react-radio-group/src/RadioGroup.css`
- `packages/react-radio-group/src/RadioGroup.tokens.css`
- `packages/react-radio-group/src/RadioGroup.tsx`
- `packages/react-radio-group/src/SegmentedRadio.css`
- `packages/react-radio-group/src/SegmentedRadio.tsx`
- `packages/react-radio-group/package.json`
