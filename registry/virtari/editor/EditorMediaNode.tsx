import {
  $applyNodeReplacement,
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
} from "lexical";
import type { ReactNode } from "react";

export type EditorMediaKind = "embed" | "image" | "video";

export interface SerializedEditorMediaNode extends SerializedLexicalNode {
  alt: string;
  kind: EditorMediaKind;
  src: string;
  type: "vds-editor-media";
  version: 1;
}

function normalizeKind(kind: string | null | undefined): EditorMediaKind {
  if (kind === "embed" || kind === "video") return kind;
  return "image";
}

function getElementLabel(element: HTMLElement, fallback = "") {
  return (
    element.getAttribute("alt") ??
    element.getAttribute("aria-label") ??
    element.getAttribute("title") ??
    fallback
  );
}

function getFigureCaption(element: HTMLElement) {
  return element.querySelector("figcaption")?.textContent?.trim() ?? "";
}

function convertImageElement(element: HTMLElement): DOMConversionOutput {
  const image = element as HTMLImageElement;

  return {
    node: $createEditorMediaNode(
      "image",
      image.getAttribute("src") ?? "",
      getElementLabel(image),
    ),
  };
}

function convertVideoElement(element: HTMLElement): DOMConversionOutput {
  const video = element as HTMLVideoElement;

  return {
    node: $createEditorMediaNode(
      "video",
      video.getAttribute("src") ?? "",
      getElementLabel(video),
    ),
  };
}

function convertIframeElement(
  element: HTMLElement,
  kind: EditorMediaKind = "embed",
): DOMConversionOutput {
  const iframe = element as HTMLIFrameElement;

  return {
    node: $createEditorMediaNode(
      kind,
      iframe.getAttribute("src") ?? "",
      getElementLabel(iframe),
    ),
  };
}

function convertFigureElement(
  element: HTMLElement,
): DOMConversionOutput | null {
  const explicitKind = element.dataset.vdsEditorMedia;
  const mediaKind = explicitKind
    ? normalizeKind(explicitKind)
    : element.querySelector("iframe")
      ? "embed"
      : element.querySelector("video")
        ? "video"
        : "image";
  const mediaElement =
    mediaKind === "image"
      ? element.querySelector("img")
      : mediaKind === "video"
        ? element.querySelector("video, iframe")
        : element.querySelector("iframe");
  const caption = getFigureCaption(element);

  if (!explicitKind && !mediaElement) {
    return null;
  }

  if (mediaElement instanceof HTMLImageElement) {
    return {
      node: $createEditorMediaNode(
        "image",
        mediaElement.getAttribute("src") ?? "",
        getElementLabel(mediaElement, caption),
      ),
    };
  }

  if (mediaElement instanceof HTMLVideoElement) {
    return {
      node: $createEditorMediaNode(
        "video",
        mediaElement.getAttribute("src") ?? "",
        getElementLabel(mediaElement, caption),
      ),
    };
  }

  if (mediaElement instanceof HTMLIFrameElement) {
    return {
      node: $createEditorMediaNode(
        mediaKind,
        mediaElement.getAttribute("src") ?? "",
        getElementLabel(mediaElement, caption),
      ),
    };
  }

  return {
    node: $createEditorMediaNode(mediaKind, "", caption),
  };
}

