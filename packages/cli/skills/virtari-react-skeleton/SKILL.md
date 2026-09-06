---
name: virtari-react-skeleton
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-skeleton. Reserve loading geometry using rectangular or circular placeholders sized to the forthcoming content."
---

# @virtari-packages/react-skeleton

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-skeleton`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Set width and height to CSS strings or numbers interpreted as pixels. With neither specified the CSS default is full inline width and 1rem block height.
- Use circle with equal width and height for an avatar placeholder. The regular skeleton follows --vds-radius-md and circle uses the full-radius token.
- Treat skeleton shapes as decorative and place aria-busy on the region being updated. Supply one useful loading announcement separately if needed rather than repeating a status label on every skeleton.
- Reserve dimensions close to the final content to reduce layout movement when loading finishes.

## Known limits and mistakes to avoid

- Skeleton is a div and does not set aria-hidden, aria-busy or a status role automatically.
- Its CSS includes an infinite opacity pulse and no local reduced-motion rule. A consumer must not assume this component alone handles the preference.

Related package IDs: `react-avatar`, `react-card`, `react-spinner`, `react-visually-hidden`. Discover their focused skills from the catalog; do not load all packages at once.
