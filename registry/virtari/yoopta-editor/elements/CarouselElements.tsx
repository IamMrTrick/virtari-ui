import type { PluginElementRenderProps } from "@yoopta/editor";

/**
 * Yoopta Carousel default render is a plain <div> with no functional UI.
 * We replace it with a scroll-snap horizontal list so slides actually scroll
 * as a carousel inside the editor.
 *
 * Two element types are emitted by the plugin at runtime:
 *   carousel-container  → outer slider rail
 *   carousel-list-item  → each slide (user can drop image/text inside)
 */

export function CarouselContainerElement(renderProps: PluginElementRenderProps) {
  const { attributes, children } = renderProps;
  return (
    <div
      {...attributes}
      className="vds-yoopta-editor__carousel"
      data-component-part="carousel-container"
    >
      {children}
    </div>
  );
}

export function CarouselListItemElement(renderProps: PluginElementRenderProps) {
  const { attributes, children } = renderProps;
  return (
    <div
      {...attributes}
      className="vds-yoopta-editor__carousel-slide"
      data-component-part="carousel-list-item"
    >
      {children}
    </div>
  );
}
