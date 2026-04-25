import { cn } from "@virtari-packages/utils";
import { useCallback, useEffect, useRef } from "react";
import type { Ref } from "react";

export type InputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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

export function Input({
  inputSize = "md",
  className,
  ref,
  typingPulse = false,
  onKeyDown,
  ...props
}: InputProps) {
  const localRef = useRef<HTMLInputElement>(null);
  const lastKeyAt = useRef(0);
  const lastPulseAt = useRef(0);

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      (localRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [ref],
  );

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
      el.classList.remove("vds-input--pulse");
      void el.offsetWidth;
      el.classList.add("vds-input--pulse");
    }
  };

  return (
    <input
      ref={mergedRef}
      className={cn("vds-input", className)}
      data-size={inputSize}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

/* ── InputWrapper ── */

export interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function InputWrapper({ className, ref, ...props }: InputWrapperProps) {
  return <div ref={ref} className={cn("vds-input-wrapper", className)} {...props} />;
}

/* ── InputIcon ── */

export interface InputIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export function InputIcon({ className, ref, ...props }: InputIconProps) {
  return (
    <span ref={ref} className={cn("vds-input-icon", className)} aria-hidden="true" {...props} />
  );
}

/* ── InputGroup ── */

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function InputGroup({ className, ref, ...props }: InputGroupProps) {
  return <div ref={ref} className={cn("vds-input-group", className)} {...props} />;
}

/* ── InputAddon ── */

export type InputAddonSide = "start" | "end";

export interface InputAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  side?: InputAddonSide;
  ref?: Ref<HTMLSpanElement>;
}

export function InputAddon({ side = "start", className, ref, ...props }: InputAddonProps) {
  return (
    <span ref={ref} className={cn("vds-input-addon", className)} data-side={side} {...props} />
  );
}
