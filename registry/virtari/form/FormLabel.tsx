import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Label } from "../label";
import type { LabelProps } from "../label";
import { cn } from "../../lib/utils";

import { useFormField } from "./use-form-field";

export interface FormLabelProps extends LabelProps {}

export const FormLabel = forwardRef<
  ComponentRef<typeof Label>,
  FormLabelProps
>(function FormLabel({ className, htmlFor, ...props }, ref) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={htmlFor ?? formItemId}
      data-error={error ? "" : undefined}
      className={cn("vds-form-label", className)}
      {...props}
    />
  );
});
