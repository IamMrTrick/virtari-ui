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
