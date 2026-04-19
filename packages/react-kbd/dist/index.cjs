'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Kbd.tsx
function Kbd({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("kbd", { ref, className: utils.cn("vds-kbd", className), ...props });
}

exports.Kbd = Kbd;
