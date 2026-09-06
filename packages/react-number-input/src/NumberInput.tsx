import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
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
  /** Control size. Canonical name, shared with every other sized control. */
  size?: NumberInputSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
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


function parseNumber(text: string): number | undefined {
  if (!text.trim()) return undefined;
  const number = Number(text);
  return Number.isFinite(number) ? number : undefined;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(allProps, ref) {
  const {
    value, defaultValue, onChange, onBlur, onKeyDown, min, max, step = 1,
    precision, clampOnBlur = true, size, inputSize, stepper = "stacked",
    disabled = false, readOnly = false, invalid, className,
    wheelEnabled = false, wheelSnap = false, typingPulse = false,
    inputMode = "decimal", ...props
  } = allProps;
  const controlled = Object.prototype.hasOwnProperty.call(allProps, "value");
  const [draft, setDraft] = useState(() => String(value ?? defaultValue ?? ""));
  const parsedDraft = parseNumber(draft);
  // Retain in-progress text ("-", "1.", "1e-") when its numeric value matches.
  // A genuinely different external value still wins immediately.
  const text = controlled && !Object.is(value, parsedDraft) ? String(value ?? "") : draft;
  const current = parseNumber(text);
  const ariaInvalid = props["aria-invalid"];
  const resolvedInvalid = invalid ?? (ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== "false");
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useComposedRefs(inputRef, ref);
  const lastKeyAt = useRef(0);
  const lastPulseAt = useRef(0);
  const clamp = useCallback((number: number) => {
    let next = number;
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    if (precision !== undefined) next = Number(next.toFixed(Math.min(100, Math.max(0, precision))));
    return next;
  }, [min, max, precision]);
  const commit = (raw: string) => { setDraft(raw); onChange?.(parseNumber(raw)); };
  const stepBy = (direction: number) => {
    if (disabled || readOnly) return;
    const start = parseNumber(inputRef.current?.value ?? text) ?? min ?? 0;
    const amount = Number.isFinite(step) && step > 0 ? step : 1;
    const next = Number((start + direction * amount).toPrecision(15));
    commit(String(clamp(next)));
  };
  const live = useRef({ disabled, readOnly, min, step, wheelSnap, clamp, commit });
  live.current = { disabled, readOnly, min, step, wheelSnap, clamp, commit };
  useEffect(() => {
    const el = inputRef.current;
    if (!el || !wheelEnabled) return;
    const wheel = (event: WheelEvent) => {
      const p = live.current;
      if (event.defaultPrevented || !event.deltaY || p.disabled || p.readOnly || el.ownerDocument.activeElement !== el) return;
      event.preventDefault();
      const amount = Number.isFinite(p.step) && p.step > 0 ? p.step : 1;
      const start = parseNumber(el.value) ?? p.min ?? 0;
      let next = start + (event.deltaY < 0 ? amount : -amount);
      if (p.wheelSnap) next = Math.round(next / amount) * amount;
      p.commit(String(p.clamp(Number(next.toPrecision(15)))));
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [wheelEnabled]);
  useEffect(() => {
    const el = inputRef.current;
    if (!el || !typingPulse) return;
    const end = () => el.classList.remove("vds-field--pulse");
    el.addEventListener("animationend", end);
    return () => el.removeEventListener("animationend", end);
  }, [typingPulse]);
  useFormReset(inputRef, () => commit(String(defaultValue ?? "")), props.form);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.nativeEvent.isComposing || disabled || readOnly) return;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault(); stepBy(event.key === "ArrowUp" ? 1 : -1); return;
    }
    if (typingPulse && isPrintable(event.nativeEvent)) {
      const el = event.currentTarget;
      const now = Date.now();
      const intensity = Math.max(0.2, Math.min(1, 1 - (now - lastKeyAt.current - 40) / 380));
      lastKeyAt.current = now;
      el.style.setProperty("--_ti", String(intensity));
      if (now - lastPulseAt.current >= 80) {
        lastPulseAt.current = now;
        el.classList.remove("vds-field--pulse"); void el.offsetWidth; el.classList.add("vds-field--pulse");
      }
    }
  };
  const atMin = min !== undefined && current !== undefined && current <= min;
  const atMax = max !== undefined && current !== undefined && current >= max;
  const field = <input
    {...props} key="field" ref={mergedRef} type="text" inputMode={inputMode} role="spinbutton"
    aria-valuenow={current} aria-valuemin={min} aria-valuemax={max}
    aria-invalid={invalid !== undefined ? invalid : ariaInvalid}
    disabled={disabled} readOnly={readOnly} value={text}
    onChange={(event) => {
      if (disabled || readOnly) return;
      const raw = event.target.value;
      if (/^[+-]?(?:\d*\.?\d*)(?:[eE][+-]?\d*)?$/.test(raw)) commit(raw);
    }}
    onBlur={(event) => {
      if (!disabled && !readOnly) {
        const number = parseNumber(event.currentTarget.value);
        commit(number === undefined ? "" : String(clampOnBlur ? clamp(number) : number));
      }
      onBlur?.(event);
    }}
    onKeyDown={handleKeyDown} className="vds-number-input__field"
  />;
  const button = (direction: number, modifier: string, icon: React.ReactNode) => <button
    key={direction} type="button" tabIndex={-1}
    aria-label={direction > 0 ? "Increase value" : "Decrease value"}
    className={"vds-number-input__step vds-number-input__step--" + modifier}
    disabled={disabled || readOnly || (direction > 0 ? atMax : atMin)}
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => stepBy(direction)}
  >{icon}</button>;
  return <div className={cn("vds-number-input", className)} data-size={size ?? inputSize ?? "md"}
    data-stepper={stepper} data-disabled={disabled || undefined} data-invalid={resolvedInvalid || undefined}
    data-readonly={readOnly || undefined} data-wheel={wheelEnabled || undefined}>
    {stepper === "inline" ? button(-1, "dec", <IconMinus aria-hidden />) : null}
    {field}
    {stepper === "inline" ? button(1, "inc", <IconPlus aria-hidden />) : <div className="vds-number-input__steppers">
      {button(1, "up", <IconChevronUp aria-hidden />)}
      {button(-1, "down", <IconChevronDown aria-hidden />)}
    </div>}
  </div>;
});
