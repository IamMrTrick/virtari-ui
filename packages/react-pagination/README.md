# @virtari-packages/react-pagination

Virtari pagination — headless, controlled React component with page numbers, ellipsis, and a page-size select.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Demo

Live examples in the docs app:

- Default layout + controlled state + sizes + composed custom layout → [`http://localhost:5173/#/pagination`](http://localhost:5173/#/pagination)
- DataTable adapter (`<DataTable.Pagination />`) → [`http://localhost:5173/#/data-table-users`](http://localhost:5173/#/data-table-users)

Run the docs locally:

```bash
pnpm -C apps/docs dev
```

Demo source: [apps/docs/src/pages/PaginationPage.tsx](../../apps/docs/src/pages/PaginationPage.tsx)

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
npm install @virtari-packages/react-pagination
# or
pnpm add @virtari-packages/react-pagination
# or
yarn add @virtari-packages/react-pagination
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { Pagination } from "@virtari-packages/react-pagination";
import "@virtari-packages/react-pagination/styles";

function MyList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  return (
    <Pagination.Default
      page={page}
      pageSize={pageSize}
      total={totalRows}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      pageSizeOptions={[10, 25, 50, 100]}
    />
  );
}
```

For granular layouts, compose the individual parts:

```tsx
<Pagination.Root page={page} pageSize={pageSize} total={total} onPageChange={setPage}>
  <Pagination.Info />
  <Pagination.Prev />
  <Pagination.Pages />
  <Pagination.Next />
</Pagination.Root>
```

### Import styles

```ts
import "@virtari-packages/react-pagination/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables and defines its own `--vds-pagination-*` tokens. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

- Semantic `<nav aria-label="Pagination">` with `aria-current="page"` on the active page button
- Prev/Next buttons disabled at the bounds, labelled `Previous page` / `Next page`
- All layout uses logical CSS properties (`padding-inline`, `margin-inline-start`, …)
- Chevrons flip under `:dir(rtl)`; numeric buttons stay LTR so digit order reads naturally

## Links

- [Repository](https://github.com/Virtari-Packages/virtari-design-system)
- [Issues](https://github.com/Virtari-Packages/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
