'use strict';

var utils = require('@virtari/utils');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
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

var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);

// src/Tooltip.tsx
var TooltipProvider = TooltipPrimitive__namespace.Provider;
var Tooltip = TooltipPrimitive__namespace.Root;
var TooltipTrigger = TooltipPrimitive__namespace.Trigger;
function TooltipContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    TooltipPrimitive__namespace.Content,
    {
      ref,
      sideOffset,
      className: utils.cn("vds-tooltip-content", className),
      ...props
    }
  ) });
}

exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
