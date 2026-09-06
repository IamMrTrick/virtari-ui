# Radio group page audit

Reviewed `apps/docs/src/pages/RadioGroupPage.tsx`, the public exports and source of `packages/react-radio-group`, and its radio-group primitive dependency against the design and component quality contracts.

## Corrections

- Primitive roots omitted `data-orientation`, so package orientation styles did not follow the keyboard orientation. The primitive now publishes it. A horizontal group only styles its own item container, preserving nested groups.
- Native reset only affected hidden inputs and left uncontrolled visible selection unchanged. The primitive now restores `defaultValue` (including an initially empty group), honors canceled resets and actual external form owners, and preserves consumer-controlled values. Composed root refs remain intact. Reset to empty does not call the string-only selection callback.
- Built-in fields/cards previously included descriptions and price text in their accessible names. Their title and help now have separate associations; explicit names take precedence. Groups merge consumer help IDs with their own help/error IDs. Rich demo cards have explicit concise names, and usage snippets name every group.
- The error paragraph's margin reset erased its intended gap. Visible errors now receive the group gap. Group headings/help use readable multiline line heights. Fields align to the first label line, and row cards derive radio alignment from the line box instead of a fixed offset.
- Fixed-height, no-wrap pills/segments could clip or overflow long labels. They now use minimum heights, symmetric padding and wrapping. Equal grid columns keep a long segmented choice from squeezing its neighbor into individual letters. Card text/prices wrap, and icon-grid radios occupy a reserved row instead of overlapping icons in narrow cards.
- Focus now includes the existing semantic ring outline, including error ring roles, with forced-colors overrides preserved. Reduced motion removes radio spring/press animation and card/error transitions.
- The page's rigid 3-column and 22rem grids now fit narrow containers, and its label translation override was removed. Static focus cards now reference real focus tokens. Existing semantic surface and scoped radius roles remain in use.

## Files and evidence

- Owning package: `RadioGroup.tsx`, `RadioField.tsx`, `RadioCard.tsx`, corresponding CSS plus `PillRadio.css`, `SegmentedRadio.css`, and README usage contracts.
- Dependency authorized by root: `packages/primitives/src/radio-group/radio-group.tsx`.
- Page: `apps/docs/src/pages/RadioGroupPage.tsx`.
- Standalone fixture: `/tests/radio-group-quality.html` and `.tsx`, importing core, tokens and package styles without docs CSS.
- Chromium fixture: **33/33 checks passed** for selected form serialization; uncontrolled, empty, controlled and external resets; cancellation; LTR/RTL arrow selection and disabled skipping; consumer key handlers; naming/help composition; error spacing; orientation; disabled controls and narrow long-content containment.
- Rendered screenshots inspected for light/bordered/sharp, dark/tonal/round/RTL and OLED/elevated/round specimens: title/helper spacing, card price wrapping, nonoverlapping icon/radio layout, pill wrapping, equal segmented columns and readable short labels. Existing text color roles were not changed.
- `pnpm --filter @virtari-packages/primitives build`, radio-group `typecheck` and `build` passed. `git diff --check` passed. Docs fixture typecheck has no radio-group errors but remains blocked by the concurrently edited `copy-quality.tsx` package resolution/types; root owns that integration.

## Limits / shared guidance

Controlled reset is consumer-owned; handle the form's reset event to change controlled state. All items in one externally associated group should share a form owner. Rich card content must be noninteractive and explicitly named.

Coordinator follow-up fixed the direction limitation found during this review: all three styled radio roots now share useRadioDirection, resolving explicit dir, then DirectionProvider, then inherited DOM direction. `/tests/radio-direction-quality.html` passed 18 Chromium checks for native/live ancestor direction, override precedence and forwarded refs across RadioGroup/PillRadio/SegmentedRadio. Focused radio typecheck passed. The docs fixture typecheck also now passes after declaring its direct CopyButton dependency.

Forced-colors, reduced-motion, required browser validation focus, other browser engines and screen-reader speech were source-reviewed, not separately emulated or certified. This is focused package/browser evidence, not an exhaustive combination matrix. Root should add the naming/reset/direction contracts to curated AI guidance and perform final AI generation/checks.
