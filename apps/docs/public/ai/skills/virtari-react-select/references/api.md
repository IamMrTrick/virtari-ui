# @virtari-packages/react-select API snapshot

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
  "./styles": {
    "style": "./dist/Select.css",
    "default": "./dist/Select.css"
  },
  "./tokens": {
    "style": "./dist/Select.tokens.css",
    "default": "./dist/Select.tokens.css"
  },
  "./combobox/styles": {
    "style": "./dist/Combobox.css",
    "default": "./dist/Combobox.css"
  },
  "./combobox/tokens": {
    "style": "./dist/Combobox.tokens.css",
    "default": "./dist/Combobox.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Select` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectGroup` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectValue` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectTrigger` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectContent` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectItem` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectLabel` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectSeparator` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectEmpty` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectSize` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectAppearance` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectTriggerProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectContentProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectItemProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectLabelProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectSeparatorProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectEmptyProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectField` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectFieldProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `SelectFieldRenderProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `Combobox` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxTrigger` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxContent` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxInput` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxList` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxOptions` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxItem` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxGroup` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxEmpty` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxLoading` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxSeparator` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxSize` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxAppearance` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxTriggerProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxContentProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxInputProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxListProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxOptionsProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxItemProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxGroupProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxEmptyProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxLoadingProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxItemData` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `useComboboxContext` (export) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxFilter` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `UseComboboxProps` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.
- `ComboboxContextValue` (type) from `@virtari-packages/react-select`; source: `packages/react-select/src/index.ts`.

## Source type declarations

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export type ComboboxSize = SelectSize;
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export type ComboboxAppearance = SelectAppearance;
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxProps<T extends ComboboxItemData = ComboboxItemData>
  extends UseComboboxProps<T> {
  size?: ComboboxSize;
  appearance?: ComboboxAppearance;
  children?: ReactNode;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export function Combobox<T extends ComboboxItemData = ComboboxItemData>({
  size = "md",
  appearance = "soft",
  children,
  ...hookProps
}: ComboboxProps<T>);
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxTriggerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: ReactNode;
  clearable?: boolean;
  renderValue?: (item: ComboboxItemData) => ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  ref?: Ref<React.ComponentRef<typeof PopoverPrimitive.Content>>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxOptionsProps {
  children: (item: ComboboxItemData, index: number) => ReactNode;
  estimateSize?: number;
  maxHeight?: number | string;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export function ComboboxOptions({
  children,
  estimateSize = 36,
  maxHeight = 280,
}: ComboboxOptionsProps);
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export interface ComboboxLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Combobox.tsx`

```tsx
export function ComboboxSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export function Select({ dir, ...props }: SelectProps);
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export type SelectSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export type SelectAppearance = "soft" | "outline" | "ghost" | "filled";
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Size preset — shares height ramp with Button, Input, Toggle */
  size?: SelectSize;
  /** Visual appearance — defaults to `soft` (surface bg + border) */
  appearance?: SelectAppearance;
  /** Form error state — paints border + ring with danger tokens */
  invalid?: boolean;
  /** Shows a spinner in place of the chevron, sets `aria-busy` */
  loading?: boolean;
  /** Render a clear (X) button that fires `onClear` when clicked */
  clearable?: boolean;
  /** Called when the clear button is clicked (only used when `clearable`) */
  onClear?: () => void;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Trigger>>;
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  /** Propagated to descendant items for size-aware padding/typography */
  size?: SelectSize;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Item>>;
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Label>>;
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Separator>>;
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export interface SelectEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/Select.tsx`

```tsx
export function SelectEmpty({ className, children, ref, ...props }: SelectEmptyProps);
```

Source: `packages/react-select/src/SelectField.tsx`

```tsx
export interface SelectFieldRenderProps {
  controlId: string;
  describedBy?: string;
  invalid: boolean;
}
```

Source: `packages/react-select/src/SelectField.tsx`

```tsx
export interface SelectFieldProps
  extends Omit<
    FieldProps,
    "children" | "controlId" | "invalid" | "ref"
  > {
  children:
    | ReactNode
    | ((props: SelectFieldRenderProps) => ReactNode);
  controlId?: string;
  invalid?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-select/src/SelectField.tsx`

```tsx
export function SelectField({
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
  children,
  controlId,
  invalid = false,
  ref,
  ...props
}: SelectFieldProps);
```

Source: `packages/react-select/src/use-combobox.ts`

```tsx
export interface ComboboxItemData {
  value: string;
  label: string;
  disabled?: boolean;
  /** Free slot for consumer payload (icon, description, group key, …) */
  [key: string]: unknown;
}
```

Source: `packages/react-select/src/use-combobox.ts`

```tsx
export type ComboboxFilter<T extends ComboboxItemData = ComboboxItemData> = (
  item: T,
  query: string,
) => boolean;
```

Source: `packages/react-select/src/use-combobox.ts`

```tsx
export interface ComboboxContextValue {
  reset: () => void;
  /* config */
  multiple: boolean;
  searchable: boolean;
  disabled: boolean;
  invalid: boolean;
  loading: boolean;
  virtualized: boolean;
  emptyMessage: ReactNode;

  /* data */
  filteredItems: ComboboxItemData[];
  selectedItems: ComboboxItemData[];

  /* selection */
  value: string | string[];
  isSelected: (value: string) => boolean;
  toggleValue: (value: string) => void;
  removeValue: (value: string) => void;
  clearValue: () => void;

  /* search */
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  /** True when consumer supplied onSearchChange (async mode) */
  externalSearch: boolean;

  /* open state */
  open: boolean;
  setOpen: (open: boolean) => void;

  /* highlight (active descendant) */
  highlightedIndex: number;
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  moveHighlight: (delta: number | "start" | "end") => void;
  commitHighlighted: () => void;

  /* refs + ids */
  inputRef: RefObject<HTMLInputElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  listId: string;
  inputId: string;
  getItemId: (index: number) => string;

  /* keyboard */
  handleInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}
```

Source: `packages/react-select/src/use-combobox.ts`

```tsx
export function useComboboxContext(): ComboboxContextValue;
```

Source: `packages/react-select/src/use-combobox.ts`

```tsx
export interface UseComboboxProps<T extends ComboboxItemData = ComboboxItemData> {
  name?: string;
  form?: string;
  items: T[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;

  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  virtualized?: boolean;
  emptyMessage?: ReactNode;

  filter?: ComboboxFilter<T>;
  onSearchChange?: (query: string) => void;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

Source: `packages/react-select/src/use-combobox.ts`

```tsx
export function useCombobox<T extends ComboboxItemData = ComboboxItemData>(
  props: UseComboboxProps<T>,
): ComboboxContextValue;
```

Source: `packages/react-select/src/virtualizer.ts`

```tsx
export interface UseComboboxVirtualizerOptions {
  count: number;
  scrollRef: RefObject<HTMLElement | null>;
  estimateSize?: number;
  overscan?: number;
}
```

Source: `packages/react-select/src/virtualizer.ts`

```tsx
export function useComboboxVirtualizer({
  count,
  scrollRef,
  estimateSize = 36,
  overscan = 8,
}: UseComboboxVirtualizerOptions): Virtualizer<HTMLElement, Element>;
```

## Source files

- `packages/react-select/src/Combobox.css`
- `packages/react-select/src/Combobox.tokens.css`
- `packages/react-select/src/Combobox.tsx`
- `packages/react-select/src/index.ts`
- `packages/react-select/src/Select.css`
- `packages/react-select/src/Select.tokens.css`
- `packages/react-select/src/Select.tsx`
- `packages/react-select/src/SelectField.tsx`
- `packages/react-select/src/use-combobox.ts`
- `packages/react-select/src/virtualizer.ts`
- `packages/react-select/package.json`
