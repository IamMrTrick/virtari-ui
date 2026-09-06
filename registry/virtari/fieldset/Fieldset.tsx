import { cn } from "../../lib/utils";
import type {
  Ref,
  FieldsetHTMLAttributes,
  HTMLAttributes,
} from "react";

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Marks all child fields as invalid via CSS cascade. */
  invalid?: boolean;
  ref?: Ref<HTMLFieldSetElement>;
}

export interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
  /** Appends a required asterisk after the label text. */
  required?: boolean;
  ref?: Ref<HTMLLegendElement>;
}

export interface FieldsetDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

export function Fieldset({ invalid, disabled, className, children, ref, ...props }: FieldsetProps) {
  return (
    <fieldset
      ref={ref}
      className={cn("vds-fieldset", className)}
      disabled={disabled}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </fieldset>
  );
}

export function FieldsetLegend({ required, className, children, ref, ...props }: FieldsetLegendProps) {
  return (
    <legend ref={ref} className={cn("vds-fieldset-legend", className)} {...props}>
      {children}
      {required && (
        <span className="vds-fieldset-required" aria-hidden="true">
          *
        </span>
      )}
    </legend>
  );
}

export function FieldsetDescription({ className, children, ref, ...props }: FieldsetDescriptionProps) {
  return (
    <p ref={ref} className={cn("vds-fieldset-description", className)} {...props}>
      {children}
    </p>
  );
}
