import { cn } from '@virtari-packages/utils';
import { createContext, forwardRef, useContext } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

// src/Button.tsx
var ButtonGroupContext = createContext(null);
var Button = forwardRef(function Button2({
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
  const group = useContext(ButtonGroupContext);
  const color = colorProp ?? group?.color ?? "primary";
  const variant = variantProp ?? group?.variant ?? "solid";
  const size = sizeProp ?? group?.size ?? "md";
  const disabled = disabledProp ?? group?.disabled ?? false;
  const isDisabled = disabled || loading;
  const resolvedColor = variant === "destructive" ? "danger" : color;
  const resolvedVariant = variant === "destructive" ? "solid" : variant;
  const buttonContent = /* @__PURE__ */ jsxs(Fragment, { children: [
    loading && /* @__PURE__ */ jsx("span", { className: "vds-button-spinner", "aria-hidden": "true" }),
    leftSection && /* @__PURE__ */ jsx("span", { className: "vds-button-section", "data-position": "start", children: leftSection }),
    children != null ? /* @__PURE__ */ jsx("span", { className: "vds-button-label", children }) : null,
    rightSection && /* @__PURE__ */ jsx("span", { className: "vds-button-section", "data-position": "end", children: rightSection })
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    asChild ? /* @__PURE__ */ jsxs(
      Slot,
      {
        ref: forwardedRef,
        className: cn("vds-button", className),
        "data-color": resolvedColor,
        "data-variant": resolvedVariant,
        "data-size": size,
        "data-loading": loading || void 0,
        "data-full-width": fullWidth || void 0,
        "data-effect": effect || void 0,
        "data-animation": animation || void 0,
        "aria-disabled": isDisabled || void 0,
        "aria-label": loading ? loadingText : void 0,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsx("span", { className: "vds-button-spinner", "aria-hidden": "true" }),
          leftSection && /* @__PURE__ */ jsx("span", { className: "vds-button-section", "data-position": "start", children: leftSection }),
          children != null ? /* @__PURE__ */ jsx(Slottable, { children }) : null,
          rightSection && /* @__PURE__ */ jsx("span", { className: "vds-button-section", "data-position": "end", children: rightSection })
        ]
      }
    ) : /* @__PURE__ */ jsx(
      "button",
      {
        ref: forwardedRef,
        className: cn("vds-button", className),
        "data-color": resolvedColor,
        "data-variant": resolvedVariant,
        "data-size": size,
        "data-loading": loading || void 0,
        "data-full-width": fullWidth || void 0,
        "data-effect": effect || void 0,
        "data-animation": animation || void 0,
        disabled: isDisabled,
        "aria-disabled": isDisabled || void 0,
        "aria-label": loading ? loadingText : void 0,
        ...props,
        children: /* @__PURE__ */ jsx("span", { className: "vds-button-content", children: buttonContent })
      }
    ),
    loading && /* @__PURE__ */ jsx("span", { className: "vds-sr-only", role: "status", "aria-live": "polite", children: loadingText })
  ] });
});
Button.displayName = "Button";

export { Button, ButtonGroupContext };
