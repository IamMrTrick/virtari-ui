import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { IconCheck, IconCopy } from "../../icons";

export interface CopyableCellProps {
  children: ReactNode;
  /** Override the text copied to clipboard; defaults to stringifying children. */
  copyText?: string;
  /** Duration of the "Copied" feedback in ms. */
  feedbackMs?: number;
  className?: string;
}

function extractText(node: ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return extractText(props?.children);
  }
  return "";
}

/** Wraps cell content with a hover "copy" affordance. Copies text via
 *  `navigator.clipboard.writeText`. Shows a "Copied" label briefly. */
export function CopyableCell({
  children,
  copyText,
  feedbackMs = 1200,
  className,
}: CopyableCellProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    const text = copyText ?? extractText(children);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
      /* Clipboard blocked — silently no-op. */
    }
  }, [copyText, children, feedbackMs]);

  return (
    <span
      data-copied={copied ? "" : undefined}
      className={cn("vds-data-table-copyable-cell", className)}
    >
      <span className="vds-data-table-copyable-cell-content">{children}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className="vds-data-table-copyable-cell-button"
        tabIndex={-1}
      >
        {copied ? (
          <IconCheck size={12} stroke={2} aria-hidden focusable={false} />
        ) : (
          <IconCopy size={12} stroke={1.75} aria-hidden focusable={false} />
        )}
      </button>
    </span>
  );
}
