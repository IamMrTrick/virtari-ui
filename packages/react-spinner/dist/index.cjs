'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Spinner.tsx
function Spinner({
  variant = "ring",
  size = "md",
  color = "primary",
  speed,
  label = "Loading",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: utils.cn("vds-spinner", className),
      "data-variant": variant,
      "data-size": size,
      "data-color": color,
      "data-speed": speed,
      ...props,
      children: [
        variant === "dots" && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__dot", "aria-hidden": "true" })
        ] }),
        variant === "bars" && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" })
        ] })
      ]
    }
  );
}

exports.Spinner = Spinner;
