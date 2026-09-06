## packages/utils/src/index.ts

```tsx
export { cn } from "./cn";
export { getKeyboardPlatform, useKeyboardPlatform, formatCombo, ariaKeyShortcuts, shortcutLabel, type KeyboardPlatform } from "./keyboard";
export { useComposedRefs } from "./useComposedRefs";
export { useFormReset } from "./useFormReset";
export { useDirection, type Direction } from "./useDirection";
export {
  useHotkey,
  parseCombo,
  matchesCombo,
  type ParsedCombo,
  type UseHotkeyOptions,
} from "./useHotkey";

```

## packages/utils/src/cn.ts

```tsx
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

```

## packages/utils/src/useComposedRefs.ts

```tsx
import { useCallback, type Ref, type RefCallback } from "react";

/** Compose object/callback refs, including the cleanup contract in React 19. */
export function useComposedRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return useCallback((node: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(node);
      if (ref) (ref as { current: T | null }).current = node;
    });
    if (cleanups.some((cleanup) => typeof cleanup === "function")) {
      return () => {
        cleanups.forEach((cleanup, index) => {
          const ref = refs[index];
          if (typeof cleanup === "function") cleanup();
          else if (typeof ref === "function") ref(null);
          else if (ref) (ref as { current: T | null }).current = null;
        });
      };
    }
  }, refs);
}

```

## packages/utils/src/useFormReset.ts

```tsx
import { useEffect, useRef, type RefObject } from "react";

/** Native reset is cancellable. Run after listeners have had a chance to cancel it. */
export function useFormReset(
  ref: RefObject<HTMLElement | null>,
  onReset: () => void,
  formId?: string,
) {
  const callback = useRef(onReset);
  callback.current = onReset;
  useEffect(() => {
    const node = ref.current;
    const form = formId
      ? node?.ownerDocument.getElementById(formId)
      : node?.closest("form");
    if (!(form instanceof HTMLFormElement)) return;
    let mounted = true;
    const reset = (event: Event) => queueMicrotask(() => {
      if (mounted && !event.defaultPrevented) callback.current();
    });
    form.addEventListener("reset", reset);
    return () => { mounted = false; form.removeEventListener("reset", reset); };
  }, [ref, formId]);
}

```

## packages/utils/src/useDirection.ts

```tsx
import { useEffect, useState, type RefObject } from "react";

export type Direction = "ltr" | "rtl";

function readDirection(el: Element | null): Direction {
  if (typeof document === "undefined") return "ltr";
  /* Closest ancestor with a resolved `dir`. `getComputedStyle().direction`
     reads CSS resolution (covers logical-property cascades and bidi rules),
     whereas the `dir` attribute alone would miss inherited values. */
  const target = el ?? document.documentElement;
  const dir = getComputedStyle(target).direction;
  return dir === "rtl" ? "rtl" : "ltr";
}

/**
 * Read the active text direction from a DOM element (or documentElement if
 * none given) and keep it in sync when ancestor `dir` changes.
 *
 * SSR-safe: returns "ltr" on the first render, then corrects itself in the
 * client-only effect — matching the rendered-on-server HTML.
 */
export function useDirection(ref?: RefObject<Element | null>): Direction {
  const [dir, setDir] = useState<Direction>("ltr");

  useEffect(() => {
    const target = ref?.current ?? document.documentElement;
    setDir(readDirection(target));

    /* Observe `dir` attribute changes on the target and all ancestors, so a
     runtime locale toggle on <html> flips every consuming component. */
    const observers: MutationObserver[] = [];
    let node: Element | null = target;
    while (node) {
      const mo = new MutationObserver(() => {
        setDir(readDirection(ref?.current ?? document.documentElement));
      });
      mo.observe(node, { attributes: true, attributeFilter: ["dir"] });
      observers.push(mo);
      node = node.parentElement;
    }

    return () => {
      for (const mo of observers) mo.disconnect();
    };
  }, [ref]);

  return dir;
}

```

