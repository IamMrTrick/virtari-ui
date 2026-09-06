# CopyButton

A native button with clipboard feedback, composed consumer events and localized labels.

```tsx
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-copy-button/styles';
import { CopyButton } from '@virtari-packages/react-copy-button';

export function CopyReference({ reference }: { reference: string }) {
  return <CopyButton text={reference} label="Copy reference"
    copiedLabel="Reference copied"
    errorLabel="Copy failed. Select and copy the reference manually." />;
}
```

Use `variant="ghost" | "outline" | "soft"` and `copyButtonSize="2xs" | "xs" | "sm" | "md" | "lg"`. Defaults are ghost/sm. `label` is optional visible text; `copyLabel` names an icon-only button. Supply `copiedLabel` and `errorLabel` in the interface language. Status is announced through a live region.

`onClick` runs first and may cancel copying with `preventDefault`. `disabled` uses native button behavior. An empty `text` is valid clipboard content. `onCopied` runs on success; `onCopyError(error)` receives the actual rejection, which may be undefined. Clipboard access depends on browser permissions and a secure context; failure is displayed rather than reported as success.

`feedbackMs` defaults to 2000. Text changes clear feedback and invalidate pending results. Unmounting clears timers. The forwarded ref targets the native button, whose default type is button; explicit native type and other button attributes are preserved.

For source snippets use the Code package, which composes this control with its code surface. Do not create a second clipboard interaction in documentation.
