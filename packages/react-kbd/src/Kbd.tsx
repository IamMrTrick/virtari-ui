import { cn, formatCombo, shortcutLabel, useKeyboardPlatform, type KeyboardPlatform } from "@virtari-packages/utils";
import type { Ref } from "react";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export function Kbd({ className, ref, ...props }: KbdProps) {
  return (
    <kbd ref={ref} className={cn("vds-kbd", className)} {...props} />
  );
}

export interface KbdShortcutProps extends Omit<KbdProps, "children"> {
  /** The same combination used by useHotkey, e.g. `mod+k`. Display only. */
  combo: string;
  /** Override only for documentation or a known remote platform. */
  platform?: KeyboardPlatform;
}

/** A compact keycap with platform-aware visual and spoken modifier names. */
export function KbdShortcut({ combo, platform, "aria-label": accessibleLabel, ...props }: KbdShortcutProps) {
  const detectedPlatform = useKeyboardPlatform();
  const resolved = platform ?? detectedPlatform;
  return (
    <Kbd dir="ltr" {...props}>
      <span className="vds-kbd-accessible-label">{accessibleLabel ?? shortcutLabel(combo, resolved)}</span>
      <span aria-hidden="true">{formatCombo(combo, resolved).join(resolved === "mac" ? " " : " + ")}</span>
    </Kbd>
  );
}
