'use strict';

var chunkTG67FR6G_cjs = require('../chunk-TG67FR6G.cjs');
require('../chunk-LMWRQN3H.cjs');
require('../chunk-GRWKA3R2.cjs');
require('../chunk-BCOBWW4R.cjs');
require('../chunk-5E6EV3DU.cjs');
require('../chunk-JV2CZCUL.cjs');
require('../chunk-BAVCHO4C.cjs');
require('../chunk-RPLT3BNS.cjs');
require('../chunk-NFW6EKVN.cjs');
require('../chunk-WU2BDSKI.cjs');
require('../chunk-T6B7B45H.cjs');
var chunkHZZGSTKH_cjs = require('../chunk-HZZGSTKH.cjs');
require('../chunk-SREYN7I5.cjs');
require('../chunk-VMBJPRF6.cjs');
var chunkIF4KNLHI_cjs = require('../chunk-IF4KNLHI.cjs');
var chunk3W3I2SIR_cjs = require('../chunk-3W3I2SIR.cjs');
var chunkBMTE6ZMC_cjs = require('../chunk-BMTE6ZMC.cjs');
var React = require('react');
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

var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = chunkIF4KNLHI_cjs.createContextScope(ROOT_NAME, [
  chunkTG67FR6G_cjs.createDialogScope
]);
var useDialogScope = chunkTG67FR6G_cjs.createDialogScope();
var AlertDialog = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = chunk3W3I2SIR_cjs.createSlottable("AlertDialogContent");
var AlertDialogContent = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = React__namespace.useRef(null);
    const composedRefs = chunkBMTE6ZMC_cjs.useComposedRefs(forwardedRef, contentRef);
    const cancelRef = React__namespace.useRef(null);
    return /* @__PURE__ */ jsxRuntime.jsx(
      chunkTG67FR6G_cjs.WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntime.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntime.jsxs(
          chunkTG67FR6G_cjs.Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: chunkHZZGSTKH_cjs.composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              event.preventDefault();
              cancelRef.current?.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(Slottable, { children }),
              process.env.NODE_ENV === "development" && /* @__PURE__ */ jsxRuntime.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription = React__namespace.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = chunkBMTE6ZMC_cjs.useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntime.jsx(chunkTG67FR6G_cjs.Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@virtari-packages/primitives/visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://virtari.dev/docs/alert-dialog`;
  React__namespace.useEffect(() => {
    const hasDescription = document.getElementById(
      contentRef.current?.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog;
var Trigger2 = AlertDialogTrigger;
var Portal2 = AlertDialogPortal;
var Overlay2 = AlertDialogOverlay;
var Content2 = AlertDialogContent;
var Action = AlertDialogAction;
var Cancel = AlertDialogCancel;
var Title2 = AlertDialogTitle;
var Description2 = AlertDialogDescription;

exports.Action = Action;
exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
exports.Cancel = Cancel;
exports.Content = Content2;
exports.Description = Description2;
exports.Overlay = Overlay2;
exports.Portal = Portal2;
exports.Root = Root2;
exports.Title = Title2;
exports.Trigger = Trigger2;
exports.createAlertDialogScope = createAlertDialogScope;
