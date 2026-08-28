'use strict';

var chunkVMBJPRF6_cjs = require('../chunk-VMBJPRF6.cjs');
require('../chunk-3W3I2SIR.cjs');
require('../chunk-BMTE6ZMC.cjs');
var React = require('react');
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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var NAME = "Label";
var Label = React__namespace.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    chunkVMBJPRF6_cjs.Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        props.onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label.displayName = NAME;
var Root = Label;

exports.Label = Label;
exports.Root = Root;
