import type { YooptaContentValue } from "@yoopta/editor";

/**
 * Curated starter content showcasing the most common block types.
 * Avoids plugin shapes that crash against @yoopta v6.0.3 (e.g. video).
 */
export const playgroundInitialValue = {
  "pg-h1": {
    id: "pg-h1",
    type: "HeadingOne",
    value: [
      {
        id: "pg-h1-el",
        type: "heading-one",
        children: [{ text: "Welcome to the Virtari Block Editor" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 0, depth: 0 },
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
            text: " to open the slash menu, select text to reveal the floating toolbar, hover any block to drag it around.",
          },
        ],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 1, depth: 0 },
  },
  "pg-h2-marks": {
    id: "pg-h2-marks",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-marks-el",
        type: "heading-two",
        children: [{ text: "Text marks" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 2, depth: 0 },
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
            highlight: { color: "#000000", backgroundColor: "#FFE066" },
          },
          { text: "." },
        ],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 3, depth: 0 },
  },
  "pg-h2-blocks": {
    id: "pg-h2-blocks",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-blocks-el",
        type: "heading-two",
        children: [{ text: "Block types" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 4, depth: 0 },
  },
  "pg-h3-quote": {
    id: "pg-h3-quote",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-quote-el",
        type: "heading-three",
        children: [{ text: "Blockquote" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 5, depth: 0 },
  },
  "pg-quote": {
    id: "pg-quote",
    type: "Blockquote",
    value: [
      {
        id: "pg-quote-el",
        type: "blockquote",
        children: [
          { text: "Design is not just what it looks like and feels like. Design is how it works." },
        ],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 6, depth: 0 },
  },
  "pg-h3-callout": {
    id: "pg-h3-callout",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-callout-el",
        type: "heading-three",
        children: [{ text: "Callout" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 7, depth: 0 },
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
            text: "All callout tones (default, info, success, warning, danger) inherit Virtari's semantic color tokens.",
          },
        ],
        props: { nodeType: "block", theme: "info" },
      },
    ],
    meta: { order: 8, depth: 0 },
  },
  "pg-h3-lists": {
    id: "pg-h3-lists",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-lists-el",
        type: "heading-three",
        children: [{ text: "Lists" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 9, depth: 0 },
  },
  "pg-bul-1": {
    id: "pg-bul-1",
    type: "BulletedList",
    value: [
      {
        id: "pg-bul-1-el",
        type: "bulleted-list",
        children: [{ text: "Bulleted list item one" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 10, depth: 0 },
  },
  "pg-bul-2": {
    id: "pg-bul-2",
    type: "BulletedList",
    value: [
      {
        id: "pg-bul-2-el",
        type: "bulleted-list",
        children: [{ text: "Bulleted list item two" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 11, depth: 0 },
  },
  "pg-num-1": {
    id: "pg-num-1",
    type: "NumberedList",
    value: [
      {
        id: "pg-num-1-el",
        type: "numbered-list",
        children: [{ text: "Numbered list item one" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 12, depth: 0 },
  },
  "pg-num-2": {
    id: "pg-num-2",
    type: "NumberedList",
    value: [
      {
        id: "pg-num-2-el",
        type: "numbered-list",
        children: [{ text: "Numbered list item two" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 13, depth: 0 },
  },
  "pg-todo-1": {
    id: "pg-todo-1",
    type: "TodoList",
    value: [
      {
        id: "pg-todo-1-el",
        type: "todo-list",
        children: [{ text: "Try the slash menu" }],
        props: { nodeType: "block", checked: true },
      },
    ],
    meta: { order: 14, depth: 0 },
  },
  "pg-todo-2": {
    id: "pg-todo-2",
    type: "TodoList",
    value: [
      {
        id: "pg-todo-2-el",
        type: "todo-list",
        children: [{ text: "Drag a block to reorder it" }],
        props: { nodeType: "block", checked: false },
      },
    ],
    meta: { order: 15, depth: 0 },
  },
  "pg-h3-divider": {
    id: "pg-h3-divider",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-divider-el",
        type: "heading-three",
        children: [{ text: "Divider" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 16, depth: 0 },
  },
  "pg-divider": {
    id: "pg-divider",
    type: "Divider",
    value: [
      {
        id: "pg-divider-el",
        type: "divider",
        children: [{ text: "" }],
        props: { nodeType: "void", theme: "solid" },
      },
    ],
    meta: { order: 17, depth: 0 },
  },
  "pg-h3-code": {
    id: "pg-h3-code",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-code-el",
        type: "heading-three",
        children: [{ text: "Code" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 18, depth: 0 },
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
            text: 'import { YooptaEditor } from "@virtari-packages/react-yoopta-editor";\n\nfunction App() {\n  return <YooptaEditor />;\n}',
          },
        ],
        props: { nodeType: "void", language: "typescript", theme: "VitesseDark" },
      },
    ],
    meta: { order: 19, depth: 0 },
  },
  "pg-h3-link": {
    id: "pg-h3-link",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-link-el",
        type: "heading-three",
        children: [{ text: "Link" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 20, depth: 0 },
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
              rel: "noopener noreferrer",
            },
          },
          { text: "." },
        ],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 21, depth: 0 },
  },
  "pg-h2-media": {
    id: "pg-h2-media",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-media-el",
        type: "heading-two",
        children: [{ text: "Media" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 22, depth: 0 },
  },
  "pg-h3-image": {
    id: "pg-h3-image",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-image-el",
        type: "heading-three",
        children: [{ text: "Image" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 23, depth: 0 },
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
          sizes: { width: 1280, height: 720 },
        },
      },
    ],
    meta: { align: "center", depth: 0, order: 24 },
  },
  "pg-h3-video": {
    id: "pg-h3-video",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-video-el",
        type: "heading-three",
        children: [{ text: "Video" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 25, depth: 0 },
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
            autoPlay: false,
          },
        },
      },
    ],
    meta: { align: "center", depth: 0, order: 26 },
  },
  "pg-h3-file": {
    id: "pg-h3-file",
    type: "HeadingThree",
    value: [
      {
        id: "pg-h3-file-el",
        type: "heading-three",
        children: [{ text: "File" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 27, depth: 0 },
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
          format: "pdf",
        },
      },
    ],
    meta: { align: "left", depth: 0, order: 28 },
  },
  "pg-h2-interactive": {
    id: "pg-h2-interactive",
    type: "HeadingTwo",
    value: [
      {
        id: "pg-h2-interactive-el",
        type: "heading-two",
        children: [{ text: "Interactive blocks" }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 29, depth: 0 },
  },
  "pg-tabs": {
    id: "pg-tabs",
    type: "Tabs",
    value: [
      {
        id: "pg-tabs-container",
        type: "tabs-container",
        children: [
          {
            id: "pg-tabs-list",
            type: "tabs-list",
            children: [
              {
                id: "pg-tab-1",
                type: "tabs-item-heading",
                children: [{ text: "Overview" }],
              },
              {
                id: "pg-tab-2",
                type: "tabs-item-heading",
                children: [{ text: "Details" }],
              },
              {
                id: "pg-tab-3",
                type: "tabs-item-heading",
                children: [{ text: "Notes" }],
              },
            ],
          },
          {
            id: "pg-tab-1-content",
            type: "tabs-item-content",
            children: [{ text: "Overview content — these tabs use the Virtari Tabs primitive." }],
            props: { referenceId: "pg-tab-1" },
          },
          {
            id: "pg-tab-2-content",
            type: "tabs-item-content",
            children: [{ text: "Details content — Radix-based active state, design-token styling." }],
            props: { referenceId: "pg-tab-2" },
          },
          {
            id: "pg-tab-3-content",
            type: "tabs-item-content",
            children: [{ text: "Notes content — type into any panel, switch with the heading row." }],
            props: { referenceId: "pg-tab-3" },
          },
        ],
        props: { activeTabId: "pg-tab-1", nodeType: "block" },
      },
    ],
    meta: { order: 30, depth: 0 },
  },
  "pg-accordion": {
    id: "pg-accordion",
    type: "Accordion",
    value: [
      {
        id: "pg-acc-list",
        type: "accordion-list",
        children: [
          {
            id: "pg-acc-1",
            type: "accordion-list-item",
            children: [
              {
                id: "pg-acc-1-h",
                type: "accordion-list-item-heading",
                children: [{ text: "What is the block editor?" }],
              },
              {
                id: "pg-acc-1-c",
                type: "accordion-list-item-content",
                children: [{ text: "A Yoopta-Editor wrapped with Virtari design tokens and primitives." }],
              },
            ],
            props: { isExpanded: true },
          },
          {
            id: "pg-acc-2",
            type: "accordion-list-item",
            children: [
              {
                id: "pg-acc-2-h",
                type: "accordion-list-item-heading",
                children: [{ text: "Are these accordions interactive?" }],
              },
              {
                id: "pg-acc-2-c",
                type: "accordion-list-item-content",
                children: [{ text: "Yes — click any heading to expand or collapse the panel below." }],
              },
            ],
            props: { isExpanded: false },
          },
        ],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 31, depth: 0 },
  },
  "pg-table": {
    id: "pg-table",
    type: "Table",
    value: [
      {
        id: "pg-tbl-root",
        type: "table",
        children: [
          {
            id: "pg-tbl-row1",
            type: "table-row",
            children: [
              {
                id: "pg-tbl-c1",
                type: "table-data-cell",
                children: [{ text: "Block" }],
                props: { width: 200, asHeader: true },
              },
              {
                id: "pg-tbl-c2",
                type: "table-data-cell",
                children: [{ text: "Description" }],
                props: { width: 280, asHeader: true },
              },
              {
                id: "pg-tbl-c3",
                type: "table-data-cell",
                children: [{ text: "Shortcut" }],
                props: { width: 160, asHeader: true },
              },
            ],
          },
          {
            id: "pg-tbl-row2",
            type: "table-row",
            children: [
              { id: "pg-tbl-c4", type: "table-data-cell", children: [{ text: "Heading 1" }], props: { width: 200 } },
              { id: "pg-tbl-c5", type: "table-data-cell", children: [{ text: "Big section heading" }], props: { width: 280 } },
              { id: "pg-tbl-c6", type: "table-data-cell", children: [{ text: "/h1" }], props: { width: 160 } },
            ],
          },
          {
            id: "pg-tbl-row3",
            type: "table-row",
            children: [
              { id: "pg-tbl-c7", type: "table-data-cell", children: [{ text: "Quote" }], props: { width: 200 } },
              { id: "pg-tbl-c8", type: "table-data-cell", children: [{ text: "Indented quoted block" }], props: { width: 280 } },
              { id: "pg-tbl-c9", type: "table-data-cell", children: [{ text: "/quote" }], props: { width: 160 } },
            ],
          },
        ],
        props: { headerRow: true, headerColumn: false, nodeType: "block" },
      },
    ],
    meta: { order: 32, depth: 0 },
  },
  "pg-p-end": {
    id: "pg-p-end",
    type: "Paragraph",
    value: [
      {
        id: "pg-p-end-el",
        type: "paragraph",
        children: [{ text: "Type / below to insert any other block." }],
        props: { nodeType: "block" },
      },
    ],
    meta: { order: 33, depth: 0 },
  },
} as unknown as YooptaContentValue;
