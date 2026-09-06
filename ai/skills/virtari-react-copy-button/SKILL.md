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
- The component defaults type='button', forwards its native ref and supports an explicit native type. Localize label, copyLabel, copiedLabel and errorLabel; success/failure feedback is announced in a status region.
- Clipboard copying uses navigator.clipboard.writeText and requires an available, permitted Clipboard API environment. Success feedback is set only after the write succeeds.

## Known limits and mistakes to avoid

- A consumer onClick runs before copying; preventDefault cancels the clipboard action. Use onCopied and onCopyError to observe the actual result rather than assuming onClick means success.
- Clipboard access depends on the host browser and permissions. Failure uses errorLabel; do not claim guaranteed copying. Empty strings are valid clipboard content.
- Changing text or unmounting invalidates pending feedback and callbacks. A stale asynchronous write may still finish in the browser, but it cannot update the new button state.

Related package IDs: `react-button`, `react-code`, `react-toast`. Discover their focused skills from the catalog; do not load all packages at once.
