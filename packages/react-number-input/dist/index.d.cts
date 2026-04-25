import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, CSSProperties } from 'react';
import { FieldProps } from '@virtari-packages/react-fieldset';

type NumberInputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "type" | "size"> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number | undefined) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Decimal places to round to on blur. */
    precision?: number;
    /** Clamp to min/max on blur. Default: true. */
    clampOnBlur?: boolean;
    inputSize?: NumberInputSize;
    invalid?: boolean;
    ref?: Ref<HTMLInputElement>;
}
declare function NumberInput({ value, defaultValue, onChange, onBlur, min, max, step, precision, clampOnBlur, inputSize, disabled, readOnly, invalid, className, ref, ...props }: NumberInputProps): react_jsx_runtime.JSX.Element;

interface NumberInputFieldProps extends Omit<FieldProps, keyof NumberInputProps | "children" | "controlId" | "disabled" | "invalid" | "ref" | "required">, Omit<NumberInputProps, "className" | "ref" | "style"> {
    className?: string;
    style?: CSSProperties;
    numberInputClassName?: string;
    numberInputStyle?: CSSProperties;
    invalid?: boolean;
    ref?: Ref<HTMLInputElement>;
}
declare function NumberInputField({ label, description, error, counter, metaLayout, descriptionAlign, errorAlign, counterAlign, labelProps, className, style, numberInputClassName, numberInputStyle, invalid, ref, id, required, disabled, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, ...props }: NumberInputFieldProps): react_jsx_runtime.JSX.Element;

export { NumberInput, NumberInputField, type NumberInputFieldProps, type NumberInputProps, type NumberInputSize };
