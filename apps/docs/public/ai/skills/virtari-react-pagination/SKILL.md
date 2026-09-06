---
name: virtari-react-pagination
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-pagination. Controlled zero-based pagination with page buttons, page-size selection, range information and compound or default layouts."
---

# @virtari-packages/react-pagination

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-pagination`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use Pagination.Root or PaginationRoot with page, pageSize, total and onPageChange. page is zero-based, while rendered page labels are one-based; total means total row count.
- Compose Pagination.Prev, Pages, Next, Info and PageSize within the root, or use Pagination.Default/PaginationDefault for the supplied layout.
- Update application state in onPageChange and onPageSizeChange. The root clamps the displayed/requested page to available bounds, but it does not fetch data or mutate caller state.
- Use pageSizeOptions on the root or options on PaginationPageSize. Reset or reconcile the current page when the size/filter/data count changes in the consumer.
- Use PaginationInfo renderLabel and explicit previous/next children and aria-label values for localization; the built-in defaults are English.
- computePageRange is a public pure helper for numbered ranges and ellipses. Use its exact signature and PageRangeItem type rather than recreating pagination arithmetic.

## Known limits and mistakes to avoid

- Do not pass page=1 expecting the first page, or pass a page count as total.
- Changing page size only calls onPageSizeChange; it does not automatically reset page or make remote requests.
- PaginationPages currently fixes numerical order to LTR and generates English Page N accessible labels with no formatter prop. Full localization requires an intentional custom composition or component extension.
- Pagination is an exported namespace object, not a callable JSX component; use Pagination.Root or Pagination.Default.

Related package IDs: `react-data-table`, `react-table`, `react-select`, `react-button`. Discover their focused skills from the catalog; do not load all packages at once.
