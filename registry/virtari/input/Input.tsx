import { forwardRef } from "react";
import { cn, useComposedRefs } from "../../lib/utils";
import { useEffect, useRef } from "react";
import type { Ref } from "react";

export type InputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Control size. Canonical name, shared with every other sized control
   * (Button, Select, Toggle, ...) so a form row can be sized by spreading one
   * prop. Shadows the native `size` attribute, which is inert here because
   * `.vds-input` is always `inline-size: 100%`.
   */
  size?: InputSize;
  /** @deprecated Use `size`. Kept as an alias so existing call sites keep working. */
  inputSize?: InputSize;
  /**
   * Each printable keystroke fires a brief ring-burst animation.
   * Intensity scales with typing speed. Default: false.
   */
  typingPulse?: boolean;
  ref?: Ref<HTMLInputElement>;
}

function isPrintable(e: React.KeyboardEvent): boolean {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  size,
  inputSize,
  className,
  typingPulse = false,
  onKeyDown,
  ...props
}, ref) {
  const localRef = useRef<HTMLInputElement>(null);
  const lastKeyAt = useRef(0);
  const lastPulseAt = useRef(0);

  const mergedRef = useComposedRefs(localRef, ref);

  useEffect(() => {
    if (!typingPulse) return;
    const el = localRef.current;
    if (!el) return;
    const onEnd = () => el.classList.remove("vds-input--pulse");
    el.addEventListener("animationend", onEnd);
    return () => el.removeEventListener("animationend", onEnd);
  }, [typingPulse]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.nativeEvent.isComposing || !typingPulse || !isPrintable(e)) return;
    const el = localRef.current;
    if (!el) return;
    const now = Date.now();
    const gap = now - lastKeyAt.current;
    lastKeyAt.current = now;
    const intensity = Math.max(0.2, Math.min(1, 1 - (gap - 40) / 380));
    el.style.setProperty("--_ti", String(intensity));
    if (now - lastPulseAt.current >= 80) {
      lastPulseAt.current = now;
      el.classList.remove("vds-input--pulse");
      void el.offsetWidth;
      el.classList.add("vds-input--pulse");
    }
  };

  return (
    <input
      ref={mergedRef}
      className={cn("vds-input", className)}
      data-size={size ?? inputSize ?? "md"}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

/* ── InputWrapper ── */

export interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(function InputWrapper({ className, ...props }, ref) {
  return <div ref={ref} className={cn("vds-input-wrapper", className)} {...props} />;
});

/* ── InputIcon ── */

export interface InputIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Logical slot; omitted retains first/last-child placement. */
  side?: "start" | "end";
  ref?: Ref<HTMLSpanElement>;
}

export const InputIcon = forwardRef<HTMLSpanElement, InputIconProps>(function InputIcon({ className, side, ...props }, ref) {
  return (
    <span ref={ref} className={cn("vds-input-icon", className)} data-side={side} aria-hidden="true" {...props} />
  );
});

/* ── InputGroup ── */

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup({ className, ...props }, ref) {
  return <div ref={ref} className={cn("vds-input-group", className)} {...props} />;
});

/* ── InputAddon ── */

export type InputAddonSide = "start" | "end";

export interface InputAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  side?: InputAddonSide;
  ref?: Ref<HTMLSpanElement>;
}

export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(function InputAddon({ side = "start", className, ...props }, ref) {
  return (
    <span ref={ref} className={cn("vds-input-addon", className)} data-side={side} {...props} />
  );
});
