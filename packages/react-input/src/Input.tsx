import { cn } from "@virtari-packages/utils";
import type { Ref } from "react";

export type InputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Size preset — shares height ramp with Button, Select, Toggle */
  inputSize?: InputSize;
  ref?: Ref<HTMLInputElement>;
}

export function Input({ inputSize = "md", className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn("vds-input", className)}
      data-size={inputSize}
      {...props}
    />
  );
}
