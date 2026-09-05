---
"@virtari-packages/react-drawer": patch
---

End dragging when mouse or pen movement reports that the primary button is no longer pressed, before consuming the new position. Capture release events so child components cannot swallow them, and ignore secondary-button releases while the primary button remains held.
