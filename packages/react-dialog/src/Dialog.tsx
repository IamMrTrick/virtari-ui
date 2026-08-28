import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as DialogPrimitive from "@virtari-packages/primitives/dialog";
import { IconX } from "@virtari-packages/react-icons";

/* ── Shared types ── */

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
export type DialogAnimation =
  | "scale"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "zoom"
  | "bounce"
  | "none";
export type DialogIntent = "default" | "destructive" | "warning" | "success" | "info";
export type DialogBackdrop =
  | "default"
  | "blur"
  | "blur-strong"
  | "light"
  | "none";
export type DialogHeaderVariant = "plain" | "bordered";

/* ── Root primitives (re-exported as-is) ── */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

/* ── Overlay ── */

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  /** Visual style of the backdrop. */
  backdrop?: DialogBackdrop;
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Overlay>>;
}

export function DialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-backdrop={backdrop}
      className={cn("vds-dialog-overlay", className)}
      {...props}
    />
  );
}

/* ── Content ── */

type PrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export interface DialogContentProps extends PrimitiveContentProps {
  /** Max-width variant. Defaults to `"md"`. */
  size?: DialogSize;
  /** Enter/exit animation preset. Defaults to `"scale"`. */
  animation?: DialogAnimation;
  /** Top accent strip color. Defaults to `"default"` (no strip). */
  intent?: DialogIntent;
  /** Overlay style. Forwarded to the internal `DialogOverlay`. */
  backdrop?: DialogBackdrop;
  /** When true, fills the viewport on narrow screens (<= 40rem). */
  responsive?: boolean;
  /** When true, renders a built-in close (X) button in the top-end corner. */
  showCloseButton?: boolean;
  /** Accessible label for the built-in close button. Defaults to `"Close"`. */
  closeButtonLabel?: string;
  /** Custom portal target. Falls back to `document.body`. */
  container?: HTMLElement | null;
  /** Block close when the user clicks/taps outside the content. */
  preventCloseOnOutsideClick?: boolean;
  /** Block close when Escape is pressed. */
  preventCloseOnEscape?: boolean;
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Content>>;
}

export function DialogContent({
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
}: DialogContentProps) {
  return (
    <DialogPortal container={container ?? undefined}>
      <DialogOverlay backdrop={backdrop} />
      <DialogPrimitive.Content
        ref={ref}
        data-size={size}
        data-animation={animation}
        data-intent={intent}
        data-responsive={responsive ? "" : undefined}
        data-radius-host=""
        className={cn("vds-dialog-content", className)}
        onEscapeKeyDown={(event) => {
          onEscapeKeyDown?.(event);
          if (preventCloseOnEscape && !event.defaultPrevented) {
            event.preventDefault();
          }
        }}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event);
          if (preventCloseOnOutsideClick && !event.defaultPrevented) {
            event.preventDefault();
          }
        }}
        onInteractOutside={(event) => {
          onInteractOutside?.(event);
          if (preventCloseOnOutsideClick && !event.defaultPrevented) {
            event.preventDefault();
          }
        }}
        {...props}
      >
        {children}
        {showCloseButton ? <DialogCloseIcon aria-label={closeButtonLabel} /> : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/* ── Header ── */

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `"plain"` has no divider; `"bordered"` adds a bottom rule. */
  variant?: DialogHeaderVariant;
  ref?: Ref<HTMLDivElement>;
}

export function DialogHeader({
  variant = "plain",
  className,
  ref,
  ...props
}: DialogHeaderProps) {
  return (
    <div
      ref={ref}
      data-variant={variant}
      className={cn("vds-dialog-header", className)}
      {...props}
    />
  );
}

/* ── Body ── */

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function DialogBody({ className, ref, ...props }: DialogBodyProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-dialog-body", className)}
      {...props}
    />
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

/* ── Footer ── */

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

/* ── Close icon (X button) ── */

export interface DialogCloseIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}

export function DialogCloseIcon({
  className,
  children,
  "aria-label": ariaLabel = "Close",
  ref,
  ...props
}: DialogCloseIconProps) {
  return (
    <DialogPrimitive.Close asChild>
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn("vds-dialog-close-icon", className)}
        {...props}
      >
        {children ?? <DefaultCloseGlyph />}
      </button>
    </DialogPrimitive.Close>
  );
}

function DefaultCloseGlyph() {
  return <IconX size={16} stroke={1.75} aria-hidden focusable={false} />;
}
