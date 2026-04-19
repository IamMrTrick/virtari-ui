'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Card.tsx
function Card({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-card", className), ...props });
}
function CardHeader({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-card-header", className),
      ...props
    }
  );
}
function CardTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "h3",
    {
      ref,
      className: utils.cn("vds-card-title", className),
      ...props
    }
  );
}
function CardDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      ref,
      className: utils.cn("vds-card-description", className),
      ...props
    }
  );
}
function CardContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-card-content", className),
      ...props
    }
  );
}
function CardFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-card-footer", className),
      ...props
    }
  );
}

exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
