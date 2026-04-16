import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function Badge({ variant, asChild, className, ref, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

export { Badge, type BadgeProps, type BadgeVariant };
