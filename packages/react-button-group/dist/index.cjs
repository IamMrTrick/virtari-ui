'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var reactButton = require('@virtari-packages/react-button');
var jsxRuntime = require('react/jsx-runtime');

// src/ButtonGroup.tsx
var ButtonGroup = react.forwardRef(
  function ButtonGroup2({
    color,
    variant,
    size,
    disabled,
    orientation = "horizontal",
    attached = false,
    fullWidth = false,
    className,
    children,
    ...rest
  }, ref) {
    const ctx = react.useMemo(
      () => ({ color, variant, size, disabled }),
      [color, variant, size, disabled]
    );
    return /* @__PURE__ */ jsxRuntime.jsx(reactButton.ButtonGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "group",
        className: utils.cn("vds-button-group", className),
        "data-orientation": orientation,
        "data-attached": attached ? "" : void 0,
        "data-full-width": fullWidth ? "" : void 0,
        "data-size": size,
        "data-variant": variant,
        "data-color": color,
        ...rest,
        children
      }
    ) });
  }
);
ButtonGroup.displayName = "ButtonGroup";

exports.ButtonGroup = ButtonGroup;
