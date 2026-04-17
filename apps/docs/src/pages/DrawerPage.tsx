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
  DrawerHeader,
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
  const [adaptiveSnap, setAdaptiveSnap] = useState(0.5);
  const [fullSnap, setFullSnap] = useState(0.45);

  return (
    <>
      <Section
        title="Live Playground"
        description="Cleaner test surface for drawer behavior. Start here when checking open, close, and drag."
      >
        <div
          data-vds-drawer-wrapper
          style={{
            position: "relative",
            minHeight: "24rem",
            overflow: "hidden",
            borderRadius: "calc(var(--vds-radius-xl) + var(--vds-space-1))",
            border: "1px solid var(--vds-color-border-muted)",
            background:
              "radial-gradient(circle at top left, color-mix(in oklch, var(--vds-color-primary-500), transparent 82%), transparent 38%), linear-gradient(180deg, var(--vds-color-bg-subtle), var(--vds-color-surface))",
            boxShadow: "var(--vds-shadow-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-5)",
              padding: "var(--vds-space-6)",
              minHeight: "24rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vds-space-3)" }}>
              <Drawer snapPoints={[0.45, 1]} defaultSnapPoint={0.45} minimizedSize={76} snapBehavior="staged">
                <DrawerTrigger asChild>
                  <Button>Open Bottom Sheet</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerHandle />
                    <DrawerTitle>Quick Actions</DrawerTitle>
                    <DrawerDescription>
                      Drag the header or handle to expand. When the list is at the top, pull down from the body to stage smaller or close.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                      {["Recent Orders", "Saved Addresses", "Payment Methods", "Support"].map((item) => (
                        <div
                          key={item}
                          style={{
                            padding: "var(--vds-space-3)",
                            borderRadius: "var(--vds-radius-lg)",
                            border: "1px solid var(--vds-color-border-muted)",
                            background: "color-mix(in oklch, var(--vds-color-surface), white 2%)",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" fullWidth>Dismiss</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <Drawer
                direction="right"
                sizeMode="fixed"
                size={({ viewportWidth }) => viewportWidth >= 1080 ? 420 : "min(100vw, 24rem)"}
              >
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Side Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerHandle />
                    <DrawerTitle>Desktop Panel</DrawerTitle>
                    <DrawerDescription>
                      Use the header as the drag surface on desktop. The body stays scrollable.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                      {["Overview", "Team Activity", "Alerts", "System Status"].map((item) => (
                        <div
                          key={item}
                          style={{
                            padding: "var(--vds-space-3)",
                            borderRadius: "var(--vds-radius-lg)",
                            border: "1px solid var(--vds-color-border-muted)",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>

            <div
              style={{
                display: "grid",
                gap: "var(--vds-space-4)",
                gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
                marginTop: "auto",
              }}
            >
              {[
                { title: "Desktop Header Drag", text: "Mouse drag starts from the header or handle so body content can keep text selection and scrolling." },
                { title: "Touch Handoff", text: "On touch, the header always drags, and the body can pull the sheet down once the scroll region is back at its edge." },
                { title: "Viewport Safe", text: "Input focus stays on the drawer container and skips keyboard-driven remeasure jumps." },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    padding: "var(--vds-space-4)",
                    borderRadius: "var(--vds-radius-xl)",
                    border: "1px solid var(--vds-color-border-muted)",
                    background: "color-mix(in oklch, var(--vds-color-surface), transparent 4%)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)" }}>{card.title}</p>
                  <p style={{ marginTop: "var(--vds-space-1)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

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
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label htmlFor="drawer-profile-name" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Name</label>
                  <Input id="drawer-profile-name" name="name" placeholder="John Doe" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label htmlFor="drawer-profile-email" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Email</label>
                  <Input id="drawer-profile-email" name="email" placeholder="john@example.com" type="email" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label htmlFor="drawer-profile-bio" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Bio</label>
                  <Input id="drawer-profile-bio" name="bio" placeholder="Tell us about yourself..." />
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

      <Section
        title="Snap Modes"
        description="Adaptive, full-height, minimized, and step-by-step closing all share the same snap-point API."
      >
        <Row>
          <Drawer
            minimizedSize={76}
            snapPoints={[0.5, 1]}
            defaultSnapPoint={0.5}
            snapBehavior="staged"
            activeSnapPoint={adaptiveSnap}
            onActiveSnapPointChange={setAdaptiveSnap}
          >
            <DrawerTrigger asChild>
              <Button variant="outline">Adaptive + Minimized</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerHandle />
                <DrawerTitle>Adaptive Sheet</DrawerTitle>
                <DrawerDescription>
                  Opens at a smaller stage, expands on drag, then steps back to a minimized peek before fully closing.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                  <div style={{ padding: "var(--vds-space-3)", border: "1px solid var(--vds-color-border-muted)", borderRadius: "var(--vds-radius-lg)" }}>
                    Current snap value: {adaptiveSnap}
                  </div>
                  <Input name="search-destinations" placeholder="Search destinations" />
                  <Input name="pickup-location" placeholder="Pickup location" />
                  <Input name="driver-notes" placeholder="Notes for the driver" />
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" fullWidth onClick={() => setAdaptiveSnap(76)}>
                  Peek
                </Button>
                <Button variant="outline" fullWidth onClick={() => setAdaptiveSnap(0.5)}>
                  Half Stage
                </Button>
                <Button fullWidth onClick={() => setAdaptiveSnap(1)}>
                  Full Stage
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer
            sizeMode="full"
            snapPoints={[0.45, 1]}
            defaultSnapPoint={0.45}
            snapBehavior="staged"
            activeSnapPoint={fullSnap}
            onActiveSnapPointChange={setFullSnap}
          >
            <DrawerTrigger asChild>
              <Button variant="outline">Full Height</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerHandle />
                <DrawerTitle>Full Height Sheet</DrawerTitle>
                <DrawerDescription>
                  Uses a staged drag model: open small, pull up to expand, pull down to shrink, and pull again to dismiss.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                  {Array.from({ length: 8 }, (_, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "var(--vds-space-3)",
                        borderRadius: "var(--vds-radius-lg)",
                        border: "1px solid var(--vds-color-border-muted)",
                      }}
                    >
                      Item {index + 1}
                    </div>
                  ))}
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" fullWidth onClick={() => setFullSnap(0.45)}>
                  Half Height
                </Button>
                <Button fullWidth onClick={() => setFullSnap(1)}>
                  Expand
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Row>
      </Section>

      {/* ── Per-instance Theming ── */}
      <Section
        title="Theming"
        description="Override --vds-drawer-* variables on DrawerContent to theme a single drawer without touching global tokens."
      >
        <Row>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Sharper Radius</Button>
            </DrawerTrigger>
            <DrawerContent
              style={{
                ["--vds-drawer-radius" as string]: "var(--vds-radius-2)",
              }}
            >
              <DrawerHeader>
                <DrawerHandle />
                <DrawerTitle>Sharp Corners</DrawerTitle>
                <DrawerDescription>
                  This drawer overrides <code>--vds-drawer-radius</code> to a 4px token.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)" }}>
                  All other drawers keep the default surface radius. Swap <code>data-radius="pill"</code> on{" "}
                  <code>&lt;html&gt;</code> to re-theme globally instead.
                </p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Slow Motion</Button>
            </DrawerTrigger>
            <DrawerContent
              style={{
                ["--vds-drawer-duration" as string]: "700ms",
                ["--vds-drawer-ease" as string]: "var(--vds-ease-bounce)",
              }}
            >
              <DrawerHeader>
                <DrawerHandle />
                <DrawerTitle>Slow Bounce</DrawerTitle>
                <DrawerDescription>
                  Overrides <code>--vds-drawer-duration</code> and <code>--vds-drawer-ease</code>. JS picks these up via{" "}
                  <code>getComputedStyle</code>.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)" }}>
                  Open / close timing, drag-release spring, and overlay fade all respect the override.
                </p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Row>
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
              <DrawerDescription>
                Side navigation drawer for desktop and tablet layouts.
              </DrawerDescription>
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

          <Drawer
            direction="right"
            sizeMode="fixed"
            size={({ viewportWidth }) => viewportWidth >= 1080 ? 480 : "min(100vw, 28rem)"}
          >
            <DrawerTrigger asChild><Button variant="outline">Right</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerHandle />
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>
                  Fixed-size desktop drawer with mouse drag support and responsive fallback sizing.
                </DrawerDescription>
              </DrawerHeader>
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
                  <label htmlFor="drawer-settings-display-name" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                    Display Name
                  </label>
                  <Input id="drawer-settings-display-name" name="displayName" placeholder="Your name" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <label htmlFor="drawer-settings-email" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                    Email Address
                  </label>
                  <Input id="drawer-settings-email" name="settingsEmail" placeholder="you@example.com" type="email" />
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
  DrawerHeader, DrawerTitle, DrawerDescription,
  DrawerBody, DrawerFooter, DrawerClose,
} from "@virtari/react-drawer";

// Adaptive sheet with minimize + staged close
<Drawer
  direction="bottom"
  minimizedSize={72}
  snapPoints={[0.5, 1]}
  defaultSnapPoint={0.5}
  snapBehavior="staged"
>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerHandle />
      <DrawerTitle>Edit Profile</DrawerTitle>
      <DrawerDescription>Update your info.</DrawerDescription>
    </DrawerHeader>
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

// Fixed-size desktop drawer with responsive fallback
<Drawer
  direction="right"
  sizeMode="fixed"
  size={({ viewportWidth }) => viewportWidth >= 1080 ? 480 : "min(100vw, 28rem)"}
>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerHandle />
      <DrawerTitle>Ride Options</DrawerTitle>
      <DrawerDescription>
        Mouse drag and touch drag use the same pointer-based snap system.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* scrollable content */}</DrawerBody>
  </DrawerContent>
</Drawer>

// Directions: "bottom" | "top" | "left" | "right"
// sizeMode: "adaptive" | "full" | "fixed"`}</pre>
      </Section>
    </>
  );
}
