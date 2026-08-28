import { useLayoutEffect } from './chunk-66NTA5O7.js';
import { Primitive } from './chunk-TWQ2T4Y5.js';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { jsx } from 'react/jsx-runtime';

var PORTAL_NAME = "Portal";
var Portal = React.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM.createPortal(/* @__PURE__ */ jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;
var Root = Portal;

export { Portal, Root };
