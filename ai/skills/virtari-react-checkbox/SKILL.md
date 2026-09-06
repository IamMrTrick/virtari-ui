---
name: virtari-react-checkbox
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-checkbox. Independent selection controls, labeled fields, cards, groups and pill choices."
---

# @virtari-packages/react-checkbox

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-checkbox`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Checkbox uses checked/defaultChecked/onCheckedChange from the checkbox primitive, including indeterminate state. Use CheckboxField for label/description or CheckboxCard for row/icon-grid selectable cards.
- CheckboxGroup supplies group label, description, error, required indication and orientation. Descendants inherit disabled/error; each checkbox still owns its selection state and should receive its own submission name/value explicitly.
- Use PillCheckbox with PillCheckboxItem for multiple independent pill choices. State belongs on each item, not a root value array. Provide an accessible name for the group and each choice.
- Checkbox and pill sizes are sm/md/lg. Keep indicator geometry and radii in the shared tokens rather than replacing the checkbox with a styled div.

## Known limits and mistakes to avoid

- CheckboxGroup.required is group ARIA/visual guidance, not an at-least-one selection validator. Implement that rule explicitly and show the group error.
- The group's name is stored in context but current Checkbox/PillCheckboxItem do not consume it. Pass name directly to items for native submission.
- Use a checkbox for independent choices; an exclusive set belongs in RadioGroup, and an immediate on/off setting may belong in Switch.

Related package IDs: `react-fieldset`, `react-form`, `react-radio-group`, `react-switch`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
