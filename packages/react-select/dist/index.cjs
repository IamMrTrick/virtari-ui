'use strict';

var utils = require('@virtari/utils');
var SelectPrimitive = require('@radix-ui/react-select');
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

var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);

// src/Select.tsx
var Select = SelectPrimitive__namespace.Root;
var SelectGroup = SelectPrimitive__namespace.Group;
var SelectValue = SelectPrimitive__namespace.Value;
function SelectTrigger({ size = "md", className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Trigger,
    {
      ref,
      className: utils.cn("vds-select-trigger", className),
      "data-size": size,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { className: "vds-select-icon", children: /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M3 4.5L6 7.5L9 4.5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Content,
    {
      ref,
      className: utils.cn("vds-select-content", className),
      position,
      sideOffset: 4,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Viewport, { className: "vds-select-viewport", children })
    }
  ) });
}
function SelectItem({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-select-item", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { className: "vds-select-item-indicator", children: /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M10 3L4.5 8.5L2 6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) })
      ]
    }
  );
}
function SelectLabel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Label,
    {
      ref,
      className: utils.cn("vds-select-label", className),
      ...props
    }
  );
}
function SelectSeparator({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Separator,
    {
      ref,
      className: utils.cn("vds-select-separator", className),
      ...props
    }
  );
}

exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
