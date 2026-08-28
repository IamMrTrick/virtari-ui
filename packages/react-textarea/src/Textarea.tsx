import { cn } from "@virtari-packages/utils";
import { useCallback, useEffect, useRef } from "react";
import type { Ref } from "react";

export type TextareaSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Control size. Canonical name, shared with every other sized control. */
  size?: TextareaSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: TextareaSize;
  /**
   * Each printable keystroke fires a brief ring-burst animation.
   * Intensity scales with typing speed. Default: false.
   */
  typingPulse?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

function isPrintable(e: React.KeyboardEvent): boolean {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}

export function Textarea({
  size,
  inputSize,
  className,
  ref,
  typingPulse = false,
  onKeyDown,
  ...props
}: TextareaProps) {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const lastKeyAt = useRef(0);
  const lastPulseAt = useRef(0);

  const mergedRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      (localRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    },
    [ref],
  );

  useEffect(() => {
    if (!typingPulse) return;
    const el = localRef.current;
    if (!el) return;
    const onEnd = () => el.classList.remove("vds-textarea--pulse");
    el.addEventListener("animationend", onEnd);
    return () => el.removeEventListener("animationend", onEnd);
  }, [typingPulse]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    onKeyDown?.(e);
    if (!typingPulse || !isPrintable(e)) return;
    const el = localRef.current;
    if (!el) return;
    const now = Date.now();
    const gap = now - lastKeyAt.current;
    lastKeyAt.current = now;
    const intensity = Math.max(0.2, Math.min(1, 1 - (gap - 40) / 380));
    el.style.setProperty("--_ti", String(intensity));
    if (now - lastPulseAt.current >= 80) {
      lastPulseAt.current = now;
      el.classList.remove("vds-textarea--pulse");
      void el.offsetWidth;
      el.classList.add("vds-textarea--pulse");
    }
  };

  return (
    <textarea
      ref={mergedRef}
      className={cn("vds-textarea", className)}
      data-size={size ?? inputSize ?? "md"}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}
