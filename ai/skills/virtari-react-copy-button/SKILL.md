---
name: virtari-react-copy-button
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-copy-button. Clipboard action with native button semantics, built-in icons and a temporary copied label."
---

# @virtari-packages/react-copy-button

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-copy-button`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import CopyButton from @virtari-packages/react-copy-button and its /styles. Pass required text; optional label renders beside the icon and copiedLabel replaces it during success feedback.
- Use copyButtonSize, not size: supported values are 2xs/xs/sm/md/lg. variant is ghost/outline/soft and defaults ghost; feedbackMs defaults 2000 milliseconds.
- The component supplies type='button' and an accessible label that changes on successful copying. Localize label/copiedLabel for the application language and keep native disabled/ref attributes when needed.
- Clipboard copying uses navigator.clipboard.writeText and requires an available, permitted Clipboard API environment. Success feedback is set only after the write succeeds.

## Known limits and mistakes to avoid

- Current props spreading places a consumer onClick after the built-in handler, so supplying onClick replaces copying rather than composing with it. Do not add an onClick merely to observe copy success.
- Clipboard failure is currently silent and there are no onCopy/onError callbacks. Do not claim guaranteed copying or announce success independently of the actual result.
- Empty text is ignored; the component does not write an empty clipboard value.

Related package IDs: `react-button`, `react-code`, `react-toast`. Discover their focused skills from the catalog; do not load all packages at once.
