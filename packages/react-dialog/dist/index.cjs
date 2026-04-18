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
function DialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    {
      ref,
      "data-backdrop": backdrop,
      className: utils.cn("vds-dialog-overlay", className),
      ...props
    }
  );
}
function DialogContent({
  size = "md",
  animation = "scale",
  intent = "default",
  backdrop = "default",
  responsive,
  showCloseButton,
  closeButtonLabel = "Close",
  container,
  preventCloseOnOutsideClick,
  preventCloseOnEscape,
  className,
  children,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { container: container ?? void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, { backdrop }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        ref,
        "data-size": size,
        "data-animation": animation,
        "data-intent": intent,
        "data-responsive": responsive ? "" : void 0,
        className: utils.cn("vds-dialog-content", className),
        onEscapeKeyDown: (event) => {
          onEscapeKeyDown?.(event);
          if (preventCloseOnEscape && !event.defaultPrevented) {
            event.preventDefault();
          }
        },
        onPointerDownOutside: (event) => {
          onPointerDownOutside?.(event);
          if (preventCloseOnOutsideClick && !event.defaultPrevented) {
            event.preventDefault();
          }
        },
        onInteractOutside: (event) => {
          onInteractOutside?.(event);
          if (preventCloseOnOutsideClick && !event.defaultPrevented) {
            event.preventDefault();
          }
        },
        ...props,
        children: [
          children,
          showCloseButton ? /* @__PURE__ */ jsxRuntime.jsx(DialogCloseIcon, { "aria-label": closeButtonLabel }) : null
        ]
      }
    )
  ] });
}
function DialogHeader({
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
function DialogBody({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-dialog-body", className),
      ...props
    }
  );
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
function DialogCloseIcon({
  className,
  children,
  "aria-label": ariaLabel = "Close",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": ariaLabel,
      className: utils.cn("vds-dialog-close-icon", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(DefaultCloseGlyph, {})
    }
  ) });
}
function DefaultCloseGlyph() {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.75",
      strokeLinecap: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M3.5 3.5l9 9M12.5 3.5l-9 9" })
    }
  );
}

exports.Dialog = Dialog;
exports.DialogBody = DialogBody;
exports.DialogClose = DialogClose;
exports.DialogCloseIcon = DialogCloseIcon;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
