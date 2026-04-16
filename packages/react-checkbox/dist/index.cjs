'use strict';

var utils = require('@virtari/utils');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
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
          "svg",
          {
            className: "vds-checkbox-check",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M10 3L4.5 8.5L2 6",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            className: "vds-checkbox-indeterminate",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M2.5 6H9.5",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          }
        )
      ] })
    }
  );
}

exports.Checkbox = Checkbox;
