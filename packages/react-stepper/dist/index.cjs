'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Stepper.tsx
var StepperContext = react.createContext({
  activeStep: 0,
  orientation: "horizontal",
  size: "md",
  totalSteps: 0
});
function deriveStatus(index, activeStep) {
  if (index < activeStep) return "complete";
  if (index === activeStep) return "active";
  return "pending";
}
function renderDefaultIndicator(status, index, indicator) {
  if (indicator !== void 0) return indicator;
  if (status === "complete") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        focusable: "false",
        children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
      }
    );
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        focusable: "false",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
          /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: index + 1 });
}
function StepperIndicator({ index, status, className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: utils.cn("vds-stepper-indicator", className),
      "data-index": index,
      "data-status": status,
      ...props,
      children
    }
  );
}
function StepperStep({
  index = 0,
  label,
  description,
  indicator,
  status,
  className,
  style,
  children,
  ref,
  ...props
}) {
  const { activeStep, totalSteps } = react.useContext(StepperContext);
  const resolvedStatus = status ?? deriveStatus(index, activeStep);
  const isLast = index === totalSteps - 1;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "li",
    {
      ref,
      className: utils.cn("vds-stepper-step", className),
      "data-status": resolvedStatus,
      "data-last": isLast || void 0,
      "aria-current": resolvedStatus === "active" ? "step" : void 0,
      style: {
        "--stepper-step-index": index,
        "--stepper-step-delay": `${index * 42}ms`,
        ...style
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-stepper-header", children: [
          /* @__PURE__ */ jsxRuntime.jsx(StepperIndicator, { index, status: resolvedStatus, children: renderDefaultIndicator(resolvedStatus, index, indicator) }),
          !isLast && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-stepper-connector", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-stepper-content", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-stepper-label", children: label }),
          description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-stepper-description", children: description }),
          children
        ] })
      ]
    }
  );
}
function Stepper({
  activeStep,
  orientation = "horizontal",
  size = "md",
  variant = "default",
  tone = "primary",
  animation = "slide",
  line = "solid",
  className,
  children,
  ref,
  ...props
}) {
  const steps = react.Children.toArray(children);
  const totalSteps = steps.length;
  return /* @__PURE__ */ jsxRuntime.jsx(StepperContext.Provider, { value: { activeStep, orientation, size, totalSteps }, children: /* @__PURE__ */ jsxRuntime.jsx(
    "ol",
    {
      ref,
      className: utils.cn("vds-stepper", className),
      "data-orientation": orientation,
      "data-size": size,
      "data-variant": variant,
      "data-tone": tone,
      "data-animation": animation,
      "data-line": line,
      "aria-label": props["aria-label"] ?? "Progress steps",
      ...props,
      children: steps.map(
        (child, i) => react.isValidElement(child) ? react.cloneElement(child, { index: i }) : child
      )
    }
  ) });
}

exports.Stepper = Stepper;
exports.StepperIndicator = StepperIndicator;
exports.StepperStep = StepperStep;
