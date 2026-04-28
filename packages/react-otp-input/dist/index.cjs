'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/OtpInput.tsx
var PATTERN = {
  numeric: /^\d$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alphabetic: /^[a-zA-Z]$/
};
var PERSIAN_ZERO = 1776;
var ARABIC_ZERO = 1632;
function normalizeDigit(char) {
  const code = char.charCodeAt(0);
  if (code >= PERSIAN_ZERO && code <= PERSIAN_ZERO + 9) {
    return String(code - PERSIAN_ZERO);
  }
  if (code >= ARABIC_ZERO && code <= ARABIC_ZERO + 9) {
    return String(code - ARABIC_ZERO);
  }
  return char;
}
function sanitizeValue(value, type, length, normalizeDigits) {
  const pattern = PATTERN[type];
  return Array.from(value).map((char) => normalizeDigits ? normalizeDigit(char) : char).filter((char) => pattern.test(char)).slice(0, length).join("");
}
function OtpInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  type = "numeric",
  mask = false,
  inputSize = "md",
  disabled = false,
  readOnly = false,
  invalid = false,
  autoFocus = false,
  name,
  required,
  label = "One-time password",
  autoComplete = "one-time-code",
  normalizeDigits = true,
  selectOnFocus = true,
  className,
  ref,
  id,
  dir = "ltr",
  "aria-describedby": ariaDescribedBy,
  ...rootProps
}) {
  const generatedId = react.useId();
  const rootId = id ?? generatedId;
  const inputRefs = react.useRef([]);
  const lastCompletedValue = react.useRef(null);
  const sanitizedValue = react.useMemo(
    () => sanitizeValue(value, type, length, normalizeDigits),
    [value, type, length, normalizeDigits]
  );
  const slots = Array.from({ length }, (_, i) => sanitizedValue[i] ?? "");
  react.useEffect(() => {
    if (sanitizedValue.length < length) lastCompletedValue.current = null;
  }, [sanitizedValue, length]);
  const focusSlot = react.useCallback((index, select = true) => {
    const el = inputRefs.current[index];
    if (!el) return;
    el.focus();
    if (select) el.select();
  }, []);
  const commitValue = react.useCallback(
    (nextValue) => {
      const next = sanitizeValue(nextValue, type, length, normalizeDigits);
      onChange?.(next);
      if (next.length === length) {
        if (lastCompletedValue.current !== next) {
          lastCompletedValue.current = next;
          onComplete?.(next);
        }
        return;
      }
      lastCompletedValue.current = null;
    },
    [type, length, normalizeDigits, onChange, onComplete]
  );
  const insertValue = react.useCallback(
    (index, incoming) => {
      const inserted = sanitizeValue(incoming, type, length, normalizeDigits);
      if (!inserted) return;
      const startIndex = inserted.length >= length ? 0 : Math.min(index, sanitizedValue.length);
      const chars = Array.from(sanitizedValue);
      for (let i = 0; i < inserted.length && startIndex + i < length; i += 1) {
        chars[startIndex + i] = inserted[i];
      }
      const next = chars.join("").slice(0, length);
      commitValue(next);
      focusSlot(Math.min(startIndex + inserted.length, length - 1));
    },
    [commitValue, focusSlot, length, normalizeDigits, sanitizedValue, type]
  );
  const handleChange = react.useCallback(
    (index, incoming) => {
      if (readOnly) return;
      if (!incoming) {
        const chars = Array.from(sanitizedValue);
        chars.splice(index, 1);
        commitValue(chars.join(""));
        return;
      }
      insertValue(index, incoming);
    },
    [commitValue, insertValue, readOnly, sanitizedValue]
  );
  const handleKeyDown = react.useCallback(
    (index, e) => {
      if (disabled || readOnly) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        const chars = Array.from(sanitizedValue);
        if (slots[index]) {
          chars.splice(index, 1);
          commitValue(chars.join(""));
        } else if (index > 0) {
          chars.splice(index - 1, 1);
          commitValue(chars.join(""));
          focusSlot(index - 1);
        }
      } else if (e.key === "Delete") {
        e.preventDefault();
        if (!slots[index]) return;
        const chars = Array.from(sanitizedValue);
        chars.splice(index, 1);
        commitValue(chars.join(""));
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusSlot(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusSlot(index + 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusSlot(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusSlot(Math.min(sanitizedValue.length, length - 1));
      }
    },
    [commitValue, disabled, focusSlot, length, readOnly, sanitizedValue, slots]
  );
  const handlePaste = react.useCallback(
    (index, e) => {
      if (readOnly) return;
      e.preventDefault();
      insertValue(index, e.clipboardData.getData("text"));
    },
    [insertValue, readOnly]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      id: rootId,
      role: "group",
      "aria-label": label,
      "aria-describedby": ariaDescribedBy,
      "aria-disabled": disabled || void 0,
      "aria-invalid": invalid || void 0,
      className: utils.cn("vds-otp-input", className),
      "data-size": inputSize,
      "data-readonly": readOnly || void 0,
      "data-complete": sanitizedValue.length === length || void 0,
      dir,
      ...rootProps,
      children: [
        slots.map((char, i) => /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: (el) => {
              inputRefs.current[i] = el;
            },
            type: "text",
            inputMode: type === "numeric" ? "numeric" : "text",
            autoComplete: i === 0 ? autoComplete : "off",
            autoCapitalize: type === "numeric" ? "none" : "characters",
            autoCorrect: "off",
            spellCheck: false,
            pattern: type === "numeric" ? "[0-9]*" : void 0,
            maxLength: i === 0 ? length : 1,
            value: char,
            required,
            disabled,
            readOnly,
            "aria-invalid": invalid || void 0,
            "aria-label": `${label}, character ${i + 1} of ${length}`,
            "aria-describedby": ariaDescribedBy,
            autoFocus: autoFocus && i === 0,
            enterKeyHint: i === length - 1 ? "done" : "next",
            className: "vds-otp-input__slot",
            "data-filled": char ? "" : void 0,
            "data-mask": mask || void 0,
            onChange: (e) => handleChange(i, e.target.value),
            onKeyDown: (e) => handleKeyDown(i, e),
            onPaste: (e) => handlePaste(i, e),
            onFocus: (e) => {
              if (selectOnFocus) e.target.select();
            }
          },
          i
        )),
        name ? /* @__PURE__ */ jsxRuntime.jsx("input", { type: "hidden", name, value: sanitizedValue, readOnly: true }) : null
      ]
    }
  );
}

exports.OtpInput = OtpInput;