function isDirectVideoSource(src: string) {
  const trimmed = src.trim().toLowerCase();

  if (!trimmed) return false;
  if (trimmed.startsWith("data:video/") || trimmed.startsWith("blob:")) {
    return true;
  }

  const path = trimmed.split(/[?#]/)[0] ?? "";
  return /\.(mp4|webm|ogg|ogv|mov|m4v)$/.test(path);
}

function getSourceLabel(src: string) {
  if (!src) return "No source";
  if (src.startsWith("data:")) return "Uploaded file";
  if (src.startsWith("blob:")) return "Local file";

  try {
    return new URL(src).hostname.replace(/^www\./, "");
  } catch {
    return src;
  }
}

function applyIframeAttributes(iframe: HTMLIFrameElement) {
  iframe.loading = "lazy";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.setAttribute("allowfullscreen", "true");
}

export class EditorMediaNode extends DecoratorNode<ReactNode> {
  __alt: string;
  __kind: EditorMediaKind;
  __src: string;

  static getType() {
    return "vds-editor-media";
  }

  static clone(node: EditorMediaNode) {
    return new EditorMediaNode(node.__kind, node.__src, node.__alt, node.__key);
  }

  static importDOM(): DOMConversionMap | null {
    return {
      figure: () => ({
        conversion: convertFigureElement,
        priority: 2,
      }),
      iframe: () => ({
        conversion: convertIframeElement,
        priority: 2,
      }),
      img: () => ({
        conversion: convertImageElement,
        priority: 2,
      }),
      video: () => ({
        conversion: convertVideoElement,
        priority: 2,
      }),
    };
  }

  static importJSON(serializedNode: SerializedLexicalNode): EditorMediaNode {
    const media = serializedNode as SerializedEditorMediaNode;

    return $createEditorMediaNode(media.kind, media.src, media.alt);
  }

  constructor(kind: EditorMediaKind, src = "", alt = "", key?: NodeKey) {
    super(key);
    this.__kind = kind;
    this.__src = src;
    this.__alt = alt;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement("div");

    element.className = "vds-editor-media-block";
    element.dataset.kind = this.__kind;
    return element;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");

    figure.dataset.vdsEditorMedia = this.__kind;

    if (this.__kind === "image") {
      const image = document.createElement("img");

      if (this.__src) {
        image.src = this.__src;
      }
      image.alt = this.__alt;
      figure.append(image);
      caption.textContent = this.__alt || "Image";
    } else if (this.__kind === "video" && isDirectVideoSource(this.__src)) {
      const video = document.createElement("video");

      video.controls = true;
      if (this.__src) {
        video.src = this.__src;
      }
      if (this.__alt) {
        video.setAttribute("aria-label", this.__alt);
      }
      figure.append(video);
      caption.textContent = this.__alt || "Video";
    } else {
      const iframe = document.createElement("iframe");

      if (this.__src) {
        iframe.src = this.__src;
      }
      iframe.title = this.__alt || (this.__kind === "video" ? "Video" : "Embed");
      applyIframeAttributes(iframe);
      figure.append(iframe);
      caption.textContent = this.__alt || (this.__kind === "video" ? "Video" : "Embed");
    }

    figure.append(caption);

    return { element: figure };
  }

  exportJSON(): SerializedEditorMediaNode {
    return {
      ...super.exportJSON(),
      alt: this.__alt,
      kind: this.__kind,
      src: this.__src,
      type: "vds-editor-media",
      version: 1,
    };
  }

  getTextContent() {
    if (this.__alt) return this.__alt;
    if (this.__kind === "video") return "Video";
    if (this.__kind === "embed") return "Embed";
    return "Image";
  }

  isInline() {
    return false;
  }

  isIsolated() {
    return true;
  }

  isKeyboardSelectable() {
    return true;
  }

  decorate(_editor: LexicalEditor, _config: EditorConfig): ReactNode {
    const label =
      this.__kind === "video"
        ? "Video"
        : this.__kind === "embed"
          ? "Embed"
          : "Image";
    const detail = this.__alt || getSourceLabel(this.__src);

    if (this.__kind === "image" && this.__src) {
      return (
        <figure className="vds-editor-media-figure" data-kind={this.__kind}>
          <img
            className="vds-editor-media-preview"
            src={this.__src}
            alt={this.__alt}
          />
          {this.__alt ? (
            <figcaption className="vds-editor-media-caption">
              {this.__alt}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    if (this.__kind === "video" && this.__src && isDirectVideoSource(this.__src)) {
      return (
        <figure className="vds-editor-media-figure" data-kind={this.__kind}>
          <video
            className="vds-editor-media-preview"
            src={this.__src}
            aria-label={this.__alt || undefined}
            controls
          />
          {this.__alt ? (
            <figcaption className="vds-editor-media-caption">
              {this.__alt}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    if (this.__src && (this.__kind === "embed" || this.__kind === "video")) {
      return (
        <figure className="vds-editor-media-figure" data-kind={this.__kind}>
          <iframe
            className="vds-editor-media-frame"
            src={this.__src}
            title={this.__alt || label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {this.__alt ? (
            <figcaption className="vds-editor-media-caption">
              {this.__alt}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    return (
      <div className="vds-editor-media-card" data-kind={this.__kind}>
        <span className="vds-editor-media-kind">{label}</span>
        <span className="vds-editor-media-detail">{detail}</span>
      </div>
    );
  }
}

export function $createEditorMediaNode(
  kind: EditorMediaKind,
  src = "",
  alt = "",
) {
  return $applyNodeReplacement(
    new EditorMediaNode(normalizeKind(kind), src, alt),
  );
}

export function $isEditorMediaNode(
  node: LexicalNode | null | undefined,
): node is EditorMediaNode {
  return node instanceof EditorMediaNode;
}
