import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.Root>>;
}
declare function ScrollArea({ className, children, ref, ...props }: ScrollAreaProps): react_jsx_runtime.JSX.Element;
interface ScrollBarProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
    ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}
declare function ScrollBar({ className, orientation, ref, ...props }: ScrollBarProps): react_jsx_runtime.JSX.Element;

export { ScrollArea, type ScrollAreaProps, ScrollBar, type ScrollBarProps };
