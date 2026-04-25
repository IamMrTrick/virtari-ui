import * as react_jsx_runtime from 'react/jsx-runtime';
import { FieldsetHTMLAttributes, Ref, HTMLAttributes, ReactNode, LabelHTMLAttributes } from 'react';

interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    /** Marks all child fields as invalid via CSS cascade. */
    invalid?: boolean;
    ref?: Ref<HTMLFieldSetElement>;
}
interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
    /** Appends a required asterisk after the label text. */
    required?: boolean;
    ref?: Ref<HTMLLegendElement>;
}
interface FieldsetDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>;
}
declare function Fieldset({ invalid, disabled, className, children, ref, ...props }: FieldsetProps): react_jsx_runtime.JSX.Element;
declare function FieldsetLegend({ required, className, children, ref, ...props }: FieldsetLegendProps): react_jsx_runtime.JSX.Element;
declare function FieldsetDescription({ className, children, ref, ...props }: FieldsetDescriptionProps): react_jsx_runtime.JSX.Element;

type FieldMetaLayout = "stacked" | "inline";
type FieldMetaAlign = "start" | "end";
interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: ReactNode;
    label?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    counter?: ReactNode;
    afterControl?: ReactNode;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    controlId?: string;
    descriptionId?: string;
    errorId?: string;
    counterId?: string;
    metaLayout?: FieldMetaLayout;
    descriptionAlign?: FieldMetaAlign;
    errorAlign?: FieldMetaAlign;
    counterAlign?: FieldMetaAlign;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    controlClassName?: string;
    afterControlClassName?: string;
    metaClassName?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function composeFieldDescribedBy(...values: Array<string | null | undefined | false>): string | undefined;
declare function Field({ children, label, description, error, counter, afterControl, invalid, required, disabled, controlId, descriptionId, errorId, counterId, metaLayout, descriptionAlign, errorAlign, counterAlign, labelProps, className, controlClassName, afterControlClassName, metaClassName, ref, ...props }: FieldProps): react_jsx_runtime.JSX.Element;

export { Field, type FieldMetaAlign, type FieldMetaLayout, type FieldProps, Fieldset, FieldsetDescription, type FieldsetDescriptionProps, FieldsetLegend, type FieldsetLegendProps, type FieldsetProps, composeFieldDescribedBy };
