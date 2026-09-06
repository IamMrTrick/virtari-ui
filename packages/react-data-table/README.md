# @virtari-packages/react-data-table

Virtari data table — accessible React component built on CSS variables and logical properties.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Install from GitHub Packages

Create or edit `.npmrc` at the root of the consuming project:

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a token with `read:packages` permission (locally or in CI):

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install as you would any scoped package:

```bash
npm install @virtari-packages/react-data-table
# or
pnpm add @virtari-packages/react-data-table
# or
yarn add @virtari-packages/react-data-table
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari-packages/react-data-table";
```

### Product-style table shell

```tsx
import { DataTable, useDataTablePreferences } from "@virtari-packages/react-data-table";
import {
  DataTableDndProvider,
  DataTableDraggableHeaderCell,
} from "@virtari-packages/react-data-table/dnd";

const prefs = useDataTablePreferences({
  storageKey: "users-table",
  defaultValue: { viewMode: "table", pagination: { pageIndex: 0, pageSize: 15 } },
});

<DataTable.Root
  columns={columns}
  data={users}
  columnResizeMode="onChange"
  {...prefs.statePairs}
>
  <DataTable.Toolbar>
    <DataTable.ViewModeToggle />
    <div style={{ flex: 1 }} />
    <DataTable.SearchField placeholder="Search" />
    <DataTable.CustomizeButton onClick={openCustomizeDrawer} />
    <DataTable.ExportButton onClick={exportRows} />
    <DataTable.AddButton label="Add User" withChevron onClick={openAddDrawer} />
  </DataTable.Toolbar>

  <DataTable.FilterBar
    filters={activeFilters}
    onFilterClick={openFilterDrawer}
    onRemoveFilter={removeFilter}
    onAddFilter={openFilterDrawer}
  />

  <DataTableDndProvider onColumnOrderChange={prefs.statePairs.onColumnOrderChange}>
    <DataTable.Views table={<TableViewWithResizableHeaders />} />
  </DataTableDndProvider>
</DataTable.Root>
```

`useDataTablePreferences` is adapter-friendly: use `storageKey` for localStorage, or pass `value`/`onValueChange` for Zustand, React Query, or user preferences saved in a database.

### Import styles

```ts
import "@virtari-packages/react-data-table/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

## Links

- [Repository](https://github.com/IamMrTrick/virtari-ui)
- [Issues](https://github.com/IamMrTrick/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
