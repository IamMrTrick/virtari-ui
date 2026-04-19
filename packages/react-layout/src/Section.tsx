import { cn } from "@virtari-packages/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

/* ── Types ── */

export type SectionPadding =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
export type SectionGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type SectionWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "prose"
  | "full";
export type SectionBackground = "none" | "subtle" | "muted" | "emphasis";
export type SectionAlign = "start" | "center" | "end";
export type SectionGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Block padding (vertical rhythm of the band). */
  padding?: SectionPadding;
  /** Inline padding (horizontal padding of the inner container). */
  gutter?: SectionGutter;
  /** Max content width when `contained` is true. */
  width?: SectionWidth;
  /** Override the container width with an arbitrary CSS size (e.g. "72ch", "900px"). */
  maxInlineSize?: string;
  /** Wrap content in a centered container (default). Set to false for edge-to-edge content. */
  contained?: boolean;
  /** Surface background of the outer band. */
  background?: SectionBackground;
  /** Horizontal alignment of the inner container inside the outer band. */
  align?: SectionAlign;
  /** Gap between direct children of the inner container (rows, headings, etc.). */
  gap?: SectionGap;
  /** Fill the viewport vertically (`min-block-size: 100svh`). */
  fullHeight?: boolean;
  /** Override the default root tag. `"section"` by default; pass `"article"`, `"main"`, `"aside"` or similar as needed. */
  ref?: Ref<HTMLElement>;
}

export function Section({
  as: Tag = "section",
  padding,
  gutter,
  width,
  maxInlineSize,
  contained = true,
  background = "none",
  align,
  gap,
  fullHeight,
  className,
  style,
  children,
  ref,
  ...rest
}: SectionProps) {
  const mergedStyle: CSSProperties | undefined = maxInlineSize
    ? { ...style, ["--section-container-width" as string]: maxInlineSize }
    : style;

  return (
    <Tag
      ref={ref}
      className={cn("vds-section", className)}
      data-padding={padding}
      data-gutter={gutter}
      data-width={width}
      data-contained={contained ? undefined : "false"}
      data-background={background === "none" ? undefined : background}
      data-align={align}
      data-gap={gap}
      data-full-height={fullHeight ? "true" : undefined}
      style={mergedStyle}
      {...rest}
    >
      <div className="vds-section__inner">{children}</div>
    </Tag>
  );
}
