import { useId } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionColor,
  type AccordionHeadingLevel,
  type AccordionIconPosition,
  type AccordionIconType,
  type AccordionSize,
  type AccordionVariant,
} from "./Accordion";

/** A single question/answer pair. `answer` may be plain text or rich ReactNode. */
export interface FAQItem {
  /** Stable id for controlled state + anchor links. Required. */
  id: string;
  question: string;
  /** Rich node rendered inside the body. */
  answer: React.ReactNode;
  /**
   * Plain-text copy of the answer used inside the FAQPage JSON-LD. Required
   * because Google needs a string — rich React nodes can't be serialized.
   * If your `answer` is already a plain string, pass the same value here.
   */
  answerText: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  /** Which items are open initially. Defaults to `[]` (all collapsed). */
  defaultOpen?: string[];
  /**
   * Allow multiple open at once. Default: true — UX-friendly for FAQ since
   * users often want to compare answers. Either mode is supported.
   */
  allowMultiple?: boolean;
  /** Shape variant forwarded to the underlying Accordion. Default: `contained`. */
  variant?: AccordionVariant;
  size?: AccordionSize;
  color?: AccordionColor;
  iconType?: AccordionIconType;
  iconPosition?: AccordionIconPosition;
  /** Heading level for the question. Default: `h3`. */
  headingLevel?: AccordionHeadingLevel;
  /**
   * Emit a `FAQPage` JSON-LD `<script>` alongside the accordion so Google can
   * surface rich results. Default: true. Turn off if the page already ships
   * its own FAQPage structured data (never duplicate — Google will flag it).
   */
  structuredData?: boolean;
  className?: string;
}

/**
 * SEO-friendly FAQ accordion.
 *
 * Differences from a bare `<Accordion>`:
 *  1. Each question is rendered as a real `<h3>` (configurable).
 *  2. Emits FAQPage JSON-LD so Google surfaces rich-result FAQ snippets.
 *     See https://developers.google.com/search/docs/appearance/structured-data/faqpage
 *  3. Accepts a flat `items` array — callers don't have to compose Item/Trigger/Content.
 */
export function FAQAccordion({
  items,
  defaultOpen = [],
  allowMultiple = true,
  variant = "contained",
  size = "md",
  color = "neutral",
  iconType = "plus-minus",
  iconPosition = "end",
  headingLevel = "h3",
  structuredData = true,
  className,
}: FAQAccordionProps) {
  const scriptId = useId();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerText,
      },
    })),
  };

  const accordionProps = allowMultiple
    ? ({ type: "multiple", defaultValue: defaultOpen } as const)
    : ({ type: "single", collapsible: true, defaultValue: defaultOpen[0] } as const);

  return (
    <>
      <Accordion
        {...accordionProps}
        variant={variant}
        size={size}
        color={color}
        iconType={iconType}
        iconPosition={iconPosition}
        headingLevel={headingLevel}
        className={className}
      >
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} id={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {structuredData && (
        <script
          id={`faq-jsonld-${scriptId}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON.stringify output is safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
