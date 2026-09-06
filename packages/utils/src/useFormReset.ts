import { useEffect, useRef, type RefObject } from "react";

/** Native reset is cancellable. Run after listeners have had a chance to cancel it. */
export function useFormReset(
  ref: RefObject<HTMLElement | null>,
  onReset: () => void,
  formId?: string,
) {
  const callback = useRef(onReset);
  useEffect(() => {
    callback.current = onReset;
  }, [onReset]);

  useEffect(() => {
    const node = ref.current;
    const form = formId
      ? node?.ownerDocument.getElementById(formId)
      : node?.closest("form");
    if (!(form instanceof HTMLFormElement)) return;
    let mounted = true;
    const reset = (event: Event) => queueMicrotask(() => {
      if (mounted && !event.defaultPrevented) callback.current();
    });
    form.addEventListener("reset", reset);
    return () => { mounted = false; form.removeEventListener("reset", reset); };
  }, [ref, formId]);
}
