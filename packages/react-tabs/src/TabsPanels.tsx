import { cn } from "@virtari-packages/utils";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { useCarouselSwipe } from "./use-carousel-swipe";

export interface TabsPanelsProps {
  children: ReactNode;
  className?: string;
  /** Enable swipe/drag to navigate between panels. Default true. */
  swipeable?: boolean;
  /** Minimum pointer drag (px) to commit a tab change. Default 50. */
  swipeThreshold?: number;
  /** Restrict swipe interaction to touch-only devices (pointer: coarse).
   *  Default true — desktop users still change tabs via the list. */
  touchOnly?: boolean;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Carousel-style container for `TabsContent`. Mounts all panels at once
 * (via `forceMount`), lays them out in a horizontal track, and translates
 * the track based on the active tab. On touch devices, users can swipe/drag
 * between panels.
 *
 * ```tsx
 * <Tabs defaultValue="a">
 *   <TabsList>...</TabsList>
 *   <TabsPanels>
 *     <TabsContent value="a">A</TabsContent>
 *     <TabsContent value="b">B</TabsContent>
 *   </TabsPanels>
 * </Tabs>
 * ```
 */
export function TabsPanels({
  children,
  className,
  swipeable = true,
  swipeThreshold = 50,
  touchOnly = true,
  ref,
}: TabsPanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(!touchOnly);

  /* Clone children to add `forceMount` on any TabsContent, and wrap each in a
     slide frame. Non-TabsContent children (whitespace, fragments) pass
     through untouched. */
  const slides: ReactElement[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const cloned = cloneElement(
      child as ReactElement<{ forceMount?: true }>,
      { forceMount: true },
    );
    slides.push(cloned);
  });
  const slideCount = slides.length;

  /* Touch-only gate. Switch to "active" once a pointer-coarse media query
     matches, so desktop users still use tab clicks. */
  useLayoutEffect(() => {
    if (!touchOnly) {
      setIsTouch(true);
      return;
    }
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, [touchOnly]);

  /* Track which panel is active via DOM attribute (the primitive sets
     data-state="active" on the visible panel). */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const panels = container.querySelectorAll<HTMLElement>(
        ':scope > .vds-tabs-panels-track > .vds-tabs-panels-slide > [role="tabpanel"]',
      );
      const idx = Array.from(panels).findIndex(
        (p) => p.getAttribute("data-state") === "active",
      );
      if (idx >= 0) setActiveIndex(idx);
    };
    update();

    const mo = new MutationObserver(update);
    mo.observe(container, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    });
    return () => mo.disconnect();
  }, [slideCount]);

  const activateByDirection = useCallback(
    (direction: "next" | "prev") => {
      const container = containerRef.current;
      if (!container) return false;
      const target =
        direction === "next"
          ? Math.min(activeIndex + 1, slideCount - 1)
          : Math.max(activeIndex - 1, 0);
      if (target === activeIndex) return false;

      const panels = container.querySelectorAll<HTMLElement>(
        ':scope > .vds-tabs-panels-track > .vds-tabs-panels-slide > [role="tabpanel"]',
      );
      const panel = panels[target];
      if (!panel) return false;
      const root = container.closest<HTMLElement>(".vds-tabs") ?? document.body;

      /* Primary: the primitive writes the owning trigger ID onto the panel
         via `aria-labelledby`, so we can hop straight to the exact trigger
         without depending on selector quirks. */
      let trigger: HTMLButtonElement | null = null;
      const triggerId = panel.getAttribute("aria-labelledby");
      if (triggerId) {
        const labelledTrigger = document.getElementById(triggerId);
        if (labelledTrigger instanceof HTMLButtonElement) {
          trigger = labelledTrigger;
        }
      }

      /* Secondary: match the trigger by `aria-controls` within the current
         tabs root. */
      if (panel.id) {
        trigger ??= root.querySelector<HTMLButtonElement>(
          `[role="tab"][aria-controls="${panel.id}"]`,
        );
      }

      /* Fallback: match by index within the nearest tablist (the primitive
         renders triggers in the same order as contents). */
      if (!trigger) {
        const tablist = root.querySelector('[role="tablist"]');
        const triggers =
          tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        trigger = triggers?.[target] ?? null;
      }

      if (!trigger || trigger.disabled || trigger.hasAttribute("data-disabled")) {
        return false;
      }

      trigger.focus({ preventScroll: true });
      trigger.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          button: 0,
          buttons: 1,
          view: window,
        }),
      );
      trigger.dispatchEvent(
        new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          button: 0,
          view: window,
        }),
      );
      return true;
    },
    [activeIndex, slideCount],
  );

  useCarouselSwipe(containerRef, trackRef, {
    enabled: swipeable && isTouch && slideCount > 1,
    activeIndex,
    slideCount,
    threshold: swipeThreshold,
    onCommit: activateByDirection,
  });

  /* After any activeIndex change (commit from swipe, or an external tab
     click), clear any inline transform/transition left on the track so the
     CSS-driven `translateX(var(--tabs-panels-tx))` baseline takes over. The
     CSS transition then animates from the drag position (if any) to the new
     baseline in one continuous movement. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = "";
    track.style.transition = "";
  }, [activeIndex]);

  const setRef = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  return (
    <div
      ref={setRef}
      className={cn("vds-tabs-panels", className)}
      data-swipeable={swipeable && isTouch ? "true" : undefined}
    >
      <div
        ref={trackRef}
        className="vds-tabs-panels-track"
        style={
          {
            "--tabs-panels-tx": `${-activeIndex * 100}%`,
          } as CSSProperties
        }
      >
        {slides.map((slide, idx) => (
          <div
            key={(slide.key as string | number | null) ?? idx}
            className="vds-tabs-panels-slide"
            data-active={idx === activeIndex ? "true" : undefined}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
