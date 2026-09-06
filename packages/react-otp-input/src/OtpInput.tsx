import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ClipboardEvent,
  type HTMLAttributes,
  type HTMLInputAutoCompleteAttribute,
  type KeyboardEvent,
  type Ref,
} from "react";

export type OtpInputType = "numeric" | "alphanumeric" | "alphabetic";
export type OtpInputSize = "sm" | "md" | "lg";

export interface OtpInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  /** Number of input slots. */
  length?: number;
  value?: string;
  defaultValue?: string;
  form?: string;
  onChange?: (value: string) => void;
  /** Called when all slots are filled. */
  onComplete?: (value: string) => void;
  type?: OtpInputType;
  /** Visually obscure slots where the browser supports text-security. */
  mask?: boolean;
  /** Control size. Canonical name, shared with every other sized control. */
  size?: OtpInputSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: OtpInputSize;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  /** Emits a hidden input with the completed code for native form submits. */
  name?: string;
  /** Marks each visible slot as required. */
  required?: boolean;
  /** Accessible group label. */
  label?: string;
  /** Browser autofill token. Defaults to one-time-code on the first slot. */
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /** Normalize Persian and Arabic digits to ASCII before validation. */
  normalizeDigits?: boolean;
  /** Select a slot's value when it receives focus. */
  selectOnFocus?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const PATTERN: Record<OtpInputType, RegExp> = {
  numeric: /^\d$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alphabetic: /^[a-zA-Z]$/,
};

const PERSIAN_ZERO = 0x06f0;
const ARABIC_ZERO = 0x0660;

function normalizeDigit(char: string) {
  const code = char.charCodeAt(0);
  if (code >= PERSIAN_ZERO && code <= PERSIAN_ZERO + 9) {
    return String(code - PERSIAN_ZERO);
  }
  if (code >= ARABIC_ZERO && code <= ARABIC_ZERO + 9) {
    return String(code - ARABIC_ZERO);
  }
  return char;
}

