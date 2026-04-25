import { cn } from '@virtari-packages/utils';
import { useState, useCallback } from 'react';
import { IconCheck, IconCopy } from '@virtari-packages/react-icons';
import { jsxs, jsx } from 'react/jsx-runtime';

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
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
    }
  }, [text, feedbackMs]);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type: "button",
      className: cn("vds-copy-button", className),
      "data-variant": variant,
      "data-size": copyButtonSize,
      "data-copied": copied || void 0,
      "aria-label": copied ? copiedLabel : label ?? "Copy to clipboard",
      onClick: handleCopy,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "vds-copy-button__icon", "aria-hidden": "true", children: copied ? /* @__PURE__ */ jsx(IconCheck, { "aria-hidden": true, focusable: false }) : /* @__PURE__ */ jsx(IconCopy, { "aria-hidden": true, focusable: false }) }),
        label && /* @__PURE__ */ jsx("span", { className: "vds-copy-button__label", children: copied ? copiedLabel : label })
      ]
    }
  );
}

export { CopyButton };
