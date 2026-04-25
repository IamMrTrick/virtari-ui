import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  $getSelection,
  $isRangeSelection,
  type RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  Icon,
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconChevronDown,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconHighlight,
  IconIndentDecrease,
  IconIndentIncrease,
  IconItalic,
  IconLetterCase,
  IconLetterCaseLower,
  IconLetterCaseToggle,
  IconLetterCaseUpper,
  IconLink,
  IconLinkOff,
  IconMessageCirclePlus,
  IconMinus,
  IconPalette,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconPlus,
  IconQuote,
  IconSubscript,
  IconTrash,
  IconUnderline,
  IconSuperscript,
  IconTypography,
} from "@virtari-packages/react-icons";
import { Button } from "@virtari-packages/react-button";
import { ColorPicker } from "@virtari-packages/react-color-picker";
import { Input } from "@virtari-packages/react-input";
import { Kbd } from "@virtari-packages/react-kbd";
import { ScrollArea } from "@virtari-packages/react-scroll-area";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  applyBlockType,
  applyLink,
  applyTextStyles,
  clearEditor,
  clearLink,
  formatElement,
  formatText,
  indentContent,
  outdentContent,
  readToolbarState,
  redo,
  toggleBulletList,
  toggleCheckList,
  toggleNumberList,
  undo,
  type ToolbarState,
  EMPTY_TOOLBAR_STATE,
} from "./editor-utils";
import { SHORTCUTS } from "./editor-shortcuts";
import { useEditorContext } from "./context";
import { cn } from "@virtari-packages/utils";
import {
  EditorDropdown,
  EditorDropdownItem,
  EditorDropdownSeparator,
  useEditorDropdown,
} from "./EditorDropdown";
import { EditorInsertMenu } from "./EditorInsertMenu";
import { EditorModeSwitcher } from "./EditorModeSwitcher";
import type {
  EditorBlockType,
  EditorColorSwatch,
  EditorElementAlignment,
  EditorToolbarOption,
  EditorToolbarProps,
} from "./types";

const BLOCK_OPTIONS: Array<{
  label: string;
  value: EditorBlockType;
  shortcut?: string;
  icon: ComponentProps<typeof Icon>["icon"];
}> = [
  { label: "Normal", value: "paragraph", shortcut: SHORTCUTS.NORMAL, icon: IconTypography },
  { label: "Heading 1", value: "h1", shortcut: SHORTCUTS.HEADING_1, icon: IconH1 },
  { label: "Heading 2", value: "h2", shortcut: SHORTCUTS.HEADING_2, icon: IconH2 },
  { label: "Heading 3", value: "h3", shortcut: SHORTCUTS.HEADING_3, icon: IconH3 },
  { label: "Numbered List", value: "number", shortcut: SHORTCUTS.NUMBERED_LIST, icon: IconListNumbers },
  { label: "Bullet List", value: "bullet", shortcut: SHORTCUTS.BULLET_LIST, icon: IconList },
  { label: "Check List", value: "check", shortcut: SHORTCUTS.CHECK_LIST, icon: IconListCheck },
  { label: "Quote", value: "quote", shortcut: SHORTCUTS.QUOTE, icon: IconQuote },
  { label: "Code Block", value: "code", shortcut: SHORTCUTS.CODE_BLOCK, icon: IconCode },
];

const ALIGNMENT_OPTIONS: Array<{
  label: string;
  value: EditorElementAlignment;
  shortcut?: string;
  icon: ComponentProps<typeof Icon>["icon"];
}> = [
  { label: "Left Align", value: "left", shortcut: SHORTCUTS.LEFT_ALIGN, icon: IconAlignLeft },
  { label: "Center Align", value: "center", shortcut: SHORTCUTS.CENTER_ALIGN, icon: IconAlignCenter },
  { label: "Right Align", value: "right", shortcut: SHORTCUTS.RIGHT_ALIGN, icon: IconAlignRight },
  { label: "Justify Align", value: "justify", shortcut: SHORTCUTS.JUSTIFY_ALIGN, icon: IconAlignJustified },
  { label: "Start Align", value: "start", icon: IconAlignLeft },
  { label: "End Align", value: "end", icon: IconAlignRight },
];

