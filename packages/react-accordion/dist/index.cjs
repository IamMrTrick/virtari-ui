'use strict';

var utils = require('@virtari/utils');
var AccordionPrimitive = require('@radix-ui/react-accordion');
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
var Accordion = AccordionPrimitive__namespace.Root;
function AccordionItem({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AccordionPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-accordion-item", className),
      ...props
    }
  );
}
function AccordionTrigger({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccordionPrimitive__namespace.Header, { className: "vds-accordion-header", children: /* @__PURE__ */ jsxRuntime.jsxs(
    AccordionPrimitive__namespace.Trigger,
    {
      ref,
      className: utils.cn("vds-accordion-trigger", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            className: "vds-accordion-chevron",
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": true,
            children: /* @__PURE__ */ jsxRuntime.jsx(
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

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
