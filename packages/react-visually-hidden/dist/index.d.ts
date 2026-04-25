import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function VisuallyHidden({ asChild, className, ref, ...props }: VisuallyHiddenProps): react_jsx_runtime.JSX.Element;

export { VisuallyHidden, type VisuallyHiddenProps };