function sanitizeValue(
  value: string,
  type: OtpInputType,
  length: number,
  normalizeDigits: boolean,
) {
  const pattern = PATTERN[type];
  return Array.from(value)
    .map((char) => (normalizeDigits ? normalizeDigit(char) : char))
    .filter((char) => pattern.test(char))
    .slice(0, length)
    .join("");
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(function OtpInput({
  length = 6,
  value: controlledValue,
  defaultValue = "",
  form,
  onChange,
  onComplete,
  type = "numeric",
  mask = false,
  size,
  inputSize,
  disabled = false,
  readOnly = false,
  invalid,
  autoFocus = false,
  name,
  required,
  label = "One-time password",
  autoComplete = "one-time-code",
  normalizeDigits = true,
  selectOnFocus = true,
  className,
  id,
  dir = "ltr",
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  onKeyDown,
  onPaste,
  ...rootProps
}, ref) {
  const resolvedInvalid = invalid ?? ariaInvalid;
  const accessibleLabel = ariaLabel ?? label;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedRef = useComposedRefs(rootRef, ref);
  useFormReset(rootRef, () => { setInternalValue(defaultValue); onChange?.(defaultValue); lastCompletedValue.current = null; }, form);
  const generatedId = useId();
  const rootId = id ?? generatedId;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const lastCompletedValue = useRef<string | null>(null);

  const sanitizedValue = useMemo(
    () => sanitizeValue(value, type, length, normalizeDigits),
    [value, type, length, normalizeDigits],
  );
  const slots = Array.from({ length }, (_, i) => sanitizedValue[i] ?? "");

  useEffect(() => {
    if (sanitizedValue.length < length) lastCompletedValue.current = null;
  }, [sanitizedValue, length]);

  const focusSlot = useCallback((index: number, select = selectOnFocus) => {
    const el = inputRefs.current[index];
    if (!el) return;
    el.focus();
    if (select) el.select();
  }, [selectOnFocus]);

  const commitValue = useCallback(
    (nextValue: string) => {
      const next = sanitizeValue(nextValue, type, length, normalizeDigits);
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);

      if (next.length === length) {
        if (lastCompletedValue.current !== next) {
          lastCompletedValue.current = next;
          onComplete?.(next);
        }
        return;
      }

      lastCompletedValue.current = null;
    },
    [type, length, normalizeDigits, onChange, onComplete, controlledValue],
  );

  const insertValue = useCallback(
    (index: number, incoming: string) => {
      const inserted = sanitizeValue(incoming, type, length, normalizeDigits);
      if (!inserted) return;

      const startIndex = inserted.length >= length
        ? 0
        : Math.min(index, sanitizedValue.length);
      const chars = Array.from(sanitizedValue);

      for (let i = 0; i < inserted.length && startIndex + i < length; i += 1) {
        chars[startIndex + i] = inserted[i];
      }

      const next = chars.join("").slice(0, length);
      commitValue(next);
      focusSlot(Math.min(startIndex + inserted.length, length - 1));
    },
    [commitValue, focusSlot, length, normalizeDigits, sanitizedValue, type],
  );

  const handleChange = useCallback(
    (index: number, incoming: string) => {
      if (disabled || readOnly) return;
      if (!incoming) {
        const chars = Array.from(sanitizedValue);
        chars.splice(index, 1);
        commitValue(chars.join(""));
        return;
      }

      insertValue(index, incoming);
    },
    [commitValue, insertValue, disabled, readOnly, sanitizedValue],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly || e.defaultPrevented || e.nativeEvent.isComposing) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        const chars = Array.from(sanitizedValue);
        if (slots[index]) {
          chars.splice(index, 1);
          commitValue(chars.join(""));
        } else if (index > 0) {
          chars.splice(index - 1, 1);
          commitValue(chars.join(""));
          focusSlot(index - 1);
        }
      } else if (e.key === "Delete") {
        e.preventDefault();
        if (!slots[index]) return;
        const chars = Array.from(sanitizedValue);
        chars.splice(index, 1);
        commitValue(chars.join(""));
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusSlot(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusSlot(index + 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusSlot(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusSlot(Math.min(sanitizedValue.length, length - 1));
      }
    },
    [commitValue, disabled, focusSlot, length, readOnly, sanitizedValue, slots],
  );

  const handlePaste = useCallback(
    (index: number, e: ClipboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly || e.defaultPrevented) return;
      e.preventDefault();
      insertValue(index, e.clipboardData.getData("text"));
    },
    [insertValue, disabled, readOnly],
  );

  return (
    <div
      ref={mergedRef}
      id={rootId}
      role="group"
      aria-label={accessibleLabel}
      aria-describedby={ariaDescribedBy}
      aria-errormessage={ariaErrorMessage}
      aria-disabled={disabled || undefined}
      aria-invalid={resolvedInvalid}
      className={cn("vds-otp-input", className)}
      data-size={size ?? inputSize ?? "md"}
      data-readonly={readOnly || undefined}
      data-complete={sanitizedValue.length === length || undefined}
      dir={dir}
      {...rootProps}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        const index = inputRefs.current.indexOf(event.target as HTMLInputElement);
        if (index >= 0) handleKeyDown(index, event);
      }}
      onPaste={(event) => {
        onPaste?.(event);
        const index = inputRefs.current.indexOf(event.target as HTMLInputElement);
        if (index >= 0) handlePaste(index, event);
      }}
    >
      {slots.map((char, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode={type === "numeric" ? "numeric" : "text"}
          autoComplete={i === 0 ? autoComplete : "off"}
          autoCapitalize={type === "numeric" ? "none" : "characters"}
          autoCorrect="off"
          spellCheck={false}
          pattern={type === "numeric" ? "[0-9]*" : undefined}
          maxLength={i === 0 ? length : 1}
          value={char}
          required={required}
          form={form}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={resolvedInvalid}
          aria-label={`${accessibleLabel}, character ${i + 1} of ${length}`}
          aria-describedby={ariaDescribedBy}
          aria-errormessage={ariaErrorMessage}
          autoFocus={autoFocus && i === 0}
          enterKeyHint={i === length - 1 ? "done" : "next"}
          className="vds-otp-input__slot"
          data-filled={char ? "" : undefined}
          data-mask={mask || undefined}
          onChange={(e) => handleChange(i, e.target.value)}
          onFocus={(e) => {
            if (selectOnFocus) e.target.select();
          }}
        />
      ))}
      {name ? (
        <input type="hidden" name={name} form={form} disabled={disabled} value={sanitizedValue} readOnly />
      ) : null}
    </div>
  );
});
