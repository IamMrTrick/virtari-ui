import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
} from "@virtari-packages/react-command";
import "@virtari-packages/react-command/styles";
import "@virtari-packages/react-dialog/styles";
import { Button } from "@virtari-packages/react-button";
import { KbdShortcut } from "@virtari-packages/react-kbd";
import { ariaKeyShortcuts, useKeyboardPlatform } from "@virtari-packages/utils";
import "@virtari-packages/react-button/styles";
import {
  IconBell,
  IconCalendar,
  IconFile,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsers,
} from "@virtari-packages/react-icons";
import { Section, Stack } from "../components";

/* ────────────────────────────────────────────────────────────
 * Inline showcase — Command.Root embedded in the page
 * ──────────────────────────────────────────────────────────── */

function InlineCommand() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Stack>
      <div
        style={{
          maxInlineSize: "28rem",
          border: "1px solid var(--vds-color-border-default, #e5e7eb)",
          borderRadius: "var(--vds-command-radius, 0.75rem)",
          overflow: "hidden",
        }}
      >
        <Command.Root label="Inline command palette">
          <Command.Input placeholder="Search actions…" />
          <Command.List>
            <Command.Empty>No results.</Command.Empty>
            <Command.Group heading="Account">
              <Command.Item
                value="profile"
                leftSection={<IconUser size={16} aria-hidden="true" />}
                onSelect={() => setSelected("profile")}
              >
                Open profile
              </Command.Item>
              <Command.Item
                value="settings"
                leftSection={<IconSettings size={16} aria-hidden="true" />}
                shortcut="mod+,"
                onSelect={() => setSelected("settings")}
              >
                Settings
              </Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Actions">
              <Command.Item
                value="new-doc"
                leftSection={<IconPlus size={16} aria-hidden="true" />}
                shortcut="mod+n"
                onSelect={() => setSelected("new-doc")}
              >
                New document
              </Command.Item>
              <Command.Item
                value="notifications"
                leftSection={<IconBell size={16} aria-hidden="true" />}
                onSelect={() => setSelected("notifications")}
              >
                Toggle notifications
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Root>
      </div>
      <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
        Last selected: <VirtariInlineCode>{selected ?? "—"}</VirtariInlineCode>
      </p>
    </Stack>
  );
}

/* ────────────────────────────────────────────────────────────
 * Dialog showcase — a distinct shortcut leaves site search available
 * ──────────────────────────────────────────────────────────── */

function DialogCommand() {
  const keyboardPlatform = useKeyboardPlatform();
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  const select = (id: string) => {
    setLast(id);
    setOpen(false);
  };

  return (
    <Stack>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3, 0.75rem)", flexWrap: "wrap" }}>
        <Button onClick={() => setOpen(true)} aria-keyshortcuts={ariaKeyShortcuts("mod+shift+k", keyboardPlatform)}>
          <IconSearch size={16} aria-hidden="true" />
          Open palette
        </Button>
        <span style={{ color: "var(--vds-color-text-muted, #6b7280)" }}>
          or press <KbdShortcut combo="mod+shift+k" />
        </span>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        hotkey="mod+shift+k"
        title="Command palette"
      >
        <Command.Input placeholder="Type a command or search…" />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Navigation">
            <Command.Item
              value="users"
              leftSection={<IconUsers size={16} aria-hidden="true" />}
              shortcut="mod+u"
              onSelect={() => select("users")}
            >
              Users
            </Command.Item>
            <Command.Item
              value="files"
              leftSection={<IconFile size={16} aria-hidden="true" />}
              shortcut="mod+shift+f"
              onSelect={() => select("files")}
            >
              Files
            </Command.Item>
            <Command.Item
              value="calendar"
              leftSection={<IconCalendar size={16} aria-hidden="true" />}
              onSelect={() => select("calendar")}
            >
              Calendar
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Actions">
            <Command.Item
              value="new-project"
              leftSection={<IconPlus size={16} aria-hidden="true" />}
              shortcut="mod+shift+n"
              onSelect={() => select("new-project")}
            >
              New project
            </Command.Item>
            <Command.Item
              value="settings"
              leftSection={<IconSettings size={16} aria-hidden="true" />}
              shortcut="mod+,"
              onSelect={() => select("settings")}
            >
              Settings
            </Command.Item>
          </Command.Group>
        </Command.List>
      </CommandDialog>

      <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
        Last selected: <VirtariInlineCode>{last ?? "—"}</VirtariInlineCode>
      </p>
    </Stack>
  );
}

/* ────────────────────────────────────────────────────────────
 * Async showcase — simulated search
 * ──────────────────────────────────────────────────────────── */

