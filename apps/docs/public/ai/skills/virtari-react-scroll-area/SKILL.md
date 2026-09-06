---
name: virtari-react-scroll-area
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-scroll-area. Native scrolling viewport with styled smart-hiding scrollbars, optional edge masks, arrows, drag, infinite-scroll sentinel and marquee."
---

# @virtari-packages/react-scroll-area

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-scroll-area`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use ScrollArea with a constrained block/inline size and shrinking flex/grid ancestors. orientation chooses vertical, horizontal or both; smart is the default scrollbar type and reveals overflow scrollbars on scroll, hover or keyboard focus.
- Use viewportRef to read or restore native scroll position and viewportProps for viewport labels, events and tabIndex. The component ref targets the inner primitive root, while className/style belong to the outer wrapper.
- Use scrollHideDelay to change the smart reveal delay, default 900ms. Keep the default focusable viewport or supply an appropriate explicit keyboard-access policy.
- Horizontal orientation enables wheelToHorizontal by default; opt out when vertical wheel scrolling should continue to the page. Arrow buttons are supported only on a single axis and arrowStep=page moves 85 percent of the viewport.
- onEndReached uses an IntersectionObserver sentinel and endThreshold; consumers must guard fetching against duplicate requests, loading state and exhaustion.
- Marquee is a distinct presentation mode: it duplicates children, disables drag/arrows/wheel conversion/infinite scroll, and can pause on hover/focus. Use it for noninteractive repeated content.

## Known limits and mistakes to avoid

- Content that grows without a bounded viewport cannot overflow; adding ScrollArea alone does not create an internally scrolling page.
- Do not restore scrollTop on the public root ref: obtain the actual native viewport through viewportRef.
- The marquee's duplicate copy is aria-hidden but not inert, so duplicated interactive descendants can still enter the tab order. Avoid interactive controls and duplicate IDs in marquee content.
- arrows are ignored for orientation=both. Enabling marquee overrides the other interaction features rather than combining them.
- JavaScript arrow scrolling requests smooth behavior directly; CSS reduced-motion rules alone do not prove that this path avoids animated scrolling.

Related package IDs: `react-layout`, `react-sidebar`, `react-carousel`, `primitives`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
