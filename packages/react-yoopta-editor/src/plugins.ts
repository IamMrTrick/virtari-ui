import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Accordion from "@yoopta/accordion";
import Divider from "@yoopta/divider";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Link from "@yoopta/link";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import Embed from "@yoopta/embed";
import Image from "@yoopta/image";
import Video from "@yoopta/video";
import Emoji from "@yoopta/emoji";
import File from "@yoopta/file";
import Tabs from "@yoopta/tabs";
import Steps from "@yoopta/steps";
import Carousel from "@yoopta/carousel";
import Mention from "@yoopta/mention";
import { MathInline, MathBlock } from "@yoopta/math";
import TableOfContents from "@yoopta/table-of-contents";
import type { YooptaPlugin, SlateElement } from "@yoopta/editor";

import { ImageElement } from "./elements/ImageElement";
import { VideoElement } from "./elements/VideoElement";
import { FileElement } from "./elements/FileElement";
import {
  AccordionListElement,
  AccordionItemElement,
  AccordionHeadingElement,
  AccordionContentElement,
} from "./elements/AccordionElements";
import {
  TabsContainerElement,
  TabsListElement,
  TabsItemHeadingElement,
  TabsItemContentElement,
} from "./elements/TabsElements";
import { TodoListElement } from "./elements/TodoListElement";
import {
  CarouselContainerElement,
  CarouselListItemElement,
} from "./elements/CarouselElements";
import { imageUpload, videoUpload, fileUpload } from "./uploads";

type AnyPlugin = YooptaPlugin<Record<string, SlateElement>, Record<string, unknown>>;

const YImage = Image.extend({
  options: { upload: imageUpload as never },
  elements: {
    image: { render: ImageElement as never },
  },
});

export const YOOPTA_PLUGINS: AnyPlugin[] = [
  TableOfContents as unknown as AnyPlugin,
  File.extend({
    options: { upload: fileUpload as never },
    elements: {
      file: { render: FileElement as never },
    },
  }) as unknown as AnyPlugin,
  Code.Code as unknown as AnyPlugin,
  Code.CodeGroup as unknown as AnyPlugin,
  Table as unknown as AnyPlugin,
  Accordion.extend({
    elements: {
      "accordion-list": { render: AccordionListElement as never },
      "accordion-list-item": { render: AccordionItemElement as never },
      "accordion-list-item-heading": { render: AccordionHeadingElement as never },
      "accordion-list-item-content": { render: AccordionContentElement as never },
    },
  }) as unknown as AnyPlugin,
  Divider as unknown as AnyPlugin,
  Paragraph as unknown as AnyPlugin,
  HeadingOne.extend({
    elements: { "heading-one": { placeholder: "Heading 1" } },
  }) as unknown as AnyPlugin,
  HeadingTwo as unknown as AnyPlugin,
  HeadingThree as unknown as AnyPlugin,
  Blockquote as unknown as AnyPlugin,
  Callout as unknown as AnyPlugin,
  Link as unknown as AnyPlugin,
  NumberedList as unknown as AnyPlugin,
  BulletedList as unknown as AnyPlugin,
  TodoList.extend({
    elements: {
      "todo-list": { render: TodoListElement as never },
    },
  }) as unknown as AnyPlugin,
  Embed as unknown as AnyPlugin,
  Emoji as unknown as AnyPlugin,
  YImage as unknown as AnyPlugin,
  Video.extend({
    options: { upload: videoUpload as never },
    elements: {
      video: { render: VideoElement as never },
    },
  }) as unknown as AnyPlugin,
  Steps.extend({
    elements: {
      "step-list-item-heading": { placeholder: "Step title" },
      "step-list-item-content": { placeholder: "Describe this step..." },
    },
  }) as unknown as AnyPlugin,
  Carousel.extend({
    injectElementsFromPlugins: [YImage as unknown as AnyPlugin],
    elements: {
      "carousel-container": { render: CarouselContainerElement as never },
      "carousel-list-item": { render: CarouselListItemElement as never },
    } as never,
  }) as unknown as AnyPlugin,
  Tabs.extend({
    elements: {
      "tabs-container": { render: TabsContainerElement as never },
      "tabs-list": { render: TabsListElement as never },
      "tabs-item-heading": { render: TabsItemHeadingElement as never },
      "tabs-item-content": { render: TabsItemContentElement as never },
    } as never,
  }) as unknown as AnyPlugin,
  Mention.extend({
    options: {
      onSearch: async (query, trigger) => {
        try {
          if (trigger.type === "page") {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`);
            const data = (await res.json()) as { id: number; title: string; body: string }[];
            return data.slice(0, 8).map((post) => ({
              id: String(post.id),
              name: post.title,
              avatar: post.body,
            }));
          }
          const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`);
          const data = (await res.json()) as { id: number; name: string }[];
          return data.slice(0, 8).map((user) => ({
            id: String(user.id),
            name: user.name,
            avatar: "",
          }));
        } catch {
          return [];
        }
      },
      triggers: [
        { char: "@", type: "user" },
        { char: "#", type: "page" },
      ],
    },
  }) as unknown as AnyPlugin,
  MathInline as unknown as AnyPlugin,
  MathBlock as unknown as AnyPlugin,
];
