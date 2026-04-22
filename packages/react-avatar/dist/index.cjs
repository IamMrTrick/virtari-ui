"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var AvatarPrimitive = require('@radix-ui/react-avatar');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var AvatarPrimitive__namespace = /*#__PURE__*/_interopNamespace(AvatarPrimitive);

// src/Avatar.tsx
function hashToSlot(input, buckets = 8) {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) + hash + input.charCodeAt(i) | 0;
  }
  return Math.abs(hash) % buckets + 1;
}
function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  color = "neutral",
  colorKey,
  className,
  ref,
  ...props
}) {
  const resolvedColor = react.useMemo(() => {
    if (color === "auto") {
      return String(hashToSlot(colorKey ?? fallback ?? ""));
    }
    return color;
  }, [color, colorKey, fallback]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    AvatarPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-avatar", className),
      "data-size": size,
      "data-color": resolvedColor,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          AvatarPrimitive__namespace.Image,
          {
            className: "vds-avatar-image",
            src,
            alt
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(AvatarPrimitive__namespace.Fallback, { className: "vds-avatar-fallback", children: fallback })
      ]
    }
  );
}

exports.Avatar = Avatar;
