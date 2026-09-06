---
name: virtari-react-avatar
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-avatar. Show an image or required text fallback with stable optional identity colors and five sizes."
---

# @virtari-packages/react-avatar

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-avatar`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Provide fallback explicitly; it is rendered as supplied, not derived from a name. Supply an appropriate alt for the image, or an empty alt when adjacent text already identifies the person.
- Use size xs/sm/md/lg/xl. The avatar remains circular through shape themes because it represents identity rather than a rectangular surface.
- Use color=auto with a stable colorKey such as an application user ID for deterministic assignment to chart slots 1–8. Without colorKey the hash uses fallback. Explicit colors are neutral or strings 1–8.
- The package composes AvatarPrimitive Root, Image and Fallback internally. Pass src and root attributes to Avatar rather than attempting to supply custom image children.

## Known limits and mistakes to avoid

- Automatic color assignment has only eight buckets and does not guarantee a unique color per user.
- A short fallback can collide across users; choose a stable colorKey when color consistency matters.

Related package IDs: `react-chip`, `react-badge`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
