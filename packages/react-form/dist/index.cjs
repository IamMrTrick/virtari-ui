'use strict';

var reactHookForm = require('react-hook-form');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var utils = require('@virtari-packages/utils');
var reactLabel = require('@virtari-packages/react-label');
var reactSlot = require('@radix-ui/react-slot');

// src/Form.tsx
var Form = reactHookForm.FormProvider;
var FormFieldContext = react.createContext(
  null
);
var FormItemContext = react.createContext(null);
function FormField(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxRuntime.jsx(reactHookForm.Controller, { ...props }) });
}
var FormItem = react.forwardRef(
  function FormItem2({ className, orientation = "vertical", ...props }, ref) {
    const id = react.useId();
    const value = react.useMemo(() => ({ id }), [id]);
    return /* @__PURE__ */ jsxRuntime.jsx(FormItemContext.Provider, { value, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        "data-orientation": orientation,
        className: utils.cn("vds-form-item", className),
        ...props
      }
    ) });
  }
);
function useFormField() {
  const fieldCtx = react.useContext(FormFieldContext);
  const itemCtx = react.useContext(FormItemContext);
  if (!fieldCtx) {
    throw new Error("useFormField must be used within <FormField>.");
  }
  if (!itemCtx) {
    throw new Error("useFormField must be used within <FormItem>.");
  }
  const { getFieldState } = reactHookForm.useFormContext();
  const formState = reactHookForm.useFormState({ name: fieldCtx.name });
  const fieldState = getFieldState(fieldCtx.name, formState);
  const { id } = itemCtx;
  return {
    id,
    name: fieldCtx.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState.error,
    invalid: fieldState.invalid,
    isDirty: fieldState.isDirty,
    isTouched: fieldState.isTouched
  };
}
var FormLabel = react.forwardRef(function FormLabel2({ className, htmlFor, ...props }, ref) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactLabel.Label,
    {
      ref,
      htmlFor: htmlFor ?? formItemId,
      "data-error": error ? "" : void 0,
      className: utils.cn("vds-form-label", className),
      ...props
    }
  );
});
var FormControl = react.forwardRef(
  function FormControl2(props, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    const describedBy = error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId;
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactSlot.Slot,
      {
        ref,
        id: formItemId,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : void 0,
        ...props
      }
    );
  }
);
var FormDescription = react.forwardRef(function FormDescription2({ className, ...props }, ref) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: utils.cn("vds-form-item-description", className),
      ...props
    }
  );
});
var FormMessage = react.forwardRef(
  function FormMessage2({ className, children, ...props }, ref) {
    const { error, formMessageId } = useFormField();
    const body = children ?? (error?.message ? String(error.message) : null);
    const hasBody = Boolean(body);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "p",
      {
        ref,
        id: formMessageId,
        role: hasBody ? "alert" : void 0,
        "aria-hidden": hasBody ? void 0 : true,
        "data-visible": hasBody ? "" : void 0,
        "data-empty": hasBody ? void 0 : "",
        className: utils.cn("vds-form-item-message", className),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-form-item-message-body", children: body })
      }
    );
  }
);

exports.Form = Form;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormField = FormField;
exports.FormFieldContext = FormFieldContext;
exports.FormItem = FormItem;
exports.FormItemContext = FormItemContext;
exports.FormLabel = FormLabel;
exports.FormMessage = FormMessage;
exports.useFormField = useFormField;
