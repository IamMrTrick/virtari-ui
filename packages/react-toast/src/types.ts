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
}
