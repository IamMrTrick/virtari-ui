import { Controller } from "react-hook-form";
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { FormFieldContext } from "./context";

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}
