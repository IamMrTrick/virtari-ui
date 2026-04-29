import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ButtonHTMLAttributes,
  ChangeEvent,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  RefObject,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  useDropzone,
  type DropzoneOptions,
  type FileRejection as DzFileRejection,
} from "react-dropzone";
import { cn } from "@virtari-packages/utils";
import { IconX } from "@virtari-packages/react-icons";
import { Progress } from "@virtari-packages/react-progress";

import {
  FileUploadContext,
  FileUploadItemContext,
  useFileUploadContext,
  useFileUploadItemContext,
} from "./context";
import { formatBytes } from "./format";
import type { FileRejection, FileRejectionReason } from "./types";

/* ────────────────────────────────────────────────────────────
 * Root — manages state, spreads dropzone, provides context
 * ──────────────────────────────────────────────────────────── */

export interface FileUploadRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onDrop"> {
  accept?: DropzoneOptions["accept"];
  maxSize?: number;
  minSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  files?: File[];
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  onReject?: (rejections: FileRejection[]) => void;
}

function mapRejection(r: DzFileRejection): FileRejection {
  const first = r.errors[0];
  const code = (first?.code ?? "file-invalid-type") as FileRejectionReason;
  return { file: r.file, reason: code, message: first?.message };
}

export const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>(
  function FileUploadRoot(
    {
      accept,
      maxSize,
      minSize,
      maxFiles,
      multiple = false,
      disabled = false,
      files: controlledFiles,
      defaultFiles,
      onFilesChange,
      onReject,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const isControlled = controlledFiles !== undefined;
    const [internalFiles, setInternalFiles] = useState<File[]>(
      defaultFiles ?? [],
    );
    const files = isControlled ? controlledFiles : internalFiles;
    const [rejections, setRejections] = useState<FileRejection[]>([]);

    const setFiles = useCallback(
      (next: File[]) => {
        if (!isControlled) setInternalFiles(next);
        onFilesChange?.(next);
      },
      [isControlled, onFilesChange],
    );

    const handleDrop = useCallback(
      (accepted: File[], rejected: DzFileRejection[]) => {
        const nextRejections = rejected.map(mapRejection);
        setRejections(nextRejections);
        if (nextRejections.length > 0) onReject?.(nextRejections);
        if (accepted.length === 0) return;
        if (multiple) {
          const combined = [...files, ...accepted];
          const capped =
            maxFiles !== undefined ? combined.slice(0, maxFiles) : combined;
          setFiles(capped);
        } else {
          setFiles(accepted.slice(0, 1));
        }
      },
      [files, maxFiles, multiple, onReject, setFiles],
    );

    const dropzone = useDropzone({
      accept,
      maxSize,
      minSize,
      maxFiles: multiple ? maxFiles : 1,
      multiple,
      disabled,
      onDrop: handleDrop,
      noKeyboard: true, // Trigger owns keyboard semantics.
    });

    const removeFile = useCallback(
      (file: File) => {
        setFiles(files.filter((f) => f !== file));
      },
      [files, setFiles],
    );

    const clearFiles = useCallback(() => setFiles([]), [setFiles]);

    const value = useMemo(
      () => ({
        files,
        rejections,
        disabled,
        multiple,
        maxFiles,
        maxSize,
        accept,
        removeFile,
        clearFiles,
        dropzone,
      }),
      [
        files,
        rejections,
        disabled,
        multiple,
        maxFiles,
        maxSize,
        accept,
        removeFile,
        clearFiles,
        dropzone,
      ],
    );

    return (
      <FileUploadContext.Provider value={value}>
        <div
          ref={ref}
          data-disabled={disabled ? "" : undefined}
          className={cn("vds-file-upload", className)}
          {...props}
        >
          {children}
        </div>
      </FileUploadContext.Provider>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Dropzone — drop target. Accepts ReactNode or render-prop children.
 * ──────────────────────────────────────────────────────────── */

export interface DropzoneRenderState {
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
}

export interface FileUploadDropzoneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode | ((state: DropzoneRenderState) => ReactNode);
}

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone({ className, children, ...props }, ref) {
  const { dropzone, disabled } = useFileUploadContext();
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
    dropzone;
  const rootProps = getRootProps();
  return (
    <div
      {...rootProps}
      ref={(node) => {
        if (typeof rootProps.ref === "function") rootProps.ref(node);
        else if (rootProps.ref) (rootProps.ref as RefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-drag-active={isDragActive ? "" : undefined}
      data-drag-accept={isDragAccept ? "" : undefined}
      data-drag-reject={isDragReject ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn("vds-file-upload-dropzone", className)}
      {...props}
    >
      <input {...getInputProps()} />
      {typeof children === "function"
        ? children({ isDragActive, isDragAccept, isDragReject })
        : children}
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
 * Trigger — asChild pattern over <Button>; opens native file dialog
 * ──────────────────────────────────────────────────────────── */

export interface FileUploadTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const FileUploadTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadTriggerProps
>(function FileUploadTrigger(
  { asChild = false, onClick, disabled: disabledProp, ...props },
  ref,
) {
  const { dropzone, disabled } = useFileUploadContext();
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabledProp ?? disabled;
  return (
    <Comp
      ref={ref as never}
      type={asChild ? undefined : "button"}
      disabled={isDisabled}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || isDisabled) return;
        e.stopPropagation();
        dropzone.open();
      }}
      {...props}
    />
  );
});

/* ────────────────────────────────────────────────────────────
 * List — just a semantic <ul>
 * ──────────────────────────────────────────────────────────── */

export interface FileUploadListProps extends HTMLAttributes<HTMLUListElement> {}

export const FileUploadList = forwardRef<HTMLUListElement, FileUploadListProps>(
  function FileUploadList({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        className={cn("vds-file-upload-list", className)}
        {...props}
      />
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Item — per-file row; provides ItemContext so inner parts read from it
 * ──────────────────────────────────────────────────────────── */

export interface FileUploadItemProps extends LiHTMLAttributes<HTMLLIElement> {
  file: File;
  progress?: number;
}

export const FileUploadItemRoot = forwardRef<
  HTMLLIElement,
  FileUploadItemProps
>(function FileUploadItem({ file, progress, className, ...props }, ref) {
  const value = useMemo(() => ({ file, progress }), [file, progress]);
  return (
    <FileUploadItemContext.Provider value={value}>
      <li
        ref={ref}
        className={cn("vds-file-upload-item", className)}
        {...props}
      />
    </FileUploadItemContext.Provider>
  );
});

export function FileUploadItemName({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { file } = useFileUploadItemContext();
  return (
    <span
      className={cn("vds-file-upload-item-name", className)}
      title={file.name}
      {...props}
    >
      {file.name}
    </span>
  );
}

export function FileUploadItemSize({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { file } = useFileUploadItemContext();
  return (
    <span
      className={cn("vds-file-upload-item-size", className)}
      {...props}
    >
      {formatBytes(file.size)}
    </span>
  );
}

export interface FileUploadItemRemoveProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const FileUploadItemRemove = forwardRef<
  HTMLButtonElement,
  FileUploadItemRemoveProps
>(function FileUploadItemRemove(
  { className, onClick, children, ...props },
  ref,
) {
  const { file } = useFileUploadItemContext();
  const { removeFile } = useFileUploadContext();
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Remove ${file.name}`}
      className={cn("vds-file-upload-item-remove", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) removeFile(file);
      }}
      {...props}
    >
      {children ?? <IconX size={16} aria-hidden="true" />}
    </button>
  );
});

export interface FileUploadItemProgressProps {
  className?: string;
  /** Override; defaults to the `progress` value from FileUploadItem. */
  value?: number;
}

export function FileUploadItemProgress({
  className,
  value,
}: FileUploadItemProgressProps) {
  const { progress } = useFileUploadItemContext();
  const effective = value ?? progress;
  if (effective === undefined) return null;
  return (
    <Progress
      value={effective}
      className={cn("vds-file-upload-item-progress", className)}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * FileUploadInput — plain styled <input type="file"> wrapper
 * ──────────────────────────────────────────────────────────── */

export interface FileUploadInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Forwarded to the hidden <input>. Use native MIME/extension string: "image/*, .pdf" */
  accept?: string;
}

export const FileUploadInput = forwardRef<HTMLInputElement, FileUploadInputProps>(
  function FileUploadInput(
    { className, accept, multiple, disabled, onChange, ...props },
    ref,
  ) {
    const [label, setLabel] = useState("No file chosen");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const fl = e.target.files;
      if (!fl || fl.length === 0) setLabel("No file chosen");
      else if (fl.length === 1) setLabel(fl[0]!.name);
      else setLabel(`${fl.length} files selected`);
      onChange?.(e);
    }

    return (
      <label
        className={cn("vds-file-upload-input", className)}
        data-disabled={disabled ? "" : undefined}
      >
        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          className="vds-file-upload-input-native"
          {...props}
        />
        <span className="vds-file-upload-input-btn" aria-hidden="true">
          Browse
        </span>
        <span className="vds-file-upload-input-label">{label}</span>
      </label>
    );
  },
);

/* Namespace export for Item compound. */
export const FileUploadItem = Object.assign(FileUploadItemRoot, {
  Name: FileUploadItemName,
  Size: FileUploadItemSize,
  Remove: FileUploadItemRemove,
  Progress: FileUploadItemProgress,
});

/* ────────────────────────────────────────────────────────────
 * Preview — image thumbnail with object-URL cleanup
 * ──────────────────────────────────────────────────────────── */

export interface FileUploadPreviewProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  file: File;
  /** Custom renderer for non-image files; receives the File. */
  render?: (file: File) => ReactNode;
}

export const FileUploadPreview = forwardRef<
  HTMLImageElement,
  FileUploadPreviewProps
>(function FileUploadPreview(
  { file, render, className, alt, ...props },
  ref,
) {
  const [url, setUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(file);
    urlRef.current = next;
    setUrl(next);
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    };
  }, [file]);

  if (!file.type.startsWith("image/")) {
    if (render) return <>{render(file)}</>;
    return null;
  }
  if (!url) return null;
  return (
    <img
      ref={ref}
      src={url}
      alt={alt ?? file.name}
      className={cn("vds-file-upload-preview", className)}
      {...props}
    />
  );
});
