import { cn } from "@virtari/utils";
import { useRef, type ReactNode, type Ref } from "react";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import {
  useDateFieldState,
  type DateFieldState,
  type DateSegment,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";

export interface DateFieldProps {
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
  minValue?: DateValue;
  maxValue?: DateValue;
  placeholderValue?: DateValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "day" | "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;
  name?: string;
  autoFocus?: boolean;

  /* ── Visual ── */
  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  /** Shorthand for isInvalid plus error styling. */
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function DateField({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  label,
  description,
  errorMessage,
  className,
  ref,
  ...props
}: DateFieldProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useDateFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: usedLocale,
    createCalendar,
  });
  const localRef = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useDateField({ ...props, isInvalid: invalid ?? props.isInvalid }, state, localRef);

  const isInvalid = invalid ?? state.isInvalid;

  return (
    <div
      className={cn("vds-date-field", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={props.isDisabled ? "true" : undefined}
      data-readonly={props.isReadOnly ? "true" : undefined}
      data-dir={direction}
    >
      {label ? (
        <span {...labelProps} className="vds-date-field-label">
          {label}
        </span>
      ) : null}
      <div
        {...fieldProps}
        ref={ref ?? localRef}
        className="vds-date-field-group"
      >
        {state.segments.map((segment, i) => (
          <FieldSegment key={i} segment={segment} state={state} />
        ))}
      </div>
      {description ? (
        <span {...descriptionProps} className="vds-date-field-description">
          {description}
        </span>
      ) : null}
      {isInvalid && errorMessage ? (
        <span {...errorMessageProps} className="vds-date-field-error">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── *
 * FieldSegment — exported so DatePicker can reuse it
 * ──────────────────────────────────────────────────────────── */

interface FieldSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
}

export function FieldSegment({ segment, state }: FieldSegmentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className="vds-date-field-segment"
      data-type={segment.type}
      data-placeholder={segment.isPlaceholder ? "true" : undefined}
    >
      {segment.text}
    </div>
  );
}
