import { useFormContext, useFormState, FormProvider, Controller } from 'react-hook-form';
import { createContext, forwardRef, useId, useMemo, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { cn } from '@virtari-packages/utils';
import { Label } from '@virtari-packages/react-label';
import { Slot } from '@radix-ui/react-slot';

// src/Form.tsx
var Form = FormProvider;
var FormFieldContext = createContext(
  null
);
var FormItemContext = createContext(null);
function FormField(props) {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
}
var FormItem = forwardRef(
  function FormItem2({ className, orientation = "vertical", ...props }, ref) {
    const id = useId();
    const value = useMemo(() => ({ id }), [id]);
    return /* @__PURE__ */ jsx(FormItemContext.Provider, { value, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-orientation": orientation,
        className: cn("vds-form-item", className),
        ...props
      }
    ) });
  }
);
function useFormField() {
  const fieldCtx = useContext(FormFieldContext);
  const itemCtx = useContext(FormItemContext);
  if (!fieldCtx) {
    throw new Error("useFormField must be used within <FormField>.");
  }
  if (!itemCtx) {
    throw new Error("useFormField must be used within <FormItem>.");
  }
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldCtx.name });
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
var FormLabel = forwardRef(function FormLabel2({ className, htmlFor, ...props }, ref) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      htmlFor: htmlFor ?? formItemId,
      "data-error": error ? "" : void 0,
      className: cn("vds-form-label", className),
      ...props
    }
  );
});
var FormControl = forwardRef(
  function FormControl2(props, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    const describedBy = error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId;
    return /* @__PURE__ */ jsx(
      Slot,
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
var FormDescription = forwardRef(function FormDescription2({ className, ...props }, ref) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("vds-form-item-description", className),
      ...props
    }
  );
});
var FormMessage = forwardRef(
  function FormMessage2({ className, children, ...props }, ref) {
    const { error, formMessageId } = useFormField();
    const body = children ?? (error?.message ? String(error.message) : null);
    const hasBody = Boolean(body);
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: formMessageId,
        role: hasBody ? "alert" : void 0,
        "aria-hidden": hasBody ? void 0 : true,
        "data-visible": hasBody ? "" : void 0,
        "data-empty": hasBody ? void 0 : "",
        className: cn("vds-form-item-message", className),
        ...props,
        children: /* @__PURE__ */ jsx("span", { className: "vds-form-item-message-body", children: body })
      }
    );
  }
);

export { Form, FormControl, FormDescription, FormField, FormFieldContext, FormItem, FormItemContext, FormLabel, FormMessage, useFormField };
