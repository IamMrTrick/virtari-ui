import { cn } from '@virtari/utils';
import { jsx } from 'react/jsx-runtime';

// src/Kbd.tsx
function Kbd({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx("kbd", { ref, className: cn("vds-kbd", className), ...props });
}

export { Kbd };
