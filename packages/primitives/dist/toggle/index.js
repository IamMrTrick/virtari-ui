import { useControllableState } from '../chunk-4USKNNVY.js';
import '../chunk-F4XK3YDS.js';
import { composeEventHandlers } from '../chunk-JJLVAJBS.js';
import '../chunk-66NTA5O7.js';
import { Primitive } from '../chunk-TWQ2T4Y5.js';
import '../chunk-KUAR3T24.js';
import '../chunk-ER6L2S4U.js';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

var NAME = "Toggle";
var Toggle = React.forwardRef((props, forwardedRef) => {
  const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
  const [pressed, setPressed] = useControllableState({
    prop: pressedProp,
    onChange: onPressedChange,
    defaultProp: defaultPressed ?? false,
    caller: NAME
  });
  return /* @__PURE__ */ jsx(
    Primitive.button,
    {
      type: "button",
      "aria-pressed": pressed,
      "data-state": pressed ? "on" : "off",
      "data-disabled": props.disabled ? "" : void 0,
      ...buttonProps,
      ref: forwardedRef,
      onClick: composeEventHandlers(props.onClick, () => {
        if (!props.disabled) {
          setPressed(!pressed);
        }
      })
    }
  );
});
Toggle.displayName = NAME;
var Root = Toggle;

export { Root, Toggle };
