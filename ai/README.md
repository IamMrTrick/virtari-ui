# Virtari for AI agents

Use Virtari's actual packages, design rules and examples through a small skill, a searchable MCP tool, or plain files. All three use the same repository-derived snapshot. This is reference knowledge, not model training.

Load foundation CSS in this order: `@virtari-packages/core` first (it declares cascade layer order), then `@virtari-packages/tokens`, followed by the exported component styles and optional `@virtari-packages/utilities`.

## Start with a skill

Open `ai/skills/virtari-design-system/SKILL.md` to choose a package or foundation skill. Each package has `ai/skills/virtari-<package-folder>/SKILL.md`; foundation skills cover colors, shape, spacing, sizing, typography, motion, surfaces, imports, CSS utilities, layout, scrolling/focus and JavaScript utilities.

For consumer projects, the public CLI carries the same generated bundle. `virtari init` installs all skills under `.agents/skills` and adds a managed `AGENTS.md` block by default. `virtari skills list`, `virtari skills add`, and `virtari skills sync` provide explicit discovery, focused installation, and refresh workflows. The managed contract requires component discovery before implementation and prohibits application-local token or utility invention.

Copy the **entire selected skill directory**, including `references`, to the skill location supported by your AI host when the host does not read project-local skills. A repository copy is also directly readable by coding agents. The router's index names other skills; install the selected ones alongside it as needed. References include export maps, source type declarations, package rules, known limitations and dedicated documentation examples.

## Connect MCP locally

Requirements: Node.js 20+ and pnpm. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm ai:build
pnpm mcp:build
pnpm mcp:test
```

In a host supporting local stdio MCP, configure the executable directly. Replace the absolute path below with your checkout or copied built server path:

```json
{
  "mcpServers": {
    "virtari": {
      "command": "node",
      "args": ["/absolute/path/virtari-design-system/apps/mcp/dist/server.mjs"]
    }
  }
}
```

This is a common host configuration shape, not part of the MCP wire specification. Use your host's equivalent server settings if its format differs. Launch the built Node executable rather than a package-manager build command: stdout must contain only protocol messages. The build contains its catalog and source snapshot and can run from a different working directory. See `apps/mcp/README.md` for the tested protocol and transport combinations.

Tools share a small contract:

1. `list_records`: choose `packages`, `sections`, `tokens`, `utilities`, `examples` or `sources`; search/filter, then follow `nextOffset`.
2. `get_record`: retrieve one exact collection ID.
3. `read_source`: read an allowlisted source ID in bounded text chunks. Continue until the full needed context is read.

For example, find `react-input`, inspect its exported API and pitfalls, retrieve an example ID, then read the complete page to obtain imports and helper state. Token results include scope, conditions and original expressions. Utility IDs are literal class names, such as `md:vds-u-grid-cols-3`. CSS utilities do not support Tailwind's arbitrary-value or state-variant syntax. Core accessibility helpers belong to the core stylesheet.

The server is read-only. It does not write projects, run package scripts, fetch arbitrary URLs, or publish anything. Resources and prompts supplement tools; hosts differ in their support for those optional interaction surfaces. Local stdio is not a remote HTTP endpoint. Browser-only/cloud hosts need a separately deployed compatible service; none is deployed by this repository setup.

## Plain files and documentation

- `ai/catalog.json`: versioned records with source IDs and provenance.
- `ai/sources.json`: source text keyed by the catalog allowlist; no machine-specific paths.
- `ai/authoring/*.json`: reviewed, domain-specific guidance and current limitations.
- `ai/contract.md`: schema and ownership conventions.
- Documentation serves `/llms.txt`, `/ai/index.md`, `/ai/catalog.json`, `/ai/sources.json` and `/ai/skills/...` from the same generated snapshot.
- The Utilities category exposes exact classes and token definitions for people browsing the documentation.

Documentation examples are real source, not guaranteed standalone snippets. Extracted sections may depend on page imports, state, helper components, documentation CSS and assets. Read the complete source and adapt the surrounding layout. Source availability does not grant a license beyond the corresponding package/repository terms.

## Maintain and verify

```sh
pnpm ai:build     # regenerate deterministic catalogs, skills and static documentation
pnpm ai:check     # fail on source drift or incomplete package guidance
pnpm ai:test      # skill/reference integrity and source/example coverage
pnpm mcp:build
pnpm mcp:test     # real transport and catalog behavior
```

Edit actual package sources and `ai/authoring` guidance; do not hand-edit generated files. Update guidance when fixing a documented limitation. Generated imports come from package export maps, not generic README examples. Inventories preserve source expressions and duplicate scoped declarations: they are not a promise of computed pixels or contrast compliance in arbitrary application layouts.

Standards and compatibility rationale: `docs/ai-standards.md`. The common knowledge contract makes behavior consistent across integrations; it cannot guarantee identical output from every AI model or automatic support in every client.
