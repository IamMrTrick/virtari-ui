import "./FileUpload.css";
import {
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadPreview,
  FileUploadInput,
} from "./FileUpload";

export {
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadPreview,
  FileUploadInput,
};

export type {
  FileUploadRootProps,
  FileUploadDropzoneProps,
  FileUploadTriggerProps,
  FileUploadListProps,
  FileUploadItemProps,
  FileUploadItemRemoveProps,
  FileUploadItemProgressProps,
  FileUploadPreviewProps,
  FileUploadInputProps,
  DropzoneRenderState,
} from "./FileUpload";

export type {
  FileRejection,
  FileRejectionReason,
} from "./types";

export { formatBytes } from "./format";

export {
  FileUploadContext,
  FileUploadItemContext,
  useFileUploadContext,
  useFileUploadItemContext,
} from "./context";
export type {
  FileUploadContextValue,
  FileUploadItemContextValue,
} from "./context";

export const FileUpload = {
  Root: FileUploadRoot,
  Dropzone: FileUploadDropzone,
  Trigger: FileUploadTrigger,
  List: FileUploadList,
  Item: FileUploadItem,
  Preview: FileUploadPreview,
  Input: FileUploadInput,
} as const;
