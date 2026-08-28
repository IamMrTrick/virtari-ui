'use strict';

var chunkZPMLOBZ2_cjs = require('../chunk-ZPMLOBZ2.cjs');
var chunkLMWRQN3H_cjs = require('../chunk-LMWRQN3H.cjs');
var chunkGRWKA3R2_cjs = require('../chunk-GRWKA3R2.cjs');
require('../chunk-BCOBWW4R.cjs');
var chunk5E6EV3DU_cjs = require('../chunk-5E6EV3DU.cjs');
var chunkJV2CZCUL_cjs = require('../chunk-JV2CZCUL.cjs');
require('../chunk-L233M7Z2.cjs');
require('../chunk-BAVCHO4C.cjs');
require('../chunk-UDZ2VZYI.cjs');
var chunkRPLT3BNS_cjs = require('../chunk-RPLT3BNS.cjs');
var chunkNFW6EKVN_cjs = require('../chunk-NFW6EKVN.cjs');
require('../chunk-WU2BDSKI.cjs');
var chunkT6B7B45H_cjs = require('../chunk-T6B7B45H.cjs');
var chunkHZZGSTKH_cjs = require('../chunk-HZZGSTKH.cjs');
require('../chunk-SREYN7I5.cjs');
var chunkVMBJPRF6_cjs = require('../chunk-VMBJPRF6.cjs');
var chunkIF4KNLHI_cjs = require('../chunk-IF4KNLHI.cjs');
var chunk3W3I2SIR_cjs = require('../chunk-3W3I2SIR.cjs');
var chunkBMTE6ZMC_cjs = require('../chunk-BMTE6ZMC.cjs');
var React = require('react');
var ariaHidden = require('aria-hidden');
var reactRemoveScroll = require('react-remove-scroll');
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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = chunkIF4KNLHI_cjs.createContextScope(POPOVER_NAME, [
  chunkZPMLOBZ2_cjs.createPopperScope
]);
var usePopperScope = chunkZPMLOBZ2_cjs.createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = React__namespace.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React__namespace.useState(false);
  const [open, setOpen] = chunkNFW6EKVN_cjs.useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsxRuntime.jsx(chunkZPMLOBZ2_cjs.Root, { ...popperScope, children: /* @__PURE__ */ jsxRuntime.jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: chunkRPLT3BNS_cjs.useId(),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: React__namespace.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: React__namespace.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: React__namespace.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
};
Popover.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    React__namespace.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkZPMLOBZ2_cjs.Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = chunkBMTE6ZMC_cjs.useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsxRuntime.jsx(
      chunkVMBJPRF6_cjs.Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: chunkHZZGSTKH_cjs.composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsxRuntime.jsx(chunkZPMLOBZ2_cjs.Anchor, { asChild: true, ...popperScope, children: trigger });
  }
);
PopoverTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ jsxRuntime.jsx(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsxRuntime.jsx(chunkT6B7B45H_cjs.Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntime.jsx(chunkLMWRQN3H_cjs.Portal, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent";
var PopoverContent = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkT6B7B45H_cjs.Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntime.jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntime.jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
PopoverContent.displayName = CONTENT_NAME;
var Slot = chunk3W3I2SIR_cjs.createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = React__namespace.useRef(null);
    const composedRefs = chunkBMTE6ZMC_cjs.useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = React__namespace.useRef(false);
    React__namespace.useEffect(() => {
      const content = contentRef.current;
      if (content) return ariaHidden.hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntime.jsx(reactRemoveScroll.RemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: chunkHZZGSTKH_cjs.composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: chunkHZZGSTKH_cjs.composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          },
          { checkForDefaultPrevented: false }
        ),
        onFocusOutside: chunkHZZGSTKH_cjs.composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
var PopoverContentNonModal = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = React__namespace.useRef(false);
    const hasPointerDownOutsideRef = React__namespace.useRef(false);
    return /* @__PURE__ */ jsxRuntime.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var PopoverContentImpl = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    chunk5E6EV3DU_cjs.useFocusGuards();
    return /* @__PURE__ */ jsxRuntime.jsx(
      chunkJV2CZCUL_cjs.FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          chunkGRWKA3R2_cjs.DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              chunkZPMLOBZ2_cjs.Content,
              {
                "data-state": getState(context.open),
                role: "dialog",
                id: context.contentId,
                ...popperScope,
                ...contentProps,
                ref: forwardedRef,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--vds-popover-content-transform-origin": "var(--vds-popper-transform-origin)",
                    "--vds-popover-content-available-width": "var(--vds-popper-available-width)",
                    "--vds-popover-content-available-height": "var(--vds-popper-available-height)",
                    "--vds-popover-trigger-width": "var(--vds-popper-anchor-width)",
                    "--vds-popover-trigger-height": "var(--vds-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    );
  }
);
var CLOSE_NAME = "PopoverClose";
var PopoverClose = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ jsxRuntime.jsx(
      chunkVMBJPRF6_cjs.Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: chunkHZZGSTKH_cjs.composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkZPMLOBZ2_cjs.Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
PopoverArrow.displayName = ARROW_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Popover;
var Anchor2 = PopoverAnchor;
var Trigger = PopoverTrigger;
var Portal2 = PopoverPortal;
var Content2 = PopoverContent;
var Close = PopoverClose;
var Arrow2 = PopoverArrow;

exports.Anchor = Anchor2;
exports.Arrow = Arrow2;
exports.Close = Close;
exports.Content = Content2;
exports.Popover = Popover;
exports.PopoverAnchor = PopoverAnchor;
exports.PopoverArrow = PopoverArrow;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverPortal = PopoverPortal;
exports.PopoverTrigger = PopoverTrigger;
exports.Portal = Portal2;
exports.Root = Root2;
exports.Trigger = Trigger;
exports.createPopoverScope = createPopoverScope;
