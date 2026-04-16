import { cn } from '@virtari/utils';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { jsx } from 'react/jsx-runtime';

// src/Toast.tsx
var ToastProvider = ToastPrimitive.Provider;
function ToastViewport({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive.Viewport,
    {
      ref,
      className: cn("vds-toast-viewport", className),
      ...props
    }
  );
}
function Toast({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive.Root,
    {
      ref,
      className: cn("vds-toast", className),
      ...props
    }
  );
}
function ToastTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive.Title,
    {
      ref,
      className: cn("vds-toast-title", className),
      ...props
    }
  );
}
function ToastDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive.Description,
    {
      ref,
      className: cn("vds-toast-description", className),
      ...props
    }
  );
}
function ToastAction({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive.Action,
    {
      ref,
      className: cn("vds-toast-action", className),
      ...props
    }
  );
}
function ToastClose({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive.Close,
    {
      ref,
      className: cn("vds-toast-close", className),
      ...props
    }
  );
}

export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport };
