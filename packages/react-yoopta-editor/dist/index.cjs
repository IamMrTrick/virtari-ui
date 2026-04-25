"use client";
'use strict';

var react = require('react');
var BaseYooptaEditor = require('@yoopta/editor');
var selectionBox = require('@yoopta/ui/selection-box');
var blockDnd = require('@yoopta/ui/block-dnd');
var Mention = require('@yoopta/mention');
var Emoji = require('@yoopta/emoji');
var utils = require('@virtari-packages/utils');
var headings = require('@yoopta/headings');
var Code = require('@yoopta/code');
var Table = require('@yoopta/table');
var Accordion2 = require('@yoopta/accordion');
var Divider = require('@yoopta/divider');
var Paragraph = require('@yoopta/paragraph');
var Blockquote = require('@yoopta/blockquote');
var Callout = require('@yoopta/callout');
var Link = require('@yoopta/link');
var lists = require('@yoopta/lists');
var Embed = require('@yoopta/embed');
var Image = require('@yoopta/image');
var Video = require('@yoopta/video');
var File = require('@yoopta/file');
var Tabs2 = require('@yoopta/tabs');
var Steps = require('@yoopta/steps');
var Carousel = require('@yoopta/carousel');
var math = require('@yoopta/math');
var TableOfContents = require('@yoopta/table-of-contents');
var reactIcons = require('@virtari-packages/react-icons');
var reactTabs = require('@virtari-packages/react-tabs');
var reactInput = require('@virtari-packages/react-input');
var reactButton = require('@virtari-packages/react-button');
var reactFileUpload = require('@virtari-packages/react-file-upload');
var jsxRuntime = require('react/jsx-runtime');
var reactAccordion = require('@virtari-packages/react-accordion');
var marks = require('@yoopta/marks');
var slate = require('slate');
var floatingToolbar = require('@yoopta/ui/floating-toolbar');
var highlightColorPicker = require('@yoopta/ui/highlight-color-picker');
var actionMenuList = require('@yoopta/ui/action-menu-list');
var slashCommandMenu = require('@yoopta/ui/slash-command-menu');
var floatingBlockActions = require('@yoopta/ui/floating-block-actions');
var blockOptions = require('@yoopta/ui/block-options');
require('katex/dist/katex.min.css');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var BaseYooptaEditor__default = /*#__PURE__*/_interopDefault(BaseYooptaEditor);
var Mention__default = /*#__PURE__*/_interopDefault(Mention);
var Emoji__default = /*#__PURE__*/_interopDefault(Emoji);
var Code__default = /*#__PURE__*/_interopDefault(Code);
var Table__default = /*#__PURE__*/_interopDefault(Table);
var Accordion2__default = /*#__PURE__*/_interopDefault(Accordion2);
var Divider__default = /*#__PURE__*/_interopDefault(Divider);
var Paragraph__default = /*#__PURE__*/_interopDefault(Paragraph);
var Blockquote__default = /*#__PURE__*/_interopDefault(Blockquote);
var Callout__default = /*#__PURE__*/_interopDefault(Callout);
var Link__default = /*#__PURE__*/_interopDefault(Link);
var Embed__default = /*#__PURE__*/_interopDefault(Embed);
var Image__default = /*#__PURE__*/_interopDefault(Image);
var Video__default = /*#__PURE__*/_interopDefault(Video);
var File__default = /*#__PURE__*/_interopDefault(File);
var Tabs2__default = /*#__PURE__*/_interopDefault(Tabs2);
var Steps__default = /*#__PURE__*/_interopDefault(Steps);
var Carousel__default = /*#__PURE__*/_interopDefault(Carousel);
var TableOfContents__default = /*#__PURE__*/_interopDefault(TableOfContents);

// src/YooptaEditor.tsx
function MediaPicker({
  accept,
  uploadIcon,
  uploadHint,
  embedIcon,
  embedHint,
  embedPlaceholder,
  hideEmbed,
  uploading,
  uploadProgress,
  uploadError,
  onFiles,
  onEmbed,
  embedError
}) {
  const [tab, setTab] = react.useState("upload");
  const [url, setUrl] = react.useState("");
  const [submitting, setSubmitting] = react.useState(false);
  const handleEmbed = async () => {
    if (!url.trim()) return;
    setSubmitting(true);
    try {
      await onEmbed(url.trim());
      setUrl("");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    reactTabs.Tabs,
    {
      value: tab,
      onValueChange: (v) => setTab(v),
      className: "vds-yoopta-editor__picker",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsList, { variant: "segmented", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactTabs.TabsTrigger, { value: "upload", children: "Upload" }),
          !hideEmbed && /* @__PURE__ */ jsxRuntime.jsx(reactTabs.TabsTrigger, { value: "embed", children: "Embed by URL" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(reactTabs.TabsContent, { value: "upload", children: /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Root, { accept, maxFiles: 1, onFilesChange: onFiles, children: /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Dropzone, { children: ({ isDragActive }) => /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "vds-yoopta-editor__upload-content",
            "data-active": isDragActive || void 0,
            children: uploading ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                reactIcons.IconLoader2,
                {
                  size: 20,
                  className: "vds-yoopta-editor__upload-spinner"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                "Uploading\u2026",
                " ",
                uploadProgress != null ? `${Math.round(uploadProgress)}%` : ""
              ] })
            ] }) : uploadError ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconAlertCircle, { size: 20 }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: uploadError })
            ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              uploadIcon,
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: isDragActive ? "Drop here\u2026" : uploadHint })
            ] })
          }
        ) }) }) }),
        !hideEmbed && /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsContent, { value: "embed", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-yoopta-editor__embed-row", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              reactInput.Input,
              {
                inputSize: "sm",
                placeholder: embedPlaceholder,
                value: url,
                onChange: (e) => setUrl(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    void handleEmbed();
                  }
                }
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              reactButton.Button,
              {
                size: "sm",
                variant: "solid",
                onClick: handleEmbed,
                disabled: !url.trim() || submitting,
                leftSection: embedIcon,
                children: "Embed"
              }
            )
          ] }),
          embedError && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-yoopta-editor__embed-error", children: [
            /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconAlertCircle, { size: 14 }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: embedError })
          ] }),
          !embedError && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "vds-yoopta-editor__embed-hint", children: embedHint })
        ] })
      ]
    }
  );
}

