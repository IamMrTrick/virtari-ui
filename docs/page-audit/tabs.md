# Tabs and SegmentedControl audit

Reviewed 2026-09-06: `TabsPage.tsx`, related `SegmentedControlPage.tsx`, and the owning `react-tabs` / `react-segmented-control` source and export maps. Followed the focused skills and component-quality contract.

## Findings and corrections

- Full-width triggers used fixed heights and non-wrapping minimum content widths. They now share the available width, wrap long labels, grow from a minimum height and keep icon/text line boxes centered. Inline SVGs receive the same reserved 18px default slot size as SegmentedControl icons. Vertical long words also wrap.
- Scrollable lists clipped outside keyboard outlines. Focus now draws inside the trigger. Forced-colors CSS preserves a selected outline and a distinct inset focus outline.
- Boxed tabs opted out of scrolling and could overflow a narrow consumer. They now scroll internally, reserving space for their inverted end curves. SegmentedControl's inline wrapper and vertical track now stay within the parent width.
- RTL automatic scrolling incorrectly clamped every horizontal position to a positive LTR range. It now uses viewport deltas and the correct negative RTL range, and responds to list resizing.
- A nested explicit LTR carousel still matched an outer RTL descendant selector. Content entrance and carousel direction now follow their own effective direction.
- Force-mounted inactive carousel slides were exposed to assistive technology and keyboard focus. They now have `aria-hidden` and native `inert`; the property is applied through the slide ref for compatibility with React 18's attribute serialization.
- Existing segmented outer/item/indicator radius roles were already coordinated. Those roles were retained and checked across sharp, soft, round and pill modes rather than replaced with arbitrary radii.
- Documentation tablists and radio groups now have accessible names. Tabs demonstrates the exported 3xl size and uses the package Switch for indicator animation. The related segmented page adds a narrow RTL long-label example and makes the individually disabled example interactive via uncontrolled selection.

## Evidence

- `apps/docs/tests/tabs-quality.html` / `.tsx`: **590/590 passed** in Chromium with package styles only. Covers 36 scoped light/dark/OLED × surface-style × radius combinations for Tabs and SegmentedControl; wrapping, centering, intrinsic icon sizing, indicator dimensions/position/radii, focus inset, narrow LTR/RTL/boxed scrolling, vertical long words, inactive carousel focus exclusion, nested direction, radio serialization/reset and consumer cancellation.
- Rendered screenshots inspected for light and dark track geometry and RTL keyboard focus. An actual ArrowLeft on the RTL tablist skipped its disabled middle item, selected Third and displayed an unclipped focus outline.
- The updated Tabs documentation route loads with its named package Switch. The related SegmentedControl page is source-reviewed; it is not registered as a standalone route in the current page manifest.
- `pnpm --filter @virtari-packages/react-tabs typecheck` and `pnpm --filter @virtari-packages/react-segmented-control typecheck` passed. Scoped `git diff --check` passed.

## Integration and remaining limits

Root must build both packages (SegmentedControl's published CSS includes Tabs CSS), then perform the required shared AI generation/checks. Suggested curated guidance: full-width wrapping/minimum heights, reserved icon size, RTL auto-scroll, and TabsPanels inactive-slide inert behavior. The general warning about custom force-mounted/offscreen content still applies outside TabsPanels.

This was a focused Chromium package audit, not a Safari/Firefox or screen-reader certification. Forced-colors and reduced-motion rules were source-reviewed; OS high-contrast rendering, touch carousel gestures, and custom forceMount animations were not exercised. Semantic color roles were retained, so this change does not claim a new contrast measurement. Full-width labels may break very long words in narrow columns; ordinary non-full-width lists intentionally scroll.
