import { cn } from "@virtari-packages/utils";
import {
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from "react";
import { RadioGroupItem, type RadioGroupItemProps } from "./RadioGroup";
import { useRadioGroupContext } from "./context";

export interface RadioFieldProps extends Omit<RadioGroupItemProps, "ref"> {
  label: ReactNode;
  description?: ReactNode;
  /** Extra props forwarded to the wrapping <label>. */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Override the ref target for the underlying radio. */
  radioRef?: RadioGroupItemProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}

export function RadioField({
  label,
  description,
  labelProps,
  radioRef,
  ref,
  error,
  disabled,
  id: idProp,
  className,
  ...radioProps
}: RadioFieldProps) {
  const group = useRadioGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedSize = radioProps.size ?? group?.size ?? "md";

  const reactId = useId();
  const inputId = idProp ?? `vds-radio-field-${reactId}`;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy, ...restRadioProps } = radioProps;

  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  return (
    <label
      ref={ref}
      htmlFor={inputId}
      className={cn("vds-radio-field", labelClassName)}
      data-size={resolvedSize}
      data-has-description={description ? "" : undefined}
      data-error={resolvedError ? "" : undefined}
      data-disabled={resolvedDisabled ? "" : undefined}
      {...restLabelProps}
    >
      <RadioGroupItem
        ref={radioRef}
        id={inputId}
        error={resolvedError}
        disabled={resolvedDisabled}
        className={className}
        {...restRadioProps}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : labelId)}
        aria-describedby={[ariaDescribedBy, description ? descriptionId : null].filter(Boolean).join(" ") || undefined}
      />
      <span className="vds-radio-field-text">
        <span className="vds-radio-field-main">
          <span id={labelId} className="vds-radio-field-label">{label}</span>
        </span>
        {description ? (
          <span id={descriptionId} className="vds-radio-field-description">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
