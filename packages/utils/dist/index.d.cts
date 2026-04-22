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

export { type Direction, cn, useDirection };
