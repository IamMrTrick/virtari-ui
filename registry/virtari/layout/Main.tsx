import { cn } from "../../lib/utils";
import type { Ref } from "react";
import { Section, type SectionProps } from "./Section";

/**
 * Semantic `<main>` landmark — the dominant content of the page. Render
 * **exactly one** `<Main>` per document (HTML spec: any further `<main>`
 * elements must be hidden with `hidden`).
 *
 * Structurally identical to `<Section>` (outer band + inner container, same
 * `padding` / `gutter` / `width` / `contained` / `background` / `align` /
 * `gap` / `fullHeight` props) with Main-specific defaults:
 *
 *   - `as="main"` — locked to the landmark tag
 *   - `id="main"` — so `<a href="#main">Skip to content</a>` anchors land here
 *   - `tabIndex={-1}` — lets JS / skip-links focus the region programmatically
 *     without adding it to the tab order
 *   - `padding="none"` — `<main>` usually contains child `<Section>`s that own
 *     their own vertical rhythm; override when you want block padding
 *   - `gutter="none"` — same reasoning for inline padding
 *
 * All overrides are possible via props — the defaults above just encode the
 * common case where `<Main>` is a thin landmark wrapping self-padded
 * `<Section>`s.
 */
export interface MainProps extends Omit<SectionProps, "as"> {
  ref?: Ref<HTMLElement>;
}

export function Main({
  id = "main",
  tabIndex = -1,
  padding = "none",
  gutter = "none",
  contained = true,
  className,
  ...rest
}: MainProps) {
  return (
    <Section
      as="main"
      id={id}
      tabIndex={tabIndex}
      padding={padding}
      gutter={gutter}
      contained={contained}
      className={cn("vds-main", className)}
      {...rest}
    />
  );
}
