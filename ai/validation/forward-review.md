# Independent forward-use review

Date: 2026-09-06. One independent agent, two generated-guidance-first drafts. This is a bounded consumer/type/protocol check, not validation across all models, clients or browsers.

## Outcome

- Both original drafts typecheck against package source without changing their component code. The ignored artifacts are `.tmp-ai-forward/sign-in.tsx` and `.tmp-ai-forward/settings-shell.tsx`; `.tmp-ai-forward/tsconfig.json` records the harness.
- Sign-in uses stable uncontrolled native inputs, username/current-password autofill hints, logical decorative icon placement, inherited strong tonal fields, linked server error, native reset and separately reset controlled reveal state. The authentication callback is supplied by the application.
- Settings uses TabsList `variant="segmented"`, matched tab panels, nested soft radius inside pill, a mod+k binding and platform-matched keycap/ARIA label, and verified finite spacing classes. Search is a focus trigger and input shell; search results are application work.
- MCP source review and executed official-client tests found no protocol or arbitrary-source-access blocker in the checked snapshot.

## Exact forward read trail

Before writing either draft, no `ai/authoring` or live package implementation was read. Paths below are relative to repository root; braces enumerate the exact files read, not an instruction to load every skill.

1. `ai/skills/virtari-design-system/SKILL.md`, then `ai/skills/virtari-design-system/references/index.md`.
2. `ai/skills/{virtari-react-input,virtari-react-form,virtari-react-icons,virtari-react-tabs,virtari-react-kbd,virtari-utils,virtari-foundation-foundation-imports,virtari-foundation-surface-styles,virtari-foundation-shape,virtari-utilities,virtari-react-button}/SKILL.md`.
3. `ai/skills/{virtari-react-input,virtari-react-tabs,virtari-react-kbd,virtari-utils,virtari-react-icons,virtari-utilities,virtari-react-button}/references/api.md`.
4. `ai/skills/{virtari-react-input,virtari-utils,virtari-utilities,virtari-react-icons}/references/examples.md`. These indexes include unrelated sections importing the package; batching them produced truncated output, so only relevant direct references were followed.
5. `ai/skills/virtari-react-input/references/examples/InputPage.tsx.md` (first 150 lines), `ai/skills/virtari-react-icons/references/examples/IconsPage.tsx.md` (search and first 32 lines).
6. `ai/skills/virtari-foundation-js-utils/references/source.md` (targeted useHotkey, ariaKeyShortcuts and useKeyboardPlatform signatures); `ai/skills/virtari-foundation-css-utilities/references/source.md` (generator rules, then first 65 lines to confirm the spacing subsets). These are generated source references, not prior live-implementation reads.
7. `ai/skills/{virtari-react-input,virtari-react-tabs,virtari-react-kbd,virtari-utils,virtari-utilities,virtari-react-button,virtari-react-icons}/references/design.md`; shared contracts read once from `ai/skills/virtari-react-input/references/{design-language,surface-styles,nested-surfaces}.md` (first 100 lines each, covering their content).

The Form skill helped rule out introducing React Hook Form for this native example. The type examples established the inherited PasswordInputField label/error contract. No documentation Section/helper was copied into consumer code.

## Knowledge findings and assumptions

