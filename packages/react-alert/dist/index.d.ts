import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type AlertVariant = "info" | "success" | "warning" | "danger";
type AlertSize = "sm" | "md" | "lg";
type AlertAppearance = "soft" | "solid" | "outline";
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    size?: AlertSize;
    appearance?: AlertAppearance;
    asChild?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function Alert({ variant, size, appearance, asChild, className, ref, role, ...props }: AlertProps): react_jsx_runtime.JSX.Element;
interface AlertIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function AlertIcon({ asChild, className, ref, ...props }: AlertIconProps): react_jsx_runtime.JSX.Element;
interface AlertContentProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function AlertContent({ className, ref, ...props }: AlertContentProps): react_jsx_runtime.JSX.Element;
interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>;
}
declare function AlertTitle({ className, ref, ...props }: AlertTitleProps): react_jsx_runtime.JSX.Element;
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>;
}
declare function AlertDescription({ className, ref, ...props }: AlertDescriptionProps): react_jsx_runtime.JSX.Element;
interface AlertCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    ref?: Ref<HTMLButtonElement>;
}
declare function AlertClose({ asChild, className, type, "aria-label": ariaLabel, children, ref, ...props }: AlertCloseProps): react_jsx_runtime.JSX.Element;

export { Alert, type AlertAppearance, AlertClose, type AlertCloseProps, AlertContent, type AlertContentProps, AlertDescription, type AlertDescriptionProps, AlertIcon, type AlertIconProps, type AlertProps, type AlertSize, AlertTitle, type AlertTitleProps, type AlertVariant };
