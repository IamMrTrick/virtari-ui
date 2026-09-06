# Checkbox review

Reviewed route: `/#/checkbox`. Ownership: `apps/docs/src/pages/CheckboxPage.tsx`, `packages/react-checkbox/**`, and the checkbox primitive (additional shared-source authorization from the coordinator).

## Findings and corrections

- State examples used unnamed primitive checkboxes beside unassociated text, with page-specific optical offsets. They now use `CheckboxField`, provide distinct accessible names, and state clearly that hover/focus previews are simulated. Initial checked examples can be toggled. The actual keyboard-focus card no longer relies on undefined preview tokens.
- Documentation frames now use package `Card` surfaces. Narrow frame minimums and the integration grid can shrink to their container. The stale future availability date was replaced with a plan limitation. Required examples explicitly mark mandatory items, and the usage text distinguishes a group indication from form validation.
- `CheckboxGroup` and `PillCheckbox` advertised a name but never passed it to native submission inputs. Items now inherit the group name unless they supply their own; nested pill groups preserve enclosing disabled/error/name context.
- Field and card labels now name the checkbox separately from associated descriptions. Card badges and trailing metadata remain available through descriptions, as do group help/error messages. Consumer accessible names and additional description references are preserved. Pill invalid state now reaches the focusable item.
- Pill items had fixed heights, asymmetric block padding, nowrap text and selection conveyed only by color. They now use minimum heights, symmetric padding, wrapping labels and reserved check/mixed marks. Field rows have a 24px minimum target. Card trailing content can wrap; checkbox alignment derives from the first line box instead of a fixed offset. The check glyph's forced vertical displacement was removed.
- Checkbox and pill keyboard focus now consume their semantic ring roles. Checkbox checked/mixed marks remain visible in forced colors. Reduced motion now suppresses selection scale/animations and card/group transitions.
- The checkbox primitive reset listener ignored cancellation, and externally associated controls did not forward their form association to the focusable trigger. Reset state restoration now waits until event dispatch ends and respects cancellation; external form association reaches the trigger and resets its state.

## Evidence

- Package fixture: `apps/docs/tests/checkbox-quality.html` / `.tsx`, importing core/tokens and checkbox styles without documentation CSS.
- Final Chromium fixture result after refreshing the primitive dependency cache: **88 passed, 0 failed**, including canceled reset and external form reset.
- Chromium inspection of the documentation state matrix, icon cards and pills; actual Space toggling and Enter non-toggling; visible keyboard ring confirmed with `:focus-visible` and screenshot.
- Fixture covers native submission, shared and overridden names, label activation, uncontrolled reset, canceled consumer clicks, required validation, disabled/invalid context, accessible label/helper references, long Persian/Latin text, and first-line alignment in 230px hosts. Nine scoped light/dark/dark-oled and bordered/tonal/elevated combinations exercise LTR and RTL.
- Measured description/badge/selected-pill text contrast: minimum 7.06:1 over the composed test surfaces, using the coordinator's updated shared semantic tokens.
- `pnpm --filter @virtari-packages/react-checkbox typecheck`: passed.
- `pnpm --filter @virtari-packages/primitives build`: passed, including declaration compilation.
- `git diff --check` for owned files: passed.

## Remaining limits and integration

- Group `required` is not an at-least-one validator. Compact bare controls remain 14/18/22px; labeled fields/cards supply larger targets. Group/item state remains individually controlled, rather than a root selection array.
- Forced colors and reduced motion were inspected in source, not emulated in the browser. Safari and assistive-technology speech output were not tested. Responsive evidence is the narrow package fixture, not a full mobile documentation viewport run.
- Coordinator must regenerate knowledge. Update `ai/authoring` checkbox guidance to remove the obsolete group-name noninheritance limitation and describe inherited names, helper/error references, pill state marks/wrapping and reset behavior. No generated knowledge was edited by this worker.
