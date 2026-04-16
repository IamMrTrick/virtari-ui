'use strict';

var utils = require('@virtari/utils');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/Badge.tsx
function Badge({
  variant = "default",
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
      className: utils.cn("vds-badge", className),
      "data-variant": variant,
      ...props
    }
  );
}

exports.Badge = Badge;
