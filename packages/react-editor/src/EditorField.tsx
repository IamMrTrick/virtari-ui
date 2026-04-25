import {
  Field,
  composeFieldDescribedBy,
  type FieldProps,
} from "@virtari-packages/react-fieldset";
import { cn } from "@virtari-packages/utils";
import { useId, type CSSProperties } from "react";
import { Editor } from "./Editor";
import type { EditorProps } from "./types";

type AriaInvalidValue = EditorProps["aria-invalid"] | boolean | undefined;

function isInvalid(value: AriaInvalidValue) {
  return value !== undefined && value !== false && value !== "false";
}

export interface EditorFieldProps
  extends Omit<
      FieldProps,
      | keyof EditorProps
      | "children"
      | "controlId"
      | "disabled"
      | "invalid"
      | "required"
    >,
    Omit<EditorProps, "className" | "style"> {
  className?: string;
  style?: CSSProperties;
  editorClassName?: string;
  editorStyle?: CSSProperties;
  invalid?: boolean;
}

export function EditorField({
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
  style,
  editorClassName,
  editorStyle,
  invalid,
  id,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: EditorFieldProps) {
  const generatedId = useId();
  const controlId = id ?? `vds-editor-field-${generatedId}`;
  const labelId = label ? `${controlId}-label` : undefined;
  const descriptionId = description
    ? `${controlId}-description`
    : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const counterId = counter !== undefined ? `${controlId}-counter` : undefined;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId,
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);

  return (
    <Field
      className={cn("vds-editor-field", className)}
      style={style}
      label={label}
      labelProps={{
        ...labelProps,
        id: labelId,
      }}
      description={description}
      error={error}
      counter={counter}
      invalid={resolvedInvalid}
      disabled={readOnly}
      descriptionId={descriptionId}
      errorId={errorId}
      counterId={counterId}
      metaLayout={metaLayout}
      descriptionAlign={descriptionAlign}
      errorAlign={errorAlign}
      counterAlign={counterAlign}
    >
      <Editor
        {...props}
        id={controlId}
        readOnly={readOnly}
        className={editorClassName}
        style={editorStyle}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={resolvedInvalid || undefined}
      />
    </Field>
  );
}

