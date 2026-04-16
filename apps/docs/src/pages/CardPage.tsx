import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@virtari/react-card";
import { Button } from "@virtari/react-button";
import { Section, Row } from "../components";

export function CardPage() {
  return (
    <>
      <Section title="Basic" description="A card with header, content, and footer.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
                <label style={{ fontSize: "0.875rem" }}>
                  Name
                  <input type="text" placeholder="Project name" style={{ display: "block", width: "100%", marginTop: "4px" }} />
                </label>
                <label style={{ fontSize: "0.875rem" }}>
                  Description
                  <input type="text" placeholder="Project description" style={{ display: "block", width: "100%", marginTop: "4px" }} />
                </label>
              </div>
            </CardContent>
            <CardFooter style={{ display: "flex", justifyContent: "flex-end", gap: "var(--vds-space-2)" }}>
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section title="Simple Card" description="A minimal card with just content.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Card>
            <CardContent>
              <p style={{ margin: 0 }}>
                This is a simple card with only content and no header or footer.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Multiple Cards" description="Cards in a row for comparison layouts.">
        <Row>
          <Card style={{ flex: 1, maxInlineSize: "16rem" }}>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>For personal use</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>$0</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>Get Started</Button>
            </CardFooter>
          </Card>
          <Card style={{ flex: 1, maxInlineSize: "16rem" }}>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For teams</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>$29</p>
            </CardContent>
            <CardFooter>
              <Button fullWidth>Upgrade</Button>
            </CardFooter>
          </Card>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from "@virtari/react-card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card body content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}</pre>
      </Section>
    </>
  );
}
