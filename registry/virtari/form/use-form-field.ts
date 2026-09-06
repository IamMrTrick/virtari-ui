import { useContext } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import type { FieldError } from "react-hook-form";

import { FormFieldContext, FormItemContext } from "./context";

export interface UseFormFieldReturn {
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

export function useFormField(): UseFormFieldReturn {
  const fieldCtx = useContext(FormFieldContext);
  const itemCtx = useContext(FormItemContext);
  if (!fieldCtx) {
    throw new Error("useFormField must be used within <FormField>.");
  }
  if (!itemCtx) {
    throw new Error("useFormField must be used within <FormItem>.");
  }
  const { getFieldState } = useFormContext();
  /* `useFormState()` subscribes to state updates; passing it to getFieldState
   * gives us a live error/dirty/touched snapshot for this field. */
  const formState = useFormState({ name: fieldCtx.name });
  const fieldState = getFieldState(fieldCtx.name, formState);

  const { id } = itemCtx;
  return {
    id,
    name: fieldCtx.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState.error,
    invalid: fieldState.invalid,
    isDirty: fieldState.isDirty,
    isTouched: fieldState.isTouched,
  };
}
