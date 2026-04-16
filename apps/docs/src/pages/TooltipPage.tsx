import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@virtari/react-tooltip";
import { Button } from "@virtari/react-button";
import { Section, Row } from "../components";

export function TooltipPage() {
  return (
    <>
      <Section title="Placements" description="Tooltips can appear on any side of the trigger.">
        <TooltipProvider>
          <Row>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Tooltip on top</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Tooltip on right</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">Tooltip on left</TooltipContent>
            </Tooltip>
          </Row>
        </TooltipProvider>
      </Section>

      <Section title="With Delay" description="Custom open delay for less intrusive tooltips.">
        <TooltipProvider delayDuration={500}>
          <Row>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Hover me (500ms delay)</Button>
              </TooltipTrigger>
              <TooltipContent>This tooltip has a longer delay</TooltipContent>
            </Tooltip>
          </Row>
        </TooltipProvider>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@virtari/react-tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      Tooltip text
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</pre>
      </Section>
    </>
  );
}
