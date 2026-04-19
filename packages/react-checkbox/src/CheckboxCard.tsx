import { cn } from "@virtari/utils";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import { useCheckboxGroupContext } from "./context";

export type CheckboxCardLayout = "row" | "icon-grid";

export interface CheckboxCardProps extends Omit<CheckboxProps, "ref"> {
  label: ReactNode;
  description?: ReactNode;
  /** Right-aligned content in row layout: price, meta, etc. */
  trailing?: ReactNode;
  /** Small chip rendered under the label (e.g. "Recommended"). */
  badge?: ReactNode;
  /** Icon node rendered in the icon container (icon-grid layout by default). */
  icon?: ReactNode;
  /**
   * Defaults to "row". Auto-switches to "icon-grid" when `icon` is provided
   * unless explicitly overridden.
   */
  layout?: CheckboxCardLayout;
  /** Extra props on the wrapping <label> (className, style, data-*). */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Optional ref on the underlying Checkbox. */
  checkboxRef?: CheckboxProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}

export function CheckboxCard({
  label,
  description,
  trailing,
  badge,
  icon,
  layout,
  labelProps,
  checkboxRef,
  ref,
  error,
  disabled,
  className,
  ...checkboxProps
}: CheckboxCardProps) {
  const group = useCheckboxGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedLayout: CheckboxCardLayout =
    layout ?? (icon ? "icon-grid" : "row");

  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  return (
    <label
      ref={ref}
      className={cn("vds-checkbox-card", labelClassName)}
      data-layout={resolvedLayout}
      data-error={resolvedError ? "" : undefined}
      data-disabled={resolvedDisabled ? "" : undefined}
      {...restLabelProps}
    >
      <Checkbox
        ref={checkboxRef}
        className={cn("vds-checkbox-card-input", className)}
        error={resolvedError}
        disabled={resolvedDisabled}
        {...checkboxProps}
      />

      {resolvedLayout === "icon-grid" ? (
        <div className="vds-checkbox-card-body">
          {icon ? (
            <span className="vds-checkbox-card-icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <span className="vds-checkbox-card-text">
            <span className="vds-checkbox-card-label">{label}</span>
            {description ? (
              <span className="vds-checkbox-card-description">
                {description}
              </span>
            ) : null}
            {badge ? (
              <span className="vds-checkbox-card-badge">{badge}</span>
            ) : null}
          </span>
        </div>
      ) : (
        <div className="vds-checkbox-card-body">
          <span className="vds-checkbox-card-text">
            <span className="vds-checkbox-card-label-row">
              <span className="vds-checkbox-card-label">{label}</span>
              {trailing ? (
                <span className="vds-checkbox-card-trailing">{trailing}</span>
              ) : null}
            </span>
            {description ? (
              <span className="vds-checkbox-card-description">
                {description}
              </span>
            ) : null}
            {badge ? (
              <span className="vds-checkbox-card-badge">{badge}</span>
            ) : null}
          </span>
        </div>
      )}
    </label>
  );
}
