import { cn } from '@virtari/utils';
import { jsx } from 'react/jsx-runtime';

// src/Card.tsx
function Card({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-card", className), ...props });
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
