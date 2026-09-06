# Original documentation page

Source ID: `apps/docs/src/pages/DialogPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useRef, useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { Checkbox } from "@virtari-packages/react-checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogCloseIcon,
  type DialogAnimation,
  type DialogBackdrop,
  type DialogIntent,
  type DialogSize,
} from "@virtari-packages/react-dialog";
import { Input } from "@virtari-packages/react-input";
import { Textarea } from "@virtari-packages/react-textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Section, Row } from "../components";

/* ─────────────────────────────── Helpers ─────────────────────────────── */

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-sm)",
        color: "var(--vds-color-text)",
      }}
    >
      <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{label}</span>
      {children}
      {hint && (
        <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "var(--vds-text-xs)",
        color: "var(--vds-color-text-muted)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

const SIZES: DialogSize[] = ["sm", "md", "lg", "xl", "full"];
const ANIMATIONS: DialogAnimation[] = [
  "scale",
  "fade",
  "slide-up",
  "slide-down",
  "zoom",
  "bounce",
  "none",
];
const BACKDROPS: DialogBackdrop[] = [
  "default",
  "blur",
  "blur-strong",
  "light",
  "none",
];
const INTENTS: DialogIntent[] = ["default", "destructive", "warning", "success", "info"];

/* ──────────────────────────── Page ──────────────────────────── */

export function DialogPage() {
  return (
    <>
      <OverviewSection />
      <BasicSection />
      <AnatomySection />
      <SizesSection />
      <AnimationsSection />
      <BackdropsSection />
      <IntentsSection />
      <CloseButtonSection />
      <ScrollableSection />
      <FormSection />
      <DestructiveSection />
      <ControlledSection />
      <PreventCloseSection />
      <PortalSection />
      <ResponsiveSection />
      <NestedSection />
      <AccessibilitySection />
      <InstallationSection />
      <ApiReferenceSection />
    </>
  );
}

/* ──────────────────────────── 1. Overview ──────────────────────────── */

function OverviewSection() {
  return (
    <Section
      title="Overview"
      description="A modal surface that blocks the page until resolved. Provides focus trap, scroll lock, and aria-modal semantics out of the box."
    >
      <div className="docs-prose">
        <p>
          Dialog is the design-system&apos;s primary overlay for blocking modal
          content — profile editors, confirmations, checkout flows, settings panes.
          All accessibility concerns (focus trap, return focus, aria-modal,
          Escape dismissal, click-outside dismissal, body scroll lock) are handled
          for you. Virtari layers on theming, animation variants, backdrop
          variants, size variants, intent accents, and enterprise controls like
          portal container override and close-prevention.
        </p>
        <ul>
          <li>5 sizes · 7 animation presets · 6 backdrop styles · 5 intent accents</li>
          <li>Built-in close button with <VirtariInlineCode>showCloseButton</VirtariInlineCode></li>
          <li>Compound slots: <VirtariInlineCode>DialogHeader</VirtariInlineCode>, <VirtariInlineCode>DialogBody</VirtariInlineCode>, <VirtariInlineCode>DialogFooter</VirtariInlineCode></li>
          <li>Responsive full-screen below 40rem with <VirtariInlineCode>responsive</VirtariInlineCode></li>
          <li>Prevent dismissal via <VirtariInlineCode>preventCloseOnEscape</VirtariInlineCode> / <VirtariInlineCode>preventCloseOnOutsideClick</VirtariInlineCode></li>
          <li>Honours <VirtariInlineCode>prefers-reduced-motion</VirtariInlineCode> via motion tokens</li>
        </ul>
      </div>
    </Section>
  );
}

/* ──────────────────────────── 2. Basic ──────────────────────────── */

function BasicSection() {
  return (
    <Section
      title="Basic"
      description="A dialog with a title, description, and two footer actions. Click-outside and Escape both close it."
    >
      <Row>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 3. Anatomy ──────────────────────────── */

function AnatomySection() {
  return (
    <Section
      title="Anatomy"
      description="The full set of compound components. Use DialogHeader + DialogBody + DialogFooter for scrollable content; Title/Description/Footer alone is fine for short messages."
    >
      <VirtariCodeBlock renderer="static" language="tsx" code={`<Dialog>                             // Root — controls open state
  <DialogTrigger />                  // Button that opens the dialog
  <DialogContent>                    // Modal surface + internal overlay + portal
    <DialogHeader>                   // Sticky top — optional
      <DialogTitle />                // Required for a11y (or aria-label on content)
      <DialogDescription />          // Linked to content via aria-describedby
    </DialogHeader>
    <DialogBody />                   // Scrollable main region — optional
    <DialogFooter>                   // Sticky actions — optional
      <DialogClose />                // Any element that dismisses on click
    </DialogFooter>
    <DialogCloseIcon />              // Absolute X button (or use showCloseButton prop)
  </DialogContent>
