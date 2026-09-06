import { useCallback, useEffect, useMemo, useRef } from "react";
import { flushSync } from "react-dom";

const DRAG_THRESHOLD_PX = 6;
const VELOCITY_WINDOW_MS = 80;
const VELOCITY_THRESHOLD_PX_PER_MS = 0.3;
const SAMPLE_CAPACITY = 4;
const CLICK_SUPPRESSION_TTL_MS = 500;

interface VelocitySample {
  x: number;
  t: number;
}

interface DragSession {
  pointerId: number;
  startX: number;
  startTime: number;
  startChecked: boolean;
  minTranslate: number;
  maxTranslate: number;
  startTranslate: number;
  isRtl: boolean;
  dragging: boolean;
  samples: VelocitySample[];
}

export interface SwitchDragConfig {
  enabled: boolean;
  getChecked: () => boolean;
  onCommit: (next: boolean) => void;
}

export interface SwitchDragBinding {
  rootRef: (node: HTMLButtonElement | null) => void;
  thumbRef: (node: HTMLSpanElement | null) => void;
  handlers: {
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerCancel: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onLostPointerCapture: (event: React.PointerEvent<HTMLButtonElement>) => void;
  };
}

interface DragMetrics {
  minTranslate: number;
  maxTranslate: number;
}

function readCssPx(styles: CSSStyleDeclaration, property: string): number {
  const value = parseFloat(styles.getPropertyValue(property));
  return Number.isFinite(value) ? value : 0;
}

function measureRange(
  root: HTMLButtonElement,
  thumb: HTMLSpanElement,
): DragMetrics {
  const rootWidth = root.clientWidth;
  const thumbWidth = thumb.offsetWidth;
  const styles = getComputedStyle(root);
  const padding =
    parseFloat(styles.paddingInlineStart || styles.paddingLeft || "0") +
    parseFloat(styles.paddingInlineEnd || styles.paddingRight || "0");
  const offset = readCssPx(styles, "--_switch-thumb-offset");
  const minTranslate = offset;
  const maxTranslate = Math.max(
    rootWidth - thumbWidth - padding - offset,
    minTranslate,
  );

  return { minTranslate, maxTranslate };
}

function readTranslateX(thumb: HTMLSpanElement): number {
  const styles = getComputedStyle(thumb);
  const [translateX] = styles.translate.split(/\s+/);
  const parsedTranslate = parseFloat(translateX);

  if (Number.isFinite(parsedTranslate)) {
    return parsedTranslate;
  }

  if (!styles.transform || styles.transform === "none") return 0;

  const matrix = new DOMMatrixReadOnly(styles.transform);
  return matrix.m41;
}

function translateForState(
  checked: boolean,
  isRtl: boolean,
  metrics: DragMetrics,
): number {
  return checked === isRtl ? metrics.minTranslate : metrics.maxTranslate;
}

function resolveCheckedFromVelocity(velocity: number, isRtl: boolean): boolean {
  return isRtl ? velocity < 0 : velocity > 0;
}

function resolveCheckedFromPosition(
  translate: number,
  midpoint: number,
  isRtl: boolean,
): boolean {
  return isRtl ? translate <= midpoint : translate >= midpoint;
}

function computeVelocity(samples: VelocitySample[]): number {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  let first = samples[0];
  for (let i = samples.length - 2; i >= 0; i--) {
    if (last.t - samples[i].t <= VELOCITY_WINDOW_MS) {
      first = samples[i];
    } else {
      break;
    }
  }
  const dt = Math.max(last.t - first.t, 1);
  return (last.x - first.x) / dt;
}

