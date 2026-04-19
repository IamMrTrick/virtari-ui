import { cn } from '@virtari-packages/utils';
import { forwardRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

// src/Button.tsx
var Button = forwardRef(function Button2({
  color = "primary",
  variant = "solid",
  size = "md",
  asChild = false,
  loading = false,
  loadingText = "Loading",
  leftSection,
  rightSection,
  fullWidth = false,
  effect,
  animation,
  disabled,
  className,
  children,
  ...props
}, forwardedRef) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;
  const resolvedColor = variant === "destructive" ? "danger" : color;
  const resolvedVariant = variant === "destructive" ? "solid" : variant;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Comp,
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
        children: [
          loading && /* @__PURE__ */ jsx("span", { className: "vds-button-spinner", "aria-hidden": "true" }),
          leftSection && /* @__PURE__ */ jsx("span", { className: "vds-button-section", "data-position": "start", children: leftSection }),
          /* @__PURE__ */ jsx(Slottable, { children }),
          rightSection && /* @__PURE__ */ jsx("span", { className: "vds-button-section", "data-position": "end", children: rightSection })
        ]
      }
    ),
    loading && /* @__PURE__ */ jsx("span", { className: "vds-sr-only", role: "status", "aria-live": "polite", children: loadingText })
  ] });
});
Button.displayName = "Button";

export { Button };
