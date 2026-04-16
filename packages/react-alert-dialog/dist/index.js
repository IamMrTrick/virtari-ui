import { cn } from '@virtari/utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/AlertDialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
function AlertDialogContent({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, { className: "vds-alert-dialog-overlay" }),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        ref,
        className: cn("vds-alert-dialog-content", className),
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
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      ref,
      className: cn("vds-alert-dialog-title", className),
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
      className: cn("vds-alert-dialog-description", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Action,
    {
      ref,
      className: cn("vds-alert-dialog-action", className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      ref,
      className: cn("vds-alert-dialog-cancel", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-alert-dialog-footer", className),
      ...props
    }
  );
}

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger };
