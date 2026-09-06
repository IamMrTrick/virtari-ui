# Original documentation page

Source ID: `apps/docs/src/pages/ToastPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useMemo, useState } from "react";
import {
  Toaster,
  toast,
  useToast,
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  type ToastPosition,
  type ToastTimerMode,
  type ToastPauseMode,
} from "@virtari-packages/react-toast";
import { Button } from "@virtari-packages/react-button";
import { Badge } from "@virtari-packages/react-badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Switch } from "@virtari-packages/react-switch";
import { Slider } from "@virtari-packages/react-slider";
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
        <span
          style={{
            fontSize: "var(--vds-text-xs)",
            color: "var(--vds-color-text-muted)",
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

function SwitchRow({
  title,
  hint,
  checked,
  onCheckedChange,
}: {
  title: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--vds-space-4)",
        fontSize: "var(--vds-text-sm)",
        cursor: "pointer",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{title}</span>
        {hint && (
          <span
            style={{
              fontSize: "var(--vds-text-xs)",
              color: "var(--vds-color-text-muted)",
            }}
          >
            {hint}
          </span>
        )}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

function Grid({
  minCol = "16rem",
  children,
}: {
  minCol?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCol}, 1fr))`,
        gap: "var(--vds-space-3)",
      }}
    >
      {children}
    </div>
  );
}

function PillGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--vds-space-2)",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── Mock async helpers ─────────────────────────── */

function fakeRequest<T>(result: T, delay = 1600, shouldFail = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Network request failed"));
      else resolve(result);
    }, delay);
  });
}

/* ─────────────────────────────── Page ─────────────────────────────── */

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export function ToastPage() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [duration, setDuration] = useState(4000);
  const [visibleToasts, setVisibleToasts] = useState(3);
  const [expand, setExpand] = useState(false);
  const [maxToasts, setMaxToasts] = useState(8);
  const [timerMode, setTimerMode] = useState<ToastTimerMode>("parallel");
  const [pauseMode, setPauseMode] = useState<ToastPauseMode>("hover");

  return (
    <>
      <Toaster
        position={position}
        duration={duration}
        visibleToasts={visibleToasts}
        expand={expand}
        maxToasts={maxToasts}
        timerMode={timerMode}
        pauseMode={pauseMode}
      />

      <ControlsSection
        position={position}
        setPosition={setPosition}
        duration={duration}
        setDuration={setDuration}
        visibleToasts={visibleToasts}
        setVisibleToasts={setVisibleToasts}
        expand={expand}
        setExpand={setExpand}
        maxToasts={maxToasts}
        setMaxToasts={setMaxToasts}
        timerMode={timerMode}
        setTimerMode={setTimerMode}
        pauseMode={pauseMode}
        setPauseMode={setPauseMode}
      />

      <VariantsSection />
      <PositionsSection onPositionChange={setPosition} />
      <DescriptionsSection />
      <ActionsSection />
      <PromiseSection />
      <UndoConfirmSection />
      <CustomContentSection />
      <StackingSection />
      <TimerModeSection
        timerMode={timerMode}
        setTimerMode={setTimerMode}
      />
      <HookSection />
      <ImperativeApiSection />
      <LowLevelSection />
      <AccessibilitySection />
    </>
  );
}

/* ────────────────────────── Sections ────────────────────────── */

type ControlsSectionProps = {
  position: ToastPosition;
  setPosition: (p: ToastPosition) => void;
  duration: number;
  setDuration: (n: number) => void;
  visibleToasts: number;
  setVisibleToasts: (n: number) => void;
  expand: boolean;
  setExpand: (b: boolean) => void;
  maxToasts: number;
  setMaxToasts: (n: number) => void;
  timerMode: ToastTimerMode;
  setTimerMode: (m: ToastTimerMode) => void;
  pauseMode: ToastPauseMode;
  setPauseMode: (m: ToastPauseMode) => void;
};

