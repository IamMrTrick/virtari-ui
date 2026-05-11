import { Tabs, TabsList, TabsTrigger, TabsContent } from "@virtari-packages/react-tabs";
import type { PluginElementRenderProps } from "@yoopta/editor";

/**
 * Yoopta tabs Slate tree:
 *   tabs-container (root, props.activeTabId)
 *     tabs-list (heading row)
 *       tabs-item-heading (each, element.id = activeTabId target)
 *     tabs-item-content (each panel, props.referenceId = matching heading.id)
 *
 * Mapped onto Virtari Tabs (Radix-based). Active state lives in Radix —
 * the Slate `activeTabId` is used only as `defaultValue`.
 */

export function TabsContainerElement(renderProps: PluginElementRenderProps) {
  const { attributes, children, element } = renderProps;
  const activeTabId = (element as unknown as { props?: { activeTabId?: string } }).props
    ?.activeTabId;

  return (
    <Tabs
      defaultValue={activeTabId ?? undefined}
      {...attributes}
      className="vds-yoopta-editor__tabs"
    >
      {children}
    </Tabs>
  );
}

export function TabsListElement(renderProps: PluginElementRenderProps) {
  const { attributes, children } = renderProps;
  return (
    <TabsList variant="underline" {...attributes}>
      {children}
    </TabsList>
  );
}

export function TabsItemHeadingElement(renderProps: PluginElementRenderProps) {
  const { attributes, children, element } = renderProps;
  return (
    <TabsTrigger value={element.id} {...attributes}>
      <span className="vds-yoopta-editor__tabs-heading">{children}</span>
    </TabsTrigger>
  );
}

export function TabsItemContentElement(renderProps: PluginElementRenderProps) {
  const { attributes, children, element } = renderProps;
  const referenceId = (element as unknown as { props?: { referenceId?: string } }).props
    ?.referenceId;
  if (!referenceId) {
    return <div {...attributes}>{children}</div>;
  }
  return (
    <TabsContent value={referenceId} {...attributes}>
      {children}
    </TabsContent>
  );
}
