import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "@virtari-packages/react-icons";
import { useCheckboxGroupContext } from "./context";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Proportional size — sm (14px), md (18px), lg (22px) */
  size?: CheckboxSize;
  /** Paints the danger ramp + sets aria-invalid. Inherited from CheckboxGroup if unset. */
  error?: boolean;
  ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}

export function Checkbox({
  size = "md",
  error,
  disabled,
  className,
  ref,
  ...props
}: CheckboxProps) {
  const group = useCheckboxGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn("vds-checkbox", className)}
      data-size={size}
      data-error={resolvedError ? "" : undefined}
      disabled={resolvedDisabled}
      aria-invalid={resolvedError || undefined}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="vds-checkbox-indicator">
        <span className="vds-checkbox-glyph vds-checkbox-glyph--checked">
          <IconCheck
            className="vds-checkbox-check"
            size={12}
            stroke={2.5}
            aria-hidden
            focusable={false}
          />
        </span>
        <span className="vds-checkbox-glyph vds-checkbox-glyph--indeterminate">
          <IconMinus
            className="vds-checkbox-indeterminate"
            size={12}
            stroke={2.5}
            aria-hidden
            focusable={false}
          />
        </span>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
