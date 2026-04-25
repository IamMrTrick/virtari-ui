import { cn } from "@virtari-packages/utils";
import {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { StepperContext } from "./context";

export type StepperSize = "sm" | "md" | "lg";
export type StepperOrientation = "horizontal" | "vertical";
export type StepperStepStatus = "complete" | "active" | "pending" | "error";
export type StepperVariant = "default" | "soft" | "outlined" | "minimal" | "cards";
export type StepperTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
export type StepperAnimation = "none" | "fade" | "slide" | "scale" | "pulse";
export type StepperLine = "solid" | "dashed" | "gradient";

export interface StepperProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
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

export interface StepperStepProps extends HTMLAttributes<HTMLLIElement> {
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

export interface StepperIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  index?: number;
  status?: StepperStepStatus;
  ref?: Ref<HTMLSpanElement>;
}

function deriveStatus(index: number, activeStep: number): StepperStepStatus {
  if (index < activeStep) return "complete";
  if (index === activeStep) return "active";
  return "pending";
}

function renderDefaultIndicator(status: StepperStepStatus, index: number, indicator?: ReactNode) {
  if (indicator !== undefined) return indicator;

  if (status === "complete") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (status === "error") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }

  return <span aria-hidden="true">{index + 1}</span>;
}

export function StepperIndicator({ index, status, className, children, ref, ...props }: StepperIndicatorProps) {
  return (
    <span
      ref={ref}
      className={cn("vds-stepper-indicator", className)}
      data-index={index}
      data-status={status}
      {...props}
    >
      {children}
    </span>
  );
}

export function StepperStep({
  index = 0,
  label,
  description,
  indicator,
  status,
  className,
  style,
  children,
  ref,
  ...props
}: StepperStepProps) {
  const { activeStep, totalSteps } = useContext(StepperContext);
  const resolvedStatus = status ?? deriveStatus(index, activeStep);
  const isLast = index === totalSteps - 1;

  return (
    <li
      ref={ref}
      className={cn("vds-stepper-step", className)}
      data-status={resolvedStatus}
      data-last={isLast || undefined}
      aria-current={resolvedStatus === "active" ? "step" : undefined}
      style={
        {
          "--stepper-step-index": index,
          "--stepper-step-delay": `${index * 42}ms`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="vds-stepper-header">
        <StepperIndicator index={index} status={resolvedStatus}>
          {renderDefaultIndicator(resolvedStatus, index, indicator)}
        </StepperIndicator>
        {!isLast && <div className="vds-stepper-connector" aria-hidden="true" />}
      </div>
      <div className="vds-stepper-content">
        <span className="vds-stepper-label">{label}</span>
        {description && <span className="vds-stepper-description">{description}</span>}
        {children}
      </div>
    </li>
  );
}

export function Stepper({
  activeStep,
  orientation = "horizontal",
  size = "md",
  variant = "default",
  tone = "primary",
  animation = "slide",
  line = "solid",
  className,
  children,
  ref,
  ...props
}: StepperProps) {
  const steps = Children.toArray(children);
  const totalSteps = steps.length;

  return (
    <StepperContext.Provider value={{ activeStep, orientation, size, totalSteps }}>
      <ol
        ref={ref}
        className={cn("vds-stepper", className)}
        data-orientation={orientation}
        data-size={size}
        data-variant={variant}
        data-tone={tone}
        data-animation={animation}
        data-line={line}
        aria-label={props["aria-label"] ?? "Progress steps"}
        {...props}
      >
        {steps.map((child, i) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<StepperStepProps>, { index: i })
            : child
        )}
      </ol>
    </StepperContext.Provider>
  );
}
