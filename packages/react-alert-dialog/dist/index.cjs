'use strict';

var utils = require('@virtari/utils');
var AlertDialogPrimitive = require('@radix-ui/react-alert-dialog');
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

var AlertDialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(AlertDialogPrimitive);

// src/AlertDialog.tsx
var AlertDialog = AlertDialogPrimitive__namespace.Root;
var AlertDialogTrigger = AlertDialogPrimitive__namespace.Trigger;
function AlertDialogContent({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogPrimitive__namespace.Portal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(AlertDialogPrimitive__namespace.Overlay, { className: "vds-alert-dialog-overlay" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      AlertDialogPrimitive__namespace.Content,
      {
        ref,
        className: utils.cn("vds-alert-dialog-content", className),
        ...props
      }
    )
  ] });
}
function AlertDialogTitle({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Title,
    {
      ref,
      className: utils.cn("vds-alert-dialog-title", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Description,
    {
      ref,
      className: utils.cn("vds-alert-dialog-description", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Action,
    {
      ref,
      className: utils.cn("vds-alert-dialog-action", className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Cancel,
    {
      ref,
      className: utils.cn("vds-alert-dialog-cancel", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-alert-dialog-footer", className),
      ...props
    }
  );
}

exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
