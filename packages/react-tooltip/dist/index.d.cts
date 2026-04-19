import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

type TooltipSize = "sm" | "md" | "lg";
type TooltipVariant = "default" | "inverted" | "info" | "success" | "warning" | "danger";
interface TooltipProviderProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {
}
declare function TooltipProvider({ delayDuration, skipDelayDuration, ...props }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
declare const Tooltip: react.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: react.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof TooltipPrimitive.Content>>;
    size?: TooltipSize;
    variant?: TooltipVariant;
    /** Render an arrow pointing to the trigger. */
    arrow?: boolean;
}
declare function TooltipContent({ className, sideOffset, collisionPadding, size, variant, arrow, children, ref, ...props }: TooltipContentProps): react_jsx_runtime.JSX.Element;
interface TooltipArrowProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {
    ref?: Ref<ComponentRef<typeof TooltipPrimitive.Arrow>>;
}
declare function TooltipArrow({ className, ref, ...props }: TooltipArrowProps): react_jsx_runtime.JSX.Element;

export { Tooltip, TooltipArrow, type TooltipArrowProps, TooltipContent, type TooltipContentProps, TooltipProvider, type TooltipProviderProps, type TooltipSize, TooltipTrigger, type TooltipVariant };