function ControlsSection({
  position,
  setPosition,
  duration,
  setDuration,
  visibleToasts,
  setVisibleToasts,
  expand,
  setExpand,
  maxToasts,
  setMaxToasts,
  timerMode,
  setTimerMode,
  pauseMode,
  setPauseMode,
}: ControlsSectionProps) {
  return (
    <Section
      title="Live Toaster controls"
      description="Tweak the <Toaster /> props below and fire toasts from any section on this page — all of them route through the same singleton store."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
          gap: "var(--vds-space-4)",
          padding: "var(--vds-space-4)",
          background: "var(--vds-color-bg-subtle)",
          borderRadius: "var(--vds-radius-surface)",
          border: "1px solid var(--vds-color-border-muted)",
        }}
      >
        <Field label="Position">
          <Select
            value={position}
            onValueChange={(v) => setPosition(v as ToastPosition)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POSITIONS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          label={`Default duration — ${duration === 0 ? "Infinite" : `${duration} ms`}`}
          hint="0 disables auto-dismiss."
        >
          <Slider
            min={0}
            max={10000}
            step={500}
            value={[duration]}
            onValueChange={(v) => setDuration(v[0] ?? 0)}
          />
        </Field>

        <Field
          label={`Visible toasts — ${visibleToasts}`}
          hint="How many render at once."
        >
          <Slider
            min={1}
            max={6}
            step={1}
            value={[visibleToasts]}
            onValueChange={(v) => setVisibleToasts(v[0] ?? 3)}
          />
        </Field>

        <Field
          label={`Max toasts — ${maxToasts === 999 ? "Unlimited" : maxToasts}`}
          hint="Older ones are dropped from the store."
        >
          <Slider
            min={1}
            max={20}
            step={1}
            value={[maxToasts]}
            onValueChange={(v) => setMaxToasts(v[0] ?? 8)}
          />
        </Field>

        <Field
          label="Timer mode"
          hint="parallel: every toast counts its own time. sequential: only the newest counts — stacked toasts wait."
        >
          <Select
            value={timerMode}
            onValueChange={(v) => setTimerMode(v as ToastTimerMode)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="parallel">parallel</SelectItem>
              <SelectItem value="sequential">sequential</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Pause on"
          hint="hover: timer pauses while hovering/focused. press: timer only pauses while holding pointer down on a toast."
        >
          <Select
            value={pauseMode}
            onValueChange={(v) => setPauseMode(v as ToastPauseMode)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hover">hover</SelectItem>
              <SelectItem value="press">press</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <SwitchRow
          title="Expand stack by default"
          hint="When off, the stack expands on hover."
          checked={expand}
          onCheckedChange={setExpand}
        />
      </div>

      <Row>
        <Button variant="outline" onClick={() => toast.dismiss()}>
          Dismiss all
        </Button>
      </Row>
    </Section>
  );
}

function VariantsSection() {
  return (
    <Section
      title="Variants"
      description="Six built-in types. Each has its own icon, entrance animation, and semantic color."
    >
      <Grid>
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Changes saved", "Your profile is up to date.")
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Couldn't save", "The server returned a 500 error.")
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning("Unsaved changes", "Leaving now will discard them.")
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("New version available", "Refresh to get v2.4.0.")
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const id = toast.loading("Uploading file…");
            setTimeout(() => {
              toast.dismiss(id);
              toast.success("Uploaded", "report.pdf ready to share.");
            }, 2000);
          }}
        >
          Loading → Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.message("Heads up", "This is a neutral message.")}
        >
          Default
        </Button>
      </Grid>

      <VirtariCodeBlock renderer="static" language="tsx" code={`toast.success("Saved", "Your profile is up to date.");
toast.error("Couldn't save", "Server returned 500.");
toast.warning("Unsaved changes");
toast.info("New version available");
toast.loading("Uploading…");       // persists until dismissed
toast.message("Neutral message");  // no colored icon`} />
    </Section>
  );
}

function PositionsSection({
  onPositionChange,
}: {
  onPositionChange: (p: ToastPosition) => void;
}) {
  return (
    <Section
      title="Positions"
      description="Click any cell to move the Toaster and fire a toast there. Swipe direction auto-flips per corner."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--vds-space-2)",
          padding: "var(--vds-space-3)",
          border: "1px dashed var(--vds-color-border-muted)",
          borderRadius: "var(--vds-radius-surface)",
          background: "var(--vds-color-bg-subtle)",
        }}
      >
        {POSITIONS.map((p) => (
          <Button
            key={p}
            variant="outline"
            onClick={() => {
              onPositionChange(p);
              toast.info(p, "Toaster position updated.");
            }}
          >
            {p}
          </Button>
        ))}
      </div>
    </Section>
  );
}

function DescriptionsSection() {
  return (
    <Section
      title="Title & description combinations"
      description="All fields are optional — pass only what you need."
    >
      <PillGroup>
        <Button variant="outline" onClick={() => toast.success("Title only")}>
          Title only
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              type: "info",
              description: "Description-only toast without a title.",
            })
          }
        >
          Description only
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success(
              "Report exported",
              "A CSV of all transactions for the last 30 days has been generated and sent to your email.",
            )
          }
        >
          Long description
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              type: "default",
              title: "Not dismissible",
              description: "No close button, no swipe.",
              dismissible: false,
              duration: 3000,
            })
          }
        >
          Not dismissible
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              type: "warning",
              title: "Persistent",
              description: "Stays until you close it.",
              duration: 0,
            })
          }
        >
          Persistent (duration: 0)
        </Button>
      </PillGroup>
    </Section>
  );
}

function ActionsSection() {
  return (
    <Section
      title="Action buttons"
      description="Use actions.primary / actions.secondary. Five built-in variants: primary, secondary, ghost, danger, success. closeOnClick defaults to true."
    >
      <Grid>
        <Button
          variant="outline"
          onClick={() =>
            toast.withAction(
              "File archived",
              "Moved to the Archive folder.",
              {
                label: "Undo",
                variant: "ghost",
                onClick: () => toast.success("Restored", "File is back."),
              },
            )
          }
        >
          Single action (Undo)
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.withActions("New comment", "Jordan left a note on PR #42.", {
              primary: {
                label: "Review",
                variant: "primary",
                onClick: () => toast.info("Opening review…"),
              },
              secondary: {
                label: "Later",
                variant: "ghost",
                onClick: () => {},
              },
            })
          }
        >
          Primary + secondary
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.withActions(
              "Delete account?",
              "This action cannot be undone.",
              {
                primary: {
                  label: "Delete",
                  variant: "danger",
                  onClick: () => toast.success("Account deleted"),
                },
                secondary: {
                  label: "Keep",
                  variant: "ghost",
                  onClick: () => {},
                },
              },
              { type: "error", duration: 0 },
            )
          }
        >
          Destructive (no auto-dismiss)
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.withAction(
              "Invite pending",
              "Ada hasn't responded yet.",
              {
                label: "Resend",
                variant: "success",
                closeOnClick: false,
                onClick: () => toast.info("Invite resent"),
              },
              { duration: 6000 },
            )
          }
        >
          Keep open on action
        </Button>
      </Grid>

      <VirtariCodeBlock renderer="static" language="tsx" code={`toast.withActions("New comment", "Jordan left a note on PR #42.", {
  primary: {
    label: "Review",
    variant: "primary",    // primary | secondary | ghost | danger | success
    onClick: () => openReview(),
  },
  secondary: {
    label: "Later",
    variant: "ghost",
    onClick: () => {},
  },
});`} />
    </Section>
  );
}

function PromiseSection() {
  const runPromise = (ok: boolean) =>
    toast.promise(fakeRequest({ name: "report.pdf" }, 1800, !ok), {
      loading: "Uploading file…",
      success: (data) => `Uploaded ${data.name}`,
      error: (err) => `Failed — ${(err as Error).message}`,
      description: "We'll notify you when it's done.",
      successDescription: "Share link copied to clipboard.",
    });

  return (
    <Section
      title="toast.promise()"
      description="Transition a single toast between loading → success/error states using a thenable. The id is reused so no layout jump."
    >
      <Row>
        <Button onClick={() => runPromise(true)}>Run (resolves)</Button>
        <Button variant="outline" onClick={() => runPromise(false)}>
          Run (rejects)
        </Button>
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`toast.promise(api.upload(file), {
  loading: "Uploading…",
  success: (res) => \`Uploaded \${res.name}\`,
  error: (err) => \`Failed — \${err.message}\`,
  // optional long forms
  description: "We'll notify you when it's done.",
  successDescription: "Share link copied to clipboard.",
});`} />
    </Section>
  );
}

