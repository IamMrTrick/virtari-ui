import { forwardRef } from 'react';
import { Command as Command$1 } from 'cmdk';
import { cn, useHotkey } from '@virtari-packages/utils';
export { parseCombo, useHotkey } from '@virtari-packages/utils';
import { Kbd } from '@virtari-packages/react-kbd';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Dialog, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from '@virtari-packages/react-dialog';

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
var CommandRoot = forwardRef(
  function CommandRoot2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Command$1,
      {
        ref,
        className: cn("vds-command", className),
        ...props
      }
    );
  }
);
var CommandInput = forwardRef(
  function CommandInput2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx("div", { className: "vds-command-input-wrapper", children: /* @__PURE__ */ jsx(
      Command$1.Input,
      {
        ref,
        className: cn("vds-command-input", className),
        ...props
      }
    ) });
  }
);
var CommandList = forwardRef(
  function CommandList2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Command$1.List,
      {
        ref,
        className: cn("vds-command-list", className),
        ...props
      }
    );
  }
);
var CommandGroup = forwardRef(
  function CommandGroup2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Command$1.Group,
      {
        ref,
        className: cn("vds-command-group", className),
        ...props
      }
    );
  }
);
var CommandItem = forwardRef(
  function CommandItem2({
    className,
    leftSection,
    rightSection,
    shortcut,
    children,
    ...props
  }, ref) {
    const shortcutParts = shortcut ? formatCombo(shortcut) : null;
    return /* @__PURE__ */ jsxs(
      Command$1.Item,
      {
        ref,
        className: cn("vds-command-item", className),
        ...props,
        children: [
          leftSection ? /* @__PURE__ */ jsx("span", { className: "vds-command-item-left", "aria-hidden": "true", children: leftSection }) : null,
          /* @__PURE__ */ jsx("span", { className: "vds-command-item-label", children }),
          rightSection ? /* @__PURE__ */ jsx("span", { className: "vds-command-item-right", children: rightSection }) : null,
          shortcutParts ? /* @__PURE__ */ jsx("span", { className: "vds-command-item-shortcut", "aria-hidden": "true", children: shortcutParts.map((p, i) => /* @__PURE__ */ jsx(Kbd, { children: p }, `${p}-${i}`)) }) : null
        ]
      }
    );
  }
);
var CommandEmpty = forwardRef(
  function CommandEmpty2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Command$1.Empty,
      {
        ref,
        className: cn("vds-command-empty", className),
        ...props
      }
    );
  }
);
var CommandLoading = forwardRef(
  function CommandLoading2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Command$1.Loading,
      {
        ref,
        className: cn("vds-command-loading", className),
        ...props
      }
    );
  }
);
var CommandSeparator = forwardRef(function CommandSeparator2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    Command$1.Separator,
    {
      ref,
      className: cn("vds-command-separator", className),
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
  useHotkey(
    typeof hotkey === "string" || Array.isArray(hotkey) ? hotkey : "",
    () => onOpenChange(!open),
    { enabled: hotkey !== false && hotkey !== void 0, allowInInputs: true }
  );
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(DialogContent, { size: "md", ...contentProps, children: [
      /* @__PURE__ */ jsx(DialogTitle, { className: hideTitle ? "vds-sr-only" : void 0, children: title }),
      description ? /* @__PURE__ */ jsx(
        DialogDescription,
        {
          className: hideTitle ? "vds-sr-only" : void 0,
          children: description
        }
      ) : null,
      /* @__PURE__ */ jsx(CommandRoot, { label: typeof title === "string" ? title : void 0, children })
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

export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandLoading, CommandRoot, CommandSeparator, formatCombo };
