import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

import { useFormField } from "./use-form-field";

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(function FormDescription({ className, ...props }, ref) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("vds-form-item-description", className)}
      {...props}
    />
  );
});