function UndoConfirmSection() {
  return (
    <Section
      title="toast.undo() & toast.confirm()"
      description="Two ergonomic presets for the most common action patterns."
    >
      <Row>
        <Button
          variant="outline"
          onClick={() =>
            toast.undo(
              "Message archived",
              "You can restore it within 5 seconds.",
              () => toast.success("Restored"),
            )
          }
        >
          Archive with Undo
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.confirm(
              "Discard changes?",
              "You have unsaved edits. This cannot be undone.",
              () => toast.info("Changes discarded"),
              () => toast.message("Cancelled"),
              {
                confirmLabel: "Discard",
                cancelLabel: "Keep editing",
                confirmVariant: "danger",
              },
            )
          }
        >
          Confirm destructive
        </Button>
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`toast.undo(
  "Message archived",
  "You can restore it within 5 seconds.",
  () => restore(messageId),
);

toast.confirm(
  "Discard changes?",
  "You have unsaved edits. This cannot be undone.",
  () => discard(),
  () => {},
  {
    confirmLabel: "Discard",
    cancelLabel: "Keep editing",
    confirmVariant: "danger",
  },
);`} />
    </Section>
  );
}

function CustomContentSection() {
  return (
    <Section
      title="Custom content"
      description="title, description, and action labels accept any ReactNode — pass JSX for richer layouts."
    >
      <Row>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              type: "info",
              title: (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--vds-space-2)",
                  }}
                >
                  Deployment queued
                  <Badge variant="secondary">v2.4.0</Badge>
                </span>
              ),
              description: (
                <span>
                  Monitor status in the{" "}
                  <a
                    href="#/composition"
                    style={{
                      color: "var(--vds-color-primary-emphasis)",
                      textDecoration: "underline",
                    }}
                  >
                    build pipeline
                  </a>
                  .
                </span>
              ),
              duration: 6000,
            })
          }
        >
          JSX title + link
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              type: "success",
              title: "Payment received",
              description: "$240.00 from Acme Inc.",
              icon: (
                <span
                  role="img"
                  aria-label="money"
                  style={{ fontSize: "1.15rem" }}
                >
                  💰
                </span>
              ),
            })
          }
        >
          Custom icon (emoji)
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              type: "default",
              title: "Hide icon",
              description: "Pass icon: false to suppress the type icon.",
              icon: false,
            })
          }
        >
          No icon
        </Button>
      </Row>
    </Section>
  );
}

function StackingSection() {
  const spawn = (n: number) => {
    const labels = [
      "Queued job #847",
      "Deploy started",
      "Tests passing",
      "Cache warmed",
      "Canary 25%",
      "Rollout complete",
    ];
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        toast.info(labels[i % labels.length]!, `Event ${i + 1} of ${n}`);
      }, i * 250);
    }
  };

  return (
    <Section
      title="Stacking & expand"
      description="Hover the stack to expand it (unless expand is on). The newest toast has the highest z-index; older ones scale and fade."
    >
      <Row>
        <Button onClick={() => spawn(3)}>Fire 3</Button>
        <Button onClick={() => spawn(6)} variant="outline">
          Fire 6
        </Button>
        <Button onClick={() => spawn(12)} variant="outline">
          Fire 12 (maxToasts caps it)
        </Button>
      </Row>
    </Section>
  );
}

interface TimerModeSectionProps {
  timerMode: ToastTimerMode;
  setTimerMode: (m: ToastTimerMode) => void;
}

