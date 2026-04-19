import { cn } from "@virtari/utils";
import { useId, useMemo, type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";
import { IconAlertCircle } from "@virtari/react-icons";
import { CheckboxGroupContext } from "./context";

export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Truthy renders a role="alert" message and propagates error=true to descendant checkboxes. */
  error?: ReactNode;
  /** Shows a red asterisk next to the label + sets aria-required on the group. */
  required?: boolean;
  /** Propagates disabled to every descendant Checkbox / CheckboxField / CheckboxCard. */
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  /** Optional form field name; passed through context for name= inheritance if needed by consumers. */
  name?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function CheckboxGroup({
  label,
  description,
  error,
  required = false,
  disabled = false,
  orientation = "vertical",
  name,
  className,
  children,
  ref,
  id: idProp,
  ...rest
}: CheckboxGroupProps) {
  const reactId = useId();
  const groupId = idProp ?? `vds-checkbox-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;

  const hasError = Boolean(error);

  const describedBy =
    [description ? descriptionId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const contextValue = useMemo(
    () => ({ disabled, error: hasError, name }),
    [disabled, hasError, name],
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        id={groupId}
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        data-orientation={orientation}
        data-error={hasError ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn("vds-checkbox-group", className)}
        {...rest}
      >
        {(label || description) && (
          <div className="vds-checkbox-group-header">
            {label && (
              <span id={labelId} className="vds-checkbox-group-label">
                {label}
                {required ? (
                  <span
                    aria-hidden="true"
                    className="vds-checkbox-group-required"
                  >
                    *
                  </span>
                ) : null}
              </span>
            )}
            {description && (
              <span
                id={descriptionId}
                className="vds-checkbox-group-description"
              >
                {description}
              </span>
            )}
          </div>
        )}

        <div className="vds-checkbox-group-items">{children}</div>

        {hasError && (
          <p
            id={errorId}
            role="alert"
            className="vds-checkbox-group-error"
          >
            <IconAlertCircle
              size={14}
              stroke={2}
              aria-hidden
              focusable={false}
              className="vds-checkbox-group-error-icon"
            />
            <span>{error}</span>
          </p>
        )}
      </div>
    </CheckboxGroupContext.Provider>
  );
}
