import { cn } from "@virtari-packages/utils";
import type { Ref } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: SpinnerSize;
  ref?: Ref<HTMLSpanElement>;
}

export function Spinner({
  size = "md",
  className,
  ref,
  ...props
}: SpinnerProps) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("vds-spinner", className)}
      data-size={size}
      {...props}
    />
  );
}
