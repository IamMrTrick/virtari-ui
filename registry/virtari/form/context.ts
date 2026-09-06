import { createContext } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null,
);

export interface FormItemContextValue {
  /** Stable id base, e.g. "vds-form-item-abc". Parts derive their ids from it. */
  id: string;
}

export const FormItemContext = createContext<FormItemContextValue | null>(null);