// src/uploads.ts
async function getImageDimensions(file) {
  return new Promise((resolve) => {
    const img = new globalThis.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
var imageUpload = async (file) => {
  const sizes = await getImageDimensions(file);
  return {
    id: file.name,
    src: URL.createObjectURL(file),
    alt: file.name,
    fit: "cover",
    sizes
  };
};
var videoUpload = async (file) => ({
  id: file.name,
  src: URL.createObjectURL(file),
  sizes: { width: 800, height: 480 }
});
var fileUpload = async (file) => ({
  id: file.name,
  src: URL.createObjectURL(file),
  name: file.name,
  size: file.size,
  format: file.name.split(".").pop() ?? ""
});
function isLikelyImageUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
function ImageElement(renderProps) {
  const { element, blockId, attributes, children } = renderProps;
  const editor = BaseYooptaEditor.useYooptaEditor();
  const upload = Image.useImageUpload(imageUpload);
  const [uploadError, setUploadError] = react.useState(null);
  const [embedError, setEmbedError] = react.useState(null);
  const props = element.props ?? {};
  const hasSrc = typeof props.src === "string" && props.src.length > 0;
  const onFiles = react.useCallback(
    async (files) => {
      const file = files[0];
      if (!file) return;
      setUploadError(null);
      try {
        const result = await upload.upload(file);
        editor.updateElement({
          blockId,
          type: "image",
          props: {
            src: result.src,
            alt: result.alt ?? file.name,
            sizes: result.sizes ?? { width: 800, height: 600 },
            fit: result.fit ?? "cover",
            srcSet: result.srcSet ?? null,
            bgColor: result.bgColor ?? null
          }
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, editor, blockId]
  );
  const onEmbed = react.useCallback(
    (raw) => {
      setEmbedError(null);
      if (!isLikelyImageUrl(raw)) {
        setEmbedError("Enter a valid http(s) URL.");
        return;
      }
      editor.updateElement({
        blockId,
        type: "image",
        props: {
          src: raw,
          alt: raw.split("/").pop() ?? "image",
          sizes: { width: 1280, height: 720 },
          fit: "cover",
          srcSet: null,
          bgColor: null
        }
      });
    },
    [editor, blockId]
  );
  if (!hasSrc) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, contentEditable: false, className: "vds-yoopta-editor__upload", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        MediaPicker,
        {
          accept: { "image/*": [] },
          uploadIcon: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconPhoto, { size: 20 }),
          uploadHint: "Click or drop an image",
          embedIcon: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconLink, { size: 14 }),
          embedHint: "Paste any image URL (PNG, JPG, GIF, WebP, SVG\u2026).",
          embedPlaceholder: "https://example.com/photo.jpg",
          uploading: upload.loading,
          uploadProgress: upload.progress?.percentage ?? null,
          uploadError,
          embedError,
          onFiles,
          onEmbed
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
    ] });
  }
  const sizes = props.sizes ?? {};
  const style = {
    objectFit: props.fit ?? "cover",
    backgroundColor: props.bgColor ?? void 0,
    maxInlineSize: "100%",
    blockSize: "auto"
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, className: "vds-yoopta-editor__media", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: props.src ?? "",
        alt: props.alt ?? "",
        width: typeof sizes.width === "number" ? sizes.width : void 0,
        height: typeof sizes.height === "number" ? sizes.height : void 0,
        style,
        draggable: false
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
  ] });
}
var DEFAULT_SETTINGS = {
  controls: true,
  loop: false,
  muted: false,
  autoPlay: false
};
function VideoElement(renderProps) {
  const { element, blockId, attributes, children } = renderProps;
  const editor = BaseYooptaEditor.useYooptaEditor();
  const upload = Video.useVideoUpload(videoUpload);
  const [uploadError, setUploadError] = react.useState(null);
  const [embedError, setEmbedError] = react.useState(null);
  const props = element.props ?? {};
  const provider = props.provider;
  const isEmbed = !!provider && !!provider.type && typeof props.src === "string" && props.src.length > 0;
  const hasFileSrc = !provider && typeof props.src === "string" && props.src.length > 0;
  const onFiles = react.useCallback(
    async (files) => {
      const file = files[0];
      if (!file) return;
      setUploadError(null);
      try {
        const result = await upload.upload(file);
        editor.updateElement({
          blockId,
          type: "video",
          props: {
            src: result.src,
            srcSet: null,
            bgColor: null,
            sizes: result.sizes ?? { width: 800, height: 480 },
            fit: "cover",
            poster: result.poster ?? null,
            provider: null,
            settings: { ...DEFAULT_SETTINGS }
          }
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, editor, blockId]
  );
  const onEmbed = react.useCallback(
    (raw) => {
      setEmbedError(null);
      const parsed = Video.parseVideoUrl(raw);
      if (!parsed.isValid) {
        setEmbedError(
          "Couldn't recognise that URL. Supported: YouTube, Vimeo, Dailymotion, Loom, Wistia."
        );
        return;
      }
      editor.updateElement({
        blockId,
        type: "video",
        props: {
          src: parsed.embedUrl,
          srcSet: null,
          bgColor: null,
          sizes: { width: 800, height: 450 },
          fit: "cover",
          poster: parsed.thumbnailUrl ?? null,
          provider: {
            type: parsed.provider,
            id: parsed.id,
            url: parsed.originalUrl
          },
          settings: { ...DEFAULT_SETTINGS }
        }
      });
    },
    [editor, blockId]
  );
  if (!hasFileSrc && !isEmbed) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, contentEditable: false, className: "vds-yoopta-editor__upload", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        MediaPicker,
        {
          accept: { "video/*": [] },
          uploadIcon: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconVideo, { size: 20 }),
          uploadHint: "Click or drop a video",
          embedIcon: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconLink, { size: 14 }),
          embedHint: "Paste a YouTube, Vimeo, Dailymotion, Loom, or Wistia link.",
          embedPlaceholder: "https://youtube.com/watch?v=\u2026",
          uploading: upload.loading,
          uploadProgress: upload.progress?.percentage ?? null,
          uploadError,
          embedError,
          onFiles,
          onEmbed
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
    ] });
  }
  const sizes = props.sizes ?? {};
  const settings = { ...DEFAULT_SETTINGS, ...props.settings ?? {} };
  if (isEmbed) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, className: "vds-yoopta-editor__media", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "iframe",
        {
          src: props.src ?? "",
          width: typeof sizes.width === "number" ? sizes.width : "100%",
          height: typeof sizes.height === "number" ? sizes.height : 450,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowFullScreen: true,
          referrerPolicy: "strict-origin-when-cross-origin",
          title: `${provider?.type ?? "video"} embed`
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
    ] });
  }
  const style = {
    objectFit: props.fit ?? "cover",
    maxInlineSize: "100%",
    blockSize: "auto"
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, className: "vds-yoopta-editor__media", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "video",
      {
        src: props.src ?? "",
        poster: props.poster ?? void 0,
        width: typeof sizes.width === "number" ? sizes.width : void 0,
        height: typeof sizes.height === "number" ? sizes.height : void 0,
        controls: settings.controls,
        loop: settings.loop,
        muted: settings.muted,
        autoPlay: settings.autoPlay,
        playsInline: true,
        style
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
  ] });
}
function FileElement(renderProps) {
  const { element, blockId, attributes, children } = renderProps;
  const editor = BaseYooptaEditor.useYooptaEditor();
  const upload = File.useFileUpload(fileUpload);
  const [uploadError, setUploadError] = react.useState(null);
  const props = element.props ?? {};
  const hasSrc = typeof props.src === "string" && props.src.length > 0;
  const onFilesChange = react.useCallback(
    async (files) => {
      const file = files[0];
      if (!file) return;
      setUploadError(null);
      try {
        const result = await upload.upload(file);
        editor.updateElement({
          blockId,
          type: "file",
          props: {
            src: result.src,
            name: result.name ?? file.name,
            size: result.size ?? file.size,
            format: result.format ?? file.name.split(".").pop() ?? ""
          }
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, editor, blockId]
  );
  if (!hasSrc) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, contentEditable: false, className: "vds-yoopta-editor__upload", children: [
      /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Root, { maxFiles: 1, onFilesChange, children: /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Dropzone, { children: ({ isDragActive }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-yoopta-editor__upload-content", "data-active": isDragActive || void 0, children: upload.loading ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconLoader2, { size: 20, className: "vds-yoopta-editor__upload-spinner" }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "Uploading\u2026 ",
          upload.progress?.percentage ? `${Math.round(upload.progress.percentage)}%` : ""
        ] })
      ] }) : uploadError ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconAlertCircle, { size: 20 }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: uploadError })
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconPaperclip, { size: 20 }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: isDragActive ? "Drop file here\u2026" : "Click or drop a file" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...attributes, className: "vds-yoopta-editor__file-card", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "a",
      {
        href: props.src ?? "#",
        target: "_blank",
        rel: "noopener noreferrer",
        download: props.name ?? void 0,
        contentEditable: false,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconPaperclip, { size: 18 }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-yoopta-editor__file-card-info", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-yoopta-editor__file-card-name", children: props.name ?? "File" }),
            typeof props.size === "number" && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-yoopta-editor__file-card-size", children: File.formatFileSize(props.size) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconDownload, { size: 16 })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("span", { style: { display: "none" }, children })
  ] });
}
function AccordionListElement(renderProps) {
  const { attributes, children, element } = renderProps;
  const rawChildren = element.children;
  const items = Array.isArray(
    rawChildren
  ) ? rawChildren : [];
  const defaultOpen = items.filter((c) => c?.props?.isExpanded).map((c) => c.id);
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactAccordion.Accordion,
    {
      type: "multiple",
      defaultValue: defaultOpen,
      variant: "bordered",
      size: "md",
      color: "neutral",
      iconType: "chevron",
      iconPosition: "end",
      ...attributes,
      className: "vds-yoopta-editor__accordion",
      children
    }
  );
}
function AccordionItemElement(renderProps) {
  const { attributes, children, element } = renderProps;
  return /* @__PURE__ */ jsxRuntime.jsx(reactAccordion.AccordionItem, { value: element.id, ...attributes, children });
}
function AccordionHeadingElement(renderProps) {
  const { attributes, children } = renderProps;
  return /* @__PURE__ */ jsxRuntime.jsx(reactAccordion.AccordionTrigger, { ...attributes, children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-yoopta-editor__accordion-heading", children }) });
}
function AccordionContentElement(renderProps) {
  const { attributes, children } = renderProps;
  return /* @__PURE__ */ jsxRuntime.jsx(reactAccordion.AccordionContent, { ...attributes, children });
}

// src/plugins.ts
var YImage = Image__default.default.extend({
  options: { upload: imageUpload },
  elements: {
    image: { render: ImageElement }
  }
});
var YOOPTA_PLUGINS = [
  TableOfContents__default.default,
  File__default.default.extend({
    options: { upload: fileUpload },
    elements: {
      file: { render: FileElement }
    }
  }),
  Code__default.default.Code,
  Code__default.default.CodeGroup,
  Table__default.default,
  Accordion2__default.default.extend({
    elements: {
      "accordion-list": { render: AccordionListElement },
      "accordion-list-item": { render: AccordionItemElement },
      "accordion-list-item-heading": { render: AccordionHeadingElement },
      "accordion-list-item-content": { render: AccordionContentElement }
    }
  }),
  Divider__default.default,
  Paragraph__default.default,
  headings.HeadingOne.extend({
    elements: { "heading-one": { placeholder: "Heading 1" } }
  }),
  headings.HeadingTwo,
  headings.HeadingThree,
  Blockquote__default.default,
  Callout__default.default,
  Link__default.default,
  lists.NumberedList,
  lists.BulletedList,
  lists.TodoList,
  Embed__default.default,
  Emoji__default.default,
  YImage,
  Video__default.default.extend({
    options: { upload: videoUpload },
    elements: {
      video: { render: VideoElement }
    }
  }),
  Steps__default.default.extend({
    elements: {
      "step-list-item-heading": { placeholder: "Step title" },
      "step-list-item-content": { placeholder: "Describe this step..." }
    }
  }),
  Carousel__default.default.extend({
    injectElementsFromPlugins: [YImage]
  }),
  Tabs2__default.default,
  Mention__default.default.extend({
    options: {
      onSearch: async (query, trigger) => {
        try {
          if (trigger.type === "page") {
            const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`);
            const data2 = await res2.json();
            return data2.slice(0, 8).map((post) => ({
              id: String(post.id),
              name: post.title,
              avatar: post.body
            }));
          }
          const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`);
          const data = await res.json();
          return data.slice(0, 8).map((user) => ({
            id: String(user.id),
            name: user.name,
            avatar: ""
          }));
        } catch {
          return [];
        }
      },
      triggers: [
        { char: "@", type: "user" },
        { char: "#", type: "page" }
      ]
    }
  }),
  math.MathInline,
  math.MathBlock
];
var YOOPTA_MARKS = [
  marks.Bold,
  marks.Italic,
  marks.Underline,
  marks.Strike,
  marks.CodeMark,
  marks.Highlight
];
function ActionMenu({ open, onOpenChange, anchor, placement }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    actionMenuList.ActionMenuList,
    {
      open,
      anchor,
      onOpenChange,
      view: "small",
      placement,
      children: /* @__PURE__ */ jsxRuntime.jsx(actionMenuList.ActionMenuList.Content, {})
    }
  );
}
var HIGHLIGHT_PRESETS = [
  "var(--vds-color-warning-solid)",
  "var(--vds-color-info-solid)",
  "var(--vds-color-success-solid)",
  "var(--vds-color-danger-solid)",
  "var(--vds-color-accent-solid)",
  "var(--vds-color-primary-solid)",
  "var(--vds-color-neutral-9)",
  "var(--vds-color-neutral-12)"
];
function Toolbar() {
  const editor = BaseYooptaEditor.useYooptaEditor();
  const turnIntoRef = react.useRef(null);
  const [actionMenuOpen, setActionMenuOpen] = react.useState(false);
  const highlightValue = BaseYooptaEditor.Marks.getValue(editor, { type: "highlight" });
  const onInsertMath = () => {
    if (editor.path.current === null) return;
    const currentBlockId = Object.keys(editor.children).find(
      (id) => editor.children[id]?.meta.order === editor.path.current
    );
    if (!currentBlockId) return;
    const slate$1 = BaseYooptaEditor.Blocks.getBlockSlate(editor, { id: currentBlockId });
    if (!slate$1 || !slate$1.selection) return;
    const selectedText = !slate.Range.isCollapsed(slate$1.selection) ? slate.Editor.string(slate$1, slate$1.selection) : "";
    math.MathInlineCommands.insertMathInline(editor, selectedText || "E = mc^2", { slate: slate$1 });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(floatingToolbar.FloatingToolbar, { frozen: actionMenuOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(floatingToolbar.FloatingToolbar.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(floatingToolbar.FloatingToolbar.Group, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        floatingToolbar.FloatingToolbar.Button,
        {
          ref: turnIntoRef,
          onClick: () => setActionMenuOpen(true),
          children: [
            "Turn into",
            /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronDown, { size: 14 })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(floatingToolbar.FloatingToolbar.Separator, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(floatingToolbar.FloatingToolbar.Group, { children: [
        editor.formats.bold && /* @__PURE__ */ jsxRuntime.jsx(
          floatingToolbar.FloatingToolbar.Button,
          {
            onClick: () => BaseYooptaEditor.Marks.toggle(editor, { type: "bold" }),
            active: BaseYooptaEditor.Marks.isActive(editor, { type: "bold" }),
            title: "Bold",
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconBold, { size: 16 })
          }
        ),
        editor.formats.italic && /* @__PURE__ */ jsxRuntime.jsx(
          floatingToolbar.FloatingToolbar.Button,
          {
            onClick: () => BaseYooptaEditor.Marks.toggle(editor, { type: "italic" }),
            active: BaseYooptaEditor.Marks.isActive(editor, { type: "italic" }),
            title: "Italic",
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconItalic, { size: 16 })
          }
        ),
        editor.formats.underline && /* @__PURE__ */ jsxRuntime.jsx(
          floatingToolbar.FloatingToolbar.Button,
          {
            onClick: () => BaseYooptaEditor.Marks.toggle(editor, { type: "underline" }),
            active: BaseYooptaEditor.Marks.isActive(editor, { type: "underline" }),
            title: "Underline",
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconUnderline, { size: 16 })
          }
        ),
        editor.formats.strike && /* @__PURE__ */ jsxRuntime.jsx(
          floatingToolbar.FloatingToolbar.Button,
          {
            onClick: () => BaseYooptaEditor.Marks.toggle(editor, { type: "strike" }),
            active: BaseYooptaEditor.Marks.isActive(editor, { type: "strike" }),
            title: "Strikethrough",
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconStrikethrough, { size: 16 })
          }
        ),
        editor.formats.code && /* @__PURE__ */ jsxRuntime.jsx(
          floatingToolbar.FloatingToolbar.Button,
          {
            onClick: () => BaseYooptaEditor.Marks.toggle(editor, { type: "code" }),
            active: BaseYooptaEditor.Marks.isActive(editor, { type: "code" }),
            title: "Code",
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCode, { size: 16 })
          }
        ),
        editor.formats.highlight && /* @__PURE__ */ jsxRuntime.jsx(
          highlightColorPicker.HighlightColorPicker,
          {
            value: highlightValue ?? {},
            presets: HIGHLIGHT_PRESETS,
            onChange: (values) => {
              BaseYooptaEditor.Marks.add(editor, {
                type: "highlight",
                value: {
                  color: values.color,
                  backgroundColor: values.backgroundColor
                }
              });
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(
              floatingToolbar.FloatingToolbar.Button,
              {
                active: BaseYooptaEditor.Marks.isActive(editor, { type: "highlight" }),
                title: "Highlight",
                onContextMenu: (e) => {
                  e.preventDefault();
                  if (BaseYooptaEditor.Marks.isActive(editor, { type: "highlight" })) {
                    BaseYooptaEditor.Marks.remove(editor, { type: "highlight" });
                  }
                },
                style: {
                  backgroundColor: BaseYooptaEditor.Marks.isActive(editor, { type: "highlight" }) ? highlightValue?.backgroundColor : void 0,
                  color: BaseYooptaEditor.Marks.isActive(editor, { type: "highlight" }) ? highlightValue?.color : void 0
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconHighlight, { size: 16 })
              }
            )
          }
        )
      ] }),
      editor.plugins.MathInline && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(floatingToolbar.FloatingToolbar.Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsx(floatingToolbar.FloatingToolbar.Group, { children: /* @__PURE__ */ jsxRuntime.jsx(floatingToolbar.FloatingToolbar.Button, { onClick: onInsertMath, title: "Insert Math", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconMath, { size: 16 }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ActionMenu,
      {
        open: actionMenuOpen,
        onOpenChange: setActionMenuOpen,
        anchor: turnIntoRef.current,
        placement: "bottom-start"
      }
    )
  ] });
}
function SlashMenu() {
  return /* @__PURE__ */ jsxRuntime.jsx(slashCommandMenu.SlashCommandMenu, { children: (props) => /* @__PURE__ */ jsxRuntime.jsxs(slashCommandMenu.SlashCommandMenu.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(slashCommandMenu.SlashCommandMenu.List, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(slashCommandMenu.SlashCommandMenu.Empty, { children: "No blocks found" }),
      props.items.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
        slashCommandMenu.SlashCommandMenu.Item,
        {
          value: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon ?? null
        },
        item.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(slashCommandMenu.SlashCommandMenu.Footer, {})
  ] }) });
}
function BlockOptions({ open, onOpenChange, blockId, anchor }) {
  const { duplicateBlock, copyBlockLink, deleteBlock } = blockOptions.useBlockActions();
  const turnIntoRef = react.useRef(null);
  const [actionMenuOpen, setActionMenuOpen] = react.useState(false);
  const onActionMenuClose = (menuOpen) => {
    setActionMenuOpen(menuOpen);
    if (!menuOpen) onOpenChange?.(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(blockOptions.BlockOptions, { open, onOpenChange, anchor, children: /* @__PURE__ */ jsxRuntime.jsxs(blockOptions.BlockOptions.Content, { side: "right", align: "end", children: [
      /* @__PURE__ */ jsxRuntime.jsx(blockOptions.BlockOptions.Group, { children: /* @__PURE__ */ jsxRuntime.jsx(
        blockOptions.BlockOptions.Item,
        {
          ref: turnIntoRef,
          onSelect: () => setActionMenuOpen(true),
          keepOpen: true,
          children: "Turn into"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(blockOptions.BlockOptions.Separator, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(blockOptions.BlockOptions.Group, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          blockOptions.BlockOptions.Item,
          {
            onSelect: () => {
              if (!blockId) return;
              duplicateBlock(blockId);
              onOpenChange?.(false);
            },
            children: "Duplicate"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          blockOptions.BlockOptions.Item,
          {
            onSelect: () => {
              if (!blockId) return;
              copyBlockLink(blockId);
              onOpenChange?.(false);
            },
            children: "Copy link to block"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          blockOptions.BlockOptions.Item,
          {
            variant: "destructive",
            onSelect: () => {
              if (!blockId) return;
              deleteBlock(blockId);
              onOpenChange?.(false);
            },
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ActionMenu,
      {
        placement: "right-start",
        open: actionMenuOpen,
        onOpenChange: onActionMenuClose,
        anchor: turnIntoRef.current
      }
    )
  ] });
}
function BlockActions() {
  const editor = BaseYooptaEditor.useYooptaEditor();
  const dragHandleRef = react.useRef(null);
  const plusButtonRef = react.useRef(null);
  const [blockOptionsOpen, setBlockOptionsOpen] = react.useState(false);
  const [insertMenuOpen, setInsertMenuOpen] = react.useState(false);
  const [insertContext, setInsertContext] = react.useState(null);
  const onPlusClick = (blockId) => {
    if (!blockId) return;
    const block = BaseYooptaEditor.Blocks.getBlock(editor, { id: blockId });
    if (!block) return;
    setInsertContext({ at: block.meta.order + 1 });
    setInsertMenuOpen(true);
  };
  const onDragClick = (blockId) => {
    if (!blockId) return;
    const block = BaseYooptaEditor.Blocks.getBlock(editor, { id: blockId });
    if (!block) return;
    editor.setPath({ current: block.meta.order });
    setBlockOptionsOpen(true);
  };
  const onInsertMenuOpenChange = (open) => {
    setInsertMenuOpen(open);
    if (!open) setInsertContext(null);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(floatingBlockActions.FloatingBlockActions, { frozen: blockOptionsOpen || insertMenuOpen, children: ({ blockId }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        floatingBlockActions.FloatingBlockActions.Button,
        {
          ref: plusButtonRef,
          onClick: () => onPlusClick(blockId),
          title: "Add block below",
          children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconPlus, { size: 14 })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(blockDnd.DragHandle, { blockId, ref: dragHandleRef, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
        floatingBlockActions.FloatingBlockActions.Button,
        {
          onClick: () => onDragClick(blockId),
          title: "Drag to reorder",
          children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconGripVertical, { size: 14 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        BlockOptions,
        {
          open: blockOptionsOpen,
          onOpenChange: setBlockOptionsOpen,
          blockId,
          anchor: dragHandleRef.current
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      actionMenuList.ActionMenuList,
      {
        open: insertMenuOpen,
        onOpenChange: onInsertMenuOpenChange,
        anchor: plusButtonRef.current,
        view: "default",
        placement: "right-start",
        children: ({ actions, onSelect: defaultOnSelect, empty }) => /* @__PURE__ */ jsxRuntime.jsx(actionMenuList.ActionMenuList.Content, { children: empty ? /* @__PURE__ */ jsxRuntime.jsx(actionMenuList.ActionMenuList.Empty, { children: "No blocks available" }) : /* @__PURE__ */ jsxRuntime.jsx(actionMenuList.ActionMenuList.Group, { children: actions.map((action) => /* @__PURE__ */ jsxRuntime.jsx(
          actionMenuList.ActionMenuList.Item,
          {
            action,
            onClick: () => {
              if (insertContext) {
                editor.insertBlock(action.type, {
                  at: insertContext.at,
                  focus: true
                });
              } else {
                defaultOnSelect(action.type);
              }
              onInsertMenuOpenChange(false);
            }
          },
          action.type
        )) }) })
      }
    )
  ] });
}
function buildStarterValue() {
  const id = BaseYooptaEditor.generateId();
  return {
    [id]: BaseYooptaEditor.buildBlockData({
      id,
      type: "Paragraph",
      meta: { order: 0, depth: 0 },
      value: [
        BaseYooptaEditor.buildBlockElement({
          type: "paragraph",
          children: [{ text: "" }]
        })
      ]
    })
  };
}
function isEmptyValue(value) {
  return !value || Object.keys(value).length === 0;
}
function YooptaEditor({
  value,
  onChange,
  onPathChange,
  placeholder = "Type / to open menu, or start typing...",
  autoFocus,
  readOnly,
  className,
  style
}) {
  const containerRef = react.useRef(null);
  const initialValueRef = react.useRef(value);
  const editor = react.useMemo(
    () => Emoji.withEmoji(
      Mention.withMentions(
        BaseYooptaEditor.createYooptaEditor({
          plugins: YOOPTA_PLUGINS,
          marks: YOOPTA_MARKS,
          readOnly
        })
      )
    ),
    [readOnly]
  );
  react.useEffect(() => {
    const initial = isEmptyValue(initialValueRef.current) ? buildStarterValue() : initialValueRef.current;
    editor.withoutSavingHistory(() => {
      editor.setEditorValue(initial);
    });
  }, [editor]);
  const renderBlock = react.useCallback(
    ({ children, blockId }) => /* @__PURE__ */ jsxRuntime.jsx(blockDnd.SortableBlock, { id: blockId, useDragHandle: true, children }),
    []
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: containerRef,
      className: utils.cn("vds-yoopta-editor", className),
      style,
      children: /* @__PURE__ */ jsxRuntime.jsx(blockDnd.BlockDndContext, { editor, children: /* @__PURE__ */ jsxRuntime.jsxs(
        BaseYooptaEditor__default.default,
        {
          editor,
          placeholder,
          autoFocus,
          onChange,
          onPathChange,
          renderBlock,
          style: { width: "100%", paddingBottom: 100 },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(Toolbar, {}),
            /* @__PURE__ */ jsxRuntime.jsx(SlashMenu, {}),
            /* @__PURE__ */ jsxRuntime.jsx(BlockActions, {}),
            /* @__PURE__ */ jsxRuntime.jsx(selectionBox.SelectionBox, { selectionBoxElement: containerRef })
          ]
        }
      ) })
    }
  );
}

// src/starter-content.ts
var playgroundInitialValue = {
  "pg-h1": {
    id: "pg-h1",
    type: "HeadingOne",
    value: [
      {
        id: "pg-h1-el",
        type: "heading-one",
        children: [{ text: "Welcome to the Virtari Block Editor" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 0, depth: 0 }
  },
  "pg-p-intro": {
    id: "pg-p-intro",
    type: "Paragraph",
    value: [
      {
        id: "pg-p-intro-el",
        type: "paragraph",
        children: [
          { text: "A " },
          { text: "headless", bold: true },
          { text: ", " },
          { text: "plugin-based", italic: true },
          { text: " block editor for React powered by " },
          { text: "Yoopta", code: true },
          { text: ", wrapped with Virtari design tokens. Type " },
          { text: "/", code: true },
          {
            text: " to open the slash menu, select text to reveal the floating toolbar, hover any block to drag it around."
          }
        ],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 1, depth: 0 }
  },
  "pg-h2-marks": {
    id: "pg-h2-marks",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-marks-el",
        type: "heading-two",
        children: [{ text: "Text marks" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 2, depth: 0 }
  },
  "pg-p-marks": {
    id: "pg-p-marks",
    type: "Paragraph",
    value: [
      {
        id: "pg-p-marks-el",
        type: "paragraph",
        children: [
          { text: "All six marks: " },
          { text: "bold", bold: true },
          { text: ", " },
          { text: "italic", italic: true },
          { text: ", " },
          { text: "underline", underline: true },
          { text: ", " },
          { text: "strikethrough", strike: true },
          { text: ", " },
          { text: "inline code", code: true },
          { text: ", and " },
          {
            text: "highlight",
            highlight: { color: "#000000", backgroundColor: "#FFE066" }
          },
          { text: "." }
        ],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 3, depth: 0 }
  },
  "pg-h2-blocks": {
    id: "pg-h2-blocks",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-blocks-el",
        type: "heading-two",
        children: [{ text: "Block types" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 4, depth: 0 }
  },
  "pg-h3-quote": {
    id: "pg-h3-quote",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-quote-el",
        type: "heading-three",
        children: [{ text: "Blockquote" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 5, depth: 0 }
  },
  "pg-quote": {
    id: "pg-quote",
    type: "Blockquote",
    value: [
      {
        id: "pg-quote-el",
        type: "blockquote",
        children: [
          { text: "Design is not just what it looks like and feels like. Design is how it works." }
        ],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 6, depth: 0 }
  },
  "pg-h3-callout": {
    id: "pg-h3-callout",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-callout-el",
        type: "heading-three",
        children: [{ text: "Callout" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 7, depth: 0 }
  },
  "pg-callout": {
    id: "pg-callout",
    type: "Callout",
    value: [
      {
        id: "pg-callout-el",
        type: "callout",
        children: [
          {
            text: "All callout tones (default, info, success, warning, danger) inherit Virtari's semantic color tokens."
          }
        ],
        props: { nodeType: "block", theme: "info" }
      }
    ],
    meta: { order: 8, depth: 0 }
  },
  "pg-h3-lists": {
    id: "pg-h3-lists",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-lists-el",
        type: "heading-three",
        children: [{ text: "Lists" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 9, depth: 0 }
  },
  "pg-bul-1": {
    id: "pg-bul-1",
    type: "BulletedList",
    value: [
      {
        id: "pg-bul-1-el",
        type: "bulleted-list",
        children: [{ text: "Bulleted list item one" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 10, depth: 0 }
  },
  "pg-bul-2": {
    id: "pg-bul-2",
    type: "BulletedList",
    value: [
      {
        id: "pg-bul-2-el",
        type: "bulleted-list",
        children: [{ text: "Bulleted list item two" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 11, depth: 0 }
  },
  "pg-num-1": {
    id: "pg-num-1",
    type: "NumberedList",
    value: [
      {
        id: "pg-num-1-el",
        type: "numbered-list",
        children: [{ text: "Numbered list item one" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 12, depth: 0 }
  },
  "pg-num-2": {
    id: "pg-num-2",
    type: "NumberedList",
    value: [
      {
        id: "pg-num-2-el",
        type: "numbered-list",
        children: [{ text: "Numbered list item two" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 13, depth: 0 }
  },
  "pg-todo-1": {
    id: "pg-todo-1",
    type: "TodoList",
    value: [
      {
        id: "pg-todo-1-el",
        type: "todo-list",
        children: [{ text: "Try the slash menu" }],
        props: { nodeType: "block", checked: true }
      }
    ],
    meta: { order: 14, depth: 0 }
  },
  "pg-todo-2": {
    id: "pg-todo-2",
    type: "TodoList",
    value: [
      {
        id: "pg-todo-2-el",
        type: "todo-list",
        children: [{ text: "Drag a block to reorder it" }],
        props: { nodeType: "block", checked: false }
      }
    ],
    meta: { order: 15, depth: 0 }
  },
  "pg-h3-divider": {
    id: "pg-h3-divider",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-divider-el",
        type: "heading-three",
        children: [{ text: "Divider" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 16, depth: 0 }
  },
  "pg-divider": {
    id: "pg-divider",
    type: "Divider",
    value: [
      {
        id: "pg-divider-el",
        type: "divider",
        children: [{ text: "" }],
        props: { nodeType: "void", theme: "solid" }
      }
    ],
    meta: { order: 17, depth: 0 }
  },
  "pg-h3-code": {
    id: "pg-h3-code",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-code-el",
        type: "heading-three",
        children: [{ text: "Code" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 18, depth: 0 }
  },
  "pg-code": {
    id: "pg-code",
    type: "Code",
    value: [
      {
        id: "pg-code-el",
        type: "code",
        children: [
          {
            text: 'import { YooptaEditor } from "@virtari-packages/react-yoopta-editor";\n\nfunction App() {\n  return <YooptaEditor />;\n}'
          }
        ],
        props: { nodeType: "void", language: "typescript", theme: "VitesseDark" }
      }
    ],
    meta: { order: 19, depth: 0 }
  },
  "pg-h3-link": {
    id: "pg-h3-link",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-link-el",
        type: "heading-three",
        children: [{ text: "Link" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 20, depth: 0 }
  },
  "pg-p-link": {
    id: "pg-p-link",
    type: "Paragraph",
    value: [
      {
        id: "pg-p-link-el",
        type: "paragraph",
        children: [
          { text: "Read the Yoopta docs at " },
          {
            id: "pg-p-link-anchor",
            type: "link",
            children: [{ text: "yoopta.dev" }],
            props: {
              nodeType: "inline",
              url: "https://yoopta.dev",
              target: "_blank",
              rel: "noopener noreferrer"
            }
          },
          { text: "." }
        ],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 21, depth: 0 }
  },
  "pg-h2-media": {
    id: "pg-h2-media",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-media-el",
        type: "heading-two",
        children: [{ text: "Media" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 22, depth: 0 }
  },
  "pg-h3-image": {
    id: "pg-h3-image",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-image-el",
        type: "heading-three",
        children: [{ text: "Image" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 23, depth: 0 }
  },
  "pg-image": {
    id: "pg-image",
    type: "Image",
    value: [
      {
        id: "pg-image-el",
        type: "image",
        children: [{ text: "" }],
        props: {
          nodeType: "void",
          id: "pg-image-asset",
          src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80",
          alt: "Mountain landscape under a clear sky",
          srcSet: null,
          bgColor: null,
          fit: "cover",
          sizes: { width: 1280, height: 720 }
        }
      }
    ],
    meta: { align: "center", depth: 0, order: 24 }
  },
  "pg-h3-video": {
    id: "pg-h3-video",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-video-el",
        type: "heading-three",
        children: [{ text: "Video" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 25, depth: 0 }
  },
  "pg-video": {
    id: "pg-video",
    type: "Video",
    value: [
      {
        id: "pg-video-el",
        type: "video",
        children: [{ text: "" }],
        props: {
          nodeType: "void",
          id: "pg-video-asset",
          src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          srcSet: null,
          bgColor: null,
          sizes: { width: 800, height: 480 },
          fit: "cover",
          poster: null,
          provider: null,
          settings: {
            controls: true,
            loop: false,
            muted: false,
            autoPlay: false
          }
        }
      }
    ],
    meta: { align: "center", depth: 0, order: 26 }
  },
  "pg-h3-file": {
    id: "pg-h3-file",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-file-el",
        type: "heading-three",
        children: [{ text: "File" }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 27, depth: 0 }
  },
  "pg-file": {
    id: "pg-file",
    type: "File",
    value: [
      {
        id: "pg-file-el",
        type: "file",
        children: [{ text: "" }],
        props: {
          nodeType: "void",
          id: "pg-file-asset",
          src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          name: "dummy.pdf",
          size: 13264,
          format: "pdf"
        }
      }
    ],
    meta: { align: "left", depth: 0, order: 28 }
  },
  "pg-p-end": {
    id: "pg-p-end",
    type: "Paragraph",
    value: [
      {
        id: "pg-p-end-el",
        type: "paragraph",
        children: [{ text: "Type / below to insert any other block." }],
        props: { nodeType: "block" }
      }
    ],
    meta: { order: 29, depth: 0 }
  }
};

Object.defineProperty(exports, "Blocks", {
  enumerable: true,
  get: function () { return BaseYooptaEditor.Blocks; }
});
Object.defineProperty(exports, "Elements", {
  enumerable: true,
  get: function () { return BaseYooptaEditor.Elements; }
});
Object.defineProperty(exports, "Marks", {
  enumerable: true,
  get: function () { return BaseYooptaEditor.Marks; }
});
Object.defineProperty(exports, "Paths", {
  enumerable: true,
  get: function () { return BaseYooptaEditor.Paths; }
});
Object.defineProperty(exports, "createYooptaEditor", {
  enumerable: true,
  get: function () { return BaseYooptaEditor.createYooptaEditor; }
});
exports.STARTER_CONTENT = playgroundInitialValue;
exports.YOOPTA_MARKS = YOOPTA_MARKS;
exports.YOOPTA_PLUGINS = YOOPTA_PLUGINS;
exports.YooptaEditor = YooptaEditor;
exports.playgroundInitialValue = playgroundInitialValue;
