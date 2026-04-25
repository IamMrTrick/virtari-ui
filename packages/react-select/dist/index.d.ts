import * as react from 'react';
import { Ref, ComponentRef, ReactNode, Dispatch, SetStateAction, RefObject, KeyboardEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FieldProps } from '@virtari-packages/react-fieldset';
import * as PopoverPrimitive from '@radix-ui/react-popover';

interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
    /** Reading direction. Defaults to the document's active direction. */
    dir?: "ltr" | "rtl";
}
declare function Select({ dir, ...props }: SelectProps): react_jsx_runtime.JSX.Element;
declare const SelectGroup: react.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectValue: react.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & react.RefAttributes<HTMLSpanElement>>;
type SelectSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type SelectAppearance = "soft" | "outline" | "ghost" | "filled";
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
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
declare function SelectTrigger({ size, appearance, invalid, loading, clearable, onClear, className, children, ref, ...props }: SelectTriggerProps): react_jsx_runtime.JSX.Element;
interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
    /** Propagated to descendant items for size-aware padding/typography */
    size?: SelectSize;
    ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}
declare function SelectContent({ className, children, position, size, ref, ...props }: SelectContentProps): react_jsx_runtime.JSX.Element;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
    ref?: Ref<ComponentRef<typeof SelectPrimitive.Item>>;
}
declare function SelectItem({ className, children, ref, ...props }: SelectItemProps): react_jsx_runtime.JSX.Element;
interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
    ref?: Ref<ComponentRef<typeof SelectPrimitive.Label>>;
}
declare function SelectLabel({ className, ref, ...props }: SelectLabelProps): react_jsx_runtime.JSX.Element;
interface SelectSeparatorProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
    ref?: Ref<ComponentRef<typeof SelectPrimitive.Separator>>;
}
declare function SelectSeparator({ className, ref, ...props }: SelectSeparatorProps): react_jsx_runtime.JSX.Element;
interface SelectEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function SelectEmpty({ className, children, ref, ...props }: SelectEmptyProps): react_jsx_runtime.JSX.Element;

