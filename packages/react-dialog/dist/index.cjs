'use strict';

var utils = require('@virtari/utils');
var DialogPrimitive = require('@radix-ui/react-dialog');
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

var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);

// src/Dialog.tsx
var Dialog = DialogPrimitive__namespace.Root;
var DialogTrigger = DialogPrimitive__namespace.Trigger;
var DialogClose = DialogPrimitive__namespace.Close;
var DialogPortal = DialogPrimitive__namespace.Portal;
function DialogOverlay({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    {
      ref,
      className: utils.cn("vds-dialog-overlay", className),
      ...props
    }
  );
}
function DialogContent({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      DialogPrimitive__namespace.Content,
      {
        ref,
        className: utils.cn("vds-dialog-content", className),
        ...props,
        children
      }
    )
  ] });
}
function DialogTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    {
      ref,
      className: utils.cn("vds-dialog-title", className),
      ...props
    }
  );
}
function DialogDescription({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Description,
    {
      ref,
      className: utils.cn("vds-dialog-description", className),
      ...props
    }
  );
}
function DialogFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-dialog-footer", className),
      ...props
    }
  );
}

exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
