'use strict';

var react = require('react');
var reactSlot = require('@radix-ui/react-slot');
var reactDropzone = require('react-dropzone');
var utils = require('@virtari-packages/utils');
var reactIcons = require('@virtari-packages/react-icons');
var reactProgress = require('@virtari-packages/react-progress');
var jsxRuntime = require('react/jsx-runtime');

// src/FileUpload.tsx
var FileUploadContext = react.createContext(
  null
);
function useFileUploadContext() {
  const ctx = react.useContext(FileUploadContext);
  if (!ctx) {
    throw new Error(
      "FileUpload parts must be rendered inside <FileUpload.Root>."
    );
  }
  return ctx;
}
var FileUploadItemContext = react.createContext(null);
function useFileUploadItemContext() {
  const ctx = react.useContext(FileUploadItemContext);
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
var FileUploadRoot = react.forwardRef(
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
    const [internalFiles, setInternalFiles] = react.useState(
      defaultFiles ?? []
    );
    const files = isControlled ? controlledFiles : internalFiles;
    const [rejections, setRejections] = react.useState([]);
    const setFiles = react.useCallback(
      (next) => {
        if (!isControlled) setInternalFiles(next);
        onFilesChange?.(next);
      },
      [isControlled, onFilesChange]
    );
    const handleDrop = react.useCallback(
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
    const dropzone = reactDropzone.useDropzone({
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
    const removeFile = react.useCallback(
      (file) => {
        setFiles(files.filter((f) => f !== file));
      },
      [files, setFiles]
    );
    const clearFiles = react.useCallback(() => setFiles([]), [setFiles]);
    const value = react.useMemo(
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
    return /* @__PURE__ */ jsxRuntime.jsx(FileUploadContext.Provider, { value, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        "data-disabled": disabled ? "" : void 0,
        className: utils.cn("vds-file-upload", className),
        ...props,
        children
      }
    ) });
  }
);
var FileUploadDropzone = react.forwardRef(function FileUploadDropzone2({ className, children, ...props }, ref) {
  const { dropzone, disabled } = useFileUploadContext();
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = dropzone;
  const rootProps = getRootProps();
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      className: utils.cn("vds-file-upload-dropzone", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("input", { ...getInputProps() }),
        typeof children === "function" ? children({ isDragActive, isDragAccept, isDragReject }) : children
      ]
    }
  );
});
var FileUploadTrigger = react.forwardRef(function FileUploadTrigger2({ asChild = false, onClick, disabled: disabledProp, ...props }, ref) {
  const { dropzone, disabled } = useFileUploadContext();
  const Comp = asChild ? reactSlot.Slot : "button";
  const isDisabled = disabledProp ?? disabled;
  return /* @__PURE__ */ jsxRuntime.jsx(
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
var FileUploadList = react.forwardRef(
  function FileUploadList2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "ul",
      {
        ref,
        className: utils.cn("vds-file-upload-list", className),
        ...props
      }
    );
  }
);
var FileUploadItemRoot = react.forwardRef(function FileUploadItem({ file, progress, className, ...props }, ref) {
  const value = react.useMemo(() => ({ file, progress }), [file, progress]);
  return /* @__PURE__ */ jsxRuntime.jsx(FileUploadItemContext.Provider, { value, children: /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      className: utils.cn("vds-file-upload-item", className),
      ...props
    }
  ) });
});
function FileUploadItemName({
  className,
  ...props
}) {
  const { file } = useFileUploadItemContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: utils.cn("vds-file-upload-item-name", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: utils.cn("vds-file-upload-item-size", className),
      ...props,
      children: formatBytes(file.size)
    }
  );
}
var FileUploadItemRemove = react.forwardRef(function FileUploadItemRemove2({ className, onClick, children, ...props }, ref) {
  const { file } = useFileUploadItemContext();
  const { removeFile } = useFileUploadContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": `Remove ${file.name}`,
      className: utils.cn("vds-file-upload-item-remove", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) removeFile(file);
      },
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconX, { size: 16, "aria-hidden": "true" })
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactProgress.Progress,
    {
      value: effective,
      className: utils.cn("vds-file-upload-item-progress", className)
    }
  );
}
var FileUploadInput = react.forwardRef(
  function FileUploadInput2({ className, accept, multiple, disabled, onChange, ...props }, ref) {
    const [label, setLabel] = react.useState("No file chosen");
    function handleChange(e) {
      const fl = e.target.files;
      if (!fl || fl.length === 0) setLabel("No file chosen");
      else if (fl.length === 1) setLabel(fl[0].name);
      else setLabel(`${fl.length} files selected`);
      onChange?.(e);
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "label",
      {
        className: utils.cn("vds-file-upload-input", className),
        "data-disabled": disabled ? "" : void 0,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-file-upload-input-btn", "aria-hidden": "true", children: "Browse" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-file-upload-input-label", children: label })
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
var FileUploadPreview = react.forwardRef(function FileUploadPreview2({ file, render, className, alt, ...props }, ref) {
  const [url, setUrl] = react.useState(null);
  const urlRef = react.useRef(null);
  react.useEffect(() => {
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
    if (render) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: render(file) });
    return null;
  }
  if (!url) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "img",
    {
      ref,
      src: url,
      alt: alt ?? file.name,
      className: utils.cn("vds-file-upload-preview", className),
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

exports.FileUpload = FileUpload;
exports.FileUploadContext = FileUploadContext;
exports.FileUploadDropzone = FileUploadDropzone;
exports.FileUploadInput = FileUploadInput;
exports.FileUploadItem = FileUploadItem2;
exports.FileUploadItemContext = FileUploadItemContext;
exports.FileUploadList = FileUploadList;
exports.FileUploadPreview = FileUploadPreview;
exports.FileUploadRoot = FileUploadRoot;
exports.FileUploadTrigger = FileUploadTrigger;
exports.formatBytes = formatBytes;
exports.useFileUploadContext = useFileUploadContext;
exports.useFileUploadItemContext = useFileUploadItemContext;
