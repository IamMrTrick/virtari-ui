# Shared package and documentation corrections

- Replaced 123 raw documentation code blocks and 226 inline-code nodes with package CodeBlock/InlineCode; dedicated page owners migrate remaining owned snippets. Shared reference pages now delegate rendering, syntax, copy feedback and containment to CodeBlock's static renderer. Removed documentation code-surface styles that bypassed the package.
- CopyButton now composes consumer onClick, honors preventDefault, copies an empty string, clears timers/stale requests, reports clipboard failure, supplies translated label hooks and preserves explicit button types. Its icon-only sizes have equal minimum dimensions; the smallest remains at least 24 CSS pixels. Added status announcements and reduced-motion handling.
- Package-only `/tests/copy-quality.html`: 14 browser checks passed, covering callbacks, cancellation, disabled behavior, empty content, rejection without an Error value, stale async requests, native forwarded refs and all five icon sizes.

These changes are shared foundations for the page reviews in manifest.json. A mechanical snippet migration does not mean every page has completed its individual component audit.

## Shared field metadata

Field exports hasFieldContent so control wrappers use the same rendering predicate. Numeric zero is valid metadata; empty strings, booleans and absent values do not create empty metadata rows or dangling description IDs. InputField, PasswordInputField, TextareaField and NumberInputField preserve explicit native aria-invalid values (including grammar/spelling), explicit invalid takes precedence, and otherwise rendered errors infer invalid. Null counter formatters produce no counter ID; maxLength=0 remains visible in the three text wrappers.

Package-only `/tests/field-metadata-quality.html`: 31 Chromium checks passed across all four wrappers. Password strength remains an additional valid description and is excluded only from the field-metadata count. This supplements the Input, Textarea and Number Input page reports.

## Initial route sweep

`/tests/page-quality.html` visited all 77 manifest routes in Chromium at 1100px and 390px iframe widths. All headings rendered and no document-level horizontal overflow was measured. The only pre outside the static CodeBlock class was on the Yoopta editor page and is reserved for its page-specific review. This sweep checks initial rendering only: it does not certify internal clipping, every state, interactions, contrast or other browser engines. Individual reports remain authoritative for those checks.

## Pause and integration

The user paused broad review after 16 individual reports to limit cost and prioritize visible alignment. Introduction and Breadcrumb worker edits are preserved but their individual audits are unfinished. No pending report is counted as completed. See alignment.md for the focused follow-up. Switch's callback ref now uses the shared composition helper to preserve React 19 cleanup; its focused fixture adds native ref and cleanup checks.
