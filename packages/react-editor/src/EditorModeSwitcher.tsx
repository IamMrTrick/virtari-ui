import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@virtari-packages/react-tabs";
import {
  Icon,
  IconFileCode2,
  IconMarkdown,
  IconSourceCode,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import type {
  EditorMode,
  EditorModeSwitcherProps,
} from "./types";

const DEFAULT_LABELS: Record<EditorMode, string> = {
  "rich-text": "Rich",
  markdown: "Markdown",
  html: "HTML",
};

const MODE_ICONS = {
  "rich-text": IconSourceCode,
  markdown: IconMarkdown,
  html: IconFileCode2,
} as const;

interface EditorModeSwitcherControlProps extends EditorModeSwitcherProps {
  value: EditorMode;
  onChange: (mode: EditorMode) => void;
}

export function EditorModeSwitcher({
  className,
  modes = ["rich-text", "markdown", "html"],
  labels,
  value,
  onChange,
}: EditorModeSwitcherControlProps) {
  return (
    <Tabs
      className={cn("vds-editor-mode-switcher", className)}
      value={value}
      onValueChange={(nextValue) => {
        if (modes.includes(nextValue as EditorMode)) {
          onChange(nextValue as EditorMode);
        }
      }}
    >
      <TabsList
        className="vds-editor-mode-list"
        variant="segmented"
        size="sm"
        aria-label="Editor mode"
      >
      {modes.map((mode) => {
        const label = labels?.[mode] ?? DEFAULT_LABELS[mode];

        return (
          <TabsTrigger
            key={mode}
            value={mode}
            className="vds-editor-mode-trigger"
            aria-label={`${label} mode`}
          >
            <Icon icon={MODE_ICONS[mode]} size="sm" />
            <span>{label}</span>
          </TabsTrigger>
        );
      })}
      </TabsList>
    </Tabs>
  );
}
