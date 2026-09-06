# AI integration standards

Reviewed **2026-09-06** against official specifications and the npm registry. These are implementation recommendations for Virtari; they do not imply that every AI client exposes the same features or produces identical UI.

## Version baseline

| Item | Verified status | Implementation consequence |
| --- | --- | --- |
| MCP `2026-07-28` | Current released specification; `/specification/latest` redirects here | Use the dated specification when reviewing wire behavior. |
| MCP `2025-11-25` and earlier | Earlier, initialization-based revisions | Supporting these clients is an explicit compatibility feature. |
| TypeScript `@modelcontextprotocol/server` and `@modelcontextprotocol/client` | Both npm `2.0.0`; official SDK calls v2 the stable line | New integrations can use the split SDK; server package requires Node.js 20+. |
| TypeScript `@modelcontextprotocol/sdk` | npm `1.30.0`; Node.js 18+ | This is the maintained v1 package, not the current v2 package name. |

The official SDK commits to v1 bug and security fixes for at least six months after v2 release. Pin the chosen dependency and lockfile; do not combine v1 initialization examples with v2 request envelopes. An unmerged proposal or a draft specification is not a released requirement. [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28), [official TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).

Registry verification used `pnpm view <package> version` and `pnpm view <package> engines --json` for the three packages above. Recheck at dependency upgrades.

## Portability and transport

Modern MCP places version and client capabilities on each request and requires server discovery support. Earlier clients begin with `initialize`. Supporting one era does not automatically support the other: use SDK compatibility support where available and test both actual request paths before claiming both. A legacy client cannot automatically upgrade itself to a modern-only server. [Versioning and compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning).

- **Local stdio:** appropriate for a repository or installed package. The host launches the process. Reserve stdout for protocol messages; diagnostics belong on stderr. The executable and all needed catalog files must be present on the host filesystem. [stdio binding](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio).
- **Remote Streamable HTTP:** appropriate when the client cannot launch local processes. It requires a reachable endpoint and a separate deployment decision. Validate transport requirements, origin handling and authorization for the deployed service. A docs URL or a stdio process is not a remote MCP endpoint. [Streamable HTTP binding](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http).
- **No MCP support:** provide readable Markdown and a versioned machine-readable catalog. This is a useful fallback, not automatic tool registration.

Host applications decide how to expose resources, prompts and tools. Therefore, essential component lookup should remain available through ordinary read-only tools even when equivalent resources exist. Do not make an optional UI extension or a resource picker the only route to critical documentation. [Resources interaction model](https://modelcontextprotocol.io/specification/2026-07-28/server/resources).

## One knowledge source, several entry points

CSS integration also has an ordering contract: load Virtari core before token and component sheets, matching the documentation application. Core's first import declares the layer order. CSS establishes layer ordering at first appearance, so a later layer statement cannot reliably repair an order established by earlier sheets. [CSS Cascade layer ordering](https://www.w3.org/TR/css-cascade-5/#layer-order).

For Virtari, use one catalog shared by documentation, skills and the read-only MCP server. Package records should link actual exports, source files, styles, examples, tokens and authored usage guidance. Preserve source provenance and package versions. Generate inventories from repository sources; keep behavioral guidance authored and reviewed.

Small package skills should route to the relevant catalog section, not repeat thousands of variables. Search should return concise matches with stable IDs; a subsequent read retrieves the chosen detail. Return explicit pagination or truncation metadata when a result is bounded. These are Virtari architecture decisions for keeping context useful and preventing drift.

## MCP feature contract

| Feature | Standard role | Virtari application |
| --- | --- | --- |
| Tools | Model-callable operations with named input schemas | Search packages, inspect tokens/utilities, retrieve examples and guidance. |
| Resources | Addressable context with URI and MIME type | Read catalog entries and Markdown without a browser session. |
| Prompts | User-selected, argument-driven message templates | Optional build/review workflows using the same source records. |

Use valid JSON Schema objects for tool inputs; the default dialect is 2020-12. Declare required fields and bounded parameters. When using an output schema, return conforming `structuredContent` and a serialized text counterpart for compatibility. Give read-only tools honest annotations; annotations are hints, not access control. Tool names must be unique within the server. [Tools specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools).

Resource URIs must resolve deterministically. A custom scheme can identify catalog records; it need not expose machine-specific absolute paths. Validate IDs/URIs and serve only catalog-approved content. Declare only implemented resource capabilities; do not advertise subscriptions for a static catalog. [Resources specification](https://modelcontextprotocol.io/specification/2026-07-28/server/resources).

Prompts must validate their arguments and return supported message roles/content. Keep these workflows optional and task-specific; a retrieved example is reference content, not permission to run commands or publish changes. [Prompts specification](https://modelcontextprotocol.io/specification/2026-07-28/server/prompts).

## Portable skills

Each skill is a directory with `SKILL.md`, YAML frontmatter and Markdown guidance. The required `name` is 1–64 lowercase alphanumeric/hyphen characters, matches its directory, and has no leading/trailing or consecutive hyphens. Required `description` is 1–1024 characters and explains when to use the skill. Optional `compatibility` is at most 500 characters; `metadata` maps strings to strings.

Use progressive disclosure: discovery metadata first, focused instructions next, detailed references only when relevant. The specification recommends fewer than 5,000 body tokens and 500 lines; these are ceilings, not targets. Use relative reference links. The `allowed-tools` field is experimental and client-dependent, so it cannot establish universal permissions. Client-specific UI files are optional adapters, not the portable skill contract. [Agent Skills specification](https://agentskills.io/specification).

## Verification required before release

1. Validate every skill's metadata and resolve its reference links.
2. Check catalog completeness against current package exports, token sources and example files; fail on stale generated artifacts.
3. Exercise discovery, tool schemas, representative reads, unknown IDs, malformed inputs and resource reads through the actual SDK transport.
4. Verify packaged artifacts from a different working directory; repository-relative assumptions must not silently break installed consumers.
5. Record tested client/protocol/transport combinations. Separate protocol conformance from real client integration tests and from visual/accessibility checks on generated UI.

These checks are Virtari's release criteria. Passing them supports a precise compatibility claim; it does not prove every model has learned the system or that all future generated interfaces will be correct.
