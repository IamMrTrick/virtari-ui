import * as React from 'react';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import * as PopperPrimitive from '../popper';
import { Portal as PortalPrimitive } from '../portal';
import { Primitive } from '../primitive';
declare const createPopoverScope: import("../context").CreateScope;
interface PopoverProps {
    children?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
}
declare const Popover: React.FC<PopoverProps>;
type PopperAnchorProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Anchor>;
interface PopoverAnchorProps extends PopperAnchorProps {
}
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface PopoverTriggerProps extends PrimitiveButtonProps {
}
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface PopoverPortalProps {
    children?: React.ReactNode;
    /**
     * Specify a container element to portal the content into.
     */
    container?: PortalProps['container'];
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
declare const PopoverPortal: React.FC<PopoverPortalProps>;
interface PopoverContentProps extends PopoverContentTypeProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverContentTypeProps extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {
}
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
interface PopoverContentImplProps extends Omit<PopperContentProps, 'onPlaced'>, Omit<DismissableLayerProps, 'onDismiss'> {
    /**
     * Whether focus should be trapped within the `Popover`
     * (default: false)
     */
    trapFocus?: FocusScopeProps['trapped'];
    /**
     * Event handler called when auto-focusing on open.
     * Can be prevented.
     */
    onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];
    /**
     * Event handler called when auto-focusing on close.
     * Can be prevented.
     */
    onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];
}
interface PopoverCloseProps extends PrimitiveButtonProps {
}
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
type PopperArrowProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Arrow>;
interface PopoverArrowProps extends PopperArrowProps {
}
declare const PopoverArrow: React.ForwardRefExoticComponent<PopoverArrowProps & React.RefAttributes<SVGSVGElement>>;
declare const Root: React.FC<PopoverProps>;
declare const Anchor: React.ForwardRefExoticComponent<PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const Trigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const Portal: React.FC<PopoverPortalProps>;
declare const Content: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
declare const Close: React.ForwardRefExoticComponent<PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const Arrow: React.ForwardRefExoticComponent<PopoverArrowProps & React.RefAttributes<SVGSVGElement>>;
export { createPopoverScope, Popover, PopoverAnchor, PopoverTrigger, PopoverPortal, PopoverContent, PopoverClose, PopoverArrow, Root, Anchor, Trigger, Portal, Content, Close, Arrow, };
export type { PopoverProps, PopoverAnchorProps, PopoverTriggerProps, PopoverPortalProps, PopoverContentProps, PopoverCloseProps, PopoverArrowProps, };
