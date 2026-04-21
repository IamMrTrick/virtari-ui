import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef, ReactNode, ComponentPropsWithoutRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

type CheckboxSize = "sm" | "md" | "lg";
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    /** Proportional size — sm (14px), md (18px), lg (22px) */
    size?: CheckboxSize;
    /** Paints the danger ramp + sets aria-invalid. Inherited from CheckboxGroup if unset. */
    error?: boolean;
    ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}
declare function Checkbox({ size, error, disabled, className, ref, ...props }: CheckboxProps): react_jsx_runtime.JSX.Element;

interface CheckboxFieldProps extends Omit<CheckboxProps, "ref"> {
    label: ReactNode;
    description?: ReactNode;
    /** Extra props forwarded to the wrapping <label> (class, style, onClick). */
    labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
    /** Override the ref target for the underlying checkbox. */
    checkboxRef?: CheckboxProps["ref"];
    ref?: Ref<HTMLLabelElement>;
}
declare function CheckboxField({ label, description, labelProps, checkboxRef, ref, error, disabled, className, ...checkboxProps }: CheckboxFieldProps): react_jsx_runtime.JSX.Element;

interface CheckboxGroupProps extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
    label?: ReactNode;
    description?: ReactNode;
    /** Truthy renders a role="alert" message and propagates error=true to descendant checkboxes. */
    error?: ReactNode;
    /** Shows a red asterisk next to the label + sets aria-required on the group. */
    required?: boolean;
    /** Propagates disabled to every descendant Checkbox / CheckboxField / CheckboxCard. */
    disabled?: boolean;
    orientation?: "vertical" | "horizontal";
    /** Optional form field name; passed through context for name= inheritance if needed by consumers. */
    name?: string;
    children: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function CheckboxGroup({ label, description, error, required, disabled, orientation, name, className, children, ref, id: idProp, ...rest }: CheckboxGroupProps): react_jsx_runtime.JSX.Element;

type CheckboxCardLayout = "row" | "icon-grid";
interface CheckboxCardProps extends Omit<CheckboxProps, "ref"> {
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
declare function CheckboxCard({ label, description, trailing, badge, icon, layout, labelProps, checkboxRef, ref, error, disabled, className, ...checkboxProps }: CheckboxCardProps): react_jsx_runtime.JSX.Element;

type PillCheckboxSize = "sm" | "md" | "lg";
interface PillCheckboxProps extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
    size?: PillCheckboxSize;
    error?: boolean;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    /** Optional form field name; propagated through context for item inheritance. */
    name?: string;
    children: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function PillCheckbox({ size, error, disabled, orientation, name, className, children, ref, ...props }: PillCheckboxProps): react_jsx_runtime.JSX.Element;
interface PillCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}
declare function PillCheckboxItem({ className, disabled, ref, children, ...props }: PillCheckboxItemProps): react_jsx_runtime.JSX.Element;

export { Checkbox, CheckboxCard, type CheckboxCardLayout, type CheckboxCardProps, CheckboxField, type CheckboxFieldProps, CheckboxGroup, type CheckboxGroupProps, type CheckboxProps, type CheckboxSize, PillCheckbox, PillCheckboxItem, type PillCheckboxItemProps, type PillCheckboxProps, type PillCheckboxSize };
