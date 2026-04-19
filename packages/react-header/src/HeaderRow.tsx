import { cn } from "@virtari-packages/utils";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";
import { useHeaderContext, type HeaderSlot } from "./Header";
import { useStickyBehavior, type StickyMode } from "./useStickyBehavior";

export type HeaderStickyMode = StickyMode;
export type HeaderBackground = "none" | "subtle" | "muted" | "emphasis";
export type HeaderGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type HeaderWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type HeaderGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type HeaderHeight = "sm" | "md" | "lg" | "xl";

export interface HeaderRowProps extends HTMLAttributes<HTMLElement> {
  /** Override the default tag. Row renders `<div>` by default — pass `"nav"` when the row *is* the primary nav. */
  as?: ElementType;
  /** Which slot this row occupies. Drives DOM order, sticky stacking and z-index. */
  slot: HeaderSlot;
  /** Sticky behavior. `"none"` = static; `"always"` = pinned; `"smart"` = hide on scroll-down, reveal on scroll-up; `"collapse"` = stay pinned but collapse to 0 height. */
  sticky?: HeaderStickyMode;
  /** Forces a fully transparent row (overrides `background`). Useful over hero imagery. */
  transparent?: boolean;
  /** Dead-center the middle section — outer sections become equal-width tracks. */
  center?: boolean;
  /** Background preset mapped to surface tokens. */
  background?: HeaderBackground;
  /** Horizontal padding preset. */
  gutter?: HeaderGutter;
  /** Max inline size of the inner container. */
  width?: HeaderWidth;
  /** Gap between the three sections. */
  gap?: HeaderGap;
  /** Height preset. */
  height?: HeaderHeight;
  /** Arbitrary row height (wins over `height`). Any CSS length. */
  blockSize?: string;
  /** Wrap content in the max-width container (default `true`). Set `false` for edge-to-edge rows. */
  contained?: boolean;
  /** For `sticky="collapse"` — document-space scrollY trigger. Defaults to the row's own bottom edge. */
  collapseAt?: number;
  /** For `sticky="smart"` — min scroll delta (px) before flipping hide/show. Default `4`. */
  smartThreshold?: number;
  ref?: Ref<HTMLElement>;
}

const STICKY_MODES: readonly HeaderStickyMode[] = [
  "always",
  "smart",
  "collapse",
];

/**
 * A single header band. Use `<HeaderTop>` / `<HeaderMain>` / `<HeaderBottom>`
 * for the semantic shortcuts, or `<HeaderRow slot="…">` for explicit composition.
 */
export function HeaderRow({
  as: Tag = "div",
  slot,
  sticky = "none",
  transparent,
  center,
  background,
  gutter,
  width,
  gap,
  height,
  blockSize,
  contained = true,
  collapseAt,
  smartThreshold,
  className,
  style,
  children,
  ref,
  ...rest
}: HeaderRowProps) {
  const ctx = useHeaderContext();
  const rowRef = useRef<HTMLElement | null>(null);

  const { hidden, collapsed } = useStickyBehavior({
    mode: sticky,
    rowRef,
    smartThreshold,
    collapseAt,
  });

  const isSticky = STICKY_MODES.includes(sticky);

  // Publish current height to the Header root whenever it changes.
  // ResizeObserver catches transitions (e.g. collapse → 0 → N).
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const publish = () => {
      const h = el.getBoundingClientRect().height;
      ctx.registerRow(slot, h, isSticky);
    };
    publish();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      ctx.unregisterRow(slot);
    };
  }, [ctx, slot, isSticky]);

  const setRowRef = useCallback(
    (el: HTMLElement | null) => {
      rowRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      }
    },
    [ref]
  );

  const mergedStyle: CSSProperties | undefined = blockSize
    ? { ...style, ["--row-block-size" as string]: blockSize }
    : style;

  return (
    <Tag
      ref={setRowRef}
      className={cn("vds-header__row", className)}
      data-slot={slot}
      data-sticky={sticky === "none" ? undefined : sticky}
      data-transparent={transparent ? "true" : undefined}
      data-center={center ? "true" : undefined}
      data-background={background}
      data-gutter={gutter}
      data-width={width}
      data-gap={gap}
      data-height={height}
      data-contained={contained ? undefined : "false"}
      data-hidden={hidden ? "true" : undefined}
      data-collapsed={collapsed ? "true" : undefined}
      style={mergedStyle}
      {...rest}
    >
      <div className="vds-header__row-inner">{children}</div>
    </Tag>
  );
}

/* ── Slot shortcuts ── */

export type HeaderSlotRowProps = Omit<HeaderRowProps, "slot">;

export function HeaderTop(props: HeaderSlotRowProps) {
  return <HeaderRow {...props} slot="top" />;
}

export function HeaderMain(props: HeaderSlotRowProps) {
  return <HeaderRow {...props} slot="main" />;
}

export function HeaderBottom(props: HeaderSlotRowProps) {
  return <HeaderRow {...props} slot="bottom" />;
}
