import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type CopyButtonVariant = "ghost" | "outline" | "soft";
type CopyButtonSize = "2xs" | "xs" | "sm" | "md" | "lg";
interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    /** Text to copy to the clipboard. */
    text: string;
    /** How long the "copied" state lasts in ms. */
    feedbackMs?: number;
    variant?: CopyButtonVariant;
    copyButtonSize?: CopyButtonSize;
    /** Optional visible label next to the icon. */
    label?: string;
    /** Label shown while in the "copied" state. */
    copiedLabel?: string;
    ref?: Ref<HTMLButtonElement>;
}
declare function CopyButton({ text, feedbackMs, variant, copyButtonSize, label, copiedLabel, className, ref, ...props }: CopyButtonProps): react_jsx_runtime.JSX.Element;

export { CopyButton, type CopyButtonProps, type CopyButtonSize, type CopyButtonVariant };
