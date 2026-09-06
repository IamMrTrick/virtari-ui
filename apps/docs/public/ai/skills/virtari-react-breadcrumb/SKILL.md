---
name: virtari-react-breadcrumb
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-breadcrumb. Breadcrumb landmark supporting compound links and current-page content, array-driven collapsing and optional structured data."
---

# @virtari-packages/react-breadcrumb

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.1); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-breadcrumb`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use either items on Breadcrumb or the BreadcrumbList > BreadcrumbItem > BreadcrumbLink/BreadcrumbPage composition. Providing items takes precedence over children.
- The array renderer treats the last item as the current page even when it has href; omit href for other intentionally non-link entries. Give a non-string label an explicit name when generating SEO data.
- Place BreadcrumbSeparator between item siblings in BreadcrumbList; separators are presentational. Use BreadcrumbHome for the home shortcut and localize its label when icon-only.
- maxItems with itemsBeforeCollapse and itemsAfterCollapse controls array-mode collapsing. BreadcrumbEllipsis with items creates a dropdown; without items it is only decorative.
- Use BreadcrumbLink asChild with one router-link element that forwards props/ref. Keep leading icons explicitly decorative so the component can place its icon and label slots consistently.

## Known limits and mistakes to avoid

- seo only works with items. seoBaseUrl resolves relative URLs but does not make untrusted content safe.
- SEO script serialization escapes less-than characters before HTML embedding, preserving JSON data without emitting literal script terminators. This does not validate consumer URLs or certify the structured data for search engines.
- Do not render a second nested anchor inside BreadcrumbLink or make BreadcrumbPage clickable; use actual links for ancestors and current-page semantics for the final location.

Related package IDs: `react-nav`, `react-dropdown-menu`, `react-icons`, `primitives`. Discover their focused skills from the catalog; do not load all packages at once.
