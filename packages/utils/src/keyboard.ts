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
