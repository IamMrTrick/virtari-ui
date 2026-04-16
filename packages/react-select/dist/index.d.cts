import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

declare const Select: react.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: react.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectValue: react.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & react.RefAttributes<HTMLSpanElement>>;
type SelectSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
    /** Size preset — shares height ramp with Button, Input, Toggle */
    size?: SelectSize;
    ref?: Ref<ComponentRef<typeof SelectPrimitive.Trigger>>;
}
declare function SelectTrigger({ size, className, children, ref, ...props }: SelectTriggerProps): react_jsx_runtime.JSX.Element;
interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}
declare function SelectContent({ className, children, position, ref, ...props }: SelectContentProps): react_jsx_runtime.JSX.Element;
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

export { Select, SelectContent, type SelectContentProps, SelectGroup, SelectItem, type SelectItemProps, SelectLabel, type SelectLabelProps, SelectSeparator, type SelectSeparatorProps, type SelectSize, SelectTrigger, type SelectTriggerProps, SelectValue };
