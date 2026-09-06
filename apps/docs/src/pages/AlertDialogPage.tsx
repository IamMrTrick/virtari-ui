import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogAnimation,
  type AlertDialogBackdrop,
  type AlertDialogIntent,
  type AlertDialogSize,
} from "@virtari-packages/react-alert-dialog";
import { Button } from "@virtari-packages/react-button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Section, Row } from "../components";

const SIZES: AlertDialogSize[] = ["sm", "md", "lg", "xl", "full"];
const ANIMATIONS: AlertDialogAnimation[] = [
  "scale",
  "fade",
  "slide-up",
  "slide-down",
  "zoom",
  "bounce",
  "none",
];
const BACKDROPS: AlertDialogBackdrop[] = [
  "default",
  "blur",
  "blur-strong",
  "light",
  "none",
];
const INTENTS: AlertDialogIntent[] = ["default", "destructive", "warning", "success", "info"];

export function AlertDialogPage() {
  return (
    <>
      <OverviewSection />
      <BasicSection />
      <SizesSection />
      <AnimationsSection />
      <BackdropsSection />
      <IntentsSection />
      <ScrollableSection />
      <DifferencesSection />
      <UsageSection />
    </>
  );
}

/* ──────────────────────────── Overview ──────────────────────────── */

function OverviewSection() {
  return (
    <Section
      title="Overview"
      description="A modal for actions that must be confirmed. Same visual language as Dialog — same sizes, animations, backdrops, intents — but with alertdialog semantics: Escape and outside-click do not dismiss."
    >
      <div className="docs-prose">
        <p>
          Use <VirtariInlineCode>AlertDialog</VirtariInlineCode> for commit-or-cancel flows that the user
          must explicitly resolve: destructive deletes, irreversible
          publishing, leaving with unsaved work. Use the regular{" "}
          <VirtariInlineCode>Dialog</VirtariInlineCode> for everything else.
        </p>
        <p>
          The two components share the same <VirtariInlineCode>vds-dialog-*</VirtariInlineCode> CSS and
          the same <VirtariInlineCode>size</VirtariInlineCode> / <VirtariInlineCode>animation</VirtariInlineCode> /{" "}
          <VirtariInlineCode>backdrop</VirtariInlineCode> / <VirtariInlineCode>intent</VirtariInlineCode> / <VirtariInlineCode>responsive</VirtariInlineCode>{" "}
          API — there is no separate visual style to learn. AlertDialog just
          defaults <VirtariInlineCode>intent</VirtariInlineCode> to <VirtariInlineCode>&ldquo;destructive&rdquo;</VirtariInlineCode>{" "}
          and uses <VirtariInlineCode>role=&ldquo;alertdialog&rdquo;</VirtariInlineCode> under
          the hood.
        </p>
      </div>
    </Section>
  );
}

/* ──────────────────────────── Basic ──────────────────────────── */

