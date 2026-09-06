import {
  Field,
  composeFieldDescribedBy,
  hasFieldContent,
  type FieldProps,
} from "@virtari-packages/react-fieldset";
import { cn } from "@virtari-packages/utils";
import { useId } from "react";
import type { ReactNode, Ref } from "react";

export interface SelectFieldRenderProps {
  controlId: string;
  describedBy?: string;
  invalid: boolean;
}

export interface SelectFieldProps
  extends Omit<
    FieldProps,
    "children" | "controlId" | "invalid" | "ref"
  > {
  children:
    | ReactNode
    | ((props: SelectFieldRenderProps) => ReactNode);
  controlId?: string;
  invalid?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function SelectField({
  label,
  description,
  error,
  counter,
  metaLayout,
  descriptionAlign,
  errorAlign,
  counterAlign,
  labelProps,
  className,
  children,
  controlId,
  invalid,
  ref,
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const resolvedControlId = controlId ?? `vds-select-field-${generatedId}`;
  const ariaInvalid = props["aria-invalid"];
  const resolvedInvalid = invalid ?? (ariaInvalid !== undefined
    ? ariaInvalid !== false && ariaInvalid !== "false"
    : hasFieldContent(error));
  const descriptionId = hasFieldContent(description)
    ? `${resolvedControlId}-description`
    : undefined;
  const errorId = hasFieldContent(error) ? `${resolvedControlId}-error` : undefined;
  const counterId = hasFieldContent(counter) ? `${resolvedControlId}-counter` : undefined;
  const describedBy = composeFieldDescribedBy(
    descriptionId,
    errorId,
    counterId,
  );
  const renderedChildren =
    typeof children === "function"
      ? children({
          controlId: resolvedControlId,
          describedBy,
          invalid: resolvedInvalid,
        })
      : children;

  return (
    <Field
      ref={ref}
      className={cn("vds-select-field", className)}
      label={label}
      labelProps={labelProps}
      description={description}
      error={error}
      counter={counter}
      invalid={resolvedInvalid}
      controlId={resolvedControlId}
      descriptionId={descriptionId}
      errorId={errorId}
      counterId={counterId}
      metaLayout={metaLayout}
      descriptionAlign={descriptionAlign}
      errorAlign={errorAlign}
      counterAlign={counterAlign}
      {...props}
    >
      {renderedChildren}
    </Field>
  );
}
