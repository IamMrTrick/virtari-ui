import { useEffect, useMemo, useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { CodeEditor } from "@virtari-packages/react-code";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@virtari-packages/react-dialog";
import {
  FileUpload,
  type FileUploadRootProps,
} from "@virtari-packages/react-file-upload";
import {
  Icon,
  IconCode,
  IconLink,
  IconPhoto,
  IconUpload,
  IconVideo,
  IconWorld,
} from "@virtari-packages/react-icons";
import { Input } from "@virtari-packages/react-input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@virtari-packages/react-tabs";
import type { LexicalEditor } from "lexical";
import { insertMediaBlock } from "./editor-utils";
import type { EditorMediaKind } from "./EditorMediaNode";

type MediaDialogMode = "code" | "embed" | "upload" | "url";

interface EditorMediaDialogProps {
  editor: LexicalEditor;
  kind: EditorMediaKind | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  targetBlockElement?: HTMLElement | null;
}

const TRUSTED_EMBED_HOSTS = new Set([
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
  "youtu.be",
]);

function getDefaultMode(kind: EditorMediaKind | null): MediaDialogMode {
  if (kind === "embed") return "embed";
  return "upload";
}

function getDialogCopy(kind: EditorMediaKind | null) {
  if (kind === "video") {
    return {
      description: "Upload a local video or embed from YouTube, Vimeo, Aparat, Loom, and other trusted platforms.",
      title: "Insert video",
    };
  }

  if (kind === "embed") {
    return {
      description: "Paste a direct URL or iframe embed code for docs, maps, prototypes, posts, audio, and other embeds.",
      title: "Insert embed",
    };
  }

  return {
    description: "Upload an image or paste a direct image URL.",
    title: "Insert image",
  };
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("File could not be read."));
    });
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function getYouTubeId(url: URL) {
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

function getFirstUrl(value: string) {
  const iframeSrc = value.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1];
  if (iframeSrc) return iframeSrc;

  return value.match(/https?:\/\/[^\s"'<>]+/i)?.[0] ?? "";
}

function normalizeEmbedUrl(value: string) {
  const candidate = getFirstUrl(value.trim());
  if (!candidate) return "";

  let url: URL;

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

function isTrustedEmbedSource(value: string) {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "").toLowerCase();
    return (
      TRUSTED_EMBED_HOSTS.has(hostname) ||
      Array.from(TRUSTED_EMBED_HOSTS).some((host) => hostname.endsWith(`.${host}`))
    );
  } catch {
    return false;
  }
}

export function EditorMediaDialog({
  editor,
  kind,
  onOpenChange,
  open,
  targetBlockElement,
}: EditorMediaDialogProps) {
  const [mode, setMode] = useState<MediaDialogMode>(() => getDefaultMode(kind));
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const copy = useMemo(() => getDialogCopy(kind), [kind]);
  const accept = useMemo<FileUploadRootProps["accept"]>(
    () => {
      if (kind === "video") {
        return { "video/*": [] } as NonNullable<
          FileUploadRootProps["accept"]
        >;
      }

      return { "image/*": [] } as NonNullable<
        FileUploadRootProps["accept"]
      >;
    },
    [kind],
  );
  const normalizedEmbed = useMemo(
    () => normalizeEmbedUrl(mode === "code" ? embedCode : url),
    [embedCode, mode, url],
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
          src,
        },
        targetBlockElement,
      );
      onOpenChange(false);
    } catch (insertError) {
      setError(
        insertError instanceof Error
          ? insertError.message
          : "Could not insert this media.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="lg"
        animation="scale"
        backdrop="blur"
        responsive
        showCloseButton
        className="vds-editor-media-dialog"
      >
        <DialogHeader variant="bordered">
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        <DialogBody className="vds-editor-media-dialog-body">
          <Tabs
            value={mode}
            onValueChange={(nextMode) => {
              setMode(nextMode as MediaDialogMode);
              setError("");
            }}
          >
            <TabsList
              variant="segmented"
              size="sm"
              fullWidth
              className="vds-editor-media-mode-list"
            >
              {showUpload ? (
                <TabsTrigger value="upload">
                  <Icon icon={IconUpload} size="xs" />
                  Upload
                </TabsTrigger>
              ) : null}
              {kind === "image" ? (
                <TabsTrigger value="url">
                  <Icon icon={IconLink} size="xs" />
                  URL
                </TabsTrigger>
              ) : null}
              {kind === "video" ? (
                <TabsTrigger value="embed">
                  <Icon icon={IconVideo} size="xs" />
                  Embed
                </TabsTrigger>
              ) : null}
              {kind === "embed" ? (
                <TabsTrigger value="embed">
                  <Icon icon={IconWorld} size="xs" />
                  URL
                </TabsTrigger>
              ) : null}
              {showCode ? (
                <TabsTrigger value="code">
                  <Icon icon={IconCode} size="xs" />
                  Code
                </TabsTrigger>
              ) : null}
            </TabsList>

            {showUpload ? (
              <TabsContent value="upload" className="vds-editor-media-pane">
                <FileUpload.Root
                  accept={accept}
                  files={files}
                  maxFiles={1}
                  multiple={false}
                  onFilesChange={setFiles}
                >
                  <FileUpload.Dropzone className="vds-editor-media-upload">
                    <Icon
                      icon={kind === "video" ? IconVideo : IconPhoto}
                      size="lg"
                    />
                    <div className="vds-editor-media-upload-copy">
                      <span className="vds-editor-media-upload-title">
                        Drop file here
                      </span>
                      <span className="vds-editor-media-upload-description">
                        {kind === "video"
                          ? "MP4, WebM, OGV, or any browser-supported video file."
                          : "PNG, JPG, GIF, WebP, or SVG image file."}
                      </span>
                    </div>
                    <FileUpload.Trigger asChild>
                      <Button type="button" variant="soft" size="sm">
                        Browse
                      </Button>
                    </FileUpload.Trigger>
                  </FileUpload.Dropzone>

                  {files.length > 0 ? (
                    <FileUpload.List className="vds-editor-media-file-list">
                      {files.map((file) => (
                        <FileUpload.Item key={file.name} file={file}>
                          <FileUpload.Preview
                            file={file}
                            className="vds-editor-media-file-preview"
                            render={() => (
                              <span className="vds-editor-media-file-fallback">
                                <Icon icon={IconVideo} size="sm" />
                              </span>
                            )}
                          />
                          <span className="vds-editor-media-file-main">
                            <FileUpload.Item.Name />
                            <FileUpload.Item.Size />
                          </span>
                          <FileUpload.Item.Remove />
                        </FileUpload.Item>
                      ))}
                    </FileUpload.List>
                  ) : null}
                </FileUpload.Root>
              </TabsContent>
            ) : null}

            <TabsContent value="url" className="vds-editor-media-pane">
              <Input
                inputSize="sm"
                value={url}
                onChange={(event) => setUrl(event.currentTarget.value)}
                placeholder="https://example.com/image.png"
              />
            </TabsContent>

            <TabsContent value="embed" className="vds-editor-media-pane">
              <Input
                inputSize="sm"
                value={url}
                onChange={(event) => setUrl(event.currentTarget.value)}
                placeholder="Paste a video, post, prototype, audio, map, or iframe URL"
              />
              {normalizedEmbed ? (
                <div
                  className="vds-editor-media-source-hint"
                  data-trusted={isTrustedEmbedSource(normalizedEmbed) ? "" : undefined}
                >
                  {isTrustedEmbedSource(normalizedEmbed)
                    ? "Trusted embed source"
                    : "Direct embed URL"}
                </div>
              ) : null}
            </TabsContent>

            <TabsContent value="code" className="vds-editor-media-pane">
              <CodeEditor
                className="vds-editor-media-code"
                value={embedCode}
                onValueChange={setEmbedCode}
                language="html"
                filename="embed.html"
                copyable={false}
                showLineNumbers={false}
                wrap
                minLines={4}
                maxLines={8}
                variant="embedded"
                size="sm"
                placeholder='<iframe src="https://..."></iframe>'
              />
              {normalizedEmbed ? (
                <div className="vds-editor-media-source-hint">
                  Using {normalizedEmbed}
                </div>
              ) : null}
            </TabsContent>
          </Tabs>

          <label className="vds-editor-media-field">
            <span>Title / alt text</span>
            <Input
              inputSize="sm"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              placeholder={
                kind === "image"
                  ? "Image alt text"
                  : kind === "video"
                    ? "Video title"
                    : "Embed title"
              }
            />
          </label>

          {error ? <div className="vds-editor-media-error">{error}</div> : null}
        </DialogBody>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            color="contrast"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            size="sm"
            loading={submitting}
            onClick={() => void handleInsert()}
          >
            Insert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
