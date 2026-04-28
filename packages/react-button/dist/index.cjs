'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/Button.tsx
var ButtonGroupContext = react.createContext(null);
function hasReadableText(node) {
  return react.Children.toArray(node).some((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    if (typeof child === "number") return true;
    if (react.isValidElement(child)) {
      return hasReadableText(child.props.children);
    }
    return false;
  });
}
var Button = react.forwardRef(function Button2({
  color: colorProp,
  variant: variantProp,
  size: sizeProp,
  asChild = false,
  loading = false,
  loadingText = "Loading",
  leftSection,
  rightSection,
  fullWidth = false,
  effect,
  animation,
  disabled: disabledProp,
  className,
  children,
  ...props
}, forwardedRef) {
  const group = react.useContext(ButtonGroupContext);
  const color = colorProp ?? group?.color ?? "primary";
  const variant = variantProp ?? group?.variant ?? "solid";
  const size = sizeProp ?? group?.size ?? "md";
  const disabled = disabledProp ?? group?.disabled ?? false;
  const isDisabled = disabled || loading;
  const resolvedColor = variant === "destructive" ? "danger" : color;
  const resolvedVariant = variant === "destructive" ? "solid" : variant;
  const hasTextContent = hasReadableText(children);
  const hasBareVisualChild = children != null && !hasTextContent;
  const visualSlotCount = Number(leftSection != null) + Number(rightSection != null) + Number(hasBareVisualChild);
  const iconOnly = visualSlotCount === 1 && !hasTextContent;
  const buttonContent = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-button-content", children: [
      leftSection && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-section", "data-position": "start", children: leftSection }),
      children != null ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-label", children: asChild ? /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slottable, { children }) : children }) : null,
      rightSection && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-section", "data-position": "end", children: rightSection })
    ] }),
    loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-button-spinner", "aria-hidden": "true" })
  ] });
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    asChild ? /* @__PURE__ */ jsxRuntime.jsx(
      reactSlot.Slot,
      {
        ref: forwardedRef,
        className: utils.cn("vds-button", className),
        "data-color": resolvedColor,
        "data-variant": resolvedVariant,
        "data-size": size,
        "data-full-width": fullWidth || void 0,
        "data-effect": effect || void 0,
        "data-animation": animation || void 0,
        "data-icon-only": iconOnly || void 0,
        "aria-busy": loading || void 0,
        "aria-disabled": isDisabled || void 0,
        "aria-label": loading ? loadingText : void 0,
        ...props,
        children: buttonContent
      }
    ) : /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref: forwardedRef,
        className: utils.cn("vds-button", className),
        "data-color": resolvedColor,
        "data-variant": resolvedVariant,
        "data-size": size,
        "data-full-width": fullWidth || void 0,
        "data-effect": effect || void 0,
        "data-animation": animation || void 0,
        "data-icon-only": iconOnly || void 0,
        disabled: isDisabled,
        "aria-busy": loading || void 0,
        "aria-disabled": isDisabled || void 0,
        "aria-label": loading ? loadingText : void 0,
        ...props,
        children: buttonContent
      }
    ),
    loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-sr-only", role: "status", "aria-live": "polite", children: loadingText })
  ] });
});
Button.displayName = "Button";

exports.Button = Button;
exports.ButtonGroupContext = ButtonGroupContext;
