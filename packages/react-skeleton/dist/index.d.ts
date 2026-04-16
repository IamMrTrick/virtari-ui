import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Fixed width (CSS value) */
    width?: string | number;
    /** Fixed height (CSS value) */
    height?: string | number;
    /** Render as a circle (sets border-radius to 50%) */
    circle?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function Skeleton({ width, height, circle, className, style, ref, ...props }: SkeletonProps): react_jsx_runtime.JSX.Element;

export { Skeleton, type SkeletonProps };
