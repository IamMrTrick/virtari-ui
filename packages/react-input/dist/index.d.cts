import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ReactNode, CSSProperties } from 'react';
import { FieldProps } from '@virtari-packages/react-fieldset';

type InputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Size preset — shares height ramp with Button, Select, Toggle */
    inputSize?: InputSize;
    ref?: Ref<HTMLInputElement>;
}
declare function Input({ inputSize, className, ref, ...props }: InputProps): react_jsx_runtime.JSX.Element;
interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function InputWrapper({ className, ref, ...props }: InputWrapperProps): react_jsx_runtime.JSX.Element;
interface InputIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>;
}
declare function InputIcon({ className, ref, ...props }: InputIconProps): react_jsx_runtime.JSX.Element;
interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function InputGroup({ className, ref, ...props }: InputGroupProps): react_jsx_runtime.JSX.Element;
type InputAddonSide = "start" | "end";
interface InputAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
    side?: InputAddonSide;
    ref?: Ref<HTMLSpanElement>;
}
declare function InputAddon({ side, className, ref, ...props }: InputAddonProps): react_jsx_runtime.JSX.Element;

interface InputFieldProps extends Omit<FieldProps, keyof InputProps | "afterControl" | "children" | "controlId" | "counter" | "disabled" | "invalid" | "ref" | "required">, Omit<InputProps, "className" | "ref" | "style"> {
    counter?: ReactNode;
    className?: string;
    style?: CSSProperties;
    inputClassName?: string;
    inputStyle?: CSSProperties;
    showCounter?: boolean;
    counterFormatter?: (current: number, maxLength?: number) => ReactNode;
    revealable?: boolean;
    showStrengthMeter?: boolean;
    strengthFormatter?: (score: number, value: string) => ReactNode;
    afterControl?: ReactNode;
    invalid?: boolean;
    ref?: Ref<HTMLInputElement>;
}
declare function InputField({ label, description, error, counter, metaLayout, descriptionAlign, errorAlign, counterAlign, labelProps, className, style, inputClassName, inputStyle, showCounter, counterFormatter, revealable, showStrengthMeter, strengthFormatter, afterControl, invalid, ref, id, value, defaultValue, onChange, type, required, disabled, maxLength, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, ...props }: InputFieldProps): react_jsx_runtime.JSX.Element;

export { Input, InputAddon, type InputAddonProps, type InputAddonSide, InputField, type InputFieldProps, InputGroup, type InputGroupProps, InputIcon, type InputIconProps, type InputProps, type InputSize, InputWrapper, type InputWrapperProps };
