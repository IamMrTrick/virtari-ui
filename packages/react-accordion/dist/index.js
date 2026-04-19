"use client";
import { cn } from '@virtari-packages/utils';
import { createContext, useContext, createElement, useId } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IconPlus, IconMinus, IconArrowDown, IconCaretDownFilled, IconChevronDown } from '@virtari-packages/react-icons';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/Accordion.tsx
var AccordionContext = createContext({
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
  return /* @__PURE__ */ jsx(
    AccordionContext.Provider,
    {
      value: { iconType, iconPosition, headingLevel, size },
      children: /* @__PURE__ */ jsx(
        AccordionPrimitive.Root,
        {
          ref,
          className: cn("vds-accordion", className),
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
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      ref,
      className: cn("vds-accordion-item", className),
      "data-color": color,
      ...props
    }
  );
}
var ICON_STROKE = 1.75;
function AccordionIndicator({ type }) {
  if (type === "none") return null;
  if (type === "plus-minus") {
    return /* @__PURE__ */ jsxs("span", { className: "vds-accordion-icon", "data-icon": "plus-minus", "aria-hidden": true, children: [
      /* @__PURE__ */ jsx(
        IconPlus,
        {
          className: "vds-accordion-icon-plus",
          stroke: ICON_STROKE,
          focusable: false
        }
      ),
      /* @__PURE__ */ jsx(
        IconMinus,
        {
          className: "vds-accordion-icon-minus",
          stroke: ICON_STROKE,
          focusable: false
        }
      )
    ] });
  }
  const Icon = type === "arrow" ? IconArrowDown : type === "caret" ? IconCaretDownFilled : IconChevronDown;
  return /* @__PURE__ */ jsx("span", { className: "vds-accordion-icon", "data-icon": type, "aria-hidden": true, children: /* @__PURE__ */ jsx(Icon, { stroke: ICON_STROKE, focusable: false }) });
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
  const ctx = useContext(AccordionContext);
  const iconType = iconTypeProp ?? ctx.iconType;
  const iconPosition = iconPositionProp ?? ctx.iconPosition;
  const headingLevel = headingLevelProp ?? ctx.headingLevel;
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { asChild: true, children: /* @__PURE__ */ jsx(HeadingTag, { className: "vds-accordion-header", tag: headingLevel, children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      ref,
      className: cn("vds-accordion-trigger", className),
      "data-icon-position": iconPosition,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "vds-accordion-trigger-label", children }),
        /* @__PURE__ */ jsx(AccordionIndicator, { type: iconType })
      ]
    }
  ) }) });
}
function HeadingTag({
  tag,
  className,
  children
}) {
  return createElement(tag, { className }, children);
}
function AccordionContent({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      ref,
      className: cn("vds-accordion-content", className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "vds-accordion-content-inner", children })
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
  const scriptId = useId();
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
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
        children: items.map((item) => /* @__PURE__ */ jsxs(AccordionItem, { value: item.id, id: item.id, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: item.question }),
          /* @__PURE__ */ jsx(AccordionContent, { children: item.answer })
        ] }, item.id))
      }
    ),
    structuredData && /* @__PURE__ */ jsx(
      "script",
      {
        id: `faq-jsonld-${scriptId}`,
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
      }
    )
  ] });
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, FAQAccordion };
