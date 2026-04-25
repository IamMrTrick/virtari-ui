'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var reactIcons = require('@virtari-packages/react-icons');
var jsxRuntime = require('react/jsx-runtime');

// src/CopyButton.tsx
function CopyButton({
  text,
  feedbackMs = 2e3,
  variant = "ghost",
  copyButtonSize = "sm",
  label,
  copiedLabel = "Copied",
  className,
  ref,
  ...props
}) {
  const [copied, setCopied] = react.useState(false);
  const handleCopy = react.useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
    }
  }, [text, feedbackMs]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      type: "button",
      className: utils.cn("vds-copy-button", className),
      "data-variant": variant,
      "data-size": copyButtonSize,
      "data-copied": copied || void 0,
      "aria-label": copied ? copiedLabel : label ?? "Copy to clipboard",
      onClick: handleCopy,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-copy-button__icon", "aria-hidden": "true", children: copied ? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCheck, { "aria-hidden": true, focusable: false }) : /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCopy, { "aria-hidden": true, focusable: false }) }),
        label && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-copy-button__label", children: copied ? copiedLabel : label })
      ]
    }
  );
}

exports.CopyButton = CopyButton;
