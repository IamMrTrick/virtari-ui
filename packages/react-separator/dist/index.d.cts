import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
    label?: React.ReactNode;
    ref?: Ref<ComponentRef<typeof SeparatorPrimitive.Root>>;
}
declare function Separator({ className, orientation, decorative, label, ref, ...props }: SeparatorProps): react_jsx_runtime.JSX.Element;

export { Separator, type SeparatorProps };
