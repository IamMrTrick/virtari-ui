import { useLayoutEffect, type RefObject } from "react";

// Only nested cards subscribe. One resize observer and one filtered attribute
// observer serve the whole card tree; root cards add no observers or listeners.
const resizeSubscribers = new Map<Element, Set<() => void>>();
const themeSubscribers = new Map<Element, Set<() => void>>();
const pending = new Set<() => void>();
let resizeObserver: ResizeObserver | undefined;
let themeObserver: MutationObserver | undefined;
let frame = 0;
function schedule(update: () => void) {
  pending.add(update);
  if (!frame) frame = requestAnimationFrame(() => {
    frame = 0;
    const updates = [...pending];
    pending.clear();
    updates.forEach(run => run());
  });
}
function addSubscriber(map: Map<Element, Set<() => void>>, element: Element, update: () => void) {
  const subscribers = map.get(element) ?? new Set();
  subscribers.add(update);
  map.set(element, subscribers);
}
function observe(elements: HTMLElement[], ancestors: HTMLElement[], update: () => void) {
  resizeObserver ??= new ResizeObserver(entries => entries.forEach(entry => resizeSubscribers.get(entry.target)?.forEach(schedule)));
  themeObserver ??= new MutationObserver(records => records.forEach(record => themeSubscribers.get(record.target as Element)?.forEach(schedule)));
  elements.forEach(element => { addSubscriber(resizeSubscribers, element, update); resizeObserver!.observe(element); });
  ancestors.forEach(element => {
    addSubscriber(themeSubscribers, element, update);
    themeObserver!.observe(element, { attributes: true, attributeFilter: ['class', 'style', 'data-radius', 'data-surface-style'] });
  });
  return () => {
    pending.delete(update);
    elements.forEach(element => {
      const subscribers = resizeSubscribers.get(element)!;
      subscribers.delete(update);
      if (!subscribers.size) { resizeSubscribers.delete(element); resizeObserver!.unobserve(element); }
    });
    ancestors.forEach(element => {
      const subscribers = themeSubscribers.get(element)!;
      subscribers.delete(update);
      if (!subscribers.size) themeSubscribers.delete(element);
    });
    themeObserver!.disconnect();
    themeSubscribers.forEach((_subscribers, element) => themeObserver!.observe(element, { attributes: true, attributeFilter: ['class', 'style', 'data-radius', 'data-surface-style'] }));
    if (!resizeSubscribers.size) { resizeObserver!.disconnect(); resizeObserver = undefined; }
    if (!themeSubscribers.size) { themeObserver = undefined; if (frame) cancelAnimationFrame(frame); frame = 0; }
  };
}

// offset geometry excludes hover scale/translation and scroll position. A
// transform must not turn a 12px corner into a different nesting measurement.
function layoutPosition(element: HTMLElement) {
  let x = 0, y = 0;
  let current: HTMLElement | null = element;
  while (current) {
    x += current.offsetLeft;
    y += current.offsetTop;
    const parent = current.offsetParent as HTMLElement | null;
    if (parent) {
      const css = getComputedStyle(parent);
      // clientLeft/clientTop round fractional borders (e.g. 0.8px at zoom).
      x += parseFloat(css.borderLeftWidth) || 0;
      y += parseFloat(css.borderTopWidth) || 0;
    }
    current = parent;
  }
  return { x, y };
}

function layoutSize(element: HTMLElement) {
  const css = getComputedStyle(element);
  const extraX = css.boxSizing === 'border-box' ? 0 : (parseFloat(css.paddingLeft) + parseFloat(css.paddingRight) + parseFloat(css.borderLeftWidth) + parseFloat(css.borderRightWidth));
  const extraY = css.boxSizing === 'border-box' ? 0 : (parseFloat(css.paddingTop) + parseFloat(css.paddingBottom) + parseFloat(css.borderTopWidth) + parseFloat(css.borderBottomWidth));
  return { width: parseFloat(css.width) + extraX || element.offsetWidth, height: parseFloat(css.height) + extraY || element.offsetHeight };
}

export function useNestedCardRadius(ref: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement?.closest<HTMLElement>('.vds-card');
    if (!element || !parent) return;
    let depth = 0;
    for (let current: HTMLElement | null = parent; current; current = current.parentElement?.closest<HTMLElement>('.vds-card') ?? null) depth++;
    element.setAttribute('data-nested-card', '');
    element.setAttribute('data-card-depth', String(depth));
    const ancestors: HTMLElement[] = [];
    for (let current = element.parentElement; current; current = current.parentElement) ancestors.push(current);
    const update = () => {
      const outer = layoutPosition(parent), inner = layoutPosition(element);
      const outerSize = layoutSize(parent), innerSize = layoutSize(element);
      const inset = Math.max(0, Math.min(
        inner.x - outer.x, inner.y - outer.y,
        outer.x + outerSize.width - inner.x - innerSize.width,
        outer.y + outerSize.height - inner.y - innerSize.height,
      ));
      const css = getComputedStyle(parent);
      const radius = Math.min(...[css.borderTopLeftRadius, css.borderTopRightRadius, css.borderBottomLeftRadius, css.borderBottomRightRadius].map(value => parseFloat(value) || 0));
      const parentRadius = radius.toFixed(2) + 'px';
      if (element.style.getPropertyValue('--card-parent-radius') !== parentRadius) element.style.setProperty('--card-parent-radius', parentRadius);
      const nested = Math.max(0, radius - inset).toFixed(2) + 'px';
      if (element.style.getPropertyValue('--card-nested-radius') !== nested) element.style.setProperty('--card-nested-radius', nested);
    };
    update();
    const cleanup = observe([element, ...ancestors], ancestors, update);
    return () => { cleanup(); element.style.removeProperty('--card-nested-radius'); element.style.removeProperty('--card-parent-radius'); element.removeAttribute('data-nested-card'); element.removeAttribute('data-card-depth'); };
  }, [ref]);
}
