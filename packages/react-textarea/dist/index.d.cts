import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type TextareaSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Size preset — controls padding and font-size, shares ramp with Input */
    inputSize?: TextareaSize;
    ref?: Ref<HTMLTextAreaElement>;
}
declare function Textarea({ inputSize, className, ref, ...props }: TextareaProps): react_jsx_runtime.JSX.Element;

export { Textarea, type TextareaProps, type TextareaSize };
