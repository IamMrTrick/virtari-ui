import * as react from 'react';
import { ReactNode, Ref } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type Direction = "bottom" | "top" | "left" | "right";

interface DrawerProps {
    children: ReactNode;
    direction?: Direction;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    scaleBackground?: boolean;
    modal?: boolean;
    dismissible?: boolean;
    /** Prevent auto-focus on first focusable element (default: true) */
    preventAutoFocus?: boolean;
}
declare function Drawer({ children, direction, open: controlledOpen, defaultOpen, onOpenChange: controlledOnOpenChange, scaleBackground, modal, dismissible, preventAutoFocus, }: DrawerProps): react_jsx_runtime.JSX.Element;
declare const DrawerTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface DrawerOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
    ref?: Ref<HTMLDivElement>;
}
declare function DrawerOverlay({ className, ref, ...props }: DrawerOverlayProps): react_jsx_runtime.JSX.Element;
interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    ref?: Ref<HTMLDivElement>;
}
declare function DrawerContent({ className, children, ref, ...props }: DrawerContentProps): react_jsx_runtime.JSX.Element;
interface DrawerHandleProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function DrawerHandle({ className, ref, ...props }: DrawerHandleProps): react_jsx_runtime.JSX.Element;
interface DrawerTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
    ref?: Ref<HTMLHeadingElement>;
}
declare function DrawerTitle({ className, ref, ...props }: DrawerTitleProps): react_jsx_runtime.JSX.Element;
interface DrawerDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
    ref?: Ref<HTMLParagraphElement>;
}
declare function DrawerDescription({ className, ref, ...props }: DrawerDescriptionProps): react_jsx_runtime.JSX.Element;
interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function DrawerBody({ className, ref, ...props }: DrawerBodyProps): react_jsx_runtime.JSX.Element;
interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function DrawerFooter({ className, ref, ...props }: DrawerFooterProps): react_jsx_runtime.JSX.Element;

export { type Direction, Drawer, DrawerBody, type DrawerBodyProps, DrawerClose, DrawerContent, type DrawerContentProps, DrawerDescription, type DrawerDescriptionProps, DrawerFooter, type DrawerFooterProps, DrawerHandle, type DrawerHandleProps, DrawerOverlay, type DrawerOverlayProps, type DrawerProps, DrawerTitle, type DrawerTitleProps, DrawerTrigger };
