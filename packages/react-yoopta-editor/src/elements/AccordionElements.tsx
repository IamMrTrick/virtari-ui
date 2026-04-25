import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@virtari-packages/react-accordion";
import type { PluginElementRenderProps } from "@yoopta/editor";

/**
 * Yoopta accordion is a 4-level Slate tree:
 *   accordion-list (root)
 *     accordion-list-item (per item, with isExpanded prop)
 *       accordion-list-item-heading (trigger)
 *       accordion-list-item-content (content)
 *
 * We map each level to the matching Virtari Accordion compound part.
 * Expansion state lives in Radix (uncontrolled multi-mode); the Slate
 * `isExpanded` flag is left untouched so saving + reload still preserves
 * the same default open items via `defaultValue`.
 */

export function AccordionListElement(renderProps: PluginElementRenderProps) {
  const { attributes, children, element } = renderProps;
  const rawChildren = (element as unknown as { children?: unknown[] }).children;
  const items: { id: string; props?: { isExpanded?: boolean } }[] = Array.isArray(
    rawChildren,
  )
    ? (rawChildren as { id: string; props?: { isExpanded?: boolean } }[])
    : [];
  const defaultOpen = items
    .filter((c) => c?.props?.isExpanded)
    .map((c) => c.id);

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpen}
      variant="bordered"
      size="md"
      color="neutral"
      iconType="chevron"
      iconPosition="end"
      {...attributes}
      className="vds-yoopta-editor__accordion"
    >
      {children}
    </Accordion>
  );
}

export function AccordionItemElement(renderProps: PluginElementRenderProps) {
  const { attributes, children, element } = renderProps;
  return (
    <AccordionItem value={element.id} {...attributes}>
      {children}
    </AccordionItem>
  );
}

export function AccordionHeadingElement(renderProps: PluginElementRenderProps) {
  const { attributes, children } = renderProps;
  return (
    <AccordionTrigger {...attributes}>
      <span className="vds-yoopta-editor__accordion-heading">{children}</span>
    </AccordionTrigger>
  );
}

export function AccordionContentElement(renderProps: PluginElementRenderProps) {
  const { attributes, children } = renderProps;
  return <AccordionContent {...attributes}>{children}</AccordionContent>;
}
