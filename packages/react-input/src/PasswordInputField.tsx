import {
  Field,
  composeFieldDescribedBy,
  type FieldProps,
} from "@virtari-packages/react-fieldset";
import { cn } from "@virtari-packages/utils";
import { useId, useState } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import {
  PasswordInput,
  type PasswordInputProps,
} from "./PasswordInput";

type AriaInvalidValue = PasswordInputProps["aria-invalid"] | boolean | undefined;

export interface PasswordInputFieldProps
  extends Omit<
      FieldProps,
      | keyof PasswordInputProps
      | "afterControl"
      | "children"
      | "controlId"
      | "counter"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<
      PasswordInputProps,
      "className" | "ref" | "rootClassName" | "rootStyle" | "style"
    > {
  counter?: ReactNode;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  passwordRootClassName?: string;
  passwordRootStyle?: CSSProperties;
  showCounter?: boolean;
  counterFormatter?: (current: number, maxLength?: number) => ReactNode;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}

function isInvalid(value: AriaInvalidValue) {
  return value !== undefined && value !== false && value !== "false";
}

function resolveTextValue(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.join("");
  return "";
}

function defaultCounterFormatter(current: number, maxLength?: number) {
  return maxLength ? `${current}/${maxLength}` : current;
}

export function PasswordInputField({
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
  inputClassName,
  inputStyle,
  passwordRootClassName,
  passwordRootStyle,
  showCounter,
  counterFormatter = defaultCounterFormatter,
  invalid,
  ref,
  id,
  value,
  defaultValue,
  onChange,
  required,
  disabled,
  maxLength,
  showRequirements = false,
  strengthOptions,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: PasswordInputFieldProps) {
  const generatedId = useId();
  const controlId = id ?? `vds-password-input-field-${generatedId}`;
  const descriptionId = description
    ? `${controlId}-description`
    : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const hasCounter = counter !== undefined || showCounter;
  const counterId = hasCounter ? `${controlId}-counter` : undefined;
  const strengthId = `${controlId}-strength`;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId,
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue),
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled
    ? resolveTextValue(value)
    : uncontrolledValue;
  const resolvedCounter =
    counter ??
    (showCounter
      ? counterFormatter(currentValue.length, maxLength)
      : undefined);

  return (
    <Field
      className={cn("vds-password-input-field", className)}
      style={style}
      label={label}
      labelProps={labelProps}
      description={description}
      error={error}
      counter={resolvedCounter}
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
      <PasswordInput
        {...props}
        ref={ref}
        id={controlId}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          if (!isControlled) setUncontrolledValue(event.target.value);
          onChange?.(event);
        }}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        aria-describedby={describedBy}
        aria-invalid={resolvedInvalid || undefined}
        className={inputClassName}
        style={inputStyle}
        rootClassName={passwordRootClassName}
        rootStyle={passwordRootStyle}
        showRequirements={showRequirements}
        strengthOptions={strengthOptions}
        strengthId={strengthId}
      />
    </Field>
  );
}
