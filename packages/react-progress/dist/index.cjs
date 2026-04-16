'use strict';

var utils = require('@virtari/utils');
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
function Progress({ className, value, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ProgressPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-progress", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        ProgressPrimitive__namespace.Indicator,
        {
          className: "vds-progress-indicator",
          style: { width: `${value ?? 0}%` }
        }
      )
    }
  );
}

exports.Progress = Progress;
