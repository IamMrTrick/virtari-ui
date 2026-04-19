'use strict';

var utils = require('@virtari-packages/utils');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/Alert.tsx
function Alert({
  variant = "info",
  size = "md",
  appearance = "soft",
  asChild = false,
  className,
  ref,
  role,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "div";
  const resolvedRole = role ?? (variant === "danger" ? "alert" : "status");
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      className: utils.cn("vds-alert", className),
      "data-variant": variant,
      "data-size": size,
      "data-appearance": appearance,
      role: resolvedRole,
      ...props
    }
  );
}
function AlertIcon({
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
      className: utils.cn("vds-alert-icon", className),
      "aria-hidden": "true",
      ...props
    }
  );
}
function AlertContent({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-alert-content", className),
      ...props
    }
  );
}
function AlertTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "h5",
    {
      ref,
      className: utils.cn("vds-alert-title", className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      ref,
      className: utils.cn("vds-alert-description", className),
      ...props
    }
  );
}
function AlertClose({
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
      className: utils.cn("vds-alert-close", className),
      "aria-label": ariaLabel ?? "Dismiss",
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6L6 18M6 6l12 12" })
        }
      )
    }
  );
}

exports.Alert = Alert;
exports.AlertClose = AlertClose;
exports.AlertContent = AlertContent;
exports.AlertDescription = AlertDescription;
exports.AlertIcon = AlertIcon;
exports.AlertTitle = AlertTitle;
