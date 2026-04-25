'use strict';

var utils = require('@virtari-packages/utils');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');

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

var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);

// src/SegmentedControl.tsx
function SegmentedControl({
  size = "md",
  fullWidth = false,
  orientation = "horizontal",
  disabled,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive__namespace.Root,
    {
      ref,
      orientation,
      disabled,
      "data-size": size,
      "data-full-width": fullWidth || void 0,
      "data-orientation": orientation,
      "data-disabled": disabled || void 0,
      className: utils.cn("vds-segmented-control", className),
      ...props
    },
    children
  );
}
function SegmentedControlItem({
  icon,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-segmented-control-item", className),
      ...props
    },
    icon && /* @__PURE__ */ React.createElement("span", { className: "vds-segmented-control-icon", "aria-hidden": "true" }, icon),
    children
  );
}

exports.SegmentedControl = SegmentedControl;
exports.SegmentedControlItem = SegmentedControlItem;
