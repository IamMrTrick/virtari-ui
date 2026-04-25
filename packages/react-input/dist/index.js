import { cn } from '@virtari-packages/utils';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { composeFieldDescribedBy, Field } from '@virtari-packages/react-fieldset';
import { IconEyeOff, IconEye } from '@virtari-packages/react-icons';
import { useId, useState } from 'react';

// src/Input.tsx
function Input({ inputSize = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      className: cn("vds-input", className),
      "data-size": inputSize,
      ...props
    }
  );
}
function InputWrapper({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-input-wrapper", className), ...props });
}
function InputIcon({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn("vds-input-icon", className),
      "aria-hidden": "true",
      ...props
    }
  );
}
function InputGroup({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-input-group", className), ...props });
}
function InputAddon({
  side = "start",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn("vds-input-addon", className),
      "data-side": side,
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
function getPasswordStrength(value) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(score, 4);
}
function defaultCounterFormatter(current, maxLength) {
  return maxLength ? `${current}/${maxLength}` : current;
}
function defaultStrengthFormatter(score) {
  const labels = ["Very weak", "Weak", "Fair", "Strong", "Excellent"];
  return labels[score] ?? labels[0];
}
function InputField({
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
  showCounter,
  counterFormatter = defaultCounterFormatter,
  revealable = false,
  showStrengthMeter = false,
  strengthFormatter = defaultStrengthFormatter,
  afterControl,
  invalid,
  ref,
  id,
  value,
  defaultValue,
  onChange,
  type = "text",
  required,
  disabled,
  maxLength,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}) {
  const generatedId = useId();
  const controlId = id ?? `vds-input-field-${generatedId}`;
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
  const [revealed, setRevealed] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue)
  );
  const isControlled = value !== void 0;
  const currentValue = isControlled ? resolveTextValue(value) : uncontrolledValue;
  const currentLength = currentValue.length;
  const resolvedCounter = counter ?? (showCounter ? counterFormatter(currentLength, maxLength) : void 0);
  const canReveal = revealable && type === "password";
  const resolvedType = canReveal && revealed ? "text" : type;
  const strengthScore = showStrengthMeter && type === "password" ? getPasswordStrength(currentValue) : 0;
  const resolvedAfterControl = showStrengthMeter && type === "password" && currentValue ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "vds-input-field-strength",
        "data-score": strengthScore,
        style: {
          "--vds-input-strength-score": strengthScore
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "vds-input-field-strength-bar",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx("span", { className: "vds-input-field-strength-fill" })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "vds-input-field-strength-label", children: strengthFormatter(strengthScore, currentValue) })
        ]
      }
    ),
    afterControl
  ] }) : afterControl;
  return /* @__PURE__ */ jsx(
    Field,
    {
      className: cn("vds-input-field", className),
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
      afterControl: resolvedAfterControl,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "vds-input-field-control",
          "data-has-action": canReveal || void 0,
          children: [
            /* @__PURE__ */ jsx(
              Input,
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
                type: resolvedType,
                required,
                disabled,
                maxLength,
                "aria-describedby": describedBy,
                "aria-invalid": resolvedInvalid || void 0,
                className: inputClassName,
                style: inputStyle
              }
            ),
            canReveal ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "vds-input-field-action",
                "aria-label": revealed ? "Hide password" : "Show password",
                "aria-pressed": revealed,
                onClick: () => setRevealed((open) => !open),
                children: revealed ? /* @__PURE__ */ jsx(IconEyeOff, { size: 16, stroke: 1.75, "aria-hidden": true }) : /* @__PURE__ */ jsx(IconEye, { size: 16, stroke: 1.75, "aria-hidden": true })
              }
            ) : null
          ]
        }
      )
    }
  );
}

export { Input, InputAddon, InputField, InputGroup, InputIcon, InputWrapper };
