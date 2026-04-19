"use client";
import { cn } from '@virtari/utils';
import { createContext, useId, useMemo, useContext } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { IconAlertCircle } from '@virtari/react-icons';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/RadioGroup.tsx
var RadioGroupContext = createContext(
  null
);
function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
function RadioGroup({
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
}) {
  const reactId = useId();
  const groupId = idProp ?? `vds-radio-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;
  const hasError = Boolean(error);
  const describedBy = [description ? descriptionId : null, hasError ? errorId : null].filter(Boolean).join(" ") || void 0;
  const contextValue = useMemo(
    () => ({ disabled, error: hasError, size, name }),
    [disabled, hasError, size, name]
  );
  return /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    RadioGroupPrimitive.Root,
    {
      ref,
      id: groupId,
      name,
      disabled,
      orientation,
      required,
      "aria-labelledby": label ? labelId : void 0,
      "aria-describedby": describedBy,
      "aria-invalid": hasError || void 0,
      "data-error": hasError ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: cn("vds-radio-group", className),
      ...rest,
      children: [
        (label || description) && /* @__PURE__ */ jsxs("div", { className: "vds-radio-group-header", children: [
          label && /* @__PURE__ */ jsxs("span", { id: labelId, className: "vds-radio-group-label", children: [
            label,
            required ? /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "vds-radio-group-required",
                children: "*"
              }
            ) : null
          ] }),
          description && /* @__PURE__ */ jsx(
            "span",
            {
              id: descriptionId,
              className: "vds-radio-group-description",
              children: description
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "vds-radio-group-items", children }),
        hasError && /* @__PURE__ */ jsxs("p", { id: errorId, role: "alert", className: "vds-radio-group-error", children: [
          /* @__PURE__ */ jsx(
            IconAlertCircle,
            {
              size: 14,
              stroke: 2,
              "aria-hidden": true,
              focusable: false,
              className: "vds-radio-group-error-icon"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: error })
        ] })
      ]
    }
  ) });
}
function RadioGroupItem({
  size,
  error,
  disabled,
  className,
  ref,
  ...props
}) {
  const group = useRadioGroupContext();
  const resolvedSize = size ?? group?.size ?? "md";
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn("vds-radio-item", className),
      "data-size": resolvedSize,
      "data-error": resolvedError ? "" : void 0,
      disabled: resolvedDisabled,
      "aria-invalid": resolvedError || void 0,
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "vds-radio-indicator" })
    }
  );
}
function RadioField({
  label,
  description,
  labelProps,
  radioRef,
  ref,
  error,
  disabled,
  id: idProp,
  className,
  ...radioProps
}) {
  const group = useRadioGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const reactId = useId();
  const inputId = idProp ?? `vds-radio-field-${reactId}`;
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ref,
      htmlFor: inputId,
      className: cn("vds-radio-field", labelClassName),
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsx(
          RadioGroupItem,
          {
            ref: radioRef,
            id: inputId,
            error: resolvedError,
            disabled: resolvedDisabled,
            className,
            ...radioProps
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "vds-radio-field-text", children: [
          /* @__PURE__ */ jsx("span", { className: "vds-radio-field-label", children: label }),
          description ? /* @__PURE__ */ jsx("span", { className: "vds-radio-field-description", children: description }) : null
        ] })
      ]
    }
  );
}
function RadioCard({
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
}) {
  const group = useRadioGroupContext();
  const resolvedError = error ?? group?.error ?? false;
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedLayout = layout ?? (icon ? "icon-grid" : "row");
  const reactId = useId();
  const inputId = idProp ?? `vds-radio-card-${reactId}`;
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  const renderBuiltInBody = () => {
    if (resolvedLayout === "icon-grid") {
      return /* @__PURE__ */ jsxs("div", { className: "vds-radio-card-body", children: [
        icon ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-icon", "aria-hidden": "true", children: icon }) : null,
        /* @__PURE__ */ jsxs("span", { className: "vds-radio-card-text", children: [
          label ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-label", children: label }) : null,
          description ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-description", children: description }) : null,
          badge ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-badge", children: badge }) : null
        ] })
      ] });
    }
    return /* @__PURE__ */ jsx("div", { className: "vds-radio-card-body", children: /* @__PURE__ */ jsxs("span", { className: "vds-radio-card-text", children: [
      /* @__PURE__ */ jsxs("span", { className: "vds-radio-card-label-row", children: [
        label ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-label", children: label }) : null,
        trailing ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-trailing", children: trailing }) : null
      ] }),
      description ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-description", children: description }) : null,
      badge ? /* @__PURE__ */ jsx("span", { className: "vds-radio-card-badge", children: badge }) : null
    ] }) });
  };
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ref,
      htmlFor: inputId,
      className: cn("vds-radio-card", labelClassName),
      "data-layout": resolvedLayout,
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsx(
          RadioGroupItem,
          {
            ref: radioRef,
            id: inputId,
            className: cn("vds-radio-card-input", className),
            error: resolvedError,
            disabled: resolvedDisabled,
            ...radioProps
          }
        ),
        children ? /* @__PURE__ */ jsx("div", { className: "vds-radio-card-body", children }) : renderBuiltInBody()
      ]
    }
  );
}
function SegmentedRadio({
  size = "md",
  error = false,
  className,
  orientation = "horizontal",
  disabled,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      ref,
      orientation,
      disabled,
      "aria-invalid": error || void 0,
      "data-size": size,
      "data-error": error ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: cn("vds-segmented-radio", className),
      ...props
    }
  );
}
function SegmentedRadioItem({
  className,
  ref,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn("vds-segmented-radio-item", className),
      ...props,
      children
    }
  );
}
function PillRadio({
  size = "md",
  error = false,
  className,
  orientation = "horizontal",
  disabled,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      ref,
      orientation,
      disabled,
      "aria-invalid": error || void 0,
      "data-size": size,
      "data-error": error ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: cn("vds-pill-radio", className),
      ...props
    }
  );
}
function PillRadioItem({
  className,
  ref,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn("vds-pill-radio-item", className),
      ...props,
      children
    }
  );
}

export { PillRadio, PillRadioItem, RadioCard, RadioField, RadioGroup, RadioGroupItem, SegmentedRadio, SegmentedRadioItem };
