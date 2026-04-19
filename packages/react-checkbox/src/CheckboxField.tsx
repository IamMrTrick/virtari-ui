import { cn } from "@virtari/utils";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import { useCheckboxGroupContext } from "./context";

export interface CheckboxFieldProps extends Omit<CheckboxProps, "ref"> {
  label: ReactNode;
  description?: ReactNode;
  /** Extra props forwarded to the wrapping <label> (class, style, onClick). */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Override the ref target for the underlying checkbox. */
  checkboxRef?: CheckboxProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}

export function CheckboxField({
  label,
  description,
  labelProps,
  checkboxRef,
  ref,
  error,
  disabled,
  className,
  ...checkboxProps
}: CheckboxFieldProps) {
  const group = useCheckboxGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;

  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  return (
    <label
      ref={ref}
      className={cn("vds-checkbox-field", labelClassName)}
      data-error={resolvedError ? "" : undefined}
      data-disabled={resolvedDisabled ? "" : undefined}
      {...restLabelProps}
    >
      <Checkbox
        ref={checkboxRef}
        error={resolvedError}
        disabled={resolvedDisabled}
        className={className}
        {...checkboxProps}
      />
      <span className="vds-checkbox-field-text">
        <span className="vds-checkbox-field-label">{label}</span>
        {description ? (
          <span className="vds-checkbox-field-description">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
