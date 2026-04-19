import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';

// src/Textarea.tsx
function Textarea({
  inputSize = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      className: cn("vds-textarea", className),
      "data-size": inputSize,
      ...props
    }
  );
}

export { Textarea };
