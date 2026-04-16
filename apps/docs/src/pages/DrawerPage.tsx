import { useState } from "react";
import { Button } from "@virtari/react-button";
import { Input } from "@virtari/react-input";
import { Switch } from "@virtari/react-switch";
import { Checkbox } from "@virtari/react-checkbox";
import { Avatar } from "@virtari/react-avatar";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHandle,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "@virtari/react-drawer";
import { Section, Row } from "../components";

export function DrawerPage() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <>
      {/* ── Basic Bottom ── */}
      <Section
        title="Bottom Sheet"
        description="Default direction. Slides up from bottom with iOS spring animation."
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Bottom Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHandle />
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile. Click save when you're done.
            </DrawerDescription>
            <DrawerBody>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Email</label>
                  <Input placeholder="john@example.com" type="email" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Bio</label>
                  <Input placeholder="Tell us about yourself..." />
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" fullWidth>Cancel</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button fullWidth>Save Changes</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      {/* ── All Directions ── */}
      <Section title="Directions" description="Drawers slide from any edge — each closes in its natural direction.">
        <Row>
          <Drawer direction="bottom">
            <DrawerTrigger asChild><Button variant="outline">Bottom</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHandle />
              <DrawerTitle>Bottom Drawer</DrawerTitle>
              <DrawerDescription>Swipe down to close.</DrawerDescription>
              <DrawerBody>
                <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)" }}>
                  Content slides up from the bottom edge. Most natural for mobile bottom sheets.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild><Button variant="outline" fullWidth>Done</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer direction="top">
            <DrawerTrigger asChild><Button variant="outline">Top</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerTitle>Top Drawer</DrawerTitle>
              <DrawerDescription>Swipe up to close.</DrawerDescription>
              <DrawerBody>
                <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)" }}>
                  Slides down from the top. Useful for alerts, notifications, or search.
                </p>
              </DrawerBody>
              <DrawerHandle />
              <DrawerFooter>
                <DrawerClose asChild><Button variant="outline" fullWidth>Close</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer direction="left">
            <DrawerTrigger asChild><Button variant="outline">Left</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHandle />
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerBody>
                <nav style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  {["Dashboard", "Projects", "Team", "Settings", "Help"].map((item) => (
                    <button
                      key={item}
                      className="vds-button"
                      data-variant="ghost"
                      data-size="md"
                      style={{ justifyContent: "flex-start" }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer direction="right">
            <DrawerTrigger asChild><Button variant="outline">Right</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHandle />
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
                  {[
                    { name: "Alice", msg: "Mentioned you in a comment", time: "2m ago" },
                    { name: "Bob", msg: "Approved your pull request", time: "1h ago" },
                    { name: "Carol", msg: "Shared a file with you", time: "3h ago" },
                  ].map((n) => (
                    <div key={n.name} style={{ display: "flex", gap: "var(--vds-space-3)", alignItems: "start" }}>
                      <Avatar fallback={n.name[0]} size="sm" />
                      <div>
                        <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>{n.name}</p>
                        <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>{n.msg}</p>
                        <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-subtle)" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Row>
      </Section>

      {/* ── Settings Form ── */}
      <Section title="Full Form Example" description="Real-world settings drawer with form controls.">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="soft">Settings</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHandle />
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Manage your account preferences.</DrawerDescription>
            <DrawerBody>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-5)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                    Display Name
                  </label>
                  <Input placeholder="Your name" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                    Email Address
                  </label>
                  <Input placeholder="you@example.com" type="email" />
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "var(--vds-space-3)", borderRadius: "var(--vds-radius-lg)",
                  border: "1px solid var(--vds-color-border-muted)",
                }}>
                  <div>
                    <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                      Push Notifications
                    </p>
                    <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                      Receive push notifications on your device.
                    </p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "var(--vds-space-3)", borderRadius: "var(--vds-radius-lg)",
                  border: "1px solid var(--vds-color-border-muted)",
                }}>
                  <div>
                    <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                      Marketing Emails
                    </p>
                    <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                      Receive emails about new features.
                    </p>
                  </div>
                  <Switch checked={marketing} onCheckedChange={setMarketing} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
                  <Checkbox id="terms-drawer" />
                  <label htmlFor="terms-drawer" style={{ fontSize: "var(--vds-text-sm)" }}>
                    I agree to the Terms of Service
                  </label>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" fullWidth>Cancel</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button fullWidth>Save Settings</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      {/* ── Usage ── */}
      <Section title="Usage">
        <pre className="docs-code">{`import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHandle,
  DrawerTitle, DrawerDescription, DrawerBody,
  DrawerFooter, DrawerClose,
} from "@virtari/react-drawer";

// Bottom sheet with form
<Drawer direction="bottom">
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHandle />
    <DrawerTitle>Edit Profile</DrawerTitle>
    <DrawerDescription>Update your info.</DrawerDescription>
    <DrawerBody>
      <Input placeholder="Name" />
      <Input placeholder="Email" type="email" />
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

// Directions: "bottom" | "top" | "left" | "right"
// Scale background: add data-vds-drawer-wrapper to app root`}</pre>
      </Section>
    </>
  );
}
