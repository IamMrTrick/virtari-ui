'use strict';

var utils = require('@virtari/utils');
var SliderPrimitive = require('@radix-ui/react-slider');
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

var SliderPrimitive__namespace = /*#__PURE__*/_interopNamespace(SliderPrimitive);

// src/Slider.tsx
function Slider({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SliderPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-slider", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Track, { className: "vds-slider-track", children: /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Range, { className: "vds-slider-range" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Thumb, { className: "vds-slider-thumb" })
      ]
    }
  );
}

exports.Slider = Slider;
