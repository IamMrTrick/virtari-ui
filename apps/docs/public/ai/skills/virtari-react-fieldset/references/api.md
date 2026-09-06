# @virtari-packages/react-fieldset API snapshot

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
  "./styles": "./dist/Fieldset.css",
  "./tokens": "./dist/Fieldset.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Fieldset` (export) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldsetLegend` (export) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldsetDescription` (export) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldsetProps` (type) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldsetLegendProps` (type) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldsetDescriptionProps` (type) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `Field` (export) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `composeFieldDescribedBy` (export) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `hasFieldContent` (export) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldProps` (type) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldMetaAlign` (type) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.
- `FieldMetaLayout` (type) from `@virtari-packages/react-fieldset`; source: `packages/react-fieldset/src/index.ts`.

## Source type declarations

Source: `packages/react-fieldset/src/Field.tsx`

```tsx
export type FieldMetaLayout = "stacked" | "inline";
```

Source: `packages/react-fieldset/src/Field.tsx`

```tsx
export type FieldMetaAlign = "start" | "end";
```

Source: `packages/react-fieldset/src/Field.tsx`

```tsx
export interface FieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  counter?: ReactNode;
  afterControl?: ReactNode;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  controlId?: string;
  descriptionId?: string;
  errorId?: string;
  counterId?: string;
  metaLayout?: FieldMetaLayout;
  descriptionAlign?: FieldMetaAlign;
  errorAlign?: FieldMetaAlign;
  counterAlign?: FieldMetaAlign;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  controlClassName?: string;
  afterControlClassName?: string;
  metaClassName?: string;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-fieldset/src/Field.tsx`

```tsx
export function hasFieldContent(value: ReactNode | undefined): boolean;
```

Source: `packages/react-fieldset/src/Field.tsx`

```tsx
export function composeFieldDescribedBy(
  ...values: Array<string | null | undefined | false>
);
```

Source: `packages/react-fieldset/src/Field.tsx`

```tsx
export function Field({
  children,
  label,
  description,
  error,
  counter,
  afterControl,
  invalid,
  required,
  disabled,
  controlId,
  descriptionId,
  errorId,
  counterId,
  metaLayout = "stacked",
  descriptionAlign = "start",
  errorAlign = "start",
  counterAlign = "end",
  labelProps,
  className,
  controlClassName,
  afterControlClassName,
  metaClassName,
  ref,
  ...props
}: FieldProps);
```

Source: `packages/react-fieldset/src/Fieldset.tsx`

```tsx
export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Marks all child fields as invalid via CSS cascade. */
  invalid?: boolean;
  ref?: Ref<HTMLFieldSetElement>;
}
```

Source: `packages/react-fieldset/src/Fieldset.tsx`

```tsx
export interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
  /** Appends a required asterisk after the label text. */
  required?: boolean;
  ref?: Ref<HTMLLegendElement>;
}
```

Source: `packages/react-fieldset/src/Fieldset.tsx`

```tsx
export interface FieldsetDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}
```

Source: `packages/react-fieldset/src/Fieldset.tsx`

```tsx
export function Fieldset({ invalid, disabled, className, children, ref, ...props }: FieldsetProps);
```

Source: `packages/react-fieldset/src/Fieldset.tsx`

```tsx
export function FieldsetLegend({ required, className, children, ref, ...props }: FieldsetLegendProps);
```

Source: `packages/react-fieldset/src/Fieldset.tsx`

```tsx
export function FieldsetDescription({ className, children, ref, ...props }: FieldsetDescriptionProps);
```

## Source files

- `packages/react-fieldset/src/Field.tsx`
- `packages/react-fieldset/src/Fieldset.css`
- `packages/react-fieldset/src/Fieldset.tokens.css`
- `packages/react-fieldset/src/Fieldset.tsx`
- `packages/react-fieldset/src/index.ts`
- `packages/react-fieldset/package.json`
