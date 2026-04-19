import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

/** Shape/frame variant — orthogonal to color and size. */
type AccordionVariant = "plain" | "bordered" | "separated" | "filled" | "ghost" | "contained";
/** Size preset — affects trigger padding, font size, icon size. */
type AccordionSize = "sm" | "md" | "lg";
/** Intent palette — sets hover tint and open-state accent color. */
type AccordionColor = "neutral" | "primary" | "accent" | "success" | "danger" | "warning";
/** Indicator style placed in the trigger. */
type AccordionIconType = "chevron" | "plus-minus" | "arrow" | "caret" | "none";
/** Which side of the trigger the indicator sits on. */
type AccordionIconPosition = "start" | "end";
/** Semantic heading level for each trigger. Default: `h3` for FAQ/SEO. */
type AccordionHeadingLevel = "h2" | "h3" | "h4" | "h5" | "h6";
type RadixAccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;
/** Root props. Intersection because Radix's Root is a discriminated union
 * on `type="single" | "multiple"` — `interface extends` can't widen it. */
type AccordionProps = RadixAccordionRootProps & {
    /** Shape/frame. Default: `plain`. */
    variant?: AccordionVariant;
    /** Size preset. Default: `md`. */
    size?: AccordionSize;
    /** Intent palette for hover/open accent. Default: `neutral`. */
    color?: AccordionColor;
    /** Indicator icon type. Default: `chevron`. */
    iconType?: AccordionIconType;
    /** Which side of the trigger the icon sits on. Default: `end`. */
    iconPosition?: AccordionIconPosition;
    /**
     * Heading level rendered around each trigger for SEO / a11y.
     * Default: `h3`. Pick so the hierarchy fits your page (usually h2 or h3).
     */
    headingLevel?: AccordionHeadingLevel;
    /** Optional class merged onto the root. */
    className?: string;
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Root>>;
};
declare function Accordion({ variant, size, color, iconType, iconPosition, headingLevel, className, ref, ...props }: AccordionProps): react_jsx_runtime.JSX.Element;
interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
    /** Override the root color for just this item (e.g., highlight a row). */
    color?: AccordionColor;
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Item>>;
}
declare function AccordionItem({ className, color, ref, ...props }: AccordionItemProps): react_jsx_runtime.JSX.Element;
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    /** Override the root's icon type for this trigger only. */
    iconType?: AccordionIconType;
    /** Override the root's icon position for this trigger only. */
    iconPosition?: AccordionIconPosition;
    /** Override the root's heading level for this trigger only. */
    headingLevel?: AccordionHeadingLevel;
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Trigger>>;
}
declare function AccordionTrigger({ className, children, iconType: iconTypeProp, iconPosition: iconPositionProp, headingLevel: headingLevelProp, ref, ...props }: AccordionTriggerProps): react_jsx_runtime.JSX.Element;
interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Content>>;
}
declare function AccordionContent({ className, children, ref, ...props }: AccordionContentProps): react_jsx_runtime.JSX.Element;

/** A single question/answer pair. `answer` may be plain text or rich ReactNode. */
interface FAQItem {
    /** Stable id for Radix controlled state + anchor links. Required. */
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
interface FAQAccordionProps {
    items: FAQItem[];
    /** Which items are open initially. Defaults to `[]` (all collapsed). */
    defaultOpen?: string[];
    /**
     * Allow multiple open at once. Default: true — UX-friendly for FAQ since
     * users often want to compare answers. Radix handles either mode.
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
declare function FAQAccordion({ items, defaultOpen, allowMultiple, variant, size, color, iconType, iconPosition, headingLevel, structuredData, className, }: FAQAccordionProps): react_jsx_runtime.JSX.Element;

export { Accordion, type AccordionColor, AccordionContent, type AccordionContentProps, type AccordionHeadingLevel, type AccordionIconPosition, type AccordionIconType, AccordionItem, type AccordionItemProps, type AccordionProps, type AccordionSize, AccordionTrigger, type AccordionTriggerProps, type AccordionVariant, FAQAccordion, type FAQAccordionProps, type FAQItem };
