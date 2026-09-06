import { useState, type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../tabs";
import { Input } from "../../input";
import { Button } from "../../button";
import { FileUpload } from "../../file-upload";
import {
  IconLoader2,
  IconAlertCircle,
} from "../../icons";

export type MediaPickerProps = {
  /** File MIME accept map for the upload tab. */
  accept?: Record<string, string[]>;
  /** Idle copy + icon shown in the dropzone. */
  uploadIcon: ReactNode;
  uploadHint: string;
  /** Idle copy + icon shown in the embed input row. */
  embedIcon: ReactNode;
  embedHint: string;
  embedPlaceholder: string;
  /** Disable the embed tab entirely (e.g. file-only blocks). */
  hideEmbed?: boolean;
  /** Wired to the upload hook's loading state. */
  uploading: boolean;
  uploadProgress?: number | null;
  uploadError?: string | null;
  /** Notified when the user drops/selects a file. */
  onFiles: (files: File[]) => void;
  /** Notified when the user submits a URL via the Embed tab. */
  onEmbed: (url: string) => void | Promise<void>;
  /** Validation message when embed URL is rejected. */
  embedError?: string | null;
};

export function MediaPicker({
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
  embedError,
}: MediaPickerProps) {
  const [tab, setTab] = useState<"upload" | "embed">("upload");
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as "upload" | "embed")}
      className="vds-yoopta-editor__picker"
    >
      <TabsList variant="segmented" size="sm">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        {!hideEmbed && <TabsTrigger value="embed">Embed by URL</TabsTrigger>}
      </TabsList>

      <TabsContent value="upload">
        <FileUpload.Root accept={accept} maxFiles={1} onFilesChange={onFiles}>
          <FileUpload.Dropzone>
            {({ isDragActive }: { isDragActive: boolean }) => (
              <div
                className="vds-yoopta-editor__upload-content"
                data-active={isDragActive || undefined}
              >
                {uploading ? (
                  <>
                    <IconLoader2
                      size={20}
                      className="vds-yoopta-editor__upload-spinner"
                    />
                    <span>
                      Uploading…{" "}
                      {uploadProgress != null
                        ? `${Math.round(uploadProgress)}%`
                        : ""}
                    </span>
                  </>
                ) : uploadError ? (
                  <>
                    <IconAlertCircle size={20} />
                    <span>{uploadError}</span>
                  </>
                ) : (
                  <>
                    {uploadIcon}
                    <span>{isDragActive ? "Drop here…" : uploadHint}</span>
                  </>
                )}
              </div>
            )}
          </FileUpload.Dropzone>
        </FileUpload.Root>
      </TabsContent>

      {!hideEmbed && (
        <TabsContent value="embed">
          <div className="vds-yoopta-editor__embed-row">
            <Input
              inputSize="sm"
              placeholder={embedPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  void handleEmbed();
                }
              }}
            />
            <Button
              size="sm"
              variant="solid"
              onClick={handleEmbed}
              disabled={!url.trim() || submitting}
              leftSection={embedIcon}
            >
              Embed
            </Button>
          </div>
          {embedError && (
            <div className="vds-yoopta-editor__embed-error">
              <IconAlertCircle size={14} />
              <span>{embedError}</span>
            </div>
          )}
          {!embedError && (
            <p className="vds-yoopta-editor__embed-hint">{embedHint}</p>
          )}
        </TabsContent>
      )}
    </Tabs>
  );
}
