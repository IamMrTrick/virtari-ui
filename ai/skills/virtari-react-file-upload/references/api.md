# @virtari-packages/react-file-upload API snapshot

Version: 1.1.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/FileUpload.css",
  "./tokens": "./dist/FileUpload.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `FileUploadRoot` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadDropzone` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadTrigger` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadList` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadItem` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadPreview` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadInput` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadRootProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadDropzoneProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadTriggerProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadListProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadItemProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadItemRemoveProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadItemProgressProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadPreviewProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadInputProps` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `DropzoneRenderState` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileRejection` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileRejectionReason` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `formatBytes` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadContext` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadItemContext` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `useFileUploadContext` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `useFileUploadItemContext` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadContextValue` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUploadItemContextValue` (type) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.
- `FileUpload` (export) from `@virtari-packages/react-file-upload`; source: `packages/react-file-upload/src/index.ts`.

## Source type declarations

Source: `packages/react-file-upload/src/context.ts`

```tsx
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
```

Source: `packages/react-file-upload/src/context.ts`

```tsx
export function useFileUploadContext(): FileUploadContextValue;
```

Source: `packages/react-file-upload/src/context.ts`

```tsx
export interface FileUploadItemContextValue {
  file: File;
  progress?: number;
}
```

Source: `packages/react-file-upload/src/context.ts`

```tsx
export function useFileUploadItemContext(): FileUploadItemContextValue;
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
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
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface DropzoneRenderState {
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadDropzoneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode | ((state: DropzoneRenderState) => ReactNode);
}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadListProps extends HTMLAttributes<HTMLUListElement> {}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadItemProps extends LiHTMLAttributes<HTMLLIElement> {
  file: File;
  progress?: number;
}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export function FileUploadItemName({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>);
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export function FileUploadItemSize({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>);
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadItemRemoveProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadItemProgressProps {
  className?: string;
  /** Override; defaults to the `progress` value from FileUploadItem. */
  value?: number;
}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export function FileUploadItemProgress({
  className,
  value,
}: FileUploadItemProgressProps);
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Forwarded to the hidden <input>. Use native MIME/extension string: "image/*, .pdf" */
  accept?: string;
}
```

Source: `packages/react-file-upload/src/FileUpload.tsx`

```tsx
export interface FileUploadPreviewProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  file: File;
  /** Custom renderer for non-image files; receives the File. */
  render?: (file: File) => ReactNode;
}
```

Source: `packages/react-file-upload/src/format.ts`

```tsx
export function formatBytes(bytes: number, decimals = 1): string;
```

Source: `packages/react-file-upload/src/types.ts`

```tsx
export type FileRejectionReason =
  | "file-too-large"
  | "file-too-small"
  | "file-invalid-type"
  | "too-many-files";
```

Source: `packages/react-file-upload/src/types.ts`

```tsx
export interface FileRejection {
  file: File;
  reason: FileRejectionReason;
  message?: string;
}
```

## Source files

- `packages/react-file-upload/src/context.ts`
- `packages/react-file-upload/src/FileUpload.css`
- `packages/react-file-upload/src/FileUpload.tokens.css`
- `packages/react-file-upload/src/FileUpload.tsx`
- `packages/react-file-upload/src/format.ts`
- `packages/react-file-upload/src/index.ts`
- `packages/react-file-upload/src/types.ts`
- `packages/react-file-upload/package.json`
