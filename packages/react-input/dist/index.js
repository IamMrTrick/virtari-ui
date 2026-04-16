import { cn } from '@virtari/utils';
import { jsx } from 'react/jsx-runtime';

// src/Input.tsx
function Input({ inputSize = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      className: cn("vds-input", className),
      "data-size": inputSize,
      ...props
    }
  );
}

export { Input };
