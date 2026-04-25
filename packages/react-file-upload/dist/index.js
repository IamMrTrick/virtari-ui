import { createContext, forwardRef, useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useDropzone } from 'react-dropzone';
import { cn } from '@virtari-packages/utils';
import { IconX } from '@virtari-packages/react-icons';
import { Progress } from '@virtari-packages/react-progress';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/FileUpload.tsx
var FileUploadContext = createContext(
  null
);
function useFileUploadContext() {
  const ctx = useContext(FileUploadContext);
  if (!ctx) {
    throw new Error(
      "FileUpload parts must be rendered inside <FileUpload.Root>."
    );
  }
  return ctx;
}
var FileUploadItemContext = createContext(null);
function useFileUploadItemContext() {
  const ctx = useContext(FileUploadItemContext);
  if (!ctx) {
    throw new Error(
      "FileUpload item parts must be rendered inside <FileUpload.Item>."
    );
  }
  return ctx;
}

// src/format.ts
var UNITS = ["B", "KB", "MB", "GB", "TB"];
function formatBytes(bytes, decimals = 1) {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes === 0) return "0 B";
  const i = Math.min(
    UNITS.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024))
  );
  const value = bytes / Math.pow(1024, i);
  const rounded = i === 0 ? value.toFixed(0) : value.toFixed(decimals);
  return `${rounded} ${UNITS[i]}`;
}
function mapRejection(r) {
  const first = r.errors[0];
  const code = first?.code ?? "file-invalid-type";
  return { file: r.file, reason: code, message: first?.message };
}
var FileUploadRoot = forwardRef(
  function FileUploadRoot2({
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
  }, ref) {
    const isControlled = controlledFiles !== void 0;
    const [internalFiles, setInternalFiles] = useState(
      defaultFiles ?? []
    );
    const files = isControlled ? controlledFiles : internalFiles;
    const [rejections, setRejections] = useState([]);
    const setFiles = useCallback(
      (next) => {
        if (!isControlled) setInternalFiles(next);
        onFilesChange?.(next);
      },
      [isControlled, onFilesChange]
    );
    const handleDrop = useCallback(
      (accepted, rejected) => {
        const nextRejections = rejected.map(mapRejection);
        setRejections(nextRejections);
        if (nextRejections.length > 0) onReject?.(nextRejections);
        if (accepted.length === 0) return;
        if (multiple) {
          const combined = [...files, ...accepted];
          const capped = maxFiles !== void 0 ? combined.slice(0, maxFiles) : combined;
          setFiles(capped);
        } else {
          setFiles(accepted.slice(0, 1));
        }
      },
      [files, maxFiles, multiple, onReject, setFiles]
    );
    const dropzone = useDropzone({
      accept,
      maxSize,
      minSize,
      maxFiles: multiple ? maxFiles : 1,
      multiple,
      disabled,
      onDrop: handleDrop,
      noClick: true,
      // Trigger handles the click explicitly.
      noKeyboard: true
      // Trigger owns keyboard semantics.
    });
    const removeFile = useCallback(
      (file) => {
        setFiles(files.filter((f) => f !== file));
      },
      [files, setFiles]
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
        dropzone
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
        dropzone
      ]
    );
    return /* @__PURE__ */ jsx(FileUploadContext.Provider, { value, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-disabled": disabled ? "" : void 0,
        className: cn("vds-file-upload", className),
        ...props,
        children
      }
    ) });
  }
);
var FileUploadDropzone = forwardRef(function FileUploadDropzone2({ className, children, ...props }, ref) {
  const { dropzone, disabled } = useFileUploadContext();
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = dropzone;
  const rootProps = getRootProps();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rootProps,
      ref: (node) => {
        if (typeof rootProps.ref === "function") rootProps.ref(node);
        else if (rootProps.ref) rootProps.ref.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      "data-drag-active": isDragActive ? "" : void 0,
      "data-drag-accept": isDragAccept ? "" : void 0,
      "data-drag-reject": isDragReject ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className: cn("vds-file-upload-dropzone", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        typeof children === "function" ? children({ isDragActive, isDragAccept, isDragReject }) : children
      ]
    }
  );
});
var FileUploadTrigger = forwardRef(function FileUploadTrigger2({ asChild = false, onClick, disabled: disabledProp, ...props }, ref) {
  const { dropzone, disabled } = useFileUploadContext();
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabledProp ?? disabled;
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      type: asChild ? void 0 : "button",
      disabled: isDisabled,
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented && !isDisabled) dropzone.open();
      },
      ...props
    }
  );
});
var FileUploadList = forwardRef(
  function FileUploadList2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      "ul",
      {
        ref,
        className: cn("vds-file-upload-list", className),
        ...props
      }
    );
  }
);
var FileUploadItemRoot = forwardRef(function FileUploadItem({ file, progress, className, ...props }, ref) {
  const value = useMemo(() => ({ file, progress }), [file, progress]);
  return /* @__PURE__ */ jsx(FileUploadItemContext.Provider, { value, children: /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      className: cn("vds-file-upload-item", className),
      ...props
    }
  ) });
});
function FileUploadItemName({
  className,
  ...props
}) {
  const { file } = useFileUploadItemContext();
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("vds-file-upload-item-name", className),
      title: file.name,
      ...props,
      children: file.name
    }
  );
}
function FileUploadItemSize({
  className,
  ...props
}) {
  const { file } = useFileUploadItemContext();
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("vds-file-upload-item-size", className),
      ...props,
      children: formatBytes(file.size)
    }
  );
}
var FileUploadItemRemove = forwardRef(function FileUploadItemRemove2({ className, onClick, children, ...props }, ref) {
  const { file } = useFileUploadItemContext();
  const { removeFile } = useFileUploadContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": `Remove ${file.name}`,
      className: cn("vds-file-upload-item-remove", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) removeFile(file);
      },
      ...props,
      children: children ?? /* @__PURE__ */ jsx(IconX, { size: 16, "aria-hidden": "true" })
    }
  );
});
function FileUploadItemProgress({
  className,
  value
}) {
  const { progress } = useFileUploadItemContext();
  const effective = value ?? progress;
  if (effective === void 0) return null;
  return /* @__PURE__ */ jsx(
    Progress,
    {
      value: effective,
      className: cn("vds-file-upload-item-progress", className)
    }
  );
}
var FileUploadInput = forwardRef(
  function FileUploadInput2({ className, accept, multiple, disabled, onChange, ...props }, ref) {
    const [label, setLabel] = useState("No file chosen");
    function handleChange(e) {
      const fl = e.target.files;
      if (!fl || fl.length === 0) setLabel("No file chosen");
      else if (fl.length === 1) setLabel(fl[0].name);
      else setLabel(`${fl.length} files selected`);
      onChange?.(e);
    }
    return /* @__PURE__ */ jsxs(
      "label",
      {
        className: cn("vds-file-upload-input", className),
        "data-disabled": disabled ? "" : void 0,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              type: "file",
              accept,
              multiple,
              disabled,
              onChange: handleChange,
              className: "vds-file-upload-input-native",
              ...props
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "vds-file-upload-input-btn", "aria-hidden": "true", children: "Browse" }),
          /* @__PURE__ */ jsx("span", { className: "vds-file-upload-input-label", children: label })
        ]
      }
    );
  }
);
var FileUploadItem2 = Object.assign(FileUploadItemRoot, {
  Name: FileUploadItemName,
  Size: FileUploadItemSize,
  Remove: FileUploadItemRemove,
  Progress: FileUploadItemProgress
});
var FileUploadPreview = forwardRef(function FileUploadPreview2({ file, render, className, alt, ...props }, ref) {
  const [url, setUrl] = useState(null);
  const urlRef = useRef(null);
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
    if (render) return /* @__PURE__ */ jsx(Fragment, { children: render(file) });
    return null;
  }
  if (!url) return null;
  return /* @__PURE__ */ jsx(
    "img",
    {
      ref,
      src: url,
      alt: alt ?? file.name,
      className: cn("vds-file-upload-preview", className),
      ...props
    }
  );
});

// src/index.ts
var FileUpload = {
  Root: FileUploadRoot,
  Dropzone: FileUploadDropzone,
  Trigger: FileUploadTrigger,
  List: FileUploadList,
  Item: FileUploadItem2,
  Preview: FileUploadPreview,
  Input: FileUploadInput
};

export { FileUpload, FileUploadContext, FileUploadDropzone, FileUploadInput, FileUploadItem2 as FileUploadItem, FileUploadItemContext, FileUploadList, FileUploadPreview, FileUploadRoot, FileUploadTrigger, formatBytes, useFileUploadContext, useFileUploadItemContext };
