---
name: virtari-react-timeline
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-timeline. Compose ordered event histories with indicators, connectors, status tones, timestamps and optional content cards."
---

# @virtari-packages/react-timeline

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-timeline`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Timeline renders an ol and TimelineItem renders li. Compose indicator, connector, content and optional opposite content; use TimelineTitle, Description, Meta, Media, Badge and Time within content as needed.
- Use orientation vertical/horizontal, align start/center/alternate, connector gap/touch, density compact/comfortable/spacious and size sm/md/lg. Defaults are vertical, start, gap, comfortable and md.
- Item status complete/active/pending/error/warning selects a default tone of success/primary/neutral/danger/warning respectively; tone explicitly overrides that mapping. active also sets aria-current=step.
- Choose variant default/compact/card/minimal on the root and effect none/pulse/glow/ping/spotlight on individual items. The CSS includes reduced-motion handling. TimelineCard is a styled slot with the card radius token, not the geometry-observing Card component.
- Override the root default aria-label=Timeline with localized contextual text. Supply machine-readable dateTime through TimelineTime, and verify the h3 TimelineTitle fits the page heading hierarchy.

## Known limits and mistakes to avoid

- interactive on TimelineItem only marks styling. It does not create a button, tab stop or keyboard behavior; place semantic controls inside content.
- A timeline is not a managed Stepper: it does not calculate status, navigation, current item or timestamps from a data model.

Related package IDs: `react-stepper`, `react-card`, `react-badge`, `react-text`. Discover their focused skills from the catalog; do not load all packages at once.
