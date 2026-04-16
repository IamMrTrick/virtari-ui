import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

/* ── Re-exports ── */
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/* ── AlertDialogContent ── */
export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Content>>;
}

export function AlertDialogContent({
  className,
  ref,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="vds-alert-dialog-overlay" />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn("vds-alert-dialog-content", className)}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

/* ── AlertDialogTitle ── */
export interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Title>>;
}

export function AlertDialogTitle({
  className,
  ref,
  ...props
}: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("vds-alert-dialog-title", className)}
      {...props}
    />
  );
}

/* ── AlertDialogDescription ── */
export interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Description>>;
}

export function AlertDialogDescription({
  className,
  ref,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("vds-alert-dialog-description", className)}
      {...props}
    />
  );
}

/* ── AlertDialogAction ── */
export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Action>>;
}

export function AlertDialogAction({
  className,
  ref,
  ...props
}: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn("vds-alert-dialog-action", className)}
      {...props}
    />
  );
}

/* ── AlertDialogCancel ── */
export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}

export function AlertDialogCancel({
  className,
  ref,
  ...props
}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn("vds-alert-dialog-cancel", className)}
      {...props}
    />
  );
}

/* ── AlertDialogFooter (custom layout div) ── */
export interface AlertDialogFooterProps
  extends React.ComponentPropsWithoutRef<"div"> {
  ref?: Ref<HTMLDivElement>;
}

export function AlertDialogFooter({
  className,
  ref,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-alert-dialog-footer", className)}
      {...props}
    />
  );
}
