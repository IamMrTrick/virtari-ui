import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ReactNode, Ref } from 'react';

type StepperSize = "sm" | "md" | "lg";
type StepperOrientation = "horizontal" | "vertical";
type StepperStepStatus = "complete" | "active" | "pending" | "error";
type StepperVariant = "default" | "soft" | "outlined" | "minimal" | "cards";
type StepperTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
type StepperAnimation = "none" | "fade" | "slide" | "scale" | "pulse";
type StepperLine = "solid" | "dashed" | "gradient";
interface StepperProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
    /** Index (0-based) of the current active step. */
    activeStep: number;
    orientation?: StepperOrientation;
    size?: StepperSize;
    variant?: StepperVariant;
    tone?: StepperTone;
    animation?: StepperAnimation;
    line?: StepperLine;
    children: ReactNode;
    ref?: Ref<HTMLOListElement>;
}
interface StepperStepProps extends HTMLAttributes<HTMLLIElement> {
    /** 0-based index, injected automatically by Stepper. */
    index?: number;
    label: string;
    description?: string;
    /** Replaces the automatic number/check/error indicator for this step. */
    indicator?: ReactNode;
    /** Override auto-derived status. */
    status?: StepperStepStatus;
    ref?: Ref<HTMLLIElement>;
}
interface StepperIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    index?: number;
    status?: StepperStepStatus;
    ref?: Ref<HTMLSpanElement>;
}
declare function StepperIndicator({ index, status, className, children, ref, ...props }: StepperIndicatorProps): react_jsx_runtime.JSX.Element;
declare function StepperStep({ index, label, description, indicator, status, className, style, children, ref, ...props }: StepperStepProps): react_jsx_runtime.JSX.Element;
declare function Stepper({ activeStep, orientation, size, variant, tone, animation, line, className, children, ref, ...props }: StepperProps): react_jsx_runtime.JSX.Element;

export { Stepper, type StepperAnimation, StepperIndicator, type StepperIndicatorProps, type StepperLine, type StepperOrientation, type StepperProps, type StepperSize, StepperStep, type StepperStepProps, type StepperStepStatus, type StepperTone, type StepperVariant };
