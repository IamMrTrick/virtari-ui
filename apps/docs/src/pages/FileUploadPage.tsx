import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  FileUpload,
  type FileRejection,
} from "@virtari-packages/react-file-upload";
import "@virtari-packages/react-file-upload/styles";
import { Button } from "@virtari-packages/react-button";
import "@virtari-packages/react-button/styles";
import { IconUpload, IconFile } from "@virtari-packages/react-icons";
import { Section, Stack } from "../components";

const REJECTION_LABELS: Record<string, string> = {
  "file-too-large": "File is too large",
  "file-too-small": "File is too small",
  "file-invalid-type": "Unsupported file type",
  "too-many-files": "Too many files",
};

function AvatarUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejections, setRejections] = useState<FileRejection[]>([]);
  return (
    <Stack>
      <div style={{ maxInlineSize: "28rem" }}>
        <FileUpload.Root
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
          maxSize={5 * 1024 * 1024}
          maxFiles={1}
          files={files}
          onFilesChange={setFiles}
          onReject={setRejections}
        >
          <FileUpload.Dropzone>
            {({ isDragActive }) => (
              <>
                <IconUpload size={28} aria-hidden="true" />
                <p style={{ margin: 0 }}>
                  {isDragActive ? "Drop the image here" : "Drag an image here"}
                </p>
                <p style={{ margin: 0, fontSize: "var(--vds-text-xs, 0.75rem)" }}>
                  PNG / JPG / WEBP up to 5 MB
                </p>
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm" type="button">
                    Browse files
                  </Button>
                </FileUpload.Trigger>
              </>
            )}
          </FileUpload.Dropzone>
          {files.length > 0 ? (
            <FileUpload.List>
              {files.map((f) => (
                <FileUpload.Item key={`${f.name}-${f.lastModified}`} file={f}>
                  <FileUpload.Preview file={f} />
                  <FileUpload.Item.Name />
                  <FileUpload.Item.Size />
                  <FileUpload.Item.Remove />
                </FileUpload.Item>
              ))}
            </FileUpload.List>
          ) : null}
        </FileUpload.Root>
      </div>
      {rejections.length > 0 ? (
        <p role="alert" style={{ margin: 0, color: "var(--vds-color-danger-solid, #dc2626)" }}>
          {REJECTION_LABELS[rejections[0]!.reason] ?? rejections[0]!.reason} — {rejections[0]!.file.name}
        </p>
      ) : null}
    </Stack>
  );
}

function MultiFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div style={{ maxInlineSize: "36rem" }}>
      <FileUpload.Root
        maxSize={10 * 1024 * 1024}
        maxFiles={10}
        multiple
        files={files}
        onFilesChange={setFiles}
      >
        <FileUpload.Dropzone>
          {({ isDragActive }) => (
            <>
              <IconFile size={28} aria-hidden="true" />
              <p style={{ margin: 0 }}>
                {isDragActive ? "Drop files here" : "Drag any files here"}
              </p>
              <p style={{ margin: 0, fontSize: "var(--vds-text-xs, 0.75rem)" }}>
                Up to 10 files, 10 MB each
              </p>
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm" type="button">
                  Browse files
                </Button>
              </FileUpload.Trigger>
            </>
          )}
        </FileUpload.Dropzone>
        {files.length > 0 ? (
          <FileUpload.List>
            {files.map((f) => (
              <FileUpload.Item key={`${f.name}-${f.lastModified}-${f.size}`} file={f}>
                <FileUpload.Preview
                  file={f}
                  render={() => (
                    <IconFile
                      size={24}
                      aria-hidden="true"
                      style={{ color: "var(--vds-color-text-muted, #6b7280)" }}
                    />
                  )}
                />
                <FileUpload.Item.Name />
                <FileUpload.Item.Size />
                <FileUpload.Item.Remove />
              </FileUpload.Item>
            ))}
          </FileUpload.List>
        ) : null}
      </FileUpload.Root>
      {files.length > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          type="button"
          style={{ marginBlockStart: "var(--vds-space-2, 0.5rem)" }}
          onClick={() => setFiles([])}
        >
          Clear all
        </Button>
      ) : null}
    </div>
  );
}

function RejectionDemo() {
  const [rejections, setRejections] = useState<FileRejection[]>([]);
  return (
    <Stack>
      <div style={{ maxInlineSize: "28rem" }}>
        <FileUpload.Root
          accept={{ "image/png": [".png"] }}
          maxSize={100 * 1024}
          maxFiles={1}
          onReject={setRejections}
        >
          <FileUpload.Dropzone>
            {({ isDragReject }) => (
              <>
                <IconUpload size={28} aria-hidden="true" />
                <p style={{ margin: 0 }}>
                  {isDragReject
                    ? "File will be rejected"
                    : "Try uploading anything that isn't a ≤100 KB PNG"}
                </p>
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm" type="button">
                    Pick a file
                  </Button>
                </FileUpload.Trigger>
              </>
            )}
          </FileUpload.Dropzone>
        </FileUpload.Root>
      </div>
      {rejections.length > 0 ? (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--vds-space-1, 0.25rem)" }}>
          {rejections.map((r, i) => (
            <li key={`${r.file.name}-${i}`} style={{ color: "var(--vds-color-danger-solid, #dc2626)" }}>
              <strong>{r.file.name}</strong> — {REJECTION_LABELS[r.reason] ?? r.reason}
            </li>
          ))}
        </ul>
      ) : null}
    </Stack>
  );
}

function ButtonTriggerDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [multiFiles, setMultiFiles] = useState<File[]>([]);

  return (
    <Stack>
      {/* Single file — Button trigger, no dropzone chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3, 0.75rem)" }}>
        <FileUpload.Root
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"], "application/pdf": [".pdf"] }}
          maxFiles={1}
          files={file ? [file] : []}
          onFilesChange={(fs) => setFile(fs[0] ?? null)}
        >
          <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm" leftSection={<IconUpload size={16} aria-hidden="true" />}>
              Choose file
            </Button>
          </FileUpload.Trigger>
        </FileUpload.Root>
        <span style={{ fontSize: "var(--vds-text-sm, 0.875rem)", color: "var(--vds-color-text-muted)" }}>
          {file ? file.name : "No file chosen"}
        </span>
      </div>

      {/* Multi-file — Button trigger */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3, 0.75rem)" }}>
        <FileUpload.Root
          accept={{ "image/*": [] }}
          maxFiles={5}
          multiple
          files={multiFiles}
          onFilesChange={setMultiFiles}
        >
          <FileUpload.Trigger asChild>
            <Button variant="soft" size="sm" leftSection={<IconUpload size={16} aria-hidden="true" />}>
              Choose images
            </Button>
          </FileUpload.Trigger>
        </FileUpload.Root>
        <span style={{ fontSize: "var(--vds-text-sm, 0.875rem)", color: "var(--vds-color-text-muted)" }}>
          {multiFiles.length === 0
            ? "No files chosen"
            : multiFiles.length === 1
            ? multiFiles[0]!.name
            : `${multiFiles.length} files selected`}
        </span>
      </div>

      {/* Disabled */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3, 0.75rem)" }}>
        <FileUpload.Root disabled>
          <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm" disabled leftSection={<IconUpload size={16} aria-hidden="true" />}>
              Choose file
            </Button>
          </FileUpload.Trigger>
        </FileUpload.Root>
        <span style={{ fontSize: "var(--vds-text-sm, 0.875rem)", color: "var(--vds-color-text-muted)" }}>
          Disabled
        </span>
      </div>
    </Stack>
  );
}

export function FileUploadPage() {
  return (
    <>
      <Section
        title="Overview"
        description="Compound dropzone + file list built on react-dropzone. Root manages state (files, rejections, drag feedback); parts compose freely — Dropzone, Trigger (asChild to Button), List, Item (Name/Size/Remove/Progress), Preview (images auto, escape hatch for others). Controlled or uncontrolled."
      >
        <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
          The package is upload-agnostic — it handles selection and validation. You own the XHR/fetch and pass per-item <VirtariInlineCode>progress</VirtariInlineCode> values to <VirtariInlineCode>FileUpload.Item.Progress</VirtariInlineCode>.
        </p>
      </Section>

      <Section
        title="Button trigger"
        description="FileUpload.Trigger wraps any Button (via asChild) to open the native file dialog — no dropzone chrome. Pairs with a filename label for a compact inline pattern."
      >
        <ButtonTriggerDemo />
      </Section>

      <Section
        title="Single image — avatar picker"
        description="maxFiles=1, accept=image/*, maxSize=5 MB. Preview generates via URL.createObjectURL with automatic cleanup on unmount/replace."
      >
        <AvatarUpload />
      </Section>

      <Section
        title="Multi-file"
        description="multiple + maxFiles=10. Non-image previews fall through to the `render` prop — here we render a file icon."
      >
        <MultiFileUpload />
      </Section>

      <Section
        title="Validation & rejections"
        description="onReject fires when files violate accept/maxSize/maxFiles/minSize rules. The Dropzone also exposes isDragReject so you can color the border before drop."
      >
        <RejectionDemo />
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`// Plain input — simplest form
import { FileUpload } from "@virtari-packages/react-file-upload";
import "@virtari-packages/react-file-upload/styles";

<FileUpload.Input accept="image/*, .pdf" multiple />

// ─── Dropzone compound ────────────────────────────────────────
import { FileUpload } from "@virtari-packages/react-file-upload";
import "@virtari-packages/react-file-upload/styles";

const [files, setFiles] = useState<File[]>([]);

<FileUpload.Root
  accept={{ "image/*": [".png", ".jpg", ".webp"] }}
  maxSize={5 * 1024 * 1024}
  maxFiles={1}
  files={files}
  onFilesChange={setFiles}
  onReject={(rs) => console.warn(rs)}
>
  <FileUpload.Dropzone>
    {({ isDragActive }) => (
      <>
        <IconUpload />
        <p>{isDragActive ? "Drop here" : "Drag or browse"}</p>
        <FileUpload.Trigger asChild><Button>Browse</Button></FileUpload.Trigger>
      </>
    )}
  </FileUpload.Dropzone>
  <FileUpload.List>
    {files.map((f) => (
      <FileUpload.Item key={f.name} file={f}>
        <FileUpload.Preview file={f} />
        <FileUpload.Item.Name />
        <FileUpload.Item.Size />
        <FileUpload.Item.Remove />
      </FileUpload.Item>
    ))}
  </FileUpload.List>
</FileUpload.Root>`} />
      </Section>
    </>
  );
}
