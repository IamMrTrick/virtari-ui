'use strict';

var utils = require('@virtari/utils');
var react = require('react');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/Button.tsx
var Button = react.forwardRef(function Button2({
  color = "primary",
  variant = "solid",
  size = "md",
  asChild = false,
  loading = false,
  loadingText = "Loading",
  leftSection,
  rightSection,
  fullWidth = false,
  effect,
  animation,
  disabled,
  className,
  children,
  ...props
}, forwardedRef) {
  const Comp = asChild ? reactSlot.Slot : "button";
  const isDisabled = disabled || loading;
  const resolvedColor = variant === "destructive" ? "danger" : color;
  const resolvedVariant = variant === "destructive" ? "solid" : variant;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      Comp,
      {
        ref: forwardedRef,
        className: utils.cn("vds-button", className),
        "data-color": resolvedColor,
        "data-variant": resolvedVariant,
        "data-size": size,
        "data-loading": loading || void 0,
        "data-full-width": fullWidth || void 0,
        "data-effect": effect || void 0,
        "data-animation": animation || void 0,
        disabled: isDisabled,
        "aria-disabled": isDisabled || void 0,
        "aria-label": loading ? loadingText : void 0,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-spinner", "aria-hidden": "true" }),
          leftSection && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-section", "data-position": "start", children: leftSection }),
          /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slottable, { children }),
          rightSection && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-section", "data-position": "end", children: rightSection })
        ]
      }
    ),
    loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-sr-only", role: "status", "aria-live": "polite", children: loadingText })
  ] });
});
Button.displayName = "Button";

exports.Button = Button;
