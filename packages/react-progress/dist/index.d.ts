import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

type ProgressColor = "primary" | "success" | "warning" | "danger" | "info" | "accent" | "contrast";
type ProgressVariant = "solid" | "striped" | "gradient";
type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
type ProgressAnimation = "pulse" | "glow";
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof ProgressPrimitive.Root>>;
    color?: ProgressColor | (string & {});
    variant?: ProgressVariant;
    size?: ProgressSize;
    animated?: boolean | ProgressAnimation;
    showLabel?: boolean;
}
declare function Progress({ className, value, color, variant, size, animated, showLabel, style, ref, ...props }: ProgressProps): react_jsx_runtime.JSX.Element;

export { Progress, type ProgressAnimation, type ProgressColor, type ProgressProps, type ProgressSize, type ProgressVariant };
