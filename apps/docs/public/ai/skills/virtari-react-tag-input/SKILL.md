---
name: virtari-react-tag-input
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-tag-input. Controlled tag-list entry with chips, delimiters and repeated form values."
---

# @virtari-packages/react-tag-input

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-tag-input`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- TagInput requires value:string[] and onChange(tags). Enter and delimiters (comma by default) commit trimmed tags; paste also splits lines. Backspace in an empty draft removes the last tag.
- Configure maxTags, allowDuplicates (false by default) and validate. A validation result must be true to accept the tag; false or a string rejects it. Render explanatory validation feedback in your enclosing Field.
- name serializes one hidden input per committed tag; read values with FormData.getAll(name). The visible draft is not a submitted tag until committed. Native form reset restores the initial tag array through onChange.
- Use size sm/md/lg and a persistent label tied to id. The ref targets the editable input; disabled/readOnly prevent additions/removals and required applies while the tag array is empty.

## Known limits and mistakes to avoid

- There is no defaultValue array API for tags. Do not use defaultValue to initialize the tag list or expect a rejected validate string to render automatically.
- An uncommitted draft does not appear in the hidden inputs. Make the commit interaction clear before submission.

Related package IDs: `react-chip`, `react-fieldset`, `react-form`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
