import * as React from 'react';
import { Primitive } from '../primitive';
import type { Scope } from '../context';
type ScopedProps<P> = P & {
    __scopeCheckbox?: Scope;
};
declare const createCheckboxScope: import("../context").CreateScope;
type CheckedState = boolean | 'indeterminate';
interface CheckboxProviderProps<State extends CheckedState = CheckedState> {
    checked?: State | boolean;
    defaultChecked?: State | boolean;
    required?: boolean;
    onCheckedChange?(checked: State | boolean): void;
    name?: string;
    form?: string;
    disabled?: boolean;
    value?: string | number | readonly string[];
    children?: React.ReactNode;
}
declare function CheckboxProvider<State extends CheckedState = CheckedState>(props: ScopedProps<CheckboxProviderProps<State>>): import("react/jsx-runtime").JSX.Element;
interface CheckboxTriggerProps extends Omit<React.ComponentPropsWithoutRef<typeof Primitive.button>, keyof CheckboxProviderProps> {
    children?: React.ReactNode;
}
declare const CheckboxTrigger: React.ForwardRefExoticComponent<CheckboxTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface CheckboxProps extends Omit<PrimitiveButtonProps, 'checked' | 'defaultChecked'> {
    checked?: CheckedState;
    defaultChecked?: CheckedState;
    required?: boolean;
    onCheckedChange?(checked: CheckedState): void;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
interface CheckboxIndicatorProps extends PrimitiveSpanProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
declare const CheckboxIndicator: React.ForwardRefExoticComponent<CheckboxIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
type InputProps = React.ComponentPropsWithoutRef<typeof Primitive.input>;
interface CheckboxBubbleInputProps extends Omit<InputProps, 'checked'> {
}
declare const CheckboxBubbleInput: React.ForwardRefExoticComponent<CheckboxBubbleInputProps & React.RefAttributes<HTMLInputElement>>;
export { createCheckboxScope, Checkbox, CheckboxProvider, CheckboxTrigger, CheckboxIndicator, CheckboxBubbleInput, Checkbox as Root, CheckboxProvider as Provider, CheckboxTrigger as Trigger, CheckboxIndicator as Indicator, CheckboxBubbleInput as BubbleInput, };
export type { CheckboxProps, CheckboxProviderProps, CheckboxTriggerProps, CheckboxIndicatorProps, CheckboxBubbleInputProps, CheckedState, };
