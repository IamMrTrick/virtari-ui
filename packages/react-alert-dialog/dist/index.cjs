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
var AlertDialogPortal = AlertDialogPrimitive__namespace.Portal;
function AlertDialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Overlay,
    {
      ref,
      "data-backdrop": backdrop,
      className: utils.cn("vds-dialog-overlay", className),
      ...props
    }
  );
}
function AlertDialogContent({
  size = "md",
  animation = "scale",
  intent = "destructive",
  backdrop = "default",
  responsive,
  container,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogPortal, { container: container ?? void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(AlertDialogOverlay, { backdrop }),
    /* @__PURE__ */ jsxRuntime.jsx(
      AlertDialogPrimitive__namespace.Content,
      {
        ref,
        "data-size": size,
        "data-animation": animation,
        "data-intent": intent,
        "data-responsive": responsive ? "" : void 0,
        className: utils.cn("vds-dialog-content", className),
        ...props,
        children
      }
    )
  ] });
}
function AlertDialogHeader({
  variant = "plain",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      "data-variant": variant,
      className: utils.cn("vds-dialog-header", className),
      ...props
    }
  );
}
function AlertDialogBody({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-dialog-body", className),
      ...props
    }
  );
}
function AlertDialogFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-dialog-footer", className),
      ...props
    }
  );
}
function AlertDialogTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Title,
    {
      ref,
      className: utils.cn("vds-dialog-title", className),
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
      className: utils.cn("vds-dialog-description", className),
      ...props
    }
  );
}
function AlertDialogAction({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Action,
    {
      ref,
      className: utils.cn(className),
      ...props
    }
  );
}
function AlertDialogCancel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Cancel,
    {
      ref,
      className: utils.cn(className),
      ...props
    }
  );
}

exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogBody = AlertDialogBody;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
