"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var PopoverPrimitive = require('@radix-ui/react-popover');
var reactDirection = require('@radix-ui/react-direction');
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

var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);

// src/Popover.tsx
function Popover({ dir, ...props }) {
  const autoDir = utils.useDirection();
  return /* @__PURE__ */ jsxRuntime.jsx(reactDirection.DirectionProvider, { dir: dir ?? autoDir, children: /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Root, { ...props }) });
}
var PopoverTrigger = PopoverPrimitive__namespace.Trigger;
var PopoverClose = PopoverPrimitive__namespace.Close;
function PopoverContent({
  className,
  sideOffset = 4,
  align = "center",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    PopoverPrimitive__namespace.Content,
    {
      ref,
      sideOffset,
      align,
      className: utils.cn("vds-popover-content", className),
      ...props
    }
  ) });
}

exports.Popover = Popover;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
