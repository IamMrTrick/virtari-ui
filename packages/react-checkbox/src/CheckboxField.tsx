import { cn } from "@virtari-packages/utils";
import { useId, type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";
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
  const textId = useId();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedSize = checkboxProps.size ?? "md";

  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  return (
    <label
      ref={ref}
      className={cn("vds-checkbox-field", labelClassName)}
      data-size={resolvedSize}
      data-has-description={description ? "" : undefined}
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
        aria-labelledby={checkboxProps["aria-labelledby"] ?? (checkboxProps["aria-label"] ? undefined : `${textId}-label`)}
        aria-describedby={[checkboxProps["aria-describedby"], description ? `${textId}-description` : undefined].filter(Boolean).join(" ") || undefined}
      />
      <span className="vds-checkbox-field-text">
        <span className="vds-checkbox-field-main">
          <span id={`${textId}-label`} className="vds-checkbox-field-label">{label}</span>
        </span>
        {description ? (
          <span id={`${textId}-description`} className="vds-checkbox-field-description">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
