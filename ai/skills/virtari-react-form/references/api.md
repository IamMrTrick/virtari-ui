# @virtari-packages/react-form API snapshot

Version: 1.0.1. Export entry points (exact package.json map):

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
  "./styles": "./dist/Form.css",
  "./tokens": "./dist/Form.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Form` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormField` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormItem` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormLabel` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormControl` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormDescription` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormMessage` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `useFormField` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `UseFormFieldReturn` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormItemProps` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormItemOrientation` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormLabelProps` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormControlProps` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormDescriptionProps` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormMessageProps` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormFieldContext` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormItemContext` (export) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormFieldContextValue` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.
- `FormItemContextValue` (type) from `@virtari-packages/react-form`; source: `packages/react-form/src/index.ts`.

## Source type declarations

Source: `packages/react-form/src/context.ts`

```tsx
export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}
```

Source: `packages/react-form/src/context.ts`

```tsx
export interface FormItemContextValue {
  /** Stable id base, e.g. "vds-form-item-abc". Parts derive their ids from it. */
  id: string;
}
```

Source: `packages/react-form/src/FormControl.tsx`

```tsx
export interface FormControlProps extends ComponentPropsWithoutRef<typeof Slot> {}
```

Source: `packages/react-form/src/FormDescription.tsx`

```tsx
export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}
```

Source: `packages/react-form/src/FormField.tsx`

```tsx
export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>);
```

Source: `packages/react-form/src/FormItem.tsx`

```tsx
export type FormItemOrientation = "vertical" | "horizontal";
```

Source: `packages/react-form/src/FormItem.tsx`

```tsx
export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: FormItemOrientation;
}
```

Source: `packages/react-form/src/FormLabel.tsx`

```tsx
export interface FormLabelProps extends LabelProps {}
```

Source: `packages/react-form/src/FormMessage.tsx`

```tsx
export interface FormMessageProps
  extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Override content. When omitted, the component reads `error.message` from
   * the form state. When there is no error, the component renders nothing.
   */
  children?: ReactNode;
}
```

Source: `packages/react-form/src/use-form-field.ts`

```tsx
export interface UseFormFieldReturn {
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  error: FieldError | undefined;
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
}
```

Source: `packages/react-form/src/use-form-field.ts`

```tsx
export function useFormField(): UseFormFieldReturn;
```

## Source files

- `packages/react-form/src/context.ts`
- `packages/react-form/src/Form.css`
- `packages/react-form/src/Form.tokens.css`
- `packages/react-form/src/Form.tsx`
- `packages/react-form/src/FormControl.tsx`
- `packages/react-form/src/FormDescription.tsx`
- `packages/react-form/src/FormField.tsx`
- `packages/react-form/src/FormItem.tsx`
- `packages/react-form/src/FormLabel.tsx`
- `packages/react-form/src/FormMessage.tsx`
- `packages/react-form/src/index.ts`
- `packages/react-form/src/use-form-field.ts`
- `packages/react-form/package.json`
