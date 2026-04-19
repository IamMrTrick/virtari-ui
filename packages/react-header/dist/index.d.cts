import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ElementType, Ref } from 'react';

type HeaderSlot = "top" | "main" | "bottom";
interface HeaderProps extends HTMLAttributes<HTMLElement> {
    /** Override the root tag. Defaults to the semantic `"header"` landmark. */
    as?: ElementType;
    /**
     * External top offset applied to every sticky row — e.g. an announcement bar
     * rendered above the <Header>. Any valid CSS length (`"0px"`, `"2rem"`, `"env(safe-area-inset-top)"`).
     */
    stickyOffset?: string;
    ref?: Ref<HTMLElement>;
}
/**
 * Root landmark. Renders `<header>` by default and provides sticky-stack
 * coordination so child rows can pin themselves below each other.
 */
declare function Header({ as: Tag, stickyOffset, className, style, children, ref, ...rest }: HeaderProps): react_jsx_runtime.JSX.Element;

type StickyMode = "none" | "always" | "smart" | "collapse";

type HeaderStickyMode = StickyMode;
type HeaderBackground = "none" | "subtle" | "muted" | "emphasis";
type HeaderGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type HeaderWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
type HeaderGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type HeaderHeight = "sm" | "md" | "lg" | "xl";
interface HeaderRowProps extends HTMLAttributes<HTMLElement> {
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
/**
 * A single header band. Use `<HeaderTop>` / `<HeaderMain>` / `<HeaderBottom>`
 * for the semantic shortcuts, or `<HeaderRow slot="…">` for explicit composition.
 */
declare function HeaderRow({ as: Tag, slot, sticky, transparent, center, background, gutter, width, gap, height, blockSize, contained, collapseAt, smartThreshold, className, style, children, ref, ...rest }: HeaderRowProps): react_jsx_runtime.JSX.Element;
type HeaderSlotRowProps = Omit<HeaderRowProps, "slot">;
declare function HeaderTop(props: HeaderSlotRowProps): react_jsx_runtime.JSX.Element;
declare function HeaderMain(props: HeaderSlotRowProps): react_jsx_runtime.JSX.Element;
declare function HeaderBottom(props: HeaderSlotRowProps): react_jsx_runtime.JSX.Element;

type HeaderSide = "start" | "center" | "end";
interface HeaderSectionProps extends HTMLAttributes<HTMLElement> {
    /** Override the default tag. Section renders `<div>` — swap for `"nav"` (with `aria-label`) on the nav section, etc. */
    as?: ElementType;
    /** Which slot of the row this section belongs to. */
    side: HeaderSide;
    ref?: Ref<HTMLElement>;
}
/**
 * A single section of a HeaderRow. Use `<HeaderStart>` / `<HeaderCenter>` /
 * `<HeaderEnd>` for ergonomic slot names, or `<HeaderSection side="…">`
 * when wiring dynamically.
 */
declare function HeaderSection({ as: Tag, side, className, ref, ...rest }: HeaderSectionProps): react_jsx_runtime.JSX.Element;
type HeaderSideSectionProps = Omit<HeaderSectionProps, "side">;
declare function HeaderStart(props: HeaderSideSectionProps): react_jsx_runtime.JSX.Element;
declare function HeaderCenter(props: HeaderSideSectionProps): react_jsx_runtime.JSX.Element;
declare function HeaderEnd(props: HeaderSideSectionProps): react_jsx_runtime.JSX.Element;

export { Header, type HeaderBackground, HeaderBottom, HeaderCenter, HeaderEnd, type HeaderGap, type HeaderGutter, type HeaderHeight, HeaderMain, type HeaderProps, HeaderRow, type HeaderRowProps, HeaderSection, type HeaderSectionProps, type HeaderSide, type HeaderSideSectionProps, type HeaderSlot, type HeaderSlotRowProps, HeaderStart, type HeaderStickyMode, HeaderTop, type HeaderWidth };
