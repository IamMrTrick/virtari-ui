import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type ChipVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
type ChipSize = "sm" | "md" | "lg";
type ChipAppearance = "soft" | "solid" | "outline";
interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: ChipVariant;
    size?: ChipSize;
    appearance?: ChipAppearance;
    interactive?: boolean;
    disabled?: boolean;
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function Chip({ variant, size, appearance, interactive, disabled, asChild, className, ref, ...props }: ChipProps): react_jsx_runtime.JSX.Element;
interface ChipIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function ChipIcon({ asChild, className, ref, ...props }: ChipIconProps): react_jsx_runtime.JSX.Element;
interface ChipLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>;
}
declare function ChipLabel({ className, ref, ...props }: ChipLabelProps): react_jsx_runtime.JSX.Element;
interface ChipRemoveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    ref?: Ref<HTMLButtonElement>;
}
declare function ChipRemove({ asChild, className, type, "aria-label": ariaLabel, children, ref, ...props }: ChipRemoveProps): react_jsx_runtime.JSX.Element;

export { Chip, type ChipAppearance, ChipIcon, type ChipIconProps, ChipLabel, type ChipLabelProps, type ChipProps, ChipRemove, type ChipRemoveProps, type ChipSize, type ChipVariant };
