import { parseCombo } from "@virtari-packages/utils";
import type { ParsedCombo } from "@virtari-packages/utils";

const MAC_PLATFORMS = /Mac|iPhone|iPad|iPod/;
function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return MAC_PLATFORMS.test(navigator.platform);
}

const KEY_SYMBOLS_MAC: Record<string, string> = {
  mod: "⌘",
  meta: "⌘",
  cmd: "⌘",
  command: "⌘",
  shift: "⇧",
  alt: "⌥",
  option: "⌥",
  ctrl: "⌃",
  control: "⌃",
  escape: "⎋",
  enter: "⏎",
  space: "␣",
  backspace: "⌫",
  delete: "⌦",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

const KEY_LABELS: Record<string, string> = {
  mod: "Ctrl",
  meta: "Win",
  cmd: "Win",
  command: "Win",
  shift: "Shift",
  alt: "Alt",
  option: "Alt",
  ctrl: "Ctrl",
  control: "Ctrl",
  escape: "Esc",
  enter: "Enter",
  space: "Space",
  backspace: "Backspace",
  delete: "Del",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

/**
 * Split a combo string into its visual parts for rendering. On macOS, modifiers
 * become symbols (⌘⇧⌥⌃); elsewhere, spelled-out labels (Ctrl/Alt/Shift).
 */
export function formatCombo(combo: string): string[] {
  const parts = combo
    .toLowerCase()
    .split("+")
    .map((p) => p.trim())
    .filter(Boolean);
  const mac = isMac();
  const table = mac ? KEY_SYMBOLS_MAC : KEY_LABELS;
  return parts.map((part) => table[part] ?? part.toUpperCase());
}

export { parseCombo };
export type { ParsedCombo };
