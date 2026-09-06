import type { KeyboardEvent as ReactKeyboardEvent } from "react";

const IS_MAC_LIKE =
  typeof navigator !== "undefined" &&
  /(Mac|iPhone|iPad|iPod)/i.test(navigator.platform);

function formatShortcut(windows: string, mac?: string) {
  return IS_MAC_LIKE ? (mac ?? windows.replaceAll("Ctrl", "Cmd")) : windows;
}

export const SHORTCUTS = {
  NORMAL: formatShortcut("Ctrl+Alt+0", "Cmd+Alt+0"),
  HEADING_1: formatShortcut("Ctrl+Alt+1", "Cmd+Alt+1"),
  HEADING_2: formatShortcut("Ctrl+Alt+2", "Cmd+Alt+2"),
  HEADING_3: formatShortcut("Ctrl+Alt+3", "Cmd+Alt+3"),
  HEADING_4: formatShortcut("Ctrl+Alt+4", "Cmd+Alt+4"),
  HEADING_5: formatShortcut("Ctrl+Alt+5", "Cmd+Alt+5"),
  HEADING_6: formatShortcut("Ctrl+Alt+6", "Cmd+Alt+6"),
  NUMBERED_LIST: formatShortcut("Ctrl+Shift+7", "Cmd+Shift+7"),
  BULLET_LIST: formatShortcut("Ctrl+Shift+8", "Cmd+Shift+8"),
  CHECK_LIST: formatShortcut("Ctrl+Shift+9", "Cmd+Shift+9"),
  QUOTE: formatShortcut("Ctrl+Shift+Q", "Cmd+Shift+Q"),
  CODE_BLOCK: formatShortcut("Ctrl+Alt+C", "Cmd+Alt+C"),
  LEFT_ALIGN: formatShortcut("Ctrl+Shift+L", "Cmd+Shift+L"),
  CENTER_ALIGN: formatShortcut("Ctrl+Shift+E", "Cmd+Shift+E"),
  RIGHT_ALIGN: formatShortcut("Ctrl+Shift+R", "Cmd+Shift+R"),
  JUSTIFY_ALIGN: formatShortcut("Ctrl+Shift+J", "Cmd+Shift+J"),
  OUTDENT: formatShortcut("Ctrl+[", "Cmd+["),
  INDENT: formatShortcut("Ctrl+]", "Cmd+]"),
  LINK: formatShortcut("Ctrl+K", "Cmd+K"),
} as const;

export function hasPrimaryModifier(
  event:
    | KeyboardEvent
    | ReactKeyboardEvent
    | Pick<KeyboardEvent, "ctrlKey" | "metaKey">,
) {
  return Boolean(event.ctrlKey || event.metaKey);
}
