import { useCallback, useState } from "react";
import { useYooptaEditor } from "@yoopta/editor";
import { useFileUpload, formatFileSize } from "@yoopta/file";
import type { PluginElementRenderProps } from "@yoopta/editor";
import { FileUpload } from "../../file-upload";
import { IconPaperclip, IconLoader2, IconAlertCircle, IconDownload } from "../../icons";
import { fileUpload } from "../uploads";

type FileProps = {
  src?: string | null;
  name?: string | null;
  size?: number | null;
  format?: string | null;
};

export function FileElement(renderProps: PluginElementRenderProps) {
  const { element, blockId, attributes, children } = renderProps;
  const editor = useYooptaEditor();
  const upload = useFileUpload(fileUpload as never);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const props = (element.props ?? {}) as FileProps;
  const hasSrc = typeof props.src === "string" && props.src.length > 0;

  const onFilesChange = useCallback(
    async (files: File[]) => {
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
            format: result.format ?? file.name.split(".").pop() ?? "",
          },
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, editor, blockId],
  );

  if (!hasSrc) {
    return (
      <div {...attributes} contentEditable={false} className="vds-yoopta-editor__upload">
        <FileUpload.Root maxFiles={1} onFilesChange={onFilesChange}>
          <FileUpload.Dropzone>
            {({ isDragActive }: { isDragActive: boolean }) => (
              <div className="vds-yoopta-editor__upload-content" data-active={isDragActive || undefined}>
                {upload.loading ? (
                  <>
                    <IconLoader2 size={20} className="vds-yoopta-editor__upload-spinner" />
                    <span>Uploading… {upload.progress?.percentage ? `${Math.round(upload.progress.percentage)}%` : ""}</span>
                  </>
                ) : uploadError ? (
                  <>
                    <IconAlertCircle size={20} />
                    <span>{uploadError}</span>
                  </>
                ) : (
                  <>
                    <IconPaperclip size={20} />
                    <span>{isDragActive ? "Drop file here…" : "Click or drop a file"}</span>
                  </>
                )}
              </div>
            )}
          </FileUpload.Dropzone>
        </FileUpload.Root>
        <span style={{ display: "none" }}>{children}</span>
      </div>
    );
  }

  return (
    <div {...attributes} className="vds-yoopta-editor__file-card">
      <a
        href={props.src ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        download={props.name ?? undefined}
        contentEditable={false}
      >
        <IconPaperclip size={18} />
        <span className="vds-yoopta-editor__file-card-info">
          <span className="vds-yoopta-editor__file-card-name">{props.name ?? "File"}</span>
          {typeof props.size === "number" && (
            <span className="vds-yoopta-editor__file-card-size">{formatFileSize(props.size)}</span>
          )}
        </span>
        <IconDownload size={16} />
      </a>
      <span style={{ display: "none" }}>{children}</span>
    </div>
  );
}
