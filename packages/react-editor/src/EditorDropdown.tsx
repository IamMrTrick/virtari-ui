import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

const DROPDOWN_OFFSET = 6;
const VIEWPORT_GUTTER = 8;
const OFFSCREEN_POSITION = -10000;
const EDITOR_DROPDOWN_OPEN_EVENT = "vds-editor-dropdown-open";

interface EditorDropdownRenderProps {
  buttonRef: RefObject<HTMLButtonElement | null>;
  controlsId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

interface EditorDropdownProps {
  autoFocusItems?: boolean;
  children: ReactNode;
  className?: string;
  closeOnTriggerMove?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  stopCloseOnClickSelf?: boolean;
  trigger: (props: EditorDropdownRenderProps) => ReactNode;
}

interface EditorDropdownItemProps {
  children: ReactNode;
  className?: string;
  closeOnSelect?: boolean;
  onSelect?: () => void;
  title?: string;
}

interface EditorDropdownContextValue {
  close: (options?: { restoreFocus?: boolean }) => void;
  registerItem: (itemRef: RefObject<HTMLButtonElement | null>) => void;
}

const EditorDropdownContext = createContext<EditorDropdownContextValue | null>(
  null,
);

export function useEditorDropdown() {
  const context = useContext(EditorDropdownContext);

  if (!context) {
    throw new Error("useEditorDropdown must be used within EditorDropdown.");
  }

  return context;
}

export function EditorDropdownItem({
  children,
  className,
  closeOnSelect = true,
  onSelect,
  title,
}: EditorDropdownItemProps) {
  const itemRef = useRef<HTMLButtonElement | null>(null);
  const context = useContext(EditorDropdownContext);

  if (!context) {
    throw new Error("EditorDropdownItem must be used within EditorDropdown.");
  }

  const { close, registerItem } = context;

  useEffect(() => {
    registerItem(itemRef);
  }, [registerItem]);

  return (
    <button
      ref={itemRef}
      type="button"
      className={className}
      title={title}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        onSelect?.();
        if (closeOnSelect) {
          close();
        }
      }}
    >
      {children}
    </button>
  );
}

export function EditorDropdownSeparator({
  className,
}: {
  className?: string;
}) {
  return <div className={className} role="separator" />;
}

