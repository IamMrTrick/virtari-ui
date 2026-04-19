"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');
var reactIcons = require('@virtari-packages/react-icons');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);

// src/RadioGroup.tsx
var RadioGroupContext = react.createContext(
  null
);
function useRadioGroupContext() {
  return react.useContext(RadioGroupContext);
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
  const reactId = react.useId();
  const groupId = idProp ?? `vds-radio-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;
  const hasError = Boolean(error);
  const describedBy = [description ? descriptionId : null, hasError ? errorId : null].filter(Boolean).join(" ") || void 0;
  const contextValue = react.useMemo(
    () => ({ disabled, error: hasError, size, name }),
    [disabled, hasError, size, name]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(RadioGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsxs(
    RadioGroupPrimitive__namespace.Root,
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
      className: utils.cn("vds-radio-group", className),
      ...rest,
      children: [
        (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-radio-group-header", children: [
          label && /* @__PURE__ */ jsxRuntime.jsxs("span", { id: labelId, className: "vds-radio-group-label", children: [
            label,
            required ? /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "vds-radio-group-required",
                children: "*"
              }
            ) : null
          ] }),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              id: descriptionId,
              className: "vds-radio-group-description",
              children: description
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-radio-group-items", children }),
        hasError && /* @__PURE__ */ jsxRuntime.jsxs("p", { id: errorId, role: "alert", className: "vds-radio-group-error", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            reactIcons.IconAlertCircle,
            {
              size: 14,
              stroke: 2,
              "aria-hidden": true,
              focusable: false,
              className: "vds-radio-group-error-icon"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: error })
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-radio-item", className),
      "data-size": resolvedSize,
      "data-error": resolvedError ? "" : void 0,
      disabled: resolvedDisabled,
      "aria-invalid": resolvedError || void 0,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(RadioGroupPrimitive__namespace.Indicator, { className: "vds-radio-indicator" })
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
  const reactId = react.useId();
  const inputId = idProp ?? `vds-radio-field-${reactId}`;
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      ref,
      htmlFor: inputId,
      className: utils.cn("vds-radio-field", labelClassName),
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-radio-field-text", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-field-label", children: label }),
          description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-field-description", children: description }) : null
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
  const reactId = react.useId();
  const inputId = idProp ?? `vds-radio-card-${reactId}`;
  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};
  const renderBuiltInBody = () => {
    if (resolvedLayout === "icon-grid") {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-radio-card-body", children: [
        icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-icon", "aria-hidden": "true", children: icon }) : null,
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-radio-card-text", children: [
          label ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-label", children: label }) : null,
          description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-description", children: description }) : null,
          badge ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-badge", children: badge }) : null
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-radio-card-body", children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-radio-card-text", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-radio-card-label-row", children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-label", children: label }) : null,
        trailing ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-trailing", children: trailing }) : null
      ] }),
      description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-description", children: description }) : null,
      badge ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-radio-card-badge", children: badge }) : null
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      ref,
      htmlFor: inputId,
      className: utils.cn("vds-radio-card", labelClassName),
      "data-layout": resolvedLayout,
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          RadioGroupItem,
          {
            ref: radioRef,
            id: inputId,
            className: utils.cn("vds-radio-card-input", className),
            error: resolvedError,
            disabled: resolvedDisabled,
            ...radioProps
          }
        ),
        children ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-radio-card-body", children }) : renderBuiltInBody()
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    {
      ref,
      orientation,
      disabled,
      "aria-invalid": error || void 0,
      "data-size": size,
      "data-error": error ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: utils.cn("vds-segmented-radio", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-segmented-radio-item", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    {
      ref,
      orientation,
      disabled,
      "aria-invalid": error || void 0,
      "data-size": size,
      "data-error": error ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: utils.cn("vds-pill-radio", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-pill-radio-item", className),
      ...props,
      children
    }
  );
}

exports.PillRadio = PillRadio;
exports.PillRadioItem = PillRadioItem;
exports.RadioCard = RadioCard;
exports.RadioField = RadioField;
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
exports.SegmentedRadio = SegmentedRadio;
exports.SegmentedRadioItem = SegmentedRadioItem;
