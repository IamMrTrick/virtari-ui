import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Proportional size — sm (14px), md (18px), lg (22px) */
  size?: CheckboxSize;
  ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}

export function Checkbox({ size = "md", className, ref, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn("vds-checkbox", className)}
      data-size={size}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="vds-checkbox-indicator">
        <svg
          className="vds-checkbox-check"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="vds-checkbox-indeterminate"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 6H9.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
