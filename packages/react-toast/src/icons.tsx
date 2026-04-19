import { memo, type ComponentType } from "react";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
  IconLoader2,
  IconX,
} from "@virtari-packages/react-icons";
import type { ToastType } from "./types";

const ICON_PROPS = {
  size: 20,
  stroke: 1.75,
  "aria-hidden": true as const,
  focusable: false as const,
};

export const SuccessIcon = memo(function SuccessIcon() {
  return <IconCircleCheck {...ICON_PROPS} />;
});

export const ErrorIcon = memo(function ErrorIcon() {
  return <IconCircleX {...ICON_PROPS} />;
});

export const WarningIcon = memo(function WarningIcon() {
  return <IconAlertTriangle {...ICON_PROPS} />;
});

export const InfoIcon = memo(function InfoIcon() {
  return <IconInfoCircle {...ICON_PROPS} />;
});

export const LoadingIcon = memo(function LoadingIcon() {
  return <IconLoader2 {...ICON_PROPS} className="vds-toast__spinner" />;
});

export const CloseIcon = memo(function CloseIcon() {
  return (
    <IconX
      size={12}
      stroke={1.75}
      aria-hidden
      focusable={false}
    />
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
