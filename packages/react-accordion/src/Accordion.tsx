import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

/* ── Accordion ── */
export const Accordion = AccordionPrimitive.Root;

/* ── AccordionItem ── */
export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Item>>;
}

export function AccordionItem({ className, ref, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("vds-accordion-item", className)}
      {...props}
    />
  );
}

/* ── AccordionTrigger ── */
export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Trigger>>;
}

export function AccordionTrigger({ className, children, ref, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="vds-accordion-header">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn("vds-accordion-trigger", className)}
        {...props}
      >
        {children}
        <svg
          className="vds-accordion-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* ── AccordionContent ── */
export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Content>>;
}

export function AccordionContent({ className, children, ref, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("vds-accordion-content", className)}
      {...props}
    >
      <div className="vds-accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  );
}
