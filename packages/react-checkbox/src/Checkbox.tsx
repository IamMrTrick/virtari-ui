import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "@virtari/react-icons";

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
        <IconCheck
          className="vds-checkbox-check"
          size={12}
          stroke={2.5}
          aria-hidden
          focusable={false}
        />
        <IconMinus
          className="vds-checkbox-indeterminate"
          size={12}
          stroke={2.5}
          aria-hidden
          focusable={false}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
