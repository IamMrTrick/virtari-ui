import * as react from 'react';
import { HTMLAttributes, ReactNode, ButtonHTMLAttributes, LiHTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DropzoneOptions, DropzoneState } from 'react-dropzone';

type FileRejectionReason = "file-too-large" | "file-too-small" | "file-invalid-type" | "too-many-files";
interface FileRejection {
    file: File;
    reason: FileRejectionReason;
    message?: string;
}

interface FileUploadRootProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onDrop"> {
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
declare const FileUploadRoot: react.ForwardRefExoticComponent<FileUploadRootProps & react.RefAttributes<HTMLDivElement>>;
interface DropzoneRenderState {
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
}
interface FileUploadDropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children?: ReactNode | ((state: DropzoneRenderState) => ReactNode);
}
declare const FileUploadDropzone: react.ForwardRefExoticComponent<FileUploadDropzoneProps & react.RefAttributes<HTMLDivElement>>;
interface FileUploadTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
declare const FileUploadTrigger: react.ForwardRefExoticComponent<FileUploadTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface FileUploadListProps extends HTMLAttributes<HTMLUListElement> {
}
declare const FileUploadList: react.ForwardRefExoticComponent<FileUploadListProps & react.RefAttributes<HTMLUListElement>>;
interface FileUploadItemProps extends LiHTMLAttributes<HTMLLIElement> {
    file: File;
    progress?: number;
}
declare function FileUploadItemName({ className, ...props }: HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
declare function FileUploadItemSize({ className, ...props }: HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
interface FileUploadItemRemoveProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}
interface FileUploadItemProgressProps {
    className?: string;
    /** Override; defaults to the `progress` value from FileUploadItem. */
    value?: number;
}
declare function FileUploadItemProgress({ className, value, }: FileUploadItemProgressProps): react_jsx_runtime.JSX.Element | null;
interface FileUploadInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    /** Forwarded to the hidden <input>. Use native MIME/extension string: "image/*, .pdf" */
    accept?: string;
}
declare const FileUploadInput: react.ForwardRefExoticComponent<FileUploadInputProps & react.RefAttributes<HTMLInputElement>>;
declare const FileUploadItem: react.ForwardRefExoticComponent<FileUploadItemProps & react.RefAttributes<HTMLLIElement>> & {
    Name: typeof FileUploadItemName;
    Size: typeof FileUploadItemSize;
    Remove: react.ForwardRefExoticComponent<FileUploadItemRemoveProps & react.RefAttributes<HTMLButtonElement>>;
    Progress: typeof FileUploadItemProgress;
};
interface FileUploadPreviewProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    file: File;
    /** Custom renderer for non-image files; receives the File. */
    render?: (file: File) => ReactNode;
}
declare const FileUploadPreview: react.ForwardRefExoticComponent<FileUploadPreviewProps & react.RefAttributes<HTMLImageElement>>;

declare function formatBytes(bytes: number, decimals?: number): string;

interface FileUploadContextValue {
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
declare const FileUploadContext: react.Context<FileUploadContextValue | null>;
declare function useFileUploadContext(): FileUploadContextValue;
interface FileUploadItemContextValue {
    file: File;
    progress?: number;
}
declare const FileUploadItemContext: react.Context<FileUploadItemContextValue | null>;
declare function useFileUploadItemContext(): FileUploadItemContextValue;

declare const FileUpload: {
    readonly Root: react.ForwardRefExoticComponent<FileUploadRootProps & react.RefAttributes<HTMLDivElement>>;
    readonly Dropzone: react.ForwardRefExoticComponent<FileUploadDropzoneProps & react.RefAttributes<HTMLDivElement>>;
    readonly Trigger: react.ForwardRefExoticComponent<FileUploadTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    readonly List: react.ForwardRefExoticComponent<FileUploadListProps & react.RefAttributes<HTMLUListElement>>;
    readonly Item: react.ForwardRefExoticComponent<FileUploadItemProps & react.RefAttributes<HTMLLIElement>> & {
        Name: typeof FileUploadItemName;
        Size: typeof FileUploadItemSize;
        Remove: react.ForwardRefExoticComponent<FileUploadItemRemoveProps & react.RefAttributes<HTMLButtonElement>>;
        Progress: typeof FileUploadItemProgress;
    };
    readonly Preview: react.ForwardRefExoticComponent<FileUploadPreviewProps & react.RefAttributes<HTMLImageElement>>;
    readonly Input: react.ForwardRefExoticComponent<FileUploadInputProps & react.RefAttributes<HTMLInputElement>>;
};

export { type DropzoneRenderState, type FileRejection, type FileRejectionReason, FileUpload, FileUploadContext, type FileUploadContextValue, FileUploadDropzone, type FileUploadDropzoneProps, FileUploadInput, type FileUploadInputProps, FileUploadItem, FileUploadItemContext, type FileUploadItemContextValue, type FileUploadItemProgressProps, type FileUploadItemProps, type FileUploadItemRemoveProps, FileUploadList, type FileUploadListProps, FileUploadPreview, type FileUploadPreviewProps, FileUploadRoot, type FileUploadRootProps, FileUploadTrigger, type FileUploadTriggerProps, formatBytes, useFileUploadContext, useFileUploadItemContext };
