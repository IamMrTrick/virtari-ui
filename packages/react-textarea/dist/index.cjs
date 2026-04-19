'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Textarea.tsx
function Textarea({
  inputSize = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "textarea",
    {
      ref,
      className: utils.cn("vds-textarea", className),
      "data-size": inputSize,
      ...props
    }
  );
}

exports.Textarea = Textarea;
