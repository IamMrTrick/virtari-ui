"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var AccordionPrimitive = require('@radix-ui/react-accordion');
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

var AccordionPrimitive__namespace = /*#__PURE__*/_interopNamespace(AccordionPrimitive);

// src/Accordion.tsx
var AccordionContext = react.createContext({
  iconType: "chevron",
  iconPosition: "end",
  headingLevel: "h3",
  size: "md"
});
function Accordion({
  variant = "plain",
  size = "md",
  color = "neutral",
  iconType = "chevron",
  iconPosition = "end",
  headingLevel = "h3",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AccordionContext.Provider,
    {
      value: { iconType, iconPosition, headingLevel, size },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        AccordionPrimitive__namespace.Root,
        {
          ref,
          className: utils.cn("vds-accordion", className),
          "data-variant": variant,
          "data-size": size,
          "data-color": color,
          ...props
        }
      )
    }
  );
}
function AccordionItem({
  className,
  color,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AccordionPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-accordion-item", className),
      "data-color": color,
      ...props
    }
  );
}
var ICON_STROKE = 1.75;
function AccordionIndicator({ type }) {
  if (type === "none") return null;
  if (type === "plus-minus") {
    return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-accordion-icon", "data-icon": "plus-minus", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactIcons.IconPlus,
        {
          className: "vds-accordion-icon-plus",
          stroke: ICON_STROKE,
          focusable: false
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactIcons.IconMinus,
        {
          className: "vds-accordion-icon-minus",
          stroke: ICON_STROKE,
          focusable: false
        }
      )
    ] });
  }
  const Icon = type === "arrow" ? reactIcons.IconArrowDown : type === "caret" ? reactIcons.IconCaretDownFilled : reactIcons.IconChevronDown;
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-accordion-icon", "data-icon": type, "aria-hidden": true, children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { stroke: ICON_STROKE, focusable: false }) });
}
function AccordionTrigger({
  className,
  children,
  iconType: iconTypeProp,
  iconPosition: iconPositionProp,
  headingLevel: headingLevelProp,
  ref,
  ...props
}) {
  const ctx = react.useContext(AccordionContext);
  const iconType = iconTypeProp ?? ctx.iconType;
  const iconPosition = iconPositionProp ?? ctx.iconPosition;
  const headingLevel = headingLevelProp ?? ctx.headingLevel;
  return /* @__PURE__ */ jsxRuntime.jsx(AccordionPrimitive__namespace.Header, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(HeadingTag, { className: "vds-accordion-header", tag: headingLevel, children: /* @__PURE__ */ jsxRuntime.jsxs(
    AccordionPrimitive__namespace.Trigger,
    {
      ref,
      className: utils.cn("vds-accordion-trigger", className),
      "data-icon-position": iconPosition,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-accordion-trigger-label", children }),
        /* @__PURE__ */ jsxRuntime.jsx(AccordionIndicator, { type: iconType })
      ]
    }
  ) }) });
}
function HeadingTag({
  tag,
  className,
  children
}) {
  return react.createElement(tag, { className }, children);
}
function AccordionContent({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AccordionPrimitive__namespace.Content,
    {
      ref,
      className: utils.cn("vds-accordion-content", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-accordion-content-inner", children })
    }
  );
}
function FAQAccordion({
  items,
  defaultOpen = [],
  allowMultiple = true,
  variant = "contained",
  size = "md",
  color = "neutral",
  iconType = "plus-minus",
  iconPosition = "end",
  headingLevel = "h3",
  structuredData = true,
  className
}) {
  const scriptId = react.useId();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerText
      }
    }))
  };
  const accordionProps = allowMultiple ? { type: "multiple", defaultValue: defaultOpen } : { type: "single", collapsible: true, defaultValue: defaultOpen[0] };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Accordion,
      {
        ...accordionProps,
        variant,
        size,
        color,
        iconType,
        iconPosition,
        headingLevel,
        className,
        children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(AccordionItem, { value: item.id, id: item.id, children: [
          /* @__PURE__ */ jsxRuntime.jsx(AccordionTrigger, { children: item.question }),
          /* @__PURE__ */ jsxRuntime.jsx(AccordionContent, { children: item.answer })
        ] }, item.id))
      }
    ),
    structuredData && /* @__PURE__ */ jsxRuntime.jsx(
      "script",
      {
        id: `faq-jsonld-${scriptId}`,
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
      }
    )
  ] });
}

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.FAQAccordion = FAQAccordion;