export function EditorDropdown({
  autoFocusItems = true,
  children,
  className,
  closeOnTriggerMove = true,
  disabled,
  onOpenChange,
  stopCloseOnClickSelf = false,
  trigger,
}: EditorDropdownProps) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<RefObject<HTMLButtonElement | null>>>([]);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(
    null,
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const setDropdownOpen = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen && disabled) {
        return;
      }

      if (nextOpen) {
        document.dispatchEvent(
          new CustomEvent(EDITOR_DROPDOWN_OPEN_EVENT, { detail: panelId }),
        );
      }

      setOpen(nextOpen);
    },
    [disabled, panelId],
  );

  const isTriggerVisible = useCallback(() => {
    const button = buttonRef.current;

    if (!button || !button.isConnected) {
      return false;
    }

    const rect = button.getBoundingClientRect();

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= window.innerHeight &&
      rect.left <= window.innerWidth
    );
  }, []);

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    const panel = panelRef.current;

    if (!button || !panel) {
      return;
    }

    if (!isTriggerVisible()) {
      setDropdownOpen(false);
      return;
    }

    const { top, left, bottom } = button.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const showAbove =
      bottom + panelRect.height + DROPDOWN_OFFSET > viewportHeight &&
      top > panelRect.height + DROPDOWN_OFFSET;
    const nextTop = showAbove
      ? top - panelRect.height - DROPDOWN_OFFSET
      : bottom + DROPDOWN_OFFSET;
    const nextLeft = Math.min(
      left,
      viewportWidth - panelRect.width - VIEWPORT_GUTTER,
    );

    setPosition({
      left: Math.max(VIEWPORT_GUTTER, nextLeft),
      top: Math.max(DROPDOWN_OFFSET, nextTop),
    });
  }, [isTriggerVisible, setDropdownOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const closeWithOptions = useCallback((options?: { restoreFocus?: boolean }) => {
    setOpen(false);

    if (options?.restoreFocus) {
      buttonRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const contextValue = useMemo<EditorDropdownContextValue>(
    () => ({
      close: closeWithOptions,
      registerItem(itemRef) {
        if (!itemsRef.current.includes(itemRef)) {
          itemsRef.current = [...itemsRef.current, itemRef];
        }
      },
    }),
    [closeWithOptions],
  );

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

  useEffect(() => {
    const handleDropdownOpen = (event: Event) => {
      const { detail } = event as CustomEvent<string>;

      if (detail !== panelId) {
        setOpen(false);
      }
    };

    document.addEventListener(
      EDITOR_DROPDOWN_OPEN_EVENT,
      handleDropdownOpen,
    );

    return () => {
      document.removeEventListener(
        EDITOR_DROPDOWN_OPEN_EVENT,
        handleDropdownOpen,
      );
    };
  }, [panelId]);

  useEffect(() => {
    if (!open) {
      itemsRef.current = [];
      setPosition(null);
      setHighlightedIndex(0);
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (buttonRef.current?.contains(target)) {
        return;
      }

      if (stopCloseOnClickSelf && panelRef.current?.contains(target)) {
        return;
      }

      if (!panelRef.current?.contains(target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [close, open, stopCloseOnClickSelf]);

  useEffect(() => {
    if (!open || !closeOnTriggerMove) {
      return;
    }

    const handleWindowResize = () => close();
    const handleDocumentScroll = (event: Event) => {
      const target = event.target;

      if (
        target instanceof Node &&
        panelRef.current?.contains(target)
      ) {
        return;
      }

      close();
    };

    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("scroll", handleDocumentScroll, true);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("scroll", handleDocumentScroll, true);
    };
  }, [close, open]);

  useEffect(() => {
    if (!open || !closeOnTriggerMove) {
      return;
    }

    const initialRect = buttonRef.current?.getBoundingClientRect();

    if (!initialRect) {
      return;
    }

    let animationFrame = 0;

    const watchTriggerPosition = () => {
      const button = buttonRef.current;

      if (!button || !isTriggerVisible()) {
        close();
        return;
      }

      const rect = button.getBoundingClientRect();
      const moved =
        Math.abs(rect.left - initialRect.left) > 1 ||
        Math.abs(rect.top - initialRect.top) > 1 ||
        Math.abs(rect.width - initialRect.width) > 1 ||
        Math.abs(rect.height - initialRect.height) > 1;

      if (moved) {
        close();
        return;
      }

      animationFrame = window.requestAnimationFrame(watchTriggerPosition);
    };

    animationFrame = window.requestAnimationFrame(watchTriggerPosition);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [close, closeOnTriggerMove, isTriggerVisible, open]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();
  }, [children, open, updatePosition]);

  useEffect(() => {
    if (!open || !autoFocusItems) {
      return;
    }

    const currentItem = itemsRef.current[highlightedIndex]?.current;
    currentItem?.focus();
  }, [autoFocusItems, highlightedIndex, open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (itemsRef.current.length === 0) {
      if (event.key === "Escape" || event.key === "Tab") {
        event.preventDefault();
        closeWithOptions({ restoreFocus: true });
      }
      return;
    }

    if (["Escape", "ArrowUp", "ArrowDown", "Home", "End", "Tab"].includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === "Escape" || event.key === "Tab") {
      closeWithOptions({ restoreFocus: true });
      return;
    }

    if (event.key === "Home") {
      setHighlightedIndex(0);
      return;
    }

    if (event.key === "End") {
      setHighlightedIndex(itemsRef.current.length - 1);
      return;
    }

    if (event.key === "ArrowUp") {
      setHighlightedIndex((current) =>
        current === 0 ? itemsRef.current.length - 1 : current - 1,
      );
      return;
    }

    if (event.key === "ArrowDown") {
      setHighlightedIndex((current) =>
        current === itemsRef.current.length - 1 ? 0 : current + 1,
      );
    }
  }

  return (
    <>
      {trigger({
        buttonRef,
        controlsId: panelId,
        open,
        setOpen: setDropdownOpen,
        toggle: () => setDropdownOpen(!open),
      })}

      {open
        ? createPortal(
            <EditorDropdownContext.Provider value={contextValue}>
              <div
                id={panelId}
                ref={panelRef}
                className={className}
                style={{
                  position: "fixed",
                  left: position?.left ?? OFFSCREEN_POSITION,
                  top: position?.top ?? OFFSCREEN_POSITION,
                }}
                onKeyDown={handleKeyDown}
              >
                {children}
              </div>
            </EditorDropdownContext.Provider>,
            document.body,
          )
        : null}
    </>
  );
}
