import {
  Field,
  composeFieldDescribedBy,
  type FieldProps,
} from "@virtari-packages/react-fieldset";
import {
  IconEye,
  IconEyeOff,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import { useId, useState } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import { Input, type InputProps } from "./Input";

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

function getPasswordStrength(value: string) {
  if (!value) return 0;

  let score = 0;

  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  return Math.min(score, 4);
}

function defaultCounterFormatter(current: number, maxLength?: number) {
  return maxLength ? `${current}/${maxLength}` : current;
}

function defaultStrengthFormatter(score: number) {
  const labels = ["Very weak", "Weak", "Fair", "Strong", "Excellent"];
  return labels[score] ?? labels[0];
}

export function InputField({
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
  ref,
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
}: InputFieldProps) {
  const generatedId = useId();
  const controlId = id ?? `vds-input-field-${generatedId}`;
  const descriptionId = description
    ? `${controlId}-description`
    : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const hasCounter = counter !== undefined || showCounter;
  const counterId = hasCounter ? `${controlId}-counter` : undefined;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId,
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);
  const [revealed, setRevealed] = useState(false);
  const [pwAnim, setPwAnim] = useState<"reveal" | "hide" | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue),
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled
    ? resolveTextValue(value)
    : uncontrolledValue;
  const currentLength = currentValue.length;
  const resolvedCounter =
    counter ??
    (showCounter ? counterFormatter(currentLength, maxLength) : undefined);
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
          ref={ref}
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
          aria-invalid={resolvedInvalid || undefined}
          className={inputClassName}
          style={inputStyle}
        />

        {canReveal ? (
          <button
            type="button"
            className="vds-input-field-action"
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
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
}