const DEFAULT_FONT_FAMILIES: EditorToolbarOption[] = [
  { label: "Sans", value: "var(--vds-font-sans)" },
  { label: "Latin", value: "var(--vds-font-latin)" },
  { label: "Mono", value: "var(--vds-font-mono)" },
];

const DEFAULT_FONT_SIZES: EditorToolbarOption[] = [
  { label: "12", value: "var(--vds-text-xs)" },
  { label: "14", value: "var(--vds-text-sm)" },
  { label: "16", value: "var(--vds-text-base)" },
  { label: "18", value: "var(--vds-text-lg)" },
  { label: "20", value: "var(--vds-text-xl)" },
  { label: "24", value: "var(--vds-text-2xl)" },
  { label: "30", value: "var(--vds-text-3xl)" },
];

const DEFAULT_TEXT_COLOR_SWATCHES: EditorColorSwatch[] = [
  { label: "Ink", value: "var(--vds-color-neutral-12)" },
  { label: "Primary", value: "var(--vds-color-primary-11)" },
  { label: "Info", value: "var(--vds-color-info-11)" },
  { label: "Success", value: "var(--vds-color-success-11)" },
  { label: "Warning", value: "var(--vds-color-warning-11)" },
  { label: "Danger", value: "var(--vds-color-danger-11)" },
  { label: "Accent", value: "var(--vds-color-accent-11)" },
];

const DEFAULT_HIGHLIGHT_SWATCHES: EditorColorSwatch[] = [
  { label: "Primary", value: "var(--vds-color-primary-4)" },
  { label: "Info", value: "var(--vds-color-info-4)" },
  { label: "Success", value: "var(--vds-color-success-4)" },
  { label: "Warning", value: "var(--vds-color-warning-4)" },
  { label: "Danger", value: "var(--vds-color-danger-4)" },
  { label: "Accent", value: "var(--vds-color-accent-4)" },
];

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}

interface ToolbarMenuItemProps {
  active?: boolean;
  icon?: ComponentProps<typeof Icon>["icon"];
  label: string;
  shortcut?: string;
  onSelect: () => void;
  endSlot?: ReactNode;
  reserveIcon?: boolean;
}

interface ToolbarDropdownProps {
  label: string;
  icon?: ComponentProps<typeof Icon>["icon"];
  active?: boolean;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  onOpen?: () => void;
  children: ReactNode;
}

interface ToolbarColorMenuProps {
  disabled?: boolean;
  label: string;
  icon: ComponentProps<typeof Icon>["icon"];
  value: string;
  swatches: EditorColorSwatch[];
  resetValue: string;
  onOpen: () => void;
  onApply: (value: string, skipHistoryStack: boolean) => void;
}

interface ToolbarColorPanelProps {
  label: string;
  value: string;
  swatches: Array<EditorColorSwatch & { resolvedValue: string }>;
  pickerSwatches: string[];
  resetValue: string;
  onApply: (value: string, skipHistoryStack: boolean) => void;
}

function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "soft" : "ghost"}
      color="contrast"
      size="sm"
      className="vds-editor-toolbar-button"
      disabled={disabled}
      title={label}
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function ToolbarMenuItem({
  active,
  icon,
  label,
  shortcut,
  onSelect,
  endSlot,
  reserveIcon = true,
}: ToolbarMenuItemProps) {
  return (
    <EditorDropdownItem
      className={cn(
        "vds-editor-menu-item",
        !reserveIcon ? "vds-editor-menu-item-no-icon" : null,
        active ? "is-active" : null,
      )}
      onSelect={onSelect}
    >
      {icon ? (
        <span className="vds-editor-menu-item-icon">
          <Icon icon={icon} size="sm" />
        </span>
      ) : reserveIcon ? (
        <span className="vds-editor-menu-item-icon vds-editor-menu-item-icon-empty" />
      ) : null}

      <span className="vds-editor-menu-item-copy">
        <span className="vds-editor-menu-item-label">{label}</span>
      </span>

      {endSlot ?? (shortcut ? <Kbd>{shortcut}</Kbd> : null)}
    </EditorDropdownItem>
  );
}

