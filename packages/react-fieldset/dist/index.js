import { cn } from '@virtari-packages/utils';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Fieldset.tsx
function Fieldset({ invalid, disabled, className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "fieldset",
    {
      ref,
      className: cn("vds-fieldset", className),
      disabled,
      "data-invalid": invalid || void 0,
      "data-disabled": disabled || void 0,
      ...props,
      children
    }
  );
}
function FieldsetLegend({ required, className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxs("legend", { ref, className: cn("vds-fieldset-legend", className), ...props, children: [
    children,
    required && /* @__PURE__ */ jsx("span", { className: "vds-fieldset-required", "aria-hidden": "true", children: "*" })
  ] });
}
function FieldsetDescription({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx("p", { ref, className: cn("vds-fieldset-description", className), ...props, children });
}
function hasContent(value) {
  return value !== void 0 && value !== null && value !== false;
}
function composeFieldDescribedBy(...values) {
  const tokens = values.flatMap((value) => value ? value.split(/\s+/) : []).filter(Boolean);
  const uniqueTokens = Array.from(new Set(tokens));
  return uniqueTokens.length > 0 ? uniqueTokens.join(" ") : void 0;
}
function renderMetaRow(kind, items) {
  if (items.length === 0) return null;
  const startItems = items.filter((item) => item.align === "start");
  const endItems = items.filter((item) => item.align === "end");
  const renderItems = (slotItems, align) => {
    if (slotItems.length === 0) return null;
    return /* @__PURE__ */ jsx("div", { className: "vds-field-meta-slot", "data-align": align, children: slotItems.map((item, index) => /* @__PURE__ */ jsx(
      "div",
      {
        id: item.id,
        role: item.kind === "error" ? "alert" : void 0,
        className: cn(
          "vds-field-meta-item",
          `vds-field-meta-item--${item.kind}`
        ),
        children: item.content
      },
      `${kind}-${align}-${index}`
    )) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "vds-field-meta-row", "data-kind": kind, children: [
    renderItems(startItems, "start"),
    renderItems(endItems, "end")
  ] });
}
function Field({
  children,
  label,
  description,
  error,
  counter,
  afterControl,
  invalid,
  required,
  disabled,
  controlId,
  descriptionId,
  errorId,
  counterId,
  metaLayout = "stacked",
  descriptionAlign = "start",
  errorAlign = "start",
  counterAlign = "end",
  labelProps,
  className,
  controlClassName,
  afterControlClassName,
  metaClassName,
  ref,
  ...props
}) {
  const {
    className: labelPropsClassName,
    ...restLabelProps
  } = labelProps ?? {};
  const divLabelProps = restLabelProps;
  const labelClassName = cn("vds-field-label", labelPropsClassName);
  const descriptionItem = hasContent(description) ? {
    align: descriptionAlign,
    content: description,
    id: descriptionId,
    kind: "description"
  } : null;
  const errorItem = hasContent(error) ? {
    align: errorAlign,
    content: error,
    id: errorId,
    kind: "error"
  } : null;
  const counterItem = hasContent(counter) ? {
    align: counterAlign,
    content: counter,
    id: counterId,
    kind: "counter"
  } : null;
  const metaRows = metaLayout === "inline" ? [
    renderMetaRow(
      "inline",
      [descriptionItem, errorItem, counterItem].filter(
        Boolean
      )
    )
  ] : [
    renderMetaRow(
      "primary",
      [descriptionItem, counterItem].filter(
        Boolean
      )
    ),
    renderMetaRow(
      "error",
      [errorItem].filter(Boolean)
    )
  ];
  const hasMeta = metaRows.some(Boolean);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-field", className),
      "data-invalid": invalid || void 0,
      "data-disabled": disabled || void 0,
      "data-meta-layout": metaLayout,
      ...props,
      children: [
        label ? controlId ? /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: controlId,
            className: labelClassName,
            ...restLabelProps,
            children: [
              label,
              required ? /* @__PURE__ */ jsx("span", { className: "vds-field-required", "aria-hidden": "true", children: "*" }) : null
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          "div",
          {
            className: labelClassName,
            ...divLabelProps,
            children: [
              label,
              required ? /* @__PURE__ */ jsx("span", { className: "vds-field-required", "aria-hidden": "true", children: "*" }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ jsx("div", { className: cn("vds-field-control", controlClassName), children }),
        afterControl ? /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("vds-field-after-control", afterControlClassName),
            children: afterControl
          }
        ) : null,
        hasMeta ? /* @__PURE__ */ jsx("div", { className: cn("vds-field-meta", metaClassName), children: metaRows }) : null
      ]
    }
  );
}

export { Field, Fieldset, FieldsetDescription, FieldsetLegend, composeFieldDescribedBy };
