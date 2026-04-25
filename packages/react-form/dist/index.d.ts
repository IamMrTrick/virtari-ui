import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps, FieldError } from 'react-hook-form';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { HTMLAttributes, ComponentPropsWithoutRef, ReactNode } from 'react';
import { LabelProps } from '@virtari-packages/react-label';
import { Slot } from '@radix-ui/react-slot';

/**
 * Alias of react-hook-form's `FormProvider`. Using `<Form {...methods}>` reads
 * more naturally in JSX than `<FormProvider>` and keeps the Virtari surface
 * consistent with `<Form>` references in our docs.
 */
declare const Form: <TFieldValues extends react_hook_form.FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;

declare function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>): react_jsx_runtime.JSX.Element;

type FormItemOrientation = "vertical" | "horizontal";
interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: FormItemOrientation;
}
declare const FormItem: react.ForwardRefExoticComponent<FormItemProps & react.RefAttributes<HTMLDivElement>>;

interface FormLabelProps extends LabelProps {
}
declare const FormLabel: react.ForwardRefExoticComponent<Omit<FormLabelProps, "ref"> & react.RefAttributes<HTMLLabelElement>>;

interface FormControlProps extends ComponentPropsWithoutRef<typeof Slot> {
}
/**
 * Wraps a single form control (Input/Select/Checkbox/…) via Radix Slot and
 * injects the id + aria wiring derived from the enclosing FormField/FormItem.
 * The child receives `id`, `aria-describedby`, and `aria-invalid`.
 */
declare const FormControl: react.ForwardRefExoticComponent<FormControlProps & react.RefAttributes<HTMLElement>>;

interface FormDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
}
declare const FormDescription: react.ForwardRefExoticComponent<FormDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;

interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * Override content. When omitted, the component reads `error.message` from
     * the form state. When there is no error, the component renders nothing.
     */
    children?: ReactNode;
}
declare const FormMessage: react.ForwardRefExoticComponent<FormMessageProps & react.RefAttributes<HTMLParagraphElement>>;

interface UseFormFieldReturn {
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
    error: FieldError | undefined;
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
}
declare function useFormField(): UseFormFieldReturn;

interface FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName;
}
declare const FormFieldContext: react.Context<FormFieldContextValue<FieldValues, string> | null>;
interface FormItemContextValue {
    /** Stable id base, e.g. "vds-form-item-abc". Parts derive their ids from it. */
    id: string;
}
declare const FormItemContext: react.Context<FormItemContextValue | null>;

export { Form, FormControl, type FormControlProps, FormDescription, type FormDescriptionProps, FormField, FormFieldContext, type FormFieldContextValue, FormItem, FormItemContext, type FormItemContextValue, type FormItemOrientation, type FormItemProps, FormLabel, type FormLabelProps, FormMessage, type FormMessageProps, type UseFormFieldReturn, useFormField };
