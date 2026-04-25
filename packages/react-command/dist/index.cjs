'use strict';

var react = require('react');
var cmdk = require('cmdk');
var utils = require('@virtari-packages/utils');
var reactKbd = require('@virtari-packages/react-kbd');
var jsxRuntime = require('react/jsx-runtime');
var reactDialog = require('@virtari-packages/react-dialog');

// src/Command.tsx
var MAC_PLATFORMS = /Mac|iPhone|iPad|iPod/;
function isMac() {
  if (typeof navigator === "undefined") return false;
  return MAC_PLATFORMS.test(navigator.platform);
}
var KEY_SYMBOLS_MAC = {
  mod: "\u2318",
  meta: "\u2318",
  cmd: "\u2318",
  command: "\u2318",
  shift: "\u21E7",
  alt: "\u2325",
  option: "\u2325",
  ctrl: "\u2303",
  control: "\u2303",
  escape: "\u238B",
  enter: "\u23CE",
  space: "\u2423",
  backspace: "\u232B",
  delete: "\u2326",
  up: "\u2191",
  down: "\u2193",
  left: "\u2190",
  right: "\u2192"
};
var KEY_LABELS = {
  mod: "Ctrl",
  meta: "Win",
  cmd: "Win",
  command: "Win",
  shift: "Shift",
  alt: "Alt",
  option: "Alt",
  ctrl: "Ctrl",
  control: "Ctrl",
  escape: "Esc",
  enter: "Enter",
  space: "Space",
  backspace: "Backspace",
  delete: "Del",
  up: "\u2191",
  down: "\u2193",
  left: "\u2190",
  right: "\u2192"
};
function formatCombo(combo) {
  const parts = combo.toLowerCase().split("+").map((p) => p.trim()).filter(Boolean);
  const mac = isMac();
  const table = mac ? KEY_SYMBOLS_MAC : KEY_LABELS;
  return parts.map((part) => table[part] ?? part.toUpperCase());
}
var CommandRoot = react.forwardRef(
  function CommandRoot2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command,
      {
        ref,
        className: utils.cn("vds-command", className),
        ...props
      }
    );
  }
);
var CommandInput = react.forwardRef(
  function CommandInput2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-command-input-wrapper", children: /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command.Input,
      {
        ref,
        className: utils.cn("vds-command-input", className),
        ...props
      }
    ) });
  }
);
var CommandList = react.forwardRef(
  function CommandList2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command.List,
      {
        ref,
        className: utils.cn("vds-command-list", className),
        ...props
      }
    );
  }
);
var CommandGroup = react.forwardRef(
  function CommandGroup2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command.Group,
      {
        ref,
        className: utils.cn("vds-command-group", className),
        ...props
      }
    );
  }
);
var CommandItem = react.forwardRef(
  function CommandItem2({
    className,
    leftSection,
    rightSection,
    shortcut,
    children,
    ...props
  }, ref) {
    const shortcutParts = shortcut ? formatCombo(shortcut) : null;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      cmdk.Command.Item,
      {
        ref,
        className: utils.cn("vds-command-item", className),
        ...props,
        children: [
          leftSection ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-command-item-left", "aria-hidden": "true", children: leftSection }) : null,
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-command-item-label", children }),
          rightSection ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-command-item-right", children: rightSection }) : null,
          shortcutParts ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-command-item-shortcut", "aria-hidden": "true", children: shortcutParts.map((p, i) => /* @__PURE__ */ jsxRuntime.jsx(reactKbd.Kbd, { children: p }, `${p}-${i}`)) }) : null
        ]
      }
    );
  }
);
var CommandEmpty = react.forwardRef(
  function CommandEmpty2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command.Empty,
      {
        ref,
        className: utils.cn("vds-command-empty", className),
        ...props
      }
    );
  }
);
var CommandLoading = react.forwardRef(
  function CommandLoading2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command.Loading,
      {
        ref,
        className: utils.cn("vds-command-loading", className),
        ...props
      }
    );
  }
);
var CommandSeparator = react.forwardRef(function CommandSeparator2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Separator,
    {
      ref,
      className: utils.cn("vds-command-separator", className),
      ...props
    }
  );
});
function CommandDialog({
  open,
  onOpenChange,
  hotkey,
  title = "Command palette",
  description,
  hideTitle = true,
  children,
  ...contentProps
}) {
  utils.useHotkey(
    typeof hotkey === "string" || Array.isArray(hotkey) ? hotkey : "",
    () => onOpenChange(!open),
    { enabled: hotkey !== false && hotkey !== void 0, allowInInputs: true }
  );
  return /* @__PURE__ */ jsxRuntime.jsx(reactDialog.Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(reactDialog.DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(reactDialog.DialogContent, { size: "md", ...contentProps, children: [
      /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogTitle, { className: hideTitle ? "vds-sr-only" : void 0, children: title }),
      description ? /* @__PURE__ */ jsxRuntime.jsx(
        reactDialog.DialogDescription,
        {
          className: hideTitle ? "vds-sr-only" : void 0,
          children: description
        }
      ) : null,
      /* @__PURE__ */ jsxRuntime.jsx(CommandRoot, { label: typeof title === "string" ? title : void 0, children })
    ] })
  ] }) });
}
var Command = {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Group: CommandGroup,
  Item: CommandItem,
  Empty: CommandEmpty,
  Loading: CommandLoading,
  Separator: CommandSeparator
};

Object.defineProperty(exports, "parseCombo", {
  enumerable: true,
  get: function () { return utils.parseCombo; }
});
Object.defineProperty(exports, "useHotkey", {
  enumerable: true,
  get: function () { return utils.useHotkey; }
});
exports.Command = Command;
exports.CommandDialog = CommandDialog;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandLoading = CommandLoading;
exports.CommandRoot = CommandRoot;
exports.CommandSeparator = CommandSeparator;
exports.formatCombo = formatCombo;
