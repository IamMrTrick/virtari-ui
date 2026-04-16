import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@virtari/react-select";
import { Section, Row } from "../components";

export function SelectPage() {
  return (
    <>
      <Section title="Basic">
        <div style={{ maxInlineSize: "16rem" }}>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Trigger Sizes" description="Same height ramp as Button, Input, Toggle.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "20rem" }}>
          <Row>
            <span className="docs-size-label">xs</span>
            <Select>
              <SelectTrigger size="xs">
                <SelectValue placeholder="xs — 28px" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row>
            <span className="docs-size-label">sm</span>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="sm — 32px" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row>
            <span className="docs-size-label">md</span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="md — 40px (default)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row>
            <span className="docs-size-label">lg</span>
            <Select>
              <SelectTrigger size="lg">
                <SelectValue placeholder="lg — 44px" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row>
            <span className="docs-size-label">xl</span>
            <Select>
              <SelectTrigger size="xl">
                <SelectValue placeholder="xl — 52px" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </div>
      </Section>

      <Section title="Grouped">
        <div style={{ maxInlineSize: "16rem" }}>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pick a timezone..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="est">Eastern (EST)</SelectItem>
                <SelectItem value="cst">Central (CST)</SelectItem>
                <SelectItem value="pst">Pacific (PST)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">GMT</SelectItem>
                <SelectItem value="cet">Central European (CET)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@virtari/react-select";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger size="lg">
    <SelectValue placeholder="Pick..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>`}</pre>
      </Section>
    </>
  );
}