function BasicSection() {
  return (
    <Section
      title="Basic"
      description="A classic destructive confirmation. Must be resolved via Cancel or Action — Escape and outside-click are blocked by design."
    >
      <Row>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive">Yes, delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── Sizes ──────────────────────────── */

function SizesSection() {
  return (
    <Section
      title="Sizes"
      description="Same five presets as Dialog."
    >
      <Row>
        {SIZES.map((size) => (
          <AlertDialog key={size}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">{size}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size={size}>
              <AlertDialogHeader>
                <AlertDialogTitle>Size &ldquo;{size}&rdquo;</AlertDialogTitle>
                <AlertDialogDescription>
                  The surface grows with the chosen max-width token.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Dismiss</Button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </Row>
    </Section>
  );
}

/* ──────────────────────────── Animations ──────────────────────────── */

function AnimationsSection() {
  const [animation, setAnimation] = useState<AlertDialogAnimation>("scale");
  return (
    <Section
      title="Animations"
      description="All seven presets. Enter and exit are proper mirror images."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
        <Row>
          <Select value={animation} onValueChange={(v) => setAnimation(v as AlertDialogAnimation)}>
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
        </Row>
        <Row>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Open with &ldquo;{animation}&rdquo;</Button>
            </AlertDialogTrigger>
            <AlertDialogContent animation={animation}>
              <AlertDialogHeader>
                <AlertDialogTitle>{animation}</AlertDialogTitle>
                <AlertDialogDescription>
                  Cancel below to exercise the reverse animation.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Close</Button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Row>
      </div>
    </Section>
  );
}

/* ──────────────────────────── Backdrops ──────────────────────────── */

function BackdropsSection() {
  return (
    <Section
      title="Backdrops"
      description="Same six backdrop options."
    >
      <Row>
        {BACKDROPS.map((backdrop) => (
          <AlertDialog key={backdrop}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">{backdrop}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent backdrop={backdrop}>
              <AlertDialogHeader>
                <AlertDialogTitle>Backdrop &ldquo;{backdrop}&rdquo;</AlertDialogTitle>
                <AlertDialogDescription>
                  Use <VirtariInlineCode>blur</VirtariInlineCode> or <VirtariInlineCode>blur-strong</VirtariInlineCode> for premium
                  feel; <VirtariInlineCode>default</VirtariInlineCode> for maximum contrast.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Close</Button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </Row>
    </Section>
  );
}

/* ──────────────────────────── Intents ──────────────────────────── */

function IntentsSection() {
  return (
    <Section
      title="Intents"
      description="Default intent is `destructive` because alertdialog is most often used for risky actions. Override for warnings or info-only confirmations."
    >
      <Row>
        {INTENTS.map((intent) => (
          <AlertDialog key={intent}>
            <AlertDialogTrigger asChild>
              <Button variant={intent === "destructive" ? "destructive" : "outline"}>
                {intent}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent intent={intent}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {intent === "destructive"
                    ? "Delete this project?"
                    : intent === "warning"
                      ? "Unsaved changes will be lost"
                      : intent === "success"
                        ? "Publish these changes?"
                        : intent === "info"
                          ? "Confirm subscription"
                          : "Confirm action"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Resolve by choosing Cancel or Confirm.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant={intent === "destructive" ? "destructive" : "solid"}>
                    Confirm
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </Row>
    </Section>
  );
}

/* ──────────────────────────── Scrollable ──────────────────────────── */

function ScrollableSection() {
  return (
    <Section
      title="Long content"
      description="For rare cases where the confirmation needs more context, AlertDialogBody scrolls with sticky header/footer."
    >
      <Row>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Review and accept</Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="lg" intent="warning">
            <AlertDialogHeader variant="bordered">
              <AlertDialogTitle>Review data-export policy</AlertDialogTitle>
              <AlertDialogDescription>
                Please read before confirming the export.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} style={{ marginBlock: "var(--vds-space-3)" }}>
                  <strong>§ {i + 1}.</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Integer non justo sed nulla
                  lobortis rutrum.
                </p>
              ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button>I accept — export</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>
    </Section>
  );
}

/* ──────────────────────────── Differences ──────────────────────────── */

function DifferencesSection() {
  return (
    <Section
      title="Dialog vs AlertDialog"
      description="They share visuals but differ in semantics and available props. Pick based on the interaction model you need."
    >
      <div className="docs-prose">
        <table
          style={{
            inlineSize: "100%",
            borderCollapse: "collapse",
            fontSize: "var(--vds-text-sm)",
          }}
        >
          <thead>
            <tr style={{ textAlign: "start" }}>
              <th style={th}>Concern</th>
              <th style={th}>Dialog</th>
              <th style={th}>AlertDialog</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>Role</td>
              <td style={td}><VirtariInlineCode>dialog</VirtariInlineCode></td>
              <td style={td}><VirtariInlineCode>alertdialog</VirtariInlineCode></td>
            </tr>
            <tr>
              <td style={td}>Escape closes</td>
              <td style={td}>Yes (opt-out)</td>
              <td style={td}>No</td>
            </tr>
            <tr>
              <td style={td}>Outside click closes</td>
              <td style={td}>Yes (opt-out)</td>
              <td style={td}>No</td>
            </tr>
            <tr>
              <td style={td}>Built-in X button</td>
              <td style={td}><VirtariInlineCode>showCloseButton</VirtariInlineCode></td>
              <td style={td}>— (resolve via Action/Cancel)</td>
            </tr>
            <tr>
              <td style={td}>Default intent</td>
              <td style={td}><VirtariInlineCode>&ldquo;default&rdquo;</VirtariInlineCode></td>
              <td style={td}><VirtariInlineCode>&ldquo;destructive&rdquo;</VirtariInlineCode></td>
            </tr>
            <tr>
              <td style={td}>Size / animation / backdrop / responsive</td>
              <td style={td} colSpan={2}>Shared — identical API</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}

const th: React.CSSProperties = {
  padding: "var(--vds-space-2) var(--vds-space-3)",
  borderBlockEnd: "1px solid var(--vds-color-border)",
  fontWeight: "var(--vds-font-weight-semibold)",
};

const td: React.CSSProperties = {
  padding: "var(--vds-space-2) var(--vds-space-3)",
  borderBlockEnd: "1px solid var(--vds-color-border-muted)",
  verticalAlign: "top",
};

/* ──────────────────────────── Usage ──────────────────────────── */

function UsageSection() {
  return (
    <Section
      title="Usage"
      description="Import styles for both Dialog and AlertDialog — they share the same stylesheet."
    >
      <VirtariCodeBlock renderer="static" language="tsx" code={`// app root
import "@virtari-packages/react-dialog/styles";
import "@virtari-packages/react-alert-dialog/styles";

import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@virtari-packages/react-alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm" intent="destructive">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
      <AlertDialogAction asChild><Button variant="destructive">Delete</Button></AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`} />
    </Section>
  );
}