function ToolbarDropdown({
  label,
  icon,
  active,
  disabled,
  className,
  dropdownClassName,
  onOpen,
  children,
}: ToolbarDropdownProps) {
  return (
    <EditorDropdown
      className={cn("vds-editor-dropdown vds-editor-menu", dropdownClassName)}
      disabled={disabled}
      onOpenChange={(open) => {
        if (open) {
          onOpen?.();
        }
      }}
      trigger={({ buttonRef, controlsId, open, toggle }) => (
        <Button
          ref={buttonRef}
          type="button"
          variant={open || active ? "soft" : "ghost"}
          color="contrast"
          size="sm"
          className={cn("vds-editor-toolbar-trigger", className)}
          aria-label={label}
          aria-controls={controlsId}
          aria-expanded={open}
          disabled={disabled}
          leftSection={icon ? <Icon icon={icon} size="sm" /> : undefined}
          rightSection={<Icon icon={IconChevronDown} size="xs" />}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.preventDefault();
            toggle();
          }}
        >
          {label}
        </Button>
      )}
    >
        {children}
    </EditorDropdown>
  );
}

function ToolbarColorMenu({
  disabled,
  label,
  icon,
  value,
  swatches,
  resetValue,
  onOpen,
  onApply,
}: ToolbarColorMenuProps) {
  const resolvedSwatches = useMemo(
    () =>
      swatches.map((swatch) => ({
        ...swatch,
        resolvedValue: resolveColorForPicker(swatch.value),
      })),
    [swatches],
  );
  const pickerValue = resolveColorForPicker(value, resetValue);
  const pickerSwatches = resolvedSwatches.map((swatch) => swatch.resolvedValue);

  return (
    <EditorDropdown
      className="vds-editor-dropdown vds-editor-color-panel"
      disabled={disabled}
      stopCloseOnClickSelf
      onOpenChange={(open) => {
        if (open) {
          onOpen();
        }
      }}
      trigger={({ buttonRef, controlsId, open, toggle }) => (
        <Button
          ref={buttonRef}
          type="button"
          variant={open || value !== resetValue ? "soft" : "ghost"}
          color="contrast"
          size="sm"
          className="vds-editor-toolbar-trigger vds-editor-toolbar-color-trigger"
          aria-label={label}
          aria-controls={controlsId}
          aria-expanded={open}
          disabled={disabled}
          leftSection={<Icon icon={icon} size="sm" />}
          rightSection={<Icon icon={IconChevronDown} size="xs" />}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.preventDefault();
            toggle();
          }}
        />
      )}
    >
      <ToolbarColorPanel
        label={label}
        value={pickerValue}
        swatches={resolvedSwatches}
        pickerSwatches={pickerSwatches}
        resetValue={resetValue}
        onApply={onApply}
      />
    </EditorDropdown>
  );
}

function ToolbarColorPanel({
  label,
  value,
  swatches,
  pickerSwatches,
  resetValue,
  onApply,
}: ToolbarColorPanelProps) {
  const { close } = useEditorDropdown();
  const [draftValue, setDraftValue] = useState(value);
  const resetPickerValue = resolveColorForPicker(resetValue);

  useEffect(() => {
    setDraftValue(value);
  }, [value]);

  function getApplyValue(nextValue: string) {
    const comparableValue = normalizeComparableColor(nextValue);
    const matchedSwatch = swatches.find(
      (swatch) =>
        normalizeComparableColor(swatch.resolvedValue) === comparableValue,
    );

    if (matchedSwatch) {
      return matchedSwatch.value;
    }

    if (
      normalizeComparableColor(resetPickerValue) === comparableValue ||
      (resetValue === "transparent" &&
        normalizeComparableColor(nextValue) === "transparent")
    ) {
      return resetValue;
    }

    return nextValue;
  }

  function handlePickerMouseDownCapture(
    event: ReactMouseEvent<HTMLDivElement>,
  ) {
    const target = event.target;

    if (
      target instanceof HTMLElement &&
      !target.closest("input, textarea, select")
    ) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="vds-editor-color-panel-header">{label}</div>
      <ColorPicker
        appearance="flat"
        mode="solid"
        defaultFormat="hex"
        showCodeView={false}
        allowAlpha={resetValue === "transparent"}
        className="vds-editor-color-picker"
        value={draftValue}
        swatches={pickerSwatches}
        onMouseDownCapture={handlePickerMouseDownCapture}
        onValueChange={(nextValue) => setDraftValue(nextValue)}
      />
      <div className="vds-editor-color-panel-actions">
        <Button
          type="button"
          variant="ghost"
          color="contrast"
          size="xs"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setDraftValue(resetPickerValue);
            onApply(resetValue, false);
          }}
        >
          Reset
        </Button>
        <Button
          type="button"
          variant="ghost"
          color="contrast"
          size="xs"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => close()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="soft"
          color="primary"
          size="xs"
          className="vds-editor-color-apply-button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            onApply(getApplyValue(draftValue), false);
            close();
          }}
        >
          Apply
        </Button>
      </div>
    </>
  );
}

