import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export interface ScrollWheelProps {
  label: string;
  values: number[];
  value: number;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
  variant?: "number" | "period" | "year";
  className?: string;
  showHeader?: boolean;
}

/**
 * Vertical wheel column with snap + drag + wheel + keyboard support.
 * Shared by the TimePicker wheels and the Calendar year selector.
 */
export function ScrollWheel({
  label,
  values,
  value,
  formatValue,
  onChange,
  variant = "number",
  className,
  showHeader = true,
}: ScrollWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<number, HTMLButtonElement>());
  const scrollTimerRef = useRef<number | null>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const [activeValue, setActiveValue] = useState(value);
  const [dragging, setDragging] = useState(false);
  const dragStateRef = useRef({
    active: false,
    pointerId: -1,
    pointerType: "",
    startY: 0,
    lastY: 0,
    startScrollTop: 0,
    moved: false,
    velocity: 0,
    velocityTime: 0,
  });
  const centeredOnceRef = useRef(false);

  const centerValue = useCallback(
    (nextValue: number, behavior: ScrollBehavior) => {
      const wheel = wheelRef.current;
      const item = itemRefs.current.get(nextValue);
      if (!wheel || !item) return;
      const targetTop = item.offsetTop - (wheel.clientHeight - item.offsetHeight) / 2;
      wheel.scrollTo({ top: targetTop, behavior });
    },
    [],
  );

  const getNearestValue = useCallback((): number => {
    const wheel = wheelRef.current;
    if (!wheel) return valueRef.current;
    const center = wheel.scrollTop + wheel.clientHeight / 2;
    let nearest = valueRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const itemValue of values) {
      const item = itemRefs.current.get(itemValue);
      if (!item) continue;
      const itemCenter = item.offsetTop + item.offsetHeight / 2;
      const distance = Math.abs(itemCenter - center);
      if (distance < nearestDistance) {
        nearest = itemValue;
        nearestDistance = distance;
      }
    }
    return nearest;
  }, [values]);

  const commitNearest = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const nearest = getNearestValue();
      if (nearest !== valueRef.current) {
        onChangeRef.current(nearest);
      }
      centerValue(nearest, behavior);
    },
    [centerValue, getNearestValue],
  );

  const scheduleSnap = useCallback(
    (delay = 90, behavior: ScrollBehavior = "smooth") => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = window.setTimeout(() => {
        commitNearest(behavior);
      }, delay);
    },
    [commitNearest],
  );

  const stepValue = useCallback(
    (delta: number) => {
      if (!delta || values.length === 0) return;
      const currentIndex = values.indexOf(valueRef.current);
      const nearestIndex = values.indexOf(getNearestValue());
      const baseIndex = currentIndex >= 0 ? currentIndex : Math.max(nearestIndex, 0);
      const nextIndex = clamp(baseIndex + delta, 0, values.length - 1);
      const nextValue = values[nextIndex];
      if (nextValue === undefined) return;
      if (nextValue !== valueRef.current) {
        onChangeRef.current(nextValue);
      }
      setActiveValue(nextValue);
      centerValue(nextValue, "smooth");
    },
    [centerValue, getNearestValue, values],
  );

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
    setActiveValue(value);
  }, [value, onChange]);

  useLayoutEffect(() => {
    if (!wheelRef.current) return;
    if (!centeredOnceRef.current) {
      centerValue(value, "auto");
      centeredOnceRef.current = true;
      return;
    }
    if (!dragging) {
      centerValue(value, "auto");
    }
  }, [centerValue, dragging, value]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startY: event.clientY,
      lastY: event.clientY,
      startScrollTop: wheel.scrollTop,
      moved: false,
      velocity: 0,
      velocityTime: performance.now(),
    };
    setDragging(true);
    try {
      wheel.setPointerCapture(event.pointerId);
    } catch {
      /* noop */
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    const dragState = dragStateRef.current;
    if (!wheel || !dragState.active || dragState.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    const now = performance.now();
    const delta = event.clientY - dragState.startY;
    if (Math.abs(delta) > 3) {
      dragState.moved = true;
    }
    const dt = Math.max(1, now - dragState.velocityTime);
    dragState.velocity = (event.clientY - dragState.lastY) / dt;
    dragState.lastY = event.clientY;
    dragState.velocityTime = now;

    wheel.scrollTop = dragState.startScrollTop - delta;
  };

  const handlePointerRelease = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    const dragState = dragStateRef.current;
    if (!wheel || !dragState.active || dragState.pointerId !== event.pointerId) return;

    try {
      wheel.releasePointerCapture(event.pointerId);
    } catch {
      /* noop */
    }
    dragState.active = false;
    setDragging(false);

    const flick = Math.max(-6, Math.min(6, Math.round(dragState.velocity * -60)));
    if (flick !== 0) {
      stepValue(flick);
    } else {
      scheduleSnap();
    }
  };

  // Native wheel events fire on the scroll container; we also attach a
  // non-passive listener via useEffect so stepValue can preventDefault
  // reliably and avoid the body from scrolling the page.
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const onNativeWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      event.stopPropagation();
      const multiplier =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? wheel.clientHeight
            : 1;
      const threshold = 22;
      const raw = event.deltaY * multiplier;
      const steps =
        Math.trunc(raw / threshold) || (raw > 0 ? 1 : -1);
      stepValue(steps);
    };
    wheel.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => wheel.removeEventListener("wheel", onNativeWheel);
  }, [stepValue]);

  return (
    <div className={className ?? "vds-time-wheel"} data-variant={variant}>
      {showHeader ? (
        <div className="vds-time-wheel-header" aria-hidden="true">
          {label}
        </div>
      ) : null}
      <div
        ref={wheelRef}
        className="vds-time-wheel-track"
        role="listbox"
        aria-label={label}
        data-dragging={dragging ? "true" : undefined}
        data-vds-drawer-no-drag=""
        onScroll={() => {
          setActiveValue(getNearestValue());
          if (!dragStateRef.current.active) {
            scheduleSnap(120);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onLostPointerCapture={() => {
          dragStateRef.current.active = false;
          setDragging(false);
        }}
      >
        {values.map((itemValue, index) => {
          const selected = itemValue === activeValue;
          const activeIndex = values.indexOf(activeValue);
          const distance =
            activeIndex < 0 ? 0 : Math.min(4, Math.abs(index - activeIndex));
          return (
            <button
              key={itemValue}
              ref={(node) => {
                if (node) {
                  itemRefs.current.set(itemValue, node);
                } else {
                  itemRefs.current.delete(itemValue);
                }
              }}
              type="button"
              className="vds-time-wheel-item"
              role="option"
              data-value={itemValue}
              data-selected={selected ? "true" : undefined}
              data-distance={distance}
              aria-selected={selected}
              aria-label={`${label} ${formatValue(itemValue)}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  stepValue(1);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  stepValue(-1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  const first = values[0];
                  if (first !== undefined) {
                    setActiveValue(first);
                    onChangeRef.current(first);
                    centerValue(first, "smooth");
                  }
                } else if (event.key === "End") {
                  event.preventDefault();
                  const last = values[values.length - 1];
                  if (last !== undefined) {
                    setActiveValue(last);
                    onChangeRef.current(last);
                    centerValue(last, "smooth");
                  }
                }
              }}
              onClick={() => {
                if (dragStateRef.current.moved) {
                  dragStateRef.current.moved = false;
                  return;
                }
                setActiveValue(itemValue);
                onChange(itemValue);
              }}
            >
              {formatValue(itemValue)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
