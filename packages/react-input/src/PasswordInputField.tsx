import { forwardRef } from "react";
import {
  Field,
  composeFieldDescribedBy,
  hasFieldContent,
  type FieldProps,
} from "@virtari-packages/react-fieldset";
import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import { useId, useRef, useState } from "react";
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
  return maxLength !== undefined ? `${current}/${maxLength}` : current;
}

export const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(function PasswordInputField({
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
}, ref) {
  const localRef = useRef<HTMLInputElement>(null);
  const mergedRef = useComposedRefs(localRef, ref);
  const generatedId = useId();
  const controlId = id ?? `vds-password-input-field-${generatedId}`;
  const descriptionId = hasFieldContent(description)
    ? `${controlId}-description`
    : undefined;
  const errorId = hasFieldContent(error) ? `${controlId}-error` : undefined;
  const strengthId = `${controlId}-strength`;
  const resolvedInvalid = invalid ?? (ariaInvalid !== undefined ? isInvalid(ariaInvalid) : hasFieldContent(error));
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue),
  );
  useFormReset(localRef, () => setUncontrolledValue(resolveTextValue(defaultValue)), props.form);
  const isControlled = value !== undefined;
  const currentValue = isControlled
    ? resolveTextValue(value)
    : uncontrolledValue;
  const resolvedCounter =
    counter ??
    (showCounter
      ? counterFormatter(currentValue.length, maxLength)
      : undefined);
  const counterId = hasFieldContent(resolvedCounter) ? `${controlId}-counter` : undefined;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId,
  );


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
        ref={mergedRef}
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
        aria-invalid={invalid !== undefined ? invalid : ariaInvalid ?? (resolvedInvalid || undefined)}
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
});
