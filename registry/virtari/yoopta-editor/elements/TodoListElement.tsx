import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { Blocks, useYooptaEditor } from "@yoopta/editor";
import type { PluginElementRenderProps } from "@yoopta/editor";
import { IconSquare, IconSquareCheckFilled } from "../../icons";

/**
 * Yoopta TodoList renders one `todo-list` element per block, with
 * `props.checked` driving the checkbox state. Default render is a bare
 * <ul><li> with no interactive control. Here we mount a Tabler-icon
 * checkbox in a contentEditable=false slot and toggle the slate prop.
 */
export function TodoListElement(renderProps: PluginElementRenderProps) {
  const { attributes, children, element, blockId } = renderProps;
  const editor = useYooptaEditor();
  const checked =
    (element as unknown as { props?: { checked?: boolean } }).props?.checked ??
    false;

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const slate = Blocks.getBlockSlate(editor, { id: blockId });
    if (!slate) return;
    try {
      const path = ReactEditor.findPath(slate, element as never);
      Transforms.setNodes(
        slate,
        { props: { checked: !checked } } as never,
        { at: path },
      );
    } catch {
      /* element not currently in slate tree — no-op */
    }
  };

  return (
    <ul
      {...attributes}
      className="vds-yoopta-editor__todo"
      data-checked={checked ? "" : undefined}
    >
      <li className="vds-yoopta-editor__todo-item">
        <button
          type="button"
          contentEditable={false}
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggle}
          className="vds-yoopta-editor__todo-check"
          aria-checked={checked}
          aria-label={checked ? "Mark as not done" : "Mark as done"}
          role="checkbox"
        >
          {checked ? (
            <IconSquareCheckFilled size={20} />
          ) : (
            <IconSquare size={20} />
          )}
        </button>
        <span className="vds-yoopta-editor__todo-text">{children}</span>
      </li>
    </ul>
  );
}
