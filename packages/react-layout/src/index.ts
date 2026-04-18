/* ── Semantic page primitives ── */
export { Section } from "./Section";
export type {
  SectionProps,
  SectionPadding,
  SectionGutter,
  SectionWidth,
  SectionBackground,
  SectionAlign,
  SectionGap,
} from "./Section";

export { Row } from "./Row";
export type {
  RowProps,
  RowMode,
  RowCols,
  RowGap,
  RowAlign,
  RowJustify,
} from "./Row";

export { Col } from "./Col";
export type { ColProps, ColSpan, ColAlign, ColJustify } from "./Col";

export { Container } from "./Container";
export type { ContainerProps, ContainerWidth, ContainerGutter } from "./Container";

/* ── Utility primitives ── */
export { Stack } from "./Stack";
export type { StackProps, StackGap } from "./Stack";

export { Cluster } from "./Cluster";
export type {
  ClusterProps,
  ClusterGap,
  ClusterAlign,
  ClusterJustify,
} from "./Cluster";

export { Grid } from "./Grid";
export type { GridProps, GridGap } from "./Grid";

export { Sidebar } from "./Sidebar";
export type { SidebarProps, SidebarSide, SidebarGap } from "./Sidebar";

export { Center } from "./Center";
export type { CenterProps, CenterMaxWidth, CenterGutter } from "./Center";
