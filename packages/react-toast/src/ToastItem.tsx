import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnimationEvent as ReactAnimationEvent,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@virtari/utils";
import { CloseIcon, TOAST_ICON_MAP } from "./icons";
import { toastStore } from "./store";
import type {
  ToastActionConfig,
  ToastData,
  ToastPauseMode,
  ToastTimerMode,
} from "./types";

const PROGRESS_RING_CIRCUMFERENCE = 62.83;

/* Drag tuning */
const DRAG_AXIS_LOCK_THRESHOLD = 6; // px before deciding horizontal vs vertical
const DRAG_DISMISS_DISTANCE = 96; // px
const DRAG_DISMISS_VELOCITY = 0.5; // px/ms (quick flick)
const DRAG_VELOCITY_MIN_DISTANCE = 36; // px

const EXIT_ANIMATION_NAMES = new Set([
  "vds-toast-exit-up",
  "vds-toast-exit-down",
  "vds-toast-swipe-out-left",
  "vds-toast-swipe-out-right",
]);

type SwipeExit = "left" | "right" | null;

interface ToastItemProps {
  toast: ToastData;
  index: number;
  expanded: boolean;
  offset: number;
  reportHeight: (id: string, height: number) => void;
  closeLabel: string;
  swipeThreshold?: number;
  timerMode: ToastTimerMode;
  pauseMode: ToastPauseMode;
}

function computeScale(index: number): number {
  if (index <= 0) return 1;
  if (index === 1) return 0.96;
  if (index === 2) return 0.92;
  return Math.max(0.88, 1 - index * 0.04);
}

function computeOpacity(index: number): number {
  if (index <= 0) return 1;
  if (index === 1) return 0.85;
  if (index === 2) return 0.7;
  return Math.max(0.55, 1 - index * 0.15);
}

interface ActionBtnProps {
  action: ToastActionConfig;
  toastId: string;
  dataSlot: "primary" | "secondary" | "single";
  defaultVariant: ToastActionConfig["variant"];
  onCloseSoft: () => void;
}

function ActionBtn({
  action,
  toastId: _toastId,
  dataSlot,
  defaultVariant,
  onCloseSoft,
}: ActionBtnProps) {
  const variant = action.variant ?? defaultVariant ?? "ghost";
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      action.onClick();
      if (action.closeOnClick !== false) {
        onCloseSoft();
      }
    },
    [action, onCloseSoft],
  );
  const stopPointer = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    },
    [],
  );
  return (
    <button
      type="button"
      className={cn(
        "vds-toast-action",
        `vds-toast-action--${variant}`,
        `vds-toast-action--slot-${dataSlot}`,
      )}
      data-variant={variant}
      data-slot={dataSlot}
      onClick={handleClick}
      onPointerDown={stopPointer}
    >
      {action.label}
    </button>
  );
}

