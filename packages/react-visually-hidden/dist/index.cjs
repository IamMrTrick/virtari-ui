'use strict';

var utils = require('@virtari-packages/utils');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/VisuallyHidden.tsx
function VisuallyHidden({
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "span";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      className: utils.cn("vds-visually-hidden", className),
      ...props
    }
  );
}

exports.VisuallyHidden = VisuallyHidden;
