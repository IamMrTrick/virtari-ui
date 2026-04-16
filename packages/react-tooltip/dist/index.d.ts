import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

declare const TooltipProvider: react.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: react.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: react.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof TooltipPrimitive.Content>>;
}
declare function TooltipContent({ className, sideOffset, ref, ...props }: TooltipContentProps): react_jsx_runtime.JSX.Element;

export { Tooltip, TooltipContent, type TooltipContentProps, TooltipProvider, TooltipTrigger };
