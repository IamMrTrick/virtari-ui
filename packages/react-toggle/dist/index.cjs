"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var TogglePrimitive = require('@radix-ui/react-toggle');
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

var TogglePrimitive__namespace = /*#__PURE__*/_interopNamespace(TogglePrimitive);

// src/Toggle.tsx
function Toggle({
  variant = "default",
  size = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TogglePrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-toggle", className),
      "data-variant": variant,
      "data-size": size,
      ...props
    }
  );
}

exports.Toggle = Toggle;