## packages/utils/src/useHotkey.ts

```tsx
import { useEffect, useMemo, useRef } from "react";
import { getKeyboardPlatform, type KeyboardPlatform } from "./keyboardPlatform";

export interface ParsedCombo {
  key: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  alt: boolean;
  /** `mod` = meta on macOS, ctrl elsewhere. Resolved at match time. */
  mod: boolean;
}

/**
 * Parse a combo string like `mod+k`, `ctrl+shift+p`, `alt+/`, `escape`.
 * Keys are normalized to lowercase. `mod` resolves to meta on macOS and ctrl
 * elsewhere at match time (so cached parses stay platform-neutral).
 */
export function parseCombo(combo: string): ParsedCombo {
  const parts = combo
    .toLowerCase()
    .split("+")
    .map((p) => p.trim())
    .filter(Boolean);
  const result: ParsedCombo = {
    key: "",
    ctrl: false,
    meta: false,
    shift: false,
    alt: false,
    mod: false,
  };
  for (const part of parts) {
    switch (part) {
      case "ctrl":
      case "control":
        result.ctrl = true;
        break;
      case "meta":
      case "cmd":
      case "command":
      case "win":
        result.meta = true;
        break;
      case "shift":
        result.shift = true;
        break;
      case "alt":
      case "option":
      case "opt":
        result.alt = true;
        break;
      case "mod":
        result.mod = true;
        break;
      default:
        result.key = part;
    }
  }
  return result;
}

function normalizeEventKey(e: KeyboardEvent): string {
  const k = e.key.toLowerCase();
  /* Map space/esc/etc. to shorthand names users type in combos. */
  if (k === " " || k === "spacebar") return "space";
  if (k === "esc") return "escape";
  if (k === "arrowup") return "up";
  if (k === "arrowdown") return "down";
  if (k === "arrowleft") return "left";
  if (k === "arrowright") return "right";
  return k;
}

export function matchesCombo(e: KeyboardEvent, combo: ParsedCombo, platform: KeyboardPlatform = getKeyboardPlatform()): boolean {
  const mac = platform === "mac";
  const needCtrl = combo.ctrl || (combo.mod && !mac);
  const needMeta = combo.meta || (combo.mod && mac);
  if (needCtrl !== e.ctrlKey) return false;
  if (needMeta !== e.metaKey) return false;
  if (combo.shift !== e.shiftKey) return false;
  if (combo.alt !== e.altKey) return false;
  return normalizeEventKey(e) === combo.key;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}

export interface UseHotkeyOptions {
  enabled?: boolean;
  target?: HTMLElement | Document | null;
  preventDefault?: boolean;
  /** If false (default), hotkey is ignored when focus is in an editable field. */
  allowInInputs?: boolean;
  /** Permit repeated keydown events when a key is held. Defaults to false. */
  allowRepeat?: boolean;
  deps?: unknown[];
}

/**
 * Bind a keyboard shortcut to a handler. Combo grammar: `mod+k`, `ctrl+shift+p`,
 * `alt+/`, `escape`. `mod` = meta on macOS, ctrl elsewhere.
 */
export function useHotkey(
  combo: string | string[],
  handler: (e: KeyboardEvent) => void,
  opts: UseHotkeyOptions = {},
): void {
  const {
    enabled = true,
    target,
    preventDefault = true,
    allowInInputs = false,
    allowRepeat = false,
    deps = [],
  } = opts;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const parsed = useMemo(() => {
    const list = Array.isArray(combo) ? combo : [combo];
    return list.map(parseCombo);
  }, [Array.isArray(combo) ? combo.join("|") : combo]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;
    const node: HTMLElement | Document =
      target ?? (typeof document !== "undefined" ? document : (undefined as never));
    if (!node) return;

    const onKeyDown = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.defaultPrevented || ke.isComposing || ke.keyCode === 229 || (!allowRepeat && ke.repeat)) return;
      if (!allowInInputs && isEditableTarget(ke.target)) return;
      for (const c of parsed) {
        if (matchesCombo(ke, c)) {
          if (preventDefault) ke.preventDefault();
          handlerRef.current(ke);
          return;
        }
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, target, preventDefault, allowInInputs, allowRepeat, parsed, ...deps]);
}

```

