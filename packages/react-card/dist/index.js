import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';

// src/Card.tsx
function Card({
  variant = "surface",
  size = "md",
  interactive = false,
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-card", className),
      "data-variant": variant !== "surface" ? variant : void 0,
      "data-size": size !== "md" ? size : void 0,
      "data-interactive": interactive || void 0,
      ...props
    }
  );
}
function CardHeader({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-card-header", className),
      ...props
    }
  );
}
function CardTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "h3",
    {
      ref,
      className: cn("vds-card-title", className),
      ...props
    }
  );
}
function CardDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: cn("vds-card-description", className),
      ...props
    }
  );
}
function CardContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-card-content", className),
      ...props
    }
  );
}
function CardFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-card-footer", className),
      ...props
    }
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
