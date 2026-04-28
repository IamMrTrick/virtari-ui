import { cn } from '@virtari-packages/utils';
import { Slot } from '@radix-ui/react-slot';
import { jsx } from 'react/jsx-runtime';

// src/Chip.tsx
function Chip({
  variant = "default",
  size = "md",
  appearance = "soft",
  interactive = false,
  disabled = false,
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-chip", className),
      "data-variant": variant,
      "data-size": size,
      "data-appearance": appearance,
      "data-interactive": interactive ? "true" : void 0,
      "aria-disabled": disabled || void 0,
      ...props
    }
  );
}
function ChipIcon({
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-chip-icon", className),
      "aria-hidden": "true",
      ...props
    }
  );
}
function ChipLabel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn("vds-chip-label", className),
      ...props
    }
  );
}
function ChipRemove({
  asChild = false,
  className,
  type,
  "aria-label": ariaLabel,
  children,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      type: asChild ? void 0 : type ?? "button",
      className: cn("vds-chip-remove", className),
      "aria-label": ariaLabel ?? "Remove",
      ...props,
      children: children ?? /* @__PURE__ */ jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M18 6L6 18M6 6l12 12" })
        }
      )
    }
  );
}

export { Chip, ChipIcon, ChipLabel, ChipRemove };