function resolveLabelFromOptions(
  options: EditorToolbarOption[],
  value: string,
  fallback: string,
) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}

function nextOptionValue(
  options: EditorToolbarOption[],
  currentValue: string,
  direction: -1 | 1,
) {
  const currentIndex = options.findIndex((option) => option.value === currentValue);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = Math.min(
    options.length - 1,
    Math.max(0, safeIndex + direction),
  );

  return options[nextIndex]?.value ?? currentValue;
}

function resolveColorForPicker(value: string, fallback = "#000000") {
  if (typeof document === "undefined") {
    return value.startsWith("var(") ? fallback : value;
  }

  if (value.trim().toLowerCase() === "transparent") {
    return "transparent";
  }

  const sample = document.createElement("span");
  sample.style.position = "fixed";
  sample.style.opacity = "0";
  sample.style.pointerEvents = "none";
  sample.style.color = value;
  document.body.append(sample);

  const computedColor = window.getComputedStyle(sample).color;
  sample.remove();

  return computedColor && computedColor !== "rgba(0, 0, 0, 0)"
    ? computedColor
    : value.startsWith("var(")
      ? fallback
      : value;
}

function normalizeComparableColor(value: string) {
  return resolveColorForPicker(value).replace(/\s+/g, "").toLowerCase();
}

