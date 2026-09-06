import type { ReactNode } from "react";
import {
  IconAlignJustified,
  IconAt,
  IconBraces,
  IconCarouselHorizontal,
  IconCheckbox,
  IconChevronDown,
  IconCode,
  IconCubePlus,
  IconFile,
  IconH1,
  IconH2,
  IconH3,
  IconLayoutBoardSplit,
  IconLink,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconMath,
  IconMathFunction,
  IconMessage2,
  IconMinus,
  IconMoodSmile,
  IconNumbers,
  IconPhoto,
  IconQuote,
  IconStack2,
  IconTable,
  IconVideo,
} from "../../icons";

const ICON_BY_TYPE: Record<string, (size: number) => ReactNode> = {
  Paragraph: (s) => <IconAlignJustified size={s} />,
  HeadingOne: (s) => <IconH1 size={s} />,
  HeadingTwo: (s) => <IconH2 size={s} />,
  HeadingThree: (s) => <IconH3 size={s} />,
  Blockquote: (s) => <IconQuote size={s} />,
  Callout: (s) => <IconMessage2 size={s} />,
  Code: (s) => <IconCode size={s} />,
  CodeGroup: (s) => <IconBraces size={s} />,
  Table: (s) => <IconTable size={s} />,
  Divider: (s) => <IconMinus size={s} />,
  NumberedList: (s) => <IconListNumbers size={s} />,
  BulletedList: (s) => <IconList size={s} />,
  TodoList: (s) => <IconListCheck size={s} />,
  Image: (s) => <IconPhoto size={s} />,
  Video: (s) => <IconVideo size={s} />,
  File: (s) => <IconFile size={s} />,
  Embed: (s) => <IconCubePlus size={s} />,
  Link: (s) => <IconLink size={s} />,
  Emoji: (s) => <IconMoodSmile size={s} />,
  Tabs: (s) => <IconLayoutBoardSplit size={s} />,
  Steps: (s) => <IconNumbers size={s} />,
  Carousel: (s) => <IconCarouselHorizontal size={s} />,
  Accordion: (s) => <IconChevronDown size={s} />,
  Mention: (s) => <IconAt size={s} />,
  MathInline: (s) => <IconMath size={s} />,
  MathBlock: (s) => <IconMathFunction size={s} />,
  TableOfContents: (s) => <IconStack2 size={s} />,
  Checkbox: (s) => <IconCheckbox size={s} />,
};

export function getPluginIcon(type: string, size = 18): ReactNode {
  const factory = ICON_BY_TYPE[type];
  if (factory) return factory(size);
  return <IconCubePlus size={size} />;
}

export function getPluginDisplay(
  plugin: { type: string; options?: { display?: { title?: string; description?: string } } } | undefined,
): { title: string; description?: string } {
  if (!plugin) return { title: "Block" };
  const display = plugin.options?.display;
  return {
    title: display?.title ?? humanize(plugin.type),
    description: display?.description,
  };
}

function humanize(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1 $2");
}
