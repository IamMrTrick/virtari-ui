import { memo, type ComponentType } from "react";
import type { ToastType } from "./types";

const SVG_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  "aria-hidden": true as const,
  focusable: false,
};

export const SuccessIcon = memo(function SuccessIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M16.25 5.625 7.5 14.375 3.75 10.625"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const ErrorIcon = memo(function ErrorIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M15 5 5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const WarningIcon = memo(function WarningIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M10 6.25v4.375M10 14.375h.008M18.125 10a8.125 8.125 0 1 1-16.25 0 8.125 8.125 0 0 1 16.25 0Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const InfoIcon = memo(function InfoIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        d="M10 9.375v5M10 6.25h.008M18.125 10a8.125 8.125 0 1 1-16.25 0 8.125 8.125 0 0 1 16.25 0Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const LoadingIcon = memo(function LoadingIcon() {
  return (
    <svg {...SVG_PROPS} className="vds-toast__spinner">
      <path
        d="M10 1.875A8.125 8.125 0 1 1 1.875 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
});

export const CloseIcon = memo(function CloseIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      focusable={false}
    >
      <path
        d="M9 3 3 9M3 3l6 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const TOAST_ICON_MAP: Record<ToastType, ComponentType | null> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoadingIcon,
  default: null,
};
