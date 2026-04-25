import { cn } from "@virtari-packages/utils";
import { useCallback, useState } from "react";
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
  ref?: Ref<HTMLButtonElement>;
}

export function CopyButton({
  text,
  feedbackMs = 2000,
  variant = "ghost",
  copyButtonSize = "sm",
  label,
  copiedLabel = "Copied",
  className,
  ref,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
      /* Clipboard blocked — silently no-op. */
    }
  }, [text, feedbackMs]);

  return (
    <button
      ref={ref}
      type="button"
      className={cn("vds-copy-button", className)}
      data-variant={variant}
      data-size={copyButtonSize}
      data-copied={copied || undefined}
      aria-label={copied ? copiedLabel : (label ?? "Copy to clipboard")}
      onClick={handleCopy}
      {...props}
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
          {copied ? copiedLabel : label}
        </span>
      )}
    </button>
  );
}
