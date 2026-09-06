import { forwardRef } from "react";
import {
  Field,
  composeFieldDescribedBy,
  hasFieldContent,
  type FieldProps,
} from "@virtari-packages/react-fieldset";
import {
  IconEye,
  IconEyeOff,
} from "@virtari-packages/react-icons";
import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import { useId, useState, useRef } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import { Input, type InputProps } from "./Input";
import { getPasswordStrength } from "./passwordStrength";

type AriaInvalidValue = InputProps["aria-invalid"] | boolean | undefined;

export interface InputFieldProps
  extends Omit<
      FieldProps,
      | keyof InputProps
      | "afterControl"
      | "children"
      | "controlId"
      | "counter"
      | "disabled"
      | "invalid"
      | "ref"
      | "required"
    >,
    Omit<InputProps, "className" | "ref" | "style"> {
  counter?: ReactNode;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  showCounter?: boolean;
  counterFormatter?: (current: number, maxLength?: number) => ReactNode;
  revealable?: boolean;
  showStrengthMeter?: boolean;
  strengthFormatter?: (score: number, value: string) => ReactNode;
  afterControl?: ReactNode;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}

function isInvalid(value: AriaInvalidValue) {
  return value !== undefined && value !== false && value !== "false";
}

function resolveTextValue(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function defaultCounterFormatter(current: number, maxLength?: number) {
  return maxLength !== undefined ? `${current}/${maxLength}` : current;
}

function defaultStrengthFormatter(score: number) {
  const labels = ["Very weak", "Weak", "Fair", "Strong", "Excellent"];
  return labels[score] ?? labels[0];
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField({
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
  inputClassName,
  inputStyle,
  showCounter,
  counterFormatter = defaultCounterFormatter,
  revealable = false,
  showStrengthMeter = false,
  strengthFormatter = defaultStrengthFormatter,
  afterControl,
  invalid,
  id,
  value,
  defaultValue,
  onChange,
  type = "text",
  required,
  disabled,
  maxLength,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}, ref) {
  const localRef = useRef<HTMLInputElement>(null);
  const mergedRef = useComposedRefs(localRef, ref);
  const generatedId = useId();
  const controlId = id ?? `vds-input-field-${generatedId}`;
  const descriptionId = hasFieldContent(description)
    ? `${controlId}-description`
    : undefined;
  const errorId = hasFieldContent(error) ? `${controlId}-error` : undefined;
  const resolvedInvalid = invalid ?? (ariaInvalid !== undefined ? isInvalid(ariaInvalid) : hasFieldContent(error));
  const [revealed, setRevealed] = useState(false);
  const [pwAnim, setPwAnim] = useState<"reveal" | "hide" | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue),
  );
  useFormReset(localRef, () => setUncontrolledValue(resolveTextValue(defaultValue)), props.form);
  const isControlled = value !== undefined;
  const currentValue = isControlled
    ? resolveTextValue(value)
    : uncontrolledValue;
  const currentLength = currentValue.length;
  const resolvedCounter =
    counter ??
    (showCounter ? counterFormatter(currentLength, maxLength) : undefined);
  const counterId = hasFieldContent(resolvedCounter) ? `${controlId}-counter` : undefined;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId,
  );

  const canReveal = revealable && type === "password";
  const resolvedType = canReveal && revealed ? "text" : type;
  const strengthScore =
    showStrengthMeter && type === "password"
      ? getPasswordStrength(currentValue)
      : 0;
  const resolvedAfterControl =
    showStrengthMeter && type === "password" && currentValue ? (
      <>
        <div
          className="vds-input-field-strength"
          data-score={strengthScore}
          style={
            {
              "--vds-input-strength-score": strengthScore,
            } as CSSProperties
          }
        >
          <div
            className="vds-input-field-strength-bar"
            aria-hidden="true"
          >
            <span className="vds-input-field-strength-fill" />
          </div>
          <span className="vds-input-field-strength-label">
            {strengthFormatter(strengthScore, currentValue)}
          </span>
        </div>
        {afterControl}
      </>
    ) : (
      afterControl
    );

  return (
    <Field
      className={cn("vds-input-field", className)}
      style={style}
      label={label}
      labelProps={labelProps}
      description={description}
      error={error}
      counter={resolvedCounter}
      invalid={resolvedInvalid}
      required={required}
      disabled={disabled}
      controlId={controlId}
      descriptionId={descriptionId}
      errorId={errorId}
      counterId={counterId}
      metaLayout={metaLayout}
      descriptionAlign={descriptionAlign}
      errorAlign={errorAlign}
      counterAlign={counterAlign}
      afterControl={resolvedAfterControl}
    >
      <div
        className="vds-input-field-control"
        data-has-action={canReveal || undefined}
        data-pw-anim={pwAnim ?? undefined}
        onAnimationEnd={() => setPwAnim(null)}
      >
        <Input
          {...props}
          ref={mergedRef}
          id={controlId}
          value={value}
          defaultValue={defaultValue}
          onChange={(event) => {
            if (!isControlled) setUncontrolledValue(event.target.value);
            onChange?.(event);
          }}
          type={resolvedType}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          aria-describedby={describedBy}
          aria-invalid={invalid !== undefined ? invalid : ariaInvalid ?? (resolvedInvalid || undefined)}
          className={inputClassName}
          style={inputStyle}
        />

        {canReveal ? (
          <button
            type="button"
            className="vds-input-field-action"
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            disabled={disabled}
            onClick={() => {
              const next = !revealed;
              setRevealed(next);
              setPwAnim(next ? "reveal" : "hide");
            }}
          >
            {revealed ? (
              <IconEyeOff size={16} stroke={1.75} aria-hidden />
            ) : (
              <IconEye size={16} stroke={1.75} aria-hidden />
            )}
          </button>
        ) : null}
      </div>
    </Field>
  );
});
