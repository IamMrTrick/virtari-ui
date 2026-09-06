---
name: virtari-react-accordion
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-accordion. Single or multiple disclosure groups, semantic heading triggers, and a data-driven FAQ wrapper."
---

# @virtari-packages/react-accordion

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-accordion`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Accordion > AccordionItem(value) > AccordionTrigger + AccordionContent. Root type is required: single uses a string value; multiple uses string arrays. In single mode pass collapsible to allow all items to close.
- Set root variant, size, color, iconType, iconPosition and headingLevel; triggers inherit indicator and heading settings and can override them individually. AccordionTrigger already renders a heading around its button; choose headingLevel to fit the document outline.
- Variants are plain, bordered, separated, filled, ghost and contained; size is sm/md/lg. Keep component variants separate from the global surface style and radius policy.
- FAQAccordion accepts items with stable id, question, rich answer and plain answerText; defaultOpen is an array even when allowMultiple is false. It is an uncontrolled convenience wrapper; use Accordion for controlled values.
- FAQAccordion emits FAQPage JSON-LD by default. Set structuredData={false} when the host page already supplies it, or when answerText/question values are untrusted until script-safe serialization is implemented. JSON-LD output alone does not guarantee search rich results.

## Known limits and mistakes to avoid

- Do not insert a second button inside AccordionTrigger; use its text and decorative content slots within the existing trigger button.
- Do not invent controlled value/onValueChange props on FAQAccordion; these belong to the lower-level Accordion.
- FAQAccordion currently injects JSON.stringify output directly into a script element. Strings containing a closing script tag require escaping; disabling structuredData avoids that output for untrusted content.

Related package IDs: `react-collapsible`, `react-text`, `react-icons`. Discover their focused skills from the catalog; do not load all packages at once.
