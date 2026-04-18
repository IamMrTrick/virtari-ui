import type { ReactNode } from "react";
import { createToastId, toastStore } from "./store";
import type {
  ToastActionConfig,
  ToastActions,
  ToastOptions,
} from "./types";

type BaseOpts = Omit<ToastOptions, "type" | "title" | "description">;

function emit(opts: ToastOptions): string {
  return toastStore.add(opts);
}

export interface ToastPromiseMessages<T> {
  loading: ReactNode;
  success: ReactNode | ((data: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
  description?: ReactNode;
  successDescription?: ReactNode | ((data: T) => ReactNode);
  errorDescription?: ReactNode | ((error: unknown) => ReactNode);
}

export interface ToastConfirmOptions
  extends Omit<ToastOptions, "title" | "description" | "actions"> {
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  confirmVariant?: ToastActionConfig["variant"];
  cancelVariant?: ToastActionConfig["variant"];
}

export interface ToastUndoOptions
  extends Omit<ToastOptions, "title" | "description" | "actions"> {
  undoLabel?: ReactNode;
}

function resolveMessage<T>(
  value: ReactNode | ((data: T) => ReactNode),
  data: T,
): ReactNode {
  return typeof value === "function"
    ? (value as (d: T) => ReactNode)(data)
    : value;
}

export const toast = Object.assign(
  (opts: ToastOptions) => emit(opts),
  {
    success(
      title: ReactNode,
      description?: ReactNode,
      opts?: BaseOpts,
    ): string {
      return emit({ ...opts, type: "success", title, description });
    },

    error(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string {
      return emit({ ...opts, type: "error", title, description });
    },

    warning(
      title: ReactNode,
      description?: ReactNode,
      opts?: BaseOpts,
    ): string {
      return emit({ ...opts, type: "warning", title, description });
    },

    info(title: ReactNode, description?: ReactNode, opts?: BaseOpts): string {
      return emit({ ...opts, type: "info", title, description });
    },

    loading(
      title: ReactNode,
      description?: ReactNode,
      opts?: BaseOpts,
    ): string {
      return emit({
        ...opts,
        type: "loading",
        title,
        description,
        duration: opts?.duration ?? 0,
      });
    },

    message(
      title: ReactNode,
      description?: ReactNode,
      opts?: BaseOpts,
    ): string {
      return emit({ ...opts, type: "default", title, description });
    },

    dismiss(id?: string): void {
      if (id) toastStore.remove(id);
      else toastStore.removeAll();
    },

    promise<T>(
      promise: Promise<T> | (() => Promise<T>),
      messages: ToastPromiseMessages<T>,
      opts?: Omit<ToastOptions, "type" | "title" | "description">,
    ): Promise<T> {
      const id = emit({
        ...opts,
        type: "loading",
        title: messages.loading,
        description: messages.description,
        duration: 0,
      });
      const p = typeof promise === "function" ? promise() : promise;
      return p.then(
        (data) => {
          toastStore.update(id, {
            type: "success",
            title: resolveMessage(messages.success, data),
            description:
              messages.successDescription !== undefined
                ? resolveMessage(messages.successDescription, data)
                : undefined,
          });
          return data;
        },
        (err) => {
          toastStore.update(id, {
            type: "error",
            title: resolveMessage(messages.error, err),
            description:
              messages.errorDescription !== undefined
                ? resolveMessage(messages.errorDescription, err)
                : undefined,
          });
          throw err;
        },
      );
    },

    withAction(
      title: ReactNode,
      description: ReactNode | undefined,
      action: ToastActionConfig,
      opts?: Omit<ToastOptions, "title" | "description" | "action">,
    ): string {
      return emit({ ...opts, title, description, action });
    },

    withActions(
      title: ReactNode,
      description: ReactNode | undefined,
      actions: ToastActions,
      opts?: Omit<ToastOptions, "title" | "description" | "actions">,
    ): string {
      return emit({ ...opts, title, description, actions });
    },

    undo(
      title: ReactNode,
      description: ReactNode,
      onUndo: () => void,
      opts?: ToastUndoOptions,
    ): string {
      const id = createToastId();
      const undoLabel = opts?.undoLabel ?? "Undo";
      emit({
        type: "success",
        duration: 5000,
        ...opts,
        id,
        title,
        description,
        actions: {
          primary: {
            label: undoLabel,
            variant: "ghost",
            onClick: () => {
              onUndo();
              toastStore.remove(id);
            },
          },
        },
      });
      return id;
    },

    confirm(
      title: ReactNode,
      description: ReactNode,
      onConfirm: () => void,
      onCancel?: () => void,
      opts?: ToastConfirmOptions,
    ): string {
      const id = createToastId();
      const confirmLabel = opts?.confirmLabel ?? "Confirm";
      const cancelLabel = opts?.cancelLabel ?? "Cancel";
      emit({
        type: "warning",
        ...opts,
        id,
        title,
        description,
        duration: 0,
        actions: {
          primary: {
            label: confirmLabel,
            variant: opts?.confirmVariant ?? "primary",
            onClick: () => {
              onConfirm();
              toastStore.remove(id);
            },
          },
          secondary: {
            label: cancelLabel,
            variant: opts?.cancelVariant ?? "ghost",
            onClick: () => {
              onCancel?.();
              toastStore.remove(id);
            },
          },
        },
      });
      return id;
    },
  },
);
