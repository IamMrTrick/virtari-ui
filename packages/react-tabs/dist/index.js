import { cn } from '@virtari/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { jsx } from 'react/jsx-runtime';

// src/Tabs.tsx
var Tabs = TabsPrimitive.Root;
function TabsList({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      ref,
      className: cn("vds-tabs-list", className),
      ...props
    }
  );
}
function TabsTrigger({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      ref,
      className: cn("vds-tabs-trigger", className),
      ...props
    }
  );
}
function TabsContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      ref,
      className: cn("vds-tabs-content", className),
      ...props
    }
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
