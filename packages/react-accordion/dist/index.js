import { cn } from '@virtari/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Accordion.tsx
var Accordion = AccordionPrimitive.Root;
function AccordionItem({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      ref,
      className: cn("vds-accordion-item", className),
      ...props
    }
  );
}
function AccordionTrigger({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "vds-accordion-header", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      ref,
      className: cn("vds-accordion-trigger", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "vds-accordion-chevron",
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": true,
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M4 6L8 10L12 6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        )
      ]
    }
  ) });
}
function AccordionContent({ className, children, ref, ...props }) {
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

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
