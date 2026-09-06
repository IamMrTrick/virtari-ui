import { useCallback, useState, type CSSProperties } from "react";
import { useYooptaEditor } from "@yoopta/editor";
import { useImageUpload } from "@yoopta/image";
import type { PluginElementRenderProps } from "@yoopta/editor";
import { IconPhoto, IconLink } from "../../icons";

import { MediaPicker } from "./MediaPicker";
import { imageUpload } from "../uploads";

type ImageProps = {
  src?: string | null;
  alt?: string | null;
  sizes?: { width?: number | string; height?: number | string };
  fit?: "contain" | "cover" | "fill" | null;
  bgColor?: string | null;
};

function isLikelyImageUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function ImageElement(renderProps: PluginElementRenderProps) {
  const { element, blockId, attributes, children } = renderProps;
  const editor = useYooptaEditor();
  const upload = useImageUpload(imageUpload as never);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [embedError, setEmbedError] = useState<string | null>(null);

  const props = (element.props ?? {}) as ImageProps;
  const hasSrc = typeof props.src === "string" && props.src.length > 0;

  const onFiles = useCallback(
    async (files: File[]) => {
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
            bgColor: result.bgColor ?? null,
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
          bgColor: null,
        },
      });
    },
    [editor, blockId],
  );

  if (!hasSrc) {
    return (
      <div {...attributes} contentEditable={false} className="vds-yoopta-editor__upload">
        <MediaPicker
          accept={{ "image/*": [] }}
          uploadIcon={<IconPhoto size={20} />}
          uploadHint="Click or drop an image"
          embedIcon={<IconLink size={14} />}
          embedHint="Paste any image URL (PNG, JPG, GIF, WebP, SVG…)."
          embedPlaceholder="https://example.com/photo.jpg"
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
  const style: CSSProperties = {
    objectFit: props.fit ?? "cover",
    backgroundColor: props.bgColor ?? undefined,
    maxInlineSize: "100%",
    blockSize: "auto",
  };

  return (
    <div {...attributes} className="vds-yoopta-editor__media">
      <img
        src={props.src ?? ""}
        alt={props.alt ?? ""}
        width={typeof sizes.width === "number" ? sizes.width : undefined}
        height={typeof sizes.height === "number" ? sizes.height : undefined}
        style={style}
        draggable={false}
      />
      <span style={{ display: "none" }}>{children}</span>
    </div>
  );
}
