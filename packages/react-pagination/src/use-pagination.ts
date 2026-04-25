export type PageRangeItem = number | "ellipsis-l" | "ellipsis-r";

/**
 * Build the sequence of page buttons to render, inserting ellipsis markers
 * when there are more pages than fit in the sibling window. Returns 0-based
 * page indices (and "ellipsis-l"/"ellipsis-r" placeholders).
 *
 * @param current 0-based current page index
 * @param total total number of pages (page count)
 * @param siblingCount middle window size
 */
export function computePageRange(
  current: number,
  total: number,
  siblingCount: number,
): PageRangeItem[] {
  const pages: PageRangeItem[] = [];
  if (total <= 0) return pages;
  if (total <= siblingCount + 4) {
    for (let i = 0; i < total; i++) pages.push(i);
    return pages;
  }
  const left = Math.max(current - Math.floor(siblingCount / 2), 1);
  const right = Math.min(left + siblingCount - 1, total - 2);
  pages.push(0);
  if (left > 1) pages.push("ellipsis-l");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 2) pages.push("ellipsis-r");
  pages.push(total - 1);
  return pages;
}