interface Hit {
  id: string;
  title: string;
  kind: "user" | "doc" | "action";
}

const DATASET: Hit[] = [
  { id: "u-1", title: "Amelia Smith", kind: "user" },
  { id: "u-2", title: "Liam Anderson", kind: "user" },
  { id: "u-3", title: "Noah Garcia", kind: "user" },
  { id: "d-1", title: "Q3 Design Review Notes", kind: "doc" },
  { id: "d-2", title: "Release Plan — v4.2", kind: "doc" },
  { id: "d-3", title: "Onboarding Handbook", kind: "doc" },
  { id: "a-1", title: "Archive selected", kind: "action" },
  { id: "a-2", title: "Invite new teammate", kind: "action" },
];

function AsyncCommand() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState<Hit[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setHits([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = window.setTimeout(() => {
      const needle = query.toLowerCase();
      setHits(DATASET.filter((h) => h.title.toLowerCase().includes(needle)));
      setLoading(false);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <Stack>
      <div
        style={{
          maxInlineSize: "28rem",
          border: "1px solid var(--vds-color-border-default, #e5e7eb)",
          borderRadius: "var(--vds-command-radius, 0.75rem)",
          overflow: "hidden",
        }}
      >
        <Command.Root shouldFilter={false} label="Async search">
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search users, docs, actions…"
          />
          <Command.List>
            {loading ? <Command.Loading>Searching…</Command.Loading> : null}
            {!loading && query.length > 0 && hits.length === 0 ? (
              <Command.Empty>No matches for “{query}”.</Command.Empty>
            ) : null}
            {!loading && hits.length > 0 ? (
              <Command.Group heading="Results">
                {hits.map((h) => (
                  <Command.Item
                    key={h.id}
                    value={h.id}
                    rightSection={
                      <span style={{ fontSize: "var(--vds-text-xs, 0.75rem)" }}>
                        {h.kind}
                      </span>
                    }
                    onSelect={() => setSelected(h.id)}
                  >
                    {h.title}
                  </Command.Item>
                ))}
              </Command.Group>
            ) : null}
          </Command.List>
        </Command.Root>
      </div>
      <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
        Last selected: <VirtariInlineCode>{selected ?? "—"}</VirtariInlineCode>
      </p>
    </Stack>
  );
}

export function CommandPage() {
  return (
    <>
      <Section
        title="Overview"
        description="cmdk wrapper with tokens, RTL, keyboard-shortcut rendering (via Kbd), and an optional Dialog container. Keyboard nav, grouping, empty/loading states, and filter behavior all come from cmdk."
      >
        <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
          The <VirtariInlineCode>useHotkey</VirtariInlineCode> hook powers the optional <VirtariInlineCode>hotkey</VirtariInlineCode> prop on <VirtariInlineCode>CommandDialog</VirtariInlineCode> and is re-exported for ad-hoc keybindings. It lives in <VirtariInlineCode>@virtari-packages/utils</VirtariInlineCode>.
        </p>
      </Section>

      <Section
        title="Inline palette"
        description="Embed Command.Root anywhere — no Dialog, no portal. Works as a sticky side panel or a dedicated /search page."
      >
        <InlineCommand />
      </Section>

      <Section
        title="CommandDialog with a keyboard shortcut"
        description="This demo uses mod+shift+k so mod+k remains available for documentation search. Shortcut hints on items are display-only. In your app, pass hotkey='mod+k' to auto-toggle (mod = meta on macOS, ctrl elsewhere). Omit hotkey to leave the trigger up to you."
      >
        <DialogCommand />
      </Section>

      <Section
        title="Async search"
        description="Set shouldFilter={false} to bypass cmdk's internal filter when the backend already did the work. Use Command.Loading for the spinner state and Command.Empty for misses."
      >
        <AsyncCommand />
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Command, CommandDialog } from "@virtari-packages/react-command";
import "@virtari-packages/react-command/styles";
import "@virtari-packages/react-dialog/styles";

// Inline
<Command.Root>
  <Command.Input placeholder="Type a command…" />
  <Command.List>
    <Command.Empty>No results.</Command.Empty>
    <Command.Group heading="Navigation">
      <Command.Item value="users" shortcut="mod+u" onSelect={...}>
        Users
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>

// Global palette
<CommandDialog open={open} onOpenChange={setOpen} hotkey="mod+k">
  <Command.Input placeholder="Type a command…" />
  <Command.List>
    {/* groups + items */}
  </Command.List>
</CommandDialog>`} />
      </Section>
    </>
  );
}
