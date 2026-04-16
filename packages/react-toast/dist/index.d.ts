import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

declare const ToastProvider: react.FC<ToastPrimitive.ToastProviderProps>;
interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Viewport>>;
}
declare function ToastViewport({ className, ref, ...props }: ToastViewportProps): react_jsx_runtime.JSX.Element;
interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Root>>;
}
declare function Toast({ className, ref, ...props }: ToastProps): react_jsx_runtime.JSX.Element;
interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Title>>;
}
declare function ToastTitle({ className, ref, ...props }: ToastTitleProps): react_jsx_runtime.JSX.Element;
interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Description>>;
}
declare function ToastDescription({ className, ref, ...props }: ToastDescriptionProps): react_jsx_runtime.JSX.Element;
interface ToastActionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Action>>;
}
declare function ToastAction({ className, ref, ...props }: ToastActionProps): react_jsx_runtime.JSX.Element;
interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Close>>;
}
declare function ToastClose({ className, ref, ...props }: ToastCloseProps): react_jsx_runtime.JSX.Element;

export { Toast, ToastAction, type ToastActionProps, ToastClose, type ToastCloseProps, ToastDescription, type ToastDescriptionProps, type ToastProps, ToastProvider, ToastTitle, type ToastTitleProps, ToastViewport, type ToastViewportProps };
