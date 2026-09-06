import { createContext, useContext } from "react";
import type { DropzoneOptions, DropzoneState } from "react-dropzone";

import type { FileRejection } from "./types";

export interface FileUploadContextValue {
  files: File[];
  rejections: FileRejection[];
  disabled: boolean;
  multiple: boolean;
  maxFiles: number | undefined;
  maxSize: number | undefined;
  accept: DropzoneOptions["accept"];
  removeFile: (file: File) => void;
  clearFiles: () => void;
  dropzone: DropzoneState;
}

export const FileUploadContext = createContext<FileUploadContextValue | null>(
  null,
);

export function useFileUploadContext(): FileUploadContextValue {
  const ctx = useContext(FileUploadContext);
  if (!ctx) {
    throw new Error(
      "FileUpload parts must be rendered inside <FileUpload.Root>.",
    );
  }
  return ctx;
}

export interface FileUploadItemContextValue {
  file: File;
  progress?: number;
}

export const FileUploadItemContext =
  createContext<FileUploadItemContextValue | null>(null);

export function useFileUploadItemContext(): FileUploadItemContextValue {
  const ctx = useContext(FileUploadItemContext);
  if (!ctx) {
    throw new Error(
      "FileUpload item parts must be rendered inside <FileUpload.Item>.",
    );
  }
  return ctx;
}
