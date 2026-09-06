import { cn } from "@virtari-packages/utils";
import {
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from "react";
import { RadioGroupItem, type RadioGroupItemProps } from "./RadioGroup";
import { useRadioGroupContext } from "./context";

export type RadioCardLayout = "row" | "icon-grid";

export interface RadioCardProps extends Omit<RadioGroupItemProps, "ref"> {
  /** Title-level text. Omit when using `children` for fully custom content. */
  label?: ReactNode;
  description?: ReactNode;
  /** Right-aligned content in row layout: price, meta, etc. */
  trailing?: ReactNode;
  /** Small chip rendered under the label (e.g. "Most popular"). */
  badge?: ReactNode;
  /** Icon node rendered in the icon container. Auto-switches layout to icon-grid. */
  icon?: ReactNode;
  /** Defaults to "row"; auto "icon-grid" when `icon` is set unless overridden. */
  layout?: RadioCardLayout;
  /** Free-form replacement for the built-in body (rich content cards). */
  children?: ReactNode;
  /** Extra props on the wrapping <label>. */
  labelProps?: Omit<ComponentPropsWithoutRef<"label">, "htmlFor">;
  /** Optional ref on the underlying radio. */
  radioRef?: RadioGroupItemProps["ref"];
  ref?: Ref<HTMLLabelElement>;
}

export function RadioCard({
  label,
  description,
  trailing,
  badge,
  icon,
  layout,
  children,
  labelProps,
  radioRef,
  ref,
  error,
  disabled,
  id: idProp,
  className,
  ...radioProps
}: RadioCardProps) {
  const group = useRadioGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedLayout: RadioCardLayout =
    layout ?? (icon ? "icon-grid" : "row");

  const reactId = useId();
  const inputId = idProp ?? `vds-radio-card-${reactId}`;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy, ...restRadioProps } = radioProps;

  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  const renderBuiltInBody = () => {
    if (resolvedLayout === "icon-grid") {
      return (
        <div className="vds-radio-card-body">
          {icon ? (
            <span className="vds-radio-card-icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <span className="vds-radio-card-text">
            {label ? (
              <span id={labelId} className="vds-radio-card-label">{label}</span>
            ) : null}
            {description ? (
              <span id={descriptionId} className="vds-radio-card-description">{description}</span>
            ) : null}
            {badge ? (
              <span className="vds-radio-card-badge">{badge}</span>
            ) : null}
          </span>
        </div>
      );
    }

    return (
      <div className="vds-radio-card-body">
        <span className="vds-radio-card-text">
          <span className="vds-radio-card-label-row">
            {label ? (
              <span id={labelId} className="vds-radio-card-label">{label}</span>
            ) : null}
            {trailing ? (
              <span className="vds-radio-card-trailing">{trailing}</span>
            ) : null}
          </span>
          {description ? (
            <span id={descriptionId} className="vds-radio-card-description">{description}</span>
          ) : null}
          {badge ? (
            <span className="vds-radio-card-badge">{badge}</span>
          ) : null}
        </span>
      </div>
    );
  };

  return (
    <label
      ref={ref}
      htmlFor={inputId}
      className={cn("vds-radio-card", labelClassName)}
      data-layout={resolvedLayout}
      data-error={resolvedError ? "" : undefined}
      data-disabled={resolvedDisabled ? "" : undefined}
      {...restLabelProps}
    >
      <RadioGroupItem
        ref={radioRef}
        id={inputId}
        className={cn("vds-radio-card-input", className)}
        error={resolvedError}
        disabled={resolvedDisabled}
        {...restRadioProps}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (ariaLabel || children || !label ? undefined : labelId)}
        aria-describedby={[ariaDescribedBy, !children && description ? descriptionId : null].filter(Boolean).join(" ") || undefined}
      />

      {children ? (
        <div className="vds-radio-card-body">{children}</div>
      ) : (
        renderBuiltInBody()
      )}
    </label>
  );
}
