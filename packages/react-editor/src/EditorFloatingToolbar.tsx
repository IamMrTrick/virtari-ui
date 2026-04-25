import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@virtari-packages/react-tooltip";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  type RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  Icon,
  IconBold,
  IconCode,
  IconItalic,
  IconLetterCaseLower,
  IconLetterCaseToggle,
  IconLetterCaseUpper,
  IconLink,
  IconLinkOff,
  IconMessageCirclePlus,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconUnderline,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import { useEditorContext } from "./context";
import {
  applyLink,
  clearLink,
  EMPTY_TOOLBAR_STATE,
  formatText,
  readToolbarState,
  type ToolbarState,
} from "./editor-utils";
import type { EditorFloatingToolbarProps } from "./types";

const FLOATING_TOOLBAR_ICON_SIZE: ComponentProps<typeof Icon>["size"] = "md";

interface EditorFloatingToolbarComponentProps extends EditorFloatingToolbarProps {
  anchorElement: HTMLElement | null;
}

interface FloatingToolbarButtonProps {
  active?: boolean;
  icon: ComponentProps<typeof Icon>["icon"];
  label: string;
  onClick: () => void;
  tooltipSide: "top" | "bottom";
}

function FloatingToolbarButton({
  active,
  icon,
  label,
  onClick,
  tooltipSide,
}: FloatingToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={active ? "soft" : "ghost"}
          color="contrast"
          size="xs"
          className="vds-editor-floating-button"
          aria-label={label}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onClick}
        >
          <Icon icon={icon} size={FLOATING_TOOLBAR_ICON_SIZE} />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className="vds-editor-floating-tooltip"
        side={tooltipSide}
        size="sm"
        variant="inverted"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function EditorFloatingToolbar({
  className,
  showLinkActions = true,
  showCommentActions = true,
  onRequestComment,
  anchorElement,
}: EditorFloatingToolbarComponentProps) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<RangeSelection | null>(null);
  const [state, setState] = useState<ToolbarState>(EMPTY_TOOLBAR_STATE);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    placement: "above" | "below";
  } | null>(null);
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const linkInputRef = useRef<HTMLInputElement | null>(null);
  const linkEditorOpenRef = useRef(false);

  useEffect(() => {
    linkEditorOpenRef.current = linkEditorOpen;
  }, [linkEditorOpen]);

  function updateToolbar() {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const rootElement = editor.getRootElement();
      const nativeSelection = window.getSelection();
      const focusInsideToolbar = Boolean(
        linkEditorOpenRef.current &&
        toolbarRef.current?.contains(document.activeElement),
      );

      if (
        !anchorElement ||
        !rootElement ||
        readOnly ||
        !$isRangeSelection(selection) ||
        selection.isCollapsed() ||
        selection.getTextContent().trim().length === 0 ||
        !nativeSelection ||
        nativeSelection.rangeCount === 0 ||
        !nativeSelection.anchorNode ||
        !nativeSelection.focusNode ||
        !rootElement.contains(nativeSelection.anchorNode) ||
        !rootElement.contains(nativeSelection.focusNode)
      ) {
        if (focusInsideToolbar) {
          return;
        }

        setPosition(null);
        setSelectionRect(null);
        setLinkEditorOpen(false);
        return;
      }

      const range = nativeSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width === 0 && rect.height === 0) {
        if (focusInsideToolbar) {
          return;
        }

        setPosition(null);
        setSelectionRect(null);
        setLinkEditorOpen(false);
        return;
      }

      selectionRef.current = selection.clone();
      setState(readToolbarState());
      setSelectionRect(rect);
    });
  }

  useLayoutEffect(() => {
    if (!anchorElement || !selectionRect || !toolbarRef.current || readOnly) {
      return;
    }

    const scrollerElement = anchorElement.parentElement;
    const anchorRect = anchorElement.getBoundingClientRect();
    const scrollerRect = scrollerElement?.getBoundingClientRect() ?? anchorRect;
    const nextPlacement =
      selectionRect.top - scrollerRect.top < 72 ? "below" : "above";
    const toolbarRect = toolbarRef.current.getBoundingClientRect();
    const nextLeft = Math.min(
      Math.max(
        selectionRect.left - anchorRect.left + selectionRect.width / 2,
        toolbarRect.width / 2 + 8,
      ),
      anchorRect.width - toolbarRect.width / 2 - 8,
    );
    const nextTop =
      nextPlacement === "above"
        ? selectionRect.top - anchorRect.top
        : selectionRect.bottom - anchorRect.top;

    setPosition({
      left: nextLeft,
      top: nextTop,
      placement: nextPlacement,
    });
  }, [anchorElement, linkEditorOpen, readOnly, selectionRect, state]);

  useEffect(() => {
    if (linkEditorOpen && linkInputRef.current) {
      linkInputRef.current.focus({ preventScroll: true });
      linkInputRef.current.select();
    }
  }, [linkEditorOpen]);

  useEffect(() => {
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
    );
  }, [anchorElement, editor, readOnly]);

  useEffect(() => {
    if (!anchorElement) return;
    const scrollerElement = anchorElement.parentElement;
    const rootElement = editor.getRootElement();

    function handleSelectionChange() {
      updateToolbar();
    }

    window.addEventListener("resize", handleSelectionChange);
    document.addEventListener("selectionchange", handleSelectionChange);
    scrollerElement?.addEventListener("scroll", handleSelectionChange, {
      passive: true,
    });
    rootElement?.addEventListener("scroll", handleSelectionChange, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleSelectionChange);
      document.removeEventListener("selectionchange", handleSelectionChange);
      scrollerElement?.removeEventListener("scroll", handleSelectionChange);
      rootElement?.removeEventListener("scroll", handleSelectionChange);
    };
  }, [anchorElement, editor, readOnly]);

  function closeLinkEditor() {
    setLinkEditorOpen(false);
    setLinkValue(state.linkUrl);
  }

  function rememberEditorSelection() {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        return;
      }

      selectionRef.current = selection.clone();
    });
  }

  function toggleLinkEditor() {
    rememberEditorSelection();
    setLinkValue(state.linkUrl);
    setLinkEditorOpen((currentOpen) => !currentOpen);
  }

  function submitLink() {
    const nextLink = linkValue.trim();

    if (!nextLink) {
      clearLink(editor, selectionRef.current);
      closeLinkEditor();
      return;
    }

    applyLink(editor, nextLink, selectionRef.current);
    closeLinkEditor();
  }

  function handleLinkKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitLink();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeLinkEditor();
    }
  }

  if (!anchorElement || !selectionRect || readOnly) {
    return null;
  }

  const tooltipSide = position?.placement === "below" ? "bottom" : "top";

  return createPortal(
    <div
      ref={toolbarRef}
      className={cn("vds-editor-floating", className)}
      data-placement={position?.placement ?? "above"}
      style={{
        transform: position
          ? `translate(${position.left}px, ${Math.max(position.top, 0)}px) translate(-50%, ${
              position.placement === "above"
                ? "calc(-100% - 12px)"
                : "12px"
            })`
          : "translate(-10000px, -10000px)",
        opacity: position ? 1 : 0,
      }}
    >
      <TooltipProvider delayDuration={180} skipDelayDuration={80}>
        <div className="vds-editor-floating-row">
          <FloatingToolbarButton
            active={state.isBold}
            icon={IconBold}
            label="Bold"
            tooltipSide={tooltipSide}
            onClick={() => formatText(editor, "bold")}
          />
          <FloatingToolbarButton
            active={state.isItalic}
            icon={IconItalic}
            label="Italic"
            tooltipSide={tooltipSide}
            onClick={() => formatText(editor, "italic")}
          />
          <FloatingToolbarButton
            active={state.isUnderline}
            icon={IconUnderline}
            label="Underline"
            tooltipSide={tooltipSide}
            onClick={() => formatText(editor, "underline")}
          />
          <FloatingToolbarButton
            active={state.isStrikethrough}
            icon={IconStrikethrough}
            label="Strikethrough"
            tooltipSide={tooltipSide}
            onClick={() => formatText(editor, "strikethrough")}
          />
          {features.advancedTextFormats ? (
            <>
              <FloatingToolbarButton
                active={state.isSubscript}
                icon={IconSubscript}
                label="Subscript"
                tooltipSide={tooltipSide}
                onClick={() => formatText(editor, "subscript")}
              />
              <FloatingToolbarButton
                active={state.isSuperscript}
                icon={IconSuperscript}
                label="Superscript"
                tooltipSide={tooltipSide}
                onClick={() => formatText(editor, "superscript")}
              />
              <FloatingToolbarButton
                active={state.isUppercase}
                icon={IconLetterCaseUpper}
                label="Uppercase"
                tooltipSide={tooltipSide}
                onClick={() => formatText(editor, "uppercase")}
              />
              <FloatingToolbarButton
                active={state.isLowercase}
                icon={IconLetterCaseLower}
                label="Lowercase"
                tooltipSide={tooltipSide}
                onClick={() => formatText(editor, "lowercase")}
              />
              <FloatingToolbarButton
                active={state.isCapitalize}
                icon={IconLetterCaseToggle}
                label="Capitalize"
                tooltipSide={tooltipSide}
                onClick={() => formatText(editor, "capitalize")}
              />
            </>
          ) : null}
          <FloatingToolbarButton
            active={state.isInlineCode}
            icon={IconCode}
            label="Inline code"
            tooltipSide={tooltipSide}
            onClick={() => formatText(editor, "code")}
          />

          {showLinkActions ? (
            <>
              <span className="vds-editor-floating-divider" aria-hidden="true" />
              <FloatingToolbarButton
                active={state.isLink || linkEditorOpen}
                icon={IconLink}
                label={state.isLink ? "Edit link" : "Insert link"}
                tooltipSide={tooltipSide}
                onClick={toggleLinkEditor}
              />
              {state.isLink ? (
                <FloatingToolbarButton
                  icon={IconLinkOff}
                  label="Remove link"
                  tooltipSide={tooltipSide}
                  onClick={() => clearLink(editor, selectionRef.current)}
                />
              ) : null}
            </>
          ) : null}

          {showCommentActions && features.comments ? (
            <>
              <span className="vds-editor-floating-divider" aria-hidden="true" />
              <FloatingToolbarButton
                icon={IconMessageCirclePlus}
                label="Add comment"
                tooltipSide={tooltipSide}
                onClick={() => onRequestComment?.()}
              />
            </>
          ) : null}
        </div>

        {linkEditorOpen ? (
          <div className="vds-editor-floating-link-row">
            <Input
              ref={linkInputRef}
              inputSize="xs"
              className="vds-editor-floating-link-input"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
              onKeyDown={handleLinkKeyDown}
              placeholder="https://example.com"
            />
            <Button
              type="button"
              className="vds-editor-floating-link-action"
              variant="soft"
              color="primary"
              size="xs"
              onMouseDown={(event) => event.preventDefault()}
              onClick={submitLink}
            >
              Apply
            </Button>
            {state.isLink ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    className="vds-editor-floating-link-action vds-editor-floating-link-icon-action"
                    variant="soft"
                    color="danger"
                    size="xs"
                    aria-label="Remove link"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      clearLink(editor, selectionRef.current);
                      closeLinkEditor();
                    }}
                  >
                    <Icon icon={IconLinkOff} size={FLOATING_TOOLBAR_ICON_SIZE} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="vds-editor-floating-tooltip"
                  side={tooltipSide}
                  size="sm"
                  variant="inverted"
                >
                  Remove link
                </TooltipContent>
              </Tooltip>
            ) : null}
            <Button
              type="button"
              className="vds-editor-floating-link-action"
              variant="ghost"
              color="contrast"
              size="xs"
              onMouseDown={(event) => event.preventDefault()}
              onClick={closeLinkEditor}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </TooltipProvider>
    </div>,
    anchorElement,
  );
}
