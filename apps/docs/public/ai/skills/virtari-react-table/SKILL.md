---
name: virtari-react-table
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-table. Native semantic table primitives with independent frame, row treatment, density, sorting indicators and sticky columns."
---

# @virtari-packages/react-table

Use the existing package and its composition API. Verify the installed version against this snapshot (2.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-table`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose TableCaption, TableHeader, TableBody, TableFooter, TableRow, TableHead and TableCell inside Table. Table renders a scrolling div containing a real table; keep valid native table nesting and place the caption before the header.
- Table's ref and generic HTML props target the outer region. Use tableRef and tableProps for the actual table element, including an accessible name when there is no caption. Label the outer scroll region separately when it is exposed as a region.
- Choose frame variant='surface|plain|bordered|ghost', rows='divided|striped|none', size='sm|md|lg', and density='compact|normal|comfortable' independently. Use component token roles to theme these axes instead of replacing cell spacing with arbitrary CSS.
- TableHead sortable adds focusability, a sort indicator, aria-sort and Enter/Space activation. Supply onClick to change application sorting and keep sortDirection synchronized; the primitive does not reorder data.
- Use align='start|center|end' and sticky='start|end' on corresponding head and body cells for logical alignment. numeric applies tabular numerals and end alignment. Use wrap when cell content must break across lines.
- For controlled filtering, server pagination, selection, virtualization and editable data, use react-data-table rather than expecting those behaviors from these presentation primitives.

## Known limits and mistakes to avoid

- loading only sets a visual dimming attribute. Announce busy/loading state and provide meaningful empty/error content explicitly.
- selected on TableRow paints selection and sets aria-selected; it does not implement selection controls, row activation or a keyboard grid. Preserve appropriate native-table semantics for the intended interaction.
- A sticky column only knows its chosen edge. Multiple columns pinned to the same edge require cumulative offsets; use DataTable for automatic column-width-aware offsets.
- The internal caption ID is not automatically assigned as the outer region's aria-labelledby. Provide explicit labels rather than assuming caption context labels both elements.

Related package IDs: `react-data-table`, `react-text`, `react-checkbox`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
