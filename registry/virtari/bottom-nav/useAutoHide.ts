import { useEffect, useState } from "react";

/**
 * Tracks window scroll direction and returns `true` when the nav should be
 * hidden (user scrolled down past the threshold). Returns `false` when near
 * the top or after any scroll-up.
 *
 * - Listener is rAF-throttled to one update per frame.
 * - Respects `prefers-reduced-motion` by staying visible (no surprise jumps).
 * - SSR-safe: returns `false` until mounted.
 */
export function useAutoHide(enabled: boolean): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }

    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setHidden(false);
      return;
    }

    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 8;
    const topEpsilon = 16;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= topEpsilon) {
        setHidden(false);
      } else if (delta > threshold) {
        setHidden(true);
      } else if (delta < -threshold) {
        setHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  return hidden;
}