interface SelectFieldRenderProps {
    controlId: string;
    describedBy?: string;
    invalid: boolean;
}
interface SelectFieldProps extends Omit<FieldProps, "children" | "controlId" | "invalid" | "ref"> {
    children: ReactNode | ((props: SelectFieldRenderProps) => ReactNode);
    controlId?: string;
    invalid?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function SelectField({ label, description, error, counter, metaLayout, descriptionAlign, errorAlign, counterAlign, labelProps, className, children, controlId, invalid, ref, ...props }: SelectFieldProps): react_jsx_runtime.JSX.Element;

interface ComboboxItemData {
    value: string;
    label: string;
    disabled?: boolean;
    /** Free slot for consumer payload (icon, description, group key, …) */
    [key: string]: unknown;
}
type ComboboxFilter<T extends ComboboxItemData = ComboboxItemData> = (item: T, query: string) => boolean;
interface ComboboxContextValue {
    multiple: boolean;
    searchable: boolean;
    disabled: boolean;
    invalid: boolean;
    loading: boolean;
    virtualized: boolean;
    emptyMessage: ReactNode;
    filteredItems: ComboboxItemData[];
    selectedItems: ComboboxItemData[];
    value: string | string[];
    isSelected: (value: string) => boolean;
    toggleValue: (value: string) => void;
    removeValue: (value: string) => void;
    clearValue: () => void;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    /** True when consumer supplied onSearchChange (async mode) */
    externalSearch: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    highlightedIndex: number;
    setHighlightedIndex: Dispatch<SetStateAction<number>>;
    moveHighlight: (delta: number | "start" | "end") => void;
    commitHighlighted: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
    triggerRef: RefObject<HTMLElement | null>;
    listId: string;
    inputId: string;
    getItemId: (index: number) => string;
    handleInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}
declare function useComboboxContext(): ComboboxContextValue;
interface UseComboboxProps<T extends ComboboxItemData = ComboboxItemData> {
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

type ComboboxSize = SelectSize;
type ComboboxAppearance = SelectAppearance;
interface ComboboxProps<T extends ComboboxItemData = ComboboxItemData> extends UseComboboxProps<T> {
    size?: ComboboxSize;
    appearance?: ComboboxAppearance;
    children?: ReactNode;
}
declare function Combobox<T extends ComboboxItemData = ComboboxItemData>({ size, appearance, children, ...hookProps }: ComboboxProps<T>): react_jsx_runtime.JSX.Element;
interface ComboboxTriggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    placeholder?: ReactNode;
    clearable?: boolean;
    renderValue?: (item: ComboboxItemData) => ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function ComboboxTrigger({ placeholder, clearable, renderValue, className, onClick, onKeyDown, ref, ...props }: ComboboxTriggerProps): react_jsx_runtime.JSX.Element;
interface ComboboxContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    ref?: Ref<React.ComponentRef<typeof PopoverPrimitive.Content>>;
}
declare function ComboboxContent({ className, sideOffset, align, children, onOpenAutoFocus, onCloseAutoFocus, ref, ...props }: ComboboxContentProps): react_jsx_runtime.JSX.Element;
interface ComboboxInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    placeholder?: string;
    ref?: Ref<HTMLInputElement>;
}
declare function ComboboxInput({ className, placeholder, onKeyDown, ref, ...props }: ComboboxInputProps): react_jsx_runtime.JSX.Element | null;
interface ComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function ComboboxList({ className, children, ref, ...props }: ComboboxListProps): react_jsx_runtime.JSX.Element;
interface ComboboxOptionsProps {
    children: (item: ComboboxItemData, index: number) => ReactNode;
    estimateSize?: number;
    maxHeight?: number | string;
}
declare function ComboboxOptions({ children, estimateSize, maxHeight, }: ComboboxOptionsProps): react_jsx_runtime.JSX.Element | null;
interface ComboboxItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    value: string;
    disabled?: boolean;
    onSelect?: (value: string) => void;
    ref?: Ref<HTMLDivElement>;
}
declare function ComboboxItem({ value, disabled, className, children, onSelect, onClick, onMouseMove, ref, ...props }: ComboboxItemProps): react_jsx_runtime.JSX.Element;
interface ComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    heading?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function ComboboxGroup({ heading, className, children, ref, ...props }: ComboboxGroupProps): react_jsx_runtime.JSX.Element;
interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function ComboboxEmpty({ className, children, ref, ...props }: ComboboxEmptyProps): react_jsx_runtime.JSX.Element | null;
interface ComboboxLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function ComboboxLoading({ className, children, ref, ...props }: ComboboxLoadingProps): react_jsx_runtime.JSX.Element | null;
declare function ComboboxSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

export { Combobox, type ComboboxAppearance, ComboboxContent, type ComboboxContentProps, type ComboboxContextValue, ComboboxEmpty, type ComboboxEmptyProps, type ComboboxFilter, ComboboxGroup, type ComboboxGroupProps, ComboboxInput, type ComboboxInputProps, ComboboxItem, type ComboboxItemData, type ComboboxItemProps, ComboboxList, type ComboboxListProps, ComboboxLoading, type ComboboxLoadingProps, ComboboxOptions, type ComboboxOptionsProps, type ComboboxProps, ComboboxSeparator, type ComboboxSize, ComboboxTrigger, type ComboboxTriggerProps, Select, type SelectAppearance, SelectContent, type SelectContentProps, SelectEmpty, type SelectEmptyProps, SelectField, type SelectFieldProps, type SelectFieldRenderProps, SelectGroup, SelectItem, type SelectItemProps, SelectLabel, type SelectLabelProps, SelectSeparator, type SelectSeparatorProps, type SelectSize, SelectTrigger, type SelectTriggerProps, SelectValue, type UseComboboxProps, useComboboxContext };
