import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>;
}
declare function Kbd({ className, ref, ...props }: KbdProps): react_jsx_runtime.JSX.Element;

export { Kbd, type KbdProps };
