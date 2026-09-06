---
name: virtari-react-form
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-form. React Hook Form context and accessible field composition adapters."
---

# @virtari-packages/react-form

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.1); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-form`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Form is an alias for react-hook-form FormProvider. Render a real form element inside it and wire methods.handleSubmit; provide the methods returned by useForm.
- Compose FormField (Controller adapter) with FormItem, FormLabel, FormControl, FormDescription and FormMessage. useFormField requires both FormField and FormItem contexts and subscribes to the field's validation state.
- FormControl slots exactly one actual control and injects id, aria-describedby and aria-invalid. For Select put it around SelectTrigger; for custom composite controls ensure the slotted child forwards those attributes/ref to its focusable target.
- Adapt each component's value contract explicitly: Input uses onChange events, Checkbox/Switch use checked/onCheckedChange, Select uses value/onValueChange and NumberInput uses number-or-undefined onChange.
- FormItem supports vertical/horizontal orientation. Use FormMessage for the linked validation text and include FormDescription when using the default description wiring.

## Known limits and mistakes to avoid

- Form does not emit HTML form markup or implement validation rules itself. Schema libraries and server validation are application choices.
- Do not wrap multiple controls or a non-forwarding layout div in FormControl; the generated id must reach the element the label and error actually describe.
- FormControl assembles its own described-by ids. Preserve additional external description ids deliberately when overriding that attribute.

Related package IDs: `react-input`, `react-fieldset`, `react-label`, `react-select`, `react-checkbox`. Discover their focused skills from the catalog; do not load all packages at once.
