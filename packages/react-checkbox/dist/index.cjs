"use client";
'use strict';

var utils = require('@virtari/utils');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var reactIcons = require('@virtari/react-icons');
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

var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);

// src/Checkbox.tsx
function Checkbox({ size = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    CheckboxPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-checkbox", className),
      "data-size": size,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs(CheckboxPrimitive__namespace.Indicator, { className: "vds-checkbox-indicator", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactIcons.IconCheck,
          {
            className: "vds-checkbox-check",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          reactIcons.IconMinus,
          {
            className: "vds-checkbox-indeterminate",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        )
      ] })
    }
  );
}

exports.Checkbox = Checkbox;
