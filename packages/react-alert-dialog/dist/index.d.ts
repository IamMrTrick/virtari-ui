import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { DialogAnimation, DialogBackdrop, DialogSize, DialogIntent, DialogHeaderVariant } from '@virtari/react-dialog';

type AlertDialogSize = DialogSize;
type AlertDialogAnimation = DialogAnimation;
type AlertDialogIntent = DialogIntent;
type AlertDialogBackdrop = DialogBackdrop;
type AlertDialogHeaderVariant = DialogHeaderVariant;
declare const AlertDialog: react.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: react.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: react.FC<AlertDialogPrimitive.AlertDialogPortalProps>;
interface AlertDialogOverlayProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
    backdrop?: AlertDialogBackdrop;
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Overlay>>;
}
declare function AlertDialogOverlay({ backdrop, className, ref, ...props }: AlertDialogOverlayProps): react_jsx_runtime.JSX.Element;
type RadixContentProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>;
interface AlertDialogContentProps extends RadixContentProps {
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
declare function AlertDialogContent({ size, animation, intent, backdrop, responsive, container, className, children, ref, ...props }: AlertDialogContentProps): react_jsx_runtime.JSX.Element;
interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: AlertDialogHeaderVariant;
    ref?: Ref<HTMLDivElement>;
}
declare function AlertDialogHeader({ variant, className, ref, ...props }: AlertDialogHeaderProps): react_jsx_runtime.JSX.Element;
interface AlertDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function AlertDialogBody({ className, ref, ...props }: AlertDialogBodyProps): react_jsx_runtime.JSX.Element;
interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps): react_jsx_runtime.JSX.Element;
interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Title>>;
}
declare function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps): react_jsx_runtime.JSX.Element;
interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Description>>;
}
declare function AlertDialogDescription({ className, ref, ...props }: AlertDialogDescriptionProps): react_jsx_runtime.JSX.Element;
interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Action>>;
}
declare function AlertDialogAction({ className, ref, ...props }: AlertDialogActionProps): react_jsx_runtime.JSX.Element;
interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}
declare function AlertDialogCancel({ className, ref, ...props }: AlertDialogCancelProps): react_jsx_runtime.JSX.Element;

export { AlertDialog, AlertDialogAction, type AlertDialogActionProps, type AlertDialogAnimation, type AlertDialogBackdrop, AlertDialogBody, type AlertDialogBodyProps, AlertDialogCancel, type AlertDialogCancelProps, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, type AlertDialogDescriptionProps, AlertDialogFooter, type AlertDialogFooterProps, AlertDialogHeader, type AlertDialogHeaderProps, type AlertDialogHeaderVariant, type AlertDialogIntent, AlertDialogOverlay, type AlertDialogOverlayProps, AlertDialogPortal, type AlertDialogSize, AlertDialogTitle, type AlertDialogTitleProps, AlertDialogTrigger };
