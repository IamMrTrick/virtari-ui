import { RefObject } from 'react';

declare function cn(...classes: (string | undefined | null | false)[]): string;

type Direction = "ltr" | "rtl";
/**
 * Read the active text direction from a DOM element (or documentElement if
 * none given) and keep it in sync when ancestor `dir` changes.
 *
 * SSR-safe: returns "ltr" on the first render, then corrects itself in the
 * client-only effect — matching the rendered-on-server HTML.
 */
declare function useDirection(ref?: RefObject<Element | null>): Direction;

interface ParsedCombo {
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
declare function parseCombo(combo: string): ParsedCombo;
declare function matchesCombo(e: KeyboardEvent, combo: ParsedCombo): boolean;
interface UseHotkeyOptions {
    enabled?: boolean;
    target?: HTMLElement | Document | null;
    preventDefault?: boolean;
    /** If false (default), hotkey is ignored when focus is in an editable field. */
    allowInInputs?: boolean;
    deps?: unknown[];
}
/**
 * Bind a keyboard shortcut to a handler. Combo grammar: `mod+k`, `ctrl+shift+p`,
 * `alt+/`, `escape`. `mod` = meta on macOS, ctrl elsewhere.
 */
declare function useHotkey(combo: string | string[], handler: (e: KeyboardEvent) => void, opts?: UseHotkeyOptions): void;

export { type Direction, type ParsedCombo, type UseHotkeyOptions, cn, matchesCombo, parseCombo, useDirection, useHotkey };
