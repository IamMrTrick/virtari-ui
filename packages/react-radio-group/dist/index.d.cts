import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef, ReactNode, ComponentPropsWithoutRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

type RadioSize = "sm" | "md" | "lg";

type PrimitiveRootProps$2 = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;
interface RadioGroupProps extends Omit<PrimitiveRootProps$2, "children"> {
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
declare function RadioGroup({ label, description, error, required, size, disabled, orientation, name, className, children, ref, id: idProp, ...rest }: RadioGroupProps): react_jsx_runtime.JSX.Element;
interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    size?: RadioSize;
    error?: boolean;
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
declare function RadioGroupItem({ size, error, disabled, className, ref, ...props }: RadioGroupItemProps): react_jsx_runtime.JSX.Element;

interface RadioFieldProps extends Omit<RadioGroupItemProps, "ref"> {
    label: ReactNode;
    description?: ReactNode;
    /** Extra props forwarded to the wrapping <label>. */
    labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
    /** Override the ref target for the underlying radio. */
    radioRef?: RadioGroupItemProps["ref"];
    ref?: Ref<HTMLLabelElement>;
}
declare function RadioField({ label, description, labelProps, radioRef, ref, error, disabled, id: idProp, className, ...radioProps }: RadioFieldProps): react_jsx_runtime.JSX.Element;

type RadioCardLayout = "row" | "icon-grid";
interface RadioCardProps extends Omit<RadioGroupItemProps, "ref"> {
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
declare function RadioCard({ label, description, trailing, badge, icon, layout, children, labelProps, radioRef, ref, error, disabled, id: idProp, className, ...radioProps }: RadioCardProps): react_jsx_runtime.JSX.Element;

type SegmentedRadioSize = "sm" | "md" | "lg";
type PrimitiveRootProps$1 = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;
interface SegmentedRadioProps extends PrimitiveRootProps$1 {
    size?: SegmentedRadioSize;
    error?: boolean;
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
declare function SegmentedRadio({ size, error, className, orientation, disabled, ref, ...props }: SegmentedRadioProps): react_jsx_runtime.JSX.Element;
interface SegmentedRadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
declare function SegmentedRadioItem({ className, ref, children, ...props }: SegmentedRadioItemProps): react_jsx_runtime.JSX.Element;

type PillRadioSize = "sm" | "md" | "lg";
type PrimitiveRootProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;
interface PillRadioProps extends PrimitiveRootProps {
    size?: PillRadioSize;
    error?: boolean;
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
declare function PillRadio({ size, error, className, orientation, disabled, ref, ...props }: PillRadioProps): react_jsx_runtime.JSX.Element;
interface PillRadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
declare function PillRadioItem({ className, ref, children, ...props }: PillRadioItemProps): react_jsx_runtime.JSX.Element;

export { PillRadio, PillRadioItem, type PillRadioItemProps, type PillRadioProps, type PillRadioSize, RadioCard, type RadioCardLayout, type RadioCardProps, RadioField, type RadioFieldProps, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, type RadioSize, SegmentedRadio, SegmentedRadioItem, type SegmentedRadioItemProps, type SegmentedRadioProps, type SegmentedRadioSize };
