"use client";
import { cn } from '@virtari/utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/AlertDialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
function AlertDialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Overlay,
    {
      ref,
      "data-backdrop": backdrop,
      className: cn("vds-dialog-overlay", className),
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
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { container: container ?? void 0, children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, { backdrop }),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        ref,
        "data-size": size,
        "data-animation": animation,
        "data-intent": intent,
        "data-responsive": responsive ? "" : void 0,
        className: cn("vds-dialog-content", className),
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
function AlertDialogBody({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-dialog-body", className),
      ...props
    }
  );
}
function AlertDialogFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-dialog-footer", className),
      ...props
    }
  );
}
function AlertDialogTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      ref,
      className: cn("vds-dialog-title", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Description,
    {
      ref,
      className: cn("vds-dialog-description", className),
      ...props
    }
  );
}
function AlertDialogAction({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Action,
    {
      ref,
      className: cn(className),
      ...props
    }
  );
}
function AlertDialogCancel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      ref,
      className: cn(className),
      ...props
    }
  );
}

export { AlertDialog, AlertDialogAction, AlertDialogBody, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger };
