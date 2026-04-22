"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
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

var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);

// src/Tooltip.tsx
function TooltipProvider({
  delayDuration = 300,
  skipDelayDuration = 200,
  dir,
  children,
  ...props
}) {
  const autoDir = utils.useDirection();
  return /* @__PURE__ */ jsxRuntime.jsx(reactDirection.DirectionProvider, { dir: dir ?? autoDir, children: /* @__PURE__ */ jsxRuntime.jsx(
    TooltipPrimitive__namespace.Provider,
    {
      delayDuration,
      skipDelayDuration,
      ...props,
      children
    }
  ) });
}
var Tooltip = TooltipPrimitive__namespace.Root;
var TooltipTrigger = TooltipPrimitive__namespace.Trigger;
function TooltipContent({
  className,
  sideOffset = 6,
  collisionPadding = 8,
  size = "md",
  variant = "default",
  arrow = false,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    TooltipPrimitive__namespace.Content,
    {
      ref,
      sideOffset,
      collisionPadding,
      "data-size": size,
      "data-variant": variant,
      className: utils.cn("vds-tooltip-content", className),
      ...props,
      children: [
        children,
        arrow ? /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Arrow, { className: "vds-tooltip-arrow" }) : null
      ]
    }
  ) });
}
function TooltipArrow({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TooltipPrimitive__namespace.Arrow,
    {
      ref,
      className: utils.cn("vds-tooltip-arrow", className),
      ...props
    }
  );
}

exports.Tooltip = Tooltip;
exports.TooltipArrow = TooltipArrow;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
