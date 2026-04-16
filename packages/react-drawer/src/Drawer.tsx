import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  type Ref,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@virtari/utils";
import { DrawerProvider, useDrawerContext } from "./DrawerContext";
import type { Direction } from "./utils";

/* ── Constants (from vaul's proven values) ── */
const DURATION = 0.5; // seconds
const EASE_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";
const CLOSE_THRESHOLD = 0.25;
const VELOCITY_THRESHOLD = 0.4; // px/ms
const BORDER_RADIUS = 8;

/** Apply inline styles, cache originals for reset */
function setStyle(el: HTMLElement | null, styles: Record<string, string>) {
  if (!el) return;
  for (const [key, value] of Object.entries(styles)) {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value);
    } else {
      (el.style as any)[key] = value;
    }
  }
}

/** Damping for overscroll (logarithmic) */
function dampen(v: number): number {
  return 8 * (Math.log(v + 1) - 2);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Drawer (Root)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface DrawerProps {
  children: ReactNode;
  direction?: Direction;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  scaleBackground?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  /** Prevent auto-focus on first focusable element (default: true) */
  preventAutoFocus?: boolean;
}

export function Drawer({
  children,
  direction = "bottom",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  scaleBackground = false,
  modal = true,
  dismissible = true,
  preventAutoFocus = true,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  // Visible = keeps DOM mounted during close animation
  const [visible, setVisible] = useState(open);
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onOpenChange = useCallback(
    (value: boolean) => {
      if (!dismissible && !value) return;

      if (value) {
        // Opening: show DOM immediately, animate in on next frame
        setVisible(true);
        if (!isControlled) setInternalOpen(true);
        controlledOnOpenChange?.(true);
      } else {
        // Closing: animate out, then remove DOM after duration
        setMounted(false);

        // Reset background scale with transition
        if (scaleBackground) {
          const wrapper = document.querySelector("[data-vds-drawer-wrapper]") as HTMLElement;
          if (wrapper) {
            setStyle(wrapper, {
              transition: `transform ${DURATION}s ${EASE_CSS}, border-radius ${DURATION}s ${EASE_CSS}`,
              transform: "",
              borderRadius: "",
            });
          }
        }

        // Wait for animation to finish, then unmount
        setTimeout(() => {
          setVisible(false);
          if (!isControlled) setInternalOpen(false);
          controlledOnOpenChange?.(false);
        }, DURATION * 1000);
      }
    },
    [isControlled, controlledOnOpenChange, dismissible, scaleBackground],
  );

  // Trigger mount animation after DOM is rendered
  useLayoutEffect(() => {
    if (visible) {
      // Double rAF: frame 1 = paint at closed position, frame 2 = trigger transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMounted(true);
        });
      });
    }
  }, [visible]);

  return (
    <DrawerProvider
      value={{
        direction,
        open: visible,
        dragging,
        snapIndex: 0,
        contentRef,
        overlayRef,
        onOpenChange,
        mounted,
        setDragging,
        scaleBackground,
        preventAutoFocus,
      }}
    >
      <DialogPrimitive.Root open={visible} onOpenChange={onOpenChange} modal={modal}>
        {children}
      </DialogPrimitive.Root>
    </DrawerProvider>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DrawerTrigger / DrawerClose
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DrawerOverlay
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  ref?: Ref<HTMLDivElement>;
}

