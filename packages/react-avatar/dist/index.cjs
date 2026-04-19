"use client";
'use strict';

var utils = require('@virtari-packages/utils');
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
function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    AvatarPrimitive__namespace.Root,
    {
      ref,
      className: utils.cn("vds-avatar", className),
      "data-size": size,
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
