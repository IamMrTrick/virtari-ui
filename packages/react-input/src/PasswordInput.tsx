import { forwardRef } from "react";
import { composeFieldDescribedBy } from "@virtari-packages/react-fieldset";
import {
  IconCheck,
  IconEye,
  IconEyeOff,
} from "@virtari-packages/react-icons";
import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  ChangeEvent,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import { Input, type InputProps } from "./Input";
import {
  analyzePasswordStrength,
  type PasswordStrengthAnalysis,
  type PasswordStrengthOptions,
  type PasswordStrengthStandard,
  type PasswordRequirementConfig,
} from "./passwordStrength";

type PasswordInputValue = InputProps["value"] | InputProps["defaultValue"];

export interface PasswordStrengthMeterProps
  extends HTMLAttributes<HTMLDivElement> {
  analysis: PasswordStrengthAnalysis;
  label?: ReactNode;
  strengthFormatter?: (analysis: PasswordStrengthAnalysis) => ReactNode;
  showStrengthBar?: boolean;
  showRequirements?: boolean;
  showFeedback?: boolean;
  requirementsLabel?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export interface PasswordInputProps
  extends Omit<InputProps, "type"> {
  rootClassName?: string;
  rootStyle?: CSSProperties;
  revealable?: boolean;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  showStrengthMeter?: boolean;
  showStrengthBar?: boolean;
  showRequirements?: boolean;
  showFeedback?: boolean;
  requirements?: PasswordRequirementConfig[];
  requirementsLabel?: ReactNode;
  strengthStandard?: PasswordStrengthStandard;
  strongLength?: number;
  strengthOptions?: PasswordStrengthOptions;
  strengthFormatter?: (analysis: PasswordStrengthAnalysis) => ReactNode;
  onStrengthChange?: (analysis: PasswordStrengthAnalysis) => void;
  strengthId?: string;
  strengthClassName?: string;
  strengthStyle?: CSSProperties;
  strengthLabel?: ReactNode;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  ref?: Ref<HTMLInputElement>;
}

function resolveTextValue(value: PasswordInputValue) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.join("");
  return "";
}

