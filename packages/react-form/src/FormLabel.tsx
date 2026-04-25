import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Label } from "@virtari-packages/react-label";
import type { LabelProps } from "@virtari-packages/react-label";
import { cn } from "@virtari-packages/utils";

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
