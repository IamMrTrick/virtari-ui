import { cn } from "../../lib/utils";
import {
  useMemo,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from "react";
import * as CheckboxPrimitive from "../../lib/primitives/checkbox";
import { IconCheck, IconMinus } from "../icons";
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
  error,
  disabled,
  orientation = "horizontal",
  name,
  className,
  children,
  ref,
  ...props
}: PillCheckboxProps) {
  const parent = useCheckboxGroupContext();
  const resolvedError = error ?? parent?.error ?? false;
  const resolvedDisabled = disabled ?? parent?.disabled ?? false;
  const resolvedName = name ?? parent?.name;
  const describedBy = parent?.describedBy;
  const contextValue = useMemo(
    () => ({ disabled: resolvedDisabled, error: resolvedError, name: resolvedName, describedBy }),
    [resolvedDisabled, resolvedError, resolvedName, describedBy],
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="group"
        aria-invalid={resolvedError || undefined}
        aria-disabled={resolvedDisabled || undefined}
        data-size={size}
        data-error={resolvedError ? "" : undefined}
        data-disabled={resolvedDisabled ? "" : undefined}
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
  name,
  "aria-describedby": describedBy,
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
      name={name ?? group?.name}
      aria-invalid={group?.error || undefined}
      aria-describedby={[group?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
      className={cn("vds-pill-checkbox-item", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator forceMount className="vds-pill-checkbox-indicator" aria-hidden="true">
        <IconCheck className="vds-pill-checkbox-check" size={14} stroke={2.5} />
        <IconMinus className="vds-pill-checkbox-mixed" size={14} stroke={2.5} />
      </CheckboxPrimitive.Indicator>
      <span className="vds-pill-checkbox-label">{children}</span>
    </CheckboxPrimitive.Root>
  );
}
