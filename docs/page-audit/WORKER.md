# One-page review assignment

Read `AGENTS.md` and `docs/component-quality.md`. Your assigned route and page are in `manifest.json`. Read the focused skill plus actual owning source/export map; generated knowledge may be stale during this multi-agent edit.

1. Review the page's demonstrations and its owning package: spacing, icon/text geometry, tokens/contrast, slot padding, shape hierarchy, long text, RTL, native semantics, disabled/error/focus and reduced motion where relevant.
2. Fix concrete issues in the owning package so consumers benefit without documentation CSS. Preserve public API; add capabilities only where needed. Use package CodeBlock (`renderer="static"`) and InlineCode; root is performing the mechanical shared snippet migration.
3. Your file ownership is the assigned page and package, plus a uniquely named fixture and `docs/page-audit/<route>.md`. Do not edit shared tokens/core/docs CSS or another package without coordinating with root. Root owns CopyButton, shared docs adapters and snapshot generation. Report shared dependency issues promptly. Do not edit source files owned by a concurrently running agent.
4. Validate the changed behavior and inspect rendered states when feasible (own browser tab on localhost:5173). Reuse/add a package-only fixture for meaningful package regressions. Do not run whole-repo builds, AI generation, installs or commits; root integrates and runs final checks. Do not write mirror tests for simple prose changes.
5. In your report, record concrete findings, corrections, exact files/checks and honest remaining limits. A page can be reviewed without arbitrary code edits if the checked contract is sound. Source-only review must be labeled as such, never described as full browser verification.

Existing examples may be deliberately raw to compare native behavior; preserve that intent and label it. A shared mechanical code migration is not, by itself, a sufficient package quality audit. End with a concise report to root so the next page can start.
