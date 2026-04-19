'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Input.tsx
function Input({ inputSize = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      ref,
      className: utils.cn("vds-input", className),
      "data-size": inputSize,
      ...props
    }
  );
}

exports.Input = Input;
