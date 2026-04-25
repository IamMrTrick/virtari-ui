import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ReactNode, CSSProperties } from 'react';
import { FieldProps } from '@virtari-packages/react-fieldset';

type TextareaSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Size preset — controls padding and font-size, shares ramp with Input */
    inputSize?: TextareaSize;
    ref?: Ref<HTMLTextAreaElement>;
}
declare function Textarea({ inputSize, className, ref, ...props }: TextareaProps): react_jsx_runtime.JSX.Element;

interface TextareaFieldProps extends Omit<FieldProps, keyof TextareaProps | "children" | "controlId" | "counter" | "disabled" | "invalid" | "ref" | "required">, Omit<TextareaProps, "className" | "ref" | "style"> {
    counter?: ReactNode;
    className?: string;
    style?: CSSProperties;
    textareaClassName?: string;
    textareaStyle?: CSSProperties;
    showCounter?: boolean;
    counterFormatter?: (current: number, maxLength?: number) => ReactNode;
    invalid?: boolean;
    ref?: Ref<HTMLTextAreaElement>;
}
declare function TextareaField({ label, description, error, counter, metaLayout, descriptionAlign, errorAlign, counterAlign, labelProps, className, style, textareaClassName, textareaStyle, showCounter, counterFormatter, invalid, ref, id, value, defaultValue, onChange, required, disabled, maxLength, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, ...props }: TextareaFieldProps): react_jsx_runtime.JSX.Element;

export { Textarea, TextareaField, type TextareaFieldProps, type TextareaProps, type TextareaSize };
