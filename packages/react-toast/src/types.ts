import type { ReactNode } from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastActionVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success";

/**
 * Controls when auto-dismiss timers start for stacked toasts.
 *  - "parallel"   — each toast counts down from its own createdAt, independent
 *                   of stack position (default).
 *  - "sequential" — only the newest (top) toast counts down. Older stacked
 *                   toasts wait with their timer paused; each resets and
 *                   starts when it becomes the new top.
 */
export type ToastTimerMode = "parallel" | "sequential";

/**
 * Controls what interaction pauses the auto-dismiss timer.
 *  - "hover" — timer pauses while the viewport is hovered or any toast is
 *              focused (default; matches Radix built-in pause behavior).
 *  - "press" — timer only pauses while the user is actively pressing
 *              (pointer down) on the toast body. Hover is ignored.
 */
export type ToastPauseMode = "hover" | "press";

export interface ToastActionConfig {
  label: ReactNode;
  onClick: () => void;
  variant?: ToastActionVariant;
  closeOnClick?: boolean;
}

export interface ToastActions {
  primary?: ToastActionConfig;
  secondary?: ToastActionConfig;
}

export interface ToastOptions {
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

export interface ToastData {
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

export interface ToasterProps {
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
  timerMode?: ToastTimerMode;
  pauseMode?: ToastPauseMode;
}
