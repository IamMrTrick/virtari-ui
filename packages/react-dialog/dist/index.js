import { cn } from '@virtari/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogClose = DialogPrimitive.Close;
var DialogPortal = DialogPrimitive.Portal;
function DialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      ref,
      "data-backdrop": backdrop,
      className: cn("vds-dialog-overlay", className),
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
  return /* @__PURE__ */ jsxs(DialogPortal, { container: container ?? void 0, children: [
    /* @__PURE__ */ jsx(DialogOverlay, { backdrop }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        "data-size": size,
        "data-animation": animation,
        "data-intent": intent,
        "data-responsive": responsive ? "" : void 0,
        className: cn("vds-dialog-content", className),
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
          showCloseButton ? /* @__PURE__ */ jsx(DialogCloseIcon, { "aria-label": closeButtonLabel }) : null
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-variant": variant,
      className: cn("vds-dialog-header", className),
      ...props
    }
  );
}
function DialogBody({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-dialog-body", className),
      ...props
    }
  );
}
function DialogTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      ref,
      className: cn("vds-dialog-title", className),
      ...props
    }
  );
}
function DialogDescription({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      ref,
      className: cn("vds-dialog-description", className),
      ...props
    }
  );
}
function DialogFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-dialog-footer", className),
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
  return /* @__PURE__ */ jsx(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": ariaLabel,
      className: cn("vds-dialog-close-icon", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(DefaultCloseGlyph, {})
    }
  ) });
}
function DefaultCloseGlyph() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.75",
      strokeLinecap: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M3.5 3.5l9 9M12.5 3.5l-9 9" })
    }
  );
}

export { Dialog, DialogBody, DialogClose, DialogCloseIcon, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