</Dialog>`} />
    </Section>
  );
}

/* ──────────────────────────── 4. Sizes ──────────────────────────── */

function SizesSection() {
  return (
    <Section
      title="Sizes"
      description="Five max-width presets. `full` fills the viewport (no border-radius, 100vw × 100dvh)."
    >
      <Row>
        {SIZES.map((size) => (
          <Dialog key={size}>
            <DialogTrigger asChild>
              <Button variant="outline">{size}</Button>
            </DialogTrigger>
            <DialogContent size={size} showCloseButton>
              <DialogHeader>
                <DialogTitle>Size &ldquo;{size}&rdquo;</DialogTitle>
                <DialogDescription>
                  max-inline-size changes per variant. &quot;full&quot; ignores max-width entirely.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Caption>Content scrolls if it overflows {size === "full" ? "the viewport" : "85dvh"}.</Caption>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 5. Animations ──────────────────────────── */

function AnimationsSection() {
  const [animation, setAnimation] = useState<DialogAnimation>("scale");
  return (
    <Section
      title="Animations"
      description="Seven presets. Each swaps the underlying keyframe, easing, and duration via CSS custom properties — no JS. All honour prefers-reduced-motion."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
        <Field label="Pick an animation" hint="Then open the dialog to preview it.">
          <Select value={animation} onValueChange={(v) => setAnimation(v as DialogAnimation)}>
            <SelectTrigger style={{ maxInlineSize: "14rem" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ANIMATIONS.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Row>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open with &ldquo;{animation}&rdquo;</Button>
            </DialogTrigger>
            <DialogContent animation={animation} showCloseButton>
              <DialogHeader>
                <DialogTitle>{animation}</DialogTitle>
                <DialogDescription>
                  Open and close a few times to feel the enter/exit curves.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Caption>
                  Tokens behind this preset: <VirtariInlineCode>--dialog-enter-animation</VirtariInlineCode>,{" "}
                  <VirtariInlineCode>--dialog-enter-ease</VirtariInlineCode>, <VirtariInlineCode>--dialog-enter-duration</VirtariInlineCode>.
                </Caption>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
      </div>
    </Section>
  );
}

/* ──────────────────────────── 6. Backdrops ──────────────────────────── */

function BackdropsSection() {
  return (
    <Section
      title="Backdrops"
      description="Overlay variants range from solid tint to acrylic-style blur. `none` is for special cases where the dialog should float without darkening the page (spotlight tours, non-blocking overlays)."
    >
      <Row>
        {BACKDROPS.map((backdrop) => (
          <Dialog key={backdrop}>
            <DialogTrigger asChild>
              <Button variant="outline">{backdrop}</Button>
            </DialogTrigger>
            <DialogContent backdrop={backdrop} showCloseButton>
              <DialogHeader>
                <DialogTitle>Backdrop &ldquo;{backdrop}&rdquo;</DialogTitle>
                <DialogDescription>
                  {backdrop === "blur" || backdrop === "blur-strong"
                    ? "Uses backdrop-filter. Falls back gracefully on older browsers."
                    : backdrop === "none"
                      ? "No overlay renders — pointer-events pass through."
                      : "Sets the background-color on the overlay."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 7. Intents ──────────────────────────── */

function IntentsSection() {
  return (
    <Section
      title="Intents"
      description="A 3px colored strip along the top edge. Use sparingly — destructive and warning are the common cases."
    >
      <Row>
        {INTENTS.map((intent) => (
          <Dialog key={intent}>
            <DialogTrigger asChild>
              <Button variant={intent === "destructive" ? "destructive" : "outline"}>
                {intent}
              </Button>
            </DialogTrigger>
            <DialogContent intent={intent} showCloseButton>
              <DialogHeader>
                <DialogTitle>
                  {intent === "destructive"
                    ? "Delete this project?"
                    : intent === "warning"
                      ? "Unsaved changes"
                      : intent === "success"
                        ? "Changes saved"
                        : intent === "info"
                          ? "New update available"
                          : "Edit details"}
                </DialogTitle>
                <DialogDescription>
                  data-intent=&ldquo;{intent}&rdquo; drives the accent color token.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 8. Close button ──────────────────────────── */

function CloseButtonSection() {
  return (
    <Section
      title="With close button"
      description="Pass `showCloseButton` to auto-render an X in the top-end corner. Or drop in `<DialogCloseIcon>` manually for custom placement/content."
    >
      <Row>
        <Dialog>
          <DialogTrigger asChild>
            <Button>showCloseButton</Button>
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>Automatic close button</DialogTitle>
              <DialogDescription>
                The X in the top-right is rendered by DialogContent itself.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Done</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Manual DialogCloseIcon</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manual placement</DialogTitle>
              <DialogDescription>
                Use <VirtariInlineCode>&lt;DialogCloseIcon&gt;</VirtariInlineCode> yourself when you need a custom icon or slot.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Done</Button>
              </DialogClose>
            </DialogFooter>
            <DialogCloseIcon aria-label="Dismiss" />
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 9. Scrollable ──────────────────────────── */

function ScrollableSection() {
  return (
    <Section
      title="Scrollable content"
      description="Pair `DialogBody` with `DialogHeader` and `DialogFooter` to get a sticky header/footer over a scrolling body."
    >
      <Row>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open terms of service</Button>
          </DialogTrigger>
          <DialogContent size="lg" showCloseButton>
            <DialogHeader variant="bordered">
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                Last updated 2026-04-01. Please review before accepting.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {Array.from({ length: 18 }).map((_, i) => (
                <p key={i} style={{ marginBlock: "var(--vds-space-3)" }}>
                  <strong>§ {i + 1}.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Vestibulum consequat magna eu orci fermentum, at malesuada urna
                  ultricies. Praesent lacinia tortor at arcu suscipit, vitae condimentum
                  magna gravida. Integer non justo sed nulla lobortis rutrum.
                </p>
              ))}
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Decline</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Accept</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 10. Form ──────────────────────────── */

function FormSection() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    setEmail("");
    setNote("");
  };

  return (
    <Section
      title="Form integration"
      description="Put inputs in DialogBody and use a controlled dialog. The form spans Body + Footer via display: contents so submission flows through naturally without breaking the flex layout."
    >
      <Row>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Invite teammate</Button>
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>Invite a teammate</DialogTitle>
              <DialogDescription>
                They&apos;ll get an email invitation to join this workspace.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} style={{ display: "contents" }}>
              <DialogBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
                  <Field label="Email" htmlFor="invite-email">
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="teammate@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Personal note" htmlFor="invite-note" hint="Optional.">
                    <Textarea
                      id="invite-note"
                      rows={3}
                      placeholder="Hey! Come build with us."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Field>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send invite</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 11. Destructive ──────────────────────────── */

function DestructiveSection() {
  return (
    <Section
      title="Destructive confirmation"
      description="Combine intent=&ldquo;destructive&rdquo; with a destructive button. The top accent and Button color reinforce the stakes."
    >
      <Row>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent intent="destructive" size="sm">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">Yes, delete account</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 12. Controlled ──────────────────────────── */

function ControlledSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section
      title="Controlled mode"
      description="Lift the open state into your component for side-effects, analytics, or programmatic opens."
    >
      <Row>
        <Button onClick={() => setOpen(true)}>Open from parent</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                The trigger lives outside the Dialog root. State sits in the parent.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 13. Prevent close ──────────────────────────── */

function PreventCloseSection() {
  const [blockEscape, setBlockEscape] = useState(true);
  const [blockOutside, setBlockOutside] = useState(true);
  return (
    <Section
      title="Preventing close"
      description="Guard dialogs with in-progress work. You remain in full control of when the dialog dismisses."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
        <Row>
          <label className="docs-inline-field">
            <Checkbox checked={blockEscape} onCheckedChange={(v) => setBlockEscape(Boolean(v))} />
            <span>preventCloseOnEscape</span>
          </label>
          <label className="docs-inline-field">
            <Checkbox checked={blockOutside} onCheckedChange={(v) => setBlockOutside(Boolean(v))} />
            <span>preventCloseOnOutsideClick</span>
          </label>
        </Row>
        <Row>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open guarded dialog</Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton
              preventCloseOnEscape={blockEscape}
              preventCloseOnOutsideClick={blockOutside}
            >
              <DialogHeader>
                <DialogTitle>Unsaved changes</DialogTitle>
                <DialogDescription>
                  You have unsaved changes. Use the buttons below to dismiss —
                  Escape and outside-click are blocked while the toggles above are on.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Discard</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Save and close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
      </div>
    </Section>
  );
}

/* ──────────────────────────── 14. Portal container ──────────────────────────── */

function PortalSection() {
  const portalRef = useRef<HTMLDivElement>(null);
  return (
    <Section
      title="Custom portal container"
      description="By default the dialog portals into `document.body`. Pass `container` to render inside a scoped wrapper — useful for iframes, shadow roots, or theme-scoped trees."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
        <Row>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open inside scoped container</Button>
            </DialogTrigger>
            <DialogContent container={portalRef.current} showCloseButton>
              <DialogHeader>
                <DialogTitle>Scoped portal</DialogTitle>
                <DialogDescription>
                  This dialog&apos;s portal target is the bordered box below, not document.body.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
        <div
          ref={portalRef}
          style={{
            position: "relative",
            blockSize: "16rem",
            border: "1px dashed var(--vds-color-border)",
            borderRadius: "var(--vds-radius-card)",
            background: "var(--vds-color-bg-subtle)",
            overflow: "hidden",
          }}
        >
          <Caption>Portal target</Caption>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────── 15. Responsive ──────────────────────────── */

function ResponsiveSection() {
  return (
    <Section
      title="Responsive"
      description="Pass `responsive` to make the dialog fill the viewport below 40rem (≈ 640px). Above that breakpoint it keeps its normal size."
    >
      <Row>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open responsive</Button>
          </DialogTrigger>
          <DialogContent responsive size="md" showCloseButton animation="slide-up">
            <DialogHeader variant="bordered">
              <DialogTitle>Responsive dialog</DialogTitle>
              <DialogDescription>
                Resize the window under 640px to see the mobile full-screen layout.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Caption>
                On small screens the dialog slides up like a sheet; on large screens it
                stays centered with your chosen animation.
              </Caption>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 16. Nested ──────────────────────────── */

function NestedSection() {
  return (
    <Section
      title="Nested dialogs"
      description="Dialogs can nest. Each layer gets its own overlay stacked by z-index. Escape closes only the topmost."
    >
      <Row>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open outer</Button>
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>Outer dialog</DialogTitle>
              <DialogDescription>
                Triggering an inner dialog opens a second modal on top of this one.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open inner</Button>
                </DialogTrigger>
                <DialogContent size="sm" animation="zoom" intent="info" showCloseButton>
                  <DialogHeader>
                    <DialogTitle>Inner dialog</DialogTitle>
                    <DialogDescription>
                      Escape closes just this layer.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close inner</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close outer</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── 17. Accessibility ──────────────────────────── */

function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Built in. You still need to label the dialog and pick sensible dismiss semantics."
    >
      <div className="docs-prose">
        <ul>
          <li>
            <strong>Labeling.</strong> Always render a <VirtariInlineCode>DialogTitle</VirtariInlineCode> or
            pass <VirtariInlineCode>aria-label</VirtariInlineCode>/<VirtariInlineCode>aria-labelledby</VirtariInlineCode> on <VirtariInlineCode>DialogContent</VirtariInlineCode>.
            A development-mode warning fires if neither is present.
          </li>
          <li>
            <strong>Description.</strong> <VirtariInlineCode>DialogDescription</VirtariInlineCode> wires up
            <VirtariInlineCode> aria-describedby</VirtariInlineCode> automatically.
          </li>
          <li>
            <strong>Focus trap.</strong> Tab/Shift+Tab cycles within the dialog.
            Focus returns to the trigger on close (or the last focused element if
            the trigger was removed).
          </li>
          <li>
            <strong>Scroll lock.</strong> Body scrolling is disabled while the
            dialog is open via <VirtariInlineCode>react-remove-scroll</VirtariInlineCode>.
          </li>
          <li>
            <strong>Dismissal.</strong> Escape, outside-click, and any{" "}
            <VirtariInlineCode>DialogClose</VirtariInlineCode> element dismiss by default. Use
            <VirtariInlineCode> preventCloseOnEscape</VirtariInlineCode> / <VirtariInlineCode>preventCloseOnOutsideClick</VirtariInlineCode>
            when you need to guard unsaved work.
          </li>
          <li>
            <strong>Motion.</strong> Every animation reads durations from
            <VirtariInlineCode> --vds-duration-*</VirtariInlineCode> which collapse to 0ms under
            <VirtariInlineCode> prefers-reduced-motion: reduce</VirtariInlineCode>.
          </li>
        </ul>
      </div>
    </Section>
  );
}

/* ──────────────────────────── 18. Installation ──────────────────────────── */

function InstallationSection() {
  return (
    <Section
      title="Installation"
      description="The package ships ESM + CJS with a separate CSS file. Import styles once at your app root."
    >
      <VirtariCodeBlock renderer="static" language="shell" code={`pnpm add @virtari-packages/react-dialog