function TimerModeSection({ timerMode, setTimerMode }: TimerModeSectionProps) {
  const fireBatch = () => {
    const messages = [
      { t: "Job #101 queued", d: "Will run in about 3s." },
      { t: "Job #102 queued", d: "Waiting behind #101." },
      { t: "Job #103 queued", d: "Waiting behind #102." },
      { t: "Job #104 queued", d: "Waiting behind #103." },
    ];
    messages.forEach((m, i) => {
      setTimeout(() => {
        toast.info(m.t, m.d, { duration: 3000 });
      }, i * 120);
    });
  };

  return (
    <Section
      title="Timer mode — sequential queue"
      description="Choose how auto-dismiss countdowns behave for stacked toasts."
    >
      <Row>
        <Button
          variant={timerMode === "parallel" ? "solid" : "outline"}
          onClick={() => setTimerMode("parallel")}
        >
          parallel
        </Button>
        <Button
          variant={timerMode === "sequential" ? "solid" : "outline"}
          onClick={() => setTimerMode("sequential")}
        >
          sequential
        </Button>
        <Button onClick={fireBatch}>Fire 4 toasts</Button>
      </Row>

      <ul
        className="docs-prose"
        style={{ paddingInlineStart: "1.25em", marginBlockStart: 0 }}
      >
        <li>
          <strong>parallel</strong> (default) — every toast counts down from
          its own <VirtariInlineCode>createdAt</VirtariInlineCode>, independent of stack position. Older
          stacked toasts can auto-dismiss while you're reading the newest.
        </li>
        <li>
          <strong>sequential</strong> — only the newest visible toast counts
          down. The ones behind it wait with their timer paused; when the
          newest dismisses, the next becomes active and its timer resets to a
          full <VirtariInlineCode>duration</VirtariInlineCode>. Useful when every message must be seen.
        </li>
      </ul>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Toaster timerMode="sequential" duration={3000} />`} />
    </Section>
  );
}

function HookSection() {
  const { toasts, dismissAll } = useToast();
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of toasts) counts[t.type] = (counts[t.type] ?? 0) + 1;
    return counts;
  }, [toasts]);

  return (
    <Section
      title="useToast() hook"
      description="Read the live toast list in React. Backed by useSyncExternalStore so it's SSR-safe and re-renders only the consumer."
    >
      <Row>
        <span
          style={{
            fontSize: "var(--vds-text-sm)",
            color: "var(--vds-color-text-muted)",
          }}
        >
          Currently showing:
        </span>
        <strong>{toasts.length}</strong>
        {Object.entries(typeCounts).map(([type, n]) => (
          <Badge key={type} variant="secondary">
            {type}: {n}
          </Badge>
        ))}
        <Button size="sm" variant="ghost" onClick={dismissAll}>
          Clear
        </Button>
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`import { useToast } from "@virtari-packages/react-toast";

function Header() {
  const { toasts, toast, dismiss, dismissAll } = useToast();
  return (
    <div>
      {toasts.length > 0 && <Badge>{toasts.length} alerts</Badge>}
      <Button onClick={() => toast.info("Hi!")}>Notify</Button>
    </div>
  );
}`} />
    </Section>
  );
}

function ImperativeApiSection() {
  return (
    <Section
      title="Imperative API — full reference"
      description="Call these from anywhere — services, event handlers, zustand actions, etc. No React context required."
    >
      <VirtariCodeBlock renderer="static" language="tsx" code={`import { toast } from "@virtari-packages/react-toast";

// Type shortcuts
toast(options);                 // generic
toast.success(title, desc?, opts?);
toast.error(title, desc?, opts?);
toast.warning(title, desc?, opts?);
toast.info(title, desc?, opts?);
toast.loading(title, desc?, opts?);   // duration defaults to 0
toast.message(title, desc?, opts?);   // neutral (no colored icon)

// Lifecycle
const id = toast.success("Hi");
toast.dismiss(id);              // dismiss one
toast.dismiss();                // dismiss all

// Patterns
toast.promise(promise, { loading, success, error, description?, successDescription?, errorDescription? });
toast.withAction(title, desc?, action, opts?);
toast.withActions(title, desc?, { primary?, secondary? }, opts?);
toast.undo(title, desc, onUndo, opts?);
toast.confirm(title, desc, onConfirm, onCancel?, { confirmLabel?, cancelLabel?, confirmVariant?, cancelVariant? });

// ToastOptions
type ToastOptions = {
  id?: string;
  type?: "success" | "error" | "warning" | "info" | "loading" | "default";
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionConfig;       // legacy single-slot
  actions?: { primary?: …; secondary?: … };
  duration?: number;                // ms; 0 = persist
  dismissible?: boolean;            // default true
  icon?: ReactNode | false;         // override or suppress
};`} />
    </Section>
  );
}

function LowLevelSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section
      title="Low-level primitives (power users)"
      description="If you need full control over each toast's open state, render your own primitive tree using the exported primitives. The <Toaster /> sits at a higher level and drives the store — drop down here only when the imperative API can't express what you need."
    >
      <ToastProvider swipeDirection="right">
        <Row>
          <Button variant="outline" onClick={() => setOpen((v) => !v)}>
            Toggle controlled toast
          </Button>
        </Row>

        <ToastRoot
          open={open}
          onOpenChange={setOpen}
          duration={Infinity}
          className="vds-toast vds-toast--info"
          data-type="info"
          data-index="0"
        >
          <div className="vds-toast__content">
            <div className="vds-toast__text">
              <ToastTitle>Manual mode</ToastTitle>
              <ToastDescription>
                You own open/close; no global store involved.
              </ToastDescription>
              <div className="vds-toast__actions">
                <ToastAction
                  altText="Got it"
                  className="vds-toast-action vds-toast-action--primary"
                  onClick={() => setOpen(false)}
                >
                  Got it
                </ToastAction>
              </div>
            </div>
            <div className="vds-toast__close-container">
              <ToastClose aria-label="Close">×</ToastClose>
            </div>
          </div>
        </ToastRoot>

        <ToastViewport className="vds-toaster vds-toaster--bottom-right" />
      </ToastProvider>

      <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  ToastProvider, ToastViewport,
  ToastRoot, ToastTitle, ToastDescription,
  ToastAction, ToastClose,
} from "@virtari-packages/react-toast";

<ToastProvider swipeDirection="right">
  <ToastRoot open={open} onOpenChange={setOpen} duration={Infinity}>
    <ToastTitle>Manual mode</ToastTitle>
    <ToastDescription>Full primitive control</ToastDescription>
    <ToastAction altText="Got it">Got it</ToastAction>
    <ToastClose />
  </ToastRoot>
  <ToastViewport />
</ToastProvider>`} />
    </Section>
  );
}

