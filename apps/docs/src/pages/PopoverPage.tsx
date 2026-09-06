import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Popover, PopoverTrigger, PopoverContent } from "@virtari-packages/react-popover";
import { Button } from "@virtari-packages/react-button";
import { Section, Row } from "../components";

export function PopoverPage() {
  return (
    <>
      <Section title="Basic" description="Click the trigger to open a popover.">
        <Row>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
                <h4 style={{ margin: 0, fontWeight: 600 }}>Settings</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
                  <label style={{ fontSize: "0.875rem" }}>
                    Name
                    <input type="text" placeholder="Enter name..." style={{ display: "block", width: "100%", marginTop: "4px" }} />
                  </label>
                  <label style={{ fontSize: "0.875rem" }}>
                    Email
                    <input type="email" placeholder="Enter email..." style={{ display: "block", width: "100%", marginTop: "4px" }} />
                  </label>
                </div>
                <Button size="sm">Save</Button>
              </div>
            </PopoverContent>
          </Popover>
        </Row>
      </Section>

      <Section title="Placements" description="Popover can be placed on different sides.">
        <Row>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top">Content on top</PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right">Content on right</PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">Content on bottom</PopoverContent>
          </Popover>
        </Row>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Popover, PopoverTrigger, PopoverContent } from "@virtari-packages/react-popover";

<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    <p>Popover content here</p>
  </PopoverContent>
</Popover>`} />
      </Section>
    </>
  );
}
