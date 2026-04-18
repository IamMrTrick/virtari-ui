import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
type DialogAnimation = "scale" | "fade" | "slide-up" | "slide-down" | "zoom" | "bounce" | "none";
type DialogIntent = "default" | "destructive" | "warning" | "success" | "info";
type DialogBackdrop = "default" | "blur" | "blur-strong" | "light" | "transparent" | "none";
type DialogHeaderVariant = "plain" | "bordered";
declare const Dialog: react.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: react.FC<DialogPrimitive.DialogPortalProps>;
interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
    /** Visual style of the backdrop. */
    backdrop?: DialogBackdrop;
    ref?: Ref<ComponentRef<typeof DialogPrimitive.Overlay>>;
}
declare function DialogOverlay({ backdrop, className, ref, ...props }: DialogOverlayProps): react_jsx_runtime.JSX.Element;
type RadixContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;
interface DialogContentProps extends RadixContentProps {
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
    /** Custom portal target. Falls back to Radix default (`document.body`). */
    container?: HTMLElement | null;
    /** Block close when the user clicks/taps outside the content. */
    preventCloseOnOutsideClick?: boolean;
    /** Block close when Escape is pressed. */
    preventCloseOnEscape?: boolean;
    ref?: Ref<ComponentRef<typeof DialogPrimitive.Content>>;
}
declare function DialogContent({ size, animation, intent, backdrop, responsive, showCloseButton, closeButtonLabel, container, preventCloseOnOutsideClick, preventCloseOnEscape, className, children, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, ref, ...props }: DialogContentProps): react_jsx_runtime.JSX.Element;
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** `"plain"` has no divider; `"bordered"` adds a bottom rule. */
    variant?: DialogHeaderVariant;
    ref?: Ref<HTMLDivElement>;
}
declare function DialogHeader({ variant, className, ref, ...props }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function DialogBody({ className, ref, ...props }: DialogBodyProps): react_jsx_runtime.JSX.Element;
interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
    ref?: Ref<ComponentRef<typeof DialogPrimitive.Title>>;
}
declare function DialogTitle({ className, ref, ...props }: DialogTitleProps): react_jsx_runtime.JSX.Element;
interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
    ref?: Ref<ComponentRef<typeof DialogPrimitive.Description>>;
}
declare function DialogDescription({ className, ref, ...props }: DialogDescriptionProps): react_jsx_runtime.JSX.Element;
interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function DialogFooter({ className, ref, ...props }: DialogFooterProps): react_jsx_runtime.JSX.Element;
interface DialogCloseIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>;
}
declare function DialogCloseIcon({ className, children, "aria-label": ariaLabel, ref, ...props }: DialogCloseIconProps): react_jsx_runtime.JSX.Element;

export { Dialog, type DialogAnimation, type DialogBackdrop, DialogBody, type DialogBodyProps, DialogClose, DialogCloseIcon, type DialogCloseIconProps, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogHeaderVariant, type DialogIntent, DialogOverlay, type DialogOverlayProps, DialogPortal, type DialogSize, DialogTitle, type DialogTitleProps, DialogTrigger };
