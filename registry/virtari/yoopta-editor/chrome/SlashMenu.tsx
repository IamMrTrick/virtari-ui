import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Editor as SlateEditor } from "slate";
import { useYooptaEditor, Blocks } from "@yoopta/editor";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../popover";
import { getPluginDisplay, getPluginIcon } from "./pluginIcons";

type SlashState = {
  blockId: string;
  query: string;
  rect: DOMRect;
};

export function SlashMenu() {
  const editor = useYooptaEditor();
  const [state, setState] = useState<SlashState | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const stateRef = useRef<SlashState | null>(null);
  stateRef.current = state;

  const detect = useCallback(() => {
    const path = editor.path;
    if (path.current === null) return null;
    const blockId = Object.keys(editor.children).find(
      (id) => editor.children[id]?.meta.order === path.current,
    );
    if (!blockId) return null;
    const slate = Blocks.getBlockSlate(editor, { id: blockId });
    if (!slate || !slate.selection) return null;

    let textBefore: string;
    try {
      const start = SlateEditor.start(slate, []);
      textBefore = SlateEditor.string(slate, {
        anchor: start,
        focus: slate.selection.anchor,
      });
    } catch {
      return null;
    }

    const slashIdx = textBefore.lastIndexOf("/");
    if (slashIdx === -1) return null;
    const after = textBefore.slice(slashIdx + 1);
    if (/\s/.test(after)) return null;
    const before = textBefore.slice(0, slashIdx);
    if (before.length > 0 && !/[\s]$/.test(before)) return null;

    const sel = typeof window !== "undefined" ? window.getSelection() : null;
    if (!sel || sel.rangeCount === 0) return null;
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return null;

    return { blockId, query: after, rect };
  }, [editor]);

  useEffect(() => {
    const update = () => {
      const detected = detect();
      setState(detected);
      if (detected) setActiveIndex(0);
    };
    editor.on("change", update);
    editor.on("path-change", update);
    document.addEventListener("selectionchange", update);
    return () => {
      editor.off("change", update);
      editor.off("path-change", update);
      document.removeEventListener("selectionchange", update);
    };
  }, [editor, detect]);

  const items = useMemo(() => {
    if (!state) return [];
    const plugins = Object.values(editor.plugins).filter(
      (p) => p && p.type !== "Mention",
    );
    const list = plugins.map((p) => {
      const display = getPluginDisplay(p);
      return { type: p.type, ...display };
    });
    const q = state.query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) => {
      const title = it.title.toLowerCase();
      const t = it.type.toLowerCase();
      return title.includes(q) || t.includes(q);
    });
  }, [state, editor.plugins]);

  const apply = useCallback(
    (type: string) => {
      const s = stateRef.current;
      if (!s) return;
      const slate = Blocks.getBlockSlate(editor, { id: s.blockId });
      if (slate && slate.selection) {
        try {
          const start = SlateEditor.start(slate, []);
          const focus = slate.selection.anchor;
          const fullText = SlateEditor.string(slate, { anchor: start, focus });
          const slashIdx = fullText.lastIndexOf("/");
          if (slashIdx >= 0) {
            const before = fullText.slice(0, slashIdx);
            slate.selection = {
              anchor: SlateEditor.end(slate, []),
              focus: SlateEditor.end(slate, []),
            };
            slate.deleteBackward("character");
            for (let i = 0; i < fullText.length - before.length - 1; i++) {
              slate.deleteBackward("character");
            }
          }
        } catch {
          /* ignore — fall through to toggle */
        }
      }
      editor.toggleBlock(type, { focus: true });
      setState(null);
    },
    [editor],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!stateRef.current) return;
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
        setState(null);
      }
    },
    [items, activeIndex, apply],
  );

  useEffect(() => {
    if (!state) return;
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [state, onKeyDown]);

  const virtualRef = useMemo(
    () => ({
      current: {
        getBoundingClientRect: () => state?.rect ?? new DOMRect(0, 0, 0, 0),
      },
    }),
    [state],
  );

  const open = state !== null && items.length > 0;

  return (
    <Popover open={open} onOpenChange={(o) => !o && setState(null)} modal={false}>
      <PopoverAnchor virtualRef={virtualRef as never} />
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={6}
        className="vds-yoo-action-menu"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          const target = e.target as Node | null;
          if (target && editor.refElement?.contains(target)) e.preventDefault();
        }}
      >
        <div className="vds-yoo-action-menu-list" role="listbox">
          {items.map((it, i) => (
            <button
              key={it.type}
              type="button"
              role="option"
              aria-selected={i === activeIndex}
              data-active={i === activeIndex ? "" : undefined}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                apply(it.type);
              }}
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
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
