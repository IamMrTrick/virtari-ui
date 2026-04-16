import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type SpinnerSize = "sm" | "md" | "lg";
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Size of the spinner */
    size?: SpinnerSize;
    ref?: Ref<HTMLSpanElement>;
}
declare function Spinner({ size, className, ref, ...props }: SpinnerProps): react_jsx_runtime.JSX.Element;

export { Spinner, type SpinnerProps, type SpinnerSize };
