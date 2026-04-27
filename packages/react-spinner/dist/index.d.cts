import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type SpinnerVariant = "ring" | "segments" | "dots" | "bars" | "ripple" | "orbit";
type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerColor = "primary" | "success" | "warning" | "danger" | "info" | "accent" | "neutral" | "current";
type SpinnerSpeed = "slow" | "normal" | "fast";
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: SpinnerVariant;
    size?: SpinnerSize;
    color?: SpinnerColor;
    speed?: SpinnerSpeed;
    label?: string;
    ref?: Ref<HTMLSpanElement>;
}
declare function Spinner({ variant, size, color, speed, label, className, ref, ...props }: SpinnerProps): react_jsx_runtime.JSX.Element;

export { Spinner, type SpinnerColor, type SpinnerProps, type SpinnerSize, type SpinnerSpeed, type SpinnerVariant };
