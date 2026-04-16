import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@virtari/react-accordion";
import { Section, Row } from "../components";

export function AccordionPage() {
  return (
    <>
      <Section title="Single" description="Only one item can be open at a time.">
        <div style={{ maxInlineSize: "28rem" }}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Virtari?</AccordionTrigger>
              <AccordionContent>
                Virtari is a design system that provides consistent, accessible
                components for building modern web applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I install it?</AccordionTrigger>
              <AccordionContent>
                Install individual packages via npm, e.g. npm install @virtari/react-accordion.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. All components follow WAI-ARIA patterns and are keyboard navigable.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section title="Multiple" description="Multiple items can be open simultaneously.">
        <div style={{ maxInlineSize: "28rem" }}>
          <Accordion type="multiple" defaultValue={["a", "b"]}>
            <AccordionItem value="a">
              <AccordionTrigger>Section A</AccordionTrigger>
              <AccordionContent>Content for section A.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Section B</AccordionTrigger>
              <AccordionContent>Content for section B.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Section C</AccordionTrigger>
              <AccordionContent>Content for section C.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@virtari/react-accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content here.</AccordionContent>
  </AccordionItem>
</Accordion>`}</pre>
      </Section>
    </>
  );
}
