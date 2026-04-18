import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef, Ref, ComponentRef } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

type ToastType = "success" | "error" | "warning" | "info" | "loading" | "default";
type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
type ToastActionVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
interface ToastActionConfig {
    label: ReactNode;
    onClick: () => void;
    variant?: ToastActionVariant;
    closeOnClick?: boolean;
}
interface ToastActions {
    primary?: ToastActionConfig;
    secondary?: ToastActionConfig;
}
interface ToastOptions {
    id?: string;
    type?: ToastType;
    title?: ReactNode;
    description?: ReactNode;
    action?: ToastActionConfig;
    actions?: ToastActions;
    duration?: number;
    dismissible?: boolean;
    icon?: ReactNode | false;
}
interface ToastData {
    id: string;
    type: ToastType;
    title?: ReactNode;
    description?: ReactNode;
    action?: ToastActionConfig;
    actions?: ToastActions;
    duration: number;
    dismissible: boolean;
    icon?: ReactNode | false;
    createdAt: number;
}
interface ToasterProps {
    position?: ToastPosition;
    duration?: number;
    visibleToasts?: number;
    expand?: boolean;
    hotkey?: string[];
    swipeThreshold?: number;
    dir?: "ltr" | "rtl";
    className?: string;
    closeLabel?: string;
    maxToasts?: number;
    label?: string;
}

declare function Toaster({ position, duration, visibleToasts, expand, hotkey, swipeThreshold, dir, className, closeLabel, maxToasts, label, }: ToasterProps): react_jsx_runtime.JSX.Element;

type BaseOpts = Omit<ToastOptions, "type" | "title" | "description">;
interface ToastPromiseMessages<T> {
    loading: ReactNode;
    success: ReactNode | ((data: T) => ReactNode);
    error: ReactNode | ((error: unknown) => ReactNode);
    description?: ReactNode;
    successDescription?: ReactNode | ((data: T) => ReactNode);
    errorDescription?: ReactNode | ((error: unknown) => ReactNode);
}
interface ToastConfirmOptions extends Omit<ToastOptions, "title" | "description" | "actions"> {
    confirmLabel?: ReactNode;
    cancelLabel?: ReactNode;
    confirmVariant?: ToastActionConfig["variant"];
    cancelVariant?: ToastActionConfig["variant"];
}
interface ToastUndoOptions extends Omit<ToastOptions, "title" | "description" | "actions"> {
    undoLabel?: ReactNode;
}
declare const toast: ((opts: ToastOptions) => string) & {
    success(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string;
    error(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string;
    warning(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string;
    info(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string;
    loading(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string;
    message(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string;
    dismiss(id?: string): void;
    promise<T>(promise: Promise<T> | (() => Promise<T>), messages: ToastPromiseMessages<T>, opts?: Omit<ToastOptions, "type" | "title" | "description">): Promise<T>;
    withAction(title: ReactNode, description: ReactNode | undefined, action: ToastActionConfig, opts?: Omit<ToastOptions, "title" | "description" | "action">): string;
    withActions(title: ReactNode, description: ReactNode | undefined, actions: ToastActions, opts?: Omit<ToastOptions, "title" | "description" | "actions">): string;
    undo(title: ReactNode, description: ReactNode, onUndo: () => void, opts?: ToastUndoOptions): string;
    confirm(title: ReactNode, description: ReactNode, onConfirm: () => void, onCancel?: () => void, opts?: ToastConfirmOptions): string;
};

interface UseToastReturn {
    toasts: readonly ToastData[];
    toast: typeof toast;
    dismiss: (id?: string) => void;
    dismissAll: () => void;
}
declare function useToast(): UseToastReturn;

type Listener = (snapshot: readonly ToastData[]) => void;
declare function createToastId(): string;
declare const toastStore: {
    getSnapshot(): readonly ToastData[];
    subscribe(l: Listener): () => void;
    setDefaultDuration(ms: number): void;
    setMaxToasts(n: number | undefined): void;
    add(opts: ToastOptions): string;
    update(id: string, patch: Partial<Omit<ToastOptions, "id">>): void;
    remove(id: string): void;
    removeAll(): void;
};

declare const ToastProvider: react.FC<ToastPrimitive.ToastProviderProps>;
interface ToastViewportProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Viewport>>;
}
declare function ToastViewport({ className, ref, ...props }: ToastViewportProps): react_jsx_runtime.JSX.Element;
interface ToastRootProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Root>>;
}
declare function ToastRoot({ className, ref, ...props }: ToastRootProps): react_jsx_runtime.JSX.Element;
interface ToastTitleProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Title>>;
}
declare function ToastTitle({ className, ref, ...props }: ToastTitleProps): react_jsx_runtime.JSX.Element;
interface ToastDescriptionProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Description>>;
}
declare function ToastDescription({ className, ref, ...props }: ToastDescriptionProps): react_jsx_runtime.JSX.Element;
interface ToastActionProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Action>>;
}
declare function ToastAction({ className, ref, ...props }: ToastActionProps): react_jsx_runtime.JSX.Element;
interface ToastCloseProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
    ref?: Ref<ComponentRef<typeof ToastPrimitive.Close>>;
}
declare function ToastClose({ className, ref, ...props }: ToastCloseProps): react_jsx_runtime.JSX.Element;

export { ToastAction, type ToastActionConfig, type ToastActionProps, type ToastActionVariant, type ToastActions, ToastClose, type ToastCloseProps, type ToastConfirmOptions, type ToastData, ToastDescription, type ToastDescriptionProps, type ToastOptions, type ToastPosition, type ToastPromiseMessages, ToastProvider, ToastRoot, type ToastRootProps, ToastTitle, type ToastTitleProps, type ToastType, type ToastUndoOptions, ToastViewport, type ToastViewportProps, Toaster, type ToasterProps, type UseToastReturn, createToastId, toast, toastStore, useToast };
