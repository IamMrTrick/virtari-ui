import {
  Field,
  composeFieldDescribedBy,
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
  invalid = false,
  ref,
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const resolvedControlId = controlId ?? `vds-select-field-${generatedId}`;
  const descriptionId = description
    ? `${resolvedControlId}-description`
    : undefined;
  const errorId = error ? `${resolvedControlId}-error` : undefined;
  const counterId = counter ? `${resolvedControlId}-counter` : undefined;
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
          invalid,
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
      invalid={invalid}
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
