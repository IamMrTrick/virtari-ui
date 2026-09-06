# Virtari MCP

Read-only access to the same generated knowledge used by Virtari skills and documentation. The server runs locally over stdio on Node.js 20 or later. It never opens client-supplied paths or URLs and does not modify the project.

## Build and connect

From the repository root:

```sh
pnpm install
pnpm ai:build
pnpm mcp:build
pnpm mcp:test
```

Add the following server definition to an MCP host that supports launching local stdio processes. Replace the path with the absolute path of your checkout. The containing configuration key may differ between hosts.

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

On Windows a forward-slash path such as `C:/work/virtari-design-system/apps/mcp/dist/server.mjs` is valid. If the host cannot find Node, use its absolute executable path for `command`. Launch the executable directly; package-manager progress output must not enter MCP stdout.

The build copies a verified `catalog.json` and `sources.json` into `dist/data`. Runtime loading is relative to the executable, so the host's working directory does not matter. It does not read the checkout's current source; rebuild after regenerating knowledge. The package includes `dist` and runtime dependencies when installed from a locally packed archive; copying `dist` alone does not install SDK dependencies. The package is private and has not been published.

## Tools

| Tool | Purpose | Bounds |
| --- | --- | --- |
| `list_records` | Search `packages`, `sections`, `tokens`, `utilities`, `examples`, or `sources`. Results contain summaries and resource URIs. | `limit` 1–50, default 20; nonnegative integer `offset`. |
| `get_record` | Read the complete record for an exact collection and ID. | One record per call. |
| `read_source` | Read source text by an allowlisted source ID. | `length` 1–32000, default 12000; nonnegative integer `offset`. |

`query` uses case-insensitive AND matching over record metadata; it does not search example bodies or source text. `category` matches the exact category on packages, tokens and utilities. `packageId` selects the package itself, its source files, related examples, and records whose source belongs to that package. Unknown package IDs return an error. Omit filters to enumerate the entire collection. The catalog summary resource lists available categories.

Listing responses return `total`, `offset`, `limit`, `nextOffset` and `items`. Source responses return `total`, `offset`, actual `length`, `nextOffset`, `sha256` and `text`. Continue with `nextOffset` until it is `null`; no unseen page is treated as complete. Source positions count **UTF-16 code units in LF-normalized text**, matching JavaScript string slicing, not bytes or line numbers. Concatenate chunks before processing text; a chunk boundary can split a Unicode surrogate pair.

Successful tools include both `structuredContent` and the same JSON serialized in a text block. Invalid arguments, unknown IDs and attempted arbitrary paths fail explicitly. Tools advertise read-only, idempotent, closed-world annotations, and the implementation enforces the allowlist independently of those hints.

Example lookup sequence:

```json
{"name":"list_records","arguments":{"collection":"packages","query":"input"}}
{"name":"get_record","arguments":{"collection":"packages","id":"react-input"}}
{"name":"list_records","arguments":{"collection":"examples","packageId":"react-input","limit":10}}
{"name":"read_source","arguments":{"id":"packages/react-input/src/index.ts","offset":0,"length":12000}}
```

Use `sourceIds` and `exampleIds` from returned records. Example sections may depend on imports, state, page helpers or documentation wrappers; inspect the original page before adapting them. Tokens retain selector and conditional scope; their values are CSS source expressions rather than asserted computed pixels.

## Resources and prompts

- `virtari://catalog`: counts, categories, bounds and reading workflow.
- `virtari://record/{collection}/{id}`: one complete record.
- `virtari://source/{id}/{offset}/{length}`: a bounded source chunk.

Encode each ID with `encodeURIComponent` when placing it into a resource URI. For example: `virtari://source/packages%2Freact-input%2Fsrc%2Findex.ts/0/12000`. Resources are static snapshot reads; resource subscriptions are not implemented or advertised.

Optional prompts `virtari_build` and `virtari_review` require `task` and accept an exact `packageId`. They guide the host to the same catalog contracts; they do not execute code or grant action permission. All essential information is available through tools when a host does not expose resources or prompts.

## Compatibility and validation

The pinned official SDK v2 serves modern MCP `2026-07-28` discovery and legacy `initialize` connections through `serveStdio(..., { legacy: 'serve' })`. Tests use official client `2.0.0` both with the modern revision pinned and in default legacy mode, launch a real subprocess from a different working directory, and exercise discovery, schemas, pagination, filtered lookup, source reconstruction, invalid inputs, encoded resources and prompt validation. This proves these transport/protocol paths, not every commercial host's setup UI or every model's output quality.

This is a local stdio server. A cloud-only host that cannot launch it needs a separately deployed remote transport; the documentation site's URL is not an MCP endpoint. See the repository's [AI standards](../../docs/ai-standards.md) for dated official sources and the [knowledge contract](../../ai/contract.md) for catalog semantics.

The build validates source SHA-256 values before copying the snapshot; startup validates them again. stdout is reserved for MCP protocol messages. Diagnostics from unrecoverable startup failures go to stderr. `SIGINT` and `SIGTERM` close the SDK transport.
