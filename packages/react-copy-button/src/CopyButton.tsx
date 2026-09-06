import { cn } from "@virtari-packages/utils";
import { forwardRef, useEffect, useRef, useState } from "react";
import type { Ref } from "react";
import { IconCheck, IconCopy } from "@virtari-packages/react-icons";

export type CopyButtonVariant = "ghost" | "outline" | "soft";
export type CopyButtonSize = "2xs" | "xs" | "sm" | "md" | "lg";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Text to copy to the clipboard. */
  text: string;
  /** How long the "copied" state lasts in ms. */
  feedbackMs?: number;
  variant?: CopyButtonVariant;
  copyButtonSize?: CopyButtonSize;
  /** Optional visible label next to the icon. */
  label?: string;
  /** Label shown while in the "copied" state. */
  copiedLabel?: string;
  /** Accessible idle label when no visible label is supplied. */
  copyLabel?: string;
  /** Visible/announced feedback when clipboard access fails. */
  errorLabel?: string;
  onCopied?: () => void;
  onCopyError?: (error: unknown) => void;
  ref?: Ref<HTMLButtonElement>;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton({
  text,
  feedbackMs = 2000,
  variant = "ghost",
  copyButtonSize = "sm",
  label,
  copiedLabel = "Copied",
  copyLabel = "Copy to clipboard",
  errorLabel = "Copy failed; select and copy the text manually",
  onCopied,
  onCopyError,
  onClick,
  disabled,
  className,
  ref: suppliedRef,
  ...props
}: CopyButtonProps, forwardedRef) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const request = useRef(0);
  useEffect(() => {
    setStatus("idle");
    return () => { request.current++; clearTimeout(timer.current); };
  }, [text]);
  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    clearTimeout(timer.current);
    const currentRequest = ++request.current;
    let error: unknown;
    let failed = false;
    try {
      await navigator.clipboard.writeText(text);
    } catch (failure) {
      failed = true;
      error = failure;
    }
    if (currentRequest !== request.current) return;
    setStatus(failed ? "error" : "copied");
    timer.current = setTimeout(() => setStatus("idle"), Math.max(0, feedbackMs));
    if (failed) onCopyError?.(error); else onCopied?.();
  };
  const copied = status === "copied";
  const feedback = copied ? copiedLabel : status === "error" ? errorLabel : "";

  return (
    <button
      {...props}
      ref={forwardedRef ?? suppliedRef}
      type={props.type ?? "button"}
      className={cn("vds-copy-button", className)}
      data-variant={variant}
      data-size={copyButtonSize}
      data-copied={copied || undefined}
      data-error={status === "error" || undefined}
      disabled={disabled}
      aria-label={feedback || props["aria-label"] || label || copyLabel}
      title={status === "error" ? errorLabel : props.title}
      onClick={handleCopy}
    >
      <span className="vds-copy-button__icon" aria-hidden="true">
        {copied ? (
          <IconCheck aria-hidden focusable={false} />
        ) : (
          <IconCopy aria-hidden focusable={false} />
        )}
      </span>
      {label && (
        <span className="vds-copy-button__label">
          {feedback || label}
        </span>
      )}
      <span className="vds-copy-button__status" role="status" aria-live="polite">{feedback}</span>
    </button>
  );
});
