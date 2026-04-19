import { cn } from '@virtari/utils';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Badge.tsx
function resolveLegacy(color, variant) {
  switch (variant) {
    case "default":
    case "secondary":
      return { color: "neutral", variant: "soft" };
    case "destructive":
      return { color: "danger", variant: "soft" };
    default:
      return { color, variant };
  }
}
function Badge({
  color = "primary",
  variant = "soft",
  size = "md",
  shape = "pill",
  dot = false,
  dotOnly = false,
  leftSection,
  rightSection,
  onRemove,
  removeLabel = "Remove",
  asChild = false,
  className,
  children,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  const { color: resolvedColor, variant: resolvedVariant } = resolveLegacy(color, variant);
  const interactive = !!props.onClick && !asChild;
  return /* @__PURE__ */ jsxs(
    Comp,
    {
      ref,
      className: cn("vds-badge", className),
      "data-color": resolvedColor,
      "data-variant": resolvedVariant,
      "data-size": size,
      "data-shape": shape !== "pill" ? shape : void 0,
      "data-interactive": interactive || void 0,
      "data-dot-only": dotOnly || void 0,
      ...props,
      children: [
        !dotOnly && dot && /* @__PURE__ */ jsx("span", { className: "vds-badge-dot", "aria-hidden": "true" }),
        !dotOnly && !dot && leftSection && /* @__PURE__ */ jsx("span", { className: "vds-badge-section", "data-position": "start", children: leftSection }),
        !dotOnly && /* @__PURE__ */ jsx(Slottable, { children }),
        !dotOnly && !onRemove && rightSection && /* @__PURE__ */ jsx("span", { className: "vds-badge-section", "data-position": "end", children: rightSection }),
        !dotOnly && onRemove && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "vds-badge-close",
            "aria-label": removeLabel,
            onClick: (e) => {
              e.stopPropagation();
              onRemove(e);
            },
            children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: [
              /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
              /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
            ] })
          }
        )
      ]
    }
  );
}

export { Badge };
