import { Children, Fragment, cloneElement, createElement, isValidElement, type ReactNode } from "react";

/** Give text its own measurable line box without moving or cloning consumer controls. */
export function controlText(children: ReactNode): ReactNode {
  const result: ReactNode[] = [];
  let text = "";
  const flush = () => {
    if (!text.trim()) { text = ""; return; }
    result.push(createElement("span", { className: "vds-control-text", key: `text-${result.length}` }, text));
    text = "";
  };
  Children.toArray(children).forEach(child => {
    if (typeof child === "string" || typeof child === "number") { text += child; return; }
    flush();
    result.push(isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
      ? cloneElement(child, {}, controlText(child.props.children)) : child);
  });
  flush();
  return result;
}
