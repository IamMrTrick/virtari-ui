import { forwardRef } from "react";
import { Slot } from "../../lib/primitives/slot";
import type { ComponentPropsWithoutRef } from "react";

import { useFormField } from "./use-form-field";

export interface FormControlProps extends ComponentPropsWithoutRef<typeof Slot> {}

/**
 * Wraps a single form control (Input/Select/Checkbox/…) via Slot and
 * injects the id + aria wiring derived from the enclosing FormField/FormItem.
 * The child receives `id`, `aria-describedby`, and `aria-invalid`.
 */
export const FormControl = forwardRef<HTMLElement, FormControlProps>(
  function FormControl(props, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField();
    const describedBy = error
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId;
    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  },
);
