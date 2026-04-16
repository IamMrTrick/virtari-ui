'use strict';

var utils = require('@virtari/utils');
var ToastPrimitive = require('@radix-ui/react-toast');
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

var ToastPrimitive__namespace = /*#__PURE__*/_interopNamespace(ToastPrimitive);

// src/Toast.tsx
var ToastProvider = ToastPrimitive__namespace.Provider;
function ToastViewport({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive__namespace.Viewport,
    {
      ref,
      className: utils.cn("vds-toast-viewport", className),
      ...props
    }
  );
}
function Toast({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-toast", className),
      ...props
    }
  );
}
function ToastTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive__namespace.Title,
    {
      ref,
      className: utils.cn("vds-toast-title", className),
      ...props
    }
  );
}
function ToastDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive__namespace.Description,
    {
      ref,
      className: utils.cn("vds-toast-description", className),
      ...props
    }
  );
}
function ToastAction({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive__namespace.Action,
    {
      ref,
      className: utils.cn("vds-toast-action", className),
      ...props
    }
  );
}
function ToastClose({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive__namespace.Close,
    {
      ref,
      className: utils.cn("vds-toast-close", className),
      ...props
    }
  );
}

exports.Toast = Toast;
exports.ToastAction = ToastAction;
exports.ToastClose = ToastClose;
exports.ToastDescription = ToastDescription;
exports.ToastProvider = ToastProvider;
exports.ToastTitle = ToastTitle;
exports.ToastViewport = ToastViewport;
