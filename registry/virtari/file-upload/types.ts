export type FileRejectionReason =
  | "file-too-large"
  | "file-too-small"
  | "file-invalid-type"
  | "too-many-files";

export interface FileRejection {
  file: File;
  reason: FileRejectionReason;
  message?: string;
}
