import { cn } from "@virtari-packages/utils";
import { useCallback, useEffect, useRef } from "react";
import type { Ref } from "react";

function isPrintable(e: KeyboardEvent): boolean {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
import {
  IconChevronUp,
  IconChevronDown,
  IconPlus,
  IconMinus,
} from "@virtari-packages/react-icons";

export type NumberInputSize    = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type NumberInputStepper = "stacked" | "inline";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "type" | "size"
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Decimal places to round to on blur. */
  precision?: number;
  /** Clamp to min/max on blur. Default: true. */
  clampOnBlur?: boolean;
  inputSize?: NumberInputSize;
  /**
   * Stepper layout.
   * - `"stacked"` — up/down chevrons stacked on the trailing edge (default)
   * - `"inline"` — minus on leading edge, plus on trailing edge
   */
  stepper?: NumberInputStepper;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
  /**
   * Enable mouse-wheel scrolling to increment/decrement.
   * Only fires when the input is focused. Uses the same `step` value.
   * Default: false.
   */
  wheelEnabled?: boolean;
  /**
   * When true, wheel scrolling snaps the value to the nearest multiple of `step`.
   * Default: false.
   */
  wheelSnap?: boolean;
  /**
   * Each printable keystroke fires a brief ring-burst animation.
   * Intensity scales with typing speed. Default: false.
   */
  typingPulse?: boolean;
}

export function NumberInput({
  value,
  defaultValue,
  onChange,
  onBlur,
  min,
  max,
  step = 1,
  precision,
  clampOnBlur = true,
  inputSize = "md",
  stepper = "stacked",
  disabled = false,
  readOnly = false,
  invalid = false,
  className,
  ref,
  wheelEnabled = false,
  wheelSnap = false,
  typingPulse = false,
  ...props
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref ?? inputRef) as React.RefObject<HTMLInputElement>;

  const clamp = useCallback(
    (n: number) => {
      let v = n;
      if (min !== undefined) v = Math.max(min, v);
      if (max !== undefined) v = Math.min(max, v);
      return precision !== undefined ? parseFloat(v.toFixed(precision)) : v;
    },
    [min, max, precision],
  );

  const lastKeyAt = useRef(0);
  const lastPulseAt = useRef(0);

  // Live ref so wheel + typing handlers never capture stale props.
  const liveRef = useRef({ value, disabled, readOnly, min, max, step, precision, wheelSnap, onChange, clamp });
  liveRef.current = { value, disabled, readOnly, min, max, step, precision, wheelSnap, onChange, clamp };

  useEffect(() => {
    if (!typingPulse) return;
    const el = resolvedRef.current;
    if (!el) return;
    const onEnd = () => el.classList.remove("vds-field--pulse");
    el.addEventListener("animationend", onEnd);
    return () => el.removeEventListener("animationend", onEnd);
  }, [typingPulse]);

  useEffect(() => {
    const el = resolvedRef.current;
    if (!el || !wheelEnabled) return;

    const handler = (e: WheelEvent) => {
      const { disabled, readOnly, min, step, wheelSnap, onChange, clamp, value } = liveRef.current;
      if (disabled || readOnly) return;
      if (document.activeElement !== el) return;
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY < 0 ? step : -step;
      const current = value ?? min ?? 0;
      const next = wheelSnap
        ? Math.round((current + delta) / step) * step
        : current + delta;
      onChange?.(clamp(next));
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [wheelEnabled]);

  const increment = () => {
    if (disabled || readOnly) return;
    onChange?.(clamp((value ?? min ?? 0) + step));
  };

  const decrement = () => {
    if (disabled || readOnly) return;
    onChange?.(clamp((value ?? min ?? 0) - step));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") { onChange?.(undefined); return; }
    const n = Number(raw);
    if (!isNaN(n)) onChange?.(n);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (clampOnBlur && value !== undefined) onChange?.(clamp(value));
    (onBlur as React.FocusEventHandler<HTMLInputElement> | undefined)?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp")   { e.preventDefault(); increment(); }
    if (e.key === "ArrowDown") { e.preventDefault(); decrement(); }
    if (typingPulse && isPrintable(e.nativeEvent)) {
      const el = resolvedRef.current;
      if (el) {
        const now = Date.now();
        const gap = now - lastKeyAt.current;
        lastKeyAt.current = now;
        const intensity = Math.max(0.2, Math.min(1, 1 - (gap - 40) / 380));
        el.style.setProperty("--_ti", String(intensity));
        if (now - lastPulseAt.current >= 80) {
          lastPulseAt.current = now;
          el.classList.remove("vds-field--pulse");
          void el.offsetWidth;
          el.classList.add("vds-field--pulse");
        }
      }
    }
  };

  const atMin = min !== undefined && (value ?? -Infinity) <= min;
  const atMax = max !== undefined && (value ?? Infinity)  >= max;

  const inputEl = (
    <input
      ref={resolvedRef}
      type="text"
      inputMode="numeric"
      role="spinbutton"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      readOnly={readOnly}
      value={value !== undefined ? String(value) : ""}
      defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="vds-number-input__field"
      {...props}
    />
  );

  return (
    <div
      className={cn("vds-number-input", className)}
      data-size={inputSize}
      data-stepper={stepper}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-readonly={readOnly || undefined}
      data-wheel={wheelEnabled || undefined}
    >
      {stepper === "inline" ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            className="vds-number-input__step vds-number-input__step--dec"
            onClick={decrement}
            disabled={disabled || readOnly || atMin}
          >
            <IconMinus aria-hidden focusable={false} />
          </button>
          {inputEl}
          <button
            type="button"
            tabIndex={-1}
            className="vds-number-input__step vds-number-input__step--inc"
            onClick={increment}
            disabled={disabled || readOnly || atMax}
          >
            <IconPlus aria-hidden focusable={false} />
          </button>
        </>
      ) : (
        <>
          {inputEl}
          <div className="vds-number-input__steppers" aria-hidden="true">
            <button
              type="button"
              tabIndex={-1}
              className="vds-number-input__step vds-number-input__step--up"
              onClick={increment}
              disabled={disabled || readOnly || atMax}
            >
              <IconChevronUp aria-hidden focusable={false} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="vds-number-input__step vds-number-input__step--down"
              onClick={decrement}
              disabled={disabled || readOnly || atMin}
            >
              <IconChevronDown aria-hidden focusable={false} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
