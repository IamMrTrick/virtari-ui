import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as ToastPrimitive from "@virtari-packages/primitives/toast";
import { cn } from "@virtari-packages/utils";
import { toastStore } from "./store";
import { ToastItem } from "./ToastItem";
import type { ToastData, ToasterProps, ToastPosition } from "./types";

const SWIPE_DIRECTION_MAP: Record<
  ToastPosition,
  "right" | "left" | "up" | "down"
> = {
  "top-left": "left",
  "top-center": "up",
  "top-right": "right",
  "bottom-left": "left",
  "bottom-center": "down",
  "bottom-right": "right",
};

const EMPTY: readonly ToastData[] = Object.freeze([]);

function getServerSnapshot(): readonly ToastData[] {
  return EMPTY;
}

const DEFAULT_HOTKEY = Object.freeze(["F8"]);

export function Toaster({
  position = "top-right",
  duration = 4000,
  visibleToasts = 3,
  expand = false,
  hotkey,
  swipeThreshold = 50,
  dir,
  className,
  closeLabel = "Close notification",
  maxToasts,
  label = "Notifications",
  timerMode = "parallel",
  pauseMode = "hover",
}: ToasterProps) {
  useEffect(() => {
    toastStore.setDefaultDuration(duration);
  }, [duration]);

  useEffect(() => {
    toastStore.setMaxToasts(maxToasts);
  }, [maxToasts]);

  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot,
  );

  const [heights, setHeights] = useState<Map<string, number>>(() => new Map());
  const [isExpanded, setIsExpanded] = useState(expand);
  const hoverTimeout = useRef<number | null>(null);

  const reportHeight = useCallback((id: string, height: number) => {
    setHeights((prev) => {
      if (prev.get(id) === height) return prev;
      const next = new Map(prev);
      next.set(id, height);
      return next;
    });
  }, []);

  useEffect(() => {
    setHeights((prev) => {
      if (prev.size === 0) return prev;
      const ids = new Set(toasts.map((t) => t.id));
      let changed = false;
      const next = new Map(prev);
      for (const key of Array.from(next.keys())) {
        if (!ids.has(key)) {
          next.delete(key);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [toasts]);

  const visibleList = useMemo(() => {
    if (toasts.length === 0) return EMPTY;
    return toasts.slice(-visibleToasts).reverse();
  }, [toasts, visibleToasts]);

  const isBottom = position.startsWith("bottom");

  const toastsWithOffsets = useMemo(() => {
    const out: Array<{ toast: ToastData; offset: number; index: number }> = [];
    let cumulative = 0;
    for (let i = 0; i < visibleList.length; i++) {
      const t = visibleList[i];
      const offsetMagnitude = i === 0 ? 0 : cumulative;
      out.push({
        toast: t,
        index: i,
        offset: isBottom ? -offsetMagnitude : offsetMagnitude,
      });
      const h = heights.get(t.id) ?? 64;
      cumulative += isExpanded ? h + 16 : Math.max(20, h * 0.3);
    }
    return out;
  }, [visibleList, heights, isExpanded, isBottom]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const list = toastStore.getSnapshot();
      if (list.length === 0) return;
      const top = list[list.length - 1];
      if (top.dismissible) toastStore.remove(top.id);
    };
    document.addEventListener("keydown", onKey, { passive: true });
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const canHover = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (!canHover()) return;
    hoverTimeout.current = window.setTimeout(() => setIsExpanded(true), 50);
  }, [canHover]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (!canHover()) return;
    hoverTimeout.current = window.setTimeout(
      () => setIsExpanded(expand),
      50,
    );
  }, [canHover, expand]);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current !== null) {
        window.clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  const swipeDirection = SWIPE_DIRECTION_MAP[position];
  const effectiveHotkey = hotkey ?? DEFAULT_HOTKEY;

  return (
    <ToastPrimitive.Provider
      duration={duration}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
      label={label}
    >
      <ToastPrimitive.Viewport
        className={cn("vds-toaster", `vds-toaster--${position}`, className)}
        data-position={position}
        data-expanded={isExpanded || undefined}
        dir={dir}
        hotkey={effectiveHotkey as unknown as string[]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {toastsWithOffsets.map(({ toast, index, offset }) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={index}
            expanded={isExpanded}
            offset={offset}
            reportHeight={reportHeight}
            closeLabel={closeLabel}
            timerMode={timerMode}
            pauseMode={pauseMode}
          />
        ))}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Provider>
  );
}
