'use strict';

var utils = require('@virtari/utils');
var TabsPrimitive = require('@radix-ui/react-tabs');
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

var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);

// src/Tabs.tsx
var Tabs = TabsPrimitive__namespace.Root;
function TabsList({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.List,
    {
      ref,
      className: utils.cn("vds-tabs-list", className),
      ...props
    }
  );
}
function TabsTrigger({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Trigger,
    {
      ref,
      className: utils.cn("vds-tabs-trigger", className),
      ...props
    }
  );
}
function TabsContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Content,
    {
      ref,
      className: utils.cn("vds-tabs-content", className),
      ...props
    }
  );
}

exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
