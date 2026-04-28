'use strict';

var utils = require('@virtari-packages/utils');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/Chip.tsx
function Chip({
  variant = "default",
  size = "md",
  appearance = "soft",
  interactive = false,
  disabled = false,
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "span";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      className: utils.cn("vds-chip", className),
      "data-variant": variant,
      "data-size": size,
      "data-appearance": appearance,
      "data-interactive": interactive ? "true" : void 0,
      "aria-disabled": disabled || void 0,
      ...props
    }
  );
}
function ChipIcon({
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "span";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      className: utils.cn("vds-chip-icon", className),
      "aria-hidden": "true",
      ...props
    }
  );
}
function ChipLabel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: utils.cn("vds-chip-label", className),
      ...props
    }
  );
}
function ChipRemove({
  asChild = false,
  className,
  type,
  "aria-label": ariaLabel,
  children,
  ref,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      type: asChild ? void 0 : type ?? "button",
      className: utils.cn("vds-chip-remove", className),
      "aria-label": ariaLabel ?? "Remove",
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6L6 18M6 6l12 12" })
        }
      )
    }
  );
}

exports.Chip = Chip;
exports.ChipIcon = ChipIcon;
exports.ChipLabel = ChipLabel;
exports.ChipRemove = ChipRemove;
