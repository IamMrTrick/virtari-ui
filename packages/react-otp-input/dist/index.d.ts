import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, HTMLInputAutoCompleteAttribute, Ref } from 'react';

type OtpInputType = "numeric" | "alphanumeric" | "alphabetic";
type OtpInputSize = "sm" | "md" | "lg";
interface OtpInputProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
    /** Number of input slots. */
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    /** Called when all slots are filled. */
    onComplete?: (value: string) => void;
    type?: OtpInputType;
    /** Render slots as password fields. */
    mask?: boolean;
    inputSize?: OtpInputSize;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    autoFocus?: boolean;
    /** Emits a hidden input with the completed code for native form submits. */
    name?: string;
    /** Marks each visible slot as required. */
    required?: boolean;
    /** Accessible group label. */
    label?: string;
    /** Browser autofill token. Defaults to one-time-code on the first slot. */
    autoComplete?: HTMLInputAutoCompleteAttribute;
    /** Normalize Persian and Arabic digits to ASCII before validation. */
    normalizeDigits?: boolean;
    /** Select a slot's value when it receives focus. */
    selectOnFocus?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function OtpInput({ length, value, onChange, onComplete, type, mask, inputSize, disabled, readOnly, invalid, autoFocus, name, required, label, autoComplete, normalizeDigits, selectOnFocus, className, ref, id, dir, "aria-describedby": ariaDescribedBy, ...rootProps }: OtpInputProps): react_jsx_runtime.JSX.Element;

export { OtpInput, type OtpInputProps, type OtpInputSize, type OtpInputType };
