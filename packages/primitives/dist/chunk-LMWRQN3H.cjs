'use strict';

var chunkSREYN7I5_cjs = require('./chunk-SREYN7I5.cjs');
var chunkVMBJPRF6_cjs = require('./chunk-VMBJPRF6.cjs');
var React = require('react');
var ReactDOM = require('react-dom');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

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
var ReactDOM__default = /*#__PURE__*/_interopDefault(ReactDOM);

var PORTAL_NAME = "Portal";
var Portal = React__namespace.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React__namespace.useState(false);
  chunkSREYN7I5_cjs.useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM__default.default.createPortal(/* @__PURE__ */ jsxRuntime.jsx(chunkVMBJPRF6_cjs.Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;
var Root = Portal;

exports.Portal = Portal;
exports.Root = Root;
