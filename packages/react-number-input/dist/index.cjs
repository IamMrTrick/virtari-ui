'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var reactIcons = require('@virtari-packages/react-icons');
var jsxRuntime = require('react/jsx-runtime');
var reactFieldset = require('@virtari-packages/react-fieldset');

// src/NumberInput.tsx
function NumberInput({
  value,
  defaultValue,
  onChange,
  onBlur,
  min,
  max,
  step = 1,
  precision,
  clampOnBlur = true,
  inputSize = "md",
  disabled = false,
  readOnly = false,
  invalid = false,
  className,
  ref,
  ...props
}) {
  const inputRef = react.useRef(null);
  const resolvedRef = ref ?? inputRef;
  const clamp = react.useCallback(
    (n) => {
      let v = n;
      if (min !== void 0) v = Math.max(min, v);
      if (max !== void 0) v = Math.min(max, v);
      return precision !== void 0 ? parseFloat(v.toFixed(precision)) : v;
    },
    [min, max, precision]
  );
  const increment = () => {
    if (disabled || readOnly) return;
    const current = value ?? min ?? 0;
    onChange?.(clamp(current + step));
  };
  const decrement = () => {
    if (disabled || readOnly) return;
    const current = value ?? min ?? 0;
    onChange?.(clamp(current - step));
  };
  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      onChange?.(void 0);
      return;
    }
    const n = Number(raw);
    if (!isNaN(n)) onChange?.(n);
  };
  const handleBlur = (e) => {
    if (clampOnBlur && value !== void 0) onChange?.(clamp(value));
    onBlur?.(e);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  };
  const atMin = min !== void 0 && (value ?? -Infinity) <= min;
  const atMax = max !== void 0 && (value ?? Infinity) >= max;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: utils.cn("vds-number-input", className),
      "data-size": inputSize,
      "data-disabled": disabled || void 0,
      "data-invalid": invalid || void 0,
      "data-readonly": readOnly || void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: resolvedRef,
            type: "text",
            inputMode: "numeric",
            role: "spinbutton",
            "aria-valuenow": value,
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-invalid": invalid || void 0,
            disabled,
            readOnly,
            value: value !== void 0 ? String(value) : "",
            defaultValue: defaultValue !== void 0 ? String(defaultValue) : void 0,
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            className: "vds-number-input__field",
            ...props
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-number-input__steppers", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              className: "vds-number-input__step vds-number-input__step--up",
              onClick: increment,
              disabled: disabled || readOnly || atMax,
              children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronUp, { "aria-hidden": true, focusable: false })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              className: "vds-number-input__step vds-number-input__step--down",
              onClick: decrement,
              disabled: disabled || readOnly || atMin,
              children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronDown, { "aria-hidden": true, focusable: false })
            }
          )
        ] })
      ]
    }
  );
}
function isInvalid(value) {
  return value !== void 0 && value !== false && value !== "false";
}
function NumberInputField({
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
}) {
  const generatedId = react.useId();
  const controlId = id ?? `vds-number-input-field-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : void 0;
  const errorId = error ? `${controlId}-error` : void 0;
  const counterId = counter ? `${controlId}-counter` : void 0;
  const describedBy = reactFieldset.composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactFieldset.Field,
    {
      className: utils.cn("vds-number-input-field", className),
      style,
      label,
      labelProps,
      description,
      error,
      counter,
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
      children: /* @__PURE__ */ jsxRuntime.jsx(
        NumberInput,
        {
          ...props,
          ref,
          id: controlId,
          required,
          disabled,
          invalid: resolvedInvalid,
          "aria-describedby": describedBy,
          "aria-invalid": resolvedInvalid || void 0,
          className: numberInputClassName,
          style: numberInputStyle
        }
      )
    }
  );
}

exports.NumberInput = NumberInput;
exports.NumberInputField = NumberInputField;
