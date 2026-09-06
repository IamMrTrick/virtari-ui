# Virtari CLI

Install editable Virtari component source directly into a React project.

```bash
pnpm dlx virtari@latest init
pnpm dlx virtari@latest add button input dialog
pnpm dlx virtari@latest add virtari-utilities
pnpm dlx virtari@latest add virtari-all
```

Run `pnpm dlx virtari@latest list` to discover every installable item. Pass one
name for a single component, several names for a feature set, or `virtari-all`
for the complete component collection and utility stylesheet.

The source is written to `src/virtari` by default. Change `target` in
`virtari.json` to move the complete tree. Internal imports are relative, so the
source remains portable and does not depend on Virtari runtime packages.

Use `virtari diff button` before updating an edited component. Existing changed
files are never overwritten unless `--overwrite` is supplied explicitly.

The same items are available through the official shadcn GitHub registry
protocol:

```bash
pnpm dlx shadcn@latest add Virtari-Packages/virtari-design-system/button#cli-v0.1.1
```

The CLI reads the matching release tag by default. Set
`VIRTARI_REGISTRY_TOKEN` for an authenticated private GitHub source registry.
