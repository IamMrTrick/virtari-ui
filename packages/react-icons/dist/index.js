"use client";
export * from '@tabler/icons-react';
import { createContext, useContext } from 'react';
import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';

// src/index.ts
var IconContext = createContext({
  size: "md",
  stroke: 1.5
});
function useIconDefaults() {
  return useContext(IconContext);
}
function IconProvider({ children, size, color, stroke }) {
  return /* @__PURE__ */ jsx(IconContext.Provider, { value: { size, color, stroke }, children });
}
function Icon({
  icon: TablerComp,
  size,
  color,
  stroke,
  label,
  className,
  ref,
  ...rest
}) {
  const defaults = useContext(IconContext);
  const resolvedSize = size ?? defaults.size ?? "md";
  const resolvedColor = color ?? defaults.color;
  const resolvedStroke = stroke ?? defaults.stroke;
  const tokenized = typeof resolvedSize === "string";
  return /* @__PURE__ */ jsx(
    TablerComp,
    {
      ref,
      className: cn("vds-icon", className),
      "data-size": tokenized ? resolvedSize : void 0,
      "data-color": resolvedColor && resolvedColor !== "current" ? resolvedColor : void 0,
      size: tokenized ? void 0 : resolvedSize,
      stroke: resolvedStroke,
      "aria-hidden": label ? void 0 : true,
      "aria-label": label,
      role: label ? "img" : void 0,
      focusable: "false",
      ...rest
    }
  );
}

export { Icon, IconContext, IconProvider, useIconDefaults };
