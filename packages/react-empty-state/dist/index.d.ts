import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, Ref } from 'react';

type EmptyStateSize = "sm" | "md" | "lg";
type EmptyStateOrientation = "vertical" | "horizontal";
interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    size?: EmptyStateSize;
    orientation?: EmptyStateOrientation;
    ref?: Ref<HTMLDivElement>;
}
interface EmptyStateIconProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface EmptyStateTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>;
}
interface EmptyStateDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>;
}
interface EmptyStateActionsProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function EmptyState({ size, orientation, className, children, ref, ...props }: EmptyStateProps): react_jsx_runtime.JSX.Element;
declare function EmptyStateIcon({ className, children, ref, ...props }: EmptyStateIconProps): react_jsx_runtime.JSX.Element;
declare function EmptyStateTitle({ className, children, ref, ...props }: EmptyStateTitleProps): react_jsx_runtime.JSX.Element;
declare function EmptyStateDescription({ className, children, ref, ...props }: EmptyStateDescriptionProps): react_jsx_runtime.JSX.Element;
declare function EmptyStateActions({ className, children, ref, ...props }: EmptyStateActionsProps): react_jsx_runtime.JSX.Element;

export { EmptyState, EmptyStateActions, type EmptyStateActionsProps, EmptyStateDescription, type EmptyStateDescriptionProps, EmptyStateIcon, type EmptyStateIconProps, type EmptyStateOrientation, type EmptyStateProps, type EmptyStateSize, EmptyStateTitle, type EmptyStateTitleProps };
