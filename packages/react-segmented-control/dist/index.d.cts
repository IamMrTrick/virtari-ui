import * as react_jsx_runtime from 'react/jsx-runtime';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Ref, ComponentRef, ReactNode } from 'react';

type SegmentedControlSize = "sm" | "md" | "lg";
type PrimitiveRootProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;
type PrimitiveItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;
interface SegmentedControlProps extends Omit<PrimitiveRootProps, "orientation"> {
    size?: SegmentedControlSize;
    /** Expand to fill parent width. */
    fullWidth?: boolean;
    /** Vertical stacking layout. */
    orientation?: "horizontal" | "vertical";
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
interface SegmentedControlItemProps extends PrimitiveItemProps {
    /** Leading icon before label text. */
    icon?: ReactNode;
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
declare function SegmentedControl({ size, fullWidth, orientation, disabled, className, children, ref, ...props }: SegmentedControlProps): react_jsx_runtime.JSX.Element;
declare function SegmentedControlItem({ icon, className, children, ref, ...props }: SegmentedControlItemProps): react_jsx_runtime.JSX.Element;

export { SegmentedControl, SegmentedControlItem, type SegmentedControlItemProps, type SegmentedControlProps, type SegmentedControlSize };