function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Built-in a11y — handled for you."
    >
      <ul className="docs-prose" style={{ paddingInlineStart: "1.25em" }}>
        <li>
          <strong>Screen readers</strong> — each toast is announced via a polite
          <VirtariInlineCode> aria-live </VirtariInlineCode> region (assertive for warnings/errors via
          the <VirtariInlineCode>type</VirtariInlineCode> prop). The announcer dedupes rapid-fire updates.
        </li>
        <li>
          <strong>Keyboard</strong> — press <kbd>F8</kbd> to move focus into the
          viewport, then <kbd>Tab</kbd> through close buttons and actions.
          <kbd>Esc</kbd> dismisses the newest toast.
        </li>
        <li>
          <strong>Pause on hover & focus</strong> — timers pause while the
          viewport is hovered or any toast inside it holds focus.
        </li>
        <li>
          <strong>Swipe to dismiss</strong> — swipe direction adapts to the
          Toaster position (right-anchored stacks swipe right, etc.) with a
          configurable <VirtariInlineCode>swipeThreshold</VirtariInlineCode>.
        </li>
        <li>
          <strong>Reduced motion</strong> — when{" "}
          <VirtariInlineCode>prefers-reduced-motion: reduce</VirtariInlineCode> is set, all entrance /
          exit animations and transitions are disabled.
        </li>
        <li>
          <strong>RTL</strong> — pass <VirtariInlineCode>dir="rtl"</VirtariInlineCode> to the Toaster to
          mirror positions and swipe direction.
        </li>
      </ul>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Toaster
  position="top-right"
  duration={4000}
  visibleToasts={3}
  expand={false}
  hotkey={["F8"]}
  swipeThreshold={50}
  maxToasts={8}
  dir="ltr"                      // or "rtl"
  closeLabel="Close notification"
/>`} />
    </Section>
  );
}

```
