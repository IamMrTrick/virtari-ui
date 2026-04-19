"use client";
'use strict';

var utils = require('@virtari/utils');
var CollapsiblePrimitive = require('@radix-ui/react-collapsible');
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

var CollapsiblePrimitive__namespace = /*#__PURE__*/_interopNamespace(CollapsiblePrimitive);

// src/Collapsible.tsx
var Collapsible = CollapsiblePrimitive__namespace.Root;
var CollapsibleTrigger = CollapsiblePrimitive__namespace.Trigger;
function CollapsibleContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    CollapsiblePrimitive__namespace.Content,
    {
      ref,
      className: utils.cn("vds-collapsible-content", className),
      ...props
    }
  );
}

exports.Collapsible = Collapsible;
exports.CollapsibleContent = CollapsibleContent;
exports.CollapsibleTrigger = CollapsibleTrigger;