1. **Missing function signatures at initial read:** utils API reference listed useHotkey/ariaKeyShortcuts/useKeyboardPlatform names and option types, but omitted callable signatures. The foundation JS source reference supplied them, so this was a discovery detour rather than an unresolved API guess. Root was notified and is addressing generation.
2. **Dependency wildcard discoverability at initial read:** icons API listed the wrapper and types but not forwarded Tabler icon names. IconSearch was supported by the skill's concrete prose example; package source later confirmed `export * from "@tabler/icons-react"`, and typechecking confirmed the actual import. Root added `references/external-exports.md` during this review; its first 25 lines were inspected after drafting. It was not available evidence for the original drafts.
3. **Known native-reset limitation omitted from initial input pitfalls:** `packages/react-input/src/PasswordInputField.tsx:110` owns an uncontrolled value used for its counter; lines 150–152 update it only on change. The wrapper does not subscribe to reset. `InputField.tsx:122` and PasswordInput itself do subscribe through useFormReset. Consequently an uncontrolled PasswordInputField with showCounter can retain an old displayed count after the native input resets. This is source-derived, not a browser reproduction. Our draft leaves showCounter off and controls reveal reset, so it does not depend on the missing behavior. Guidance should state this limitation unless implementation is separately fixed and tested.
4. Explicit application choices: native constraint validation plus supplied authentication callback; stable IDs assume one instance of each draft per document; Arabic text is illustrative; reset cancellation is observed in a queued callback; no backend, search filtering or persistent settings is claimed.
5. Unverified: real saved-credential browser autofill, Safari/iOS behavior, screen-reader announcements, rendered fonts/geometry, keyboard interaction in a mounted browser, and published-package consumer installation. Passing TypeScript establishes the source API, not these runtime outcomes.

## Source comparison and checks

After drafting, inspected `packages/react-input/src/{Input.css,PasswordInputField.tsx,PasswordInput.tsx,InputField.tsx}`, `packages/react-icons/src/index.ts`, `packages/react-kbd/src/Kbd.tsx`, `packages/react-tabs/src/Tabs.tsx`, `tsconfig.base.json`, root `package.json`, `apps/docs/{tsconfig.json,vite.config.ts}`, and existing React/Node type locations. Input CSS imports Fieldset CSS, so the draft's field composition has its dependent styling through the documented input stylesheet.

`pnpm exec tsc -p .tmp-ai-forward/tsconfig.json` passed with strict source aliases. The first harness run reported missing ambient Node process types in primitives; adding the already installed Node type root resolved the harness issue. No package declarations, component source or dependency installs were changed.

## Independent MCP review

Read `apps/mcp/{src/server.mjs,src/knowledge.mjs,scripts/build.mjs,tests/stdio.test.mjs,package.json}` and the installed official client package export map. Executed `pnpm mcp:build` and `pnpm mcp:test`: all 12 tests passed. Both protocol eras launch from the OS temporary directory using an absolute entry path. Modern protocol pin is 2026-07-28; legacy is the official client's legacy negotiation mode; SDK version is 2.0.0.

Inspected protections: strict tool input schemas; bounded integer offsets and page/source lengths; Map-based collection/ID lookup; read_source checks the allowlisted sources collection before using its snapshot string; no request-supplied path/URL is opened; snapshot bytes/hash are checked at build/load; resources translate lookup/validation failures into protocol errors; tool content matches structuredContent in official-client tests.

Supplementary ignored probe `.tmp-ai-forward/protocol-probe.mjs` passed in both eras. It reconstructs complete ID sequences for all six collections using every page, checks eight additional invalid requests (unsafe integer offset, zero limits/lengths, oversized query, backslash ID, extra property, file URL and non-allowlisted authoring path), rejects four malformed/unknown source resources, and compares an actual non-ASCII source slice with the built snapshot. Existing official tests cover prompt/resource discovery, source reconstruction, encoded IDs, schema failures and recovery after rejected calls.

The existing pagination test title suggests complete coverage for all collections, but its body only fully walks packages and checks first/last pages for the other collections. The supplementary probe covers the remaining walks for this review. No change was made to that suite. This evidence is for the official SDK client and these two protocol modes only; no claim is made about arbitrary desktop integrations or model behavior.

## Root follow-through after the independent review

The generator now emits exported function signatures and a versioned dependency export index linked from the icons skill. The input guidance records the uncontrolled password counter reset limitation. Core-before-tokens CSS order was reconciled with the actual application and CSS layer semantics. These changes address knowledge discovery and accuracy; they do not claim to fix the existing component limitations above.
