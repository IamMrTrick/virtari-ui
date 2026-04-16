import { cn } from '@virtari/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogClose = DialogPrimitive.Close;
var DialogPortal = DialogPrimitive.Portal;
function DialogOverlay({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      ref,
      className: cn("vds-dialog-overlay", className),
      ...props
    }
  );
}
function DialogContent({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsx(
      DialogPrimitive.Content,
      {
        ref,
        className: cn("vds-dialog-content", className),
        ...props,
        children
      }
    )
  ] });
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

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
