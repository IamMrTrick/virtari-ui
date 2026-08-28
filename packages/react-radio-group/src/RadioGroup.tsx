import { cn } from "@virtari-packages/utils";
import {
  useId,
  useMemo,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from "react";
import * as RadioGroupPrimitive from "@virtari-packages/primitives/radio-group";
import { IconAlertCircle } from "@virtari-packages/react-icons";
import {
  RadioGroupContext,
  useRadioGroupContext,
  type RadioSize,
} from "./context";

/* ─────────────────────────────────────────────────────────────
 * RadioGroup — primitive Root extended with label / description /
 *              error / required / size. Context propagates size
 *              + error + disabled to descendants.
 * ───────────────────────────────────────────────────────────── */

type PrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

export interface RadioGroupProps extends Omit<PrimitiveRootProps, "children"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Truthy renders a role="alert" message and propagates error=true to descendants. */
  error?: ReactNode;
  required?: boolean;
  /** Proportional size for every descendant radio. */
  size?: RadioSize;
  children: ReactNode;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

export function RadioGroup({
  label,
  description,
  error,
  required = false,
  size = "md",
  disabled = false,
  orientation = "vertical",
  name,
  className,
  children,
  ref,
  id: idProp,
  ...rest
}: RadioGroupProps) {
  const reactId = useId();
  const groupId = idProp ?? `vds-radio-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;

  const hasError = Boolean(error);

  const describedBy =
    [description ? descriptionId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const contextValue = useMemo(
    () => ({ disabled, error: hasError, size, name }),
    [disabled, hasError, size, name],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupPrimitive.Root
        ref={ref}
        id={groupId}
        name={name}
        disabled={disabled}
        orientation={orientation}
        required={required}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        data-error={hasError ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn("vds-radio-group", className)}
        {...rest}
      >
        {(label || description) && (
          <div className="vds-radio-group-header">
            {label && (
              <span id={labelId} className="vds-radio-group-label">
                {label}
                {required ? (
                  <span
                    aria-hidden="true"
                    className="vds-radio-group-required"
                  >
                    *
                  </span>
                ) : null}
              </span>
            )}
            {description && (
              <span
                id={descriptionId}
                className="vds-radio-group-description"
              >
                {description}
              </span>
            )}
          </div>
        )}

        <div className="vds-radio-group-items">{children}</div>

        <p
          id={errorId}
          role={hasError ? "alert" : undefined}
          aria-hidden={hasError ? undefined : true}
          data-visible={hasError ? "" : undefined}
          data-empty={hasError ? undefined : ""}
          className="vds-radio-group-error"
        >
          <span className="vds-radio-group-error-body">
            <IconAlertCircle
              size={14}
              stroke={2}
              aria-hidden
              focusable={false}
              className="vds-radio-group-error-icon"
            />
            <span>{error}</span>
          </span>
        </p>
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────
 * RadioGroupItem — circular radio. Inherits size / error /
 *                  disabled from RadioGroup context.
 * ───────────────────────────────────────────────────────────── */

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: RadioSize;
  error?: boolean;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

export function RadioGroupItem({
  size,
  error,
  disabled,
  className,
  ref,
  ...props
}: RadioGroupItemProps) {
  const group = useRadioGroupContext();
  const resolvedSize: RadioSize = size ?? group?.size ?? "md";
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("vds-radio-item", className)}
      data-size={resolvedSize}
      data-error={resolvedError ? "" : undefined}
      disabled={resolvedDisabled}
      aria-invalid={resolvedError || undefined}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="vds-radio-indicator">
        <span className="vds-radio-dot" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
