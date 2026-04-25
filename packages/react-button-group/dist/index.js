import { cn } from '@virtari-packages/utils';
import { forwardRef, useMemo } from 'react';
import { ButtonGroupContext } from '@virtari-packages/react-button';
import { jsx } from 'react/jsx-runtime';

// src/ButtonGroup.tsx
var ButtonGroup = forwardRef(
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
    const ctx = useMemo(
      () => ({ color, variant, size, disabled }),
      [color, variant, size, disabled]
    );
    return /* @__PURE__ */ jsx(ButtonGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        className: cn("vds-button-group", className),
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

export { ButtonGroup };
