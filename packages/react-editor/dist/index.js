"use client";
import { SHORTCUTS, EditorSurface, EditorComposer, useEditorConfig, insertTable, useEditorContext, EMPTY_TOOLBAR_STATE, formatText, clearLink, toggleBulletList, toggleNumberList, toggleCheckList, applyBlockType, insertBlock, insertDefaultTable, useEditorMetrics, COMMAND_PRIORITY_LOW as COMMAND_PRIORITY_LOW$1, CAN_UNDO_COMMAND, CAN_REDO_COMMAND, undo, redo, applyTextStyles, insertTableRow, insertTableColumn, deleteTableRow, deleteTableColumn, deleteTable, formatElement, outdentContent, indentContent, clearEditor, resolveEditorFeatures, DEFAULT_MARKDOWN_TRANSFORMERS, readSourceValue, countWords, countCharacters, applySourceValue, getSelectionText, wrapSelectionInComment, removeCommentMark, readToolbarState, applyLink, insertMediaBlock } from './chunk-23ILJFUZ.js';
export { $createEditorMediaNode, $isEditorMediaNode, DEFAULT_CORE_FEATURES, DEFAULT_LINK_MATCHERS, DEFAULT_MARKDOWN_TRANSFORMERS, DEFAULT_PRO_FEATURES, EDITOR_THEME, EditorComposer, EditorMediaNode, EditorSurface, buildEditorNodes, createInitialEditorState, resolveEditorFeatures, useEditorContext } from './chunk-23ILJFUZ.js';
import { Button } from '@virtari-packages/react-button';
import { Textarea } from '@virtari-packages/react-textarea';
import { IconTypography, IconH1, IconH2, IconH3, IconListNumbers, IconList, IconListCheck, IconQuote, IconCode, IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustified, Icon, IconMessageCircle, IconX, IconCheck, IconTrash, IconChevronDown, IconPlus, IconGripVertical, IconBold, IconItalic, IconUnderline, IconStrikethrough, IconSubscript, IconSuperscript, IconLetterCaseUpper, IconLetterCaseLower, IconLetterCaseToggle, IconLink, IconLinkOff, IconMessageCirclePlus, IconFileCode2, IconMarkdown, IconSourceCode, IconSeparatorHorizontal, IconTable, IconArrowBackUp, IconArrowForwardUp, IconMinus, IconLetterCase, IconPalette, IconHighlight, IconIndentDecrease, IconIndentIncrease, IconPhoto, IconVideo, IconWorld, IconUpload } from '@virtari-packages/react-icons';
import { cn } from '@virtari-packages/utils';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useMemo, useRef, useEffect, useLayoutEffect, useId, useCallback, useContext } from 'react';
import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Kbd } from '@virtari-packages/react-kbd';
import { createPortal } from 'react-dom';
import { CodeEditor } from '@virtari-packages/react-code';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '@virtari-packages/react-dialog';
import { FileUpload } from '@virtari-packages/react-file-upload';
import { Input } from '@virtari-packages/react-input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@virtari-packages/react-tabs';
import { SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_LOW, $getSelection, $isRangeSelection, $getNearestNodeFromDOMNode } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@virtari-packages/react-tooltip';
import { useBasicTypeaheadTriggerMatch, LexicalTypeaheadMenuPlugin, MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $isTableCellNode, $getTableCellNodeFromLexicalNode } from '@lexical/table';
import { ColorPicker } from '@virtari-packages/react-color-picker';
import { ScrollArea } from '@virtari-packages/react-scroll-area';
import { SelectItem, Select, SelectTrigger, SelectContent } from '@virtari-packages/react-select';
import { composeFieldDescribedBy, Field } from '@virtari-packages/react-fieldset';

function formatThreadDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}
function EditorCommentsPanel({
  className,
  composerOpen,
  draft,
  pendingQuote,
  threads,
  onDraftChange,
  onSubmit,
  onCancel,
  onResolve,
  onRemove
}) {
  if (!composerOpen && threads.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { className: cn("vds-editor-comments", className), children: [
    composerOpen ? /* @__PURE__ */ jsxs("div", { className: "vds-editor-comments-composer", children: [
      /* @__PURE__ */ jsxs("div", { className: "vds-editor-comments-header", children: [
        /* @__PURE__ */ jsxs("span", { className: "vds-editor-comments-title", children: [
          /* @__PURE__ */ jsx(Icon, { icon: IconMessageCircle, size: "sm" }),
          "Add comment"
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            color: "contrast",
            size: "xs",
            className: "vds-editor-comments-close",
            onClick: onCancel,
            children: /* @__PURE__ */ jsx(Icon, { icon: IconX, size: "sm" })
          }
        )
      ] }),
      pendingQuote ? /* @__PURE__ */ jsx("blockquote", { className: "vds-editor-comments-quote", children: pendingQuote }) : null,
      /* @__PURE__ */ jsx(
        Textarea,
        {
          inputSize: "sm",
          className: "vds-editor-comments-input",
          rows: 4,
          value: draft,
          onChange: (event) => onDraftChange(event.target.value),
          placeholder: "Leave context for this selection..."
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "vds-editor-comments-actions", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            color: "contrast",
            size: "sm",
            onClick: onCancel,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "soft",
            color: "primary",
            size: "sm",
            disabled: draft.trim().length === 0,
            onClick: onSubmit,
            children: "Add comment"
          }
        )
      ] })
    ] }) : null,
    threads.length > 0 ? /* @__PURE__ */ jsx("div", { className: "vds-editor-comments-list", children: threads.map((thread) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "vds-editor-comment-card",
        "data-status": thread.status,
        children: [
          /* @__PURE__ */ jsxs("header", { className: "vds-editor-comment-card-header", children: [
            /* @__PURE__ */ jsxs("span", { className: "vds-editor-comment-card-title", children: [
              /* @__PURE__ */ jsx(Icon, { icon: IconMessageCircle, size: "sm" }),
              thread.status === "resolved" ? "Resolved comment" : "Comment"
            ] }),
            /* @__PURE__ */ jsx(
              "time",
              {
                className: "vds-editor-comment-card-date",
                dateTime: thread.createdAt,
                children: formatThreadDate(thread.createdAt)
              }
            )
          ] }),
          thread.quote ? /* @__PURE__ */ jsx("blockquote", { className: "vds-editor-comment-card-quote", children: thread.quote }) : null,
          /* @__PURE__ */ jsx("p", { className: "vds-editor-comment-card-body", children: thread.body }),
          /* @__PURE__ */ jsxs("div", { className: "vds-editor-comment-card-actions", children: [
            thread.status === "open" ? /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                color: "success",
                size: "xs",
                onClick: () => onResolve(thread.id),
                children: [
                  /* @__PURE__ */ jsx(Icon, { icon: IconCheck, size: "sm" }),
                  "Resolve"
                ]
              }
            ) : null,
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                color: "danger",
                size: "xs",
                onClick: () => onRemove(thread.id),
                children: [
                  /* @__PURE__ */ jsx(Icon, { icon: IconTrash, size: "sm" }),
                  "Remove"
                ]
              }
            )
          ] })
        ]
      },
      thread.id
    )) }) : null
  ] });
}
var DROPDOWN_OFFSET = 6;
var VIEWPORT_GUTTER = 8;
var OFFSCREEN_POSITION = -1e4;
var EDITOR_DROPDOWN_OPEN_EVENT = "vds-editor-dropdown-open";
var EditorDropdownContext = createContext(
  null
);
function useEditorDropdown() {
  const context = useContext(EditorDropdownContext);
  if (!context) {
    throw new Error("useEditorDropdown must be used within EditorDropdown.");
  }
  return context;
}
function EditorDropdownItem({
  children,
  className,
  closeOnSelect = true,
  onSelect,
  title
}) {
  const itemRef = useRef(null);
  const context = useContext(EditorDropdownContext);
  if (!context) {
    throw new Error("EditorDropdownItem must be used within EditorDropdown.");
  }
  const { close, registerItem } = context;
  useEffect(() => {
    registerItem(itemRef);
  }, [registerItem]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: itemRef,
      type: "button",
      className,
      title,
      onMouseDown: (event) => event.preventDefault(),
      onClick: () => {
        onSelect?.();
        if (closeOnSelect) {
          close();
        }
      },
      children
    }
  );
}
function EditorDropdownSeparator({
  className
}) {
  return /* @__PURE__ */ jsx("div", { className, role: "separator" });
}
function EditorDropdown({
  autoFocusItems = true,
  children,
  className,
  closeOnTriggerMove = true,
  disabled,
  onOpenChange,
  stopCloseOnClickSelf = false,
  trigger
}) {
  const panelId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(
    null
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const setDropdownOpen = useCallback(
    (nextOpen) => {
      if (nextOpen && disabled) {
        return;
      }
      if (nextOpen) {
        document.dispatchEvent(
          new CustomEvent(EDITOR_DROPDOWN_OPEN_EVENT, { detail: panelId })
        );
      }
      setOpen(nextOpen);
    },
    [disabled, panelId]
  );
  const isTriggerVisible = useCallback(() => {
    const button = buttonRef.current;
    if (!button || !button.isConnected) {
      return false;
    }
    const rect = button.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.right >= 0 && rect.top <= window.innerHeight && rect.left <= window.innerWidth;
  }, []);
  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    const panel = panelRef.current;
    if (!button || !panel) {
      return;
    }
    if (!isTriggerVisible()) {
      setDropdownOpen(false);
      return;
    }
    const { top, left, bottom } = button.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const showAbove = bottom + panelRect.height + DROPDOWN_OFFSET > viewportHeight && top > panelRect.height + DROPDOWN_OFFSET;
    const nextTop = showAbove ? top - panelRect.height - DROPDOWN_OFFSET : bottom + DROPDOWN_OFFSET;
    const nextLeft = Math.min(
      left,
      viewportWidth - panelRect.width - VIEWPORT_GUTTER
    );
    setPosition({
      left: Math.max(VIEWPORT_GUTTER, nextLeft),
      top: Math.max(DROPDOWN_OFFSET, nextTop)
    });
  }, [isTriggerVisible, setDropdownOpen]);
  const close = useCallback(() => {
    setOpen(false);
  }, []);
  const closeWithOptions = useCallback((options) => {
    setOpen(false);
    if (options?.restoreFocus) {
      buttonRef.current?.focus({ preventScroll: true });
    }
  }, []);
  const contextValue = useMemo(
    () => ({
      close: closeWithOptions,
      registerItem(itemRef) {
        if (!itemsRef.current.includes(itemRef)) {
          itemsRef.current = [...itemsRef.current, itemRef];
        }
      }
    }),
    [closeWithOptions]
  );
  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);
  useEffect(() => {
    const handleDropdownOpen = (event) => {
      const { detail } = event;
      if (detail !== panelId) {
        setOpen(false);
      }
    };
    document.addEventListener(
      EDITOR_DROPDOWN_OPEN_EVENT,
      handleDropdownOpen
    );
    return () => {
      document.removeEventListener(
        EDITOR_DROPDOWN_OPEN_EVENT,
        handleDropdownOpen
      );
    };
  }, [panelId]);
  useEffect(() => {
    if (!open) {
      itemsRef.current = [];
      setPosition(null);
      setHighlightedIndex(0);
      return;
    }
    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (buttonRef.current?.contains(target)) {
        return;
      }
      if (stopCloseOnClickSelf && panelRef.current?.contains(target)) {
        return;
      }
      if (!panelRef.current?.contains(target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [close, open, stopCloseOnClickSelf]);
  useEffect(() => {
    if (!open || !closeOnTriggerMove) {
      return;
    }
    const handleWindowResize = () => close();
    const handleDocumentScroll = (event) => {
      const target = event.target;
      if (target instanceof Node && panelRef.current?.contains(target)) {
        return;
      }
      close();
    };
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("scroll", handleDocumentScroll, true);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("scroll", handleDocumentScroll, true);
    };
  }, [close, open]);
  useEffect(() => {
    if (!open || !closeOnTriggerMove) {
      return;
    }
    const initialRect = buttonRef.current?.getBoundingClientRect();
    if (!initialRect) {
      return;
    }
    let animationFrame = 0;
    const watchTriggerPosition = () => {
      const button = buttonRef.current;
      if (!button || !isTriggerVisible()) {
        close();
        return;
      }
      const rect = button.getBoundingClientRect();
      const moved = Math.abs(rect.left - initialRect.left) > 1 || Math.abs(rect.top - initialRect.top) > 1 || Math.abs(rect.width - initialRect.width) > 1 || Math.abs(rect.height - initialRect.height) > 1;
      if (moved) {
        close();
        return;
      }
      animationFrame = window.requestAnimationFrame(watchTriggerPosition);
    };
    animationFrame = window.requestAnimationFrame(watchTriggerPosition);
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [close, closeOnTriggerMove, isTriggerVisible, open]);
  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    updatePosition();
  }, [children, open, updatePosition]);
  useEffect(() => {
    if (!open || !autoFocusItems) {
      return;
    }
    const currentItem = itemsRef.current[highlightedIndex]?.current;
    currentItem?.focus();
  }, [autoFocusItems, highlightedIndex, open]);
  function handleKeyDown(event) {
    if (itemsRef.current.length === 0) {
      if (event.key === "Escape" || event.key === "Tab") {
        event.preventDefault();
        closeWithOptions({ restoreFocus: true });
      }
      return;
    }
    if (["Escape", "ArrowUp", "ArrowDown", "Home", "End", "Tab"].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === "Escape" || event.key === "Tab") {
      closeWithOptions({ restoreFocus: true });
      return;
    }
    if (event.key === "Home") {
      setHighlightedIndex(0);
      return;
    }
    if (event.key === "End") {
      setHighlightedIndex(itemsRef.current.length - 1);
      return;
    }
    if (event.key === "ArrowUp") {
      setHighlightedIndex(
        (current) => current === 0 ? itemsRef.current.length - 1 : current - 1
      );
      return;
    }
    if (event.key === "ArrowDown") {
      setHighlightedIndex(
        (current) => current === itemsRef.current.length - 1 ? 0 : current + 1
      );
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    trigger({
      buttonRef,
      controlsId: panelId,
      open,
      setOpen: setDropdownOpen,
      toggle: () => setDropdownOpen(!open)
    }),
    open ? createPortal(
      /* @__PURE__ */ jsx(EditorDropdownContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
        "div",
        {
          id: panelId,
          ref: panelRef,
          className,
          style: {
            position: "fixed",
            left: position?.left ?? OFFSCREEN_POSITION,
            top: position?.top ?? OFFSCREEN_POSITION
          },
          onKeyDown: handleKeyDown,
          children
        }
      ) }),
      document.body
    ) : null
  ] });
}
var TRUSTED_EMBED_HOSTS = /* @__PURE__ */ new Set([
  "aparat.com",
  "canva.com",
  "codepen.io",
  "codesandbox.io",
  "dailymotion.com",
  "dribbble.com",
  "figma.com",
  "instagram.com",
  "loom.com",
  "miro.com",
  "open.spotify.com",
  "player.vimeo.com",
  "soundcloud.com",
  "tiktok.com",
  "twitter.com",
  "vimeo.com",
  "x.com",
  "youtube.com",
  "youtu.be"
]);
function getDefaultMode(kind) {
  if (kind === "embed") return "embed";
  return "upload";
}
function getDialogCopy(kind) {
  if (kind === "video") {
    return {
      description: "Upload a local video or embed from YouTube, Vimeo, Aparat, Loom, and other trusted platforms.",
      title: "Insert video"
    };
  }
  if (kind === "embed") {
    return {
      description: "Paste a direct URL or iframe embed code for docs, maps, prototypes, posts, audio, and other embeds.",
      title: "Insert embed"
    };
  }
  return {
    description: "Upload an image or paste a direct image URL.",
    title: "Insert image"
  };
}
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("File could not be read."));
    });
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}
function getYouTubeId(url) {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] ?? "";
  }
  if (url.pathname.startsWith("/shorts/")) {
    return url.pathname.split("/").filter(Boolean)[1] ?? "";
  }
  if (url.pathname.startsWith("/embed/")) {
    return url.pathname.split("/").filter(Boolean)[1] ?? "";
  }
  return url.searchParams.get("v") ?? "";
}
function getFirstUrl(value) {
  const iframeSrc = value.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1];
  if (iframeSrc) return iframeSrc;
  return value.match(/https?:\/\/[^\s"'<>]+/i)?.[0] ?? "";
}
function normalizeEmbedUrl(value) {
  const candidate = getFirstUrl(value.trim());
  if (!candidate) return "";
  let url;
  try {
    url = new URL(candidate);
  } catch {
    return candidate;
  }
  const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
  if (hostname === "youtu.be" || hostname.endsWith("youtube.com")) {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : candidate;
  }
  if (hostname === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://player.vimeo.com/video/${id}` : candidate;
  }
  if (hostname === "dailymotion.com") {
    const id = url.pathname.split("/").filter(Boolean).at(-1);
    return id ? `https://www.dailymotion.com/embed/video/${id}` : candidate;
  }
  if (hostname === "aparat.com") {
    const id = url.pathname.split("/").filter(Boolean).at(-1);
    return id ? `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame` : candidate;
  }
  if (hostname === "open.spotify.com") {
    const path = url.pathname.replace(/^\/embed\//, "/");
    return `https://open.spotify.com/embed${path}`;
  }
  if (hostname === "soundcloud.com") {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(candidate)}`;
  }
  if (hostname === "figma.com") {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(candidate)}`;
  }
  if (hostname === "tiktok.com" || hostname.endsWith(".tiktok.com")) {
    const id = url.pathname.match(/\/video\/(\d+)/)?.[1];
    return id ? `https://www.tiktok.com/embed/v2/${id}` : candidate;
  }
  return candidate;
}
function isTrustedEmbedSource(value) {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "").toLowerCase();
    return TRUSTED_EMBED_HOSTS.has(hostname) || Array.from(TRUSTED_EMBED_HOSTS).some((host) => hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}
function EditorMediaDialog({
  editor,
  kind,
  onOpenChange,
  open,
  targetBlockElement
}) {
  const [mode, setMode] = useState(() => getDefaultMode(kind));
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const copy = useMemo(() => getDialogCopy(kind), [kind]);
  const accept = useMemo(
    () => {
      if (kind === "video") {
        return { "video/*": [] };
      }
      return { "image/*": [] };
    },
    [kind]
  );
  const normalizedEmbed = useMemo(
    () => normalizeEmbedUrl(mode === "code" ? embedCode : url),
    [embedCode, mode, url]
  );
  const showUpload = kind === "image" || kind === "video";
  const showCode = kind === "embed";
  useEffect(() => {
    if (!open) return;
    setMode(getDefaultMode(kind));
    setFiles([]);
    setUrl("");
    setEmbedCode("");
    setTitle("");
    setError("");
    setSubmitting(false);
  }, [kind, open]);
  async function handleInsert() {
    if (!kind) return;
    setError("");
    setSubmitting(true);
    try {
      let src = "";
      if (mode === "upload") {
        const [file] = files;
        if (!file) {
          setError("Select a file first.");
          return;
        }
        src = await readFileAsDataUrl(file);
      } else if (mode === "url") {
        src = url.trim();
      } else {
        src = normalizedEmbed;
      }
      if (!src) {
        setError("Add a valid source.");
        return;
      }
      insertMediaBlock(
        editor,
        kind,
        {
          alt: title.trim(),
          src
        },
        targetBlockElement
      );
      onOpenChange(false);
    } catch (insertError) {
      setError(
        insertError instanceof Error ? insertError.message : "Could not insert this media."
      );
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      size: "lg",
      animation: "scale",
      backdrop: "blur",
      responsive: true,
      showCloseButton: true,
      className: "vds-editor-media-dialog",
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { variant: "bordered", children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: copy.title }),
          /* @__PURE__ */ jsx(DialogDescription, { children: copy.description })
        ] }),
        /* @__PURE__ */ jsxs(DialogBody, { className: "vds-editor-media-dialog-body", children: [
          /* @__PURE__ */ jsxs(
            Tabs,
            {
              value: mode,
              onValueChange: (nextMode) => {
                setMode(nextMode);
                setError("");
              },
              children: [
                /* @__PURE__ */ jsxs(
                  TabsList,
                  {
                    variant: "segmented",
                    size: "sm",
                    fullWidth: true,
                    className: "vds-editor-media-mode-list",
                    children: [
                      showUpload ? /* @__PURE__ */ jsxs(TabsTrigger, { value: "upload", children: [
                        /* @__PURE__ */ jsx(Icon, { icon: IconUpload, size: "xs" }),
                        "Upload"
                      ] }) : null,
                      kind === "image" ? /* @__PURE__ */ jsxs(TabsTrigger, { value: "url", children: [
                        /* @__PURE__ */ jsx(Icon, { icon: IconLink, size: "xs" }),
                        "URL"
                      ] }) : null,
                      kind === "video" ? /* @__PURE__ */ jsxs(TabsTrigger, { value: "embed", children: [
                        /* @__PURE__ */ jsx(Icon, { icon: IconVideo, size: "xs" }),
                        "Embed"
                      ] }) : null,
                      kind === "embed" ? /* @__PURE__ */ jsxs(TabsTrigger, { value: "embed", children: [
                        /* @__PURE__ */ jsx(Icon, { icon: IconWorld, size: "xs" }),
                        "URL"
                      ] }) : null,
                      showCode ? /* @__PURE__ */ jsxs(TabsTrigger, { value: "code", children: [
                        /* @__PURE__ */ jsx(Icon, { icon: IconCode, size: "xs" }),
                        "Code"
                      ] }) : null
                    ]
                  }
                ),
                showUpload ? /* @__PURE__ */ jsx(TabsContent, { value: "upload", className: "vds-editor-media-pane", children: /* @__PURE__ */ jsxs(
                  FileUpload.Root,
                  {
                    accept,
                    files,
                    maxFiles: 1,
                    multiple: false,
                    onFilesChange: setFiles,
                    children: [
                      /* @__PURE__ */ jsxs(FileUpload.Dropzone, { className: "vds-editor-media-upload", children: [
                        /* @__PURE__ */ jsx(
                          Icon,
                          {
                            icon: kind === "video" ? IconVideo : IconPhoto,
                            size: "lg"
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "vds-editor-media-upload-copy", children: [
                          /* @__PURE__ */ jsx("span", { className: "vds-editor-media-upload-title", children: "Drop file here" }),
                          /* @__PURE__ */ jsx("span", { className: "vds-editor-media-upload-description", children: kind === "video" ? "MP4, WebM, OGV, or any browser-supported video file." : "PNG, JPG, GIF, WebP, or SVG image file." })
                        ] }),
                        /* @__PURE__ */ jsx(FileUpload.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "soft", size: "sm", children: "Browse" }) })
                      ] }),
                      files.length > 0 ? /* @__PURE__ */ jsx(FileUpload.List, { className: "vds-editor-media-file-list", children: files.map((file) => /* @__PURE__ */ jsxs(FileUpload.Item, { file, children: [
                        /* @__PURE__ */ jsx(
                          FileUpload.Preview,
                          {
                            file,
                            className: "vds-editor-media-file-preview",
                            render: () => /* @__PURE__ */ jsx("span", { className: "vds-editor-media-file-fallback", children: /* @__PURE__ */ jsx(Icon, { icon: IconVideo, size: "sm" }) })
                          }
                        ),
                        /* @__PURE__ */ jsxs("span", { className: "vds-editor-media-file-main", children: [
                          /* @__PURE__ */ jsx(FileUpload.Item.Name, {}),
                          /* @__PURE__ */ jsx(FileUpload.Item.Size, {})
                        ] }),
                        /* @__PURE__ */ jsx(FileUpload.Item.Remove, {})
                      ] }, file.name)) }) : null
                    ]
                  }
                ) }) : null,
                /* @__PURE__ */ jsx(TabsContent, { value: "url", className: "vds-editor-media-pane", children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    inputSize: "sm",
                    value: url,
                    onChange: (event) => setUrl(event.currentTarget.value),
                    placeholder: "https://example.com/image.png"
                  }
                ) }),
                /* @__PURE__ */ jsxs(TabsContent, { value: "embed", className: "vds-editor-media-pane", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      inputSize: "sm",
                      value: url,
                      onChange: (event) => setUrl(event.currentTarget.value),
                      placeholder: "Paste a video, post, prototype, audio, map, or iframe URL"
                    }
                  ),
                  normalizedEmbed ? /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "vds-editor-media-source-hint",
                      "data-trusted": isTrustedEmbedSource(normalizedEmbed) ? "" : void 0,
                      children: isTrustedEmbedSource(normalizedEmbed) ? "Trusted embed source" : "Direct embed URL"
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ jsxs(TabsContent, { value: "code", className: "vds-editor-media-pane", children: [
                  /* @__PURE__ */ jsx(
                    CodeEditor,
                    {
                      className: "vds-editor-media-code",
                      value: embedCode,
                      onValueChange: setEmbedCode,
                      language: "html",
                      filename: "embed.html",
                      copyable: false,
                      showLineNumbers: false,
                      wrap: true,
                      minLines: 4,
                      maxLines: 8,
                      variant: "embedded",
                      size: "sm",
                      placeholder: '<iframe src="https://..."></iframe>'
                    }
                  ),
                  normalizedEmbed ? /* @__PURE__ */ jsxs("div", { className: "vds-editor-media-source-hint", children: [
                    "Using ",
                    normalizedEmbed
                  ] }) : null
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("label", { className: "vds-editor-media-field", children: [
            /* @__PURE__ */ jsx("span", { children: "Title / alt text" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                inputSize: "sm",
                value: title,
                onChange: (event) => setTitle(event.currentTarget.value),
                placeholder: kind === "image" ? "Image alt text" : kind === "video" ? "Video title" : "Embed title"
              }
            )
          ] }),
          error ? /* @__PURE__ */ jsx("div", { className: "vds-editor-media-error", children: error }) : null
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              color: "contrast",
              size: "sm",
              onClick: () => onOpenChange(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              color: "primary",
              size: "sm",
              loading: submitting,
              onClick: () => void handleInsert(),
              children: "Insert"
            }
          )
        ] })
      ]
    }
  ) });
}
var DEFAULT_LABEL = "Insert";
var MIN_TABLE_DIMENSION = 2;
var MAX_TABLE_DIMENSION = 8;
function isMediaInsertKind(kind) {
  return kind === "image" || kind === "video" || kind === "embed";
}
function createDefaultItems(features, compact) {
  const items = [];
  const includeTextBlocks = compact;
  if (features.horizontalRule) {
    items.push({
      key: "divider",
      title: "Horizontal Rule",
      description: "Insert a divider between blocks.",
      icon: IconSeparatorHorizontal,
      kind: "divider",
      run: (editor, targetBlockElement) => insertBlock(editor, "divider", targetBlockElement)
    });
  }
  if (includeTextBlocks) {
    items.push(
      {
        key: "paragraph",
        title: "Paragraph",
        description: "Insert a plain text block.",
        icon: IconTypography,
        kind: "paragraph",
        run: (editor, targetBlockElement) => insertBlock(editor, "paragraph", targetBlockElement)
      },
      {
        key: "h1",
        title: "Heading 1",
        description: "Insert a large page heading.",
        icon: IconH1,
        kind: "h1",
        run: (editor, targetBlockElement) => insertBlock(editor, "h1", targetBlockElement)
      },
      {
        key: "h2",
        title: "Heading 2",
        description: "Insert a section heading.",
        icon: IconH2,
        kind: "h2",
        run: (editor, targetBlockElement) => insertBlock(editor, "h2", targetBlockElement)
      },
      {
        key: "h3",
        title: "Heading 3",
        description: "Insert a subsection heading.",
        icon: IconH3,
        kind: "h3",
        run: (editor, targetBlockElement) => insertBlock(editor, "h3", targetBlockElement)
      },
      {
        key: "quote",
        title: "Quote",
        description: "Insert a quoted block.",
        icon: IconQuote,
        kind: "quote",
        run: (editor, targetBlockElement) => insertBlock(editor, "quote", targetBlockElement)
      }
    );
    if (features.codeBlocks) {
      items.push({
        key: "code",
        title: "Code block",
        description: "Insert a fenced code block.",
        icon: IconCode,
        kind: "code",
        run: (editor, targetBlockElement) => insertBlock(editor, "code", targetBlockElement)
      });
    }
    if (features.lists) {
      items.push(
        {
          key: "bullet",
          title: "Bulleted list",
          description: "Insert an unordered list.",
          icon: IconList,
          kind: "bullet",
          run: (editor, targetBlockElement) => insertBlock(editor, "bullet", targetBlockElement)
        },
        {
          key: "number",
          title: "Numbered list",
          description: "Insert an ordered list.",
          icon: IconListNumbers,
          kind: "number",
          run: (editor, targetBlockElement) => insertBlock(editor, "number", targetBlockElement)
        }
      );
    }
    if (features.checklists) {
      items.push({
        key: "check",
        title: "Checklist",
        description: "Insert a task list.",
        icon: IconListCheck,
        kind: "check",
        run: (editor, targetBlockElement) => insertBlock(editor, "check", targetBlockElement)
      });
    }
  }
  if (features.media) {
    items.push(
      {
        key: "image",
        title: "Image",
        description: "Insert an image block.",
        icon: IconPhoto,
        kind: "image",
        run: (editor, targetBlockElement) => insertBlock(editor, "image", targetBlockElement)
      },
      {
        key: "video",
        title: "Video",
        description: "Insert a video block.",
        icon: IconVideo,
        kind: "video",
        run: (editor, targetBlockElement) => insertBlock(editor, "video", targetBlockElement)
      },
      {
        key: "embed",
        title: "Embed",
        description: "Insert an iframe, post, prototype, audio, map, or custom embed.",
        icon: IconWorld,
        kind: "embed",
        run: (editor, targetBlockElement) => insertBlock(editor, "embed", targetBlockElement)
      }
    );
  }
  if (features.tables) {
    items.push({
      key: "table",
      title: "Table",
      description: "Insert a 3 x 3 table with headers.",
      icon: IconTable,
      kind: "table",
      run: (editor, targetBlockElement) => insertTable(editor, 3, 3, targetBlockElement)
    });
  }
  return items;
}
function clampTableDimension(value) {
  return Math.min(MAX_TABLE_DIMENSION, Math.max(MIN_TABLE_DIMENSION, value));
}
function TableDimensionStepper({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "vds-editor-table-builder-stepper", children: [
    /* @__PURE__ */ jsx("span", { className: "vds-editor-table-builder-stepper-label", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "vds-editor-table-builder-stepper-controls", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          className: "vds-editor-table-builder-stepper-button",
          disabled: value <= MIN_TABLE_DIMENSION,
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => onChange(clampTableDimension(value - 1)),
          children: /* @__PURE__ */ jsx(Icon, { icon: IconMinus, size: "sm" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "vds-editor-table-builder-stepper-value", children: value }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          className: "vds-editor-table-builder-stepper-button",
          disabled: value >= MAX_TABLE_DIMENSION,
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => onChange(clampTableDimension(value + 1)),
          children: /* @__PURE__ */ jsx(Icon, { icon: IconPlus, size: "sm" })
        }
      )
    ] })
  ] });
}
function TableBuilderPanel({
  onBack,
  onInsert
}) {
  const { close } = useEditorDropdown();
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  return /* @__PURE__ */ jsxs("div", { className: "vds-editor-table-builder", children: [
    /* @__PURE__ */ jsxs("div", { className: "vds-editor-table-builder-header", children: [
      /* @__PURE__ */ jsx("span", { className: "vds-editor-table-builder-title", children: "Build Table" }),
      /* @__PURE__ */ jsxs("span", { className: "vds-editor-table-builder-summary", children: [
        rows,
        " x ",
        columns,
        " with header row"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vds-editor-table-builder-body", children: [
      /* @__PURE__ */ jsx(TableDimensionStepper, { label: "Rows", value: rows, onChange: setRows }),
      /* @__PURE__ */ jsx(
        TableDimensionStepper,
        {
          label: "Columns",
          value: columns,
          onChange: setColumns
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vds-editor-table-builder-actions", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: onBack,
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => close(),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            onInsert(rows, columns);
            close();
          },
          children: "Insert"
        }
      )
    ] })
  ] });
}
function EditorInsertMenu({
  className,
  items,
  label = DEFAULT_LABEL,
  compact = false,
  onOpenChange,
  targetBlockElement
}) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [mediaDialog, setMediaDialog] = useState(null);
  const [tableBuilderOpen, setTableBuilderOpen] = useState(false);
  const resolvedItems = useMemo(
    () => items ?? createDefaultItems(features, compact),
    [compact, features, items]
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("vds-editor-insert", className), children: [
    /* @__PURE__ */ jsx(
      EditorDropdown,
      {
        autoFocusItems: !compact,
        className: cn(
          "vds-editor-dropdown vds-editor-menu vds-editor-insert-menu",
          compact ? "vds-editor-insert-menu-compact" : null,
          tableBuilderOpen ? "vds-editor-insert-menu-table-builder" : null
        ),
        closeOnTriggerMove: false,
        disabled: readOnly,
        onOpenChange: (open) => {
          if (!open) {
            setTableBuilderOpen(false);
          }
          onOpenChange?.(open);
        },
        stopCloseOnClickSelf: tableBuilderOpen,
        trigger: ({ buttonRef, controlsId, open, toggle }) => /* @__PURE__ */ jsx(
          Button,
          {
            ref: buttonRef,
            type: "button",
            variant: open ? "soft" : "ghost",
            color: "contrast",
            size: "sm",
            className: cn(
              "vds-editor-toolbar-trigger vds-editor-insert-trigger",
              compact ? "vds-editor-insert-trigger-compact" : null
            ),
            "aria-label": label,
            "aria-controls": controlsId,
            "aria-expanded": open,
            disabled: readOnly,
            leftSection: /* @__PURE__ */ jsx(Icon, { icon: IconPlus, size: "sm" }),
            rightSection: compact ? void 0 : /* @__PURE__ */ jsx(Icon, { icon: IconChevronDown, size: "xs" }),
            onMouseDown: (event) => {
              event.preventDefault();
              event.stopPropagation();
            },
            onClick: (event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!open) {
                setTableBuilderOpen(false);
              }
              toggle();
            },
            children: compact ? null : label
          }
        ),
        children: tableBuilderOpen ? /* @__PURE__ */ jsx(
          TableBuilderPanel,
          {
            onBack: () => setTableBuilderOpen(false),
            onInsert: (rows, columns) => insertTable(editor, rows, columns, targetBlockElement)
          }
        ) : resolvedItems.map((item) => {
          const opensTableBuilder = item.kind === "table" && !compact;
          return /* @__PURE__ */ jsxs(
            EditorDropdownItem,
            {
              className: "vds-editor-menu-item vds-editor-menu-item-rich",
              closeOnSelect: !opensTableBuilder,
              onSelect: () => {
                if (opensTableBuilder) {
                  setTableBuilderOpen(true);
                  return;
                }
                if (isMediaInsertKind(item.kind)) {
                  setMediaDialog({
                    kind: item.kind,
                    targetBlockElement
                  });
                  return;
                }
                item.run(editor, targetBlockElement);
              },
              children: [
                item.icon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-icon", children: /* @__PURE__ */ jsx(Icon, { icon: item.icon, size: "sm" }) }) : null,
                /* @__PURE__ */ jsxs("span", { className: "vds-editor-menu-item-copy", children: [
                  /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-label", children: item.title }),
                  item.description ? /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-description", children: item.description }) : null
                ] }),
                item.shortcut ? /* @__PURE__ */ jsx(Kbd, { className: "vds-editor-menu-item-shortcut", children: item.shortcut }) : null
              ]
            },
            item.key
          );
        })
      }
    ),
    /* @__PURE__ */ jsx(
      EditorMediaDialog,
      {
        editor,
        kind: mediaDialog?.kind ?? null,
        open: mediaDialog !== null,
        targetBlockElement: mediaDialog?.targetBlockElement ?? null,
        onOpenChange: (nextOpen) => {
          if (!nextOpen) {
            setMediaDialog(null);
          }
        }
      }
    )
  ] });
}
var DRAGGABLE_BLOCK_MENU_CLASSNAME = "vds-editor-block-tools";
var DRAG_HIT_TEST_GUTTER = 112;
var DRAG_HIT_TEST_VERTICAL_BUFFER = 48;
var DRAG_SETTLE_DURATION = 210;
function isOnMenu(element) {
  return Boolean(element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`));
}
function isDragFromBlockMenu(target, menuElement) {
  return menuElement.contains(target) || target.contains(menuElement);
}
function getEditorContent(anchorElement) {
  return anchorElement.querySelector(".vds-editor-content");
}
function captureBlockRects(anchorElement) {
  const content = getEditorContent(anchorElement);
  const rects = /* @__PURE__ */ new Map();
  if (!content) {
    return rects;
  }
  for (const child of Array.from(content.children)) {
    if (child instanceof HTMLElement) {
      rects.set(child, child.getBoundingClientRect());
    }
  }
  return rects;
}
function animateBlocksFromPreviousRects(anchorElement, previousRects) {
  const content = getEditorContent(anchorElement);
  if (!content || previousRects.size === 0) {
    return;
  }
  const movedBlocks = [];
  for (const child of Array.from(content.children)) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }
    const previousRect = previousRects.get(child);
    if (!previousRect) {
      continue;
    }
    const nextRect = child.getBoundingClientRect();
    const deltaX = previousRect.left - nextRect.left;
    const deltaY = previousRect.top - nextRect.top;
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      continue;
    }
    child.dataset.vdsDragSettling = "true";
    child.style.transition = "none";
    child.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    movedBlocks.push(child);
  }
  if (movedBlocks.length === 0) {
    return;
  }
  window.requestAnimationFrame(() => {
    for (const block of movedBlocks) {
      block.style.transition = "";
      block.style.transform = "";
    }
    window.setTimeout(() => {
      for (const block of movedBlocks) {
        delete block.dataset.vdsDragSettling;
        block.style.transition = "";
        block.style.transform = "";
      }
    }, DRAG_SETTLE_DURATION);
  });
}
function getNearestTopLevelBlock(content, x, y) {
  const contentRect = content.getBoundingClientRect();
  if (x < contentRect.left - DRAG_HIT_TEST_GUTTER || x > contentRect.right + DRAG_HIT_TEST_GUTTER || y < contentRect.top - DRAG_HIT_TEST_VERTICAL_BUFFER || y > contentRect.bottom + DRAG_HIT_TEST_VERTICAL_BUFFER) {
    return null;
  }
  let nearestBlock = null;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (const child of Array.from(content.children)) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }
    const rect = child.getBoundingClientRect();
    const distance = Math.abs(y - (rect.top + rect.height / 2));
    if (distance < nearestDistance) {
      nearestBlock = child;
      nearestDistance = distance;
    }
  }
  return nearestBlock;
}
function getTopLevelBlockFromPoint(anchorElement, x, y) {
  const content = getEditorContent(anchorElement);
  if (!content) {
    return null;
  }
  const pointElement = anchorElement.ownerDocument.elementFromPoint(x, y);
  if (!(pointElement instanceof HTMLElement)) {
    return getNearestTopLevelBlock(content, x, y);
  }
  let current = pointElement;
  while (current && current.parentElement !== content) {
    if (current === content || current === anchorElement) {
      return getNearestTopLevelBlock(content, x, y);
    }
    current = current.parentElement;
  }
  return current?.parentElement === content ? current : getNearestTopLevelBlock(content, x, y);
}
function EditorDraggableBlocks({
  anchorElement,
  className,
  placement = "inside"
}) {
  const { readOnly } = useEditorConfig();
  const menuRef = useRef(null);
  const targetLineRef = useRef(null);
  const targetBlockElementRef = useRef(null);
  const draggedBlockElementRef = useRef(null);
  const dropBlockElementRef = useRef(null);
  const dragPreviewElementRef = useRef(null);
  const insertMenuOpenRef = useRef(false);
  const [targetBlockElement, setTargetBlockElement] = useState(null);
  useEffect(() => {
    targetBlockElementRef.current = targetBlockElement;
  }, [targetBlockElement]);
  function handleTargetElementChanged(nextTargetBlockElement) {
    if (insertMenuOpenRef.current) {
      return;
    }
    setTargetBlockElement(nextTargetBlockElement);
  }
  useEffect(() => {
    if (!anchorElement || readOnly) {
      return;
    }
    const activeAnchorElement = anchorElement;
    const ownerDocument = activeAnchorElement.ownerDocument;
    function clearDropState() {
      const dragged = draggedBlockElementRef.current;
      const drop = dropBlockElementRef.current;
      const dragPreview = dragPreviewElementRef.current;
      if (dragged) {
        delete dragged.dataset.vdsDragSource;
      }
      if (drop) {
        delete drop.dataset.vdsDropPosition;
      }
      dragPreview?.remove();
      activeAnchorElement.style.removeProperty(
        "--vds-editor-drag-placeholder-size"
      );
      activeAnchorElement.style.removeProperty(
        "--vds-editor-drag-indicator-offset"
      );
      delete activeAnchorElement.dataset.vdsDragActive;
      draggedBlockElementRef.current = null;
      dropBlockElementRef.current = null;
      dragPreviewElementRef.current = null;
    }
    function setDropTarget(blockElement, clientY) {
      const previousDrop = dropBlockElementRef.current;
      if (previousDrop && previousDrop !== blockElement) {
        delete previousDrop.dataset.vdsDropPosition;
      }
      if (!blockElement || blockElement === draggedBlockElementRef.current) {
        dropBlockElementRef.current = null;
        return;
      }
      const rect = blockElement.getBoundingClientRect();
      blockElement.dataset.vdsDropPosition = clientY < rect.top + rect.height / 2 ? "before" : "after";
      dropBlockElementRef.current = blockElement;
    }
    function handleDragStart(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !menuRef.current || !isDragFromBlockMenu(target, menuRef.current)) {
        return;
      }
      const draggedBlockElement = targetBlockElementRef.current;
      if (!draggedBlockElement) {
        return;
      }
      activeAnchorElement.dataset.vdsDragActive = "true";
      draggedBlockElement.dataset.vdsDragSource = "true";
      draggedBlockElementRef.current = draggedBlockElement;
      if (event.dataTransfer) {
        const rect = draggedBlockElement.getBoundingClientRect();
        const preview = draggedBlockElement.cloneNode(true);
        const placeholderSize = Math.max(28, Math.min(rect.height, 240));
        preview.classList.add("vds-editor-drag-preview");
        preview.setAttribute("aria-hidden", "true");
        preview.style.inlineSize = `${Math.min(rect.width, 560)}px`;
        activeAnchorElement.style.setProperty(
          "--vds-editor-drag-placeholder-size",
          `${placeholderSize}px`
        );
        activeAnchorElement.style.setProperty(
          "--vds-editor-drag-indicator-offset",
          `${placeholderSize / 2 + 6}px`
        );
        ownerDocument.body.append(preview);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(
          preview,
          Math.min(24, rect.width / 2),
          Math.min(24, rect.height / 2)
        );
        dragPreviewElementRef.current = preview;
      }
    }
    function handleDragOver(event) {
      if (!draggedBlockElementRef.current) {
        return;
      }
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
      const blockElement = getTopLevelBlockFromPoint(
        activeAnchorElement,
        event.clientX,
        event.clientY
      );
      setDropTarget(blockElement, event.clientY);
    }
    function handleDrop() {
      const previousRects = captureBlockRects(activeAnchorElement);
      window.setTimeout(() => {
        clearDropState();
        animateBlocksFromPreviousRects(activeAnchorElement, previousRects);
      });
    }
    ownerDocument.addEventListener("dragstart", handleDragStart, true);
    ownerDocument.addEventListener("dragover", handleDragOver, true);
    ownerDocument.addEventListener("drop", handleDrop, true);
    ownerDocument.addEventListener("dragend", clearDropState, true);
    return () => {
      clearDropState();
      ownerDocument.removeEventListener("dragstart", handleDragStart, true);
      ownerDocument.removeEventListener("dragover", handleDragOver, true);
      ownerDocument.removeEventListener("drop", handleDrop, true);
      ownerDocument.removeEventListener("dragend", clearDropState, true);
    };
  }, [anchorElement, readOnly]);
  if (!anchorElement || readOnly) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    DraggableBlockPlugin_EXPERIMENTAL,
    {
      anchorElem: anchorElement,
      menuRef,
      targetLineRef,
      menuComponent: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: menuRef,
          className: cn(DRAGGABLE_BLOCK_MENU_CLASSNAME, className),
          "data-placement": placement,
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx(
              EditorInsertMenu,
              {
                compact: true,
                className: "vds-editor-block-insert",
                label: "Insert block",
                onOpenChange: (open) => {
                  insertMenuOpenRef.current = open;
                },
                targetBlockElement
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "vds-editor-drag-handle", children: /* @__PURE__ */ jsx(Icon, { icon: IconGripVertical, size: "sm" }) })
          ]
        }
      ),
      targetLineComponent: /* @__PURE__ */ jsx(
        "div",
        {
          ref: targetLineRef,
          className: "vds-editor-drag-target-line",
          "aria-hidden": "true"
        }
      ),
      isOnMenu,
      onElementChanged: handleTargetElementChanged
    }
  );
}
var FLOATING_TOOLBAR_ICON_SIZE = "md";
function FloatingToolbarButton({
  active,
  icon,
  label,
  onClick,
  tooltipSide
}) {
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: active ? "soft" : "ghost",
        color: "contrast",
        size: "xs",
        className: "vds-editor-floating-button",
        "aria-label": label,
        onMouseDown: (event) => event.preventDefault(),
        onClick,
        children: /* @__PURE__ */ jsx(Icon, { icon, size: FLOATING_TOOLBAR_ICON_SIZE })
      }
    ) }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        className: "vds-editor-floating-tooltip",
        side: tooltipSide,
        size: "sm",
        variant: "inverted",
        children: label
      }
    )
  ] });
}
function EditorFloatingToolbar({
  className,
  showLinkActions = true,
  showCommentActions = true,
  onRequestComment,
  anchorElement
}) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();
  const toolbarRef = useRef(null);
  const selectionRef = useRef(null);
  const [state, setState] = useState(EMPTY_TOOLBAR_STATE);
  const [position, setPosition] = useState(null);
  const [selectionRect, setSelectionRect] = useState(null);
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const linkInputRef = useRef(null);
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
        linkEditorOpenRef.current && toolbarRef.current?.contains(document.activeElement)
      );
      if (!anchorElement || !rootElement || readOnly || !$isRangeSelection(selection) || selection.isCollapsed() || selection.getTextContent().trim().length === 0 || !nativeSelection || nativeSelection.rangeCount === 0 || !nativeSelection.anchorNode || !nativeSelection.focusNode || !rootElement.contains(nativeSelection.anchorNode) || !rootElement.contains(nativeSelection.focusNode)) {
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
    const nextPlacement = selectionRect.top - scrollerRect.top < 72 ? "below" : "above";
    const toolbarRect = toolbarRef.current.getBoundingClientRect();
    const nextLeft = Math.min(
      Math.max(
        selectionRect.left - anchorRect.left + selectionRect.width / 2,
        toolbarRect.width / 2 + 8
      ),
      anchorRect.width - toolbarRect.width / 2 - 8
    );
    const nextTop = nextPlacement === "above" ? selectionRect.top - anchorRect.top : selectionRect.bottom - anchorRect.top;
    setPosition({
      left: nextLeft,
      top: nextTop,
      placement: nextPlacement
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
        COMMAND_PRIORITY_LOW
      )
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
      passive: true
    });
    rootElement?.addEventListener("scroll", handleSelectionChange, {
      passive: true
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
  function handleLinkKeyDown(event) {
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
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: toolbarRef,
        className: cn("vds-editor-floating", className),
        "data-placement": position?.placement ?? "above",
        style: {
          transform: position ? `translate(${position.left}px, ${Math.max(position.top, 0)}px) translate(-50%, ${position.placement === "above" ? "calc(-100% - 12px)" : "12px"})` : "translate(-10000px, -10000px)",
          opacity: position ? 1 : 0
        },
        children: /* @__PURE__ */ jsxs(TooltipProvider, { delayDuration: 180, skipDelayDuration: 80, children: [
          /* @__PURE__ */ jsxs("div", { className: "vds-editor-floating-row", children: [
            /* @__PURE__ */ jsx(
              FloatingToolbarButton,
              {
                active: state.isBold,
                icon: IconBold,
                label: "Bold",
                tooltipSide,
                onClick: () => formatText(editor, "bold", selectionRef.current)
              }
            ),
            /* @__PURE__ */ jsx(
              FloatingToolbarButton,
              {
                active: state.isItalic,
                icon: IconItalic,
                label: "Italic",
                tooltipSide,
                onClick: () => formatText(editor, "italic", selectionRef.current)
              }
            ),
            /* @__PURE__ */ jsx(
              FloatingToolbarButton,
              {
                active: state.isUnderline,
                icon: IconUnderline,
                label: "Underline",
                tooltipSide,
                onClick: () => formatText(editor, "underline", selectionRef.current)
              }
            ),
            /* @__PURE__ */ jsx(
              FloatingToolbarButton,
              {
                active: state.isStrikethrough,
                icon: IconStrikethrough,
                label: "Strikethrough",
                tooltipSide,
                onClick: () => formatText(editor, "strikethrough", selectionRef.current)
              }
            ),
            features.advancedTextFormats ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  active: state.isSubscript,
                  icon: IconSubscript,
                  label: "Subscript",
                  tooltipSide,
                  onClick: () => formatText(editor, "subscript", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  active: state.isSuperscript,
                  icon: IconSuperscript,
                  label: "Superscript",
                  tooltipSide,
                  onClick: () => formatText(editor, "superscript", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  active: state.isUppercase,
                  icon: IconLetterCaseUpper,
                  label: "Uppercase",
                  tooltipSide,
                  onClick: () => formatText(editor, "uppercase", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  active: state.isLowercase,
                  icon: IconLetterCaseLower,
                  label: "Lowercase",
                  tooltipSide,
                  onClick: () => formatText(editor, "lowercase", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  active: state.isCapitalize,
                  icon: IconLetterCaseToggle,
                  label: "Capitalize",
                  tooltipSide,
                  onClick: () => formatText(editor, "capitalize", selectionRef.current)
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsx(
              FloatingToolbarButton,
              {
                active: state.isInlineCode,
                icon: IconCode,
                label: "Inline code",
                tooltipSide,
                onClick: () => formatText(editor, "code", selectionRef.current)
              }
            ),
            showLinkActions ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "vds-editor-floating-divider", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  active: state.isLink || linkEditorOpen,
                  icon: IconLink,
                  label: state.isLink ? "Edit link" : "Insert link",
                  tooltipSide,
                  onClick: toggleLinkEditor
                }
              ),
              state.isLink ? /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  icon: IconLinkOff,
                  label: "Remove link",
                  tooltipSide,
                  onClick: () => clearLink(editor, selectionRef.current)
                }
              ) : null
            ] }) : null,
            showCommentActions && features.comments ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "vds-editor-floating-divider", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx(
                FloatingToolbarButton,
                {
                  icon: IconMessageCirclePlus,
                  label: "Add comment",
                  tooltipSide,
                  onClick: () => onRequestComment?.()
                }
              )
            ] }) : null
          ] }),
          linkEditorOpen ? /* @__PURE__ */ jsxs("div", { className: "vds-editor-floating-link-row", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                ref: linkInputRef,
                inputSize: "xs",
                className: "vds-editor-floating-link-input",
                value: linkValue,
                onChange: (event) => setLinkValue(event.target.value),
                onKeyDown: handleLinkKeyDown,
                placeholder: "https://example.com"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                className: "vds-editor-floating-link-action",
                variant: "soft",
                color: "primary",
                size: "xs",
                onMouseDown: (event) => event.preventDefault(),
                onClick: submitLink,
                children: "Apply"
              }
            ),
            state.isLink ? /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  className: "vds-editor-floating-link-action vds-editor-floating-link-icon-action",
                  variant: "soft",
                  color: "danger",
                  size: "xs",
                  "aria-label": "Remove link",
                  onMouseDown: (event) => event.preventDefault(),
                  onClick: () => {
                    clearLink(editor, selectionRef.current);
                    closeLinkEditor();
                  },
                  children: /* @__PURE__ */ jsx(Icon, { icon: IconLinkOff, size: FLOATING_TOOLBAR_ICON_SIZE })
                }
              ) }),
              /* @__PURE__ */ jsx(
                TooltipContent,
                {
                  className: "vds-editor-floating-tooltip",
                  side: tooltipSide,
                  size: "sm",
                  variant: "inverted",
                  children: "Remove link"
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                className: "vds-editor-floating-link-action",
                variant: "ghost",
                color: "contrast",
                size: "xs",
                onMouseDown: (event) => event.preventDefault(),
                onClick: closeLinkEditor,
                children: "Cancel"
              }
            )
          ] }) : null
        ] })
      }
    ),
    anchorElement
  );
}
var DEFAULT_LABELS = {
  "rich-text": "Rich",
  markdown: "Markdown",
  html: "HTML"
};
var MODE_ICONS = {
  "rich-text": IconSourceCode,
  markdown: IconMarkdown,
  html: IconFileCode2
};
function EditorModeSwitcher({
  className,
  modes = ["rich-text", "markdown", "html"],
  labels,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsx(
    Tabs,
    {
      className: cn("vds-editor-mode-switcher", className),
      value,
      onValueChange: (nextValue) => {
        if (modes.includes(nextValue)) {
          onChange(nextValue);
        }
      },
      children: /* @__PURE__ */ jsx(
        TabsList,
        {
          className: "vds-editor-mode-list",
          variant: "segmented",
          size: "sm",
          "aria-label": "Editor mode",
          children: modes.map((mode) => {
            const label = labels?.[mode] ?? DEFAULT_LABELS[mode];
            return /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: mode,
                className: "vds-editor-mode-trigger",
                "aria-label": `${label} mode`,
                children: [
                  /* @__PURE__ */ jsx(Icon, { icon: MODE_ICONS[mode], size: "sm" }),
                  /* @__PURE__ */ jsx("span", { children: label })
                ]
              },
              mode
            );
          })
        }
      )
    }
  );
}
var SlashCommandOption = class extends MenuOption {
  item;
  constructor(item) {
    super(item.key);
    this.item = item;
  }
};
function EditorSlashMenu({
  className,
  items
}) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [queryString, setQueryString] = useState(null);
  const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0
  });
  const defaultItems = useMemo(
    () => {
      const next = [
        {
          key: "paragraph",
          title: "Paragraph",
          description: "Reset the current block to body text.",
          keywords: ["text", "body", "normal"],
          icon: IconTypography,
          run: (currentEditor) => applyBlockType(currentEditor, "paragraph")
        },
        {
          key: "h1",
          title: "Heading 1",
          description: "Large page heading.",
          keywords: ["title", "hero"],
          icon: IconH1,
          run: (currentEditor) => applyBlockType(currentEditor, "h1")
        },
        {
          key: "h2",
          title: "Heading 2",
          description: "Section heading.",
          keywords: ["subtitle", "section"],
          icon: IconH2,
          run: (currentEditor) => applyBlockType(currentEditor, "h2")
        },
        {
          key: "h3",
          title: "Heading 3",
          description: "Subsection heading.",
          keywords: ["subheading"],
          icon: IconH3,
          run: (currentEditor) => applyBlockType(currentEditor, "h3")
        },
        {
          key: "quote",
          title: "Quote",
          description: "Indented quotation block.",
          keywords: ["blockquote", "citation"],
          icon: IconQuote,
          run: (currentEditor) => applyBlockType(currentEditor, "quote")
        }
      ];
      if (features.lists) {
        next.push(
          {
            key: "bullet",
            title: "Bulleted list",
            description: "Create an unordered list.",
            keywords: ["ul", "list", "bullet"],
            icon: IconList,
            run: (currentEditor) => toggleBulletList(currentEditor, "paragraph")
          },
          {
            key: "number",
            title: "Numbered list",
            description: "Create an ordered list.",
            keywords: ["ol", "list", "number"],
            icon: IconListNumbers,
            run: (currentEditor) => toggleNumberList(currentEditor, "paragraph")
          }
        );
      }
      if (features.checklists) {
        next.push({
          key: "check",
          title: "Checklist",
          description: "Track tasks with checkboxes.",
          keywords: ["todo", "task"],
          icon: IconListCheck,
          run: (currentEditor) => toggleCheckList(currentEditor, "paragraph")
        });
      }
      if (features.codeBlocks) {
        next.push({
          key: "code",
          title: "Code block",
          description: "Insert a fenced code block.",
          keywords: ["snippet", "code"],
          icon: IconCode,
          run: (currentEditor) => applyBlockType(currentEditor, "code")
        });
      }
      if (features.horizontalRule) {
        next.push({
          key: "divider",
          title: "Divider",
          description: "Insert a horizontal rule.",
          keywords: ["rule", "separator", "hr"],
          icon: IconSeparatorHorizontal,
          run: (currentEditor) => insertBlock(currentEditor, "divider")
        });
      }
      if (features.tables) {
        next.push({
          key: "table",
          title: "Table",
          description: "Insert a 3 x 3 table with headers.",
          keywords: ["grid", "columns", "rows"],
          icon: IconTable,
          run: (currentEditor) => insertDefaultTable(currentEditor)
        });
      }
      return next;
    },
    [features]
  );
  const sourceItems = items ?? defaultItems;
  const normalizedQuery = (queryString ?? "").trim().toLowerCase();
  const options = useMemo(
    () => sourceItems.filter((item) => {
      if (!normalizedQuery) return true;
      const haystack = [
        item.title,
        item.description ?? "",
        ...item.keywords ?? []
      ].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    }).map((item) => new SlashCommandOption(item)),
    [normalizedQuery, sourceItems]
  );
  if (readOnly) return null;
  return /* @__PURE__ */ jsx(
    LexicalTypeaheadMenuPlugin,
    {
      options,
      onQueryChange: setQueryString,
      triggerFn: checkForSlashTriggerMatch,
      anchorClassName: "vds-editor-slash-anchor",
      onSelectOption: (option, _textNode, closeMenu) => {
        option.item.run(editor);
        closeMenu();
      },
      menuRenderFn: (anchorElementRef, { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex, options: menuOptions }) => anchorElementRef.current && menuOptions.length > 0 ? createPortal(
        /* @__PURE__ */ jsx("div", { className: cn("vds-editor-slash-menu", className), children: menuOptions.map((option, index) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "vds-editor-slash-option",
            "data-active": selectedIndex === index || void 0,
            onMouseDown: (event) => {
              event.preventDefault();
              selectOptionAndCleanUp(option);
            },
            onMouseEnter: () => setHighlightedIndex(index),
            children: [
              option.item.icon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-slash-option-icon", children: /* @__PURE__ */ jsx(Icon, { icon: option.item.icon, size: "sm" }) }) : null,
              /* @__PURE__ */ jsxs("span", { className: "vds-editor-slash-option-copy", children: [
                /* @__PURE__ */ jsx("span", { className: "vds-editor-slash-option-title", children: option.item.title }),
                option.item.description ? /* @__PURE__ */ jsx("span", { className: "vds-editor-slash-option-description", children: option.item.description }) : null
              ] })
            ]
          },
          option.key
        )) }),
        anchorElementRef.current
      ) : null
    }
  );
}
function EditorSourcePanel({
  maxHeight,
  minHeight = "12rem",
  mode,
  onChange,
  value
}) {
  useLexicalComposerContext();
  const { readOnly } = useEditorConfig();
  const [localValue, setLocalValue] = useState(value);
  const valueRef = useRef(value);
  const language = mode === "markdown" ? "markdown" : "html";
  useEffect(() => {
    valueRef.current = value;
    setLocalValue(
      (currentValue) => currentValue === value ? currentValue : value
    );
  }, [value]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "vds-editor-source-panel",
      style: {
        minBlockSize: minHeight,
        maxBlockSize: maxHeight
      },
      children: /* @__PURE__ */ jsx(
        CodeEditor,
        {
          className: "vds-editor-source-code",
          value: localValue,
          onValueChange: (nextValue) => {
            if (nextValue === valueRef.current) {
              return;
            }
            valueRef.current = nextValue;
            setLocalValue(nextValue);
            onChange?.(nextValue);
          },
          language,
          filename: mode === "markdown" ? "document.md" : "document.html",
          copyable: true,
          readOnly,
          showLineNumbers: true,
          wrap: true,
          minLines: 12,
          maxLines: 32,
          variant: "embedded",
          size: "md"
        }
      )
    }
  );
}
function EditorStatusBar({
  className,
  showFeatureHints = true
}) {
  const { features } = useEditorConfig();
  const metrics = useEditorMetrics();
  const remaining = features.characterLimit != null ? features.characterLimit.maxLength - metrics.characterCount : null;
  return /* @__PURE__ */ jsxs("div", { className: cn("vds-editor-status", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "vds-editor-status-group", children: [
      /* @__PURE__ */ jsxs("span", { className: "vds-editor-status-pill", children: [
        metrics.wordCount,
        " words"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "vds-editor-status-pill", children: [
        metrics.characterCount,
        " chars"
      ] }),
      remaining != null ? /* @__PURE__ */ jsxs(
        "span",
        {
          className: "vds-editor-status-pill",
          "data-state": remaining < 0 ? "over" : remaining <= Math.max(10, features.characterLimit.maxLength * 0.1) ? "near" : void 0,
          children: [
            remaining,
            " remaining"
          ]
        }
      ) : null
    ] }),
    showFeatureHints ? /* @__PURE__ */ jsxs("div", { className: "vds-editor-status-group", "data-align": "end", children: [
      features.markdownShortcuts ? /* @__PURE__ */ jsx("span", { className: "vds-editor-status-pill", children: "Markdown shortcuts" }) : null,
      features.tables ? /* @__PURE__ */ jsx("span", { className: "vds-editor-status-pill", children: "Tables" }) : null,
      features.horizontalRule ? /* @__PURE__ */ jsx("span", { className: "vds-editor-status-pill", children: "Divider" }) : null,
      features.autoLinks ? /* @__PURE__ */ jsx("span", { className: "vds-editor-status-pill", children: "Auto links" }) : null,
      features.draggableBlocks ? /* @__PURE__ */ jsx("span", { className: "vds-editor-status-pill", children: "Drag blocks" }) : null,
      features.comments ? /* @__PURE__ */ jsx("span", { className: "vds-editor-status-pill", children: "Comments" }) : null
    ] }) : null
  ] });
}
var HOVER_ACTIONS_CLASSNAME = "vds-editor-table-hover-actions";
function EditorTableHoverActions({
  anchorElement,
  className
}) {
  const [editor] = useLexicalComposerContext();
  const { readOnly } = useEditorConfig();
  const hoveredCellElementRef = useRef(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  function clearHoveredCell() {
    if (hoveredCellElementRef.current) {
      delete hoveredCellElementRef.current.dataset.vdsTableHovered;
    }
    hoveredCellElementRef.current = null;
    setHoveredCell(null);
  }
  function updateHoveredCell(cellElement) {
    editor.getEditorState().read(() => {
      const lexicalNode = $getNearestNodeFromDOMNode(cellElement);
      const tableCellNode = $isTableCellNode(lexicalNode) ? lexicalNode : lexicalNode ? $getTableCellNodeFromLexicalNode(lexicalNode) : null;
      if (!tableCellNode) {
        clearHoveredCell();
        return;
      }
      if (hoveredCellElementRef.current && hoveredCellElementRef.current !== cellElement) {
        delete hoveredCellElementRef.current.dataset.vdsTableHovered;
      }
      hoveredCellElementRef.current = cellElement;
      hoveredCellElementRef.current.dataset.vdsTableHovered = "true";
      setHoveredCell((currentCell) => {
        if (currentCell && currentCell.key === tableCellNode.getKey() && currentCell.element === cellElement) {
          return currentCell;
        }
        return {
          key: tableCellNode.getKey(),
          element: cellElement
        };
      });
    });
  }
  useEffect(() => {
    if (!anchorElement || readOnly) {
      return;
    }
    const activeAnchorElement = anchorElement;
    function handlePointerMove(event) {
      const path = event.composedPath();
      const target = path.find(
        (node) => node instanceof HTMLElement
      );
      if (!(target instanceof HTMLElement)) {
        clearHoveredCell();
        return;
      }
      if (target.closest(`.${HOVER_ACTIONS_CLASSNAME}`)) {
        return;
      }
      const cellElement = target.closest(".vds-editor-table-cell");
      if (!cellElement || !activeAnchorElement.contains(cellElement)) {
        clearHoveredCell();
        return;
      }
      updateHoveredCell(cellElement);
    }
    function handlePointerLeave(event) {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof HTMLElement && relatedTarget.closest(`.${HOVER_ACTIONS_CLASSNAME}`)) {
        return;
      }
      clearHoveredCell();
    }
    activeAnchorElement.addEventListener("pointermove", handlePointerMove);
    activeAnchorElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      clearHoveredCell();
      activeAnchorElement.removeEventListener("pointermove", handlePointerMove);
      activeAnchorElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [anchorElement, editor, readOnly]);
  useLayoutEffect(() => {
    if (!anchorElement || !hoveredCellElementRef.current) {
      return;
    }
    const scrollerElement = anchorElement.parentElement;
    function syncHoveredRect() {
      if (!hoveredCellElementRef.current?.isConnected) {
        clearHoveredCell();
        return;
      }
      updateHoveredCell(hoveredCellElementRef.current);
    }
    window.addEventListener("resize", syncHoveredRect);
    scrollerElement?.addEventListener("scroll", syncHoveredRect, {
      passive: true
    });
    return () => {
      window.removeEventListener("resize", syncHoveredRect);
      scrollerElement?.removeEventListener("scroll", syncHoveredRect);
    };
  }, [anchorElement, hoveredCell]);
  if (!anchorElement || !hoveredCell || readOnly) {
    return null;
  }
  return createPortal(
    /* @__PURE__ */ jsxs("div", { className: cn(HOVER_ACTIONS_CLASSNAME, className), children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          className: "vds-editor-table-hover-button",
          "data-axis": "column",
          "aria-label": "Insert column",
          title: "Insert column to the right",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => insertTableColumn(editor, true, null, hoveredCell.key),
          children: /* @__PURE__ */ jsx(Icon, { icon: IconPlus, size: "sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          className: "vds-editor-table-hover-button",
          "data-axis": "row",
          "aria-label": "Insert row",
          title: "Insert row below",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => insertTableRow(editor, true, null, hoveredCell.key),
          children: /* @__PURE__ */ jsx(Icon, { icon: IconPlus, size: "sm" })
        }
      )
    ] }),
    hoveredCell.element
  );
}
var BLOCK_OPTIONS = [
  { label: "Normal", value: "paragraph", shortcut: SHORTCUTS.NORMAL, icon: IconTypography },
  { label: "Heading 1", value: "h1", shortcut: SHORTCUTS.HEADING_1, icon: IconH1 },
  { label: "Heading 2", value: "h2", shortcut: SHORTCUTS.HEADING_2, icon: IconH2 },
  { label: "Heading 3", value: "h3", shortcut: SHORTCUTS.HEADING_3, icon: IconH3 },
  { label: "Numbered List", value: "number", shortcut: SHORTCUTS.NUMBERED_LIST, icon: IconListNumbers },
  { label: "Bullet List", value: "bullet", shortcut: SHORTCUTS.BULLET_LIST, icon: IconList },
  { label: "Check List", value: "check", shortcut: SHORTCUTS.CHECK_LIST, icon: IconListCheck },
  { label: "Quote", value: "quote", shortcut: SHORTCUTS.QUOTE, icon: IconQuote },
  { label: "Code Block", value: "code", shortcut: SHORTCUTS.CODE_BLOCK, icon: IconCode }
];
var ALIGNMENT_OPTIONS = [
  { label: "Left Align", value: "left", shortcut: SHORTCUTS.LEFT_ALIGN, icon: IconAlignLeft },
  { label: "Center Align", value: "center", shortcut: SHORTCUTS.CENTER_ALIGN, icon: IconAlignCenter },
  { label: "Right Align", value: "right", shortcut: SHORTCUTS.RIGHT_ALIGN, icon: IconAlignRight },
  { label: "Justify Align", value: "justify", shortcut: SHORTCUTS.JUSTIFY_ALIGN, icon: IconAlignJustified },
  { label: "Start Align", value: "start", icon: IconAlignLeft },
  { label: "End Align", value: "end", icon: IconAlignRight }
];
var DEFAULT_FONT_FAMILIES = [
  { label: "Sans", value: "var(--vds-font-sans)" },
  { label: "Latin", value: "var(--vds-font-latin)" },
  { label: "Mono", value: "var(--vds-font-mono)" }
];
var DEFAULT_FONT_SIZES = [
  { label: "12", value: "var(--vds-text-xs)" },
  { label: "14", value: "var(--vds-text-sm)" },
  { label: "16", value: "var(--vds-text-base)" },
  { label: "18", value: "var(--vds-text-lg)" },
  { label: "20", value: "var(--vds-text-xl)" },
  { label: "24", value: "var(--vds-text-2xl)" },
  { label: "30", value: "var(--vds-text-3xl)" }
];
var DEFAULT_TEXT_COLOR_SWATCHES = [
  { label: "Ink", value: "var(--vds-color-neutral-12)" },
  { label: "Primary", value: "var(--vds-color-primary-11)" },
  { label: "Info", value: "var(--vds-color-info-11)" },
  { label: "Success", value: "var(--vds-color-success-11)" },
  { label: "Warning", value: "var(--vds-color-warning-11)" },
  { label: "Danger", value: "var(--vds-color-danger-11)" },
  { label: "Accent", value: "var(--vds-color-accent-11)" }
];
var DEFAULT_HIGHLIGHT_SWATCHES = [
  { label: "Primary", value: "var(--vds-color-primary-4)" },
  { label: "Info", value: "var(--vds-color-info-4)" },
  { label: "Success", value: "var(--vds-color-success-4)" },
  { label: "Warning", value: "var(--vds-color-warning-4)" },
  { label: "Danger", value: "var(--vds-color-danger-4)" },
  { label: "Accent", value: "var(--vds-color-accent-4)" }
];
function areToolbarStatesEqual(current, next) {
  return current.blockType === next.blockType && current.elementFormat === next.elementFormat && current.isBold === next.isBold && current.isItalic === next.isItalic && current.isUnderline === next.isUnderline && current.isStrikethrough === next.isStrikethrough && current.isInlineCode === next.isInlineCode && current.isSubscript === next.isSubscript && current.isSuperscript === next.isSuperscript && current.isLowercase === next.isLowercase && current.isUppercase === next.isUppercase && current.isCapitalize === next.isCapitalize && current.isTableSelection === next.isTableSelection && current.isLink === next.isLink && current.linkUrl === next.linkUrl && current.fontFamily === next.fontFamily && current.fontSize === next.fontSize && current.fontColor === next.fontColor && current.bgColor === next.bgColor;
}
function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: active ? "soft" : "ghost",
      color: "contrast",
      size: "sm",
      className: "vds-editor-toolbar-button",
      disabled,
      title: label,
      "aria-label": label,
      onMouseDown: (event) => event.preventDefault(),
      onClick,
      children
    }
  );
}
function ToolbarMenuItem({
  active,
  icon,
  label,
  shortcut,
  onSelect,
  endSlot,
  reserveIcon = true
}) {
  return /* @__PURE__ */ jsxs(
    EditorDropdownItem,
    {
      className: cn(
        "vds-editor-menu-item",
        !reserveIcon ? "vds-editor-menu-item-no-icon" : null,
        active ? "is-active" : null
      ),
      onSelect,
      children: [
        icon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-icon", children: /* @__PURE__ */ jsx(Icon, { icon, size: "sm" }) }) : reserveIcon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-icon vds-editor-menu-item-icon-empty" }) : null,
        /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-copy", children: /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-label", children: label }) }),
        endSlot ?? (shortcut ? /* @__PURE__ */ jsx(Kbd, { children: shortcut }) : null)
      ]
    }
  );
}
function ToolbarSelectItemContent({
  icon,
  label,
  shortcut,
  endSlot,
  reserveIcon = true
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    icon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-icon", children: /* @__PURE__ */ jsx(Icon, { icon, size: "sm" }) }) : reserveIcon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-icon vds-editor-menu-item-icon-empty" }) : null,
    /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-copy", children: /* @__PURE__ */ jsx("span", { className: "vds-editor-menu-item-label", children: label }) }),
    endSlot ?? (shortcut ? /* @__PURE__ */ jsx(Kbd, { children: shortcut }) : null)
  ] });
}
function ToolbarDropdown({
  label,
  icon,
  active,
  disabled,
  className,
  dropdownClassName,
  onOpen,
  children
}) {
  return /* @__PURE__ */ jsx(
    EditorDropdown,
    {
      className: cn("vds-editor-dropdown vds-editor-menu", dropdownClassName),
      disabled,
      onOpenChange: (open) => {
        if (open) {
          onOpen?.();
        }
      },
      trigger: ({ buttonRef, controlsId, open, toggle }) => /* @__PURE__ */ jsx(
        Button,
        {
          ref: buttonRef,
          type: "button",
          variant: open || active ? "soft" : "ghost",
          color: "contrast",
          size: "sm",
          className: cn("vds-editor-toolbar-trigger", className),
          "aria-label": label,
          "aria-controls": controlsId,
          "aria-expanded": open,
          disabled,
          leftSection: icon ? /* @__PURE__ */ jsx(Icon, { icon, size: "sm" }) : void 0,
          rightSection: /* @__PURE__ */ jsx(Icon, { icon: IconChevronDown, size: "xs" }),
          onMouseDown: (event) => event.preventDefault(),
          onClick: (event) => {
            event.preventDefault();
            toggle();
          },
          children: label
        }
      ),
      children
    }
  );
}
function ToolbarSelect({
  label,
  triggerLabel,
  value,
  icon,
  disabled,
  triggerClassName,
  contentClassName,
  onOpen,
  onValueChange,
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: "vds-editor-toolbar-select-wrap", children: /* @__PURE__ */ jsxs(
    Select,
    {
      value,
      onValueChange,
      disabled,
      onOpenChange: (open) => {
        if (open) {
          onOpen?.();
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          SelectTrigger,
          {
            size: "sm",
            appearance: "soft",
            className: cn("vds-editor-toolbar-select", triggerClassName),
            "aria-label": label,
            onMouseDown: (event) => event.preventDefault(),
            children: /* @__PURE__ */ jsxs("span", { className: "vds-editor-toolbar-select-copy", children: [
              icon ? /* @__PURE__ */ jsx("span", { className: "vds-editor-toolbar-select-icon", children: /* @__PURE__ */ jsx(Icon, { icon, size: "sm" }) }) : null,
              /* @__PURE__ */ jsx("span", { className: "vds-editor-toolbar-select-text", children: triggerLabel })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          SelectContent,
          {
            size: "sm",
            className: cn("vds-editor-toolbar-select-content", contentClassName),
            children
          }
        )
      ]
    }
  ) });
}
function ToolbarColorMenu({
  disabled,
  label,
  icon,
  value,
  swatches,
  resetValue,
  onOpen,
  onApply
}) {
  const resolvedSwatches = useMemo(
    () => swatches.map((swatch) => ({
      ...swatch,
      resolvedValue: resolveColorForPicker(swatch.value)
    })),
    [swatches]
  );
  const pickerValue = resolveColorForPicker(value, resetValue);
  const pickerSwatches = resolvedSwatches.map((swatch) => swatch.resolvedValue);
  return /* @__PURE__ */ jsx(
    EditorDropdown,
    {
      className: "vds-editor-dropdown vds-editor-color-panel",
      disabled,
      stopCloseOnClickSelf: true,
      onOpenChange: (open) => {
        if (open) {
          onOpen();
        }
      },
      trigger: ({ buttonRef, controlsId, open, toggle }) => /* @__PURE__ */ jsx(
        Button,
        {
          ref: buttonRef,
          type: "button",
          variant: open || value !== resetValue ? "soft" : "ghost",
          color: "contrast",
          size: "sm",
          className: "vds-editor-toolbar-trigger vds-editor-toolbar-color-trigger",
          "aria-label": label,
          "aria-controls": controlsId,
          "aria-expanded": open,
          disabled,
          leftSection: /* @__PURE__ */ jsx(Icon, { icon, size: "sm" }),
          rightSection: /* @__PURE__ */ jsx(Icon, { icon: IconChevronDown, size: "xs" }),
          onMouseDown: (event) => event.preventDefault(),
          onClick: (event) => {
            event.preventDefault();
            toggle();
          }
        }
      ),
      children: /* @__PURE__ */ jsx(
        ToolbarColorPanel,
        {
          label,
          value: pickerValue,
          swatches: resolvedSwatches,
          pickerSwatches,
          resetValue,
          onApply
        }
      )
    }
  );
}
function ToolbarColorPanel({
  label,
  value,
  swatches,
  pickerSwatches,
  resetValue,
  onApply
}) {
  const { close } = useEditorDropdown();
  const [draftValue, setDraftValue] = useState(value);
  const resetPickerValue = resolveColorForPicker(resetValue);
  useEffect(() => {
    setDraftValue(value);
  }, [value]);
  function getApplyValue(nextValue) {
    const comparableValue = normalizeComparableColor(nextValue);
    const matchedSwatch = swatches.find(
      (swatch) => normalizeComparableColor(swatch.resolvedValue) === comparableValue
    );
    if (matchedSwatch) {
      return matchedSwatch.value;
    }
    if (normalizeComparableColor(resetPickerValue) === comparableValue || resetValue === "transparent" && normalizeComparableColor(nextValue) === "transparent") {
      return resetValue;
    }
    return nextValue;
  }
  function handlePickerMouseDownCapture(event) {
    const target = event.target;
    if (target instanceof HTMLElement && !target.closest("input, textarea, select")) {
      event.preventDefault();
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "vds-editor-color-panel-header", children: label }),
    /* @__PURE__ */ jsx(
      ColorPicker,
      {
        appearance: "flat",
        mode: "solid",
        defaultFormat: "hex",
        showCodeView: false,
        allowAlpha: resetValue === "transparent",
        className: "vds-editor-color-picker",
        value: draftValue,
        swatches: pickerSwatches,
        onMouseDownCapture: handlePickerMouseDownCapture,
        onValueChange: (nextValue) => setDraftValue(nextValue)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "vds-editor-color-panel-actions", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            setDraftValue(resetPickerValue);
            onApply(resetValue, false);
          },
          children: "Reset"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => close(),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          className: "vds-editor-color-apply-button",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            onApply(getApplyValue(draftValue), false);
            close();
          },
          children: "Apply"
        }
      )
    ] })
  ] });
}
function resolveLabelFromOptions(options, value, fallback) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}
function nextOptionValue(options, currentValue, direction) {
  const currentIndex = options.findIndex((option) => option.value === currentValue);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = Math.min(
    options.length - 1,
    Math.max(0, safeIndex + direction)
  );
  return options[nextIndex]?.value ?? currentValue;
}
function resolveColorForPicker(value, fallback = "#000000") {
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
  return computedColor && computedColor !== "rgba(0, 0, 0, 0)" ? computedColor : value.startsWith("var(") ? fallback : value;
}
function normalizeComparableColor(value) {
  return resolveColorForPicker(value).replace(/\s+/g, "").toLowerCase();
}
function EditorToolbar({
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
  highlightColorSwatches = DEFAULT_HIGHLIGHT_SWATCHES
}) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [state, setState] = useState(EMPTY_TOOLBAR_STATE);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const linkInputRef = useRef(null);
  const selectionRef = useRef(null);
  const sourceModeActive = mode !== void 0 && mode !== "rich-text";
  const richControlsDisabled = readOnly || sourceModeActive;
  const historyControlsDisabled = readOnly;
  const blockOptions = useMemo(
    () => BLOCK_OPTIONS.filter((option) => {
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
    [features.checklists, features.codeBlocks, features.lists]
  );
  const currentBlockOption = blockOptions.find((option) => option.value === state.blockType) ?? blockOptions[0];
  const currentAlignmentOption = ALIGNMENT_OPTIONS.find((option) => option.value === state.elementFormat) ?? ALIGNMENT_OPTIONS[0];
  const fontFamilyLabel = resolveLabelFromOptions(
    fontFamilies,
    state.fontFamily,
    "Sans"
  );
  const fontSizeLabel = resolveLabelFromOptions(
    fontSizes,
    state.fontSize,
    "16"
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
        const nextState = readToolbarState();
        setState(
          (currentState) => areToolbarStatesEqual(currentState, nextState) ? currentState : nextState
        );
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
        COMMAND_PRIORITY_LOW$1
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW$1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW$1
      )
    );
  }, [editor]);
  function handleBlockTypeSelect(blockType) {
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
  function applyFontStyle(property, value, skipHistoryStack = false) {
    applyTextStyles(
      editor,
      { [property]: value },
      selectionRef.current,
      skipHistoryStack
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("vds-editor-toolbar", className),
      "data-sticky": sticky || void 0,
      "data-read-only": readOnly || void 0,
      "data-source-mode": sourceModeActive || void 0,
      children: [
        /* @__PURE__ */ jsx(
          ScrollArea,
          {
            className: "vds-editor-toolbar-scroll",
            orientation: "horizontal",
            size: "sm",
            mask: true,
            arrows: true,
            arrowPlacement: "outer",
            arrowAppearance: "hover",
            hideScrollbar: true,
            children: /* @__PURE__ */ jsxs("div", { className: "vds-editor-toolbar-row", children: [
              features.history ? /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-group-sticky",
                  "aria-label": "History",
                  children: [
                    /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: "Undo",
                        disabled: historyControlsDisabled || !canUndo,
                        onClick: () => undo(editor),
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconArrowBackUp, size: "sm" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: "Redo",
                        disabled: historyControlsDisabled || !canRedo,
                        onClick: () => redo(editor),
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconArrowForwardUp, size: "sm" })
                      }
                    )
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Block type",
                  children: /* @__PURE__ */ jsx(
                    ToolbarSelect,
                    {
                      label: "Block type",
                      triggerLabel: currentBlockOption?.label ?? "Normal",
                      value: currentBlockOption?.value ?? "paragraph",
                      icon: currentBlockOption?.icon,
                      disabled: richControlsDisabled,
                      contentClassName: "vds-editor-toolbar-block-menu",
                      onOpen: rememberSelection,
                      onValueChange: (nextValue) => handleBlockTypeSelect(nextValue),
                      children: blockOptions.map((option) => /* @__PURE__ */ jsx(
                        SelectItem,
                        {
                          value: option.value,
                          className: "vds-editor-toolbar-select-item",
                          children: /* @__PURE__ */ jsx("span", { className: "vds-editor-toolbar-select-item-content", children: /* @__PURE__ */ jsx(
                            ToolbarSelectItemContent,
                            {
                              icon: option.icon,
                              label: option.label,
                              shortcut: option.shortcut
                            }
                          ) })
                        },
                        option.value
                      ))
                    }
                  )
                }
              ),
              features.fontFamily ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Font family",
                  children: /* @__PURE__ */ jsx(
                    ToolbarSelect,
                    {
                      label: "Font family",
                      triggerLabel: fontFamilyLabel,
                      value: state.fontFamily,
                      icon: IconTypography,
                      disabled: richControlsDisabled,
                      contentClassName: "vds-editor-font-family-menu",
                      onOpen: rememberSelection,
                      onValueChange: (nextValue) => applyFontStyle("font-family", nextValue),
                      children: fontFamilies.map((option) => /* @__PURE__ */ jsx(
                        SelectItem,
                        {
                          value: option.value,
                          className: "vds-editor-toolbar-select-item",
                          children: /* @__PURE__ */ jsx("span", { className: "vds-editor-toolbar-select-item-content", children: /* @__PURE__ */ jsx(
                            ToolbarSelectItemContent,
                            {
                              label: option.label,
                              reserveIcon: false
                            }
                          ) })
                        },
                        option.value
                      ))
                    }
                  )
                }
              ) : null,
              features.fontSize ? /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Font size",
                  children: [
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        variant: "soft",
                        color: "contrast",
                        size: "sm",
                        className: "vds-editor-toolbar-button vds-editor-font-size-step",
                        disabled: richControlsDisabled,
                        title: "Decrease font size",
                        "aria-label": "Decrease font size",
                        onMouseDown: (event) => event.preventDefault(),
                        onClick: () => {
                          rememberSelection();
                          applyTextStyles(
                            editor,
                            {
                              "font-size": nextOptionValue(fontSizes, state.fontSize, -1)
                            },
                            selectionRef.current
                          );
                        },
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconMinus, size: "md", stroke: 2 })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ToolbarSelect,
                      {
                        label: "Font size",
                        triggerLabel: fontSizeLabel,
                        value: state.fontSize,
                        disabled: richControlsDisabled,
                        triggerClassName: "vds-editor-toolbar-select-compact",
                        contentClassName: "vds-editor-font-size-menu",
                        onOpen: rememberSelection,
                        onValueChange: (nextValue) => applyFontStyle("font-size", nextValue),
                        children: fontSizes.map((option) => /* @__PURE__ */ jsx(
                          SelectItem,
                          {
                            value: option.value,
                            className: "vds-editor-toolbar-select-item",
                            children: /* @__PURE__ */ jsx("span", { className: "vds-editor-toolbar-select-item-content", children: /* @__PURE__ */ jsx(
                              ToolbarSelectItemContent,
                              {
                                label: option.label,
                                reserveIcon: false
                              }
                            ) })
                          },
                          option.value
                        ))
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        variant: "soft",
                        color: "contrast",
                        size: "sm",
                        className: "vds-editor-toolbar-button vds-editor-font-size-step",
                        disabled: richControlsDisabled,
                        title: "Increase font size",
                        "aria-label": "Increase font size",
                        onMouseDown: (event) => event.preventDefault(),
                        onClick: () => {
                          rememberSelection();
                          applyTextStyles(
                            editor,
                            {
                              "font-size": nextOptionValue(fontSizes, state.fontSize, 1)
                            },
                            selectionRef.current
                          );
                        },
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconPlus, size: "md", stroke: 2 })
                      }
                    )
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Text format",
                  children: [
                    /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: "Bold",
                        active: state.isBold,
                        disabled: richControlsDisabled,
                        onClick: () => formatText(editor, "bold"),
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconBold, size: "sm" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: "Italic",
                        active: state.isItalic,
                        disabled: richControlsDisabled,
                        onClick: () => formatText(editor, "italic"),
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconItalic, size: "sm" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: "Underline",
                        active: state.isUnderline,
                        disabled: richControlsDisabled,
                        onClick: () => formatText(editor, "underline"),
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconUnderline, size: "sm" })
                      }
                    )
                  ]
                }
              ),
              features.advancedTextFormats ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Advanced text format",
                  children: /* @__PURE__ */ jsxs(
                    ToolbarDropdown,
                    {
                      label: "Aa",
                      icon: IconLetterCase,
                      active: state.isStrikethrough || state.isSubscript || state.isSuperscript || state.isLowercase || state.isUppercase || state.isCapitalize,
                      disabled: richControlsDisabled,
                      className: "vds-editor-toolbar-trigger-compact",
                      onOpen: rememberSelection,
                      children: [
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isStrikethrough,
                            label: "Strikethrough",
                            onSelect: () => formatText(editor, "strikethrough")
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isSubscript,
                            icon: IconSubscript,
                            label: "Subscript",
                            onSelect: () => formatText(editor, "subscript")
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isSuperscript,
                            icon: IconSuperscript,
                            label: "Superscript",
                            onSelect: () => formatText(editor, "superscript")
                          }
                        ),
                        /* @__PURE__ */ jsx(EditorDropdownSeparator, { className: "vds-editor-menu-separator" }),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isLowercase,
                            icon: IconLetterCaseLower,
                            label: "Lowercase",
                            onSelect: () => formatText(editor, "lowercase")
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isUppercase,
                            icon: IconLetterCaseUpper,
                            label: "Uppercase",
                            onSelect: () => formatText(editor, "uppercase")
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isCapitalize,
                            icon: IconLetterCaseToggle,
                            label: "Capitalize",
                            onSelect: () => formatText(editor, "capitalize")
                          }
                        )
                      ]
                    }
                  )
                }
              ) : null,
              features.textColors ? /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Text colors",
                  children: [
                    /* @__PURE__ */ jsx(
                      ToolbarColorMenu,
                      {
                        disabled: richControlsDisabled,
                        label: "Text color",
                        icon: IconPalette,
                        value: state.fontColor,
                        swatches: textColorSwatches,
                        resetValue: "var(--vds-color-neutral-12)",
                        onOpen: rememberSelection,
                        onApply: (value, skipHistoryStack) => applyTextStyles(
                          editor,
                          { color: value },
                          selectionRef.current,
                          skipHistoryStack
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ToolbarColorMenu,
                      {
                        disabled: richControlsDisabled,
                        label: "Highlight color",
                        icon: IconHighlight,
                        value: state.bgColor,
                        swatches: highlightColorSwatches,
                        resetValue: "transparent",
                        onOpen: rememberSelection,
                        onApply: (value, skipHistoryStack) => applyTextStyles(
                          editor,
                          { "background-color": value },
                          selectionRef.current,
                          skipHistoryStack
                        )
                      }
                    )
                  ]
                }
              ) : null,
              features.links || features.comments || insertMenu ? /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Insert",
                  children: [
                    features.links ? /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: state.isLink ? "Edit link" : "Insert link",
                        active: state.isLink || linkEditorOpen,
                        disabled: richControlsDisabled,
                        onClick: openLinkEditor,
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconLink, size: "sm" })
                      }
                    ) : null,
                    features.comments ? /* @__PURE__ */ jsx(
                      ToolbarButton,
                      {
                        label: "Add comment",
                        disabled: richControlsDisabled,
                        onClick: () => onRequestComment?.(),
                        children: /* @__PURE__ */ jsx(Icon, { icon: IconMessageCirclePlus, size: "sm" })
                      }
                    ) : null,
                    insertMenu ? /* @__PURE__ */ jsx(EditorInsertMenu, { ...insertMenu }) : null
                  ]
                }
              ) : null,
              features.tables && state.isTableSelection ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Table tools",
                  children: /* @__PURE__ */ jsxs(
                    ToolbarDropdown,
                    {
                      label: "Table",
                      icon: IconTable,
                      disabled: richControlsDisabled,
                      onOpen: rememberSelection,
                      children: [
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert row above",
                            onSelect: () => insertTableRow(editor, false, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert row below",
                            onSelect: () => insertTableRow(editor, true, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert column left",
                            onSelect: () => insertTableColumn(editor, false, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert column right",
                            onSelect: () => insertTableColumn(editor, true, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsx(EditorDropdownSeparator, { className: "vds-editor-menu-separator" }),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Delete row",
                            onSelect: () => deleteTableRow(editor, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Delete column",
                            onSelect: () => deleteTableColumn(editor, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Delete table",
                            onSelect: () => deleteTable(editor, selectionRef.current)
                          }
                        )
                      ]
                    }
                  )
                }
              ) : null,
              features.textAlignment ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Alignment",
                  children: /* @__PURE__ */ jsxs(
                    ToolbarDropdown,
                    {
                      label: currentAlignmentOption.label,
                      icon: currentAlignmentOption.icon,
                      disabled: richControlsDisabled,
                      children: [
                        ALIGNMENT_OPTIONS.map((option) => /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            active: state.elementFormat === option.value,
                            icon: option.icon,
                            label: option.label,
                            shortcut: option.shortcut,
                            onSelect: () => formatElement(editor, option.value)
                          },
                          option.value
                        )),
                        /* @__PURE__ */ jsx(EditorDropdownSeparator, { className: "vds-editor-menu-separator" }),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            icon: IconIndentDecrease,
                            label: "Outdent",
                            shortcut: SHORTCUTS.OUTDENT,
                            onSelect: () => outdentContent(editor)
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          ToolbarMenuItem,
                          {
                            icon: IconIndentIncrease,
                            label: "Indent",
                            shortcut: SHORTCUTS.INDENT,
                            onSelect: () => indentContent(editor)
                          }
                        )
                      ]
                    }
                  )
                }
              ) : null,
              modeSwitcher && mode && onModeChange ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-mode-group",
                  "aria-label": "Source mode",
                  children: /* @__PURE__ */ jsx(
                    EditorModeSwitcher,
                    {
                      ...modeSwitcher,
                      value: mode,
                      onChange: onModeChange
                    }
                  )
                }
              ) : null,
              showClearButton ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Danger zone",
                  children: /* @__PURE__ */ jsx(
                    ToolbarButton,
                    {
                      label: "Clear editor",
                      disabled: richControlsDisabled,
                      onClick: () => clearEditor(editor),
                      children: /* @__PURE__ */ jsx(Icon, { icon: IconTrash, size: "sm" })
                    }
                  )
                }
              ) : null
            ] })
          }
        ),
        linkEditorOpen ? /* @__PURE__ */ jsxs("div", { className: "vds-editor-toolbar-link-row", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              ref: linkInputRef,
              inputSize: "sm",
              className: "vds-editor-toolbar-link-input",
              value: linkValue,
              onChange: (event) => setLinkValue(event.target.value),
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitLink();
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  closeLinkEditor();
                }
              },
              placeholder: "https://example.com",
              disabled: richControlsDisabled
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "vds-editor-toolbar-link-actions", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                className: "vds-editor-toolbar-text-button",
                variant: "soft",
                color: "primary",
                size: "sm",
                disabled: richControlsDisabled,
                onMouseDown: (event) => event.preventDefault(),
                onClick: submitLink,
                children: "Apply"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                className: "vds-editor-toolbar-text-button",
                variant: "soft",
                color: "danger",
                size: "sm",
                disabled: richControlsDisabled,
                leftSection: /* @__PURE__ */ jsx(Icon, { icon: IconLinkOff, size: "sm" }),
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => {
                  clearLink(editor, selectionRef.current);
                  closeLinkEditor();
                },
                children: "Remove"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                className: "vds-editor-toolbar-text-button",
                variant: "ghost",
                color: "contrast",
                size: "sm",
                onMouseDown: (event) => event.preventDefault(),
                onClick: closeLinkEditor,
                children: "Cancel"
              }
            )
          ] })
        ] }) : null
      ]
    }
  );
}
function resolvePartProps(value) {
  if (value === false) return [false, {}];
  if (value === true || value === void 0) return [true, {}];
  return [true, value];
}
function applyMergedEditorRef(target, editor) {
  if (!target) return;
  if (typeof target === "function") {
    target(editor);
    return;
  }
  target.current = editor;
}
function Editor({
  className,
  style,
  surfaceClassName,
  surfaceStyle,
  toolbar,
  insertMenu,
  statusBar,
  slashMenu,
  floatingToolbar,
  modeSwitcher,
  blockTools,
  preset = "pro",
  readOnly = false,
  namespace,
  initialValue,
  initialValueFormat = "json",
  onChange,
  onError,
  autoFocus,
  features,
  linkMatchers,
  markdownTransformers,
  editorRef,
  defaultMode = "rich-text",
  mode,
  onModeChange,
  onCommentsChange,
  id,
  placeholder,
  placeholderText,
  contentClassName,
  contentStyle,
  placeholderClassName,
  minHeight,
  maxHeight,
  role,
  tabIndex,
  autoCapitalize,
  autoComplete,
  "aria-activedescendant": ariaActivedescendant,
  "aria-autocomplete": ariaAutocomplete,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-owns": ariaOwns,
  "data-testid": dataTestId,
  dir,
  lang,
  spellCheck
}) {
  const [toolbarEnabled, toolbarProps] = resolvePartProps(
    toolbar ?? preset === "pro"
  );
  const [insertMenuEnabled, insertMenuProps] = resolvePartProps(
    insertMenu ?? preset === "pro"
  );
  const [statusBarEnabled, statusBarProps] = resolvePartProps(
    statusBar ?? preset === "pro"
  );
  const [slashMenuEnabled, slashMenuProps] = resolvePartProps(
    slashMenu ?? preset === "pro"
  );
  const [floatingToolbarEnabled, floatingToolbarProps] = resolvePartProps(
    floatingToolbar ?? preset === "pro"
  );
  const [modeSwitcherEnabled, modeSwitcherProps] = resolvePartProps(
    modeSwitcher ?? preset === "pro"
  );
  const internalEditorRef = useRef(null);
  const appliedModeRef = useRef("rich-text");
  const commentSelectionRef = useRef(null);
  const sourceValueRef = useRef("");
  const [uncontrolledMode, setUncontrolledMode] = useState(defaultMode);
  const [surfaceElement, setSurfaceElement] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentComposerOpen, setCommentComposerOpen] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [pendingCommentQuote, setPendingCommentQuote] = useState("");
  const [sourceValue, setSourceValue] = useState("");
  const activeMode = mode ?? uncontrolledMode;
  const resolvedFeatures = resolveEditorFeatures(preset, features);
  const blockToolsPlacement = blockTools?.placement ?? "inside";
  const resolvedMarkdownTransformers = markdownTransformers ?? DEFAULT_MARKDOWN_TRANSFORMERS;
  const metricsCharset = resolvedFeatures.characterLimit?.charset ?? "UTF-16";
  function publishComments(nextComments) {
    setComments(nextComments);
    onCommentsChange?.(nextComments);
  }
  function handleComposerChange(payload) {
    if (!onChange) {
      return;
    }
    const effectiveMode = appliedModeRef.current;
    let nextPayload = payload;
    if (effectiveMode !== "rich-text" && internalEditorRef.current) {
      const source = readSourceValue(
        internalEditorRef.current,
        effectiveMode,
        resolvedMarkdownTransformers
      );
      nextPayload = {
        ...payload,
        text: source,
        html: effectiveMode === "html" ? source : "",
        markdown: effectiveMode === "markdown" ? source : "",
        json: null,
        characterCount: countCharacters(source, metricsCharset),
        wordCount: countWords(source),
        isEmpty: source.trim().length === 0
      };
    }
    onChange(nextPayload);
  }
  function applyModeToEditor(nextMode, previousMode = appliedModeRef.current) {
    if (!internalEditorRef.current) {
      appliedModeRef.current = nextMode;
      return true;
    }
    const appliedMode = appliedModeRef.current;
    try {
      appliedModeRef.current = nextMode;
      if (previousMode !== "rich-text") {
        applySourceValue(
          internalEditorRef.current,
          sourceValueRef.current,
          previousMode,
          resolvedMarkdownTransformers
        );
      }
      if (nextMode !== "rich-text") {
        const nextSource = readSourceValue(
          internalEditorRef.current,
          nextMode,
          resolvedMarkdownTransformers
        );
        sourceValueRef.current = nextSource;
        setSourceValue(nextSource);
      }
      return true;
    } catch (error) {
      appliedModeRef.current = appliedMode;
      if (error instanceof Error) {
        onError?.(error, internalEditorRef.current);
      }
      return false;
    }
  }
  useEffect(() => {
    if (activeMode === appliedModeRef.current) {
      return;
    }
    applyModeToEditor(activeMode);
  }, [activeMode, resolvedMarkdownTransformers]);
  function handleModeChange(nextMode) {
    if (nextMode === activeMode) {
      return;
    }
    if (mode !== void 0) {
      onModeChange?.(nextMode);
      return;
    }
    if (!applyModeToEditor(nextMode)) {
      return;
    }
    setUncontrolledMode(nextMode);
    onModeChange?.(nextMode);
  }
  function handleSourceValueChange(nextValue) {
    sourceValueRef.current = nextValue;
    setSourceValue(nextValue);
    if (!onChange || !internalEditorRef.current) {
      return;
    }
    onChange({
      editor: internalEditorRef.current,
      editorState: internalEditorRef.current.getEditorState(),
      tags: /* @__PURE__ */ new Set(),
      text: nextValue,
      html: activeMode === "html" ? nextValue : "",
      markdown: activeMode === "markdown" ? nextValue : "",
      json: null,
      characterCount: countCharacters(nextValue, metricsCharset),
      wordCount: countWords(nextValue),
      isEmpty: nextValue.trim().length === 0
    });
  }
  function requestComment() {
    if (!resolvedFeatures.comments || !internalEditorRef.current) {
      return;
    }
    internalEditorRef.current.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        return;
      }
      const quote = getSelectionText(selection.clone());
      if (!quote) {
        return;
      }
      commentSelectionRef.current = selection.clone();
      setPendingCommentQuote(quote);
      setCommentDraft("");
      setCommentComposerOpen(true);
    });
  }
  function closeCommentComposer() {
    commentSelectionRef.current = null;
    setPendingCommentQuote("");
    setCommentDraft("");
    setCommentComposerOpen(false);
  }
  function submitComment() {
    const body = commentDraft.trim();
    if (!body || !internalEditorRef.current || !commentSelectionRef.current) {
      return;
    }
    const commentId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `comment-${Date.now()}`;
    wrapSelectionInComment(
      internalEditorRef.current,
      commentId,
      commentSelectionRef.current
    );
    publishComments([
      {
        id: commentId,
        quote: pendingCommentQuote,
        body,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        status: "open"
      },
      ...comments
    ]);
    closeCommentComposer();
  }
  function resolveComment(commentId) {
    publishComments(
      comments.map(
        (comment) => comment.id === commentId ? { ...comment, status: "resolved" } : comment
      )
    );
  }
  function removeComment(commentId) {
    if (internalEditorRef.current) {
      removeCommentMark(internalEditorRef.current, commentId);
    }
    publishComments(
      comments.filter((comment) => comment.id !== commentId)
    );
  }
  const utilityBarVisible = !toolbarEnabled && (insertMenuEnabled && activeMode === "rich-text" || modeSwitcherEnabled);
  return /* @__PURE__ */ jsx(
    EditorComposer,
    {
      namespace,
      initialValue,
      initialValueFormat,
      activeMode,
      onChange: handleComposerChange,
      onError,
      autoFocus,
      features,
      linkMatchers,
      markdownTransformers,
      editorRef: (editor) => {
        internalEditorRef.current = editor;
        applyMergedEditorRef(editorRef, editor);
      },
      preset,
      readOnly,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn("vds-editor", className),
          style,
          "data-read-only": readOnly || void 0,
          "data-mode": activeMode,
          "data-block-tools-placement": resolvedFeatures.draggableBlocks && activeMode === "rich-text" ? blockToolsPlacement : void 0,
          children: [
            utilityBarVisible ? /* @__PURE__ */ jsxs("div", { className: "vds-editor-utility-bar", children: [
              /* @__PURE__ */ jsx("div", { className: "vds-editor-utility-start", children: insertMenuEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsx(EditorInsertMenu, { ...insertMenuProps }) : null }),
              /* @__PURE__ */ jsx("div", { className: "vds-editor-utility-end", children: modeSwitcherEnabled ? /* @__PURE__ */ jsx(
                EditorModeSwitcher,
                {
                  ...modeSwitcherProps,
                  value: activeMode,
                  onChange: handleModeChange
                }
              ) : null })
            ] }) : null,
            toolbarEnabled ? /* @__PURE__ */ jsx(
              EditorToolbar,
              {
                ...toolbarProps,
                insertMenu: insertMenuEnabled && activeMode === "rich-text" ? insertMenuProps : null,
                modeSwitcher: modeSwitcherEnabled ? modeSwitcherProps : null,
                mode: activeMode,
                onModeChange: handleModeChange,
                onRequestComment: requestComment
              }
            ) : null,
            activeMode === "rich-text" ? /* @__PURE__ */ jsx(
              EditorSurface,
              {
                ref: setSurfaceElement,
                id,
                role,
                tabIndex,
                autoCapitalize,
                autoComplete,
                "aria-activedescendant": ariaActivedescendant,
                "aria-autocomplete": ariaAutocomplete,
                "aria-controls": ariaControls,
                "aria-describedby": ariaDescribedBy,
                "aria-expanded": ariaExpanded,
                "aria-invalid": ariaInvalid,
                "aria-label": ariaLabel,
                "aria-labelledby": ariaLabelledBy,
                "aria-owns": ariaOwns,
                "data-testid": dataTestId,
                dir,
                lang,
                spellCheck,
                placeholder,
                placeholderText,
                className: surfaceClassName,
                style: surfaceStyle,
                contentClassName,
                contentStyle,
                placeholderClassName,
                minHeight,
                maxHeight
              }
            ) : /* @__PURE__ */ jsx(
              EditorSourcePanel,
              {
                mode: activeMode,
                onChange: handleSourceValueChange,
                minHeight,
                maxHeight,
                value: sourceValue
              }
            ),
            resolvedFeatures.comments && activeMode === "rich-text" ? /* @__PURE__ */ jsx(
              EditorCommentsPanel,
              {
                composerOpen: commentComposerOpen,
                draft: commentDraft,
                pendingQuote: pendingCommentQuote,
                threads: comments,
                onDraftChange: setCommentDraft,
                onSubmit: submitComment,
                onCancel: closeCommentComposer,
                onResolve: resolveComment,
                onRemove: removeComment
              }
            ) : null,
            statusBarEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsx(EditorStatusBar, { ...statusBarProps }) : null,
            slashMenuEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsx(EditorSlashMenu, { ...slashMenuProps }) : null,
            floatingToolbarEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsx(
              EditorFloatingToolbar,
              {
                ...floatingToolbarProps,
                anchorElement: surfaceElement,
                onRequestComment: requestComment
              }
            ) : null,
            resolvedFeatures.tables && activeMode === "rich-text" ? /* @__PURE__ */ jsx(EditorTableHoverActions, { anchorElement: surfaceElement }) : null,
            resolvedFeatures.draggableBlocks && activeMode === "rich-text" ? /* @__PURE__ */ jsx(
              EditorDraggableBlocks,
              {
                anchorElement: surfaceElement,
                className: blockTools?.className,
                placement: blockToolsPlacement
              }
            ) : null
          ]
        }
      )
    }
  );
}
function isInvalid(value) {
  return value !== void 0 && value !== false && value !== "false";
}
function EditorField({
  label,
  description,
  error,
  counter,
  metaLayout,
  descriptionAlign,
  errorAlign,
  counterAlign,
  labelProps,
  className,
  style,
  editorClassName,
  editorStyle,
  invalid,
  id,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}) {
  const generatedId = useId();
  const controlId = id ?? `vds-editor-field-${generatedId}`;
  const labelId = label ? `${controlId}-label` : void 0;
  const descriptionId = description ? `${controlId}-description` : void 0;
  const errorId = error ? `${controlId}-error` : void 0;
  const counterId = counter !== void 0 ? `${controlId}-counter` : void 0;
  const describedBy = composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);
  return /* @__PURE__ */ jsx(
    Field,
    {
      className: cn("vds-editor-field", className),
      style,
      label,
      labelProps: {
        ...labelProps,
        id: labelId
      },
      description,
      error,
      counter,
      invalid: resolvedInvalid,
      disabled: readOnly,
      descriptionId,
      errorId,
      counterId,
      metaLayout,
      descriptionAlign,
      errorAlign,
      counterAlign,
      children: /* @__PURE__ */ jsx(
        Editor,
        {
          ...props,
          id: controlId,
          readOnly,
          className: editorClassName,
          style: editorStyle,
          "aria-labelledby": labelId,
          "aria-describedby": describedBy,
          "aria-invalid": resolvedInvalid || void 0
        }
      )
    }
  );
}

// src/index.ts
var EditorParts = {
  Composer: EditorComposer,
  DraggableBlocks: EditorDraggableBlocks,
  Surface: EditorSurface,
  CommentsPanel: EditorCommentsPanel,
  FloatingToolbar: EditorFloatingToolbar,
  InsertMenu: EditorInsertMenu,
  ModeSwitcher: EditorModeSwitcher,
  Toolbar: EditorToolbar,
  StatusBar: EditorStatusBar,
  SlashMenu: EditorSlashMenu,
  Field: EditorField
};

export { Editor, EditorCommentsPanel, EditorDraggableBlocks, EditorField, EditorFloatingToolbar, EditorInsertMenu, EditorModeSwitcher, EditorParts, EditorSlashMenu, EditorStatusBar, EditorToolbar };
