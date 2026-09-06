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
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const parsed = useMemo(() => {
    const list = Array.isArray(combo) ? combo : [combo];
    return list.map(parseCombo);
  }, [combo]);

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
