import { Primitive } from '../chunk-TWQ2T4Y5.js';
import '../chunk-KUAR3T24.js';
import '../chunk-ER6L2S4U.js';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

var NAME = "Label";
var Label = React.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        props.onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label.displayName = NAME;
var Root = Label;

export { Label, Root };
