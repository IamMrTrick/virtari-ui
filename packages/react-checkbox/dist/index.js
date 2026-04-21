"use client";
import { cn } from '@virtari-packages/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { IconCheck, IconMinus, IconAlertCircle } from '@virtari-packages/react-icons';
import { createContext, useId, useMemo, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Checkbox.tsx
var CheckboxGroupContext = createContext(null);
function useCheckboxGroupContext() {
  return useContext(CheckboxGroupContext);
}
function Checkbox({
  size = "md",
  error,
  disabled,
  className,
  ref,
  ...props
}) {
  const group = useCheckboxGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      className: cn("vds-checkbox", className),
      "data-size": size,
      "data-error": resolvedError ? "" : void 0,
      disabled: resolvedDisabled,
      "aria-invalid": resolvedError || void 0,
      ...props,
      children: /* @__PURE__ */ jsxs(CheckboxPrimitive.Indicator, { className: "vds-checkbox-indicator", children: [
        /* @__PURE__ */ jsx(
          IconCheck,
          {
            className: "vds-checkbox-check",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        ),
        /* @__PURE__ */ jsx(
          IconMinus,
          {
            className: "vds-checkbox-indeterminate",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        )
      ] })
    }
  );
}
function CheckboxField({
  label,
  description,
  labelProps,
  checkboxRef,
  ref,
  error,
  disabled,
  className,
  ...checkboxProps
}) {
  const group = useCheckboxGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ref,
      className: cn("vds-checkbox-field", labelClassName),
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            ref: checkboxRef,
            error: resolvedError,
            disabled: resolvedDisabled,
            className,
            ...checkboxProps
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "vds-checkbox-field-text", children: [
          /* @__PURE__ */ jsx("span", { className: "vds-checkbox-field-label", children: label }),
          description ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-field-description", children: description }) : null
        ] })
      ]
    }
  );
}
function CheckboxGroup({
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
}) {
  const reactId = useId();
  const groupId = idProp ?? `vds-checkbox-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;
  const hasError = Boolean(error);
  const describedBy = [description ? descriptionId : null, hasError ? errorId : null].filter(Boolean).join(" ") || void 0;
  const contextValue = useMemo(
    () => ({ disabled, error: hasError, name }),
    [disabled, hasError, name]
  );
  return /* @__PURE__ */ jsx(CheckboxGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      id: groupId,
      role: "group",
      "aria-labelledby": label ? labelId : void 0,
      "aria-describedby": describedBy,
      "aria-invalid": hasError || void 0,
      "aria-required": required || void 0,
      "aria-disabled": disabled || void 0,
      "data-orientation": orientation,
      "data-error": hasError ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: cn("vds-checkbox-group", className),
      ...rest,
      children: [
        (label || description) && /* @__PURE__ */ jsxs("div", { className: "vds-checkbox-group-header", children: [
          label && /* @__PURE__ */ jsxs("span", { id: labelId, className: "vds-checkbox-group-label", children: [
            label,
            required ? /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "vds-checkbox-group-required",
                children: "*"
              }
            ) : null
          ] }),
          description && /* @__PURE__ */ jsx(
            "span",
            {
              id: descriptionId,
              className: "vds-checkbox-group-description",
              children: description
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "vds-checkbox-group-items", children }),
        hasError && /* @__PURE__ */ jsxs(
          "p",
          {
            id: errorId,
            role: "alert",
            className: "vds-checkbox-group-error",
            children: [
              /* @__PURE__ */ jsx(
                IconAlertCircle,
                {
                  size: 14,
                  stroke: 2,
                  "aria-hidden": true,
                  focusable: false,
                  className: "vds-checkbox-group-error-icon"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: error })
            ]
          }
        )
      ]
    }
  ) });
}
function CheckboxCard({
  label,
  description,
  trailing,
  badge,
  icon,
  layout,
  labelProps,
  checkboxRef,
  ref,
  error,
  disabled,
  className,
  ...checkboxProps
}) {
  const group = useCheckboxGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedLayout = layout ?? (icon ? "icon-grid" : "row");
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ref,
      className: cn("vds-checkbox-card", labelClassName),
      "data-layout": resolvedLayout,
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            ref: checkboxRef,
            className: cn("vds-checkbox-card-input", className),
            error: resolvedError,
            disabled: resolvedDisabled,
            ...checkboxProps
          }
        ),
        resolvedLayout === "icon-grid" ? /* @__PURE__ */ jsxs("div", { className: "vds-checkbox-card-body", children: [
          icon ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-icon", "aria-hidden": "true", children: icon }) : null,
          /* @__PURE__ */ jsxs("span", { className: "vds-checkbox-card-text", children: [
            /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-label", children: label }),
            description ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-description", children: description }) : null,
            badge ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-badge", children: badge }) : null
          ] })
        ] }) : /* @__PURE__ */ jsx("div", { className: "vds-checkbox-card-body", children: /* @__PURE__ */ jsxs("span", { className: "vds-checkbox-card-text", children: [
          /* @__PURE__ */ jsxs("span", { className: "vds-checkbox-card-label-row", children: [
            /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-label", children: label }),
            trailing ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-trailing", children: trailing }) : null
          ] }),
          description ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-description", children: description }) : null,
          badge ? /* @__PURE__ */ jsx("span", { className: "vds-checkbox-card-badge", children: badge }) : null
        ] }) })
      ]
    }
  );
}
function PillCheckbox({
  size = "md",
  error = false,
  disabled = false,
  orientation = "horizontal",
  name,
  className,
  children,
  ref,
  ...props
}) {
  const contextValue = useMemo(
    () => ({ disabled, error, name }),
    [disabled, error, name]
  );
  return /* @__PURE__ */ jsx(CheckboxGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-invalid": error || void 0,
      "aria-disabled": disabled || void 0,
      "data-size": size,
      "data-error": error ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      "data-orientation": orientation,
      className: cn("vds-pill-checkbox", className),
      ...props,
      children
    }
  ) });
}
function PillCheckboxItem({
  className,
  disabled,
  ref,
  children,
  ...props
}) {
  const group = useCheckboxGroupContext();
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      disabled: resolvedDisabled,
      className: cn("vds-pill-checkbox-item", className),
      ...props,
      children
    }
  );
}

export { Checkbox, CheckboxCard, CheckboxField, CheckboxGroup, PillCheckbox, PillCheckboxItem };
