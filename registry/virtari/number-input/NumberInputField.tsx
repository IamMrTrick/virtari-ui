import {
  Field,
  composeFieldDescribedBy,
  hasFieldContent,
  type FieldProps,
} from "../fieldset";
import { cn } from "../../lib/utils";
import { useId } from "react";
import type { CSSProperties, Ref } from "react";
import {
  NumberInput,
  type NumberInputProps,
} from "./NumberInput";

type AriaInvalidValue = NumberInputProps["aria-invalid"] | boolean | undefined;

export interface NumberInputFieldProps
  extends Omit<
      FieldProps,
      | keyof NumberInputProps
      | "children"
      | "controlId"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<NumberInputProps, "className" | "ref" | "style"> {
  className?: string;
  style?: CSSProperties;
  numberInputClassName?: string;
  numberInputStyle?: CSSProperties;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}

function isInvalid(value: AriaInvalidValue) {
  return value !== undefined && value !== false && value !== "false";
}

export function NumberInputField({
  label,
  description,
  error,
  counter,
  metaLayout,
  descriptionAlign,
  errorAlign,
  counterAlign,
  labelProps,
  className,
  style,
  numberInputClassName,
  numberInputStyle,
  invalid,
  ref,
  id,
  required,
  disabled,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: NumberInputFieldProps) {
  const generatedId = useId();
  const controlId = id ?? `vds-number-input-field-${generatedId}`;
  const descriptionId = hasFieldContent(description)
    ? `${controlId}-description`
    : undefined;
  const errorId = hasFieldContent(error) ? `${controlId}-error` : undefined;
  const counterId = hasFieldContent(counter) ? `${controlId}-counter` : undefined;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId,
  );
  const resolvedInvalid = invalid ?? (ariaInvalid !== undefined ? isInvalid(ariaInvalid) : hasFieldContent(error));

  return (
    <Field
      className={cn("vds-number-input-field", className)}
      style={style}
      label={label}
      labelProps={labelProps}
      description={description}
      error={error}
      counter={counter}
      invalid={resolvedInvalid}
      required={required}
      disabled={disabled}
      controlId={controlId}
      descriptionId={descriptionId}
      errorId={errorId}
      counterId={counterId}
      metaLayout={metaLayout}
      descriptionAlign={descriptionAlign}
      errorAlign={errorAlign}
      counterAlign={counterAlign}
    >
      <NumberInput
        {...props}
        ref={ref}
        id={controlId}
        required={required}
        disabled={disabled}
        invalid={invalid}
        aria-describedby={describedBy}
        aria-invalid={invalid !== undefined ? invalid : ariaInvalid ?? (resolvedInvalid || undefined)}
        className={numberInputClassName}
        style={numberInputStyle}
      />
    </Field>
  );
}
