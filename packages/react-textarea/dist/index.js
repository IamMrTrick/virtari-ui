import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';
import { composeFieldDescribedBy, Field } from '@virtari-packages/react-fieldset';
import { useId, useState } from 'react';

// src/Textarea.tsx
function Textarea({
  inputSize = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      className: cn("vds-textarea", className),
      "data-size": inputSize,
      ...props
    }
  );
}
function isInvalid(value) {
  return value !== void 0 && value !== false && value !== "false";
}
function resolveTextValue(value) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}
function defaultCounterFormatter(current, maxLength) {
  return maxLength ? `${current}/${maxLength}` : current;
}
function TextareaField({
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
  ref,
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
}) {
  const generatedId = useId();
  const controlId = id ?? `vds-textarea-field-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : void 0;
  const errorId = error ? `${controlId}-error` : void 0;
  const hasCounter = counter !== void 0 || showCounter;
  const counterId = hasCounter ? `${controlId}-counter` : void 0;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue)
  );
  const isControlled = value !== void 0;
  const currentValue = isControlled ? resolveTextValue(value) : uncontrolledValue;
  const resolvedCounter = counter ?? (showCounter ? counterFormatter(currentValue.length, maxLength) : void 0);
  return /* @__PURE__ */ jsx(
    Field,
    {
      className: cn("vds-textarea-field", className),
      style,
      label,
      labelProps,
      description,
      error,
      counter: resolvedCounter,
      invalid: resolvedInvalid,
      required,
      disabled,
      controlId,
      descriptionId,
      errorId,
      counterId,
      metaLayout,
      descriptionAlign,
      errorAlign,
      counterAlign,
      children: /* @__PURE__ */ jsx(
        Textarea,
        {
          ...props,
          ref,
          id: controlId,
          value,
          defaultValue,
          onChange: (event) => {
            if (!isControlled) setUncontrolledValue(event.target.value);
            onChange?.(event);
          },
          required,
          disabled,
          maxLength,
          "aria-describedby": describedBy,
          "aria-invalid": resolvedInvalid || void 0,
          className: textareaClassName,
          style: textareaStyle
        }
      )
    }
  );
}

export { Textarea, TextareaField };