export function useSwitchDrag(config: SwitchDragConfig): SwitchDragBinding {
  const rootElRef = useRef<HTMLButtonElement | null>(null);
  const thumbElRef = useRef<HTMLSpanElement | null>(null);
  const sessionRef = useRef<DragSession | null>(null);
  const suppressClickUntilRef = useRef(0);
  const configRef = useRef(config);
  configRef.current = config;

  const onNativeClick = useCallback((event: MouseEvent) => {
    if (event.detail === 0) return;
    if (performance.now() >= suppressClickUntilRef.current) return;
    suppressClickUntilRef.current = 0;
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const rootRef = useCallback(
    (node: HTMLButtonElement | null) => {
      const previous = rootElRef.current;
      if (previous && previous !== node) {
        previous.removeEventListener("click", onNativeClick, true);
      }
      rootElRef.current = node;
      if (node && node !== previous) {
        node.addEventListener("click", onNativeClick, true);
      }
    },
    [onNativeClick],
  );

  const thumbRef = useCallback((node: HTMLSpanElement | null) => {
    thumbElRef.current = node;
  }, []);

  const cleanupVisuals = useCallback(() => {
    const root = rootElRef.current;
    const thumb = thumbElRef.current;
    if (root) root.removeAttribute("data-dragging");
    if (thumb) thumb.style.translate = "";
  }, []);

  useEffect(() => {
    return () => {
      const root = rootElRef.current;
      if (root) root.removeEventListener("click", onNativeClick, true);
      cleanupVisuals();
    };
  }, [cleanupVisuals, onNativeClick]);

  useEffect(() => {
    if (config.enabled) return;
    const session = sessionRef.current;
    sessionRef.current = null;
    if (session) {
      const root = rootElRef.current;
      if (root?.hasPointerCapture(session.pointerId)) root.releasePointerCapture(session.pointerId);
    }
    cleanupVisuals();
  }, [config.enabled, cleanupVisuals]);

  const handlers = useMemo(() => {
    const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      const { enabled, getChecked } = configRef.current;
      if (!enabled || event.defaultPrevented) return;
      if (sessionRef.current) return;
      if (event.button !== 0) return;

      const root = rootElRef.current;
      const thumb = thumbElRef.current;
      if (!root || !thumb) return;

      const metrics = measureRange(root, thumb);
      if (metrics.maxTranslate <= metrics.minTranslate) return;

      // Reset any stale click-suppression from a prior interaction.
      suppressClickUntilRef.current = 0;

      const isRtl = getComputedStyle(root).direction === "rtl";
      const checked = getChecked();
      const startTranslate = translateForState(checked, isRtl, metrics);

      sessionRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startTime: event.timeStamp,
        startChecked: checked,
        ...metrics,
        startTranslate,
        isRtl,
        dragging: false,
        samples: [{ x: event.clientX, t: event.timeStamp }],
      };

      try {
        root.setPointerCapture(event.pointerId);
      } catch {
        /* noop */
      }
    };

    const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      if (event.defaultPrevented || !configRef.current.enabled) {
        sessionRef.current = null;
        finish(session, true);
        return;
      }

      const deltaX = event.clientX - session.startX;

      if (session.samples.length >= SAMPLE_CAPACITY) session.samples.shift();
      session.samples.push({ x: event.clientX, t: event.timeStamp });

      if (!session.dragging) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;
        session.dragging = true;
        rootElRef.current?.setAttribute("data-dragging", "");
      }

      const next = Math.min(
        Math.max(session.startTranslate + deltaX, session.minTranslate),
        session.maxTranslate,
      );
      const thumb = thumbElRef.current;
      if (thumb) thumb.style.translate = `${next}px -50%`;
    };

    const releaseCapture = (session: DragSession) => {
      const root = rootElRef.current;
      if (!root) return;
      try {
        if (root.hasPointerCapture(session.pointerId)) {
          root.releasePointerCapture(session.pointerId);
        }
      } catch {
        /* noop */
      }
    };

    const finish = (session: DragSession, cancelled: boolean) => {
      releaseCapture(session);

      if (cancelled) {
        // A canceled drag must not turn into a toggle if a click follows it.
        if (session.dragging) suppressClickUntilRef.current = performance.now() + CLICK_SUPPRESSION_TTL_MS;
        cleanupVisuals();
        return;
      }

      if (!session.dragging) {
        // A tap follows the primitive's native click path, preserving consumer
        // cancellation, label activation, and native form event propagation.
        cleanupVisuals();
        return;
      }
      suppressClickUntilRef.current = performance.now() + CLICK_SUPPRESSION_TTL_MS;

      const velocity = computeVelocity(session.samples);
      const thumb = thumbElRef.current;
      const currentTranslate = thumb ? readTranslateX(thumb) : session.startTranslate;
      const midpoint = (session.minTranslate + session.maxTranslate) / 2;

      const desired = Math.abs(velocity) >= VELOCITY_THRESHOLD_PX_PER_MS
        ? resolveCheckedFromVelocity(velocity, session.isRtl)
        : resolveCheckedFromPosition(currentTranslate, midpoint, session.isRtl);

      if (desired !== session.startChecked) {
        flushSync(() => {
          configRef.current.onCommit(desired);
        });
      }
      cleanupVisuals();
    };

    const onPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      sessionRef.current = null;
      finish(session, event.defaultPrevented || !configRef.current.enabled);
    };

    const onPointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      sessionRef.current = null;
      finish(session, true);
    };

    const onLostPointerCapture = (event: React.PointerEvent<HTMLButtonElement>) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      sessionRef.current = null;
      finish(session, true);
    };

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture,
    };
  }, [cleanupVisuals]);

  return { rootRef, thumbRef, handlers };
}
