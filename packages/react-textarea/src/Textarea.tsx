import { forwardRef } from "react";
import { cn, useComposedRefs } from "@virtari-packages/utils";
import { useEffect, useRef } from "react";
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
   * Respects reduced motion and read-only controls. Default: false.
   */
  typingPulse?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

function isPrintable(e: React.KeyboardEvent): boolean {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  size,
  inputSize,
  className,
  typingPulse = false,
  onKeyDown,
  ...props
}, ref) {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const lastPulseAt = useRef(0);

  const mergedRef = useComposedRefs(localRef, ref);

  useEffect(() => {
    if (!typingPulse) return;
    const el = localRef.current;
    if (!el) return;
    const onEnd = () => el.classList.remove("vds-textarea--pulse");
    el.addEventListener("animationend", onEnd);
    return () => {
      el.removeEventListener("animationend", onEnd);
      el.classList.remove("vds-textarea--pulse");
    };
  }, [typingPulse]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.nativeEvent.isComposing || !typingPulse || !isPrintable(e) || e.currentTarget.readOnly || e.currentTarget.disabled) return;
    const el = localRef.current;
    if (!el) return;
    const now = Date.now();
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
});
