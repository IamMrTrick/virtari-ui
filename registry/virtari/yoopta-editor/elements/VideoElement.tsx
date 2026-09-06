import { useCallback, useState, type CSSProperties } from "react";
import { useYooptaEditor } from "@yoopta/editor";
import { useVideoUpload, parseVideoUrl } from "@yoopta/video";
import type { PluginElementRenderProps } from "@yoopta/editor";
import { IconVideo, IconLink } from "../../icons";

import { MediaPicker } from "./MediaPicker";
import { videoUpload } from "../uploads";

type VideoSettings = {
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
};

type VideoProvider = {
  type: string | null;
  id: string;
  url?: string;
};

type VideoProps = {
  src?: string | null;
  poster?: string | null;
  sizes?: { width?: number | string; height?: number | string };
  fit?: "contain" | "cover" | "fill" | null;
  settings?: VideoSettings;
  provider?: VideoProvider | null;
};

const DEFAULT_SETTINGS: Required<VideoSettings> = {
  controls: true,
  loop: false,
  muted: false,
  autoPlay: false,
};

export function VideoElement(renderProps: PluginElementRenderProps) {
  const { element, blockId, attributes, children } = renderProps;
  const editor = useYooptaEditor();
  const upload = useVideoUpload(videoUpload as never);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [embedError, setEmbedError] = useState<string | null>(null);

  const props = (element.props ?? {}) as VideoProps;
  const provider = props.provider;
  const isEmbed =
    !!provider && !!provider.type && typeof props.src === "string" && props.src.length > 0;
  const hasFileSrc =
    !provider && typeof props.src === "string" && props.src.length > 0;

  const onFiles = useCallback(
    async (files: File[]) => {
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
            settings: { ...DEFAULT_SETTINGS },
          },
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, editor, blockId],
  );

  const onEmbed = useCallback(
    (raw: string) => {
      setEmbedError(null);
      const parsed = parseVideoUrl(raw);
      if (!parsed.isValid) {
        setEmbedError(
          "Couldn't recognise that URL. Supported: YouTube, Vimeo, Dailymotion, Loom, Wistia.",
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
            url: parsed.originalUrl,
          },
          settings: { ...DEFAULT_SETTINGS },
        },
      });
    },
    [editor, blockId],
  );

  if (!hasFileSrc && !isEmbed) {
    return (
      <div {...attributes} contentEditable={false} className="vds-yoopta-editor__upload">
        <MediaPicker
          accept={{ "video/*": [] }}
          uploadIcon={<IconVideo size={20} />}
          uploadHint="Click or drop a video"
          embedIcon={<IconLink size={14} />}
          embedHint="Paste a YouTube, Vimeo, Dailymotion, Loom, or Wistia link."
          embedPlaceholder="https://youtube.com/watch?v=…"
          uploading={upload.loading}
          uploadProgress={upload.progress?.percentage ?? null}
          uploadError={uploadError}
          embedError={embedError}
          onFiles={onFiles}
          onEmbed={onEmbed}
        />
        <span style={{ display: "none" }}>{children}</span>
      </div>
    );
  }

  const sizes = props.sizes ?? {};
  const settings = { ...DEFAULT_SETTINGS, ...(props.settings ?? {}) };

  if (isEmbed) {
    return (
      <div {...attributes} className="vds-yoopta-editor__media">
        <iframe
          src={props.src ?? ""}
          width={typeof sizes.width === "number" ? sizes.width : "100%"}
          height={typeof sizes.height === "number" ? sizes.height : 450}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title={`${provider?.type ?? "video"} embed`}
        />
        <span style={{ display: "none" }}>{children}</span>
      </div>
    );
  }

  const style: CSSProperties = {
    objectFit: props.fit ?? "cover",
    maxInlineSize: "100%",
    blockSize: "auto",
  };

  return (
    <div {...attributes} className="vds-yoopta-editor__media">
      <video
        src={props.src ?? ""}
        poster={props.poster ?? undefined}
        width={typeof sizes.width === "number" ? sizes.width : undefined}
        height={typeof sizes.height === "number" ? sizes.height : undefined}
        controls={settings.controls}
        loop={settings.loop}
        muted={settings.muted}
        autoPlay={settings.autoPlay}
        playsInline
        style={style}
      />
      <span style={{ display: "none" }}>{children}</span>
    </div>
  );
}
