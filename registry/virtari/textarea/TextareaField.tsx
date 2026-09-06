import { forwardRef } from "react";
import {
  Field,
  composeFieldDescribedBy,
  hasFieldContent,
  type FieldProps,
} from "../fieldset";
import { cn, useComposedRefs, useFormReset } from "../../lib/utils";
import { useId, useState, useRef } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import { Textarea, type TextareaProps } from "./Textarea";

type AriaInvalidValue = TextareaProps["aria-invalid"] | boolean | undefined;

export interface TextareaFieldProps
  extends Omit<
      FieldProps,
      | keyof TextareaProps
      | "children"
      | "controlId"
      | "counter"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<TextareaProps, "className" | "ref" | "style"> {
  counter?: ReactNode;
  className?: string;
  style?: CSSProperties;
  textareaClassName?: string;
  textareaStyle?: CSSProperties;
  showCounter?: boolean;
  counterFormatter?: (current: number, maxLength?: number) => ReactNode;
  invalid?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

function isInvalid(value: AriaInvalidValue) {
  return value !== undefined && value !== false && value !== "false";
}

function resolveTextValue(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function defaultCounterFormatter(current: number, maxLength?: number) {
  return maxLength !== undefined ? `${current}/${maxLength}` : current;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField({
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
  textareaClassName,
  textareaStyle,
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
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}, ref) {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const mergedRef = useComposedRefs(localRef, ref);
  const generatedId = useId();
  const controlId = id ?? `vds-textarea-field-${generatedId}`;
  const descriptionId = hasFieldContent(description)
    ? `${controlId}-description`
    : undefined;
  const errorId = hasFieldContent(error) ? `${controlId}-error` : undefined;
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
      className={cn("vds-textarea-field", className)}
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
      <Textarea
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
        className={textareaClassName}
        style={textareaStyle}
      />
    </Field>
  );
});
