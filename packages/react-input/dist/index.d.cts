import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type InputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Size preset — shares height ramp with Button, Select, Toggle */
    inputSize?: InputSize;
    ref?: Ref<HTMLInputElement>;
}
declare function Input({ inputSize, className, ref, ...props }: InputProps): react_jsx_runtime.JSX.Element;

export { Input, type InputProps, type InputSize };
