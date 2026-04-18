import { useSyncExternalStore } from "react";
import { toastStore } from "./store";
import { toast } from "./toast";
import type { ToastData } from "./types";

const EMPTY: readonly ToastData[] = Object.freeze([]);

function getServerSnapshot(): readonly ToastData[] {
  return EMPTY;
}

export interface UseToastReturn {
  toasts: readonly ToastData[];
  toast: typeof toast;
  dismiss: (id?: string) => void;
  dismissAll: () => void;
}

export function useToast(): UseToastReturn {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot,
  );
  return {
    toasts,
    toast,
    dismiss: (id) => toast.dismiss(id),
    dismissAll: () => toast.dismiss(),
  };
}
