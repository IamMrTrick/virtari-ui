import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof LabelPrimitive.Root>>;
}
declare function Label({ className, ref, ...props }: LabelProps): react_jsx_runtime.JSX.Element;

export { Label, type LabelProps };
