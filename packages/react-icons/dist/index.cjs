"use client";
'use strict';

var iconsReact = require('@tabler/icons-react');
var react = require('react');
var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/index.ts
var IconContext = react.createContext({
  size: "md",
  stroke: 1.5
});
function useIconDefaults() {
  return react.useContext(IconContext);
}
function IconProvider({ children, size, color, stroke }) {
  return /* @__PURE__ */ jsxRuntime.jsx(IconContext.Provider, { value: { size, color, stroke }, children });
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
  const defaults = react.useContext(IconContext);
  const resolvedSize = size ?? defaults.size ?? "md";
  const resolvedColor = color ?? defaults.color;
  const resolvedStroke = stroke ?? defaults.stroke;
  const tokenized = typeof resolvedSize === "string";
  return /* @__PURE__ */ jsxRuntime.jsx(
    TablerComp,
    {
      ref,
      className: utils.cn("vds-icon", className),
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

exports.Icon = Icon;
exports.IconContext = IconContext;
exports.IconProvider = IconProvider;
exports.useIconDefaults = useIconDefaults;
Object.keys(iconsReact).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return iconsReact[k]; }
  });
});