export const ToastItem = memo(function ToastItem({
  toast,
  index,
  expanded,
  offset,
  reportHeight,
  closeLabel,
  swipeThreshold = DRAG_DISMISS_DISTANCE,
  timerMode,
  pauseMode,
}: ToastItemProps) {
  const rootRef = useRef<HTMLLIElement>(null);

  /* Open state is local so the primitive can play the exit animation before
     the item is removed from the store (via onAnimationEnd). */
  const [open, setOpen] = useState(true);

  /* Progress ring timer */
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const progressRef = useRef(100);
  const startRef = useRef(Date.now());
  const pauseAtRef = useRef<number | null>(null);

  /* Custom horizontal drag */
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeExit, setSwipeExit] = useState<SwipeExit>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const dragAxisRef = useRef<"horizontal" | "vertical" | null>(null);

  const hasActions =
    Boolean(toast.action) ||
    Boolean(toast.actions?.primary) ||
    Boolean(toast.actions?.secondary);

  const Icon = TOAST_ICON_MAP[toast.type];
  const showIcon = toast.icon !== false;
  const customIconProvided = toast.icon !== undefined && toast.icon !== false;

  /* ── Height reporting ── */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") {
      reportHeight(toast.id, el.getBoundingClientRect().height);
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) reportHeight(toast.id, entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [toast.id, reportHeight]);

  /* ── Reset progress timer on duration/id change ── */
  useEffect(() => {
    progressRef.current = 100;
    startRef.current = Date.now();
    pauseAtRef.current = null;
    setProgress(100);
  }, [toast.id, toast.duration, toast.createdAt]);

  /* ── Sequential mode: reset countdown when a stacked toast becomes the
        newest (index transitions > 0 → 0). Parallel mode ignores this. ── */
  const prevIndexRef = useRef(index);
  useEffect(() => {
    if (
      timerMode === "sequential" &&
      prevIndexRef.current > 0 &&
      index === 0 &&
      toast.duration > 0
    ) {
      progressRef.current = 100;
      startRef.current = Date.now();
      pauseAtRef.current = null;
      setProgress(100);
    }
    prevIndexRef.current = index;
  }, [index, timerMode, toast.duration]);

  /* Stable ref to the soft-close callback so the RAF effect can trigger
     dismiss without needing softClose in its deps (which would reset the
     RAF on every render). softClose itself is declared below. */
  const softCloseRef = useRef<((exit: SwipeExit) => void) | null>(null);

  /* ── Animate progress ring + own the auto-dismiss ── */
  useEffect(() => {
    if (!open) return;
    if (toast.duration <= 0) return;
    // Sequential mode: stacked toasts wait — no countdown, no dismiss.
    if (timerMode === "sequential" && index > 0) return;
    if (paused || isDragging) {
      if (pauseAtRef.current === null) pauseAtRef.current = Date.now();
      return;
    }
    if (pauseAtRef.current !== null) {
      const pausedFor = Date.now() - pauseAtRef.current;
      startRef.current += pausedFor;
      pauseAtRef.current = null;
    }

    let active = true;
    let raf = 0;
    const tick = () => {
      if (!active) return;
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, toast.duration - elapsed);
      const next = (remaining / toast.duration) * 100;
      if (Math.abs(next - progressRef.current) > 0.5 || remaining <= 0) {
        progressRef.current = next;
        setProgress(next);
      }
      if (remaining <= 0) {
        softCloseRef.current?.(null);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [
    toast.duration,
    toast.id,
    toast.createdAt,
    paused,
    isDragging,
    open,
    timerMode,
    index,
  ]);

  /* ── Soft close (triggers exit animation; removal happens onAnimationEnd) ── */
  const softClose = useCallback((exit: SwipeExit = null) => {
    setSwipeExit(exit);
    setOpen(false);
  }, []);

  useEffect(() => {
    softCloseRef.current = softClose;
  }, [softClose]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) return;
      // Internal close (duration expiry, ESC, Close button)
      softClose(null);
    },
    [softClose],
  );

  const handleAnimationEnd = useCallback(
    (event: ReactAnimationEvent<HTMLLIElement>) => {
      if (event.target !== rootRef.current) return;
      if (!EXIT_ANIMATION_NAMES.has(event.animationName)) return;
      toastStore.remove(toast.id);
    },
    [toast.id],
  );

  /* Only react to the primitive's hover/focus pause when pauseMode === "hover".
     In press mode, the primitive still fires these (we can't disable
     viewport-level pause) but we deliberately ignore them — the RAF only
     pauses on actual pointer-down (isDragging). */
  const handlePause = useCallback(() => {
    if (pauseMode === "hover") setPaused(true);
  }, [pauseMode]);
  const handleResume = useCallback(() => {
    if (pauseMode === "hover") setPaused(false);
  }, [pauseMode]);

  /* If the user switches pauseMode out of "hover" while currently paused, the
     stale paused state would freeze the timer forever. Clear it on change. */
  useEffect(() => {
    if (pauseMode !== "hover") setPaused(false);
  }, [pauseMode]);

  /* ── Custom horizontal drag handlers ── */
  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLLIElement>) => {
      if (!toast.dismissible || !open) return;
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const target = event.target as HTMLElement;
      if (target.closest("button, a, [role='button'], input, textarea, select")) {
        return;
      }
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
      setIsDragging(true);
      dragStartXRef.current = event.clientX;
      dragStartYRef.current = event.clientY;
      dragStartTimeRef.current = Date.now();
      dragAxisRef.current = null;
    },
    [toast.dismissible, open],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLLIElement>) => {
      if (!isDragging) return;
      const dx = event.clientX - dragStartXRef.current;
      const dy = event.clientY - dragStartYRef.current;

      if (dragAxisRef.current === null) {
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (absX < DRAG_AXIS_LOCK_THRESHOLD && absY < DRAG_AXIS_LOCK_THRESHOLD) {
          return;
        }
        dragAxisRef.current = absX > absY ? "horizontal" : "vertical";
        if (dragAxisRef.current === "vertical") {
          try {
            event.currentTarget.releasePointerCapture(event.pointerId);
          } catch {
            /* ignore */
          }
          setIsDragging(false);
          setDragX(0);
          return;
        }
      }

      if (dragAxisRef.current === "horizontal") {
        setDragX(dx);
      }
    },
    [isDragging],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLLIElement>, commit: boolean) => {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
      const delta = dragX;
      const elapsed = Math.max(Date.now() - dragStartTimeRef.current, 1);
      const velocity = Math.abs(delta) / elapsed;
      const absDelta = Math.abs(delta);
      const shouldDismiss =
        commit &&
        (absDelta > swipeThreshold ||
          (absDelta > DRAG_VELOCITY_MIN_DISTANCE && velocity > DRAG_DISMISS_VELOCITY));

      setIsDragging(false);
      dragAxisRef.current = null;

      if (shouldDismiss) {
        const dir: SwipeExit = delta > 0 ? "right" : "left";
        softClose(dir);
      } else {
        setDragX(0);
      }
    },
    [dragX, softClose, swipeThreshold],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLLIElement>) => {
      if (!isDragging) return;
      endDrag(event, true);
    },
    [isDragging, endDrag],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLLIElement>) => {
      if (!isDragging) return;
      endDrag(event, false);
    },
    [isDragging, endDrag],
  );

  const stackStyle = useMemo<CSSProperties>(() => {
    const scale = expanded ? 1 : computeScale(index);
    const opacity = expanded ? 1 : computeOpacity(index);
    const vars: Record<string, string | number> = {
      "--vds-toast-y": `${offset}px`,
      "--vds-toast-scale": scale,
      "--vds-toast-opacity": opacity,
      "--vds-toast-drag-x": `${dragX}px`,
      zIndex: 1000 - index,
    };
    return vars as CSSProperties;
  }, [offset, index, expanded, dragX]);

  const showProgressRing =
    open &&
    toast.duration > 0 &&
    progress > 0 &&
    progress < 100 &&
    toast.dismissible &&
    !isDragging;

  const rootClassName = cn(
    "vds-toast",
    `vds-toast--${toast.type}`,
    index > 0 && "vds-toast--stacked",
    hasActions && "vds-toast--has-actions",
  );

  return (
    <ToastPrimitive.Root
      ref={rootRef}
      className={rootClassName}
      style={stackStyle}
      /* Always Infinity — our RAF owns the countdown and dismiss. Leaving
         the primitive to also run a timer would double-fire close and desync
         with the progress ring under press/hover pause modes. */
      duration={Number.POSITIVE_INFINITY}
      open={open}
      onOpenChange={handleOpenChange}
      onPause={handlePause}
      onResume={handleResume}
      onSwipeStart={(e) => e.preventDefault()}
      onSwipeMove={(e) => e.preventDefault()}
      onSwipeCancel={(e) => e.preventDefault()}
      onSwipeEnd={(e) => e.preventDefault()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onAnimationEnd={handleAnimationEnd}
      data-type={toast.type}
      data-index={index}
      data-expanded={expanded || undefined}
      data-has-actions={hasActions || undefined}
      data-dragging={isDragging || undefined}
      data-swipe-exit={swipeExit ?? undefined}
    >
      <div className="vds-toast__content">
        {showIcon && (customIconProvided || Icon) && (
          <div className="vds-toast__icon">
            {customIconProvided ? toast.icon : Icon ? <Icon /> : null}
          </div>
        )}

        <div className="vds-toast__text">
          {toast.title !== undefined && toast.title !== null && (
            <ToastPrimitive.Title className="vds-toast__title">
              {toast.title}
            </ToastPrimitive.Title>
          )}
          {toast.description !== undefined && toast.description !== null && (
            <ToastPrimitive.Description className="vds-toast__description">
              {toast.description}
            </ToastPrimitive.Description>
          )}
          {hasActions && (
            <div className="vds-toast__actions">
              {toast.action && (
                <ActionBtn
                  action={toast.action}
                  toastId={toast.id}
                  dataSlot="single"
                  defaultVariant="ghost"
                  onCloseSoft={() => softClose(null)}
                />
              )}
              {toast.actions?.primary && (
                <ActionBtn
                  action={toast.actions.primary}
                  toastId={toast.id}
                  dataSlot="primary"
                  defaultVariant="primary"
                  onCloseSoft={() => softClose(null)}
                />
              )}
              {toast.actions?.secondary && (
                <ActionBtn
                  action={toast.actions.secondary}
                  toastId={toast.id}
                  dataSlot="secondary"
                  defaultVariant="ghost"
                  onCloseSoft={() => softClose(null)}
                />
              )}
            </div>
          )}
        </div>

        {toast.dismissible && (
          <div className="vds-toast__close-container">
            {showProgressRing && (
              <svg
                className="vds-toast__progress-ring"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                aria-hidden
                focusable={false}
              >
                <circle
                  className="vds-toast__progress-ring-bg"
                  cx={12}
                  cy={12}
                  r={10}
                  fill="none"
                  strokeWidth={2}
                />
                <circle
                  className="vds-toast__progress-ring-progress"
                  cx={12}
                  cy={12}
                  r={10}
                  fill="none"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray={PROGRESS_RING_CIRCUMFERENCE}
                  strokeDashoffset={
                    (PROGRESS_RING_CIRCUMFERENCE * (100 - progress)) / 100
                  }
                  transform="rotate(-90 12 12)"
                />
              </svg>
            )}
            <ToastPrimitive.Close
              className="vds-toast__close"
              aria-label={closeLabel}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <CloseIcon />
            </ToastPrimitive.Close>
          </div>
        )}
      </div>
    </ToastPrimitive.Root>
  );
});
