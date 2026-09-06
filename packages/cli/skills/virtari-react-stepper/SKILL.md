---
name: virtari-react-stepper
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-stepper. Ordered progress-step display with automatic step statuses, optional error overrides and coordinated indicators/connectors."
---

# @virtari-packages/react-stepper

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-stepper`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Stepper with direct StepperStep children and a zero-based activeStep. Stepper injects each direct child's index and derives complete/active/pending status from that order.
- Give every step a label and optional description; use status=error for a failed step or indicator to replace its number/check/error graphic.
- Use orientation, size, variant, tone, animation and line on Stepper. The active list item receives aria-current=step; give the ordered list an appropriate localized aria-label.
- Treat this as progress presentation. Implement validated next/back actions and actual form/page state separately; the component itself does not navigate or validate steps.

## Known limits and mistakes to avoid

- A clickable li is not automatically an accessible step navigation button. Compose deliberate interactive content when users can revisit steps.
- Wrappers and fragments are not recursively expanded into StepperStep children for index injection. Keep steps directly under the root and use stable React keys.
- activeStep is not automatically clamped. Choose a deliberate completed-workflow representation when it exceeds the final index and ensure progress text describes that state.
- A custom indicator can replace the visible number/error icon; preserve understandable status information rather than relying on color alone.

Related package IDs: `react-form`, `react-button`, `react-progress`, `react-tabs`. Discover their focused skills from the catalog; do not load all packages at once.
