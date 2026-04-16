import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type Direction = "bottom" | "top" | "left" | "right";
type DrawerSizeMode = "adaptive" | "full";
type DrawerSnapPoint = number;

interface DrawerProps {
    children: ReactNode;
    direction?: Direction;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    sizeMode?: DrawerSizeMode;
    snapPoints?: readonly DrawerSnapPoint[];
    minimizedSize?: DrawerSnapPoint;
    activeSnapPoint?: DrawerSnapPoint;
    defaultSnapPoint?: DrawerSnapPoint;
    onActiveSnapPointChange?: (value: DrawerSnapPoint) => void;
    closeThreshold?: number;
    velocityThreshold?: number;
    dragHandleOnly?: boolean;
    scaleBackground?: boolean;
    modal?: boolean;
    dismissible?: boolean;
    preventAutoFocus?: boolean;
}
declare function Drawer({ children, direction, open: controlledOpen, defaultOpen, onOpenChange: controlledOnOpenChange, sizeMode, snapPoints, minimizedSize, activeSnapPoint: controlledActiveSnapPoint, defaultSnapPoint, onActiveSnapPointChange, closeThreshold, velocityThreshold, dragHandleOnly, scaleBackground, modal, dismissible, preventAutoFocus, }: DrawerProps): react_jsx_runtime.JSX.Element;
declare const DrawerTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface DrawerOverlayProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
}
declare const DrawerOverlay: react.ForwardRefExoticComponent<DrawerOverlayProps & react.RefAttributes<HTMLDivElement>>;
interface DrawerContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
}
declare const DrawerContent: react.ForwardRefExoticComponent<DrawerContentProps & react.RefAttributes<HTMLDivElement>>;
interface DrawerHandleProps extends ComponentPropsWithoutRef<"div"> {
}
declare const DrawerHandle: react.ForwardRefExoticComponent<DrawerHandleProps & react.RefAttributes<HTMLDivElement>>;
interface DrawerTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
}
declare const DrawerTitle: react.ForwardRefExoticComponent<DrawerTitleProps & react.RefAttributes<HTMLHeadingElement>>;
interface DrawerDescriptionProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
}
declare const DrawerDescription: react.ForwardRefExoticComponent<DrawerDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
interface DrawerBodyProps extends ComponentPropsWithoutRef<"div"> {
}
declare const DrawerBody: react.ForwardRefExoticComponent<DrawerBodyProps & react.RefAttributes<HTMLDivElement>>;
interface DrawerFooterProps extends ComponentPropsWithoutRef<"div"> {
}
declare const DrawerFooter: react.ForwardRefExoticComponent<DrawerFooterProps & react.RefAttributes<HTMLDivElement>>;

export { type Direction, Drawer, DrawerBody, type DrawerBodyProps, DrawerClose, DrawerContent, type DrawerContentProps, DrawerDescription, type DrawerDescriptionProps, DrawerFooter, type DrawerFooterProps, DrawerHandle, type DrawerHandleProps, DrawerOverlay, type DrawerOverlayProps, type DrawerProps, type DrawerSizeMode, type DrawerSnapPoint, DrawerTitle, type DrawerTitleProps, DrawerTrigger };
