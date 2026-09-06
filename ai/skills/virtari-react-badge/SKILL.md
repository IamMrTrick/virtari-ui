---
name: virtari-react-badge
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-badge. Show compact status labels, counts, presence dots and removable tags with independent intent and appearance."
---

# @virtari-packages/react-badge

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-badge`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use color for primary/success/warning/danger/info/accent/neutral intent and variant for soft/solid/outline/subtle/soft-outline appearance. Default is primary soft at size md; sizes are xs/sm/md/lg.
- Use leftSection and rightSection for controlled icon spacing. dot replaces leftSection; onRemove replaces rightSection. dotOnly suppresses label and both sections.
- Use shape=pill for the badge role or shape=square for the navigation-item radius role. Square does not mean a guaranteed zero radius; it follows the active theme.
- Give removable badges a contextual, localized removeLabel. The remove button stops click propagation before invoking onRemove. Provide an accessible name or adjacent explanation for meaningful dot-only status.
- Long badge text wraps and section icons retain their geometry. asChild retains the supplied element even in dotOnly mode and honors its prevented click; use an actual button or link for keyboard interaction.

## Known limits and mistakes to avoid

- Deprecated variants default/secondary map to neutral soft, and destructive maps to danger soft; use the explicit current color and variant API.
- An onClick on the default span enables visual interaction styling but does not provide button keyboard semantics. Use asChild with a real interactive element when appropriate, and never nest the remove button inside another button.

Related package IDs: `react-chip`, `react-button`, `react-icons`. Discover their focused skills from the catalog; do not load all packages at once.
