"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var reactIcons = require('@virtari-packages/react-icons');
var react = require('react');
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

var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);

// src/Checkbox.tsx
var CheckboxGroupContext = react.createContext(null);
function useCheckboxGroupContext() {
  return react.useContext(CheckboxGroupContext);
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    CheckboxPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-checkbox", className),
      "data-size": size,
      "data-error": resolvedError ? "" : void 0,
      disabled: resolvedDisabled,
      "aria-invalid": resolvedError || void 0,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs(CheckboxPrimitive__namespace.Indicator, { className: "vds-checkbox-indicator", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactIcons.IconCheck,
          {
            className: "vds-checkbox-check",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          reactIcons.IconMinus,
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      ref,
      className: utils.cn("vds-checkbox-field", labelClassName),
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Checkbox,
          {
            ref: checkboxRef,
            error: resolvedError,
            disabled: resolvedDisabled,
            className,
            ...checkboxProps
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-checkbox-field-text", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-field-label", children: label }),
          description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-field-description", children: description }) : null
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
  const reactId = react.useId();
  const groupId = idProp ?? `vds-checkbox-group-${reactId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;
  const hasError = Boolean(error);
  const describedBy = [description ? descriptionId : null, hasError ? errorId : null].filter(Boolean).join(" ") || void 0;
  const contextValue = react.useMemo(
    () => ({ disabled, error: hasError, name }),
    [disabled, hasError, name]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(CheckboxGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsxs(
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
      className: utils.cn("vds-checkbox-group", className),
      ...rest,
      children: [
        (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-checkbox-group-header", children: [
          label && /* @__PURE__ */ jsxRuntime.jsxs("span", { id: labelId, className: "vds-checkbox-group-label", children: [
            label,
            required ? /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "vds-checkbox-group-required",
                children: "*"
              }
            ) : null
          ] }),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              id: descriptionId,
              className: "vds-checkbox-group-description",
              children: description
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-checkbox-group-items", children }),
        hasError && /* @__PURE__ */ jsxRuntime.jsxs(
          "p",
          {
            id: errorId,
            role: "alert",
            className: "vds-checkbox-group-error",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                reactIcons.IconAlertCircle,
                {
                  size: 14,
                  stroke: 2,
                  "aria-hidden": true,
                  focusable: false,
                  className: "vds-checkbox-group-error-icon"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: error })
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      ref,
      className: utils.cn("vds-checkbox-card", labelClassName),
      "data-layout": resolvedLayout,
      "data-error": resolvedError ? "" : void 0,
      "data-disabled": resolvedDisabled ? "" : void 0,
      ...restLabelProps,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Checkbox,
          {
            ref: checkboxRef,
            className: utils.cn("vds-checkbox-card-input", className),
            error: resolvedError,
            disabled: resolvedDisabled,
            ...checkboxProps
          }
        ),
        resolvedLayout === "icon-grid" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-checkbox-card-body", children: [
          icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-icon", "aria-hidden": "true", children: icon }) : null,
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-checkbox-card-text", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-label", children: label }),
            description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-description", children: description }) : null,
            badge ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-badge", children: badge }) : null
          ] })
        ] }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-checkbox-card-body", children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-checkbox-card-text", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-checkbox-card-label-row", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-label", children: label }),
            trailing ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-trailing", children: trailing }) : null
          ] }),
          description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-description", children: description }) : null,
          badge ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-checkbox-card-badge", children: badge }) : null
        ] }) })
      ]
    }
  );
}

exports.Checkbox = Checkbox;
exports.CheckboxCard = CheckboxCard;
exports.CheckboxField = CheckboxField;
exports.CheckboxGroup = CheckboxGroup;
