import { cn } from "../../lib/utils";
import type { ComponentRef, Ref } from "react";
import * as AlertDialogPrimitive from "../../lib/primitives/alert-dialog";

/* ─────────────────────────────────────────────────────────────
 * AlertDialog is a thin variant of Dialog. It renders with the
 * same `vds-dialog-*` CSS classes so its size / animation /
 * backdrop / intent variants look identical to Dialog. The only
 * differences are semantic:
 *
 *   • role="alertdialog" via the underlying primitive
 *   • Escape and outside-click do NOT dismiss by default
 *   • Resolution is via <AlertDialogAction> or <AlertDialogCancel>
 *   • No `showCloseButton` / `preventCloseOn*` props — by design
 *
 * The visual token set lives in @virtari-packages/react-dialog/styles.
 * Import it at your app root alongside this package's CSS.
 * ───────────────────────────────────────────────────────────── */

/* ── Shared variant types (kept in sync with react-dialog) ── */

export type AlertDialogSize = "sm" | "md" | "lg" | "xl" | "full";
export type AlertDialogAnimation =
  | "scale"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "zoom"
  | "bounce"
  | "none";
export type AlertDialogIntent = "default" | "destructive" | "warning" | "success" | "info";
export type AlertDialogBackdrop =
  | "default"
  | "blur"
  | "blur-strong"
  | "light"
  | "none";
export type AlertDialogHeaderVariant = "plain" | "bordered";

/* ── Root primitives ── */

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

/* ── Overlay ── */

export interface AlertDialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  backdrop?: AlertDialogBackdrop;
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Overlay>>;
}

export function AlertDialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      data-backdrop={backdrop}
      className={cn("vds-dialog-overlay", className)}
      {...props}
    />
  );
}

/* ── Content ── */

type PrimitiveContentProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>;

export interface AlertDialogContentProps extends PrimitiveContentProps {
  /** Max-width variant. Defaults to `"md"`. */
  size?: AlertDialogSize;
  /** Enter/exit animation preset. Defaults to `"scale"`. */
  animation?: AlertDialogAnimation;
  /** Top accent strip color. Defaults to `"destructive"` — alerts are usually risky. */
  intent?: AlertDialogIntent;
  /** Overlay style. Forwarded to the internal overlay. */
  backdrop?: AlertDialogBackdrop;
  /** When true, fills the viewport on narrow screens (<= 40rem). */
  responsive?: boolean;
  /** Custom portal target. */
  container?: HTMLElement | null;
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Content>>;
}

export function AlertDialogContent({
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
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal container={container ?? undefined}>
      <AlertDialogOverlay backdrop={backdrop} />
      <AlertDialogPrimitive.Content
        ref={ref}
        data-size={size}
        data-animation={animation}
        data-intent={intent}
        data-responsive={responsive ? "" : undefined}
        data-radius-host=""
        className={cn("vds-dialog-content", className)}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

/* ── Header ── */

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertDialogHeaderVariant;
  ref?: Ref<HTMLDivElement>;
}

export function AlertDialogHeader({
  variant = "plain",
  className,
  ref,
  ...props
}: AlertDialogHeaderProps) {
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

export interface AlertDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function AlertDialogBody({ className, ref, ...props }: AlertDialogBodyProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-dialog-body", className)}
      {...props}
    />
  );
}

/* ── Footer ── */

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-dialog-footer", className)}
      {...props}
    />
  );
}

/* ── Title ── */

export interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Title>>;
}

export function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("vds-dialog-title", className)}
      {...props}
    />
  );
}

/* ── Description ── */

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
      className={cn("vds-dialog-description", className)}
      {...props}
    />
  );
}

/* ── Action / Cancel (alertdialog commit pattern) ── */

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Action>>;
}

export function AlertDialogAction({ className, ref, ...props }: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(className)}
      {...props}
    />
  );
}

export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}

export function AlertDialogCancel({ className, ref, ...props }: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(className)}
      {...props}
    />
  );
}