## packages/utils/src/keyboard.ts

```tsx
import { parseCombo } from "./useHotkey";
import { getKeyboardPlatform, type KeyboardPlatform } from "./keyboardPlatform";
export { getKeyboardPlatform, useKeyboardPlatform, type KeyboardPlatform } from "./keyboardPlatform";

const macKeys: Record<string, string> = {
  mod: "⌘", meta: "⌘", cmd: "⌘", command: "⌘", win: "⌘",
  shift: "⇧", alt: "⌥", option: "⌥", opt: "⌥", ctrl: "⌃", control: "⌃",
  escape: "⎋", enter: "⏎", space: "␣", backspace: "⌫", delete: "⌦",
  up: "↑", down: "↓", left: "←", right: "→",
};
const otherKeys: Record<string, string> = {
  mod: "Ctrl", meta: "Win", cmd: "Win", command: "Win", win: "Win",
  shift: "Shift", alt: "Alt", option: "Alt", opt: "Alt", ctrl: "Ctrl", control: "Ctrl",
  escape: "Esc", enter: "Enter", space: "Space", backspace: "Backspace", delete: "Del",
  up: "↑", down: "↓", left: "←", right: "→",
};

/** Resolve the same platform-neutral combination used by useHotkey. */
export function formatCombo(combo: string, platform: KeyboardPlatform = getKeyboardPlatform()): string[] {
  const table = platform === "mac" ? macKeys : otherKeys;
  return combo.toLowerCase().split("+").map(part => part.trim()).filter(Boolean).map(part => table[part] ?? part.toUpperCase());
}

/** WAI-ARIA key names for an action that actually binds this shortcut. */
export function ariaKeyShortcuts(combo: string, platform: KeyboardPlatform = getKeyboardPlatform()): string {
  const parsed = parseCombo(combo);
  const modifiers = [
    (parsed.ctrl || (parsed.mod && platform !== "mac")) && "Control",
    (parsed.meta || (parsed.mod && platform === "mac")) && "Meta",
    parsed.alt && "Alt", parsed.shift && "Shift",
  ].filter(Boolean);
  const keys: Record<string, string> = { space: "Space", escape: "Escape", enter: "Enter", tab: "Tab", backspace: "Backspace", delete: "Delete", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" };
  return [...modifiers, keys[parsed.key] ?? parsed.key.toUpperCase()].join("+");
}

/** Spoken names avoid exposing unexplained modifier symbols. */
export function shortcutLabel(combo: string, platform: KeyboardPlatform = getKeyboardPlatform()): string {
  return ariaKeyShortcuts(combo, platform).replace("Meta", platform === "mac" ? "Command" : "Windows").split("+").join(" + ");
}

```

## packages/utils/src/keyboardPlatform.ts

```tsx
import { useSyncExternalStore } from "react";

export type KeyboardPlatform = "mac" | "other";

/** Apple hardware uses Command; other platforms use Control for `mod`. */
export function getKeyboardPlatform(): KeyboardPlatform {
  if (typeof navigator === "undefined") return "other";
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform;
  return /Mac|iPhone|iPad|iPod/i.test(platform) ? "mac" : "other";
}

const subscribe = () => () => {};
const serverPlatform = (): KeyboardPlatform => "other";
/** Keep server markup stable, then resolve the client platform after hydration. */
export function useKeyboardPlatform(): KeyboardPlatform {
  return useSyncExternalStore(subscribe, getKeyboardPlatform, serverPlatform);
}

```