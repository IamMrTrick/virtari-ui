import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@virtari/utils";
import { CloseIcon, TOAST_ICON_MAP } from "./icons";
import { toastStore } from "./store";
import type { ToastActionConfig, ToastData } from "./types";

const PROGRESS_RING_CIRCUMFERENCE = 62.83;

interface ToastItemProps {
  toast: ToastData;
  index: number;
  expanded: boolean;
  offset: number;
  reportHeight: (id: string, height: number) => void;
  closeLabel: string;
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
}

function ActionBtn({ action, toastId, dataSlot, defaultVariant }: ActionBtnProps) {
  const variant = action.variant ?? defaultVariant ?? "ghost";
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      action.onClick();
      if (action.closeOnClick !== false) {
        toastStore.remove(toastId);
      }
    },
    [action, toastId],
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
}: ToastItemProps) {
  const rootRef = useRef<HTMLLIElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const progressRef = useRef(100);
  const startRef = useRef(Date.now());
  const pauseAtRef = useRef<number | null>(null);

  const hasActions =
    Boolean(toast.action) ||
    Boolean(toast.actions?.primary) ||
    Boolean(toast.actions?.secondary);

  const Icon = TOAST_ICON_MAP[toast.type];
  const showIcon = toast.icon !== false;
  const customIconProvided = toast.icon !== undefined && toast.icon !== false;

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

  useEffect(() => {
    progressRef.current = 100;
    startRef.current = Date.now();
    pauseAtRef.current = null;
    setProgress(100);
  }, [toast.id, toast.duration, toast.createdAt]);

  useEffect(() => {
    if (toast.duration <= 0) return;
    if (paused) {
      pauseAtRef.current = Date.now();
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
      if (remaining <= 0) return;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [toast.duration, toast.id, toast.createdAt, paused]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) toastStore.remove(toast.id);
    },
    [toast.id],
  );

  const handlePause = useCallback(() => setPaused(true), []);
  const handleResume = useCallback(() => setPaused(false), []);

  const stackStyle = useMemo<CSSProperties>(() => {
    const scale = expanded ? 1 : computeScale(index);
    const opacity = expanded ? 1 : computeOpacity(index);
    const vars: Record<string, string | number> = {
      "--vds-toast-y": `${offset}px`,
      "--vds-toast-scale": scale,
      "--vds-toast-opacity": opacity,
      zIndex: 1000 - index,
    };
    return vars as CSSProperties;
  }, [offset, index, expanded]);

  const showProgressRing =
    toast.duration > 0 &&
    progress > 0 &&
    progress < 100 &&
    toast.dismissible;

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
      duration={toast.duration > 0 ? toast.duration : Number.POSITIVE_INFINITY}
      open
      onOpenChange={handleOpenChange}
      onPause={handlePause}
      onResume={handleResume}
      data-type={toast.type}
      data-index={index}
      data-expanded={expanded || undefined}
      data-has-actions={hasActions || undefined}
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
                />
              )}
              {toast.actions?.primary && (
                <ActionBtn
                  action={toast.actions.primary}
                  toastId={toast.id}
                  dataSlot="primary"
                  defaultVariant="primary"
                />
              )}
              {toast.actions?.secondary && (
                <ActionBtn
                  action={toast.actions.secondary}
                  toastId={toast.id}
                  dataSlot="secondary"
                  defaultVariant="ghost"
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
            >
              <CloseIcon />
            </ToastPrimitive.Close>
          </div>
        )}
      </div>
    </ToastPrimitive.Root>
  );
});
