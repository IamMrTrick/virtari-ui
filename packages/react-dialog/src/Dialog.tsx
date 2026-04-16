import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

/* ── Root & Trigger ── */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

/* ── Overlay ── */
export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Overlay>>;
}

export function DialogOverlay({ className, ref, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("vds-dialog-overlay", className)}
      {...props}
    />
  );
}

/* ── Content ── */
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Content>>;
}

export function DialogContent({ className, children, ref, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn("vds-dialog-content", className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/* ── Title ── */
export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Title>>;
}

export function DialogTitle({ className, ref, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("vds-dialog-title", className)}
      {...props}
    />
  );
}

/* ── Description ── */
export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Description>>;
}

export function DialogDescription({ className, ref, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("vds-dialog-description", className)}
      {...props}
    />
  );
}

/* ── Footer (custom) ── */
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function DialogFooter({ className, ref, ...props }: DialogFooterProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-dialog-footer", className)}
      {...props}
    />
  );
}

