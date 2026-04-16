import { Tabs, TabsList, TabsTrigger, TabsContent } from "@virtari/react-tabs";
import { Section } from "../components";

export function TabsPage() {
  return (
    <>
      <Section title="Basic" description="Underline-style tabs with keyboard navigation.">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p>Manage your account preferences here.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p>Configure your application settings.</p>
          </TabsContent>
          <TabsContent value="billing">
            <p>Review your billing information and payment methods.</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="With Disabled Tab">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p>This tab is active.</p>
          </TabsContent>
          <TabsContent value="other">
            <p>Another tab panel.</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@virtari/react-tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`}</pre>
      </Section>
    </>
  );
}
