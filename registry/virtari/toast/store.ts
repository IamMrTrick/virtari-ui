import type { ToastData, ToastOptions } from "./types";

type Listener = (snapshot: readonly ToastData[]) => void;

const DEFAULT_DURATION = 4000;

let counter = 0;
let snapshot: readonly ToastData[] = Object.freeze<ToastData[]>([]);
const listeners = new Set<Listener>();

let defaultDuration = DEFAULT_DURATION;
let maxToasts = Infinity;

export function createToastId(): string {
  return `vds-toast-${++counter}-${Date.now().toString(36)}`;
}

function resolveDuration(type: ToastData["type"], requested?: number): number {
  if (requested !== undefined) return Math.max(0, requested);
  if (type === "loading") return 0;
  return defaultDuration;
}

function commit(next: readonly ToastData[]) {
  snapshot = Object.freeze(next);
  for (const l of listeners) l(snapshot);
}

function enforceCap(list: readonly ToastData[]): readonly ToastData[] {
  if (list.length <= maxToasts) return list;
  return list.slice(list.length - maxToasts);
}

export const toastStore = {
  getSnapshot(): readonly ToastData[] {
    return snapshot;
  },

  subscribe(l: Listener): () => void {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },

  setDefaultDuration(ms: number): void {
    defaultDuration = ms;
  },

  setMaxToasts(n: number | undefined): void {
    maxToasts = n ?? Infinity;
    const trimmed = enforceCap(snapshot);
    if (trimmed !== snapshot) commit(trimmed);
  },

  add(opts: ToastOptions): string {
    const id = opts.id ?? createToastId();
    const type = opts.type ?? "default";
    const toast: ToastData = {
      id,
      type,
      title: opts.title,
      description: opts.description,
      action: opts.action,
      actions: opts.actions,
      duration: resolveDuration(type, opts.duration),
      dismissible: opts.dismissible ?? true,
      icon: opts.icon,
      createdAt: Date.now(),
    };

    const existingIdx = snapshot.findIndex((t) => t.id === id);
    const next =
      existingIdx !== -1
        ? [
            ...snapshot.slice(0, existingIdx),
            toast,
            ...snapshot.slice(existingIdx + 1),
          ]
        : [...snapshot, toast];

    commit(enforceCap(next));
    return id;
  },

  update(id: string, patch: Partial<Omit<ToastOptions, "id">>): void {
    const idx = snapshot.findIndex((t) => t.id === id);
    if (idx === -1) return;

    const current = snapshot[idx];
    const nextType = patch.type ?? current.type;
    const typeChanged = patch.type !== undefined && patch.type !== current.type;
    const leavingLoading = current.type === "loading" && typeChanged;

    const duration =
      patch.duration !== undefined
        ? Math.max(0, patch.duration)
        : leavingLoading
        ? defaultDuration
        : current.duration;

    const updated: ToastData = {
      ...current,
      ...patch,
      type: nextType,
      duration,
      dismissible: patch.dismissible ?? current.dismissible,
      createdAt: Date.now(),
    };

    const next = [
      ...snapshot.slice(0, idx),
      updated,
      ...snapshot.slice(idx + 1),
    ];
    commit(next);
  },

  remove(id: string): void {
    const next = snapshot.filter((t) => t.id !== id);
    if (next.length !== snapshot.length) commit(next);
  },

  removeAll(): void {
    if (snapshot.length === 0) return;
    commit([]);
  },
};
