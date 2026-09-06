import { cn } from "../../lib/utils";
import type { ElementType, HTMLAttributes, Ref } from "react";

export type HeaderSide = "start" | "center" | "end";

export interface HeaderSectionProps extends HTMLAttributes<HTMLElement> {
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
export function HeaderSection({
  as: Tag = "div",
  side,
  className,
  ref,
  ...rest
}: HeaderSectionProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-header__section", className)}
      data-side={side}
      {...rest}
    />
  );
}

export type HeaderSideSectionProps = Omit<HeaderSectionProps, "side">;

export function HeaderStart(props: HeaderSideSectionProps) {
  return <HeaderSection {...props} side="start" />;
}

export function HeaderCenter(props: HeaderSideSectionProps) {
  return <HeaderSection {...props} side="center" />;
}

export function HeaderEnd(props: HeaderSideSectionProps) {
  return <HeaderSection {...props} side="end" />;
}
