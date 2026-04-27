"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var ProgressPrimitive = require('@radix-ui/react-progress');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var ProgressPrimitive__namespace = /*#__PURE__*/_interopNamespace(ProgressPrimitive);

// src/Progress.tsx
var PRESET_COLORS = /* @__PURE__ */ new Set([
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "contrast"
]);
function Progress({
  className,
  value,
  color = "primary",
  variant,
  size,
  animated,
  showLabel,
  style,
  ref,
  ...props
}) {
  const isPreset = PRESET_COLORS.has(color);
  const dataColor = isPreset ? color : "custom";
  const customStyle = isPreset ? {} : { "--progress-fill-color": color };
  const animatedValue = animated === true ? "pulse" : animated === false ? void 0 : animated;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ProgressPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-progress", className),
      "data-color": dataColor,
      "data-variant": variant,
      "data-size": size,
      "data-animated": animatedValue,
      value,
      style: { ...customStyle, ...style },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ProgressPrimitive__namespace.Indicator,
          {
            className: "vds-progress-indicator",
            style: { inlineSize: `${value ?? 0}%` }
          }
        ),
        showLabel && value != null && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-progress-label", "aria-hidden": true, children: [
          Math.round(value),
          "%"
        ] })
      ]
    }
  );
}

exports.Progress = Progress;
