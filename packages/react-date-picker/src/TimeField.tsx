import { cn } from "@virtari/utils";
import { useRef, type ReactNode, type Ref } from "react";
import { useTimeField, useDateSegment } from "@react-aria/datepicker";
import {
  useTimeFieldState,
  type TimeFieldState,
  type TimeValue,
  type DateSegment,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import type { DatePickerSize, DatePickerAppearance } from "./context";

export interface TimeFieldProps {
  value?: TimeValue | null;
  defaultValue?: TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
  minValue?: TimeValue;
  maxValue?: TimeValue;
  placeholderValue?: TimeValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;
  name?: string;
  autoFocus?: boolean;

  /* Visual */
  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  locale?: string;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function TimeField({
  size = "md",
  appearance = "soft",
  invalid,
  locale,
  label,
  description,
  errorMessage,
  className,
  ref,
  ...props
}: TimeFieldProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const state = useTimeFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: locale ?? detectedLocale,
  });
  const localRef = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useTimeField(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef,
  );

  const isInvalid = invalid ?? state.isInvalid;

  return (
    <div
      className={cn("vds-time-field", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={props.isDisabled ? "true" : undefined}
      data-readonly={props.isReadOnly ? "true" : undefined}
      data-dir={direction}
    >
      {label ? (
        <span {...labelProps} className="vds-time-field-label">
          {label}
        </span>
      ) : null}
      <div
        {...fieldProps}
        ref={ref ?? localRef}
        className="vds-time-field-group"
      >
        {state.segments.map((segment, i) => (
          <TimeSegment key={i} segment={segment} state={state} />
        ))}
      </div>
      {description ? (
        <span {...descriptionProps} className="vds-time-field-description">
          {description}
        </span>
      ) : null}
      {isInvalid && errorMessage ? (
        <span {...errorMessageProps} className="vds-time-field-error">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

interface TimeSegmentProps {
  segment: DateSegment;
  state: TimeFieldState;
}

function TimeSegment({ segment, state }: TimeSegmentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return (
    <div
      {...segmentProps}
      ref={ref}
      className="vds-time-field-segment"
      data-type={segment.type}
      data-placeholder={segment.isPlaceholder ? "true" : undefined}
    >
      {segment.text}
    </div>
  );
}
