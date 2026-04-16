import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof ProgressPrimitive.Root>>;
}
declare function Progress({ className, value, ref, ...props }: ProgressProps): react_jsx_runtime.JSX.Element;

export { Progress, type ProgressProps };
