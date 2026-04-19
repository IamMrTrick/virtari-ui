"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var LabelPrimitive = require('@radix-ui/react-label');
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

var LabelPrimitive__namespace = /*#__PURE__*/_interopNamespace(LabelPrimitive);

// src/Label.tsx
function Label({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    LabelPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-label", className),
      ...props
    }
  );
}

exports.Label = Label;