export function DrawerOverlay({ className, ref, ...props }: DrawerOverlayProps) {
  const { overlayRef, mounted } = useDrawerContext();

  return (
    <DialogPrimitive.Overlay
      ref={(node) => {
        (overlayRef as { current: HTMLDivElement | null }).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
      }}
      className={cn("vds-drawer-overlay", className)}
      data-mounted={mounted || undefined}
      {...props}
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DrawerContent — the main sliding panel with drag
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  ref?: Ref<HTMLDivElement>;
}

export function DrawerContent({
  className,
  children,
  ref,
  ...props
}: DrawerContentProps) {
  const {
    direction,
    contentRef,
    overlayRef,
    mounted,
    dragging,
    setDragging,
    onOpenChange,
    scaleBackground,
    preventAutoFocus,
  } = useDrawerContext();

  // ── Drag state ──
  const pointerStart = useRef({ x: 0, y: 0, time: 0 });
  const dragDelta = useRef(0);
  const isDraggingRef = useRef(false);
  const drawerSizeRef = useRef(0);

  // Measure drawer size
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el || !mounted) return;
    drawerSizeRef.current =
      direction === "left" || direction === "right" ? el.offsetWidth : el.offsetHeight;
  }, [mounted, direction, contentRef]);

  /** Get drag delta in the drawer's axis, positive = closing direction */
  const getDragDelta = (clientX: number, clientY: number): number => {
    switch (direction) {
      case "bottom": return clientY - pointerStart.current.y;
      case "top": return pointerStart.current.y - clientY;
      case "right": return clientX - pointerStart.current.x;
      case "left": return pointerStart.current.x - clientX;
    }
  };

  /** Get the CSS translate value for a given drag offset */
  const getTranslate = (offset: number): string => {
    switch (direction) {
      case "bottom": return `translate3d(0, ${offset}px, 0)`;
      case "top": return `translate3d(0, ${-offset}px, 0)`;
      case "right": return `translate3d(${offset}px, 0, 0)`;
      case "left": return `translate3d(${-offset}px, 0, 0)`;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isDraggingRef.current = false;
    dragDelta.current = 0;

    const el = contentRef.current;
    if (el) {
      el.style.transition = "none";
      el.style.willChange = "transform";
      el.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStart.current.time) return;

    const delta = getDragDelta(e.clientX, e.clientY);

    // Only start dragging after 8px in the correct direction
    if (!isDraggingRef.current) {
      if (delta < 8) return;
      isDraggingRef.current = true;
      setDragging(true);
      // Reset start to current position for clean delta
      pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      return;
    }

    e.preventDefault();
    const rawDelta = getDragDelta(e.clientX, e.clientY);

    // Clamp: allow closing direction fully, dampen opening overscroll
    const clampedDelta = rawDelta > 0 ? rawDelta : dampen(-rawDelta) * -1;
    dragDelta.current = rawDelta;

    const el = contentRef.current;
    if (el) {
      el.style.transform = getTranslate(Math.max(0, clampedDelta));
    }

    // Fade overlay proportionally
    const overlayEl = overlayRef.current;
    if (overlayEl && drawerSizeRef.current > 0) {
      const progress = 1 - Math.max(0, clampedDelta) / drawerSizeRef.current;
      overlayEl.style.opacity = String(Math.max(0, Math.min(1, progress)));
    }

    // Scale background
    if (scaleBackground && drawerSizeRef.current > 0) {
      const progress = Math.max(0, clampedDelta) / drawerSizeRef.current;
      const scale = 1 - (1 - progress) * 0.06;
      const radius = (1 - progress) * BORDER_RADIUS;
      const wrapper = document.querySelector("[data-vds-drawer-wrapper]") as HTMLElement;
      if (wrapper) {
        wrapper.style.transition = "none";
        wrapper.style.transform = `scale(${Math.min(1, Math.max(0.94, scale))})`;
        wrapper.style.borderRadius = `${radius}px`;
      }
    }
  };

  const handlePointerUp = (_e: React.PointerEvent) => {
    if (!pointerStart.current.time) return;

    const el = contentRef.current;
    const elapsed = Math.max(Date.now() - pointerStart.current.time, 1);
    const velocity = dragDelta.current / elapsed; // px/ms
    const shouldClose =
      velocity > VELOCITY_THRESHOLD ||
      (dragDelta.current > 0 && dragDelta.current > drawerSizeRef.current * CLOSE_THRESHOLD);

    // Reset
    pointerStart.current = { x: 0, y: 0, time: 0 };
    isDraggingRef.current = false;
    setDragging(false);

    if (el) {
      el.style.willChange = "";
      el.style.transition = `transform ${DURATION}s ${EASE_CSS}`;
    }

    if (shouldClose) {
      // Animate to closed position, then unmount
      if (el) {
        el.style.transform = getTranslate(drawerSizeRef.current);
      }
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.style.transition = `opacity ${DURATION}s ${EASE_CSS}`;
        overlayEl.style.opacity = "0";
      }
      onOpenChange(false);
    } else {
      // Snap back to open
      if (el) {
        el.style.transform = getTranslate(0);
      }
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.style.transition = `opacity ${DURATION}s ${EASE_CSS}`;
        overlayEl.style.opacity = "1";
      }
      // Reset background
      if (scaleBackground) {
        const wrapper = document.querySelector("[data-vds-drawer-wrapper]") as HTMLElement;
        if (wrapper) {
          wrapper.style.transition = `transform ${DURATION}s ${EASE_CSS}, border-radius ${DURATION}s ${EASE_CSS}`;
          wrapper.style.transform = "scale(0.94)";
          wrapper.style.borderRadius = `${BORDER_RADIUS}px`;
        }
      }
    }
  };

  return (
    <DialogPrimitive.Portal forceMount={undefined}>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={(node) => {
          (contentRef as { current: HTMLDivElement | null }).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
        }}
        className={cn("vds-drawer-content", className)}
        data-direction={direction}
        data-dragging={dragging || undefined}
        data-mounted={mounted || undefined}
        onOpenAutoFocus={(e) => {
          if (preventAutoFocus) e.preventDefault();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DrawerHandle — grab indicator bar
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface DrawerHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function DrawerHandle({ className, ref, ...props }: DrawerHandleProps) {
  const { direction } = useDrawerContext();
  return (
    <div
      ref={ref}
      className={cn("vds-drawer-handle", className)}
      data-direction={direction}
      aria-hidden="true"
      {...props}
    >
      <div className="vds-drawer-handle-bar" />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DrawerTitle / Description / Body / Footer
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface DrawerTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  ref?: Ref<HTMLHeadingElement>;
}
export function DrawerTitle({ className, ref, ...props }: DrawerTitleProps) {
  return <DialogPrimitive.Title ref={ref} className={cn("vds-drawer-title", className)} {...props} />;
}

export interface DrawerDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  ref?: Ref<HTMLParagraphElement>;
}
export function DrawerDescription({ className, ref, ...props }: DrawerDescriptionProps) {
  return <DialogPrimitive.Description ref={ref} className={cn("vds-drawer-description", className)} {...props} />;
}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
export function DrawerBody({ className, ref, ...props }: DrawerBodyProps) {
  return <div ref={ref} className={cn("vds-drawer-body", className)} {...props} />;
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
export function DrawerFooter({ className, ref, ...props }: DrawerFooterProps) {
  return <div ref={ref} className={cn("vds-drawer-footer", className)} {...props} />;
}
