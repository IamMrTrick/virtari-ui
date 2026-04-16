'use strict';

var utils = require('@virtari/utils');
var SwitchPrimitive = require('@radix-ui/react-switch');
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

var SwitchPrimitive__namespace = /*#__PURE__*/_interopNamespace(SwitchPrimitive);

// src/Switch.tsx
function Switch({ size = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SwitchPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-switch", className),
      "data-size": size,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(SwitchPrimitive__namespace.Thumb, { className: "vds-switch-thumb" })
    }
  );
}

exports.Switch = Switch;
