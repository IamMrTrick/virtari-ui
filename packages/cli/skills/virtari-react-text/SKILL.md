---
name: virtari-react-text
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-text. Apply shared typography while keeping text element semantics and heading levels separate from visual size."
---

# @virtari-packages/react-text

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-text`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Text defaults to a p at size 3 and supports as=p/span/div/label/strong/em or asChild. Heading defaults to h2; set level for semantic hierarchy and size independently for visual hierarchy.
- Text and Heading sizes are strings 1 through 9, not sm/md/lg. Heading default sizes for levels 1–6 are 8/7/6/5/4/3.
- Use normal/medium/semibold/bold weights and semantic tones. Use align=start/end for directional alignment and choose leading and wrapping according to the actual content.
- truncate and nowrap may hide information visually; provide another available way to read essential full content. Use asChild with one child that accepts the forwarded props and preserves valid HTML semantics.

## Known limits and mistakes to avoid

- Changing Heading size does not change its semantic heading level. Do not choose h1–h6 merely to obtain a font size.
- Text and Heading do not have identical leading values: Text additionally supports loose; Heading has tracking. Use react-label for form labels when native label-specific props are needed.

Related package IDs: `react-label`, `react-layout`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