// app root
import "@virtari-packages/react-dialog/styles";
// (tokens auto-imported via Dialog.css — or bring them yourself)
import "@virtari-packages/react-dialog/tokens";`} />
    </Section>
  );
}

/* ──────────────────────────── 19. API reference ──────────────────────────── */

function ApiReferenceSection() {
  return (
    <Section
      title="API reference"
      description="Full prop surface for each compound component."
    >
      <VirtariCodeBlock renderer="static" language="tsx" code={`interface DialogContentProps extends DialogPrimitive.ContentProps {
  size?: "sm" | "md" | "lg" | "xl" | "full";             // default "md"
  animation?: "scale" | "fade" | "slide-up" | "slide-down"
            | "zoom" | "bounce" | "none";                 // default "scale"
  intent?: "default" | "destructive" | "warning"
         | "success" | "info";                            // default "default"
  backdrop?: "default" | "blur" | "blur-strong"
           | "light" | "none";                              // default "default"
  responsive?: boolean;                                   // full-screen below 40rem
  showCloseButton?: boolean;                              // render built-in X
  closeButtonLabel?: string;                              // default "Close"
  container?: HTMLElement | null;                         // custom portal target
  preventCloseOnOutsideClick?: boolean;
  preventCloseOnEscape?: boolean;
}

interface DialogOverlayProps extends DialogPrimitive.OverlayProps {
  backdrop?: DialogBackdrop;                              // default "default"
}

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "plain" | "bordered";                         // default "plain"
}

interface DialogBodyProps     extends HTMLAttributes<HTMLDivElement> {}
interface DialogFooterProps   extends HTMLAttributes<HTMLDivElement> {}
interface DialogTitleProps       extends DialogPrimitive.TitleProps {}
interface DialogDescriptionProps extends DialogPrimitive.DescriptionProps {}
interface DialogCloseIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {}`} />
    </Section>
  );
}

```
