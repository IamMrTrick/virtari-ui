import { cn } from '@virtari-packages/utils';
import { Chip, ChipLabel, ChipRemove } from '@virtari-packages/react-chip';
import { useRef, useId } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/TagInput.tsx
function normalize(val) {
  return val.trim();
}
function TagInput({
  value,
  onChange,
  maxTags,
  allowDuplicates = false,
  validate,
  delimiters = [","],
  size = "md",
  disabled,
  invalid,
  placeholder,
  className,
  ref,
  id,
  ...rest
}) {
  const inputRef = useRef(null);
  const autoId = useId();
  const inputId = id ?? autoId;
  const addTag = (raw) => {
    const tag = normalize(raw);
    if (!tag) return;
    if (maxTags !== void 0 && value.length >= maxTags) return;
    if (!allowDuplicates && value.includes(tag)) return;
    if (validate) {
      const result = validate(tag);
      if (result !== true && result !== void 0) return;
    }
    onChange([...value, tag]);
  };
  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };
  const handleKeyDown = (e) => {
    const input = e.currentTarget;
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input.value);
      input.value = "";
      return;
    }
    if (e.key === "Backspace" && input.value === "" && value.length > 0) {
      removeTag(value.length - 1);
      return;
    }
    if (delimiters.includes(e.key)) {
      e.preventDefault();
      addTag(input.value);
      input.value = "";
    }
  };
  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text");
    const delimRegex = new RegExp(`[${delimiters.map((d) => `\\${d}`).join("")}
\r]`);
    const parts = text.split(delimRegex);
    if (parts.length > 1) {
      e.preventDefault();
      for (const part of parts) {
        addTag(part);
      }
    }
  };
  const isAtMax = maxTags !== void 0 && value.length >= maxTags;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("vds-tag-input", className),
      "data-size": size,
      "data-invalid": invalid || void 0,
      "data-disabled": disabled || void 0,
      onClick: () => inputRef.current?.focus(),
      role: "presentation",
      children: [
        value.map((tag, i) => /* @__PURE__ */ jsxs(Chip, { size: size === "md" ? "md" : size, "data-tag": "", children: [
          /* @__PURE__ */ jsx(ChipLabel, { children: tag }),
          !disabled && /* @__PURE__ */ jsx(
            ChipRemove,
            {
              "aria-label": `Remove ${tag}`,
              onClick: (e) => {
                e.stopPropagation();
                removeTag(i);
              }
            }
          )
        ] }, `${tag}-${i}`)),
        !isAtMax && /* @__PURE__ */ jsx(
          "input",
          {
            ref: (node) => {
              if (ref) {
                if (typeof ref === "function") ref(node);
                else ref.current = node;
              }
              inputRef.current = node;
            },
            id: inputId,
            className: "vds-tag-input-field",
            type: "text",
            disabled,
            placeholder: value.length === 0 ? placeholder : void 0,
            onKeyDown: handleKeyDown,
            onPaste: handlePaste,
            autoComplete: "off",
            ...rest
          }
        )
      ]
    }
  );
}

export { TagInput };
