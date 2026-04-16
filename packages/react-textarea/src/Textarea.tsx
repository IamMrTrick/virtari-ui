import { cn } from "@virtari/utils";
import type { Ref } from "react";

export type TextareaSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Size preset — controls padding and font-size, shares ramp with Input */
  inputSize?: TextareaSize;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  inputSize = "md",
  className,
  ref,
  ...props
}: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn("vds-textarea", className)}
      data-size={inputSize}
      {...props}
    />
  );
}
