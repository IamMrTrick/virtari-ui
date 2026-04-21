import { cn } from "@virtari-packages/utils";
import {
  useMemo,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  CheckboxGroupContext,
  useCheckboxGroupContext,
} from "./context";

export type PillCheckboxSize = "sm" | "md" | "lg";

export interface PillCheckboxProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
  size?: PillCheckboxSize;
  error?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  /** Optional form field name; propagated through context for item inheritance. */
  name?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function PillCheckbox({
  size = "md",
  error = false,
  disabled = false,
  orientation = "horizontal",
  name,
  className,
  children,
  ref,
  ...props
}: PillCheckboxProps) {
  const contextValue = useMemo(
    () => ({ disabled, error, name }),
    [disabled, error, name],
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="group"
        aria-invalid={error || undefined}
        aria-disabled={disabled || undefined}
        data-size={size}
        data-error={error ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        data-orientation={orientation}
        className={cn("vds-pill-checkbox", className)}
        {...props}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

export interface PillCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}

export function PillCheckboxItem({
  className,
  disabled,
  ref,
  children,
  ...props
}: PillCheckboxItemProps) {
  const group = useCheckboxGroupContext();
  const resolvedDisabled = disabled ?? group?.disabled ?? false;

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      disabled={resolvedDisabled}
      className={cn("vds-pill-checkbox-item", className)}
      {...props}
    >
      {children}
    </CheckboxPrimitive.Root>
  );
}
