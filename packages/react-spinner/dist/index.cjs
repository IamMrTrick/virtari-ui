'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Spinner.tsx
function Spinner({
  size = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      role: "status",
      "aria-label": "Loading",
      className: utils.cn("vds-spinner", className),
      "data-size": size,
      ...props
    }
  );
}

exports.Spinner = Spinner;