export function EditorToolbar({
  className,
  sticky = false,
  showClearButton = true,
  insertMenu,
  modeSwitcher,
  mode,
  onModeChange,
  onRequestComment,
  fontFamilies = DEFAULT_FONT_FAMILIES,
  fontSizes = DEFAULT_FONT_SIZES,
  textColorSwatches = DEFAULT_TEXT_COLOR_SWATCHES,
  highlightColorSwatches = DEFAULT_HIGHLIGHT_SWATCHES,
}: EditorToolbarProps) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();
  const [state, setState] = useState<ToolbarState>(EMPTY_TOOLBAR_STATE);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const linkInputRef = useRef<HTMLInputElement | null>(null);
  const selectionRef = useRef<RangeSelection | null>(null);
  const sourceModeActive = mode !== undefined && mode !== "rich-text";
  const richControlsDisabled = readOnly || sourceModeActive;
  const historyControlsDisabled = readOnly;

  const blockOptions = useMemo(
    () =>
      BLOCK_OPTIONS.filter((option) => {
        if (option.value === "code") {
          return features.codeBlocks;
        }

        if (option.value === "check") {
          return features.checklists;
        }

        if (option.value === "bullet" || option.value === "number") {
          return features.lists;
        }

        return true;
      }),
    [features.checklists, features.codeBlocks, features.lists],
  );

  const currentBlockOption =
    blockOptions.find((option) => option.value === state.blockType) ??
    blockOptions[0];

  const currentAlignmentOption =
    ALIGNMENT_OPTIONS.find((option) => option.value === state.elementFormat) ??
    ALIGNMENT_OPTIONS[0];

  const fontFamilyLabel = resolveLabelFromOptions(
    fontFamilies,
    state.fontFamily,
    "Sans",
  );

  const fontSizeLabel = resolveLabelFromOptions(
    fontSizes,
    state.fontSize,
    "16",
  );

  function rememberSelection() {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      selectionRef.current = $isRangeSelection(selection) ? selection.clone() : null;
    });
  }

  useEffect(() => {
    if (linkEditorOpen && linkInputRef.current) {
      linkInputRef.current.focus({ preventScroll: true });
      linkInputRef.current.select();
    }
  }, [linkEditorOpen]);

  useEffect(() => {
    const updateToolbar = () => {
      editor.getEditorState().read(() => {
        setState(readToolbarState());
      });
    };

    updateToolbar();

    return mergeRegister(
      editor.registerUpdateListener(() => {
        updateToolbar();
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  function handleBlockTypeSelect(blockType: EditorBlockType) {
    switch (blockType) {
      case "bullet":
        toggleBulletList(editor, state.blockType);
        return;
      case "number":
        toggleNumberList(editor, state.blockType);
        return;
      case "check":
        toggleCheckList(editor, state.blockType);
        return;
      default:
        applyBlockType(editor, blockType);
    }
  }

  function openLinkEditor() {
    rememberSelection();
    setLinkValue(state.linkUrl);
    setLinkEditorOpen(true);
  }

  function closeLinkEditor() {
    setLinkEditorOpen(false);
    setLinkValue(state.linkUrl);
  }

  function submitLink() {
    const next = linkValue.trim();

    if (!next) {
      clearLink(editor, selectionRef.current);
      closeLinkEditor();
      return;
    }

    applyLink(editor, next, selectionRef.current);
    closeLinkEditor();
  }

  function applyFontStyle(
    property: "font-family" | "font-size",
    value: string,
    skipHistoryStack = false,
  ) {
    applyTextStyles(
      editor,
      { [property]: value },
      selectionRef.current,
      skipHistoryStack,
    );
  }

  return (
    <div
      className={cn("vds-editor-toolbar", className)}
      data-sticky={sticky || undefined}
      data-read-only={readOnly || undefined}
      data-source-mode={sourceModeActive || undefined}
    >
      <ScrollArea
        className="vds-editor-toolbar-scroll"
        orientation="horizontal"
        size="sm"
        mask
        arrows
        arrowPlacement="outer"
        arrowAppearance="hover"
        hideScrollbar
      >
        <div className="vds-editor-toolbar-row">
          {features.history ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-group-sticky"
              aria-label="History"
            >
              <ToolbarButton
                label="Undo"
                disabled={historyControlsDisabled || !canUndo}
                onClick={() => undo(editor)}
              >
                <Icon icon={IconArrowBackUp} size="sm" />
              </ToolbarButton>
              <ToolbarButton
                label="Redo"
                disabled={historyControlsDisabled || !canRedo}
                onClick={() => redo(editor)}
              >
                <Icon icon={IconArrowForwardUp} size="sm" />
              </ToolbarButton>
            </div>
          ) : null}

          <div
            className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
            aria-label="Block type"
          >
            <ToolbarDropdown
              label={currentBlockOption?.label ?? "Normal"}
              icon={currentBlockOption?.icon}
              disabled={richControlsDisabled}
              onOpen={rememberSelection}
            >
              {blockOptions.map((option) => (
                <ToolbarMenuItem
                  key={option.value}
                  active={state.blockType === option.value}
                  icon={option.icon}
                  label={option.label}
                  shortcut={option.shortcut}
                  onSelect={() => handleBlockTypeSelect(option.value)}
                />
              ))}
            </ToolbarDropdown>
          </div>

          {features.fontFamily ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Font family"
            >
              <ToolbarDropdown
                label={fontFamilyLabel}
                icon={IconTypography}
                disabled={richControlsDisabled}
                dropdownClassName="vds-editor-font-family-menu"
                onOpen={rememberSelection}
              >
                {fontFamilies.map((option) => (
                  <ToolbarMenuItem
                    key={option.value}
                    active={state.fontFamily === option.value}
                    label={option.label}
                    reserveIcon={false}
                    onSelect={() => applyFontStyle("font-family", option.value)}
                  />
                ))}
              </ToolbarDropdown>
            </div>
          ) : null}

          {features.fontSize ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Font size"
            >
              <Button
                type="button"
                variant="soft"
                color="contrast"
                size="sm"
                className="vds-editor-toolbar-button vds-editor-font-size-step"
                disabled={richControlsDisabled}
                title="Decrease font size"
                aria-label="Decrease font size"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  rememberSelection();
                  applyTextStyles(
                    editor,
                    {
                      "font-size": nextOptionValue(fontSizes, state.fontSize, -1),
                    },
                    selectionRef.current,
                  );
                }}
              >
                <Icon icon={IconMinus} size="md" stroke={2} />
              </Button>

              <ToolbarDropdown
                label={fontSizeLabel}
                disabled={richControlsDisabled}
                className="vds-editor-toolbar-trigger-compact"
                dropdownClassName="vds-editor-font-size-menu"
                onOpen={rememberSelection}
              >
                {fontSizes.map((option) => (
                  <ToolbarMenuItem
                    key={option.value}
                    active={state.fontSize === option.value}
                    label={option.label}
                    reserveIcon={false}
                    onSelect={() => applyFontStyle("font-size", option.value)}
                  />
                ))}
              </ToolbarDropdown>

              <Button
                type="button"
                variant="soft"
                color="contrast"
                size="sm"
                className="vds-editor-toolbar-button vds-editor-font-size-step"
                disabled={richControlsDisabled}
                title="Increase font size"
                aria-label="Increase font size"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  rememberSelection();
                  applyTextStyles(
                    editor,
                    {
                      "font-size": nextOptionValue(fontSizes, state.fontSize, 1),
                    },
                    selectionRef.current,
                  );
                }}
              >
                <Icon icon={IconPlus} size="md" stroke={2} />
              </Button>
            </div>
          ) : null}

          <div
            className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
            aria-label="Text format"
          >
            <ToolbarButton
              label="Bold"
              active={state.isBold}
              disabled={richControlsDisabled}
              onClick={() => formatText(editor, "bold")}
            >
              <Icon icon={IconBold} size="sm" />
            </ToolbarButton>
            <ToolbarButton
              label="Italic"
              active={state.isItalic}
              disabled={richControlsDisabled}
              onClick={() => formatText(editor, "italic")}
            >
              <Icon icon={IconItalic} size="sm" />
            </ToolbarButton>
            <ToolbarButton
              label="Underline"
              active={state.isUnderline}
              disabled={richControlsDisabled}
              onClick={() => formatText(editor, "underline")}
            >
              <Icon icon={IconUnderline} size="sm" />
            </ToolbarButton>
          </div>

          {features.advancedTextFormats ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Advanced text format"
            >
              <ToolbarDropdown
                label="Aa"
                icon={IconLetterCase}
                active={
                  state.isStrikethrough ||
                  state.isSubscript ||
                  state.isSuperscript ||
                  state.isLowercase ||
                  state.isUppercase ||
                  state.isCapitalize
                }
                disabled={richControlsDisabled}
                className="vds-editor-toolbar-trigger-compact"
                onOpen={rememberSelection}
              >
                <ToolbarMenuItem
                  active={state.isStrikethrough}
                  label="Strikethrough"
                  onSelect={() => formatText(editor, "strikethrough")}
                />
                <ToolbarMenuItem
                  active={state.isSubscript}
                  icon={IconSubscript}
                  label="Subscript"
                  onSelect={() => formatText(editor, "subscript")}
                />
                <ToolbarMenuItem
                  active={state.isSuperscript}
                  icon={IconSuperscript}
                  label="Superscript"
                  onSelect={() => formatText(editor, "superscript")}
                />
                <EditorDropdownSeparator className="vds-editor-menu-separator" />
                <ToolbarMenuItem
                  active={state.isLowercase}
                  icon={IconLetterCaseLower}
                  label="Lowercase"
                  onSelect={() => formatText(editor, "lowercase")}
                />
                <ToolbarMenuItem
                  active={state.isUppercase}
                  icon={IconLetterCaseUpper}
                  label="Uppercase"
                  onSelect={() => formatText(editor, "uppercase")}
                />
                <ToolbarMenuItem
                  active={state.isCapitalize}
                  icon={IconLetterCaseToggle}
                  label="Capitalize"
                  onSelect={() => formatText(editor, "capitalize")}
                />
              </ToolbarDropdown>
            </div>
          ) : null}

          {features.textColors ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Text colors"
            >
              <ToolbarColorMenu
                disabled={richControlsDisabled}
                label="Text color"
                icon={IconPalette}
                value={state.fontColor}
                swatches={textColorSwatches}
                resetValue="var(--vds-color-neutral-12)"
                onOpen={rememberSelection}
                onApply={(value, skipHistoryStack) =>
                  applyTextStyles(
                    editor,
                    { color: value },
                    selectionRef.current,
                    skipHistoryStack,
                  )
                }
              />
              <ToolbarColorMenu
                disabled={richControlsDisabled}
                label="Highlight color"
                icon={IconHighlight}
                value={state.bgColor}
                swatches={highlightColorSwatches}
                resetValue="transparent"
                onOpen={rememberSelection}
                onApply={(value, skipHistoryStack) =>
                  applyTextStyles(
                    editor,
                    { "background-color": value },
                    selectionRef.current,
                    skipHistoryStack,
                  )
                }
              />
            </div>
          ) : null}

          {(features.links || features.comments || insertMenu) ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Insert"
            >
              {features.links ? (
                <ToolbarButton
                  label={state.isLink ? "Edit link" : "Insert link"}
                  active={state.isLink || linkEditorOpen}
                  disabled={richControlsDisabled}
                  onClick={openLinkEditor}
                >
                  <Icon icon={IconLink} size="sm" />
                </ToolbarButton>
              ) : null}

              {features.comments ? (
                <ToolbarButton
                  label="Add comment"
                  disabled={richControlsDisabled}
                  onClick={() => onRequestComment?.()}
                >
                  <Icon icon={IconMessageCirclePlus} size="sm" />
                </ToolbarButton>
              ) : null}

              {insertMenu ? (
                <EditorInsertMenu {...insertMenu} />
              ) : null}
            </div>
          ) : null}

          {features.textAlignment ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Alignment"
            >
              <ToolbarDropdown
                label={currentAlignmentOption.label}
                icon={currentAlignmentOption.icon}
                disabled={richControlsDisabled}
              >
                {ALIGNMENT_OPTIONS.map((option) => (
                  <ToolbarMenuItem
                    key={option.value}
                    active={state.elementFormat === option.value}
                    icon={option.icon}
                    label={option.label}
                    shortcut={option.shortcut}
                    onSelect={() => formatElement(editor, option.value)}
                  />
                ))}
                <EditorDropdownSeparator className="vds-editor-menu-separator" />
                <ToolbarMenuItem
                  icon={IconIndentDecrease}
                  label="Outdent"
                  shortcut={SHORTCUTS.OUTDENT}
                  onSelect={() => outdentContent(editor)}
                />
                <ToolbarMenuItem
                  icon={IconIndentIncrease}
                  label="Indent"
                  shortcut={SHORTCUTS.INDENT}
                  onSelect={() => indentContent(editor)}
                />
              </ToolbarDropdown>
            </div>
          ) : null}

          {modeSwitcher && mode && onModeChange ? (
            <div
              className="vds-editor-toolbar-group vds-editor-mode-group"
              aria-label="Source mode"
            >
              <EditorModeSwitcher
                {...modeSwitcher}
                value={mode}
                onChange={onModeChange}
              />
            </div>
          ) : null}

          {showClearButton ? (
            <div
              className="vds-editor-toolbar-group vds-editor-toolbar-rich-group"
              aria-label="Danger zone"
            >
              <ToolbarButton
                label="Clear editor"
                disabled={richControlsDisabled}
                onClick={() => clearEditor(editor)}
              >
                <Icon icon={IconTrash} size="sm" />
              </ToolbarButton>
            </div>
          ) : null}
        </div>
      </ScrollArea>

      {linkEditorOpen ? (
        <div className="vds-editor-toolbar-link-row">
          <Input
            ref={linkInputRef}
            inputSize="sm"
            className="vds-editor-toolbar-link-input"
            value={linkValue}
            onChange={(event) => setLinkValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitLink();
              }

              if (event.key === "Escape") {
                event.preventDefault();
                closeLinkEditor();
              }
            }}
            placeholder="https://example.com"
            disabled={richControlsDisabled}
          />
          <div className="vds-editor-toolbar-link-actions">
            <Button
              type="button"
              className="vds-editor-toolbar-text-button"
              variant="soft"
              color="primary"
              size="sm"
              disabled={richControlsDisabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={submitLink}
            >
              Apply
            </Button>
            <Button
              type="button"
              className="vds-editor-toolbar-text-button"
              variant="soft"
              color="danger"
              size="sm"
              disabled={richControlsDisabled}
              leftSection={<Icon icon={IconLinkOff} size="sm" />}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                clearLink(editor, selectionRef.current);
                closeLinkEditor();
              }}
            >
              Remove
            </Button>
            <Button
              type="button"
              className="vds-editor-toolbar-text-button"
              variant="ghost"
              color="contrast"
              size="sm"
              onMouseDown={(event) => event.preventDefault()}
              onClick={closeLinkEditor}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
