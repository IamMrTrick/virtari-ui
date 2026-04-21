import { createContext, useContext } from "react";

export type BottomNavVariant = "material" | "ios" | "floating" | "underline";
export type BottomNavSize = "sm" | "md" | "lg";
export type BottomNavMatchStrategy = "exact" | "startsWith";

export interface BottomNavContextValue {
  variant: BottomNavVariant;
  size: BottomNavSize;
  currentPath?: string;
  matchStrategy: BottomNavMatchStrategy;
}

export const BottomNavContext = createContext<BottomNavContextValue | null>(null);

export function useBottomNav(): BottomNavContextValue {
  const ctx = useContext(BottomNavContext);
  if (!ctx) {
    throw new Error(
      "BottomNav sub-components must be rendered inside <BottomNav>.",
    );
  }
  return ctx;
}

/** Match a link's href against the active path per strategy. */
export function matchesCurrent(
  href: string | undefined,
  currentPath: string | undefined,
  strategy: BottomNavMatchStrategy,
): boolean {
  if (!href || !currentPath) return false;
  if (strategy === "startsWith") return currentPath.startsWith(href);
  return currentPath === href;
}
