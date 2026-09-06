# Virtari knowledge contract

The source of truth is package source plus reviewed `authoring/*.json` guidance. Run `pnpm ai:build` after changing either; `pnpm ai:check` detects drift. Generated files must not be edited manually.

`catalog.json` uses `schemaVersion: 1` and the collections `packages`, `sections`, `tokens`, `utilities`, `examples`, `sources`. Each record has a unique `id` within its collection. Source IDs are repository-relative POSIX paths. `sources.json` maps these allowlisted IDs to exact UTF-8 text (normalized LF). No filesystem paths supplied by clients are opened.

- Packages: `id`, `name`, `version`, `category`, `description`, `exports` (package.json export map), `publicSymbols`, `sourceIds`, `exampleIds`, `guidance`, `pitfalls`, `related`, `skill`.
- `externalReexports` records dependency export-star surfaces with installed versions, symbol counts and allowlisted generated export-index source IDs. Explicit local exports take precedence. The dependency index is generated from installed declaration files under the locked dependency version.
- Sections: `id`, `name`, `description`, `sourcePaths`, `guidance`, `pitfalls`, `skill`.
- Tokens: `id`, `name`, `value`, `selector`, `conditions`, `category`, `sourceId`, `line`. Repeated declarations are retained because selector, theme and container scope matter. Values are source expressions, not claimed computed pixels.
- Utilities: `id` (literal HTML class, including responsive prefix), `className`, `category`, `declarations`, `breakpoint`, `condition`, `sourceId`. Only emitted classes are valid; no Tailwind arbitrary-value parser is implied.
- Examples: `id`, `title`, `page`, `packageIds`, `sourceId`, `startLine`, `endLine`, `code`, `imports`. Extracted sections may depend on page helpers; read the complete source before adapting them.
- Sources: `id`, `sha256`, `bytes`, `kind`. Content is retrieved separately and in bounded chunks.

Package/section guidance is authored in JSON by domain reviewers using the same fields. Missing package guidance, unknown related package IDs, missing source paths and duplicate IDs fail generation. All package skills and section skills use the Agent Skills name/description format and link focused references. Skills are reference instructions; they do not grant permission to execute commands or publish.

The MCP server, static AI documentation and documentation UI consume this catalog contract. Collection lookup and source retrieval are read-only and paginated. Standard MCP resources and prompts supplement the tools; critical information is available through tools even in hosts without a resource picker.
