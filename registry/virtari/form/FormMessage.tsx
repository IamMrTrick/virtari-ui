import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

import { useFormField } from "./use-form-field";

export interface FormMessageProps
  extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Override content. When omitted, the component reads `error.message` from
   * the form state. When there is no error, the component renders nothing.
   */
  children?: ReactNode;
}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  function FormMessage({ className, children, ...props }, ref) {
    const { error, formMessageId } = useFormField();
    const body = children ?? (error?.message ? String(error.message) : null);
    const hasBody = Boolean(body);
    return (
      <p
        ref={ref}
        id={formMessageId}
        role={hasBody ? "alert" : undefined}
        aria-hidden={hasBody ? undefined : true}
        data-visible={hasBody ? "" : undefined}
        data-empty={hasBody ? undefined : ""}
        className={cn("vds-form-item-message", className)}
        {...props}
      >
        <span className="vds-form-item-message-body">{body}</span>
      </p>
    );
  },
);
