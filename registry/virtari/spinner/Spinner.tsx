import { cn } from "../../lib/utils";
import type { Ref } from "react";

export type SpinnerVariant = "ring" | "segments" | "dots" | "bars" | "ripple" | "orbit";
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral"
  | "current";
export type SpinnerSpeed = "slow" | "normal" | "fast";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: SpinnerColor;
  speed?: SpinnerSpeed;
  label?: string;
  ref?: Ref<HTMLSpanElement>;
}

export function Spinner({
  variant = "ring",
  size = "md",
  color = "primary",
  speed,
  label = "Loading",
  className,
  ref,
  ...props
}: SpinnerProps) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("vds-spinner", className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-speed={speed}
      {...props}
    >
      {variant === "dots" && (
        <>
          <span className="vds-spinner__dot" aria-hidden="true" />
          <span className="vds-spinner__dot" aria-hidden="true" />
          <span className="vds-spinner__dot" aria-hidden="true" />
        </>
      )}
      {variant === "bars" && (
        <>
          <span className="vds-spinner__bar" aria-hidden="true" />
          <span className="vds-spinner__bar" aria-hidden="true" />
          <span className="vds-spinner__bar" aria-hidden="true" />
          <span className="vds-spinner__bar" aria-hidden="true" />
        </>
      )}
    </span>
  );
}
