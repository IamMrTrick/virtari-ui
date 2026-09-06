---
name: virtari-react-radio-group
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-radio-group. Exclusive choices presented as radios, fields, cards, segmented controls or pills."
---

# @virtari-packages/react-radio-group

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-radio-group`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- RadioGroup owns value/defaultValue/onValueChange, name and required. Give every RadioGroupItem, RadioField or RadioCard a stable distinct value.
- RadioGroup supplies label, description and error plus inherited size/disabled/error. RadioCard supports row and icon-grid layouts; RadioField supplies the labeled item presentation.
- Use SegmentedRadio/SegmentedRadioItem or PillRadio/PillRadioItem for the same exclusive selection semantics in compact presentations. Their state remains root-owned radio state, not independent pressed buttons.
- Use sm/md/lg sizes and the primitive orientation/direction behavior; preserve keyboard roving focus and arrow-key selection. RadioGroup, SegmentedRadio and PillRadio resolve explicit dir, then DirectionProvider, then inherited DOM direction.
- Give every group a name. Field/card option titles form their names while helper text remains separately associated. Uncontrolled native reset restores the initial selection or empty state and respects cancellation/external form ownership. Controlled reset remains application-owned; resetting to empty does not emit the string-only onValueChange callback.

## Known limits and mistakes to avoid

- SegmentedRadio is for choosing a value. If selection changes a navigable content panel, use the Tabs package and its tab/panel semantics instead.
- Do not flatten option values into labels or force every item into the Tab sequence; retain the primitive's group keyboard behavior.

Related package IDs: `react-checkbox`, `react-tabs`, `react-form`, `react-fieldset`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
