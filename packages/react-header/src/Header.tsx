import { cn } from "@virtari/utils";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";

export type HeaderSlot = "top" | "main" | "bottom";

type StickyHeights = Record<HeaderSlot, number>;

interface HeaderContextValue {
  /** Called by a HeaderRow to publish its current measured height + whether it is sticky. */
  registerRow: (slot: HeaderSlot, heightPx: number, isSticky: boolean) => void;
  /** Called on unmount to clear a row's contribution to the stack. */
  unregisterRow: (slot: HeaderSlot) => void;
}

const HeaderContext = createContext<HeaderContextValue | null>(null);

/** Internal — thrown if a HeaderRow is rendered outside a Header. */
export function useHeaderContext(): HeaderContextValue {
  const ctx = useContext(HeaderContext);
  if (!ctx) {
    throw new Error(
      "vds-header: <HeaderRow> / <HeaderTop|Main|Bottom> must be rendered inside <Header>."
    );
  }
  return ctx;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Override the root tag. Defaults to the semantic `"header"` landmark. */
  as?: ElementType;
  /**
   * External top offset applied to every sticky row — e.g. an announcement bar
   * rendered above the <Header>. Any valid CSS length (`"0px"`, `"2rem"`, `"env(safe-area-inset-top)"`).
   */
  stickyOffset?: string;
  ref?: Ref<HTMLElement>;
}

/**
 * Root landmark. Renders `<header>` by default and provides sticky-stack
 * coordination so child rows can pin themselves below each other.
 */
export function Header({
  as: Tag = "header",
  stickyOffset = "0px",
  className,
  style,
  children,
  ref,
  ...rest
}: HeaderProps) {
  const [heights, setHeights] = useState<StickyHeights>({
    top: 0,
    main: 0,
    bottom: 0,
  });

  const registerRow = useCallback<HeaderContextValue["registerRow"]>(
    (slot, heightPx, isSticky) => {
      setHeights((prev) => {
        const next = isSticky ? heightPx : 0;
        if (prev[slot] === next) return prev;
        return { ...prev, [slot]: next };
      });
    },
    []
  );

  const unregisterRow = useCallback<HeaderContextValue["unregisterRow"]>(
    (slot) => {
      setHeights((prev) => {
        if (prev[slot] === 0) return prev;
        return { ...prev, [slot]: 0 };
      });
    },
    []
  );

  const ctxValue = useMemo<HeaderContextValue>(
    () => ({ registerRow, unregisterRow }),
    [registerRow, unregisterRow]
  );

  const mergedStyle: CSSProperties = {
    ...style,
    ["--header-sticky-offset" as string]: stickyOffset,
    ["--header-top-sticky-height" as string]: `${heights.top}px`,
    ["--header-main-sticky-height" as string]: `${heights.main}px`,
    ["--header-bottom-sticky-height" as string]: `${heights.bottom}px`,
  };

  return (
    <HeaderContext.Provider value={ctxValue}>
      <Tag
        ref={ref}
        className={cn("vds-header", className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>
    </HeaderContext.Provider>
  );
}
