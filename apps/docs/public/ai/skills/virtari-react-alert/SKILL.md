---
name: virtari-react-alert
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-alert. Compose inline information, success, warning and error messages with icon, title, description and optional dismissal."
---

# @virtari-packages/react-alert

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-alert`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose AlertIcon and AlertContent inside Alert, with AlertTitle and AlertDescription inside the content. Add AlertClose only when the consumer implements dismissal state.
- Use variant for intent (info, success, warning, danger), appearance for fill (soft, solid, outline), and size sm/md/lg. Defaults are info, soft and md.
- The default role is alert for danger and status for other variants. Override role deliberately when the surrounding live-region behavior requires it; avoid duplicate announcements.
- AlertTitle renders h5. Check the surrounding heading hierarchy. Localize AlertClose aria-label, whose default is Dismiss. Use the alert and action radius tokens rather than one shared raw radius.

## Known limits and mistakes to avoid

- AlertClose only renders a button; it does not remove or hide the Alert automatically.
- AlertIcon is aria-hidden by default. Put essential meaning in visible title or description text, not only in the icon.

Related package IDs: `react-button`, `react-icons`, `react-text`. Discover their focused skills from the catalog; do not load all packages at once.
