import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

/* ── Re-export ── */
export const ToastProvider = ToastPrimitive.Provider;

/* ── ToastViewport ── */
export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Viewport>>;
}

export function ToastViewport({
  className,
  ref,
  ...props
}: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn("vds-toast-viewport", className)}
      {...props}
    />
  );
}

/* ── Toast ── */
export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Root>>;
}

export function Toast({ className, ref, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn("vds-toast", className)}
      {...props}
    />
  );
}

/* ── ToastTitle ── */
export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Title>>;
}

export function ToastTitle({ className, ref, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn("vds-toast-title", className)}
      {...props}
    />
  );
}

/* ── ToastDescription ── */
export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Description>>;
}

export function ToastDescription({
  className,
  ref,
  ...props
}: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn("vds-toast-description", className)}
      {...props}
    />
  );
}

/* ── ToastAction ── */
export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Action>>;
}

export function ToastAction({ className, ref, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cn("vds-toast-action", className)}
      {...props}
    />
  );
}

/* ── ToastClose ── */
export interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Close>>;
}

export function ToastClose({ className, ref, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      className={cn("vds-toast-close", className)}
      {...props}
    />
  );
}
