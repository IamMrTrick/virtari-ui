import type { ComponentPropsWithoutRef, ComponentRef, Ref } from "react";
import * as ToastPrimitive from "../../lib/primitives/toast";
import { cn } from "../../lib/utils";

export const ToastProvider = ToastPrimitive.Provider;

export interface ToastViewportProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
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
      className={cn("vds-toaster", className)}
      {...props}
    />
  );
}

export interface ToastRootProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Root>>;
}

export function ToastRoot({ className, ref, ...props }: ToastRootProps) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn("vds-toast", className)}
      {...props}
    />
  );
}

export interface ToastTitleProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Title>>;
}

export function ToastTitle({ className, ref, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn("vds-toast__title", className)}
      {...props}
    />
  );
}

export interface ToastDescriptionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
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
      className={cn("vds-toast__description", className)}
      {...props}
    />
  );
}

export interface ToastActionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
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

export interface ToastCloseProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Close>>;
}

export function ToastClose({ className, ref, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      className={cn("vds-toast__close", className)}
      {...props}
    />
  );
}
