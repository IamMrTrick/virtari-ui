'use strict';

var utils = require('@virtari/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Skeleton.tsx
function Skeleton({
  width,
  height,
  circle = false,
  className,
  style,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-skeleton", className),
      "data-circle": circle || void 0,
      style: {
        "--_skeleton-w": typeof width === "number" ? `${width}px` : width,
        "--_skeleton-h": typeof height === "number" ? `${height}px` : height,
        ...style
      },
      ...props
    }
  );
}

exports.Skeleton = Skeleton;
