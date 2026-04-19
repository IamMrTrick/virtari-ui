import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@virtari-packages/react-tooltip";
import { Button } from "@virtari-packages/react-button";
import { Section, Row } from "../components";

export function TooltipPage() {
  return (
    <TooltipProvider>
      <Section
        title="Placements"
        description="Tooltips can appear on any side of the trigger. They snap into place with a directional slide."
      >
        <Row>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top" arrow>Tooltip on top</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right" arrow>Tooltip on right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" arrow>Tooltip on bottom</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left" arrow>Tooltip on left</TooltipContent>
          </Tooltip>
        </Row>
      </Section>

      <Section title="Sizes" description="Three padding/typography scales: sm, md, lg.">
        <Row>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline">Small</Button>
            </TooltipTrigger>
            <TooltipContent size="sm" arrow>Compact label</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Medium</Button>
            </TooltipTrigger>
            <TooltipContent size="md" arrow>Standard tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="lg" variant="outline">Large</Button>
            </TooltipTrigger>
            <TooltipContent size="lg" arrow>Comfortable for longer copy</TooltipContent>
          </Tooltip>
        </Row>
      </Section>

      <Section title="Variants" description="Surface intent — default dark, inverted light, and semantic colors.">
        <Row>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Default</Button>
            </TooltipTrigger>
            <TooltipContent arrow>Dark surface</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Inverted</Button>
            </TooltipTrigger>
            <TooltipContent variant="inverted" arrow>Light surface with border</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Info</Button>
            </TooltipTrigger>
            <TooltipContent variant="info" arrow>Helpful context</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Success</Button>
            </TooltipTrigger>
            <TooltipContent variant="success" arrow>Saved successfully</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Warning</Button>
            </TooltipTrigger>
            <TooltipContent variant="warning" arrow>Heads up</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Danger</Button>
            </TooltipTrigger>
            <TooltipContent variant="danger" arrow>This action is destructive</TooltipContent>
          </Tooltip>
        </Row>
      </Section>

      <Section
        title="Custom Delay"
        description="Provider sets the default (300 ms). Wrap a single Tooltip in its own Provider to override."
      >
        <Row>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Instant</Button>
              </TooltipTrigger>
              <TooltipContent arrow>No delay</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={700}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Patient (700 ms)</Button>
              </TooltipTrigger>
              <TooltipContent arrow>Waits before opening</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@virtari-packages/react-tooltip";

<TooltipProvider>           {/* once at app root, delay defaults to 300 ms */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top" size="md" variant="default" arrow>
      Tooltip text
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}</pre>
      </Section>
    </TooltipProvider>
  );
}