export function PasswordStrengthMeter({
  analysis,
  label = "Password strength",
  strengthFormatter,
  showStrengthBar = true,
  showRequirements = false,
  showFeedback = false,
  requirementsLabel,
  className,
  style,
  ref,
  ...props
}: PasswordStrengthMeterProps) {
  const resolvedLabel = strengthFormatter
    ? strengthFormatter(analysis)
    : analysis.label;
  const segmentCount = 5;
  const activeSegments =
    analysis.length === 0
      ? 0
      : Math.max(1, Math.min(segmentCount, Math.ceil(analysis.percent / 20)));

  return (
    <div
      ref={ref}
      className={cn("vds-password-strength", className)}
      data-score={analysis.score}
      data-level={analysis.level}
      data-color={analysis.color}
      data-has-requirements={showRequirements || undefined}
      style={
        {
          "--vds-password-strength-percent": `${analysis.percent}%`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {showRequirements ? (
        <>
          {requirementsLabel ? (
            <div className="vds-password-requirements-label">
              {requirementsLabel}
            </div>
          ) : null}
          <ul className="vds-password-requirements">
            {analysis.requirements.map((requirement) => (
              <li
                key={requirement.id}
                className="vds-password-requirement"
                data-met={requirement.met || undefined}
              >
                <span className="vds-password-requirement-icon" aria-hidden>
                  <IconCheck size={9} stroke={3} />
                </span>
                <span>{requirement.label}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {showStrengthBar ? (
        <div className="vds-password-strength-meter">
          <div className="vds-password-strength-header">
            <span className="vds-password-strength-title">{label}</span>
            <span className="vds-password-strength-value" aria-live="polite">
              {resolvedLabel}
            </span>
          </div>

          <div
            className="vds-password-strength-track"
            role="progressbar"
            aria-label={typeof label === "string" ? label : "Password strength"}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={analysis.percent}
            aria-valuetext={
              typeof resolvedLabel === "string"
                ? resolvedLabel
                : `${analysis.percent}%`
            }
          >
            {Array.from({ length: segmentCount }, (_, index) => (
              <span
                key={index}
                className="vds-password-strength-segment"
                data-active={index < activeSegments || undefined}
              />
            ))}
          </div>
        </div>
      ) : null}

      {showFeedback ? (
        <p className="vds-password-strength-feedback">
          {analysis.feedback}
        </p>
      ) : null}
    </div>
  );
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput({
  rootClassName,
  rootStyle,
  className,
  style,
  revealable = true,
  revealed,
  defaultRevealed = false,
  onRevealedChange,
  showStrengthMeter = true,
  showStrengthBar = true,
  showRequirements = false,
  showFeedback = false,
  requirements,
  requirementsLabel,
  strengthStandard,
  strongLength,
  strengthOptions,
  strengthFormatter,
  onStrengthChange,
  strengthId,
  strengthClassName,
  strengthStyle,
  strengthLabel,
  showPasswordLabel = "Show password",
  hidePasswordLabel = "Hide password",
  id,
  value,
  defaultValue,
  onChange,
  minLength,
  disabled,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  ...props
}, ref) {
  const generatedId = useId();
  const localRef = useRef<HTMLInputElement>(null);
  const controlId = id ?? `vds-password-input-${generatedId}`;
  const meterId = strengthId ?? `${controlId}-strength`;
  const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
  const [pwAnim, setPwAnim] = useState<"reveal" | "hide" | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    resolveTextValue(defaultValue),
  );
  useFormReset(localRef, () => setUncontrolledValue(resolveTextValue(defaultValue)), props.form);
  const isValueControlled = value !== undefined;
  const isRevealedControlled = revealed !== undefined;
  const currentValue = isValueControlled
    ? resolveTextValue(value)
    : uncontrolledValue;
  const isRevealed = isRevealedControlled ? revealed : internalRevealed;
  const resolvedStrengthOptions = useMemo(
    () => ({
      ...strengthOptions,
      standard: strengthStandard ?? strengthOptions?.standard ?? "standard",
      minLength: minLength ?? strengthOptions?.minLength,
      strongLength: strongLength ?? strengthOptions?.strongLength,
      requirements: requirements ?? strengthOptions?.requirements,
    }),
    [minLength, requirements, strengthOptions, strengthStandard, strongLength],
  );
  const analysis = useMemo(
    () => analyzePasswordStrength(currentValue, resolvedStrengthOptions),
    [currentValue, resolvedStrengthOptions],
  );
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    showStrengthMeter ? meterId : undefined,
  );
  const resolvedType = isRevealed ? "text" : "password";

  const mergedRef = useComposedRefs(localRef, ref);

  useEffect(() => {
    onStrengthChange?.(analysis);
  }, [onStrengthChange, analysis]);

  const setRevealState = (next: boolean) => {
    if (!isRevealedControlled) setInternalRevealed(next);
    onRevealedChange?.(next);
    setPwAnim(next ? "reveal" : "hide");
    requestAnimationFrame(() => localRef.current?.focus());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isValueControlled) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div
      className={cn("vds-password-input-root", rootClassName)}
      style={rootStyle}
      data-disabled={disabled || undefined}
    >
      <div
        className="vds-input-field-control vds-password-input-control"
        data-has-action={revealable || undefined}
        data-pw-anim={pwAnim ?? undefined}
        onAnimationEnd={() => setPwAnim(null)}
      >
        <Input
          {...props}
          ref={mergedRef}
          id={controlId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          type={resolvedType}
          minLength={minLength}
          disabled={disabled}
          readOnly={readOnly}
          aria-describedby={describedBy}
          className={className}
          style={style}
        />

        {revealable ? (
          <button
            type="button"
            className="vds-input-field-action"
            aria-label={isRevealed ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={isRevealed}
            disabled={disabled}
            onClick={() => setRevealState(!isRevealed)}
          >
            {isRevealed ? (
              <IconEyeOff size={16} stroke={1.75} aria-hidden />
            ) : (
              <IconEye size={16} stroke={1.75} aria-hidden />
            )}
          </button>
        ) : null}
      </div>

      {showStrengthMeter ? (
        <PasswordStrengthMeter
          id={meterId}
          analysis={analysis}
          label={strengthLabel}
          strengthFormatter={strengthFormatter}
          showStrengthBar={showStrengthBar}
          showRequirements={showRequirements}
          showFeedback={showFeedback}
          requirementsLabel={requirementsLabel}
          className={strengthClassName}
          style={strengthStyle}
        />
      ) : null}
    </div>
  );
});
