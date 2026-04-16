'use strict';

var utils = require('@virtari/utils');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');
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

var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownMenuPrimitive);

// src/DropdownMenu.tsx
var DropdownMenu = DropdownMenuPrimitive__namespace.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive__namespace.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive__namespace.Group;
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Content,
    {
      ref,
      sideOffset,
      className: utils.cn("vds-dropdown-menu-content", className),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-dropdown-menu-item", className),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Separator,
    {
      ref,
      className: utils.cn("vds-dropdown-menu-separator", className),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Label,
    {
      ref,
      className: utils.cn("vds-dropdown-menu-label", className),
      ...props
    }
  );
}

exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
