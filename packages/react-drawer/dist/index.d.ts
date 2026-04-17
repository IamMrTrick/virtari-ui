import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type Direction = "top" | "bottom" | "left" | "right";
type DrawerSizeMode = "adaptive" | "full" | "fixed";
type DrawerSnapBehavior = "staged" | "closest";
type SnapPoint = number;
type DrawerDeclaredSize = number | string | ((info: DrawerViewportInfo) => number | string);
interface DrawerViewportInfo {
    direction: Direction;
    viewportWidth: number;
    viewportHeight: number;
    availableSize: number;
    orientation: "portrait" | "landscape";
}

interface DrawerProps {
    children: ReactNode;
    direction?: Direction;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    sizeMode?: DrawerSizeMode;
    size?: DrawerDeclaredSize;
    snapPoints?: readonly SnapPoint[];
    activeSnapPoint?: SnapPoint;
    defaultSnapPoint?: SnapPoint;
    onActiveSnapPointChange?: (value: SnapPoint) => void;
    minimizedSize?: SnapPoint;
    snapBehavior?: DrawerSnapBehavior;
    snapStepThreshold?: number;
    snapSkipThreshold?: number;
    closeThreshold?: number;
    velocityThreshold?: number;
    dragHandleOnly?: boolean;
    scaleBackground?: boolean;
    modal?: boolean;
    dismissible?: boolean;
    preventAutoFocus?: boolean;
}
declare function Drawer({ children, direction, open: controlledOpen, defaultOpen, onOpenChange: controlledOnOpenChange, sizeMode, size, snapPoints, activeSnapPoint: controlledSnap, defaultSnapPoint, onActiveSnapPointChange, minimizedSize, snapBehavior, snapStepThreshold, snapSkipThreshold, closeThreshold, velocityThreshold, dragHandleOnly, scaleBackground, modal, dismissible, preventAutoFocus, }: DrawerProps): react_jsx_runtime.JSX.Element;
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
interface DrawerHeaderProps extends ComponentPropsWithoutRef<"div"> {
}
declare const DrawerHeader: react.ForwardRefExoticComponent<DrawerHeaderProps & react.RefAttributes<HTMLDivElement>>;
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

export { type Direction, Drawer, DrawerBody, type DrawerBodyProps, DrawerClose, DrawerContent, type DrawerContentProps, type DrawerDeclaredSize, DrawerDescription, type DrawerDescriptionProps, DrawerFooter, type DrawerFooterProps, DrawerHandle, type DrawerHandleProps, DrawerHeader, type DrawerHeaderProps, DrawerOverlay, type DrawerOverlayProps, type DrawerProps, type DrawerSizeMode, type DrawerSnapBehavior, type SnapPoint as DrawerSnapPoint, DrawerTitle, type DrawerTitleProps, DrawerTrigger, type SnapPoint };
