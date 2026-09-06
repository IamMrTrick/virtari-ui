import { useEffect, useMemo, useRef, useState } from "react";
import { useYooptaEditor, Blocks } from "@yoopta/editor";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../popover";
import { getPluginDisplay, getPluginIcon } from "./pluginIcons";

export type ActionMenuMode = { kind: "turnInto" } | { kind: "insert"; at: number };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchor: HTMLElement | null;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  mode?: ActionMenuMode;
};

function splitPlacement(p: Props["placement"]) {
  if (!p) return { side: "bottom" as const, align: "start" as const };
  const [side, align] = p.split("-") as [
    "top" | "right" | "bottom" | "left",
    "start" | "end" | undefined,
  ];
  return { side, align: (align ?? "center") as "start" | "center" | "end" };
}

export function ActionMenu({
  open,
  onOpenChange,
  anchor,
  placement = "bottom-start",
  mode = { kind: "turnInto" },
}: Props) {
  const editor = useYooptaEditor();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const virtualRef = useMemo(
    () => ({
      current: {
        getBoundingClientRect: () =>
          anchor?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0),
      },
    }),
    [anchor],
  );

  const items = useMemo(() => {
    const plugins = Object.values(editor.plugins).filter(
      (p) => p && p.type !== "Mention",
    );
    const q = query.trim().toLowerCase();
    const list = plugins.map((p) => {
      const display = getPluginDisplay(p);
      return { type: p.type, ...display };
    });
    if (!q) return list;
    return list.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.type.toLowerCase().includes(q),
    );
  }, [editor.plugins, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
    return;
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-action-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const apply = (type: string) => {
    if (mode.kind === "insert") {
      editor.insertBlock(type, { at: mode.at, focus: true });
    } else {
      const currentOrder = editor.path.current;
      if (currentOrder === null) return;
      const blockId = Object.keys(editor.children).find(
        (id) => editor.children[id]?.meta.order === currentOrder,
      );
      if (!blockId) return;
      const block = Blocks.getBlock(editor, { id: blockId });
      if (!block) return;
      editor.toggleBlock(type, { focus: true });
    }
    onOpenChange(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = items[activeIndex];
      if (item) apply(item.type);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
    }
  };

  const { side, align } = splitPlacement(placement);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor virtualRef={virtualRef as never} />
      <PopoverContent
        side={side}
        align={align}
        sideOffset={6}
        className="vds-yoo-action-menu"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="vds-yoo-action-menu-search">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={mode.kind === "insert" ? "Insert block" : "Turn into"}
            className="vds-yoo-action-menu-input"
          />
        </div>
        <div ref={listRef} className="vds-yoo-action-menu-list" role="listbox">
          {items.length === 0 ? (
            <div className="vds-yoo-action-menu-empty">No blocks</div>
          ) : (
            items.map((it, i) => (
              <button
                key={it.type}
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                data-action-index={i}
                data-active={i === activeIndex ? "" : undefined}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => apply(it.type)}
                className="vds-yoo-action-menu-item"
              >
                <span className="vds-yoo-action-menu-item-icon">
                  {getPluginIcon(it.type, 18)}
                </span>
                <span className="vds-yoo-action-menu-item-text">
                  <span className="vds-yoo-action-menu-item-title">
                    {it.title}
                  </span>
                  {it.description && (
                    <span className="vds-yoo-action-menu-item-desc">
                      {it.description}
                    </span>
                  )}
                </span>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
