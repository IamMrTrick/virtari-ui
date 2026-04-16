'use strict';

var utils = require('@virtari/utils');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');
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

var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);

// src/RadioGroup.tsx
function RadioGroup({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-radio-group", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-radio-item", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(RadioGroupPrimitive__namespace.Indicator, { className: "vds-radio-indicator" })
    }
  );
}

exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
