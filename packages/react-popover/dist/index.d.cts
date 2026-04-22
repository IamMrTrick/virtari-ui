import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as PopoverPrimitive from '@radix-ui/react-popover';

interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
    /** Reading direction. Defaults to the document's active direction. */
    dir?: "ltr" | "rtl";
}
declare function Popover({ dir, ...props }: PopoverProps): react_jsx_runtime.JSX.Element;
declare const PopoverTrigger: react.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: react.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof PopoverPrimitive.Content>>;
}
declare function PopoverContent({ className, sideOffset, align, ref, ...props }: PopoverContentProps): react_jsx_runtime.JSX.Element;

export { Popover, PopoverClose, PopoverContent, type PopoverContentProps, PopoverTrigger };
