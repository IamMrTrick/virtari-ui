import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

declare const Dialog: react.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: react.FC<DialogPrimitive.DialogPortalProps>;
interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
    ref?: Ref<ComponentRef<typeof DialogPrimitive.Overlay>>;
}
declare function DialogOverlay({ className, ref, ...props }: DialogOverlayProps): react_jsx_runtime.JSX.Element;
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof DialogPrimitive.Content>>;
}
declare function DialogContent({ className, children, ref, ...props }: DialogContentProps): react_jsx_runtime.JSX.Element;
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

export { Dialog, DialogClose, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, DialogOverlay, type DialogOverlayProps, DialogPortal, DialogTitle, type DialogTitleProps, DialogTrigger };
