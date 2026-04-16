import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

declare const AlertDialog: react.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: react.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Content>>;
}
declare function AlertDialogContent({ className, ref, ...props }: AlertDialogContentProps): react_jsx_runtime.JSX.Element;
interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Title>>;
}
declare function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps): react_jsx_runtime.JSX.Element;
interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Description>>;
}
declare function AlertDialogDescription({ className, ref, ...props }: AlertDialogDescriptionProps): react_jsx_runtime.JSX.Element;
interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Action>>;
}
declare function AlertDialogAction({ className, ref, ...props }: AlertDialogActionProps): react_jsx_runtime.JSX.Element;
interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
    ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}
declare function AlertDialogCancel({ className, ref, ...props }: AlertDialogCancelProps): react_jsx_runtime.JSX.Element;
interface AlertDialogFooterProps extends React.ComponentPropsWithoutRef<"div"> {
    ref?: Ref<HTMLDivElement>;
}
declare function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps): react_jsx_runtime.JSX.Element;

export { AlertDialog, AlertDialogAction, type AlertDialogActionProps, AlertDialogCancel, type AlertDialogCancelProps, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, type AlertDialogDescriptionProps, AlertDialogFooter, type AlertDialogFooterProps, AlertDialogTitle, type AlertDialogTitleProps, AlertDialogTrigger };
